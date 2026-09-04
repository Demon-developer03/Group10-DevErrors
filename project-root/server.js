const app = require('./src/app');

// Usually, port configuration comes from the .env file in this structure
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App is listening on port ${port}');
});