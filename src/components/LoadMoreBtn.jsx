import React from "react";
import css from "../css/loadMore.module.css"

const LoadMoreBtn = ({ onClick }) => {
    return <button className={css.Button } onClick={onClick}>Load More</button>
}

export default LoadMoreBtn