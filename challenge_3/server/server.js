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

app.post('/api/checkout', (req, res) => {
  User.create(req.body)
    .then(data => res.status(201).send(data))
    .catch(err => res.status(404).send(`POST ERROR: ${err}`))
})

app.put('/api/checkout', (req, res) => {
  User.update(req.body.update, { where: { id: req.body.id } })
    .then(() => res.status(201).send('Record updated!'))
    .catch(err => res.status(404).send(`UPDATE ERROR: ${err}`))
})

app.listen(port, () => console.log('Server is listening on port:', port))