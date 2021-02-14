import React from 'react';
import TableRow from './TableRow';

class Table extends React.Component {
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
            <TableRow
              itemName="Hot dog"
              category="Food"
              price="2.99"
              status="Available"
            ></TableRow>
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
          <tfoot class="full-width">
            <tr>
              <th></th>
              <th colspan="4">
                <button class="ui right floated medium primary button">
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
