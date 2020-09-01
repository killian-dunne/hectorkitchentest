import React, { Component } from 'react';
import Axios from 'axios';
import { Switch, Route } from 'react-router-dom';
import AuthorCard from './AuthorCard';


class AuthorDetails extends Component {
  constructor(props) {
    super (props);
    this.state = {
      books: [],
      firstName: '',
      lastName: '',
      newItem: true,
      id: ''
    }
  }

  componentDidMount() {
    let newItem = !window.location.pathname.match(/\/author\/\d+/g);
    this.setState({
      newItem
    })
    if (!newItem) {
      let ending = window.location.pathname.split('/')[2];
      Axios.get(`/api/author/${ending}`).then(res => {
        if (res.data) {
          Axios.get(`/api/author-books/${ending}`).then(res2 => {
            if (res2.data) {
              let books = res2.data;
              console.log(books)
              let firstName = res.data[0].first_name;
              let lastName = res.data[0].last_name;
              let id = res.data[0].id;
              this.setState({ firstName,lastName, books, id })
            }
          })
        }
      });
    }
  }

  handleParamChange = (param, e) => {
    e.persist();
    e.preventDefault();
    if (param == "firstName") {
      this.setState({ firstName: e.target.value })
    } else if (param == "lastName") {
      this.setState({ lastName: e.target.value })
    } else {
      console.log('There has been a param error');
    }
  }

  submitAuthor = (e) => {
    e.persist();
    e.preventDefault();
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      id: this.state.id
    }
    let method = this.state.newItem ? 'post' : 'put';
    let url = this.state.newItem ? '/api/author' : '/api/author/' + this.state.id;
    Axios({
      method,
      url,
      data
    });
    window.location.pathname = "/authors"; 
  }

  deleteAuthor = () => {
    Axios({
      method: 'delete', 
      url: `/api/author/${this.state.id}`
    })
    window.location.pathname = "/authors";
  }

  render() {
    let updateButtons = (
      <>
        <button className="btn btn-primary mx-2" type="submit">Update</button>
        <button className="btn btn-secondary mx-2" onClick={this.deleteAuthor}>Delete</button>
      </>);
    let createButton = <button className="btn btn-primary mx-2" type="submit">Create</button>
    return (
      <Switch>
        <Route path={`/author/:id`}>
          <AuthorCard firstName={this.state.firstName} lastName={this.state.lastName} books={this.state.books} buttons={updateButtons} newItem={false} handleParamChange={this.handleParamChange} submitAuthor={this.submitAuthor} />
        </Route>
        <Route path={`/author`}>
          <AuthorCard firstName={this.state.firstName} lastName={this.state.lastName} books={[]} buttons={createButton} newItem={true} handleParamChange={this.handleParamChange} submitAuthor={this.submitAuthor} />
        </Route>
      </Switch>
    );
  }
}

export default AuthorDetails;