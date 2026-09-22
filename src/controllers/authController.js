const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); 

// 1. REGISTER
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
            [username, hashedPassword]
        );
        res.status(201).json({ message: 'User registered successfully', user: newUser.rows[0] });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed. Username might exist.' });
    }
};

// 2. LOG-IN
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Find user
        const userResult = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (userResult.rows.length === 0) return res.status(400).json({ error: 'User not found' });
        
        const user = userResult.rows[0];
        
        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Invalid password' });
        
        // Mint Tokens
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        
        // Save refresh token to database
        await pool.query('UPDATE users SET refresh_token = $1 WHERE id = $2', [refreshToken, user.id]);
        
        res.json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
};

// 3. REFRESH
exports.refresh = async (req, res) => {
    const { token } = req.body;
    if (!token) return res.status(401).json({ error: 'Refresh token required' });

    try {
        // Verify token math
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        
        // Check if token exists in database (hasn't been logged out)
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1 AND refresh_token = $2', [decoded.id, token]);
        if (userResult.rows.length === 0) return res.status(403).json({ error: 'Invalid refresh token' });

        // Mint new access token
        const newAccessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        res.status(403).json({ error: 'Invalid or expired refresh token' });
    }
};

// 4. LOG-OUT
exports.logout = async (req, res) => {
    const { token } = req.body;
    try {
        // Delete the refresh token from the database
        await pool.query('UPDATE users SET refresh_token = NULL WHERE refresh_token = $1', [token]);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Logout failed' });
    }
};