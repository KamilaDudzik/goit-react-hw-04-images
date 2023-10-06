import { Component } from "react";
import PropTypes from "prop-types";
import css from "./SearchBar.module.css";

export class SearchBar extends Component {
    state = {
        name: ""
    };

    handlerSubmit = event => {

        event.preventDefault();
        const { name } = this.state;
        this.props.onSubmit(name);
        this.setState({ name: "" });
    }
    
    handlerChange = event => {

        const { value } = event.currentTarget;
        this.setState({ name: value });
    }
    
    render() {
        const { name } = this.state;
        
        return (

            <header>

                <form className={css.form} onSubmit={this.handlerSubmit}>
                    <input
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handlerChange}
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
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    // onChange: PropTypes.element.isRequired,
    // value: PropTypes.element.isRequired // not used in the component
}
