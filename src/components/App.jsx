import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./Loader";

import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Modal from "./Modal";
import LoadMoreBtn from "./LoadMoreBtn";
import { fetchPictures } from "api/api";


import css from "../css/app.module.css";
export class App extends Component {
  state = {
    query: '',
    showModal: false,  
    modalData: null,
    pictures: [],
    error: null,
    status: 'idle',
    page: 1,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const newQuery = this.state.query;
    if (prevQuery !== newQuery) {
      console.log(newQuery);
      this.setState({ pictures: [] });
      this.updateGallery(newQuery)
      this.setState({
        status: 'pending',
        page: 1,
      });
    }
    if (newQuery === prevQuery && this.state.page !== prevState.page) {
      this.updateGallery(prevQuery);
    }
  };

  updateGallery(query) {
    fetchPictures(query, this.state.page)
      .then(pictures => {
        if (pictures.totalHits === 0) {
          toast(`Nothing was found for query ${this.state.query}`);
          console.log(pictures,'No pictures');
        }
      console.log(pictures.hits);
      this.setState({
        pictures: [...this.state.pictures, ...pictures.hits],
        status: 'resolved',
        totalHits: pictures.totalHits,
      });
    })
    .catch(error => {
      this.setState({ error, status: 'error' });
    })
  }

  toggleModal = (dataInModal) => {
    console.log('toggleModal')
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalData: dataInModal,
    }));
  };
  
  hideLoadMoreButton = (totalHits, arr) => {
    console.log(totalHits, arr.length);
    return totalHits > arr.length;
  }


  loadMoreHandler = () => {
    this.setState((prevState) => ({
     page: prevState.page + 1
    }));
  };
  
  submitHandler = query => {
    this.setState({query});
  };
  
  render() {
    const {pictures, showModal} = this.state;
    return <div className={css.App}>
      {showModal && <Modal onClose={this.toggleModal} img={this.state.modalData }/>}
      <Searchbar onSubmit={this.submitHandler} />
      {this.state.status==='pending' && <Loader />}
      <ImageGallery pictures={pictures} showModal={this.toggleModal} />
      {(this.hideLoadMoreButton(this.state.totalHits,this.state.pictures)) && <LoadMoreBtn onClick={this.loadMoreHandler} />}
      {<ToastContainer /> }
    </div>
  }
};

        
        // if (status === 'idle') {
        //     return <div>No data</div>
        // }

        // if (status === 'pending') {
        //     return <Loader/ >
        // }
        
        // if (status === 'rejected') {
        //     return <div>{error.message}</div>
        // }
