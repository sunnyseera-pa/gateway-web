import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Loading from './Loading'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import moment from 'moment';

var baseURL = require('../../commonComponents/BaseURL').getURL();

class RejectedCustodian extends React.Component {

    state = {
        data: {},
        name: '',
        dataset: '',
        isLoading: true
    }

    constructor(props) {
        super(props)
        this.state.data = props.data;
    }

    componentDidMount() {
        this.getDataSearchFromDb();
        this.getDatasetSearch();
      }

    getDataSearchFromDb = () => {
         this.setState({ isLoading: true });
        axios.get(baseURL + '/api/v1/person/' + this.state.data.userId)
          .then((res) => {
            if (typeof res.data.data[0] === "undefined" ) {
                this.setState({
                    name: ''
                  });
            } 
            else {
                this.setState({
                    name: res.data.data[0].firstname + ' ' + res.data.data[0].lastname
                  });
            }
          })
    };


    getDatasetSearch = () => {
        this.setState({ isLoading: true });
        axios.get(baseURL + '/api/v1/datasets/' + this.state.data.dataSetId)
          .then((res) => {
            this.setState({
              dataset: res.data.data.label,
              isLoading: false
            });
          })
      };

    render() {
        const { data, name, dataset } = this.state; 
        let updatedDateTime = moment(data.timeStamp).format("d MMMM YYYY HH:mm");

        return (
            <div className="DARDiv" >

            <Row className="pl-3">
                <Col sm={2} lg={2}>
                    <span> {updatedDateTime} </span>
                </Col>
                <Col sm={3} lg={3}>
                    <span > {dataset}</span>
                </Col>
                <Col sm={3} lg={3}>
                    <span> {name} </span>
                </Col>
                <Col sm={2} lg={2}>
                    <span >Rejected</span>
                </Col>
                <Col sm={2} lg={2} className="pr-5">
                    <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                            <Dropdown.Item href="">View</Dropdown.Item>
                    </DropdownButton>
                </Col>
            </Row>
            </div>
        );
    }
}

export default RejectedCustodian;