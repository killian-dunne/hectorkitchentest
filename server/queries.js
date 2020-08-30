const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hectorkitchen',
  password: 'test123',
  port: 5432
})

const getBooks = (req, res) => {
  pool.query('SELECT * FROM book ORDER BY name DESC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
}

const getBookByIsbn = (req, res) => {
  const isbn = parseInt(req.params.isbn);
  pool.query('SELECT * FROM book WHERE isbn = $1', [isbn], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows)
  })
}

const createBook = (req, res) => {
  const { name, isbn, author_id } = request.body;
  pool.query('INSERT INTO book (isbn, name, author_id) VALUES ($1, $2, $3)', [isbn, name, author_id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(201).send(`Book added with with ISBN: ${isbn}`);
  })
}

const updateBook = (req, res) => {
  const isbn = parseInt(req.params.isbn);
  const { name, author_id } = request.body;

  pool.query( 
    'UPDATE book SET name = $1, author_id = $2 WHERE isbn = $3', 
    [name, author_id, isbn],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).send(`Book modified with ISBN: ${isbn}`)
    }
  )
}

const deleteBook = (req, res) => {
  const isbn = parseInt(req.params.isbn);
  pool.query('DELETE FROM book WHERE isbn = $1', [isbn], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Book deleted with ISBN: ${isbn}`)
  })
}

module.exports = {
  getBooks,
  getBookByIsbn,
  createBook, 
  updateBook,
  deleteBook
}