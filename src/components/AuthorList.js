import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios'

class AuthorList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: []
    }
  }

  componentDidMount(){
   Axios.get('/api/authors').then(res => {
     this.setState({
       authors: res.data
     });
   })
  }

  render() {
    return (
      <>
        <h2 className="text-center mt-2">Authors</h2>
        <div className="d-flex justify-content-end add-container">
          <Link className="btn btn-primary mr-2 float-right mb-2" to={`/author`}>Add Author</Link>
        </div>
        <ul className="list-group list-group-flush">
        {this.state.authors.map(author => 
          (<Link to={`/author/${author.id}`} className="prevent-link-css">
            <li className="list-group-item pl-md-5">⮚ {author.first_name + " " + author.last_name}</li>
          </Link>)
        )}
        </ul>
      </>
    );
  }
}

export default AuthorList;