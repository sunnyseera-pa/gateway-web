import React, { Component } from 'react';
import { Row, Col, InputGroup, FormText } from 'react-bootstrap';

class DatasetFilterLicense extends Component {
    state = {
        licensesSelected: [],
        licenseData: []
    }

    constructor(props) {
        super(props);
        this.state.licenseData = props.licenseData;
        this.state.licensesSelected = props.licensesSelected;
    }

    changeFilter = (e) => {
        const licensesSelected = this.state.licensesSelected;
        let index

        if (e.target.checked) {
            licensesSelected.push(e.target.value)
        } else {
            index = licensesSelected.indexOf(e.target.value)
            licensesSelected.splice(index, 1)
        }

        this.setState({ licensesSelected: licensesSelected })
        this.props.updateOnFilter();
    }

    clearFilter = () => {
        const licensesSelected = [];
        this.setState({ licensesSelected: licensesSelected })
        this.props.updateOnFilter();
    }

    render() {
        const { licenseData, licensesSelected } = this.state;

        if (!licenseData || licenseData.length === 0) {
            return (<></>);
        }

        return (
            <div>
                <div className="FilterCard mt-2">
                    <Row className="mt-2"  >

                        <Col xs={7} className="ml-3">
                            <span className="Gray800-14px-bold">License</span>
                            {licensesSelected.length === 0 ? <span /> :
                                <span> <div className="White-12px BubbleCounts"> {licensesSelected.length} </div> </span>
                            }
                            <span className="mr-4 ml-1" />

                        </Col>
                        <Col xs={3}>
                            {this.state.licensesSelected.length > 0 ?
                                <span>
                                    <button className="ClearButtons Purple-14px" onClick={() => this.clearFilter()}>
                                        Clear
                                    </button>
                                </span> : null}
                        </Col>
                    </Row>
                </div>
                <div className="AdFilters Gray800-14px">
                    <Row className="mb-3">
                        <Col xs={1}></Col>
                        <Col xs={11} className="ml-4">

                            {!licenseData ? '' : licenseData.map((dat) => {
                                return <InputGroup >
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" name="license" checked={licensesSelected.indexOf(dat) !== -1 ? "true" : ""} value={dat} onChange={this.changeFilter} />
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

export default DatasetFilterLicense;