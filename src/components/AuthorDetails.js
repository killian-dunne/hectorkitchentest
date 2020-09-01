import React, { Component } from 'react';
import BookCard from './BookCard';
import Axios from 'axios';
import { Link, Switch, Route } from 'react-router-dom';
import AuthorCard from './AuthorCard';


class AuthorDetails extends Component {
  constructor(props) {
    super (props);
    this.state = {
      books: [],
      firstName: '',
      lastName: '',
      newItem: true
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
          let data = res.data[0];
          let firstName = data.firstname;
          let lastName = data.lastname;
          let books;
          this.setState({ firstName,lastName })
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

  handleNewItem = (e) => {
    e.persist();
    e.preventDefault();
    let data = {
      firstname: this.state.firstName,
      lastname: this.state.lastName
    }
    Axios({
      method: 'post', 
      url: `/api/authors`,
      data
    });
  }

  render() {
    let updateButtons = (
      <>
        <button className="btn btn-primary mx-2" type="submit">Update</button>
        <button className="btn btn-secondary mx-2">Delete</button>
      </>);
    let createButton = <button className="btn btn-primary mx-2" type="submit" onClick={this.handleNewItem}>Create</button>
    return (
      <Switch>
        <Route path={`/author/:id`}>
          <AuthorCard firstName={this.state.firstName} lastName={this.state.lastName} buttons={updateButtons} newItem={false} handleParamChange={this.handleParamChange}/>
        </Route>
        <Route path={`/author`}>
          <AuthorCard firstName={this.state.firstName} lastName={this.state.lastName} buttons={createButton} newItem={true} handleParamChange={this.handleParamChange}/>
        </Route>
      </Switch>

    );
  }
}

export default AuthorDetails;