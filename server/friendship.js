const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:postgres:postgres@localhost:5432/social-network`
);

module.exports.checkFriendship = (userId, otherUserId) => {
    const q = `SELECT * FROM friendships
                WHERE (recipient_id = $1 AND sender_id = $2)
                OR (recipient_id = $2 AND sender_id = $1);`;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.unfriend = (userId, otherUserId) => {
    const q = `DELETE 
                FROM friendships
                WHERE (sender_id = $1 AND recipient_id = $2)
                OR (sender_id = $2 AND recipient_id = $1);`;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.sendRequest = (userId, otherUserId) => {
    const q = `INSERT INTO friendships (sender_id, recipient_id)
                VALUES ($1, $2)
                RETURNING sender_id, recipient_id, accepted;`;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

module.exports.acceptRequest = (userId, otherUserId) => {
    const q = `UPDATE friendships 
                SET accepted= true
                WHERE sender_id = $2
                AND recipient_id = $1
                RETURNING sender_id, recipient_id, accepted;`;
    const params = [userId, otherUserId];
    return db.query(q, params);
};

// INSERT INTO friendships (sender_id, recipient_id, accepted) VALUES (2, 205, 'true');
