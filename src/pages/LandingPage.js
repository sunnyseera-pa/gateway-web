import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card, { CardBody } from 'react-bootstrap/Card';
import '../css/landingPage.css';
import SVGIcon from '../images/SVGIcon';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

class LandingPage extends React.Component{
    render(){
        return(
            // <div>
            //     <style>{'body {background-color: #eeeeee;}'}</style>

            // </div>

            // <div>
            // <Container>

            // </Container>

            // <Container>

            // </Container>
            // </div>

            // <Container>
            //     <Row style={{minHeight: 512, width: 1440}}>
            //         <style>{'body {background-color: #eeeeee;}'}</style>
            //     </Row>
            //     <Row style={{minHeight: 512, width: 1440}}>
            //      <style>{'body {background-color: #2c8267;}'}</style>
            //     </Row>
            // </Container>

        // <Container id="mainLandingPage">
        //     <style>{'body {background-color: #fffff;}'}</style>
        //     <Row id="landingPageTop">
        //         <style>{'body {background-color: #475da7;}'}</style>
        //     </Row>
        //     <Row id="landingPageBottom">
        //      <style>{'body {background-color: #2c8267;}'}</style>
        //     </Row>
        // </Container>

        // <Container >
        // <style>{'body {background-color: #fffff;}'}</style>
        // <Row style={{height: '20%'}}>
        //     <style>{'body {background-color: #475da7;}'}</style>
        // </Row>
        // <Row style={{height: '80%'}}>
        // <style>{'body {background-color: #2c8267;}'}</style>
        // </Row>
        // </Container>

        <Container >
        <Row>
            <Col sm={12}>
            <ButtonToolbar>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="info">Info</Button>
                <Button variant="light">Light</Button>
                <Button variant="dark">Dark</Button>
            </ButtonToolbar>
            </Col>
        </Row>
        <Row>
        <Col sm={12}>
                <nav class="navbar navbar-expand-md bg-white justify-content-center">
                    <div>
                    {/* <SearchIcon type="submit"> Submit </SearchIcon> */}
                    <form class="form-inline" action="">
                        <div id="searchInputHolder" class="form-control mr-md-2"> 
                        <SVGIcon name="searchicon" width={17} height={17} fill={'#2c8267'} stroke='none' type="submit"/>
                         {/* <SearchIcon id="searchIcon" type="submit"> Submit </SearchIcon> */}
                        <input id="searchInput" type="text" placeholder=" Search" style={{border: 0, flex: 0.97}}> 
                        </ input>
                        </div>
                    </form>
                    </div>
                </nav>
                </Col>
        </Row>
        <Row>
        
        </Row>
        </Container>

       
        );
    }
}

export default LandingPage;

// #475da7