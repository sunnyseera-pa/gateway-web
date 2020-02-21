import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon"

class Tool extends React.Component{

    constructor(props) {
        super(props)
        this.state.data = props.data;
      }
    
      // initialize our state
      state = {
        data: []
      };

    render(){
        const { data} = this.state;
        return(
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
                                        <span className="Black-16px">{ data.name}</span>
                                        <span className="Gray500-13px">
                                            <span className="reviewTitleGap">·</span>
                                            150 reviews
                                            <span className="reviewTitleGap">·</span>
                                            4.2 average
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
                                        4 tools 
                                        <span className="Purple-14px ml-2">
                                        Tableau, Alpha data parser, Panda R library, Sareen
                                        </span>
                                    </p>
                                   
                                </Col>
                                <Col xs={{span:12,order:1}} lg={{span:3,order:0}} className="dateHolder mt-2">
                                    <span className="Gray700-13px">
                                        Updated Aug 2018
                                    </span>
                                </Col>
                            
                                <Col xs={{span:12,order:0}} lg={{span:12,order:1}}>
                                    { data.tags.length <= 0 ? 'NO SEARCH RESULT' :  data.tags.map((tag) => {
                                        return <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2">{tag}</div>
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