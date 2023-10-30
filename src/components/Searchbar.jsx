import React, { Component } from "react";
// import { toast } from 'react-toastify';

export default class Searchbar extends Component {
    state = {
        query:'',
    }

    changeHandler = e => {
        this.setState({ query: e.target.value });
    };

    submitHandler = e => {
        e.preventDefault();
        if (this.state.query.trim() === '') {
            // toast.error('Please enter')
            return;
        }

        this.props.onSubmit(this.state.query);
        this.setState({ query: '' });
    };

    render() {
        return (
            <header className="searchbar">
                <form onSubmit={this.submitHandler} className="form">
                    <button type="submit" className="button">
                        <span className="button-label">Search</span>
                    </button>

                    <input
                        className="input"
                        type="text"
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                        onChange={this.changeHandler}
                    />
                </form>
            </header>
        );
    }
}

