import React from 'react';
import Container from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SVGIcon from '../images/SVGIcon';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { ReactComponent as WhiteLogoSvg } from '../../src/images/white.svg';

class LandingPage extends React.Component{
    
    state = {
        searchString: null,
    }

    componentDidMount() {
        this.setState({ searchString: ''});
    }

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
            if (!!this.state.searchString) {
                window.location.href = window.location.search+"/search?search="+this.state.searchString;
            }
        }
    }

    changeText = (e) => {
        this.setState({searchString : e.target.value});
    }

    render(){
        return(
    
        <Container className="LandingBackground">
        {/* <Row style={{height: 10}}></Row> */}
        <Row className="pt-4 pl-4">  
        <Col sm={12}> <WhiteLogoSvg /> </Col>  
        </Row>
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
                        <div id="searchInputHolder" className="form-control mr-md-2"> 
                        <Row>

                        <Col sm={1}> <SVGIcon name="searchicon" width={17} height={17} fill={'#2c8267'} stroke='none' type="submit"/> </Col>
                        

                        <Col sm={11}>
                        <span id="SearchInputSpan">
                        <input type="text" placeholder=" Search" className="SearchBarInput"> 
                        </ input>
                        </span>
                        <span id="DropDownSpan">
        
                        <DropdownButton id="dropdown-basic-button" variant="light" size="sm" title="Everything">
                            <Dropdown.Item href="#/action-1"> Everything </Dropdown.Item>
                            <Dropdown.Item href="#/action-2"> Tools </Dropdown.Item>
                            <Dropdown.Item href="#/action-3"> Research Projects </Dropdown.Item>
                            <Dropdown.Item href="#/action-4"> People </Dropdown.Item>
                        </DropdownButton>
                       
                        </span>
                        </Col>

                        </Row>

                        </div>
                        </div>
                    
                </Col>
        {/* </Row> */}
        </Container>

       
        );
    }
}

export default LandingPage;

