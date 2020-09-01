import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AuthorCard extends Component {
  constructor(props) {
    super (props);
  }

  render() {
    let title = this.props.newItem ? "Add Author" : "Update Author";

    return (
      <>
        <h3>{title}</h3>
        <form id="form" onSubmit={this.props.submitAuthor}>
          <div className="form-group row">
            <label for="firstName" className="col-sm-4 col-form-label">Author first name</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="firstName" aria-describedby="firstNameHelp" value={this.props.firstName} onChange={e => this.props.handleParamChange("firstName", e)} />
            </div>
          </div>
          <div className="form-group row">
            <label for="lastName" className="col-sm-4 col-form-label">Author last name</label>
            <div className="col-sm-8">
              <input type="text" className="form-control" id="lastName" aria-describedby="lastNameHelp" value={this.props.lastName} onChange={e => this.props.handleParamChange("lastName", e)} />
            </div>
          </div>
          <div className="form-group row">
            <label for="nothing" className="col-sm-4 col-form-label">Author's books</label>
            <ul className="list-group list-group-flush col-sm-8">
              {this.props.books.map(book => (
                <li className="list-group-item pl-md-5">⮚ {book.name}</li>
              ))}
            </ul>
          </div>
          <Link className="btn btn-secondary mx-2" to="/authors">Back</Link>
          {this.props.buttons}  
        </form>
      </>
    );
  }
}

export default AuthorCard;