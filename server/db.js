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
    const params = [email, code];
    return db.query(q, params);
};

module.exports.checkReset = (email) => {
    const q = ` SELECT * FROM reset_codes
    WHERE CURRENT_TIMESTAMP - timestamp  < INTERVAL '10 minutes' AND email = ($1);
    `;
    const params = [email];
    return db.query(q, params);
};

module.exports.updatePassword = (email, hashedPw) => {
    const q = `UPDATE users 
                SET password= $2
                WHERE email = $1`;
    const params = [email, hashedPw];
    return db.query(q, params);
};
