const React = require("react");

const { Link } = require("../link");

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  render() {
    return <div>
      Hello, {this.props.pageType} - {this.state.counter}
      <Link href="/politics">Foobar</Link>
    </div>;
  }

  componentDidMount() {
    this.interval = global.setInterval(() => this.setState({counter: this.state.counter + 1}), 1000);
  }

  componentWillUnmount() {
    global.clearInterval(this.interval);
  }
}

exports.HomePage = HomePage;
