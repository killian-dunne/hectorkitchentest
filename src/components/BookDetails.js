import React, { Component } from 'react';
import BookCard from './BookCard';
import Axios from 'axios';
import { Link, Switch, Route } from 'react-router-dom';


class BookDetails extends Component {
  constructor(props) {
    super (props);
    this.state = {
      book: {},
      author: {},
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
            fullName: data.firstname + " " + data.lastname
          }
          this.setState({ book, author })
        }
      });
    }
  }

  handleParamChange = (param, e) => {
    e.persist();
    e.preventDefault();
    if (param == "fullName") {
      this.setState(prevState => {
        let author = Object.assign({}, prevState.author);
        author[param] = e.target.value;
        return { author }
      })
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

  handleNewItem = (e) => {
    e.persist();
    e.preventDefault();
    let [firstname, lastname] = this.state.author.fullName.split(' ');
    let data = {
      name: this.state.book.name,
      isbn: this.state.book.isbn,
      author_id: this.state.book.author_id,
      firstname, 
      lastname
    }
    Axios({
      method: 'post', 
      url: `/api/book`,
      data
    });
  }

  render() {
    let type = this.props.type;
    let identifier = type == "book" ? ":isbn" : ":id";
    let updateButtons = (
      <>
        <button className="btn btn-primary mx-2" type="submit">Update</button>
        <button className="btn btn-secondary mx-2">Delete</button>
      </>);
    let createButton = <button className="btn btn-primary mx-2" type="submit" onClick={this.handleNewItem}>Create</button>
    return (
      <Switch>
        <Route path={`/book/:isbn`}>
          <BookCard book={this.state.book} author={this.state.author} buttons={updateButtons} newItem={false} handleParamChange={this.handleParamChange}/>
        </Route>
        <Route path={`/book`}>
          <BookCard book={this.state.book} author={this.state.author} buttons={createButton} newItem={true} handleParamChange={this.handleParamChange}/>
        </Route>
      </Switch>

    );
  }
}

export default BookDetails;