import React, { Component } from "react";
// import { ToastContainer } from 'react-toastify';

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";

import css from "../css/app.module.css";
export class App extends Component {
  state = {
    query: '',
    showModal: false,  
    modalData: null,
  }

  toggleModal = (dataInModal) => {
    console.log('toggleModal')
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalData: dataInModal,
    }));
  };
      
  
  submitHandler = query => {
    this.setState({query});
  };
  
  render() {
    const {query,showModal} = this.state;
    return <div className={css.App}>
      {showModal && <Modal onClose={this.toggleModal} img={this.state.modalData }/>}
      <Searchbar onSubmit={this.submitHandler} />
      <ImageGallery query={query} openModal={this.toggleModal} />
      {/* <ToastContainer />   */}
    </div>
  }
};
