import React, { Component } from 'react';

class AuthorCard extends Component {
  constructor(props) {
    super (props);
  }

  render() {
    let author = this.props.item;
    return (
      <>
        {/* <h5 className="card-title">{this.props.name}</h5> */}
        <div className="d-flex justify-content-between">
          <div>{author.firstName}</div>
          <div>{author.lastName}</div>
        </div> 
      </>
    );
  }
}

export default AuthorCard;