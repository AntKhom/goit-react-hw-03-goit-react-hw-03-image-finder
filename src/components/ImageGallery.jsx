import React, { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import Loader from "./Loader";
import { fetchPictures } from "api/api";
import css from "../css/imageGallery.module.css"
import LoadMoreBtn from "./LoadMoreBtn";



export default class ImageGallery extends Component {
    state = {
        pictures: [],
        error: null,
        status: 'idle',
        page: 1,
        totalHits: 0,
    };

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.query;
        const newQuery = this.props.query;
        if (prevQuery !== newQuery) {
            console.log(newQuery);
            this.setState({pictures: []});
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
        fetchPictures(query,this.state.page).then(pictures => {
            console.log(pictures.hits);
            this.setState({
                pictures: [...this.state.pictures,...pictures.hits],
                status: 'resolved',
                totalHits: pictures.totalHits,
            });
        })
        .catch(error => {
            this.setState({ error, status: 'error' });
        })
    }

    hideLoadMoreButton = (totalHits, arr) => {
        console.log(totalHits, arr.length);
       return totalHits > arr.length;
    }


    loadMoreHandler = () => {
        this.setState((prevState) => ({
            page: prevState.page + 1
        }));
    };
    
    render() {
        const { error, pictures, status } = this.state;

        if (status === 'idle') {
            return <div>No data</div>
        }

        if (status === 'pending') {
            return <Loader/ >
        }
        
        if (status === 'rejected') {
            return <div>{error.message}</div>
        }
        
        if (status === 'resolved') {
            return (
                <div>
                    <ul className={css.ImageGallery}>
                        {pictures.map(picture =>
                            <ImageGalleryItem
                                key={picture.id}
                                imgUrl={picture.webformatURL}
                                imgBigUrl={picture.largeImageURL}
                                onClick={()=>this.props.openModal(picture.largeImageURL)}
                            />
                        )}
                    </ul>
                    {this.hideLoadMoreButton(this.state.totalHits,this.state.pictures)&&<LoadMoreBtn onClick={this.loadMoreHandler}/>}
                </div>
            )     
        }
    }
}