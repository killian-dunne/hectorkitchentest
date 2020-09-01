import React, { Component } from 'react';

class Navbar extends Component {

  toggleNavbar = () => {
    document.querySelector('#navbarSupportedContent').classList.toggle('collapse');
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" onClick={this.toggleNavbar}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/books">Books <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="/authors">Authors <span className="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;