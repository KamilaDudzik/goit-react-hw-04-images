import { Component } from "react";
import PropTypes from "prop-types";
import css from "./Button.module.css";

export class Button extends Component {
  handlerClick = event => this.props.onClick(event);

  render() {
    return (
      <div className={css.centerButton}>
        <button
          type="button"
          onClick={this.handlerClick}
          className={css.loadMore}
        >
          Load more
        </button>
      </div>
    )
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired
}