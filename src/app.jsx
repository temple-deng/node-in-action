import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSub = this.handleSub.bind(this);s
  }

  handleAdd() {
    this.setState({
      count: this.state.count+1
    });
  }

  handleSub() {
    this.setState({
      count: this.state.count-1
    });
  }

  render() {
    return (
      <div>
        <div>
          count: {this.state.count}
        </div>
        <div>
          <button onClick={this.handleAdd}>
            Add 1
        </button>
          <button onClick={this.handleSub}>
            Sub 1
        </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('container')
);

