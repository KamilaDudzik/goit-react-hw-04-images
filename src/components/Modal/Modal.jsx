import { Component } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

export class Modal extends Component {
  modalClose = event => {
    if (event.key === "Escape" || event.type === "click") {
      this.props.onClick("");
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.modalClose, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.modalClose, false);
  }

  render() {
    const { imageAddress } = this.props;

    return (
      <div className={css.modal} onClick={this.modalClose}>
        <div>
          <img className={css.modalImage} src={imageAddress} alt="modal" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  imageAddress: PropTypes.string.isRequired
}