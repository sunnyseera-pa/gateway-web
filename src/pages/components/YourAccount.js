import React from 'react';
import axios from 'axios';
import YourAccountForm from './YourAccountForm';
import queryString from 'query-string';
import Loading from './Loading'

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
        this.doYourAccountCall();
    }

    doYourAccountCall() {
        axios.get(baseURL + '/api/person/' + this.state.userState[0].id)
            .then((res) => {
                axios.get(baseURL + '/api/user/' + this.state.userState[0].id)
                    .then((resUser) => {
                        this.setState({
                            userdata: resUser.data.userdata[0],
                            data: res.data.data[0],
                            isLoading: false
                        });
                    })
            })
    }

    render() {
        const { data, isLoading, isUpdated, userdata } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return (
            <div>
                <YourAccountForm data={data} userdata={userdata} isUpdated={isUpdated} />
            </div>
        );
    }
}

export default YourAccount;