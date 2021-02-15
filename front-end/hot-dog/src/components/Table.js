import React from 'react';
import TableRow from './TableRow';

class Table extends React.Component {
  renderItems() {
    if (this.props.apiResponse['menu'] !== undefined) {
      const menuItems = this.props.apiResponse.menu.items.map((item) => {
        return (
          <TableRow
            key={item.id}
            itemName={item.name}
            category={item.category}
            price={item.price}
            status={item.available ? 'Available' : 'Unavailable'}
          ></TableRow>
        );
      });

      return <tbody>{menuItems}</tbody>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <form className="ui form">
        <table className="ui table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price ($)</th>
              <th>Status</th>
              <th>Toggle</th>
            </tr>
          </thead>
          {this.renderItems()}
          <tfoot className="full-width">
            <tr>
              <th></th>
              <th colSpan="4">
                <button className="ui right floated medium primary button">
                  Update Menu
                </button>
              </th>
            </tr>
          </tfoot>
        </table>
      </form>
    );
  }
}

export default Table;
