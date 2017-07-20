const React = require("react");

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  render() {
    return <div>Hello, {this.props.pageType} - {this.state.counter}</div>;
  }

  componentDidMount() {
    this.interval = global.setInterval(() => this.setState({counter: this.state.counter + 1}), 1000);
  }
}

exports.HomePage = HomePage;
