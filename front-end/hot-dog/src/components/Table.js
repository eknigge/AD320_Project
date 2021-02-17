import React from 'react';
import TableRow from './TableRow';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getItemStatus(itemID, status) {
    // console.log(this.state);
  }

  updateItems = (event) => {
    event.preventDefault();

    setTimeout(() => {
      console.log(this.state);
    }, 50);
  };

  // I copied the state from props, but now what?
  // How do I manipulate it with child component listeners?

  // On another thought, it's much easier to make separate fetch request for every item update
  // But to reduce unnecessary fetch calls, I should find a way to gather changes in the children
  static getDerivedStateFromProps(nextProps) {
    return {
      api: nextProps.apiResponse
    };
  }

  renderItems() {
    if (this.state.api.menu !== undefined) {
      const menuItems = this.state.api.menu.items.map((item) => {
        return (
          <TableRow
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
