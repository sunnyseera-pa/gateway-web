import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormText from 'react-bootstrap/FormText';
import axios from 'axios';

var baseURL = require('../commonComponents/BaseURL').getURL();

class DatasetFilterPublisher extends Component {

    state = {
        searchString: '',
        data: [],
        isLoading: false,
        publishersSelected: []
    }

    constructor(props) {
        super(props);
        this.state.searchString = props.searchString;
        this.state.publishersSelected = props.publishersSelected;
        this.state.data = props.publisherData;
      }

      changeFilter = (e) => {
        const publishersSelected = this.state.publishersSelected;
        const searchString = this.state.searchString;
        let index
    
        if (e.target.checked) {
            publishersSelected.push(e.target.value)
        } else {
          index = publishersSelected.indexOf(e.target.value)
          publishersSelected.splice(index, 1)
        }
    
        this.setState({ publishersSelected: publishersSelected })
        this.props.doFilteredSearch(publishersSelected);
      }
    
      clearFilter = () => {
        const publishersSelected = [];
        const searchString = this.state.searchString;
        this.setState({ publishersSelected: publishersSelected })
        this.props.doFilteredSearch(publishersSelected);
      }

      render() {

            const { data, searchString, publishersSelected } = this.state;

            if (!data || data.length === 0) {
                return (<></>);
            }
        
            return (
                <div>
                    <div className="FilterCard mt-2">
                        <Row className="mt-2"  >

                            <Col xs={7} className="ml-3">
                                <span className="Gray800-14px-bold">Publisher</span>
                                {publishersSelected.length === 0 ? <span /> :
                                    <span> <div className="White-12px BubbleCounts"> {publishersSelected.length} </div> </span>
                                }
                                <span className="mr-4 ml-1" />

                            </Col>
                            <Col xs={3}>
                                <span>
                                    <button className="ClearButtons Purple-14px"  onClick={() => this.clearFilter()}>
                                        Clear
                                    </button>
                                </span>
                            </Col>
                        </Row>
                    </div>
                    <div className="AdFilters Gray800-14px">
                        <Row className="mb-3">
                            <Col xs={1}></Col>
                            <Col xs={11} className="ml-4">

                                {!data ? '' : data.map((dat) => {
                                    return <InputGroup >
                                        <InputGroup.Prepend>
                                            <InputGroup.Checkbox aria-label="Checkbox for following text input" name="publisher" checked={publishersSelected.indexOf(dat) !== -1 ? "true" : ""}  value={dat} onChange={this.changeFilter} />
                                        </InputGroup.Prepend>
                                        <FormText className="Gray800-14px ml-4 mt-2 mb-2 pb-1" >{dat}</FormText>
                                    </InputGroup>
                                })}
                            </Col>
                        </Row>
                    </div>
                </div>
            );
    }
}

export default DatasetFilterPublisher;