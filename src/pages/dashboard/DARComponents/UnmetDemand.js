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

    componentDidMount(){
        this.setState({state:this.state})
    }

    getNumberOfResults(data){
        let numResults;
        switch(data.entity){
            case 'dataset':
                numResults = data.maxDatasets || 0;
                break;
            case 'tool':
                numResults = data.maxTools || 0;
                break;
            case 'project':
                numResults = data.maxProjects || 0;
                break;
            case 'paper':
                numResults = data.maxPapers || 0;
                break;
            case 'person':
                numResults = data.maxPeople || 0;
                break;
        }
        return numResults;
    }

    render() {
        const { flagClosed, data} = this.state;

        var svgClassName = "";
        if(flagClosed===false){
            svgClassName = "flipSVG"
        }
        
        return (
            <div>
                <div>
                    <Row className="entryBox"> 
                        <Accordion defaultActiveKey="1" style={{"width":"100%"}}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0" onClick={this.updateFlag} data-testid="accordion-toggle" style={{"width":"100%", "padding-left":"0px"}} >
                                <Row>
                                <Col sm={1} lg={1} className="gray800-14">
                                <SVGIcon name="chevronbottom" fill={'#475da7'} className={flagClosed===true ? "svg-24" : "svg-24 flipSVG"}/>
                            </Col>
                            <Col sm={7} lg={7} className="gray800-14" style={{"float":"left", "padding-left":"0px"}}>
                                <span style={{"float":"left", "padding-left":"0px"}}>
                                    {!data || !data._id ? 'search term' : <a href={"/search?search="+data._id}> {data._id} </a>}
                                </span>
                            </Col>
                            <Col sm={2} lg={2} className="gray800-14">
                                <span style={{"float":"left"}}>
                                    {!data || !data.count ? 'number of searches' : data.count}
                                </span>
                            </Col> 
                            <Col sm={2} lg={2} className="gray800-14">
                                <span style={{"float":"left"}}>{this.getNumberOfResults(data)}
                                </span>
                            </Col>
                            </Row>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0" style={{"padding-right":"20px"}}>
                                    <Row>
                                        <Col sm={10} lg={10} />
                                        <Col sm={2} lg={2} className="pl-4">
                                            <span className="gray700-13-bold">Other results</span>
                                            <br />
                                            {data.entity == 'dataset' ? null : <span className="gray700-13">{data.maxDatasets || 0} datasets</span> }
                                            {data.entity == 'dataset' ? null : <br />}
                                            {data.entity == 'tool'  ? null : <span className="gray700-13">{data.maxTools || 0} tools</span>}
                                            {data.entity == 'tool' ? null : <br />}
                                            {data.entity == 'project' ? null : <span className="gray700-13">{data.maxProjects || 0} projects</span>}
                                            {data.entity == 'project' ? null : <br />}
                                            {data.entity == 'paper' ? null : <span className="gray700-13">{data.maxPapers || 0} paper</span>}
                                            {data.entity == 'paper' ? null : <br />}
                                            {data.entity == 'person' ? null : <span className="gray700-13">{data.maxPeople || 0} people</span>}
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