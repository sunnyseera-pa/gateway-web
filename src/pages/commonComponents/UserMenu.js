import React, { Component, useState } from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';

import { ReactComponent as ArrowDownSvg } from '../../images/stock.svg';
import { ReactComponent as ArrowDownSvgWhite } from '../../images/arrowDownWhite.svg';

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

class UserMenu extends Component {

  state = {
    data: [],
    textValue: '',
    userState: [{
        loggedIn: false,
        role: "Reader",
        id: null,
        name: null
    }],
    isLanding: false,
    requestDetails: null
  }

  constructor(props) {
    super(props);
    this.state.userState = props.userState;
    this.state.isLanding = props.isLanding;
    this.state.requestDetails = props.requestDetails;
  }

  logout = (e) => {
    axios.get(baseURL + '/api/auth/logout')
        .then((res) => {
            window.location.href = "/";
        });
  }

  render() {
    const { data, userState, isLanding, requestDetails } = this.state;
    
    return (
      <>
        {(() => {
            if (userState[0].loggedIn === true) {
                return (
                    <Dropdown>
                        {isLanding ? 
                         <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                              <span className="landingPageAccountText">{userState[0].name}</span>
                              <span className="accountDropDownGap"></span>< ArrowDownSvgWhite />
                          </Dropdown.Toggle>
                          :
                          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                              <span className="pageAccountText">{userState[0].name}</span>
                              <span className="accountDropDownGap"></span>< ArrowDownSvg />
                          </Dropdown.Toggle>
                        }

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
                return (<>
                      <LoginModal data={data} userState={userState} isLanding={isLanding} requestDetails={requestDetails}/>
                    </>
                )
            }
        })()}
      </>
    );
    }
}

const LoginModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const showLoginModal = () => {
    document.getElementById("myModal").style.display = "block";

    window.onclick = function(event) {
      if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
      }
    }
  };

  const hideLoginModal = () => {
    document.getElementById("myModal").style.display = "none";
  };

  return (
    <>
      <a href="" onClick={e => { e.preventDefault();}}>
      {props.isLanding ?
        <span className="landingPageAccountText" id="myBtn" onClick={showLoginModal}>Sign in | Sign up</span>
        :
        <span className="Purple-14px" id="myBtn" onClick={showLoginModal}>Sign in | Sign up</span>
      }
      </a>

<div id="myModal" class="modal">
  <div class="modal-content">
    <div class="modal-body">
      <Row className="mt-3">
            <Col xs={1} md={1} />
            <Col xs={10} md={10}>
              <span className="Black-20px">Sign in or create a new account</span>
            </Col>
            <Col xs={1} md={1}>
              <span class="close" onClick={hideLoginModal}>&times;</span>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10} >
              <span class="Gray800-14px">You can sign in or create a new account using your existing Linkedin, Google or OpenAthens account.</span>
            </Col>
            <Col sm={1} lg={1} />
          </Row>

          <Row className="mt-3">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10} >
              <div className="Gray800-14px" style={{ textAlign: 'center' }}>
                <a href={baseURL + '/auth/linkedin'}>
                  <Image style={{width: '200px'}} src={require("../../images/Linkedin-default.png")} />
                </a> 
              </div>
            </Col>
            <Col sm={1} lg={1} />
          </Row>

          <Row className="mt-2">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10} >
              <div className="Gray800-14px" style={{ textAlign: 'center' }}>
                <a href={baseURL + '/auth/google'}>
                  <Image style={{width: '200px'}} src={require("../../images/Google-default.png")} /> 
                </a>
              </div>
            </Col>
            <Col sm={1} lg={1} />
          </Row>

          <Row className="mt-3 mb-3">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10} >
              <div className="Gray800-14px" style={{ textAlign: 'center' }}>
                <a href={baseURL + '/auth/oidc'} className="openAthensButton">
                  Sign in with OpenAthens
                </a>
                
                {/* <div id="wayfinder">Loading...</div> */}
              </div>
            </Col>
            <Col sm={1} lg={1} />
          </Row>
    </div>
    
  </div>
</div>
    </>
  );
}

export default UserMenu;