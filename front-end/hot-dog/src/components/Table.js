import React from 'react';
import TableRow from './TableRow';

class Table extends React.Component {
  state = { items: this.props.apiResponse };

  // getItemStatus(itemID, status) {
  //   this.setState({
  //     itemID: itemID,
  //     status: status
  //   });
  //   // console.log(this.state);
  // }

  updateItems = (event) => {
    event.preventDefault();
    // if (this.props.apiResponse['menu'] !== undefined) {
    //   let n = this.props.apiResponse.menu.items;
    //   let stateObj = {};
    //   for (let i = 0; i < n.length; i++) {
    //     stateObj[n[i].id] = n[i].available;
    //   }
    //   this.setState({ itemCount: n.length, ...stateObj });
    // }
    setTimeout(() => {
      console.log(this.state);
    }, 50);
  };

  renderItems() {
    if (this.props.apiResponse['menu'] !== undefined) {
      const menuItems = this.props.apiResponse.menu.items.map((item) => {
        return (
          <TableRow
            ref={this.name}
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
