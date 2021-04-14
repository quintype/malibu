import React from "react";
import { object, shape } from "prop-types";

export function WithPreview(klazz, updateData) {
  return class WithPreviewWrapper extends React.Component {
    constructor(props) {
      super(props);
      this.state = { story: null };
    }

    componentDidMount() {
      global.addEventListener("message", event => {
        if (event.data && event.data.action === "sendStoryToIframe" && event.data.story) {
          this.setState({ story: event.data.story });
        }
      });
    }

    render() {
      if (!this.state.story) {
        return <div style={{ minHeight: 200 }} />;
      }
      return React.createElement(
        klazz,
        Object.assign({}, this.props, {
          // eslint-disable-next-line react/prop-types
          data: updateData(this.props.data, this.state.story)
        })
      );
    }
  };
}

WithPreview.propTypes = {
  data: shape({
    collection: object
  })
};
