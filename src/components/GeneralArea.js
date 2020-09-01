import React, { Component } from 'react';
import BookForm from './BookForm';
import AuthorForm from './AuthorForm';
import axios from 'axios';
import BookCard from './BookCard';
const books = require('../books.json')

class BookList extends Component {
  state = {
    books: [],
    bookForm: false,
    authorForm: false,
  };
  componentDidMount() {
    axios.get("/books").then((response) => {
      this.setState({
        books: response.data
      })
    });
  }

  toggleBookForm = () => {
    let bookForm = !this.state.bookForm;
    this.setState({ bookForm })
  }

  toggleAuthorForm = () => {
    let authorForm = !this.state.authorForm;
    this.setState({ authorForm })
  }

  render() {
    const { books } = this.state;
    const bookFormVisible = this.state.bookForm ? "" : "hide";
    const authorFormVisible = this.state.authorForm ? "" : "hide";
    return (
      <div className="w-75 mt-4">
        <div className="d-flex flex-row">
          <div>
            <button className="btn btn-primary mr-2" onClick={this.toggleBookForm}>Add Book</button>
          </div>
          <div>
            <button className="btn btn-secondary" onClick={this.toggleAuthorForm}>Add Author</button>
          </div>
          <AuthorForm authorFormVisible={authorFormVisible}/>
        </div>
        <BookForm bookFormVisible={bookFormVisible} />
        {books.map((book) => (
          <BookCard name={book.name} author={book.author_id} isbn={book.isbn} />
        ))}
      </div>
    );
  }
}

export default BookList;