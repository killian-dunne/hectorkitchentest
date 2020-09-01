import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import DetailsView from './DetailsView';
import AuthorCard from './AuthorCard';
import Axios from 'axios';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    }
  }

  componentDidMount() {
    if (this.props.match.path.split("/").length <= 2) {
      Axios.get(`/api/${this.props.type}s`).then(res => {
        this.setState({
          items: res.data
        })
      });
    }
  }

  render() {
    let title = this.props.type == "book" ? "Books" : "Authors";
    let type = this.props.type == "book";
    return (
      <>
        <h2 className="text-center mt-2">{title}</h2>
        <div className="d-flex justify-content-end add-container">
          <Link className="btn btn-primary mr-2 float-right mb-2" to={`/${this.props.type}/`}>Add {type ? "Book" : "Author"}</Link>
        </div>
        <ul className="list-group list-group-flush">
          {this.state.items.map(item => {
            let itemContent = type ? item.name : item.firstName + ' ' + item.lastName;
            if (itemContent.length > 1) {
              return <li className="list-group-item pl-md-5">⮚ {itemContent}</li>
            } else {
              console.log('Problem loading item');
            }
          })}
        </ul>
      </>
    );
  }
}

export default ListView;
