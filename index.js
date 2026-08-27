// Load the Express framework
const express = require('express');
const app = express();

// Define the port number
const PORT = 3000;

// Handle the main web page request
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome Address</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f4f7f6;
                    color: #333;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }
                .card {
                    background: white;
                    padding: 40px;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    text-align: center;
                    max-width: 500px;
                }
                h1 {
                    color: #2c3e50;
                    margin-bottom: 20px;
                }
                p {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: #555;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>👋 Welcome Everyone!</h1>
                <p>It is an absolute honor and pleasure to welcome you all here today. We are incredibly excited to have you join our community. Thank you for your time, your energy, and your presence as we embark on this wonderful journey together!</p>
            </div>
        </body>
        </html>
    `);
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
