import React from 'react';

class TableRow extends React.Component {
  render() {
    return (
      <tr>
        <td className="collapsing">
          <div className="ui fitted toggle checkbox">
            <input type="checkbox"></input> <label></label>
          </div>
        </td>
        <td>{this.props.itemName}</td>
        <td>{this.props.category}</td>
        <td>{this.props.price}</td>
        <td>{this.props.status}</td>
      </tr>
    );
  }
}

export default TableRow;
