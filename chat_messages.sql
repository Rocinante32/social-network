DROP TABLE IF EXISTS chat_messages;

CREATE TABLE chat_messages(
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) NOT NULL,
  message VARCHAR(1000) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO chat_messages (user_id, message) VALUES ('3', 'Hi it`s me Jiminy');
INSERT INTO chat_messages (user_id, message) VALUES ('205', 'I like whisky');
INSERT INTO chat_messages (user_id, message) VALUES ('203', 'Who doesn`t like whisky!!');