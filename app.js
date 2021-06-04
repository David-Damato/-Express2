const connection = require('./db-config');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
    } else {
        console.log('connected to database with threadId :  ' + connection.threadId);
    }
});

app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get('/api/movies', (req, res) => {
    connection.query('SELECT * FROM movies', (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving data from database');
        } else {
            res.status(200).json(result);
        }
    });
});

app.post('/api/movies', (req, res) => {
    const { title, director, year, color, duration } = req.body;
    connection.query(
        'INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)',
        [title, director, year, color, duration],
        (err, result) => {
            if (err) {
                res.status(500).send('Error saving the movie');
            } else {
                res.status(201).send('Movie successfully saved');
            }
        }
    );
});

app.post('/api/users', (req, res) => {
    const { fistname, lastname, email } = req.body;
    connection.query(
        'INSERT INTO movies(firstname, lastname, email) VALUES (?, ?, ?)',
        [firstname, lastname, email],
        (err, result) => {
            if (err) {
                res.status(500).send('Error saving the user');
            } else {
                res.status(201).send('User successfully saved');
            }
        }
    );
});


app.put('/api/movies/:id', (req, res) => {

    const moviesId = req.params.id;

    const userPropsToUpdate = req.body;

    connection.query(
        'UPDATE movies SET ? WHERE id = ?',
        [userPropsToUpdate, moviesId],
        (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error updating a user');
            } else {
                res.status(200).send('Movies updated successfully 🎉');
            }
        }
    );
});