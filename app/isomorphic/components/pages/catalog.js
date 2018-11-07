import React from "react";
import { getCollectionTemplate } from "../get-collection-template";
import { Collection } from "@quintype/components";
import PT from "prop-types";
import "./catalog.m.css";

function layoutToCollection(template, stories, associatedMetadata) {
  return {
    // association fields
    type: "collection",
    "associated-metadata": Object.assign({}, associatedMetadata, {
      layout: template.name
    }),

    // Internal Fields
    templatePageDisplay: template.display,
    options: template.options,

    // collection fields
    name: "Collection Name",
    slug: "name",
    template: "default",
    items: stories.map(story => ({ type: "story", id: story.id, story: story }))
  };
}

function createTemplateClass(template, updateTemplateAttribute) {
  class Wrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isDropdownOpen: false,
        componentKey: "start"
      };
      this.toggleDropdown = this.toggleDropdown.bind(this);
      this.configureData = this.configureData.bind(this);
    }

    toggleDropdown() {
      this.setState(prevState => {
        return {
          isDropdownOpen: !prevState.isDropdownOpen
        };
      });
    }

    configureData() {
      this.setState({
        componentKey: String(Math.random()),
        isDropdownOpen: false
      });
    }

    optionToFormField(option) {
      switch (option.type) {
        case "number":
          return (
            <div key={option.name} styleName="option-wrapper">
              <label>{option.name}</label>
              <input
                styleName="numberInput"
                type="number"
                placeholder={`${option.default}`}
                value={
                  this.props.collection["associated-metadata"][option.name] ||
                  ""
                }
                onChange={e =>
                  updateTemplateAttribute(option.name, Number(e.target.value))
                }
              />
            </div>
          );
        case "boolean":
          return (
            <div styleName="checkboxWrapper option-wrapper" key={option.name}>
              <input
                styleName="checkboxInput"
                type="checkbox"
                checked={
                  this.props.collection["associated-metadata"][option.name] ||
                  false
                }
                onChange={e =>
                  updateTemplateAttribute(option.name, e.target.checked)
                }
              />
              <span>{option.name}</span>
            </div>
          );
        default:
          return (
            <div key={option.name} styleName="option-wrapper">
              <label>{option.name}</label>
              <input
                type="text"
                placeholder={`${option.default}`}
                value={
                  this.props.collection["associated-metadata"][option.name] ||
                  ""
                }
                onChange={e =>
                  updateTemplateAttribute(option.name, e.target.value)
                }
              />
            </div>
          );
      }
    }

    render() {
      return (
        <div styleName="container">
          <div styleName="widget-header" className="component-wrapper">
            <div>
              <h3>{template}</h3>
              <p styleName="widget-description">
                {this.props.collection.templatePageDisplay}
              </p>
            </div>
            <div styleName="widget-options">
              {this.props.collection.options.length !== 0 && (
                <div styleName="options">
                  <button styleName="btn" onClick={this.toggleDropdown}>
                    Options
                  </button>
                  {this.state.isDropdownOpen && (
                    <div styleName="dropdownBox">
                      {this.props.collection.options.map(option =>
                        this.optionToFormField(option)
                      )}
                      <button
                        styleName="configureBtn"
                        onClick={this.configureData}
                      >
                        Configure
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div styleName="widget-container" key={this.state.componentKey}>
            {React.createElement(getCollectionTemplate(template), this.props)}
          </div>
        </div>
      );
    }
  }

  Wrapper.propTypes = {
    collection: PT.shape({
      "associated-metadata": PT.object,
      templatePageDisplay: PT.string,
      options: PT.array
    })
  };

  return Wrapper;
}

export class CatalogPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TwoCol: {auto_scroll: false}
      componentToOptions: {}
    };
    const templates = {};
    this.templatePicker = template => {
      if (!templates[template]) {
        templates[template] = createTemplateClass(
          template,
          this.updateComponentAttribute.bind(this, template)
        );
      }
      return templates[template];
    };
  }

  updateComponentAttribute(name, key, value) {
    this.setState({
      componentToOptions: Object.assign({}, this.state.componentToOptions, {
        [name]: Object.assign({}, this.state.componentToOptions[name], {
          [key]: value
        })
      })
    });
  }

  buildHomeCollection() {
    return {
      name: "Home",
      slug: "/",
      template: "default",
      items: this.props.data.templateOptions["collection-layouts"].map(c =>
        layoutToCollection(
          c,
          this.props.data.stories,
          this.state.componentToOptions[c.name]
        )
      )
    };
  }

  render() {
    return (
      <div>
        <Collection
          collection={this.buildHomeCollection()}
          collectionTemplates={this.templatePicker}
        />
      </div>
    );
  }

  componentDidMount() {
    global.document.body.classList.add("template-options");
  }

  componentWillUnmount() {
    global.document.body.classList.remove("template-options");
  }
}

CatalogPage.propTypes = {
  data: PT.shape({
    templateOptions: PT.shape({
      "collection-layouts": PT.array
    }),
    stories: PT.array
  })
};
