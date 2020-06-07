import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';

var baseURL = require('./BaseURL').getURL();

class Login extends React.Component {
    showWayFinder = (e) => {
        document.getElementById("loginWayFinder").style.display = "block";
        document.getElementById("loginButtons").style.display = "none";
    }

    hideWayFinder = (e) => {
        document.getElementById("loginButtons").style.display = "block";
        document.getElementById("loginWayFinder").style.display = "none";
    }

    render() {
        return (
            <div className="mb-1">
                <div id="loginButtons">
                    <Row className='mt-2'>
                        <Col sm={1} lg={1} />
                        <Col sm={10} lg={10}>
                            <span className='Gray800-14px'>
                                You can sign in or create a new account using your existing
                                Linkedin, Google or OpenAthens account.
                            </span>
                        </Col>
                        <Col sm={1} lg={1} />
                    </Row>
                    <Row className='mt-5'>
                        <Col sm={1} lg={1} />
                        <Col sm={10} lg={10}>
                            <div className='Gray800-14px' style={{ textAlign: 'center' }}>
                                <a href={baseURL + '/auth/linkedin'}>
                                    <Image
                                        style={{ width: '200px' }}
                                        src={require('../../images/Linkedin-default.png')}
                                    />
                                </a>
                            </div>
                        </Col>
                        <Col sm={1} lg={1} />
                    </Row>

                    <Row className='mt-3'>
                        <Col sm={1} lg={1} />
                        <Col sm={10} lg={10}>
                            <div className='Gray800-14px' style={{ textAlign: 'center' }}>
                                <a href={baseURL + '/auth/google'}>
                                    <Image
                                        style={{ width: '200px' }}
                                        src={require('../../images/Google-default.png')}
                                    />
                                </a>
                            </div>
                        </Col>
                        <Col sm={1} lg={1} />
                    </Row>

                    <Row className='mt-3'>
                        <Col sm={1} lg={1} />
                        <Col sm={10} lg={10}>
                            <div className='Gray800-14px' style={{ textAlign: 'center' }}>
                                {/* <a href={baseURL + '/auth/oidc'} className='openAthensButton'>
                                    Sign in with OpenAthens
                                </a> */}
                                <a href='#' onClick={this.showWayFinder} className='openAthensButton'>
                                Sign in with OpenAthens
                                </a>
                            </div>
                        </Col>
                        <Col sm={1} lg={1} />
                    </Row>
                </div>

                <div id="loginWayFinder" style={{display:'none'}}>
                    <Row className='mt-3'>
                        <Col sm={1} lg={1} />
                        <Col sm={10} lg={10}>
                            <a href='#' onClick={this.hideWayFinder} className='showAllLoginOptionsButton'>
                                Show all login options
                            </a>
                        </Col>
                        <Col sm={1} lg={1} />
                    </Row>

                    <Row className='mt-3'>
                        <Col sm={1} lg={1} />
                        <Col sm={10} lg={10}>
                            <div id="wayfinder">Loading...</div>
                        </Col>
                        <Col sm={1} lg={1} />
                    </Row>
                </div>
            </div >
        );
    }
}

export default Login;
