import React, { Component } from "react";
import ImageGalleryItem from "./ImageGalleryItem";

const BASE_URL = "https://pixabay.com/api/";
const ITEM_PER_PAGE = 12;
const KEY = "39464156-6c3d114a5269f1cf634bfe107"

export default class ImageGallery extends Component {
    state = {
        pictures: null,
        loading: false,
        error: null,
    }

    componentDidUpdate(prevProps, prevState) {
        const prevQuery = prevProps.query;
        const newQuery = this.props.query;
        if (prevQuery !== newQuery) {
            console.log(newQuery);

            this.setState({loading: true});

            const url = `${BASE_URL}?q=${newQuery}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${ITEM_PER_PAGE}`
            console.log(url);
            fetch(url
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
                    this.setState({ pictures: pictures.hits });
                })
                .catch(error => {
                    this.setState({ error })
                })
                .finally(() => {
                    this.setState({ loading: false });
                });
        }
    }
    
    
    render() {
        const { error, pictures, loading } = this.state;

        return (
            <div>
                {error && <div>{'error'}</div>}
                {loading && <div>Loading....</div>}
                {!this.props.query && <div>No data</div>}
                {pictures && <ul className="gallery">
                    {pictures.map(picture =>
                        <ImageGalleryItem
                            key={picture.id}
                            imgUrl={picture.webformatURL}
                            imgName={picture.largeImageURL}
                        />
                    )}
                </ul>}
            </div>    
        );
    }    
}