import React from 'react';
import ReactModal from 'react-modal';
import '../App.css'

class Order extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showModal:false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
      }
      
    handleCloseModal () {
        this.setState({ showModal: false });
    }
    
    render(){
        return(
            <div>
                <table className="custTable">
                    <thead>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{this.props.orderID}</th>
                            <th>{this.props.name}</th>
                            <th>{this.props.item}</th>
                            <th>{this.props.price}</th>
                            <th>{this.props.quantity}</th>
                        <button onClick={this.handleOpenModal}>Order Complete</button>
                        <ReactModal 
                            isOpen={this.state.showModal}
                            contentLabel="Minimal Modal Example"
                            >
                            <button onClick={this.handleCloseModal}>Close Modal</button>
                            <button>Confirm</button>
                        </ReactModal>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Order