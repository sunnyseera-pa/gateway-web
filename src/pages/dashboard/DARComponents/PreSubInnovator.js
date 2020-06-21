import React from 'react';
import axios from 'axios';
import {Row, Col, Container} from 'react-bootstrap/';
import Loading from '../../commonComponents/Loading'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import moment from 'moment';


var baseURL = require('../../commonComponents/BaseURL').getURL();

class PreSubInnovator extends React.Component {

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
        this.getDatasetSearch();
      }

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
        const { isLoading, dataset } = this.state; 
        if (isLoading) {
            return (
                <Container>
                    <Loading />
                </Container>
            );
        }
        return (
            <div className="DARDiv" >

                <Row className="pl-3">
                    <Col sm={3} lg={3}>
                        <span>{moment(this.props.data.updatedAt).format('D MMMM YYYY HH:mm')}</span>
                    </Col>
                    <Col sm={3} lg={3}>
                        <span > {dataset}</span>
                    </Col>
                    <Col sm={4} lg={4}>
                        <span>7/56 questions answered</span>
                    </Col>
                    <Col sm={2} lg={2} className="pr-5">
                        <DropdownButton variant="outline-secondary" alignRight title="Actions" className="FloatRight">
                                <Dropdown.Item href="">Edit</Dropdown.Item>
                                <Dropdown.Item href="">Delete</Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
             </div>
        );
    }
}

export default PreSubInnovator;