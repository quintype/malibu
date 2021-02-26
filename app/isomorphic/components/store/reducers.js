import { OPEN_HAMBURGER_MENU, OPEN_SEARCHBAR } from "./actions";

function hamburgerMenuReducer(state = false, action) {
  switch (action.type) {
    case OPEN_HAMBURGER_MENU:
      return action.isHamburgerMenuOpen;
    default:
      return state;
  }
}

function searchBarReducer(state = false, action) {
  switch (action.type) {
    case OPEN_SEARCHBAR:
      return action.isSearchBarOpen;
    default:
      return state;
  }
}

export const REDUCERS = {
  isHamburgerMenuOpen: hamburgerMenuReducer,
  isSearchBarOpen: searchBarReducer
};
