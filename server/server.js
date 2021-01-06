const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const compression = require("compression");
const path = require("path");
const { hash, compare } = require("./bc");
const db = require("./db");
const csurf = require("csurf");

/////// code generation for password reset ////////
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const secretCode = cryptoRandomString({
    length: 6,
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
    db.findByEmail(email)
        .then((dbEntry) => {
            console.log("dbEntry in post return: ", dbEntry.rows[0]);
            if (dbEntry.rows[0]) {
                db.addCodeToDb(email, secretCode).then(({ rows }) => {
                    console.log("code added to db, code is: ", rows[0].code);
                    sendEmail(
                        "wilf06@hotmail.co.uk",
                        rows[0].code,
                        "Password Reset"
                    )
                        .then(() => {
                            console.log("then block after email hit");
                            res.redirect("/");
                        })
                        .catch((err) => {
                            console.log("error in send email: ", err);
                        });
                });
            } else {
                console.log("no matching email in db");
                res.json({ error: true });
            }

            // compare(password, dbEntry.rows[0].password).then((result) => {
            //     if (result) {
            //         req.session.userId = dbEntry.rows[0].id;
            //         console.log("req id is: ", req.session.userId);
            //         res.json({ loggedIn: true });
            //     } else {
            //         res.json({ error: true });
            //     }
            // });
        })
        .catch((err) => {
            console.log("error in password reset: ", err);
            res.json({ error: true });
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
