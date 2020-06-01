import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';

import SVGIcon from "../../images/SVGIcon";
import { ReactComponent as ColourLogoSvg } from '../../images/colour.svg';
import { ReactComponent as ClearButtonSvg } from '../../images/clear.svg';
import { ReactComponent as NotificationsBellSvg } from '../../images/bell.svg';

import Messages from '../dashboard/NotificationMessages';
import UserMenu from './UserMenu';

let toggleOn = false;

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="" ref={ref} onClick={e => { e.preventDefault(); onClick(e); }} style={{ float: "right" }}>
        {children}

    </a>
));

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
        const [value] = useState('');

        return (
            <div ref={ref} style={style} className={className} aria-labelledby={labeledBy} style={{ left: "200px", top: "86px", overflowY: 'scroll', overflowX: "hidden", maxHeight: "432px", maxWidth: "400px" }}>
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

var baseURL = require('./BaseURL').getURL();
var cmsURL = require('./BaseURL').getCMSURL();

class SearchBar extends React.Component {

    state = {
        textValue: '',
        userState: [{
            loggedIn: false,
            role: "Reader",
            id: null,
            name: null
        }],
        dropdownOpen: false,
        count: 3
    }

    constructor(props) {
        super(props);
        this.state.userState = props.userState;
        this.toggle = this.toggle.bind(this);
    }

    changeText = (e) => {
        this.setState({ textValue: e.target.value });
        this.props.doUpdateSearchString(e.target.value);
    }

    toggle(e) {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    handleClick = (e) => {
        try {
            if (this.node.contains(e.target)) {
                return;
            }
            else {
                this.setState({ dropdownOpen: false });
            }
        } catch (e) {
            this.setState({ dropdownOpen: false });
        }
    }

    render() {
        const { userState } = this.state;
        return (
            <>
                <div className="searchBarBackground">
                    <Row className="WhiteBackground">
                        <Col xs={{ span: 6, order: 1 }} lg={{ span: 2, order: 1 }}>
                            <div>
                                <a style={{ cursor: 'pointer' }} href={cmsURL} >
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

                                                <span className="SearchInputIconGrey">
                                                    <input type="text" placeholder="Search" id="SearchInputSpanGrey" onChange={this.changeText} onKeyDown={this.props.doSearchMethod} value={this.props.searchString} />
                                                </span>

                                                {(this.props.searchString != '' && this.props.searchString != undefined) ?
                                                    <span className="SearchInputClearGrey">
                                                        <a style={{ cursor: 'pointer' }} href={'/search?search='} >
                                                            <ClearButtonSvg />
                                                        </a>
                                                    </span> : null}
                                            </span>
                                        </Col>



                                        <Col >{
                                            this.state.userState[0].loggedIn ?
                                                <Dropdown ref={node => this.node = node} isOpen={this.state.dropdownOpen} onClick={this.toggle} style={{ paddingTop: "26px", left: "100px" }}>
                                                    <Dropdown.Toggle as={CustomToggle} variant="Success" id="NotificationsBell" style={{ float: "right" }} >
                                                        {/* <span className="landingPageAccountText">{userState[0].name}</span> */}

                                                        <span className="accountDropDownGap"></span>
                                                        < NotificationsBellSvg width={50} height={50} id="NotificationsBell" className={this.state.dropdownOpen ? "NotificationsBell" : null} />

                                                        <div >
                                                            <NotificationBadge count={this.state.count} effect={Effect.SCALE} style={{ backgroundColor: '#29235c', top: '-50px', left: '44px', bottom: '', right: '' }} />
                                                        </div>
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu as={CustomMenu} style={{ overflowY: 'scroll', overflowX: "hidden", maxHeight: "432px", maxWidth: "400px" }}>
                                                        <Messages userState={userState} />


                                                    </Dropdown.Menu>
                                                </Dropdown> : null
                                        }
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        </Col>
                        <Col xs={{ span: 6, order: 2 }} lg={{ span: 2, order: 3 }}>
                            <div className="signLink">
                                <UserMenu userState={userState} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default SearchBar;