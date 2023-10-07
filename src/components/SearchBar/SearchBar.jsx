// import { Component } from "react";
import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import css from "./SearchBar.module.css";

const INITIAL_STATE = {
    name: ""
}

export const SearchBar = ({ onSubmit }) => {
  const [searchInfo, setSearchInfo] = useState(INITIAL_STATE)

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name } = searchInfo
    onSubmit(name)

    setSearchInfo(INITIAL_STATE)
  }

  const handleChange = (event) => {
    const { value } = event.currentTarget
    setSearchInfo({ name: value })
  }

  return (
    <header>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={searchInfo.name}
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