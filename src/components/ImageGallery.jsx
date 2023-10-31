import React, { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import Loader from "./Loader";

const BASE_URL = "https://pixabay.com/api/";
const ITEM_PER_PAGE = 12;
const KEY = "39464156-6c3d114a5269f1cf634bfe107"

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

            const url = `${BASE_URL}?q=${newQuery}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${ITEM_PER_PAGE}`
            console.log(url);
            fetch(url
                //For Axios only
                //         // params : {
                //         //     key: "39464156-6c3d114a5269f1cf634bfe107",
                //         //     q: newQuery,
                //         //     safesearch: true,   
                //         //     per_page: ITEM_PER_PAGE,
                //         //     image_type: "photo",
                //         //     orientation: "horizontal",
                //         // },
            )
                .then(res => res.json())
                .then(pictures => {
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
            return <ul className="gallery">
                {pictures.map(picture =>
                    <ImageGalleryItem
                        key={picture.id}
                        imgUrl={picture.webformatURL}
                        imgName={picture.largeImageURL}
                    />
                )}
            </ul>
        }
    }
}