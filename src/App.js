import React from "react";
import axios from "axios";
import "./styles.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import GeneralArea from './components/GeneralArea';
import AuthorList from './components/AuthorList';

export default class App extends React.Component {
  render() {
    return (
      <>
        <Navbar/>
        <div class="w-100 container d-flex flex-row justify-content-around">
          <GeneralArea />
          <AuthorList />
        </div>
        
      </>
    );
  }
}