import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";
import css from "../css/imageGallery.module.css"

const ImageGallery = ({ pictures, showModal }) => {
    return (
        <ul className={css.ImageGallery}>
            {pictures.map(picture =>
                <ImageGalleryItem
                    key={picture.id}
                    imgUrl={picture.webformatURL}
                    imgBigUrl={picture.largeImageURL}
                    showModal={showModal}
                />
            )}
        </ul>
    )
}

export default ImageGallery;