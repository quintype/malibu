
import React from "react";
import { SearchBox } from '@quintype/components';
import assetify from '@quintype/framework/assetify';

import './styles.m.css';

import search from './search.png';
import search2x from './search@2x.png';
import search3x from './search@3x.png';
import { Search } from '../../basic/icons/search';
import { CloseIcon } from '../../basic/icons/close-icon';



function DrawForm({children}) {
  return [
    <label styleName="qt-search__form-label" htmlFor="searchForm" key="1">
      {children}
    </label>,
    <button type="submit" styleName="qt-search__form-submit" key="2"><Search width="16" height="16"/></button>
  ];
}

class NavbarSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchFormOpen: false,
      initialized: false
    };
  }

  componentDidMount() {
    this.setState({
      initialized: true
    })
  }

  componentWillReceiveProps() {
    this.setState({
      isSearchFormOpen: false
    });
  }

  toggleSearchForm() {
    this.setState({isSearchFormOpen: !this.state.isSearchFormOpen}, () => {document.getElementById("searchForm").focus();})
  }

  render() {
    let formStyle = {
       transform: this.state.isSearchFormOpen ? 'translate(0, 0)' : ''

    }
    let initialStyle = {
      opacity: this.state.initialized ? 1 : 0
    }
    return <div styleName="qt-search" style={initialStyle}>
      <button styleName="btn_search" onClick={() =>this.toggleSearchForm()}>
        <img
        srcSet={` ${assetify(search)},
            ${assetify(search2x)} 2x,
            ${assetify(search3x)} 3x`}
          src={assetify(search)} alt="Search" />
      </button>
      <div id="searchBox" styleName='qt-search-form' style={formStyle}>
        <SearchBox className="component-wrapper"
                   template={DrawForm}
                   inputId="searchForm"
                   inputRef={(input) => this.input = input}
                   inputClassName="qt-search__form-input"
                   formRef={(searchForm) => this.searchForm = searchForm}
                   onSubmitHandler={() => this.setState({isSearchFormOpen: false})}
                   onEscape={() => this.setState({isSearchFormOpen: false})}
                   placeholder="Search Stories" />
        <div styleName="close-icon" onClick={() =>this.toggleSearchForm()}>
          <CloseIcon  color="#fff" />
        </div>

      </div>
    </div>
  }
}

export { NavbarSearch };
