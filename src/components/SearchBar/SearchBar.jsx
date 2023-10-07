// import { Component } from "react";
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import css from "./SearchBar.module.css";

const INITIAL_STATE = {
    name: ""
}

export const SearchBar = ({ name, onSubmit }) => {

    const [searchInfo, setSearchInfo] = useState(INITIAL_STATE)

    const handlerSubmit = (event) => {
        event.preventDefault()
        const { name } = searchInfo
        onSubmit(name)
        setSearchInfo({ name: "" });
    }
    
    const handlerChange = (event) => {
        const { value } = event.currentTarget;
        setSearchInfo({ name: value });
    }
    
    return (
        <header>
            <form className={css.form} onSubmit={handlerSubmit}>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={handlerChange}
                    value={name}
                    className={css.input}
                />
                <button className={css.submitButton} type="submit">
                    <span>Search</span>
                </button>
            </form>
        </header>
    )
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}
