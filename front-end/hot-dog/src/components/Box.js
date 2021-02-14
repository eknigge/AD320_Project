import React from 'react';

class Box extends React.Component {
  render() {
    return <div className="ui segment">{this.props.children}</div>;
  }
}

export default Box;
