import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
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
        <Row>
        <Col sm={12}>
                    <div>
                    <form className="form-inline" action="">
                        <div id="searchInputHolder" className="form-control mr-md-2"> 
                        <SVGIcon name="searchicon" width={17} height={17} fill={'#2c8267'} stroke='none' type="submit"/>
                        <input id="searchInput" type="text" placeholder=" Search" style={{border: 0, flex: 0.97}}> 
                        </ input>
                        </div>
                    </form>
                    </div>
                </Col>
        </Row>
        <Row>
        
        </Row>
        </Container>

       
        );
    }
}

export default LandingPage;

