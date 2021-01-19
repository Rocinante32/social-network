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

module.exports.findById = (id) => {
    const q = `SELECT * FROM users WHERE id = ($1)`;
    const params = [id];
    return db.query(q, params);
};

module.exports.addImage = (url, id) => {
    const q = `UPDATE users 
                SET profile_pic= $1
                WHERE id = $2
                RETURNING profile_pic`;
    const params = [url, id];
    return db.query(q, params);
};

module.exports.updateBio = (id, bio) => {
    const q = `UPDATE users 
                SET bio= $2
                WHERE id = $1
                RETURNING bio`;
    const params = [id, bio];
    return db.query(q, params);
};

module.exports.findNewUsers = () => {
    const q = `SELECT * FROM users ORDER BY id DESC LIMIT 3`;
    return db.query(q);
};

module.exports.findUsers = (search) => {
    const q = `SELECT first, last, bio, profile_pic, id FROM users WHERE first ILIKE $1 LIMIT 3;`;
    const params = [search + "%"];
    return db.query(q, params);
};

module.exports.findLastMessages = () => {
    const q = `SELECT chat_messages.id, chat_messages.user_id, chat_messages.message, chat_messages.created_at, 
                users.first, users.last, users.profile_pic
                FROM chat_messages
                JOIN users
                ON chat_messages.user_id = users.id
                ORDER BY created_at DESC LIMIT 10`;
    return db.query(q);
};

module.exports.addToMessages = (user_id, message) => {
    const q = `INSERT INTO chat_messages ( user_id, message)
    VALUES ($1, $2) RETURNING created_at`;
    const params = [user_id, message];
    return db.query(q, params);
};
