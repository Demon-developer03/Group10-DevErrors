const express = require('express');
const app = express();

app.use(express.json());

const studentRoutes = require('./routes/studentRoutes');
app.use('/students', studentRoutes);

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

module.exports = app;