import React, { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import Loader from "./Loader";
import { fetchPictures } from "api/api";
import css from "../css/imageGallery.module.css"



export default class ImageGallery extends Component {
    state = {
        pictures: null,
        error: null,
        status: 'idle',
    }

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.query;
        const newQuery = this.props.query;
        if (prevQuery !== newQuery) {
            console.log(newQuery);

            this.setState({status:'pending'});

                fetchPictures(newQuery,1).then(pictures => {
                    console.log(pictures.hits);
                    this.setState({ pictures: pictures.hits, status:'resolved' });
                })
                .catch(error => {
                    this.setState({ error, status: 'error' });
                })
        }
    }
    
    
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
            return <ul className={css.ImageGallery}>
                {pictures.map(picture =>
                    <ImageGalleryItem
                        key={picture.id}
                        imgUrl={picture.webformatURL}
                        imgBigUrl={picture.largeImageURL}
                        onClick={()=>this.props.openModal(picture.largeImageURL)}
                    />
                )}
            </ul>
        }
    }
}