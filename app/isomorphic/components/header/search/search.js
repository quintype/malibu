import React from "react";
import PT from "prop-types";
import assetify from "@quintype/framework/assetify";

import SearchIcon from "../../basic/images/search.svg";
import CloseIcon from "../../basic/images/close.svg";

import "./search.m.css";

class SearchBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
    };
  }
  handleChange = (e) => {
    const { value } = e.target
    this.setState({
        name: value.replace(/ /g, "-")
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    window.location = `/topic/${this.state.name}`;
  }
  render() {
    return (
      <React.Fragment>
        <div id="searchBox" styleName="qt-search-form" style={this.props.formStyle} className="qt-search-forms">
          <div styleName="search-mobile">
            <form onSubmit={this.handleSubmit} method="get">
              <div styleName="input-group">
                <input
                  id={this.props.id}
                  ref={this.props.innerRef}
                  name='name'
                  styleName="header-search"
                  placeholder="Search.."
                  name="q"
                  required
                  onChange={e => this.handleChange(e)}
                />
                <span className="input-group-btn">
                  <button type="submit" styleName="btn-search">
                    <img width="20" src={`${assetify(SearchIcon)}`} alt="search" />
                  </button>
                </span>
              </div>
            </form>
          </div>
          <div styleName="close-icon" onClick={this.props.toggleSearchForm}>
            <img src={`${assetify(CloseIcon)}`} alt="close" />
          </div>
        </div>
        <button styleName="btn_search" onClick={this.props.toggleSearchForm} style={this.props.initialStyle}>
          <img src={`${assetify(SearchIcon)}`} alt="search" />
        </button>
      </React.Fragment>
    );
  }
}
export { SearchBase };

SearchBase.propTypes = {
  formStyle: PT.object,
  initialStyle: PT.object,
  searchStyle: PT.object,
  id: PT.string,
  toggleSearchForm: PT.func,
  innerRef: PT.object
};
