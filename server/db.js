const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/social-network`
);

module.exports.addToDb = (firstName, lastName, email, hashedPw) => {
    const q = `INSERT INTO users (first, last, email, password)
    VALUES ($1, $2, $3, $4) RETURNING id`;
    const params = [firstName, lastName, email, hashedPw];
    return db.query(q, params);
};

module.exports.findByEmail = (email) => {
    const q = `SELECT * FROM users WHERE email = ($1)`;
    const params = [email];
    return db.query(q, params);
};

module.exports.addCodeToDb = (email, code) => {
    const q = `INSERT INTO reset_codes ( email, code)
    VALUES ($1, $2) RETURNING code`;
    const params = [ email, code];
    return db.query(q, params);
};
