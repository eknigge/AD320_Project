import React from 'react';
import { Link } from 'react-router-dom';
import MenuTableRow from './AdminMenuTableRow';

class MenuTable extends React.Component {
  renderMenus() {
    if (this.props.apiResponse.length > 0) {
      const allMenus = this.props.apiResponse.map((menu) => {
        return (
          <MenuTableRow
            key={menu.MENU_ID}
            id={menu.MENU_ID}
            title={menu.MENU_TITLE}
            description={menu.DESCRIPTION_MENU}
          />
        );
      });
      return <tbody>{allMenus}</tbody>;
    }
  }

  render() {
    return (
      <table className="ui striped stackable table">
        <thead>
          <tr>
            <th className="collapsing">Menu ID</th>
            <th>Title</th>
            <th className="center aligned">Description</th>
            <th className="collapsing">Edit</th>
          </tr>
        </thead>
        {this.renderMenus()}
        <tfoot className="full-width">
          <tr>
            <th colSpan="2">
              <button
                className="ui medium button"
                onClick={() => window.location.reload()}
              >
                Refresh
              </button>
            </th>
            <th colSpan="1">
              <button
                className="ui right floated medium button"
                style={{ textDecoration: 'line-through' }}
                disabled={true}
              >
                Add new item
              </button>
            </th>
            <th colSpan="1">
              <button
                className="ui right floated medium button"
                style={{ textDecoration: 'line-through' }}
                disabled={true}
              >
                Add new menu
              </button>
            </th>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default MenuTable;
