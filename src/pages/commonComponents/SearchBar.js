import React, { useState } from 'react';
import axios from 'axios';
import classnames from "classnames";

import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import NotificationBadge from 'react-notification-badge';

import SVGIcon from "../../images/SVGIcon";
import { ReactComponent as ColourLogoSvg } from '../../images/colour.svg';
import { ReactComponent as ClearButtonSvg } from '../../images/clear.svg';
import { ReactComponent as NotificationsBellSvg } from '../../images/bell.svg';
import { ReactComponent as HamBurgerSvg } from '../../images/hamburger.svg';
import { ReactComponent as ArrowDownSvg } from '../../images/stock.svg';
import { ReactComponent as WhiteArrowDownSvg } from '../../images/arrowDownWhite.svg';

import moment from 'moment';
import { cmsURL } from '../../configs/url.config';

var baseURL = require('./BaseURL').getURL();

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a href="" ref={ref} onClick={e => { e.preventDefault(); onClick(e); }} >
        {children}
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
        }],
        dropdownOpen: false,
        clearMessages: false,
        count: 0,
        prevScrollpos: window.pageYOffset,
        visible: true,
        isLoading: true
    }

    constructor(props) {
        super(props);
        this.state.userState = props.userState;
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        document.addEventListener('mousedown', this.handleClick, false);

        if (this.state.userState[0].loggedIn) {
            this.getNumberOfUnreadNotificiations();
            this.doMessagesCall();
        }
        else {
            this.setState({ isLoading: false });
        }
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        const { prevScrollpos } = this.state;
        const currentScrollPos = window.pageYOffset;
        var visible = this.state.visible;

        if (window.innerWidth < 992) {
            visible = (prevScrollpos > currentScrollPos) || (currentScrollPos < 115);
        }
        else {
            visible = (prevScrollpos > currentScrollPos) || (currentScrollPos < 65);
        }

        this.setState({
            prevScrollpos: currentScrollPos,
            visible
        });
    };

    logout = (e) => {
        axios.get(baseURL + '/api/v1/auth/logout')
            .then((res) => {
                window.location.href = cmsURL;
            });
    }

    onSearch = (e) => { //onSearch
        this.setState({ textValue: e.target.value });
        this.props.doUpdateSearchString(e.target.value);
    }

    doMessagesCall() {
        var apiToCall = '/api/v1/messages/' + this.state.userState[0].id;
        if (this.state.userState[0].role === "Admin") {
            apiToCall = '/api/v1/messages/admin/' + this.state.userState[0].id;
        }

        axios.get(baseURL + apiToCall)
            .then((res) => {
                this.setState({
                    newData: res.data.newData,
                    isLoading: false,
                    isRead: res.data.isRead,
                });
            })
    };

    getNumberOfUnreadNotificiations() {
        let apiToCall = '/api/v1/messages/numberofunread/' + this.state.userState[0].id;
        if (this.state.userState[0].role === "Admin") {
            apiToCall = '/api/v1/messages/numberofunread/admin/' + this.state.userState[0].id;
        }
        axios.get(baseURL + apiToCall)
            .then((res) => {
                this.setState({ count: res.data.countUnreadMessages });
            });
    }

    setNotificationsAsRead() {
        const messageIds = [];
        this.state.newData.forEach((data) => {
            messageIds.push(data.messageID);
        })

        axios.post(baseURL + '/api/v1/messages/markasread',
            messageIds
        );
    }

    handleClick = (e) => {
        try {
            if (this.node.contains(e.target) || this.nodeMobile.contains(e.target)) {
                this.setState({ dropdownOpen: true });
            }
            else {
                if (this.state.dropdownOpen === true) {
                    this.setNotificationsAsRead()
                    this.setState({ count: 0, clearMessage: true });
                }
                this.setState({ dropdownOpen: false });
            }
        } catch (e) {
            this.setState({ dropdownOpen: false });
        }
    }

    showSearchBar = (e) => {
        document.getElementById("mobileSearchBarRevealed").style.display = "block";
        document.getElementById("mobileSearchBarHidden").style.display = "none";
    }

    showLoginModal() {
        document.getElementById("myModal").style.display = "block";
        document.getElementById("loginWayFinder").style.display = "none";
        document.getElementById("loginButtons").style.display = "block";
        document.getElementById("loginModalTitle").innerHTML = "Sign in or create a new account";
        document.getElementById("modalRequestSection").style.display = "none";

        window.onclick = function (event) {
            if (event.target === document.getElementById("myModal")) {
                document.getElementById("myModal").style.display = "none";
            }
        }
    }

    render() {
        const { userState, newData, isLoading, clearMessage } = this.state;

        if (isLoading) {
            return <></>;
        }

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        return (
            <nav className={classnames("navbarShown", { "navbarHidden": !this.state.visible })}>

                <div className="searchBarBackground" id="desktopSearchBar">
                    <Row className="WhiteBackground">
                        <Col lg={4}>
                            <div className="navBarLogoSpacing">
                                <a style={{ cursor: 'pointer' }} href={cmsURL} >
                                    <ColourLogoSvg className="ml-4 mt-3" />
                                </a>
                            </div>
                            <div className="navBarLinkSpacing">
                                <a href={cmsURL + "/pages/about"} className="Black-14px">About</a>
                            </div>
                            <div className="navBarLinkSpacing">
                                <a href={cmsURL + "/pages/community"} className="Black-14px">Community</a>
                            </div>
                        </Col>

                        <Col lg={8} className="text-right">
                            <div className="navBarSearchBarSpacing">
                                <Container>
                                    <Row>
                                        <Col>
                                            <span className="SearchBarInputGrey">
                                                <span className="SearchInputIconGrey">
                                                    <SVGIcon name="searchicon" width={20} height={20} fill={'#2c8267'} stroke='none' type="submit" />
                                                </span>
                                                <span>
                                                    <input type="text" placeholder="Search" id="SearchInputSpanGrey" data-testid="searchbar" onChange={this.onSearch} onKeyDown={this.props.doSearchMethod} value={this.props.searchString} />
                                                </span>
                                                {(this.props.searchString !== '' && this.props.searchString !== undefined) ?
                                                    <span className="SearchInputClearGrey" data-testid="searchbar-clear-btn">
                                                        <a style={{ cursor: 'pointer' }} href={'/search?search='} >
                                                            <ClearButtonSvg />
                                                        </a>
                                                    </span> : null}
                                            </span>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>

                            {(() => {
                                if (userState[0].loggedIn === true) {
                                    return (
                                        <div className="navBarNotificationSpacing">
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle} ref={node => this.node = node}>
                                                    <NotificationBadge count={this.state.count} style={{ backgroundColor: '#29235c' }} />
                                                    <NotificationsBellSvg width={50} height={50} id="NotificationsBell" className={this.state.dropdownOpen ? "NotificationsBell" : null} style={{ cursor: 'pointer' }} />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu as={CustomMenu} className="desktopNotificationMenu">
                                                    {newData.length <= 0 ?
                                                        <div className="NoNotifications" >
                                                            <div className="Gray800-14px" style={{ textAlign: 'center' }}>
                                                                <p><b>No notifications yet</b></p>
                                                                <p>We'll let you know when something important happens to your content or account.</p>
                                                            </div>
                                                        </div>
                                                        : newData.slice(0, 48).map((dat) => {
                                                            let messageDateString = moment(dat.messageSent).format('D MMMM YYYY HH:mm');

                                                            if (dat.messageType === 'add') {
                                                                return (
                                                                    <>
                                                                        <Row className={dat.isRead === 'true' || clearMessage ? "NotificationReadBackground" : ''}>
                                                                            <Col xs={10}>
                                                                                <div className="NotificationDate">{messageDateString + '\n'}</div>
                                                                                {dat.tool.length &&  <div className="NotificationInfoHolder"><a href={'/' + dat.tool[0].type + '/' + dat.tool[0].id} class="NotificationInfo">{dat.messageDescription}</a></div> }
                                                                            </Col>
                                                                            <Col xs={2}>{dat.isRead === 'false' && !clearMessage ? <SVGIcon name="newnotificationicon" width={20} height={20} visble='true' style={{ float: "right", fill: "#3db28c", paddingRight: "0px", marginRight: "10px", marginTop: "5px" }} fill={"#3db28c"} stroke='none' /> : null}</Col>
                                                                        </Row>
                                                                        <Dropdown.Divider style={{ margin: "0px" }} />
                                                                    </>
                                                                )
                                                            }
                                                            else {
                                                                return (
                                                                    <>
                                                                        <Row className={dat.isRead === 'true' || clearMessage ? "NotificationReadBackground" : ''}>
                                                                            <Col xs={10}>
                                                                                <div className="NotificationDate">{messageDateString + '\n'}</div>
                                                                                {dat.tool.length && <div className="NotificationInfoHolder"><a href={'/' + dat.tool[0].type + '/' + dat.tool[0].id} class="NotificationInfo">{dat.messageDescription}</a></div>}
                                                                            </Col>
                                                                            <Col xs={2}>{dat.isRead === 'false' && !clearMessage ? <SVGIcon name="newnotificationicon" width={20} height={20} visble='true' style={{ float: "right", fill: "#3db28c", paddingRight: "0px", marginRight: "10px", marginTop: "5px" }} fill={"#3db28c"} stroke='none' /> : null}</Col>
                                                                        </Row>
                                                                        <Dropdown.Divider style={{ margin: "0px" }} />
                                                                    </>
                                                                )
                                                            }
                                                        })}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div className="offlineNotificationGap">
                                            <WhiteArrowDownSvg width={50} height={50} />
                                        </div>
                                    )
                                }
                            })()}

                            <div className="navBarLoginSpacing">
                                {(() => {
                                    if (userState[0].loggedIn === true) {
                                        return (
                                            <Dropdown>
                                                <Dropdown.Toggle as={CustomToggle}>
                                                    <span className="Black-14px">{userState[0].name}</span>
                                                    <span className="accountDropDownGap"></span>< ArrowDownSvg />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu as={CustomMenu} className="desktopLoginMenu">
                                                    {/* <Dropdown.Item className="Black-14px" href="/account?tab=youraccount">Your Account</Dropdown.Item>
                                                    <Dropdown.Item className="Black-14px" href="/account?tab=messages">Notifications</Dropdown.Item>
                                                    <Dropdown.Item className="Black-14px" href="/account?tab=projects">Project</Dropdown.Item>
                                                    <Dropdown.Item className="Black-14px" href="/account?tab=tools">Tools</Dropdown.Item>
                                                    <Dropdown.Item className="Black-14px" href="/account?tab=reviews">Reviews</Dropdown.Item>
                                                    <Dropdown.Item className="Black-14px" onClick={this.logout}>Logout</Dropdown.Item> */}

                                                    <Dropdown.Item href="/account?tab=youraccount" className="Black-14px">Your Account</Dropdown.Item>
                                                    <Dropdown.Item href="/account?tab=tools" className="Black-14px">Tools</Dropdown.Item>
                                                    <Dropdown.Item href="/account?tab=reviews" className="Black-14px">Reviews</Dropdown.Item>
                                                    <Dropdown.Item href="/account?tab=projects" className="Black-14px">Projects</Dropdown.Item>
                                                    <Dropdown.Item href="/account?tab=dataaccessrequests" className="Black-14px">Data access requests</Dropdown.Item>
                                                    <Dropdown.Item href="/account?tab=usersroles" className="Black-14px">Users and roles</Dropdown.Item>
                                                    <Dropdown.Item onClick={this.logout} className="Black-14px">Logout</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        )
                                    }
                                    else {
                                        return (<>
                                            <span className="Black-14px" id="myBtn" onClick={e => { this.showLoginModal() }} >Sign in | Sign up</span>
                                        </>
                                        )
                                    }
                                })()}
                            </div>
                        </Col>
                    </Row>
                </div>

                <div id="mobileSearchBar">
                    <div className="searchBarBackground">
                        <Row className="WhiteBackground">
                            <Col xs={2}>
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle}>
                                        <HamBurgerSvg className="hamBurgerHolder" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu as={CustomMenu} className="mobileLoginMenu">
                                        <Dropdown.Item className="Black-14px" href={cmsURL + "/pages/about"}>About</Dropdown.Item>
                                        <Dropdown.Item className="Black-14px" href={cmsURL + "/pages/community"}>Community</Dropdown.Item>
                                        <Dropdown.Divider />
                                        {(() => {
                                            if (userState[0].loggedIn === true) {
                                                return (
                                                    <>
                                                        <Dropdown.Item className="Black-14px" href="/account?tab=projects">Project</Dropdown.Item>
                                                        <Dropdown.Item className="Black-14px" href="/account?tab=tools">Tools</Dropdown.Item>
                                                        <Dropdown.Item className="Black-14px" href="/account?tab=reviews">Reviews</Dropdown.Item>
                                                        <Dropdown.Item className="Black-14px" onClick={this.logout}>Logout ({userState[0].name})</Dropdown.Item>
                                                    </>
                                                )
                                            }
                                            else {
                                                return (
                                                    <>
                                                        <Dropdown.Item className="Black-14px" onClick={e => { this.showLoginModal() }}>Sign in or create a new account</Dropdown.Item>
                                                    </>
                                                )
                                            }
                                        })()}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>

                            {(() => {
                                if (userState[0].loggedIn === true) {
                                    return (<>
                                        <Col xs={8}>
                                            <div id="mobileSearchBarHidden" style={{ display: 'block' }}>
                                                <div className="navBarLogoSpacing">
                                                    <a href={cmsURL} >
                                                        <ColourLogoSvg className="ml-4 mt-3" />
                                                    </a>
                                                </div>

                                                <div className="navBarSearchIconHolder">
                                                    <a href="#" onClick={this.showSearchBar}>
                                                        <SVGIcon name="searchicon" width={20} height={20} fill={'#2c8267'} stroke='none' type="submit" />
                                                    </a>
                                                </div>
                                            </div>

                                            <div id="mobileSearchBarRevealed" style={{ display: 'none' }}>
                                                <div className="navBarSearchBarSpacing">
                                                    <Container>
                                                        <Row>
                                                            <Col>
                                                                <span className="SearchBarInputGrey">
                                                                    <span className="SearchInputIconGrey">
                                                                        <SVGIcon name="searchicon" width={20} height={20} fill={'#2c8267'} stroke='none' type="submit" />
                                                                    </span>
                                                                    <span>
                                                                        <input type="text" placeholder="Search" id="SearchInputSpanGrey" onChange={this.onSearch} onKeyDown={this.props.doSearchMethod} value={this.props.searchString} />
                                                                    </span>
                                                                    {(this.props.searchString !== '' && this.props.searchString !== undefined) ?
                                                                        <span className="SearchInputClearGrey">
                                                                            <a style={{ cursor: 'pointer' }} href={'/search?search='} >
                                                                                <ClearButtonSvg />
                                                                            </a>
                                                                        </span> : null}
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs={2} className="text-right">
                                            <div className="navBarNotificationSpacing">
                                                <Dropdown>
                                                    <Dropdown.Toggle as={CustomToggle} ref={nodeMobile => this.nodeMobile = nodeMobile}>
                                                        <NotificationBadge count={this.state.count} style={{ backgroundColor: '#29235c' }} />
                                                        <NotificationsBellSvg width={50} height={50} id="NotificationsBell" className={this.state.dropdownOpen ? "NotificationsBell" : null} style={{ cursor: 'pointer' }} />
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu as={CustomMenu} className="mobileNotificationMenu">
                                                        {newData.length <= 0 ?
                                                            <div className="NoNotifications" >
                                                                <div className="Gray800-14px" style={{ textAlign: 'center' }}>
                                                                    <p><b>No notifications yet</b></p>
                                                                    <p>We'll let you know when something important happens to your content or account.</p>
                                                                </div>
                                                            </div>
                                                            : newData.slice(0, 48).map((dat) => {
                                                                let messageDate = new Date(dat.messageSent);
                                                                let messageDateString = messageDate.getDate() + " " + monthNames[messageDate.getMonth()] + " " + messageDate.getFullYear() + " " + messageDate.getHours() + ":" + messageDate.getMinutes();

                                                                if (dat.messageType === 'add') {
                                                                    return (
                                                                        <>
                                                                            <Row className={dat.isRead === 'true' || clearMessage ? "NotificationReadBackground" : ''}>
                                                                                <Col xs={10}>
                                                                                    <div className="NotificationDate">{messageDateString + '\n'}</div>
                                                                                    <div className="NotificationInfoHolder"><a href={'/' + dat.tool.type + '/' + dat.tool.id} class="NotificationInfo">{dat.messageDescription}</a></div>
                                                                                </Col>
                                                                                <Col xs={2}>{dat.isRead === 'false' && !clearMessage ? <SVGIcon name="newnotificationicon" width={20} height={20} visble='true' style={{ float: "right", fill: "#3db28c", paddingRight: "0px", marginRight: "10px", marginTop: "5px" }} fill={"#3db28c"} stroke='none' /> : null}</Col>
                                                                            </Row>
                                                                            <Dropdown.Divider style={{ margin: "0px" }} />
                                                                        </>
                                                                    )
                                                                }
                                                                else {
                                                                    if (dat.messageTo === 0) {
                                                                        return (
                                                                            <>
                                                                                <Row className={dat.isRead === 'true' || clearMessage ? "NotificationReadBackground" : ''}>
                                                                                    <Col xs={10}>
                                                                                        <div className="NotificationDate">{messageDateString + '\n'}</div>
                                                                                        {dat.tool.length &&  <div className="NotificationInfoHolder"><a href={'/' + dat.tool[0].type + '/' + dat.tool[0].id} class="NotificationInfo">{dat.messageDescription}</a></div> }
                                                                                    </Col>
                                                                                    <Col xs={2}>{dat.isRead === 'false' && !clearMessage ? <SVGIcon name="newnotificationicon" width={20} height={20} visble='true' style={{ float: "right", fill: "#3db28c", paddingRight: "0px", marginRight: "10px", marginTop: "5px" }} fill={"#3db28c"} stroke='none' /> : null}</Col>
                                                                                </Row>
                                                                                <Dropdown.Divider style={{ margin: "0px" }} />
                                                                            </>
                                                                        )
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <>
                                                                                <Row className={dat.isRead === 'true' || clearMessage ? "NotificationReadBackground" : ''}>
                                                                                    <Col xs={10}>
                                                                                        <div className="NotificationDate">{messageDateString + '\n'}</div>
                                                                                        <div className="NotificationInfoHolder"><a href={'/' + dat.tool[0].type + '/' + dat.tool[0].id} class="NotificationInfo">{dat.messageDescription}</a></div>
                                                                                    </Col>
                                                                                    <Col xs={2}>{dat.isRead === 'false' && !clearMessage ? <SVGIcon name="newnotificationicon" width={20} height={20} visble='true' style={{ float: "right", fill: "#3db28c", paddingRight: "0px", marginRight: "10px", marginTop: "5px" }} fill={"#3db28c"} stroke='none' /> : null}</Col>
                                                                                </Row>
                                                                                <Dropdown.Divider style={{ margin: "0px" }} />
                                                                            </>
                                                                        )
                                                                    }
                                                                }
                                                            })}
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            </div>
                                        </Col>
                                    </>
                                    )
                                }
                                else {
                                    return (
                                        <Col xs={10}>
                                            <div id="mobileSearchBarHidden" style={{ display: 'block' }}>
                                                <div className="navBarLogoSpacing">
                                                    <a href={cmsURL} >
                                                        <ColourLogoSvg className="ml-4 mt-3" />
                                                    </a>
                                                </div>

                                                <div className="navBarSearchIconHolderAlt">
                                                    <a href="#" onClick={this.showSearchBar}>
                                                        <SVGIcon name="searchicon" width={20} height={20} fill={'#2c8267'} stroke='none' type="submit" />
                                                    </a>
                                                </div>
                                            </div>

                                            <div id="mobileSearchBarRevealed" style={{ display: 'none' }}>
                                                <div className="navBarSearchBarSpacing">
                                                    <Container>
                                                        <Row>
                                                            <Col>
                                                                <span className="SearchBarInputGrey">
                                                                    <span className="SearchInputIconGrey">
                                                                        <SVGIcon name="searchicon" width={20} height={20} fill={'#2c8267'} stroke='none' type="submit" />
                                                                    </span>
                                                                    <span>
                                                                        <input type="text" placeholder="Search" id="SearchInputSpanGrey" onChange={this.onSearch} onKeyDown={this.props.doSearchMethod} value={this.props.searchString} />
                                                                    </span>
                                                                    {(this.props.searchString !== '' && this.props.searchString !== undefined) ?
                                                                        <span className="SearchInputClearGrey">
                                                                            <a style={{ cursor: 'pointer' }} href={'/search?search='} >
                                                                                <ClearButtonSvg />
                                                                            </a>
                                                                        </span> : null}
                                                                </span>
                                                            </Col>
                                                        </Row>
                                                    </Container>
                                                </div>
                                            </div>
                                        </Col>
                                    )
                                }
                            })()}
                        </Row>
                    </div>
                </div>
            </nav>
        );
    }
}

export default SearchBar;