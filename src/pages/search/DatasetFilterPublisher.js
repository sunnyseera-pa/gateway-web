import React, { Component } from 'react';
import { Row, Col, InputGroup, FormText } from 'react-bootstrap';

class DatasetFilterPublisher extends Component {
    state = {
        publishersSelected: [],
        publisherData: []
    }

    constructor(props) {
        super(props);
        this.state.publisherData = props.publisherData;
        this.state.publishersSelected = props.publishersSelected;
    }

    changeFilter = (e) => {
        const publishersSelected = this.state.publishersSelected;
        let index

        if (e.target.checked) {
            publishersSelected.push(e.target.value)
        } else {
            index = publishersSelected.indexOf(e.target.value)
            publishersSelected.splice(index, 1)
        }

        this.setState({ publishersSelected: publishersSelected })
        this.props.updateOnFilter();
    }

    clearFilter = () => {
        const publishersSelected = this.state.publishersSelected;
        while (publishersSelected.length) { publishersSelected.pop(); }
        this.props.updateOnFilter();
    }
    
    render() {
        const { publisherData, publishersSelected } = this.state;

        if (!publisherData || publisherData.length === 0) {
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
                            {this.state.publishersSelected.length > 0 ?
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

                            {!publisherData ? '' : publisherData.map((dat) => {
                                return <InputGroup >
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" name="publisher" checked={publishersSelected.indexOf(dat) !== -1 ? "true" : ""} value={dat} onChange={this.changeFilter} />
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