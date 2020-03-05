import React, { Component } from 'react';
import axios from 'axios';
import YourAccountForm from './YourAccountForm';
import queryString from 'query-string';

var baseURL = require('./../../BaseURL').getURL();

class YourAccount extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    // initialize our state
    state = {
        data: [],
        userState: [],
        isLoading: true,
        isUpdated: false,
    };

    componentDidMount() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            this.setState({ isUpdated: values.accountUpdated });
        }
        this.doYourAccountCall();
    }

    doYourAccountCall() {
        axios.get(baseURL + '/api/person/' + this.state.userState[0].id)
            .then((res) => {
                this.setState({
                    data: res.data.data[0],
                    isLoading: false
                });
            })
    }

    render() {
        const { data, isLoading, isUpdated } = this.state;
        
        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
                <YourAccountForm data={data} isUpdated={isUpdated} />
            </div>
        );
    }
}

export default YourAccount;