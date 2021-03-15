import React from 'react';
import { Link } from 'react-router-dom';

class LogsTableRow extends React.Component {
  render() {
    const { userID, userName, logID, time, event } = this.props;
    return (
      <tr>
        <td className="collapsing">{logID}</td>
        <td className="collapsing">{`${userID}-${userName}`}</td>
        <td>{event}</td>
        <td className="collapsing">{time}</td>
      </tr>
    );
  }
}

export default LogsTableRow;
