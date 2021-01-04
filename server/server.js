const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const compression = require("compression");
const path = require("path");
const { hash, compare } = require("./bc");
const db = require("./db");

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

//taken out of the post route "requireLoggedOutUser",

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

//redirection
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
