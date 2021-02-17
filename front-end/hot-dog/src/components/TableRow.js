import React from 'react';

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      status: false
    };
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      status: this.props.status
    });
  }

  render() {
    const { id, itemName, category, price, status } = this.props;

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
              ref={this.itemRef}
              type="checkbox"
              // checked={this.props.status === 'Available'}
              onChange={this.handleChange}
              checked={this.state.status}
            ></input>
            <label></label>
          </div>
        </td>
      </tr>
    );
  }

  handleChange = (event) => {
    this.setState({ status: event.target.checked });
    setTimeout(() => {
      console.log(this.state);
    }, 50);
  };
}

export default TableRow;
