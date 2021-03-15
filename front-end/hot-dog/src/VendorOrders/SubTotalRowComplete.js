// import fetch from 'node-fetch';
import React from 'react';

class SubTotalRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  completeOrder = () => {
    if (this.props.order !== undefined) {
      let url =
        'http://localhost:5000/vendor/orders/complete/' + this.props.order;
      fetch(url, {
        method: 'POST'
      })
        .then((res) => res.text())
        .catch((err) => console.err(err));
    }
  };

  render() {
    return (
      <tr>
        <td>{this.props.order}</td>
        <td>{this.props.total}</td>
      </tr>
    );
  }
}

export default SubTotalRow;
