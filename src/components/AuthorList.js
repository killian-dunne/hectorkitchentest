import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AuthorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: []
    }
  }

  componentDidMount(){
   
  }

  render() {
    return (
      <>
        <h2 className="text-center mt-2">Authors</h2>
        <div className="d-flex justify-content-end add-container">
          <Link className="btn btn-primary mr-2 float-right mb-2" to={`/author`}>Add Author</Link>
        </div>
        <ul className="list-group list-group-flush">
          {this.state.authors.map(author => <li className="list-group-item pl-md-5">⮚ {author.firstName + " " + author.lastName}</li>)}
        </ul>
      </>
    );
  }
}

export default AuthorList;