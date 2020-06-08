import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Loading from './Loading'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

var baseURL = require('../../commonComponents/BaseURL').getURL();

class RejectedCustodian extends React.Component {

    state = {
        data: {},
        name: '',
        dataset: '',
        isLoading: false
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
                    name: '',
                    isLoading: false
                  });
            } 
            else {
                this.setState({
                    name: res.data.data[0].firstname + ' ' + res.data.data[0].lastname,
                    isLoading: false
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

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var updatedDate = new Date(data.timeStamp);
        var updatedOnDate = updatedDate.getDate() + " " + monthNames[updatedDate.getMonth()] + " " + updatedDate.getFullYear();
        var updatedTime = new Intl.DateTimeFormat('en-US', {hour: '2-digit', minute: '2-digit'}).format(updatedDate)

        return (
            <div className="DARDiv" >

            <Row className="pl-3">
                <Col sm={2} lg={2}>
                    <span> {updatedOnDate}  {updatedTime} </span>
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