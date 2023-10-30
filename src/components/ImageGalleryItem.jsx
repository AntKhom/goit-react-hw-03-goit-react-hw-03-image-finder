import React from 'react';

const ImageGalleryItem = ({id, imgUrl,imgName}) => {
    return (
        <li key={id} className="gallery-item">
            <img src={imgUrl} alt={imgName} />
        </li>
    )
}

export default ImageGalleryItem;