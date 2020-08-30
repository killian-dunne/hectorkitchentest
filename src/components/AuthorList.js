import React, { Component } from 'react';
const authors = require('../authors.json')

class AuthorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: []
    }
  }

  componentDidMount(){
    this.setState({ authors })
  }

  render() {
    return (
      <div>
        <h2 className="author-heading text-center mt-2">Authors</h2>
        <ul className="list-group list-group-flush">
          {authors.map(author => 
            (<li className="list-group-item">{author.firstName + " " + author.lastName}</li>)
          )}
        </ul>
      </div>
    );
  }
}

export default AuthorList;