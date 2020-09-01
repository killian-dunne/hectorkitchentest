import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import Axios from 'axios';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    Axios.get(`/api/books`).then(res => {
      this.setState({
        books: res.data
      })
    });
  }

  render() {
    return (
      <>
        <h2 className="text-center mt-2">Books</h2>
        <div className="d-flex justify-content-end add-container">
          <Link className="btn btn-primary mr-2 float-right mb-2" to={`/book`}>Add Book</Link>
        </div>
        <ul className="list-group list-group-flush">
          {this.state.books.map(book => (
            <Link to={`/book/${book.isbn}`} className="prevent-link-css">
              <li className="list-group-item">⮚ {book.name}</li>
            </Link>
          ))}
        </ul>
      </>
    );
  }
}

export default BookList;
