import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { ReactComponent as WhiteLogoSvg } from '../../../src/images/white.svg';
import Login from '../commonComponents/Login';

class SSOPage extends Component {
  state = {
    userState: [
      {
        loggedIn: false,
        role: 'Reader',
        id: null,
        name: null,
      },
    ],
    isLoading: true,
  };

  constructor(props) {
    super(props);
    if (props.data) {
      this.state.userState = props.userState;
      this.state.isLoading = false;
    }
  }

  componentDidMount() {
    console.log(this.state);
    if (this.state.userState) {
      console.log(this.state.userState);
    }
  }

  render() {
    return (
      <div className='LandingBackground'>
        <Row className='pt-5 pl-5'>
          <Col xs={{ span: 6, order: 1 }} lg={{ span: 6, order: 1 }}>
            {' '}
            <WhiteLogoSvg />{' '}
          </Col>
        </Row>
        <Container>
          <div class='login-content mt-4'>
            <div class='login-body mb-4'>
              <Row className='mt-3'>
                <Col xs={1} md={1} />
                <Col xs={10} md={10}>
                <span className="Black-20px">Sign in or create a new account</span>
                </Col>
                <Col xs={1} md={1}>
                </Col>
              </Row>
                <Login />
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default SSOPage;
