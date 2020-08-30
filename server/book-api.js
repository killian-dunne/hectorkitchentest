const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();
const port = 5000;

let books = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/book', (req, res) => {
  const book = req.body;

  console.log(book);
  books.push(book);

  res.send('Book added to the database');
})

app.listen(port, () => console.log(`Listening on port ${port}`))