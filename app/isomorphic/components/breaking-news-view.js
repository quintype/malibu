import React from "react";
import { bool, array } from "prop-types";
import "./breaking-news.m.css";

export class BreakingNewsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: 0 };
  }

  componentDidMount() {
    this.interval = global.setInterval(() => this.setState({ item: this.state.item + 1 }), 2000);
  }

  componentWillUnmount() {
    global.clearInterval(this.interval);
  }

  render() {
    const { breakingNewsLoaded, breakingNews } = this.props;

    if (breakingNewsLoaded && breakingNews.length === 0) {
      return <span />;
    }

    const content =
      breakingNews.length === 0 ? { headline: " ", metadata: {} } : breakingNews[this.state.item % breakingNews.length];

    return (
      <a href={"/" + (content.metadata["linked-story-slug"] || "")} styleName="link">
        {content.headline}
      </a>
    );
  }
}

BreakingNewsView.propTypes = {
  breakingNewsLoaded: bool,
  breakingNews: array
};
