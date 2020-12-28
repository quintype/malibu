import React from "react";
import get from "lodash/get";
import { connect } from "react-redux";
import { Link } from "@quintype/components";
import assetify from "@quintype/framework/assetify";
import { Search } from "../search";

import NavBarToggleBtn from "../../atoms/nav-bar-toggle-btn";
import RightOpenIcon from "../../basic/images/right-open.svg";
import ArrowDownIcon from "../../basic/images/arrow-down.svg";

import "./menu-bar.m.css";

class MenuBarBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstParentId: "",
      secondParentId: "",
      goback: true,
      isMegaMenuOpen: false,
      index: ""
    };
    this.container = React.createRef();
  }

  showChild = (id, key) => {
    this.setState(prevState => {
      if(id === this.state.firstParentId) {
        return {
          firstParentId: id,
          secondParentId: null,
          isMegaMenuOpen: !prevState.isMegaMenuOpen,
          index: key,
          goback: true
         }
      }
      else {
        return {
          firstParentId: id,
          secondParentId: null,
          isMegaMenuOpen: true,
          index: key,
          goback: true
         }
      }
    });
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = event => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        isMegaMenuOpen: false,
        index: ""
      });
    }
  };

  showSecondChild = id => {
    this.setState(prevState => {
      return {
        secondParentId: id,
        goback: !prevState.goback,
        isMegaMenuOpen: true,
      }
    });
  };

  onMenuToggle = (id) => {
      this.setState({
        index: id
      });
  };

  showChildMenu = child => {
    return (
      (child.length >= 1  && this.state.isMegaMenuOpen === true) && (
        <div styleName="dropdown-list">
          <ul styleName="dropdown">
            {child.map(item => {
              return item.title && item.children.length < 1 ? (
                <li styleName="list-item " key={item.title}>
                  {item.isExternalLink ? (
                    <a
                      styleName="menu-item-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.url || "/"}
                    >
                      {item.title}
                    </a>
                  ) : (
                    <Link styleName="menu-item-link" href={item.url || "/"}>
                      {item.title}
                    </Link>
                  )}
                </li>
              ) : (
                <li styleName="list-item menu-item-link" onClick={() => this.showSecondChild(item.id)} key={item.title}>
                  {item.title} {item.children.length >= 1 && <img src={`${assetify(RightOpenIcon)}`} alt="search" />}
                  {this.state.secondParentId === item.id ? this.showSecondChildMenu(item.children) : null}
                </li>
              );
            })}
          </ul>
        </div>
      )
    );
  };

  showSecondChildMenu = child => {
    return this.state.secondParentId !== null && child.length >= 1 ? (
      <ul styleName={`${this.state.goback === true ? "hide-menu" : ""} inner-dropdown`}>
        <li styleName="list-item menu-item-link go-back">
          <span>&#8592;</span> Back
        </li>
        {child.map(item => {
          return (
            item.title && (
              <li styleName="list-item" key={item.title}>
                {item.isExternalLink ? (
                  <a
                    styleName="menu-item-link second-child-menu"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={item.url || "/"}
                  >
                    {item.title}
                  </a>
                ) : (
                  <Link styleName="menu-item-link second-child-menu" href={item.url || "/"}>
                    {item.title}
                  </Link>
                )}
              </li>
            )
          );
        })}
      </ul>
    ) : null;
  };

  render() {
    const menuItems = get(this.props, ["menuItems"], []);
    const currentSection = this.props.pageType === "section-page" ?  this.props.currentPath.split("/")[1]: ""
    return (
      <div styleName="wrapper">
        <div styleName="inner-wrapper">
          <div styleName="menu-group">
            <nav>
              <ul styleName="menu-list" ref={this.container}>
                {menuItems.map((menuItems, index) => {
                  const getHomePage = (this.props.pageType === "home-page" &&  menuItems.title ==="बड़ी खबर") ? "active"  : "";
                  return (
                    menuItems.title && (
                      <React.Fragment>
                        {menuItems["title"] === "Hamburger" ? (
                          <li
                            styleName={`menu-list-item`}
                            key={menuItems.id}
                          >
                            <a onClick={() => this.showChild(menuItems.id, index)}>
                              <NavBarToggleBtn
                              onMenuToggle={() => this.onMenuToggle(index)}
                              isMegaMenuOpen={this.state.isMegaMenuOpen}
                              id={this.state.index}
                            /></a>

                            {this.state.firstParentId === menuItems.id ? this.showChildMenu(menuItems.children) : null}
                          </li>
                        ) : menuItems.children.length < 1 ? (
                          <li styleName={`menu-list-item ${getHomePage} ${ currentSection === menuItems["section-slug"] ? "active": ""}`} key={menuItems.id} >
                            {menuItems.isExternalLink ? (
                              <a
                                styleName="menu-item-link"
                                target="_blank"
                                rel="noopener noreferrer"
                                href={menuItems.url || "/"}
                              >
                                {menuItems.title}
                              </a>
                            ) : (
                              <Link styleName="menu-item-link" href={menuItems.url || "/"}>
                                {menuItems.title}
                              </Link>
                            )}
                          </li>
                        ) : (
                          <li
                            styleName={`menu-list-item ${getHomePage} ${ currentSection === menuItems["section-slug"] ? "active": ""}`}
                            key={menuItems.id}
                          >
                            <a styleName="menu-item-link" onClick={() => this.showChild(menuItems.id, index)}>
                              {menuItems.title}
                              {menuItems.children.length >= 1 && (
                                <img src={`${assetify(ArrowDownIcon)}`} alt="search" />
                              )}
                            </a>
                            {(this.state.firstParentId === menuItems.id) ? this.showChildMenu(menuItems.children) : null}
                          </li>
                        )}
                      </React.Fragment>
                    )
                  );
                })}
              </ul>
            </nav>
          </div>
          <div styleName="search">
            <Search />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pageType : get(state, ["qt", "pageType"], ""),
    currentPath: get(state, ["qt", "currentPath"], "")
  };
};
const MenuBar = connect(mapStateToProps)(MenuBarBase);

export default MenuBar;

