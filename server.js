const express = require('express');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoute');
const methodOverride = require('method-override');
const { pool } = require('./database');

const app = express();
app.use(express.json());

app.use(methodOverride('_method')); // Support for PUT and DELETE

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/recipes', recipeRoutes);

app.use((req, res, next) => {
    res.status(404).send('Route not found');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});