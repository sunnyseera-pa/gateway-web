import React from 'react';
import Container from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import SVGIcon from '../images/SVGIcon';

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
                        <div id="searchInputHolder" className="form-control mr-md-2"> 
                        <SVGIcon name="searchicon" width={17} height={17} fill={'#2c8267'} stroke='none' type="submit"/>
                        <input id="searchInput" type="text" onChange={this.changeText} onKeyDown={this.doSearch} placeholder=" Search" value={this.state.searchString} style={{border: 0, flex: 0.97}}> 
                        </ input>
                        </div>
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

