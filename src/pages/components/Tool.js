import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from "../../images/SVGIcon";
import {format} from 'date-fns';

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
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var updatedDate = new Date(data.updatedon);
        var updatedOnDate = monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear();

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
                                        <span>4 projects</span>
                                        {/* <span className="mr-1">
                                            {data.projectids.length}
                                        </span>
                                        <span>
                                            {data.projectids > 1 ? "projects" : "project"}
                                        </span> */}
                                        
                                        <span className="Purple-14px ml-2">
                                        Novel somatic alterations underlie Chinese papillary thyroid carcinoma, Human THO mai…
                                        </span>

                                        {/* DISPLAYS PROJECT IDS ATTACHED TO TOOL */}
                                        {/* <span className="Purple-14px ml-2">
                                            { data.projectids.length <= 0 ? 'NO SEARCH RESULT' :  data.projectids.map((projectid) => {
                                                if(!!projectid){
                                                    return <span className="Purple-14px ml-1"> {projectid} </span>
                                                }
                                            })}
                                        </span> */}


                                        {/* <span className="Purple-14px ml-2">
                                            { data.projectids.length <= 0 ? 'NO SEARCH RESULT' :  data.projectids.map((projectid) => {
                                                if(!!projectid){
                                                    return <span className="Purple-14px ml-1"> {data.name} </span>
                                                }
                                            })}
                                        </span> */}
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
                            
                                <Col xs={{span:12,order:0}} lg={{span:12,order:1}}>

                                    {!data.tags.features || data.tags.features.length <= 0 ? '' :  data.tags.features.map((feature) => {
                                        return <div className="mr-2 Gray800-14px tagBadges mb-2 mt-2">{feature}</div>
                                    })} 

                                    {!data.tags.topics || data.tags.topics.length <= 0 ? '' :  data.tags.topics.map((topic) => {
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