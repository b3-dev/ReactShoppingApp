import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actionCreator';




class Logout extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

        //remove from localStorage..
        localStorage.removeItem('token');
        localStorage.removeItem('userID');
        localStorage.removeItem('clientName');

        //dispatch..
        this.props.dispatch(logout());
        //this.props.dispatch(authActionCreators.logout())

    }

    render() {

        return (<Redirect to={"/Home"} />);
    }
}

export default connect(null, null)(Logout); 

