import React, { Component } from 'react';
import { Row, Col, InputGroup, FormText } from 'react-bootstrap';

class DatasetFilterSampleAvailability extends Component {

    state = {
        sampleAvailabilitySelected: [],
        physicalSampleAvailabilityData: []
    }

    constructor(props) {
        super(props);
        this.state.physicalSampleAvailabilityData = props.physicalSampleAvailabilityData;
        this.state.sampleAvailabilitySelected = props.sampleAvailabilitySelected;
    }

    changeFilter = (e) => {
        const sampleAvailabilitySelected = this.state.sampleAvailabilitySelected
        let index

        if (e.target.checked) {
            sampleAvailabilitySelected.push(e.target.value)
        } else {
            index = sampleAvailabilitySelected.indexOf(e.target.value)
            sampleAvailabilitySelected.splice(index, 1)
        }

        this.setState({ sampleAvailabilitySelected: sampleAvailabilitySelected })
        this.props.updateOnFilter();
    }

    clearFilter = () => {
        const sampleAvailabilitySelected = [];
        this.setState({ sampleAvailabilitySelected: sampleAvailabilitySelected })
        this.props.updateOnFilter();
    }

    render() {
        const { physicalSampleAvailabilityData, sampleAvailabilitySelected } = this.state;

        if (!physicalSampleAvailabilityData || physicalSampleAvailabilityData.length === 0) {
            return (<></>);
        }

        return (
            <div>
                <div className="FilterCard mt-2">
                    <Row className="mt-2"  >

                        <Col xs={7} className="ml-3">
                            <span className="Gray800-14px-bold">Physical sample availability</span>
                            {sampleAvailabilitySelected.length === 0 ? <span /> :
                                <span> <div className="White-12px BubbleCounts"> {sampleAvailabilitySelected.length} </div> </span>
                            }
                            <span className="mr-4 ml-1" />

                        </Col>
                        <Col xs={3}>
                            <span>
                                <button className="ClearButtons Purple-14px" onClick={() => this.clearFilter()}>
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
                            {!physicalSampleAvailabilityData ? '' : physicalSampleAvailabilityData.map((dat) => {
                                return <InputGroup >
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" name="physicalSampleAvailability" checked={sampleAvailabilitySelected.indexOf(dat) !== -1 ? "true" : ""} value={dat} onChange={this.changeFilter} />
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

export default DatasetFilterSampleAvailability;