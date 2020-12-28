import React from "react";

import { SearchBase } from "./search.js";
import "./search.m.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchFormOpen: false,
      initialized: false
    };
    this.textInput = React.createRef();
    this.textInputMob = React.createRef();
  }

  componentDidMount() {
    this.setState({
      initialized: true
    });
  }

  toggleSearchForm = () => {

    this.setState({ isSearchFormOpen: !this.state.isSearchFormOpen }, () => {
      this.textInput.current.focus();
      this.textInputMob.current.focus();
    });
  };

  render() {
    const formStyle = {
      display: this.state.isSearchFormOpen ? "flex" : "none"
    };
    const initialStyle = {
      opacity: this.state.isSearchFormOpen ? 0 : 1
    };
    const searchStyle = {
      transform: this.state.isSearchFormOpen ? "translate(0, 0)" : ""
    };

    return (
      <React.Fragment>
        <div styleName="qt-search">
          <SearchBase
            toggleSearchForm={this.toggleSearchForm}
            formStyle={formStyle}
            searchStyle={searchStyle}
            initialStyle={initialStyle}
            id="formDesk"
            innerRef={this.textInput}
            ref={null}
          />
        </div>
        <div styleName="search-wraper" style={searchStyle}>
          <div className="container">
            <div styleName="search-wrapper-inside">
              <SearchBase
                toggleSearchForm={this.toggleSearchForm}
                initialStyle={initialStyle}
                innerRef={this.textInputMob}
                ref={null}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export { Search };
