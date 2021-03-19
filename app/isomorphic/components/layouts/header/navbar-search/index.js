import React from "react";
import { SearchBox } from "@quintype/components";
import { useDispatch, useSelector } from "react-redux";
import get from "lodash/get";

import { OPEN_SEARCHBAR } from "../../../store/actions";

import { Search } from "../../../atoms/icons/search";
import { CloseIcon } from "../../../atoms/icons/close-icon";

import "./navbar-search.m.css";

function DrawForm({ children }) {
  return [
    <label styleName="search__form-label" htmlFor="searchForm" key="1">
      {children}
    </label>,
    <button aria-label="search-button" type="submit" styleName="search__form-submit" key="2">
      <Search width={16} height={16} />
    </button>
  ];
}

const NavbarSearch = () => {
  const dispatch = useDispatch();
  const isSearchBarOpen = useSelector(state => get(state, ["isSearchBarOpen"], false));
  const toggleSearchForm = () => {
    dispatch({
      type: OPEN_SEARCHBAR,
      isSearchBarOpen: !isSearchBarOpen
    });
    document.getElementById("searchForm").focus();
  };

  const closeSearchBar = () => {
    dispatch({
      type: OPEN_SEARCHBAR,
      isSearchBarOpen: false
    });
  };

  const formStyle = {
    transform: isSearchBarOpen ? "translate(0, 0)" : ""
  };

  return (
    <div styleName="search">
      <button aria-label="search-button" styleName="search__btn" onClick={() => toggleSearchForm()}>
        <Search />
      </button>
      <div styleName="search-form" style={formStyle}>
        <SearchBox
          styleName="search-box"
          template={DrawForm}
          inputId="searchForm"
          inputClassName="search__form-input"
          onSubmitHandler={() => closeSearchBar()}
          onEscape={() => closeSearchBar()}
          placeholder="Search Stories"
        />
        <div styleName="close-icon" onClick={() => toggleSearchForm()}>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};

export { NavbarSearch };
