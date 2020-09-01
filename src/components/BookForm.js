import React, { Component } from 'react';

class BookForm extends Component {
  render() {
    return (
      <div className={`add-book w-50 mt-4 ${this.props.bookFormVisible}`}>
        <form id="form">
          <div className="form-group">
            <input type="text" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Book name" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" id="author" aria-describedby="authorHelp" placeholder="Book author" />
          </div>
          <div className="form-group">
            <input type="number" className="form-control" id="isbn" aria-describedby="isbnHelp" placeholder="Book isbn" />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }
}

export default BookForm;