import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BookCard extends Component {
  constructor(props) {
    super (props);
  }

  render() {
    let title = this.props.newItem ? "Add Book" : "Update Book";
    let isbnInput = this.props.newItem 
      ? <input type="text" className="form-control" id="isbn" aria-describedby="isbnHelp" value={this.props.book.isbn} onChange={e => this.props.handleParamChange("isbn", e)}/>
      : <input type="text" className="form-control" id="isbn" aria-describedby="isbnHelp" value={this.props.book.isbn} readOnly />
    return (
        <>
          <h3>{title}</h3>
          <form id="form" onSubmit={this.props.submitBook}>
            <div className="form-group row">
              <label for="name" className="col-sm-3 col-form-label">Book name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="name" aria-describedby="nameHelp" value={this.props.book.name} onChange={e => this.props.handleParamChange("name", e)} />
              </div>
            </div>
            <div className="form-group row">
              <label for="author" className="col-sm-3 col-form-label">Book author</label>
              <div className="col-md-9">
                <select className="custom-select" id="author" onChange={e => this.props.handleParamChange("author_id", e)}>
                  {this.props.authorList.map(author => (
                    <option selected={this.props.book.author_id == author.id} value={author.id}>{author.first_name + " " + author.last_name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group row">
              <label for="isbn" className="col-sm-3 col-form-label">Book ISBN</label>
              <div className="col-sm-9">
                {isbnInput}
              </div>
            </div>
            <Link className="btn btn-secondary mx-2" to="/books">Back</Link>
            {this.props.buttons}
          </form>
        </>
    );
  }
}

export default BookCard;