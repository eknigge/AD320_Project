import React from 'react';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuID: null,
      id: 0,
      status: false
    };
  }

  componentDidMount() {
    this.setState({
      menuID: this.props.menuID,
      id: this.props.id,
      status: this.props.status
    });
  }

  render() {
    const { id, itemName, category, price } = this.props;
    const { status } = this.state;

    return (
      <tr>
        <td>{id}</td>
        <td>{itemName}</td>
        <td>{category}</td>
        <td>{price}</td>
        <td className={status ? 'positive' : 'negative'}>
          {status ? 'Available' : 'Unavailable'}
        </td>
        <td className="collapsing">
          <div className="ui fitted toggle checkbox">
            <input
              type="checkbox"
              onChange={this.handleChange}
              checked={status}
            ></input>
            <label></label>
          </div>
        </td>
      </tr>
    );
  }

  handleChange = (event) => {
    this.setState({ status: event.target.checked }, () => {
      fetch('http://localhost:5000/vendor/menu', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.state)
      })
        .then((res) => res.text())
        .then((res) => console.log(res))
        .catch((err) => console.err(err));
    });
  };
}

export default TableRow;
