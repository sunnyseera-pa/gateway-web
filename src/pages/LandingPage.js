import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../css/hdruk.css';
import SVGIcon from '../images/SVGIcon';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

class LandingPage extends React.Component{
    render(){
        return(
        <Container className="LandingBackground">
        <Row id="landingPageEmptyRow"></Row>
        <Row>
            <Col sm={2}></Col>
            <Col sm={8}>
            <Card id="landingPageCard" className="bg-transparent mb-2" border="0" >
                <Card.Text>
                Explore tools, resources and code used in health
                 research across the UK
                </Card.Text>
            </Card>
            </Col>
            <Col sm={2}></Col>
        </Row>


        {/* <Row> */}
            <Col sm={12}>
                    <div>
                    <form className="form-inline" action="">
                        <div id="searchInputHolder" className="form-control mr-md-2"> 
                        <Row>

                        {/* <Col>
                        <div id="searchInputHolder" class="form-control mr-md-2"> 
                        <SVGIcon name="searchicon" width={17} height={17} fill={'#2c8267'} stroke='none' type="submit"/>
                        <input id="searchInput" type="text" placeholder=" Search" style={{border: 0, flex: 0.97}}> 
                        </ input>
                        </div>
                        </Col> */}

                        <Col sm={1}> <SVGIcon name="searchicon" width={17} height={17} fill={'#2c8267'} stroke='none' type="submit"/> </Col>
                        
                        {/* <SVGIcon name="searchicon" width={17} height={17} fill={'#2c8267'} stroke='none' type="submit"/> */}

                        {/* <input id="searchInput" type="text" placeholder=" Search" style={{border: 0, flex: 0.97}}> 
                        </ input> */}

                        <Col sm={9}>
                        <input id="searchInput" type="text" placeholder=" Search" className="SearchBarInput"> 
                        </ input>
                        </Col>

                        <Col sm={2} style={{float: "right"}}>
                        {/* <Dropdown>
                        <Dropdown.Toggle variant="white" id="dropdown-basic"> Everything </Dropdown.Toggle>
                        <Dropdown.Menu> */}
                        <DropdownButton id="dropdown-basic-button" variant="white" size="sm" title="Everything">
                            <Dropdown.Item href="#/action-1"> Everything </Dropdown.Item>
                            <Dropdown.Item href="#/action-2"> Tools </Dropdown.Item>
                            <Dropdown.Item href="#/action-3"> Research Projects </Dropdown.Item>
                            <Dropdown.Item href="#/action-4"> People </Dropdown.Item>
                        </DropdownButton>
                        {/* </Dropdown.Menu>
                        </Dropdown> */}
                        </Col>

                        </Row>

                        </div>
                    </form>
                    </div>
                </Col>
        {/* </Row> */}
        </Container>

       
        );
    }
}

export default LandingPage;

