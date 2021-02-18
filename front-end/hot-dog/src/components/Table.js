import React from 'react';
import TableRow from './TableRow';

class Table extends React.Component {
  updateItems = (event) => {
    event.preventDefault();

    setTimeout(() => {
      console.log(this.state);
    }, 50);
  };

  renderItems() {
    if (this.props.apiResponse.menu !== undefined) {
      const menuItems = this.props.apiResponse.menu.items.map((item) => {
        return (
          <TableRow
            menuID={this.props.apiResponse.menu.menuID}
            key={item.id}
            id={item.id}
            itemName={item.name}
            category={item.category}
            price={item.price}
            status={item.available}
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
      <form className="ui form" onSubmit={this.updateItems}>
        <table className="ui table">
          <thead>
            <tr>
              <th>Item ID</th>
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
              <th colSpan="5">
                <button className="ui right floated medium green button">
                  Make All Available (currently doesn't do jack)
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
