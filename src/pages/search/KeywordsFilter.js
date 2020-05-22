import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormText from 'react-bootstrap/FormText';

class KeywordsFilter extends Component {
    state = {
        projectTopicsSelected: [],
        projectTopicData: []
    };

    constructor(props) {
        super(props);
        this.state.projectTopicData = props.projectTopicData;
        this.state.projectTopicsSelected = props.projectTopicsSelected;
    }

    changeFilter = (e) => {
        const projectTopicsSelected = this.state.projectTopicsSelected
        let index

        if (e.target.checked) {
            projectTopicsSelected.push(e.target.value)
        } else {
            index = projectTopicsSelected.indexOf(e.target.value)
            projectTopicsSelected.splice(index, 1)
        }

        this.setState({ projectTopicsSelected: projectTopicsSelected })
        this.props.updateOnFilter();
    }

    clearFilter = () => {
        const projectTopicsSelected = this.state.projectTopicsSelected;
        while (projectTopicsSelected.length) { projectTopicsSelected.pop(); }
        this.props.updateOnFilter();
    }

    render() {

        const { projectTopicData, projectTopicsSelected } = this.state;

        if (!projectTopicData || projectTopicData.length === 0) {
            return (<></>);
        }

        return (
            <div>
                <div className="FilterCard mt-2">
                    <Row className="mt-2"  >

                        <Col xs={7} className="ml-3">
                            <span className="Gray800-14px-bold">Keywords</span>
                            {projectTopicsSelected.length === 0 ? <span /> :
                                <span> <div className="White-12px BubbleCounts"> {projectTopicsSelected.length} </div> </span>
                            }
                            <span className="mr-5" />
                        </Col>
                        <Col xs={3}>
                            {projectTopicsSelected.length > 0 ?
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
                            {!projectTopicData ? '' : projectTopicData.map((topics) => {
                                return <InputGroup >
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" name="topics" checked={projectTopicsSelected.indexOf(topics) !== -1 ? "true" : ""} value={topics} onChange={this.changeFilter} />
                                    </InputGroup.Prepend>
                                    <FormText className="Gray800-14px ml-4 mt-2 mb-2 pb-1" >{topics}</FormText>
                                </InputGroup>
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default KeywordsFilter;