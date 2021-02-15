import React from 'react';
import TableRow from './TableRow';

class Table extends React.Component {
  renderContent() {
    if (this.props.apiResponse['menu'] !== undefined) {
      return (
        <TableRow
          itemName={this.props.apiResponse['menu']['items'][0]['name']}
          category={this.props.apiResponse.menu.items[0].category}
          price={this.props.apiResponse.menu.items[0].price}
          status={
            this.props.apiResponse.menu.items[0].available
              ? 'Available'
              : 'Unavailable'
          }
        ></TableRow>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <form className="ui form">
        <table className="ui definition table">
          <thead>
            <tr>
              <th></th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price ($)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.renderContent()}
            <TableRow
              itemName="Coke"
              category="Beverage"
              price="1.99"
              status="Available"
            ></TableRow>
            <TableRow
              itemName="Water"
              category="Beverage"
              price="0.99"
              status="Unavailable"
            ></TableRow>
          </tbody>
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
