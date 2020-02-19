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
                window.location.href = window.location.search+"/search?search="+this.state.searchString + '&type=';
            }
        }
    }

    changeText = (e) => {
        this.setState({searchString : e.target.value});
    }

    render(){
        return(
        
            <div className="LandingBackground">
                <Row className="pt-5 pl-5">
                    <Col sm={12}> <WhiteLogoSvg /> </Col>
                </Row>
                <Container>
                
                    <Row id="landingPageEmptyRow"></Row>
                    <Row>
                        <Col sm={2} />
                        <Col sm={8}>
                            <div id="landingPageCard" className="bg-transparent mb-2" border="0" >
                                Explore tools, resources and code used in health research across the UK
                            </div>
                        </Col>
                        <Col sm={2} />
                    </Row>
                    <Row className="mt-5">
                    <Col sm={1} />
                        <Col sm={10}>     
                            <span className="SearchBarInput">
                                <SVGIcon name="searchicon" width={20} height={20} fill={'#2c8267'} stroke='none' type="submit" className="ml-2 mr-3 mt-3" />
                                <input type="text" placeholder="Search" className="" id="SearchInputSpan" onChange={this.changeText} onKeyDown={this.doSearch} /> 
                            </span>        
                        </Col>
                        <Col sm={1} />
                    </Row>
                </Container>
            </div>


       
        );
    }
}

export default LandingPage;

