const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const compression = require("compression");
const path = require("path");
const { hash, compare } = require("./bc");
const db = require("./db");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const s3 = require("./s3");
const { s3Url } = require("./config.json");

/////// code generation for password reset ////////
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");

/////// multer for handling file uploads ////////
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 2097152, //2mb
    },
});

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use(
    cookieSession({
        secret: `Even a bad pizza is a good pizza`,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);

app.use(
    express.urlencoded({
        extended: true,
    }),
    express.json()
);

app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

//taken out of the post route "requireLoggedOutUser",

////////////////  Register Route  /////////////////

app.post("/registration", (req, res) => {
    const { first, last, email, password } = req.body;
    hash(password)
        .then((hash) => {
            db.addToDb(first, last, email, hash)
                .then((dbEntry) => {
                    console.log("entry added to DB");
                    req.session.userId = dbEntry.rows[0].id;
                    res.json({ error: false });
                    return;
                })
                .catch((err) => {
                    console.log("error in adding user to db: ", err);
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            console.log("error in hash POST /register", err);
            res.json({ error: true });
        });
});

////////////////  Login Route  /////////////////

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.findByEmail(email)
        .then((dbEntry) => {
            compare(password, dbEntry.rows[0].password).then((result) => {
                if (result) {
                    req.session.userId = dbEntry.rows[0].id;
                    console.log("req id is: ", req.session.userId);
                    res.json({ loggedIn: true });
                } else {
                    res.json({ error: true });
                }
            });
        })
        .catch((err) => {
            console.log("error in compare POST /login", err);
            res.json({ error: true });
        });
});

////////////////  Password Reset Route  /////////////////

app.post("/password/reset/start", (req, res) => {
    const { email } = req.body;
    const secretCode = cryptoRandomString({
        length: 6,
    });
    db.findByEmail(email)
        .then((dbEntry) => {
            console.log("dbEntry in post return: ", dbEntry.rows[0]);
            if (dbEntry.rows[0]) {
                db.addCodeToDb(email, secretCode).then(({ rows }) => {
                    console.log("code added to db, code is: ", rows[0].code);
                    sendEmail(
                        "wilf06@hotmail.co.uk",
                        `Your reset code is: ${rows[0].code}`,
                        "Password Reset"
                    )
                        .then(() => {
                            console.log("then block after email hit");
                            res.json({ view: 2 });
                        })
                        .catch((err) => {
                            console.log("error in send email: ", err);
                        });
                });
            } else {
                console.log("no matching email in db");
                res.json({ error: true });
            }
        })
        .catch((err) => {
            console.log("error in password reset: ", err);
            res.json({ error: true });
        });
});

app.post("/password/reset/verify", (req, res) => {
    console.log("post req made to verify: ", req.body);
    const { email, code, password } = req.body;
    db.checkReset(email)
        .then((dbEntry) => {
            console.log("length is: ", dbEntry.rows.length);
            console.log("dbEntry from checkReset: ", [
                dbEntry.rows[dbEntry.rows.length - 1],
            ]);
            const dbCode = dbEntry.rows[dbEntry.rows.length - 1].code;
            if (code === dbCode) {
                hash(password)
                    .then((hash) => {
                        console.log("hash pass: ", hash);
                        db.updatePassword(email, hash).then(() => {
                            console.log("password updated");
                            res.json({ view: 3 });
                        });
                    })
                    .catch((err) => {
                        console.log("err in update pass: ", err);
                        res.json({ error: true });
                    });
            } else {
                console.log("codes dont match");
                res.json({ error: true });
            }
        })
        .catch((err) => {
            console.log("error in db query: ", err);
            res.json({ error: true });
        });
});

//////////////// User info Route /////////////////

app.get("/user-info", (req, res) => {
    //if user is logged in
    console.log("req made to user info: ", req.session.userId);
    db.findById(req.session.userId)
        .then(({ rows }) => {
            console.log("user info from db: ", rows);
            res.json({
                first: rows[0].first,
                last: rows[0].last,
                email: rows[0].email,
                profile_pic: rows[0].profile_pic,
                bio: rows[0].bio,
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

//////////////// Profile pic Route /////////////////

app.post("/upload", upload.single("image"), s3.upload, (req, res) => {
    console.log("req is: ", req.body);
    const url = s3Url + req.file.filename;
    console.log("post req made, and the url is: ", url);
    const id = req.session.userId;
    console.log("id: ", id);
    /////////////////////// db query to add pic to user entry ////////////////
    if (req.file) {
        db.addImage(url, id)
            .then((response) => {
                console.log("res is : ", response);
                console.log("added to db");
                res.json({ url });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        res.json({ success: false });
    }
});

//////////////// Profile bio Route /////////////////

app.post("/bio", (req, res) => {
    console.log("post route hit: ", req.body);
    const bio = req.body.draftBio;
    console.log("bio var is: ", bio);
    db.updateBio(req.session.userId, bio)
        .then((response) => {
            console.log("bio added to db: ", response);
            res.send(response);
        })
        .catch((err) => {
            console.log("err adding to db: ", err);
        });
});

//////////////// Redirect/Welcome Route /////////////////

// cookie session needs to be added for this to work
app.get("/welcome", (req, res) => {
    //if user is logged in
    if (req.session.userId) {
        res.redirect("/");
    } else {
        //the user is allowed to see the welcome page
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        //serve the page they requested as they have permission
        //DONT COMMMENT THIS OUT ELSE SERVER WILL NOT RENDER ANYTHING
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
