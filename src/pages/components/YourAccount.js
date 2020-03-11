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
        userdata: [],
        userState: [],
        isLoading: true,
        isUpdated: false,
    };

    componentDidMount() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            this.setState({ isUpdated: values.accountUpdated });
        }
        this.doUserCall();
        this.doYourAccountCall();
    }

    doUserCall() {
         axios.get(baseURL + 'api/user/' + this.state.userState[0].id )
        //axios.get(baseURL + '/api/user/12426406323356432')

        .then((res) => {
            this.setState({
                userdata: res.data.userdata[0],
                // isLoading: false
            });
        })
    }

    doYourAccountCall() {
         axios.get(baseURL + '/api/person/' + this.state.userState[0].id)
        //axios.get(baseURL + '/api/person/12426406323356432')

            .then((res) => {
                this.setState({
                    data: res.data.data[0],
                    isLoading: false
                });
            })
    }

    render() {
        const { data, isLoading, isUpdated, userdata } = this.state;
        {console.log('userdata: ' + JSON.stringify(userdata))}
        {console.log('data: ' + JSON.stringify(data))}


        
        
        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
                <YourAccountForm data={data} userdata={userdata} isUpdated={isUpdated} />
            </div>
        );
    }
}

export default YourAccount;