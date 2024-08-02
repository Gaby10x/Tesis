const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.post('/login', (req, res) => {
        const { username, password } = req.body;

        db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
            if (err) {
                res.status(500).json({ message: 'Database error' });
                return;
            }

            if (results.length > 0) {
                res.status(200).json({ message: 'Login successful' });
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        });
    });

    return router;
};
