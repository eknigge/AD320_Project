import React from 'react';
import { Link } from 'react-router-dom';

class PunchCard extends React.Component {
  render() {
    return (
      <div className="item">
        <div className="ui tiny image">
          <img src="/images/vendor.svg" alt="vendor icon" />
        </div>

        <div className="middle aligned content">
          <div className="header">{this.props.name}</div>
          <Link to={this.props.url}>
            <button className="ui right floated primary button">
              Punch In
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default PunchCard;
