import React from 'react';
import { Link } from 'react-router-dom';

class LogsTableRow extends React.Component {
  render() {
    return (
      <tr>
        <td className="collapsing">{this.props.id}</td>
        <td>{this.props.title}</td>
        <td>{this.props.description}</td>
        <td>
          <Link to={`/admin/menu/edit/${this.props.id}`}>
            <button className="ui primary button">Edit</button>
          </Link>
        </td>
      </tr>
    );
  }
}

export default LogsTableRow;
