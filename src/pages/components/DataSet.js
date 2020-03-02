
import React, { Component } from 'react';
import axios from 'axios';
import { async } from 'q';

var baseURL = require('./../../BaseURL').getURL();

export default class DataSet extends React.Component {

    state = {
        label: '',
        description: ''
    }
    // on loading of tool detail page
    componentDidMount() {
        this.getDataSearchFromDb();
        
    }

    getDataSearchFromDb = () => {
        //need to handle error if no id is found
        this.setState({ isLoading: true });
        axios.get(baseURL+'/api/dataset/'+this.props.datasetid)
        .then((res) => {
            this.setState({ 
                label: res.data.data.label, 
                description: res.data.data.description,
                isLoading: false 
            });
        })
    }

    render() {
        return (
            <div className="Rectangle">
                <h2>{this.state.label}</h2>
                <h3>{this.state.description}</h3>
            </div>

        )

    }
}