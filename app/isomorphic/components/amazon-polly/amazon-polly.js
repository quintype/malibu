import React from "react";
import get from "lodash/get";
import { HeadsetIcon } from "../../../assets/icons/headset";
import { CloseIcon } from "../../../assets/icons/close";

import "./amazon-polly.m.css";

export class AmazonPolly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  onClickHandler = () => {
    this.setState({
      isOpen: true
    })
  }

  closeHandler = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    const { caption, story, config, audioAttributes = { controls: true }, headsetColor = "#333", headsetSize = 24 } = this.props;
    const cdn = get(config, ["cdn-image"]);
    const audioS3Key = get(story, ["story-audio", "s3-key"]);
    const audioSrc = `//${cdn}/${audioS3Key}`;

    return <div styleName="amazon-polly-wrapper">
      <div styleName="amazon-polly-text-wrapper" onClick={this.onClickHandler}>
        <div styleName="amazon-polly-headset-wrapper">
          <HeadsetIcon size={headsetSize} color={headsetColor} />
        </div>
        <span styleName="amazon-polly-text">Listen to story</span>
      </div>
      {!this.state.isOpen ? null : <div styleName="amazon-polly-bar-wrapper">
        <figure styleName="amazon-polly-content">
          <figcaption styleName="amazon-polly-caption">{caption}</figcaption>
          <audio styleName="amazon-polly-audio" src={audioSrc} {...audioAttributes}>
            Your browser doesn't support the <code>audio</code> element.
          </audio>
        </figure>
        <div styleName="amazon-polly-close-wrapper" onClick={this.closeHandler}>
          <CloseIcon />
        </div>
      </div>}
    </div>;
  }
}
