
// /ShowObjects/Title.js
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import '../../css/hdruk.css';
// import logo from "../../images/tableau.jpg";
import { ReactComponent as PersonPlaceholderSvg } from '../../images/person-placeholder.svg';
import axios from 'axios';

var baseURL = require('./../../BaseURL').getURL();

class Creators extends Component {

/*   constructor(props) {
    super(props)
    this.state.data = props.data;
  } */


  constructor(props) {
    super(props)
    if (props.data) {
        this.state.data = props.data;
        this.state.isLoading = false;
    }
    else if (props.id) {
        this.state.id = props.id;
        this.getDataSearchFromDb()
    }
}

  // initialize our state
  state = {
    data: [],
    isLoading: true
  };

  getDataSearchFromDb = () => {
    //need to handle error if no id is found
    this.setState({ isLoading: true });
    axios.get(baseURL + '/api/person/' + this.state.id)
    .then((res) => {
        this.setState({
            data: res.data.data[0],
            isLoading: false
        });
    })
};

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data, isLoading } = this.state; 

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <span>
      <Row className="mt-2">
                <Col sm={1} lg={1} />
                <Col sm={10} lg={10}>
                    <a className="searchHolder" href={'/person/' + data.id} >
                        <div className="Rectangle">
                          
                            <Row>
                                <Col sm={2}> 
                                <PersonPlaceholderSvg />
                                  {/* <Image src={require("../../images/bob.jpg")} id="Picture" roundedCircle /> */}
                                </Col>
                                <Col sm={10} className="text-left "> 
                                    {/* <p className="Black-16px"> {data.authors} </p> */}
                                    <p className="Black-16px"> {data.firstname} {data.lastname} </p>
                                    <p className="Gray700-13px"> {data.company} </p>
                                </Col>
                                <Col sm={2} />
                            </Row>
                            </div>
                    </a>
                </Col>
                <Col sm={1} lg={10}/>
            </Row>       
            </span>
     

    );
  }
}

export default Creators;