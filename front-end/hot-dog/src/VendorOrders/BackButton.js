import React from 'react';
import { Link } from 'react-router-dom';

class BackButton extends React.Component{
    constructor(props){
        super(props);
        this.state = {tableDataisFetched:false}
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        fetch(`http://localhost:5000/vendor/cartid/${this.props.cartID}`)
        .then(response => response.json())
        .then(data =>{
           this.setState({ vendorID: data.USER_ID, tableDataisFetched:true })
        })
    }

    render(){
        return (
            <>
                <Link to={`/vendor/${this.state.vendorID}`}>
                    <button className="large ui blue button">
                    Return to Main
                    </button>
                </Link>
            </>
        )
    }


}

export default BackButton