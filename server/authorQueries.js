const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'hectorkitchen',
  password: 'test123',
  port: 5432
})

const getAuthors = (req, res) => {
  pool.query('SELECT * FROM author ORDER BY id DESC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
}

const getAuthorById = (req, res) => {
  const id = req.params.id.toString();
  pool.query('SELECT * FROM author WHERE author.id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows)
  })
}

const getAuthorBooks = (req, res, next) => {
  const id = req.params.id.toString();
  pool.query('SELECT * FROM book WHERE book.author_id = $1', [id], (err, results) => {
    if (err) {
      next(err);
    }
    res.status(200).json(results.rows);
  })
}

const createAuthor = (req, res, next) => {
  let { firstName, lastName } = req.body;
  pool.query('INSERT INTO author (first_name, last_name) VALUES ($1, $2)', [firstName, lastName], (err, results) => {
    if (err) {
      next(err);
    }
    res.status(201).send(`Author added.`);
  })  
}

const updateAuthor = (req, res, next) => {
  const id = req.params.id.toString();
  const { firstName, lastName } = req.body;
  pool.query( 
    'UPDATE author SET first_name = $1, last_name = $2 WHERE id = $3', 
    [firstName, lastName, id],
    (err, results) => {
      if (err) {
        next(err)
      }
      res.status(200).send(`Author modified with ID: ${id}`)
    }
  )
}

const deleteAuthor = (req, res) => {
  const id = req.params.id.toString();
  pool.query('DELETE FROM author WHERE id = $1', [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Author deleted with ID: ${id}`)
  })
}

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor, 
  updateAuthor,
  deleteAuthor,
  getAuthorBooks
}