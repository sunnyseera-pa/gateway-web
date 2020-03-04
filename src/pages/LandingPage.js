import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from '../images/SVGIcon';
import { ReactComponent as WhiteLogoSvg } from '../../src/images/white.svg';

var baseURL = require('./../BaseURL').getURL();

class LandingPage extends React.Component{
    
    state = {
        searchString: null,
        data:[],
        isLoading: false,
        userState: [{
            loggedIn: false,
            role: "Reader",
            id: null,
            name: null
        }]
    }

    constructor(props) {
        super(props);
        this.state.userState = props.userState;
    }

    componentDidMount() {
        this.setState({ searchString: ''});
        this.getDataSearchFromDb();
        document.getElementById("SearchInputSpan").focus();
        
    }

    getDataSearchFromDb = () => {
        this.setState({ isLoading: true });
        axios.get(baseURL+'/api/stats')
        .then((res) => {
        this.setState({ 
            data: {
                'project':res.data.data.typecounts.project,
                'tool':res.data.data.typecounts.tool,
                'account':res.data.data.typecounts.person,
                'searches':res.data.data.daycounts.week
            },
            isLoading: false 
        });
        })
    };

    doSearch = (e) => { //fires on enter on searchbar
        if (e.key === 'Enter') {
            if (!!this.state.searchString) {
                window.location.href = window.location.search+"/search?search="+this.state.searchString + '&type=all';
            }
        }
    }

    changeText = (e) => {
        this.setState({searchString : e.target.value});
    }

    render(){
        const {searchString, data, userState, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading ...</p>;
        }

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
                    <Row className="mt-5"/>
                    <Row>
                        <Col sm={2} />
                        <Col sm={2}>
                            <div className="landingPageInformationNumber">{data.account}</div>
                            <div className="landingPageInformationDetail">accounts created</div>
                        </Col>
                        <Col sm={2}>
                            <div className="landingPageInformationNumber">{data.tool}</div>
                            <div className="landingPageInformationDetail">projects added</div>
                        </Col>
                        <Col sm={2}>
                            <div className="landingPageInformationNumber">{data.project}</div>
                            <div className="landingPageInformationDetail">tools added</div>
                        </Col>
                        <Col sm={2}>
                            <div className="landingPageInformationNumber">{data.searches}</div>
                            <div className="landingPageInformationDetail">searches in last week</div>
                        </Col>
                    </Row>
                </Container>
            </div>


       
        );
    }
}

export default LandingPage;

