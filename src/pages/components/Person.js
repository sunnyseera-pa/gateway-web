import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { ReactComponent as PersonPlaceholderSvg } from '../../images/person-placeholder.svg';

class Person extends React.Component{
    constructor(props) {
        super(props)
        this.state.data = props.data;
    }

    // initialize our state
    state = {
        data: []
      };

    render(){
        const { data } = this.state;
        return(
            <Row className="mt-2">
            <Col>
                <a style={{ cursor: 'pointer' }} href={'/person/' + data.id} >
                    <div className="Rectangle">
                        <Row>
                            <Col xs={2} md={1} className="iconHolder">
                                <PersonPlaceholderSvg /> 
                                {/* <Image src={require("../../images/bob.jpg")} id="Picture" roundedCircle /> */}
                            </Col>
                            <Col xs={10} md={11}>
                                <p>
                                    <span className="Black-16px">{data.firstname} {data.lastname}</span>
                                    <br />
                                    <span className="Gray800-14px">{data.bio}</span>
                                </p>

                                <p className="Gray800-14px">
                                        1 dataset 
                                        <span className="Purple-14px ml-2">
                                            NIHR HIC Locality : Critical Care
                                        </span>
                                </p>
                                <p className="Gray800-14px">
                                    <span>4 tools</span>
                                        {/* <span className="mr-1">
                                            {data.usedids.length}
                                        </span>
                                        <span>
                                            {data.usedids.length > 1 ? "tools" : "tool"}
                                        </span> */}

                                        <span className="Purple-14px ml-2">
                                            Tableau, Alpha data parser, Panda R library, Sareen
                                        </span>

                                        {/* DISPLAYS TOOL IDS ATTACHED TO PERSON */}
                                        {/* <span className="Purple-14px ml-2">
                                            { data.usedids.length <= 0 ? 'NO SEARCH RESULT' :  data.usedids.map((usedid) => {
                                                if(!!usedid){
                                                    return <span className="Purple-14px ml-1"> {usedid} </span>
                                                }
                                            })}
                                        </span> */}


                                        {/* <span className="Purple-14px ml-2">
                                            { data.usedids.length <= 0 ? 'NO SEARCH RESULT' :  data.usedids.map((usedid) => {
                                                if(!!usedid){
                                                    return <span className="Purple-14px ml-1"> {data.name} </span>
                                                }
                                            })}
                                        </span> */}
                                </p>
                                <p className="Gray800-14px">
                                    <span>4  projects</span>
                                {/* <       span className="mr-1">
                                            {data.projectids.length}
                                        </span>
                                        <span>
                                            {data.projectids.length > 1 ? "projects" : "project"}
                                        </span> */}


                                        <span className="Purple-14px ml-2">
                                        Novel somatic alterations underlie Chinese papillary thyroid carcinoma, Human THO mai…
                                        </span>

                                        {/* DISPLAYS PROJECT IDS ATTACHED TO PERSON */}
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
                        </Row>
                    </div>
                </a>
            </Col>
        </Row>
        );
    }
}

export default Person;
