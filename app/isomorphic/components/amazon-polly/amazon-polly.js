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

    return <div className={`amazon-polly-wrapper`}>
      <div className={`amazon-polly-text-wrapper`} onClick={this.onClickHandler}>
        <div className={`amazon-polly-headset-wrapper`}>
          <HeadsetIcon size={headsetSize} color={headsetColor} className={`amazon-polly-headset`} />
        </div>
        <span className={`amazon-polly-text`}>Listen to story</span>
      </div>
      {!this.state.isOpen ? null : <div className={`amazon-polly-bar-wrapper`}>
        <figure className={`amazon-polly-content`}>
          <figcaption className={`amazon-polly-caption`}>{caption}</figcaption>
          <audio className={`amazon-polly-audio`} src={audioSrc} {...audioAttributes}>
            Your browser doesn't support the <code>audio</code> element.
          </audio>
        </figure>
        <div className={`amazon-polly-close-wrapper`} onClick={this.closeHandler}>
          <CloseIcon className={`amazon-polly-close`} />
        </div>
      </div>}
    </div>;
  }
}
