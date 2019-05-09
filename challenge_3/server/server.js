const express = require('express');
const path = require('path');
const db = require('../database/database.js');
const User = require('../database/user.js');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../public')))

app.get('/api/checkout', (req, res) => {
  User.findAll()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(404).send(`GET ERROR: ${err}`))
})

/*
  TODO: create update method
*/

app.post('/api/checkout', (req, res) => {
  User.create(req.body)
    .then(() => res.status(201).send('New Account Created!'))
    .catch(err => res.status(404).send(`POST ERROR: ${err}`))
})

app.listen(port, () => console.log('Server is listening on port:', port))