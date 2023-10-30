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
            <form onSubmit={this.submitHandler}>
                <input
                    type="text"
                    name="searchQuery"
                    value={this.state.query}
                    onChange={this.changeHandler}
                />
                <button type="submit">
                    Найти
                </button>
            </form>
        );
    }
}

