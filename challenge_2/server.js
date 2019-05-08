const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, 'client')));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// calculation done here
let obj = {};
let arr = [];
let columns = [];
let values = [];

app.get('/upload_json', (req, res) => {
  res.status(200).send(req.query)
})

app.post('/upload_json', (req, res) => {
  req.body.data = JSON.parse(req.body.data)
  columns = Object.keys(req.body.data)
  columns.pop();
  arr.push(columns)

  const iterator = (data) => {
    values = Object.values(data)
    values.pop()
    arr.push(values)

    if (!!data['children'].length) {
      for (var i = 0; i < data['children'].length; i++) {
        iterator(data.children[i]);
      }
    }
  }

  iterator(req.body.data);
  console.log(arr);
  res.status(201).send(arr);
})

app.listen(port, () => console.log('Server listening on port:', port));