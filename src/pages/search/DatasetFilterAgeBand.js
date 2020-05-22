import React, { Component } from 'react';
import { Row, Col, InputGroup, FormText } from 'react-bootstrap';

class DatasetFilterAgeBand extends Component {

    state = {
        ageBandsSelected: [],
        ageBandData: []
    }

    constructor(props) {
        super(props);
        this.state.ageBandData = props.ageBandData;
        this.state.ageBandsSelected = props.ageBandsSelected;
    }

    changeFilter = (e) => {
        const ageBandsSelected = this.state.ageBandsSelected
        let index

        if (e.target.checked) {
            ageBandsSelected.push(e.target.value)
        } else {
            index = ageBandsSelected.indexOf(e.target.value)
            ageBandsSelected.splice(index, 1)
        }

        this.setState({ ageBandsSelected: ageBandsSelected })
        this.props.updateOnFilter();
    }

    clearFilter = () => {
        const ageBandsSelected = [];
        this.setState({ ageBandsSelected: ageBandsSelected })
        this.props.updateOnFilter();
    }

    render() {

        const { ageBandData, ageBandsSelected } = this.state;

        if (!ageBandData || ageBandData.length === 0) {
            return (<></>);
        }

        return (
            <div>
                <div className="FilterCard mt-2">
                    <Row className="mt-2"  >

                        <Col xs={7} className="ml-3">
                            <span className="Gray800-14px-bold">Age band</span>
                            {ageBandsSelected.length === 0 ? <span /> :
                                <span> <div className="White-12px BubbleCounts"> {ageBandsSelected.length} </div> </span>
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

                            {!ageBandData ? '' : ageBandData.map((dat) => {
                                return <InputGroup >
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" name="ageBand" checked={ageBandsSelected.indexOf(dat.replace("+", "%2B")) !== -1 ? "true" : ""} value={dat.replace("+", "%2B")} onChange={this.changeFilter} />
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

export default DatasetFilterAgeBand;