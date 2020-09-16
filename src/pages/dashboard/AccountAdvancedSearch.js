import React from 'react';
import {Col, Row, Button, Accordion, Card } from 'react-bootstrap';
import Loading from '../commonComponents/Loading'
// import './Dashboard.scss'; 
import ActionBar from '../commonComponents/actionbar/ActionBar';

var baseURL = require('../commonComponents/BaseURL').getURL();

class AccountAdvancedSearch extends React.Component {

    // initialize our state
    state = {
        userState: [],
        activeAccordionCard: 0
    };

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    toggleCard = (e, eventKey) => {
        e.preventDefault();
        // 1. Deconstruct current state
        let {activeAccordionCard } = this.state;
        
        if (activeAccordionCard === eventKey) {
            eventKey = -1;
        }
        
        // 2. Set new state
        this.setState({
            activeAccordionCard: eventKey
        });
    };

    render() {
        const { data, isLoading, isUpdated, userdata, userState, flagClosed, activeAccordionCard } = this.state;
        
        if (isLoading) {
            return (
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <Loading />
                    </Col>
                    <Col xs={1}></Col>
                </Row> 
            );
        }

        return (
          <div>
            <Row className="pixelGapBottom">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <div className="rectangle">
                    <span className="black-20-semibold">Advanced search</span> 

                    <Button
                        id="betaTag"
                        className="white-13-bold margin-left-8"
                    >
                        BETA
                    </Button>

                  <p className="gray800-15"> 
                    The advanced search allows you to find datasets based on the
                    characteristics you need for your project , such as disease,
                    age, and location. This feature is still being tested, so
                    only a limited number of datasets are available for now.
                  </p>
                </div>
              </Col>
              <Col sm={1} lg={1} />
            </Row>

            <Row>
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
            <Accordion defaultActiveKey='0' activeKey={activeAccordionCard.toString()}>
                    <Card className={activeAccordionCard === 0 ? 'activeCard' : ''}>
                        <Accordion.Toggle
                            as={Card.Header}
                            eventKey='0'
                            onClick={(e) => this.toggleCard(e, 0)}
                        >
                        <div className={activeAccordionCard === 0 ? 'stepNumber active' : 'stepNumber'}>1</div>
                        <span className="black-16 noTextDecoration">
                          Creating a cohort
                        </span>
                            
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='0'>
                            <Card.Body className='gray800-14'>
                            <ul className="gray800-14">
                            <li>
                              Access the advanced search tool using the button below.
                            </li>
                            <li>
                              Select the characteristics you need for your project , such as disease, age, gender and location.
                            </li>
                            <li>
                              Use AND/OR to specify your inclusion and exclusion criteria.
                            </li>
                            <li>
                              The tool will give you a list of datasets listed on the Gateway where this data is available, including sample size.
                            </li>
                            <li>
                              You can save your search and return later
                            </li>
                          </ul>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card className={activeAccordionCard === 1 ? 'activeCard' : ''}>
                        <Accordion.Toggle
                            as={Card.Header}
                            eventKey='1'
                            onClick={(e) => this.toggleCard(e, 1)}
                        >
                        <div className={activeAccordionCard === 1 ? 'stepNumber active' : 'stepNumber'}>2</div>
                        <span className="black-16 noTextDecoration">
                          Requesting access
                        </span>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey='1'>
                            <Card.Body className='gray800-14'>
                            <ul className="gray800-14">
                            <li>
                              Once you have found the datasets you need, you can make a Data Access Request via the Innovation Gateway
                            </li>
                            <li>
                              Search for the datasets on the Innovation Gateway and either make an enquiry or request acccess
                            </li>
                            <li>
                              Data Access Requests must be made individually for each dataset
                            </li>
                          </ul>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                </Col>
              <Col sm={1} lg={1} />
            </Row>


            <ActionBar userState={userState}>
              <Button
                variant="primary"
                href=""
                target="_blank"
                id="advancedSearchButton"
                className="white-14-semibold margin-right-16"
              >
                Access the advanced search tool
              </Button>
            </ActionBar>
          </div>
        );
    }
}

export default AccountAdvancedSearch;