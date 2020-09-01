import React from "react";
import "./styles.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BookList from "./components/BookList";
import AuthorList from "./components/AuthorList";
import BookDetails from "./components/BookDetails";
import AuthorDetails from "./components/AuthorDetails";

export default class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Navbar/>
        <div className="main-area"> 
          <div className="w-50 mt-4 container content-container p-4"> 
            <Switch>
              <Route path="/books" render={() => <BookList /> } />
              <Route path="/authors" render={() => <AuthorList /> } />
              <Route path="/book" render={() => <BookDetails /> } />
              <Route path="/author" render={() => <AuthorDetails /> } />
              <Route path="/" render={() => <BookList /> } />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}