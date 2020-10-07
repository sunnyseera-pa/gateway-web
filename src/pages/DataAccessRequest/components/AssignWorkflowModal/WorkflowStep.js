import React, { Fragment } from 'react'; 
import { Row, Col, Button, Accordion } from 'react-bootstrap';
import SVGIcon from '../../../../images/SVGIcon'
import './AssignWorkflowModal.scss'; 
 

class WorkflowStep extends React.Component {
    
    state = { 
        data: '',
        index: '',
        step: '', 
        reviewers: '',
        sections: '',
        flagClosed: true
    };

    constructor(props) {
        super(props)
        //binding the method to be able to use state
        this.state.index = props.index;
        this.state.step = props.step;
        this.state.reviewers = props.reviewers;
        this.state.sections = props.sections;
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

    render() {
        const { index, step, reviewers, sections, flagClosed } = this.state; 

        var svgClassName = "";
        if(flagClosed===false){
            svgClassName = "flipSVG"
        }

        return (
                <Row className="noMargin gray-top-border" style={{"width":"100%"}}> 
                    <Accordion defaultActiveKey="1" style={{"width":"100%"}}>
                            <Accordion.Toggle className="accordionToggle" as={Button} variant="link" eventKey="0" onClick={this.updateFlag} data-testid="accordion-toggle">
                        <Row>
                            <Col sm={3} lg={3} className="gray800-14" style={{"float":"left"}}>
                                <span style={{"float":"left"}}>
                                    <h3>{`${index+1}. ${step.stepName}`}</h3>
                                </span>                
                            </Col>
                            <Col sm={8} lg={8} className="gray800-14">
                                <span style={{"float":"left"}}>
                                    {flagClosed ? reviewers : ''}
                                </span>
                            </Col> 
                            <Col sm={1} lg={1} className="gray800-14">
                                <SVGIcon name="chevronbottom" fill={'#475da7'} className={flagClosed===true ? "workflowChevron" : "workflowChevron flipSVG"}/>
                            </Col>
                        </Row>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0" className="pad-left-16" style={{"paddingRight":"20px"}}>
                             <Fragment>
                            <Row>
                                <Col sm={2} lg={2} className="toggleHeader">Reviewers</Col>
                                <Col className="toggleContent gray800-14">{reviewers}</Col>
                            </Row>
                            <Row>
                                <Col sm={2} lg={2} className="toggleHeader">Visible</Col>
                                <Col className="toggleContent gray800-14">{sections}</Col>
                            </Row>
                            <Row>
                                <Col sm={2} lg={2} className="toggleHeader pad-bottom-8">Deadline</Col>
                                <Col className="toggleContent gray800-14">{`${step.deadline} days after the start of this phase`}</Col>
                            </Row>
                            </Fragment>   
                            </Accordion.Collapse>
                    </Accordion>
                </Row> 
        )
}
}

export default WorkflowStep;