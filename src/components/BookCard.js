import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BookCard extends Component {
  constructor(props) {
    super (props);
  }

  render() {
    let title = this.props.newItem ? "Add Book" : "Update Book";
    
    return (
        <>
          <h3 className>{title}</h3>
          <form id="form">
            <div className="form-group row">
              <label for="name" className="col-sm-3 col-form-label">Book name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Harry Potter" value={this.props.book.name} onChange={e => this.props.handleParamChange("name", e)} />
              </div>
            </div>
            <div className="form-group row">
              <label for="author" className="col-sm-3 col-form-label">Book author</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="author" aria-describedby="authorHelp" placeholder="J.K. Rowling" value={this.props.author.fullName} onChange={e => this.props.handleParamChange("fullName", e)}/>
              </div>
            </div>
            <div className="form-group row">
              <label for="isbn" className="col-sm-3 col-form-label">Book ISBN</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="isbn" aria-describedby="isbnHelp" placeholder="054641321891" value={this.props.book.isbn} onChange={e => this.props.handleParamChange("isbn", e)}/>
              </div>
            </div>
            <Link className="btn btn-secondary mx-2">Back</Link>
            {this.props.buttons}
          </form>
        </>
    );
  }
}

export default BookCard;