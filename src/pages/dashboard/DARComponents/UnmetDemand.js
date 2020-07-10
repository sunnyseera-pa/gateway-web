import React from 'react';
import {Col, Row, Button, Accordion } from 'react-bootstrap';
import SVGIcon from "../../../images/SVGIcon"; 

class UnmetDemand extends React.Component {

    state = {
        data: '',
        flagClosed: true
     };

    constructor(props) {
        super(props)
        //binding the method to be able to use state
        this.state.data = props.data;
        this.updateFlag = this.updateFlag.bind(this)
    }

    updateFlag(){
        if(this.state.flagClosed===true){
            this.setState({flagClosed: false})
        }
        else if(this.state.flagClosed===false){
            this.setState({flagClosed: true})
        }
    }

    render() {
        const { flagClosed, data } = this.state;

        //TODO temporary date used to check moment format to be used in select options below
        let date = "2020-01-13T00:00:00.000Z"; 

        var svgClassName = "";
        if(flagClosed===false){
            svgClassName = "flipSVG"
        }

        return (
            <div>
                <div>
                    <Row className="entryBox mt-1"> 
                        <Accordion defaultActiveKey="1" style={{"width":"100%"}}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={this.updateFlag} style={{"width":"100%"}} >
                                <Row>
                                <Col sm={1} lg={1} className="gray800-14">
                                <SVGIcon name="chevronbottom" fill={'#475da7'} className={flagClosed===true ? "svg-24" : "svg-24 flipSVG"} />
                            </Col>
                            <Col sm={7} lg={7} className="gray800-14" >
                                <span style={{"float":"left"}}>
                                    {!data || !data._id ? 'search term' : data._id}
                                </span>
                            </Col>
                            <Col sm={2} lg={2} className="gray800-14">
                                <span style={{"float":"left"}}>
                                    {!data || !data.count ? 'number of searches' : data.count}
                                </span>
                            </Col> 
                            <Col sm={2} lg={2} className="gray800-14">
                                <span style={{"float":"left"}}>number of results</span>
                            </Col>
                            </Row>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Row>
                                        <Col sm={10} lg={10} />
                                        <Col sm={2} lg={2} className="pl-4">
                                            <span className="gray700-13-bold">Other results</span>
                                            <br />
                                            {/*TODO show the below values if the type is not your current tab type ie. show the relevant 4 of the 5 below */}
                                            <span className="gray700-13">x datasets</span>
                                            <br />
                                            <span className="gray700-13">x tools</span>
                                            <br />
                                            <span className="gray700-13">x projects</span>
                                            <br />
                                            <span className="gray700-13">x paper</span>
                                            <br />
                                            <span className="gray700-13">x people</span>
                                        </Col>
                                    </Row>
                                </Accordion.Collapse>
                            
                        </Accordion>
                    </Row> 
                </div>
            
            </div>
        )
    }
}

export default UnmetDemand;