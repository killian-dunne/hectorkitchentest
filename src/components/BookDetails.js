import React, { Component } from 'react';
import BookCard from './BookCard';
import Axios from 'axios';
import { Switch, Route } from 'react-router-dom';


class BookDetails extends Component {
  constructor(props) {
    super (props);
    this.state = {
      book: {},
      author: {},
      authorList: [],
      newItem: true
    }
  }

  componentDidMount() {
    let newItem = !window.location.pathname.match(/\/book\/\d+/g);
    this.setState({
      newItem
    })
    if (!newItem) {
      let ending = window.location.pathname.split('/')[2];
      Axios.get(`/api/book/${ending}`).then(res => {
        if (res.data) {
          let data = res.data[0];
          let book = {
            name: data.name,
            isbn: data.isbn,
            author_id: data.author_id
          }
          let author = {
            first_name: data.first_name,
            last_name: data.last_name,
            id: data.id
          }
          this.setState({ book, author })
        }
      });
    }
    Axios.get('/api/authors').then(res => {
      console.log(res.data);
      this.setState({
        authorList: res.data
      })
    })
  }

  handleParamChange = (param, e) => {
    e.persist();
    e.preventDefault();
    if (param == "author_id") {
      Axios.get(`/api/author/${e.target.value}`).then(res => {
        if (res.data) {
          let author = res.data[0];
          let book = this.state.book;
          book.author_id = e.target.value;
          this.setState({author, book})
        }
      });
    } else if (["isbn", "name"].includes(param)) {
      this.setState(prevState => {
        let book = Object.assign({}, prevState.book);
        book[param] = e.target.value;
        return { book };
      })
    } else {
      console.log('param not recognised');
    }
  }

  submitBook = (e) => {
    e.persist();
    e.preventDefault();
    let [firstName, lastName] = [this.state.author.first_name, this.state.author.last_name];
    let data = {
      name: this.state.book.name,
      isbn: this.state.book.isbn,
      author_id: this.state.book.author_id,
      firstName, 
      lastName
    }
    let method = this.state.newItem ? 'post' : 'put';
    let url = this.state.newItem ? '/api/book' : '/api/book/' + data.isbn;
    Axios({
      method, url, data
    });
    window.location.pathname = '/books';
  }

  deleteBook = () => {
    Axios({
      method: 'delete',
      url: `/api/book/${this.state.book.isbn}`
    })
    window.location.pathname = '/books';
  }

  render() {
    let updateButtons = (
      <>
        <button className="btn btn-primary mx-2" type="submit">Update</button>
        <button className="btn btn-secondary mx-2" onClick={this.deleteBook}>Delete</button>
      </>);
    let createButton = <button className="btn btn-primary mx-2" type="submit">Create</button>
    return (
      <Switch>
        <Route path={`/book/:isbn`}>
          <BookCard 
            book={this.state.book} 
            author={this.state.author} 
            buttons={updateButtons} 
            newItem={false} 
            handleParamChange={this.handleParamChange} 
            submitBook={this.submitBook}
            authorList={this.state.authorList} />
        </Route>
        <Route path={`/book`}>
          <BookCard 
            book={this.state.book} 
            author={this.state.author} 
            buttons={createButton} 
            newItem={true} 
            handleParamChange={this.handleParamChange} 
            submitBook={this.submitBook}
            authorList={this.state.authorList}/>
        </Route>
      </Switch>
    );
  }
}

export default BookDetails;