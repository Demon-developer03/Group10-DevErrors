require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/config/db');

const port = process.env.PORT || 3000;

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connected at:', res.rows[0].now);
  }
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});