import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon";
import { format } from 'date-fns';
import axios from 'axios';

var baseURL = require('./../../BaseURL').getURL();

class Tool extends React.Component {

    // initialize our state
    state = {
        data: [],
        isLoading: true
    };

    constructor(props) {
        super(props)
        if (props.data) {
            this.state.data = props.data;
            this.state.isLoading = false;
        }
        else if (props.id) {
            this.state.id = props.id;
            this.getDataSearchFromDb()
        }
    }

    getDataSearchFromDb = () => {
        //need to handle error if no id is found
        this.setState({ isLoading: true });
        axios.get(baseURL + '/api/tool/' + this.state.id)
        .then((res) => {
            this.setState({
                data: res.data.data[0],
                isLoading: false
            });
        })
    };

    render() {
        const { data, isLoading } = this.state;
        const ratingsTotal = (!!data.ratings && data.ratings.length > 0) ? data.ratings.reduce((a,b) => a + b, 0) : '';
        const ratingsCount = (!!data.ratings ? data.ratings.length : 0);
        const avgRating = (!!data.ratings && data.ratings.length > 0) ? (ratingsTotal / ratingsCount) : '';

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var updatedDate = new Date(data.updatedon);
        var updatedOnDate = monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear();

        return (
            <Row className="mt-2">
                <Col>
                    <a className="searchHolder" href={'/tool/' + data.id} >
                        <div className="Rectangle">
                            <Row>
                                <Col xs={2} lg={1} className="iconHolder">
                                    <SVGIcon name="toolicon" width={18} height={18} fill={'#3db28c'} />
                                </Col>
                                <Col xs={10} lg={8}>
                                    <p>
                                        <span className="Black-16px">{data.name}</span>
                                        <span className="Gray500-13px">
                                            <span className="reviewTitleGap">·</span>
                                         {!!ratingsTotal && ratingsCount == 1 ? ratingsCount + ' review' : ratingsCount +' reviews'}
                                     
                                            
                            
                                            <span className="reviewTitleGap">·</span>
                                            {avgRating == 0 ? 'No average rating' : avgRating + ' average' }
                                           
                                        </span>
                                        <br />
                                        <span className="Gray800-14px">Laure Santos</span>
                                    </p>

                                    <p className="Gray800-14px">
                                        1 dataset
                                        <span className="Purple-14px ml-2">
                                            NIHR HIC Locality : Critical Care
                                        </span>
                                    </p>

                                    <p className="Gray800-14px">
                                        <span className="mr-1">
                                            {data.projectids.length}
                                        </span>
                                        <span>
                                            {data.projectids === 1 ? "projects" : "project"}
                                        </span>

                                        {/*  <span className="Purple-14px ml-2">
                                            Novel somatic alterations underlie Chinese papillary thyroid carcinoma, Human THO mai…
                                        </span> */}

                                        {/* DISPLAYS PROJECT IDS ATTACHED TO TOOL */}
                                        <span className="Purple-14px ml-2">
                                            {data.projectids.length <= 0 ? 'NO SEARCH RESULT' : data.projectids.map((projectid) => {
                                                if (!!projectid) {
                                                    return <span className="Purple-14px ml-1"> {projectid} </span>
                                                }
                                            })}
                                        </span>


                                        {/* <span className="Purple-14px ml-2">
                                            { data.projectids.length <= 0 ? 'NO SEARCH RESULT' :  data.projectids.map((projectid) => {
                                                if(!!projectid){
                                                    return <span className="Purple-14px ml-1"> {data.name} </span>
                                                }
                                            })}
                                        </span> */}
                                    </p>

                                </Col>
                                <Col xs={{ span: 12, order: 1 }} lg={{ span: 3, order: 0 }} className="dateHolder mt-2">
                                    <span className="Gray700-13px pr-1">
                                        Updated
                                    </span>
                                    <span className="Gray700-13px pr-1">
                                        {updatedOnDate}
                                    </span>
                                </Col>

                                <Col xs={{ span: 12, order: 0 }} lg={{ span: 12, order: 1 }}>

                                    {!data.tags.features || data.tags.features.length <= 0 ? '' : data.tags.features.map((feature) => {
                                        return <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2">{feature}</div>
                                    })}

                                    {!data.tags.topics || data.tags.topics.length <= 0 ? '' : data.tags.topics.map((topic) => {
                                        return <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2">{topic}</div>
                                    })}

                                </Col>
                            </Row>
                        </div>
                    </a>
                </Col>                
            </Row>
            
        );
    }
}

export default Tool;