import React, { Component } from 'react';

class AuthorForm extends Component {
  render() {
    return (
      <div className={`add-book w-50 ${this.props.authorFormVisible}`}>
        <form className="d-flex flex-row">
          <div className="form-group ml-2">
            <input type="text" className="form-control" id="firstName" aria-describedby="firstNameHelp" placeholder="First name" />
          </div>
          <div className="form-group ml-2">
            <input type="text" className="form-control" id="lastName" aria-describedby="lastNameHelp" placeholder="Last name" />
          </div>
        </form>
      </div>
    );
  }
}

export default AuthorForm;