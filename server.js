const express = require('express');
const { pool } = require('./database');

const app = express();
app.use(express.json());


app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});