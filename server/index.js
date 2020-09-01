const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.get('/api/books', db.getBooks)
app.get('/api/book/:isbn', db.getBookByIsbn)
app.post('/api/book', db.createBook)
app.put('/api/book/:isbn', db.updateBook)
app.delete('/api/book/:isbn', db.deleteBook)

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static(path.join(__dirname, "..", "public")));


app.use((req, res, next) => {
  res.status(404);

  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  }
})

app.listen(5000, () => {
  console.log("server started on port 5000");
})
