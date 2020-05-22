import React, { Component } from 'react';
import { Row, Col, InputGroup, FormText } from 'react-bootstrap';

class CategoryFilterTool extends Component {
    state = {
        toolCategoriesSelected: [],
        toolCategoriesData: []
    };

    constructor(props) {
        super(props);
        this.state.toolCategoriesData = props.toolCategoriesData;
        this.state.toolCategoriesSelected = props.toolCategoriesSelected;
    }

    changeFilter = (e) => {
        const toolCategoriesSelected = this.state.toolCategoriesSelected
        let index

        if (e.target.checked) {
            toolCategoriesSelected.push(e.target.value)
        } else {
            index = toolCategoriesSelected.indexOf(e.target.value)
            toolCategoriesSelected.splice(index, 1)
        }

        this.setState({ toolCategoriesSelected: toolCategoriesSelected })
        this.props.updateOnFilter();
    }

    clearFilter = () => {
        const toolCategoriesSelected = this.state.toolCategoriesSelected;
        while (toolCategoriesSelected.length) { toolCategoriesSelected.pop(); }
        this.props.updateOnFilter();
    }

    render() {
        const { toolCategoriesData, toolCategoriesSelected } = this.state;

        if (!toolCategoriesData || toolCategoriesData.length === 0) {
            return (<></>);
        }

        return (
            <div>
                <div className="FilterCard mt-2">
                    <Row className="mt-2"  >
                        <Col xs={7} className="ml-3">
                            <span className="Gray800-14px-bold"> Category </span>
                            {toolCategoriesSelected.length === 0 ? <span /> :
                                <span> <div className="White-12px BubbleCounts"> {toolCategoriesSelected.length} </div> </span>
                            }
                        </Col>
                        <Col xs={3}>
                            {toolCategoriesSelected.length > 0 ?
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
                            {!toolCategoriesData ? '' : toolCategoriesData.map((category) => {
                                return <InputGroup >
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" name="toolCategory" checked={toolCategoriesSelected.indexOf(category) !== -1 ? "true" : ""} value={category} onChange={this.changeFilter} />
                                    </InputGroup.Prepend>
                                    <FormText className="Gray800-14px ml-4 mt-2 mb-2 pb-1" >{category}</FormText>
                                </InputGroup>
                            })}
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default CategoryFilterTool;