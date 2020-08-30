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

app.use(express.static(path.join(__dirname, "..", "build")))
app.use(express.static("public"))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.get('/books', db.getBooks)
app.get('/books/:isbn', db.getBookByIsbn)
app.post('/books', db.createBook)
app.put('/books/:isbn', db.updateBook)
app.delete('/books/:isbn', db.deleteBook)


app.listen(5000, () => {
  console.log("server started on port 5000");
})
