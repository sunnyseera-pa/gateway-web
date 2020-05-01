import React, { useState } from 'react';
import SVGIcon from "../../images/SVGIcon";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { ReactComponent as ColourLogoSvg } from '../../images/colour.svg';
import { ReactComponent as ClearButtonSvg } from '../../images/clear.svg';
import { ReactComponent as ArrowDownSvg } from '../../images/stock.svg';
import Dropdown from 'react-bootstrap/Dropdown';

var baseURL = require('./BaseURL').getURL();

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="" ref={ref} onClick={e => { e.preventDefault(); onClick(e); }} >
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

class SearchBar extends React.Component {

    state = {
        textValue: '',
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

    changeText = (e) => {
        this.setState({ textValue: e.target.value });
        this.props.doUpdateSearchString(e.target.value);
    }

    logout = (e) => {
        axios.get(baseURL + '/api/auth/logout')
            .then((res) => {
                window.location.href = "/";
            });
    }

    render() {
        const { userState } = this.state;
        return (
            <div className="searchBarBackground">
                <Row className="WhiteBackground">
                    <Col xs={{ span: 6, order: 1 }} lg={{ span: 2, order: 1 }}>
                        <div>
                            <a style={{ cursor: 'pointer' }} href={'/'} >
                                <ColourLogoSvg className="ml-4 mt-3" />
                            </a>
                        </div>
                    </Col>
                    <Col xs={{ span: 12, order: 3 }} lg={{ span: 8, order: 2 }}>
                        <div>
                            <Container>
                                <Row>
                                    <Col>
                                        <span className="SearchBarInputGrey">
                                            <span className="SearchInputIconGrey">
                                                <SVGIcon name="searchicon" width={20} height={20} fill={'#2c8267'} stroke='none' type="submit" />
                                            </span>
                                            <span>
                                                <input type="text" placeholder="Search" id="SearchInputSpanGrey" onChange={this.changeText} onKeyDown={this.props.doSearchMethod} value={this.props.searchString} />
                                            </span>
                                            <span className="SearchInputClearGrey">
                                                <a style={{ cursor: 'pointer' }} href={'/search?search=&type=all&toolcategory=&programminglanguage=&features=&topics='} >
                                                    <ClearButtonSvg />
                                                </a>
                                            </span>
                                        </span>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col xs={{ span: 6, order: 2 }} lg={{ span: 2, order: 3 }}>
                        <div className="signLink">
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
                                            <span className="Purple-14px">Sign in</span>
                                        </a>
                                    )
                                }
                            })()}

                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default SearchBar;
