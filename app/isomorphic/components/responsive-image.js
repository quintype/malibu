const React = require("react");
const {connect} = require("react-redux");
const _ = require("lodash");
const {FocusedImage} = require("quintype-js");

const USED_PARAMS = ["imageCDN","defaultWidth","widths","imgParams","slug","metadata","aspectRatio"];

// Add the following CSS somewhere: img.qt-image { width: 100%; object-fit: cover; }

function responsiveProps(props) {
  const image = new FocusedImage(props.slug, props.metadata);

  function generatePath(size) {
    return "//" + props.imageCDN + "/" + image.path(props.aspectRatio, _.merge({w: size}, props.imgParams));
  }

  return {
    className: props.className ? `qt-image ${props.className}` : 'qt-image',
    src: generatePath(props.defaultWidth),
    srcSet: _(props.widths).map((size) => `${generatePath(size)} ${size}w`).join(",")
  }
}

function ResponsiveImageBase(props) {
  return React.createElement("img", _(responsiveProps(props)).merge(props).omit(USED_PARAMS).value());
}

function mapStateToProps(state) {
  return {
    imageCDN: state.config["cdn-image"]
  };
}

exports.ResponsiveImageBase = ResponsiveImageBase;
exports.ResponsiveImage = connect(mapStateToProps, {})(ResponsiveImageBase);
