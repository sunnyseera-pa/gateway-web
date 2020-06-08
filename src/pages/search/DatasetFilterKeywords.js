import React, { Component } from 'react';
import { Row, Col, InputGroup, FormText } from 'react-bootstrap';

class DatasetFilterKeywords extends Component {

    state = {
        keywordsSelected: [],
        keywordsData: []
    }

    constructor(props) {
        super(props);
        this.state.keywordsData = props.keywordsData;
        this.state.keywordsSelected = props.keywordsSelected;
    }

    changeFilter = (e) => {
        const keywordsSelected = this.state.keywordsSelected
        let index

        if (e.target.checked) {
            keywordsSelected.push(e.target.value)
        } else {
            index = keywordsSelected.indexOf(e.target.value)
            keywordsSelected.splice(index, 1)
        }

        this.setState({ keywordsSelected: keywordsSelected })
        this.props.updateOnFilter();
    }

    clearFilter = () => {
        const keywordsSelected = this.state.keywordsSelected;
        while (keywordsSelected.length) { keywordsSelected.pop(); }
        this.props.updateOnFilter();
    }

    render() {
        const { keywordsData, keywordsSelected } = this.state;

        if (!keywordsData || keywordsData.length === 0) {
            return (<></>);
        }

        return (
            <div>
                <div className="FilterCard mt-2">
                    <Row className="mt-2"  >

                        <Col xs={7} className="ml-3">
                            <span className="Gray800-14px-bold">Keywords</span>
                            {keywordsSelected.length === 0 ? <span /> :
                                <span> <div className="White-12px BubbleCounts"> {keywordsSelected.length} </div> </span>
                            }
                            <span className="mr-4 ml-1" />

                        </Col>
                        <Col xs={3}>
                            {this.state.keywordsSelected.length > 0 ?
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

                            {!keywordsData ? '' : keywordsData.map((dat) => {
                                return <InputGroup >
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" name="keywords" checked={keywordsSelected.indexOf(dat) !== -1 ? "true" : ""} value={dat} onChange={this.changeFilter} />
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

export default DatasetFilterKeywords;