import React from 'react';
import css from "../css/imageGalleryItem.module.css"

const ImageGalleryItem = ({ id, imgUrl, imgBigUrl, onClick }) => {
    return (
        <li key={id} className={css.ImageGalleryItem} onClick={onClick}>
            <img className={css.ImageGalleryItemImage} src={imgUrl} alt={imgBigUrl} />
        </li>
    )
}

export default ImageGalleryItem;