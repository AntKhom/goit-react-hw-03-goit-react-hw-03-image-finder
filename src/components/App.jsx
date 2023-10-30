import React, { Component } from "react";
// import { ToastContainer } from 'react-toastify';

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";

export class App extends Component {
  state = {
    query: '',
  }
  
  submitHandler = query => {
    this.setState({query});
  };
  
  render() {
    return <div>
      <Searchbar onSubmit={this.submitHandler} />
      <ImageGallery query={this.state.query } />
      {/* <ToastContainer />   */}
    </div>
  }
};
