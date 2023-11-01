import React, { Component } from "react";
import css from "../css/modal.module.css"

export default class Modal extends Component {
    
    componentDidMount() {
        window.addEventListener('keydown', this.keyDownHandler);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyDownHandler);
    };
    
    keyDownHandler = e => {
        console.log(e.code)
        if (e.code === 'Escape') {
            this.props.onClose();
        };
    };

    backdropClickHandler = (e) => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
        
    }

    render() {
        return (
            <div className={css.Overlay} onClick={this.backdropClickHandler}>
                <div className={css.Modal}>
                    <img src={this.props.img} alt="" />
                </div>
            </div>
        )    
     }
}