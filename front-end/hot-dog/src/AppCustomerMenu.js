import React from 'react';
import CustomerMenu from './CustomerComponents/CustomerMenu';


class AppCustomerMenu extends React.Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
      return (
        <div className="App">
          <CustomerMenu 
            cartID = {this.props.match.params.id}
          />
        </div>
      );
    }
}


export default AppCustomerMenu;
