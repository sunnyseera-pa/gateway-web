
import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon";
import {format} from 'date-fns';

var baseURL = require('./../../BaseURL').getURL();

export default class DataSet extends React.Component {

    state = {
        data: [],
        isLoading: false
    }
    // on loading of tool detail page
    componentDidMount() {
        this.getDataSearchFromDb();
        
    }

    getDataSearchFromDb = () => {
        //need to handle error if no id is found
        this.setState({ isLoading: true });
        axios.get(baseURL+'/api/dataset/'+this.props.id)
        .then((res) => {
            this.setState({
                data: {
                 'label':res.data.data.label,
                 'description':res.data.data.description,
                 'id':res.data.data.id,
                 'updatedon':res.data.data.lastUpdated
                },
                isLoading: false 
            })
        });
    }


    render() {
        const {searchString, data, isLoading } = this.state;

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var updatedDate = new Date(data.updatedon);
        var updatedOnDate = monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear();

        return(
            <Row className="mt-2">
                <Col>
                    {/*<a className="searchHolder" href={'/dataset/' + data.id} >*/}
                        <div className="Rectangle">
                            <Row>
                                <Col xs={2} lg={1} className="iconHolder">
                                    <SVGIcon name="dataseticon" width={18} height={24} fill={'#3db28c'} />
                                </Col>
                                <Col xs={10} lg={8}>
                                    <p>
                                        <span className="Black-16px">{data.label}</span>
                                    </p>
                                    <p className="Gray800-14px">
                                        {data.description}  
                                    </p>
                                   
                                </Col>
                                <Col xs={{span:12,order:1}} lg={{span:3,order:0}} className="dateHolder mt-2">
                                    <span className="Gray700-13px pr-1">
                                        Updated
                                    </span>
                                    <span className="Gray700-13px pr-1"> 
                                        {updatedOnDate}
                                    </span>
                                </Col>
                        
                            </Row>
                        </div>
                   {/*</a>*/}
                </Col>                
            </Row>
        );

        return (
            <div className="Rectangle">
                <h2>{this.state.label}</h2>
                <h3>{this.state.description}</h3>
            </div>

        )

    }
}