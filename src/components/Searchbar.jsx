import React, { Component } from "react";
// import { toast } from 'react-toastify';
import css from "../css/searchbar.module.css";

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
            <header className={css.Searchbar }>
                <form onSubmit={this.submitHandler} className={css.SearchForm }>
                    <button type="submit" className={css.SearchFormButton }>
                        <span className={css.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={css.SearchFormInput}
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

