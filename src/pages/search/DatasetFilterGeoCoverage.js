import React, { Component } from 'react';
import { Row, Col, InputGroup, FormText } from 'react-bootstrap';

class DatasetFilterGeoCoverage extends Component {

    state = {
        geoCoverageSelected: [],
        geographicCoverageData: []
    }

    constructor(props) {
        super(props);
        this.state.geographicCoverageData = props.geographicCoverageData;
        this.state.geoCoverageSelected = props.geoCoverageSelected;
    }

    changeFilter = (e) => {
        const geoCoverageSelected = this.state.geoCoverageSelected;
        let index

        if (e.target.checked) {
            geoCoverageSelected.push(e.target.value)
        } else {
            index = geoCoverageSelected.indexOf(e.target.value)
            geoCoverageSelected.splice(index, 1)
        }

        this.setState({ geoCoverageSelected: geoCoverageSelected })
        this.props.updateOnFilter();
    }

    clearFilter = () => {
        const geoCoverageSelected = [];
        this.setState({ geoCoverageSelected: geoCoverageSelected })
        this.props.updateOnFilter();
    }

    render() {

        const { geographicCoverageData, geoCoverageSelected } = this.state;

        if (!geographicCoverageData || geographicCoverageData.length === 0) {
            return (<></>);
        }

        return (
            <div>
                <div className="FilterCard mt-2">
                    <Row className="mt-2"  >

                        <Col xs={7} className="ml-3">
                            <span className="Gray800-14px-bold">Geographic coverage</span>
                            {geoCoverageSelected.length === 0 ? <span /> :
                                <span> <div className="White-12px BubbleCounts"> {geoCoverageSelected.length} </div> </span>
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

                            {!geographicCoverageData ? '' : geographicCoverageData.map((dat) => {
                                return <InputGroup >
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" name="geographicCoverage" checked={geoCoverageSelected.indexOf(dat) !== -1 ? "true" : ""} value={dat} onChange={this.changeFilter} />
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

export default DatasetFilterGeoCoverage;