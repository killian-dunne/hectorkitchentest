import React, { Component } from 'react';
import BookCard from './BookCard';
import Axios from 'axios';
import AuthorCard from './AuthorCard';
import { Link, Switch, Route } from 'react-router-dom';


class DetailsView extends Component {
  constructor(props) {
    super (props);
    this.state = {
      book: {},
      newItem: true
    }
  }

  componentDidMount() {
    let type = this.props.type;
    let newItem = !window.location.pathname.match(/\/(book|author)\/\d+/g);
    this.setState({
      newItem
    })
    if (!newItem) {
      let ending = window.location.pathname.split('/')[2];
      Axios.get(`/api/${type}/${ending}`).then(res => {
        if (res.data) {
          this.setState({
            item: res.data[0]
          })
        }
      });
    }
  }

  handleParamChange = (param, e) => {
    e.persist();
    e.preventDefault();
    console.log(e);
    this.setState(prevState => {
      let item = Object.assign({}, prevState.item);
      item[param] = e.target.value;
      return { item };
    })
  }

  handleNewItem = (e) => {
    e.persist();
    e.preventDefault();
    let data;
    if (this.props.type == "book") {
      data = {
        name: this.state.item.name,
        author_id: this.state.item.author_id,
        isbn: this.state.item.isbn
      } 
    } else {
      data = {
        firstName: this.state.item.firstName,
        lastName: this.state.item.lastName
      }
    }
    Axios({
      method: 'post', 
      url: `/api/${this.props.type}s`,
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
        <Route path={`/${type}/${identifier}`}>
          {type == "book" ?
            <BookCard book={this.state.item} buttons={updateButtons} newItem={false} handleParamChange={this.handleParamChange}
            />
          :
            <AuthorCard author={this.state.item} buttons={updateButtons} newItem={false} handleParamChange={this.handleParamChange}/>
          }
        </Route>
        <Route path={`/${type}`}>
          {type == "book" ?
            <BookCard book={this.state.item} buttons={createButton} newItem={true} handleParamChange={this.handleParamChange}/>
          :
            <AuthorCard author={this.state.item} buttons={createButton} newItem={true} handleParamChange={this.handleParamChange}/>
          }
        </Route>
      </Switch>

    );
  }
}

export default DetailsView;