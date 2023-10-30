import React, { Component } from "react";
// import { ToastContainer } from 'react-toastify';

import Searchbar from "./Searchbar";

export class App extends Component {
  state = {
    query: '',
  }

  componentDidMount() {
    fetch('https://pixabay.com/api/?q=cat&page=1&key=39464156-6c3d114a5269f1cf634bfe107&image_type=photo&orientation=horizontal&per_page=12')
      .then(res => res.json())
      .then(console.log);
  }
  
  submitHandler = query => {
    this.setState({query});
  };
  
  render() {
    return <div>
      <Searchbar onSubmit={this.submitHandler} />
      {/* <ToastContainer />   */}
    </div>
  }
};
