// import { Component } from "react";
import React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

export const Modal = ({ imageAddress, onClick }) => {

  const modalClose = (event) => {
    if (event.key === "Escape" || event.type === "click") {
      onClick("");
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", modalClose, false)
    return () => document.addEventListener("keydown", modalClose, false)
  })
  
  return (
    <div className={css.modal} onClick={modalClose}>
      <div>
        <img className={css.modalImage} src={imageAddress} alt="modal" />
      </div>
    </div>
  )
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  imageAddress: PropTypes.string.isRequired
}
