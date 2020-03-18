// /ShowObjects/Title.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { ReactComponent as PersonPlaceholderSvg } from '../../images/person-placeholder.svg';
import axios from 'axios';
import { number } from 'prop-types';

var baseURL = require('./../../BaseURL').getURL();

class PersonTitle extends Component {

  constructor(props) {
    super(props)
    this.state.data = props.data;
    console.log('person id' + props.data.id)
  }

  // initialize our state
  state = {
    data: [],
    id: this.props.data.id,

    counter: this.props.data.counter 

  };

  componentDidMount(props){
  
    console.log('this.props.data.counter: ' + this.props.data.counter);
    console.log('this.props.data.counter type: ' + typeof(this.props.data.counter));

    let counter = !this.props.data.counter ? 1 : this.props.data.counter + 1;
  
    console.log('counter: ' + counter);

    this.UpdateCounter(this.props.data.id, counter);
  }

  UpdateCounter = (id, counter) => {
      console.log('counter in update is: ' + counter);
      console.log('id in update is: ' + id);

      axios.post(baseURL + '/api/counter/update', {id: id, counter: counter});
  }

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    console.log('person data: ' + JSON.stringify(data))

    return (
      <div>
        <Row className="mt-1">
          <Col sm={1} lg={1} />
          <Col sm={10} lg={10}>
            <Card className="Rectangle">
              <Card.Body>
                <Row className="mb-2">
                  <Col sm={10} className="text-left ">
                    <p className="Black-20px"> {data.firstname} {data.lastname} </p>
                    {!data.bio ? '' : <p className='Gray800-14px'> {data.bio} </p>}
                  </Col>
                  <Col sm={2} className="text-right">
                    <div class="avatar-circle">
                        <span class="initials">{data.firstname.charAt(0).toUpperCase()}{data.lastname.charAt(0).toUpperCase()}</span>
                    </div>
                  </Col>
                </Row>

                <Row>
                  {!data.orcid ? '' :
                    <Col xs={12} md={12}>

                      <span className='Gray800-14px'> ORCID </span>
                      <span className='Purple-14px'> {data.orcid} </span>
                    </Col>
                  }
                </Row>

                <Row>
                  {!data.link ? '' :
                    <Col xs={12} md={12}>
                      <span>
                        <a href={data.link} className="Purple-14px">
                          {data.link}
                        </a>
                      </span>
                    </Col>
                  }
                </Row>

                <Row>
                  <Col className="mt-2">
                    <span className='Gray800-14px'>
                    {data.counter == undefined ? 1 : data.counter+1}
                    {data.counter==undefined ? ' view' : ' views'}
                    </span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={1} lg={1} />
        </Row>
      </div>

    );
  }
}

export default PersonTitle;