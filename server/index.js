const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bookQueries = require('./bookQueries');
const authorQueries = require('./authorQueries');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.get('/api/books', bookQueries.getBooks)
app.get('/api/book/:isbn', bookQueries.getBookByIsbn)
app.post('/api/book', bookQueries.createBook)
app.put('/api/book/:isbn', bookQueries.updateBook)
app.delete('/api/book/:isbn', bookQueries.deleteBook)

app.get('/api/authors', authorQueries.getAuthors)
app.get('/api/author/:id', authorQueries.getAuthorById)
app.post('/api/author', authorQueries.createAuthor)
app.put('/api/author/:id', authorQueries.updateAuthor)
app.delete('/api/author/:id', authorQueries.deleteAuthor)
app.get('/api/author-books/:id', authorQueries.getAuthorBooks);

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
