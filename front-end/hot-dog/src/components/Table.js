import React from 'react';
import TableRow from './TableRow';
import { Link } from 'react-router-dom';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  updateItems = (event) => {
    let itemArray = this.props.apiResponse.menu.items;
    let idList = [];
    itemArray.map((item) => (idList = [...idList, item.id]));

    this.setState(
      {
        menuID: this.props.apiResponse.menu.menuID,
        id: idList,
        status: true,
      },
      () => {
        fetch('http://localhost:5000/vendor/menu', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.state),
        })
          .then((res) => res.text())
          // Extra feature: add a pop up stating whether update was successful
          // .then((res) => console.log(res))
          .catch((err) => console.err(err));
      }
    );
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
              <th>
                <Link to={`/vendor/${this.props.apiResponse.vendorID}`}>
                  <button className="ui large gray button">Back to main</button>
                </Link>
              </th>
              <th colSpan="5">
                <button
                  className="ui right floated medium green button"
                  onClick={this.updateItems}
                >
                  Make All Available
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
