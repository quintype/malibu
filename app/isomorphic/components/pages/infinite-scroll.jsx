const React = require("react");

// An item in the infinite scroll
class ScrollItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minHeight: props.minHeight
    }
  }

  render() {
    return <div ref={node => this.node = node}
                data-infinite-scroll={this.props.index}
                style={{minHeight: this.state.minHeight}}>
      {this.props.show && this.props.render(Object.assign({index: this.props.index}, this.props.data))}
    </div>;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.show == false && this.props.show == true) {
      this.setState({minHeight: this.node.clientHeight})
    }
  }

  componentDidMount() {
    this.props.observers.forEach(observer => observer && observer.observe(this.node));
  }

  componentWillUnmount() {
    this.props.observers.forEach(observer => observer && observer.unobserve(this.node));
  }
}

// When this becomes visible, we call loadMore()
class ScrollLoadMore extends React.Component {
  render() {
    return <div ref={node => this.node = node} data-infinite-scroll="load-more"/>;
  }

  componentDidMount() {
    this.props.observers.forEach(observer => observer && observer.observe(this.node));
  }

  componentWillUnmount() {
    this.props.observers.forEach(observer => observer && observer.unobserve(this.node));
  }
}

// Basic Infinite Scroll, toggles showing items
class InfiniteScrollBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleComponents: {0: true}
    }
    if(global.IntersectionObserver) {
      this.loadObserver = new IntersectionObserver((x) => this.intersectionCallback(x), {
        rootMargin: props.loadMargin || "100px 0px"
      });
    }
  }

  componentWillUnmount() {
    this.loadObserver && this.loadObserver.disconnect();
  }

  intersectionCallback(entries) {
    var visibleComponents = this.state.visibleComponents;
    entries.forEach(entry => {
      const item = entry.target.getAttribute("data-infinite-scroll");
      if(item == 'load-more' && entry.isIntersecting) {
        this.props.loadNext();
      } else {
        visibleComponents = Object.assign({}, visibleComponents, {[item]: entry.isIntersecting});
      }
    })
    this.setState({visibleComponents: visibleComponents});
  }

  render() {
    return <div>
      {this.props.items.map((data, index) =>
        <ScrollItem observers={this.props.observers.concat([this.loadObserver])}
                    key={index}
                    index={index}
                    show={this.state.visibleComponents[index]}
                    render={this.props.render}
                    data={data}
                    minHeight={this.props.minHeight || 50}/>)}
      <ScrollLoadMore observers={[this.loadObserver]} />
    </div>;
  }
}

// Calls a callback when an item covers bottom 20% of the screen (to change URL)
function withFocusObserver(Component) {
  return class WithFocusObserver extends React.Component {
    constructor(props) {
      super(props);
      if(global.IntersectionObserver) {
        this.focusObserver = new IntersectionObserver((x) => this.focusCallback(x), {
          rootMargin: `-${100 - props.focusCallbackAt}% 0px -${props.focusCallbackAt}%`
        })
      }
    }

    componentWillUnmount() {
      this.focusObserver && this.focusObserver.disconnect();
    }

    focusCallback(entries) {
      entries.forEach(entry => {
        const item = entry.target.getAttribute("data-infinite-scroll");
        if(entry.isIntersecting) {
          this.props.onFocus(item)
        }
      });
    }

    render() {
      return React.createElement(Component, Object.assign({}, this.props, {
        observers: (this.props.observers || []).concat([this.focusObserver])
      }))
    }
  }
}

const InfiniteScroll = withFocusObserver(InfiniteScrollBase);

exports.InfiniteScroll = InfiniteScroll;
