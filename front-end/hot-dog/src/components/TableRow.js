import React from 'react';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.itemRef = React.createRef();
  }

  render() {
    const { id, itemName, category, price, status } = this.props;

    return (
      <tr>
        <td>{id}</td>
        <td>{itemName}</td>
        <td>{category}</td>
        <td>{price}</td>
        <td className={status === 'Available' ? 'positive' : 'negative'}>
          {status}
        </td>
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
