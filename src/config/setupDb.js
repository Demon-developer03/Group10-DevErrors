const pool = require('./db');

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    refresh_token TEXT
);
`;

pool.query(createTableQuery)
  .then(() => {
    console.log("Users table created successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error creating table:", err.message);
    process.exit(1);
  });