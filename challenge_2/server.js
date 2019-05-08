const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, 'client')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// calculation done here
let arr = [];
let csvArr = [];
let columns = [];
let values = [];
let csv = '';

app.get('/upload_json', (req, res) => {
  res.status(200).send(req.query);
});

app.post('/upload_json', (req, res) => {
  csv = '';
  req.body.data = JSON.parse(req.body.data);
  columns = Object.keys(req.body.data);
  columns.pop();
  arr.push(columns);

  const iterator = (data) => {
    values = Object.values(data);
    values.pop();
    arr.push(values);

    if (!!data['children'].length) {
      for (let i = 0; i < data['children'].length; i++) {
        iterator(data.children[i]);
      }
    }
  }

  iterator(req.body.data);

  // iterate through arr and flatten
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      csvArr.push(arr[i][j])
    }
  }

  // csv-ify the csvArr to str
  for (let i = 0, j = 1; i < csvArr.length; i++, j++) {
    if (j % 6 === 0) {
      csv += csvArr[i] + '\n'
    } else {
      csv += csvArr[i] + ','
    }
  }
  
  res.setHeader('Content-disposition', 'attachment; filename=json_to_csv.csv');
  res.set('Content-Type', 'text/csv');
  res.status(200).send(csv);
})

app.listen(port, () => console.log('Server listening on port:', port));