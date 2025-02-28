// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server
const app = express();
app.use(bodyParser.json()); // Parse JSON body

// Load comments from file
let comments = [];
try {
    comments = JSON.parse(fs.readFileSync('comments.json'));
} catch (err) {
    console.log('Error reading comments.json');
}

// GET /comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// POST /comments
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(comment);
});

// Start web server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});