import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row  from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SVGIcon from '../images/SVGIcon';
import { ReactComponent as WhiteLogoSvg } from '../../src/images/white.svg';
import { ReactComponent as ArrowDownSvg } from '../images/arrowDownWhite.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import Loading from './components/Loading'

var baseURL = require('./../BaseURL').getURL();

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="#" className="landingPageAccountText" ref={ref} onClick={e => { e.preventDefault(); onClick(e); }} >
        {children}
        <span className="accountDropDownGap"></span>< ArrowDownSvg />
    </a>
));

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value] = useState('');

        return (
            <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
                <ul className="list-unstyled">
                    {React.Children.toArray(children).filter(
                        child =>
                            !value || child.props.children.toLowerCase().startsWith(value),
                    )}
                </ul>
            </div>
        );
    },
);

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
                window.location.href = window.location.search+"/search?search="+this.state.searchString + '&type=all&toolcategory=&programminglanguage=&features=&topics=';
            }
        }
    }

    changeText = (e) => {
        this.setState({searchString : e.target.value});
    }

    logout = (e) => {
        axios.get(baseURL + '/api/logout')
            .then((res) => {
                window.location.href = "/";
            });
    }

    render(){
        const {data, userState, isLoading } = this.state;

        if (isLoading) {
            return <Loading />;
        }

        return(
            <div className="LandingBackground">
                <Row className="pt-5 pl-5">
                    <Col xs={{ span: 6, order: 1 }} lg={{ span: 6, order: 1 }}> <WhiteLogoSvg /> </Col>
                    <Col xs={{ span: 6, order: 2 }} lg={{ span: 6, order: 2 }}>
                        <div className="signLinkLanding">
                            {(() => {
                                if (userState[0].loggedIn === true) {
                                    return (
                                        <Dropdown>
                                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                                {userState[0].name}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu as={CustomMenu}>
                                                <Dropdown.Item href="/account?tab=youraccount">Your Account</Dropdown.Item>
                                                <Dropdown.Item href="/account?tab=messages">Notifications</Dropdown.Item>
                                                <Dropdown.Item href="/account?tab=projects">Project</Dropdown.Item>
                                                <Dropdown.Item href="/account?tab=tools">Tools</Dropdown.Item>
                                                <Dropdown.Item href="/account?tab=reviews">Reviews</Dropdown.Item>
                                                <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    )
                                }
                                else {
                                    return (
                                        <a href={baseURL + '/auth/google'}>
                                            <span className="landingPageAccountText">Sign in</span>
                                        </a>
                                    )
                                }
                            })()}

                        </div>
                    </Col>
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

