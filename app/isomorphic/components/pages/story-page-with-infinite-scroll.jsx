const React = require("react");

const { InfiniteScroll } = require("./infinite-scroll.jsx");

class StoryPageWithInfiniteScroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreStories: [],
      loading: false,
      pageNumber: 0
    }
  }

  allStories() {
    return [this.props.data.story].concat(this.state.moreStories);
  }

  removeDuplicates(stories) {
    const existingStoryIds = this.allStories().map(story => story.id);
    return stories.filter(story => !existingStoryIds.includes(story.id));
  }

  navigateToStory(index) {
    const story = this.allStories()[index];
    global.app.maybeSetUrl("/" + story.slug, story.headline);
  }

  loadMore() {
    if(this.state.loading)
      return;
    const pageNumber = this.state.pageNumber;
    this.setState({loading: true, pageNumber: pageNumber + 1}, () => {
      this.props.loadStories(pageNumber).then((stories) => {
        this.setState({
          loading: false,
          moreStories: this.state.moreStories.concat(this.removeDuplicates(stories))
        })
      })
    })
  }

  render() {
    return <InfiniteScroll render={this.props.render}
                           items={this.allStories().map(story => ({story: story}))}
                           loadNext={() => this.loadMore()}
                           loadMargin={this.props.loadMargin || "200px 0px 500px"}
                           focusCallbackAt={20}
                           focusCallback={(index) => this.navigateToStory(index)}/>
  }
}

exports.StoryPageWithInfiniteScroll = StoryPageWithInfiniteScroll;
