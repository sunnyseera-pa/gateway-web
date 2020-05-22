import React, { Component } from 'react';
import { Row, Col, InputGroup, FormText } from 'react-bootstrap';

class CategoryFilterProject extends Component {
    state = {
        projectCategoriesSelected: [],
        projectCategoriesData: []
    };

    constructor(props) {
        super(props);
        this.state.projectCategoriesData = props.projectCategoriesData;
        this.state.projectCategoriesSelected = props.projectCategoriesSelected;
    }

    changeFilter = (e) => {
        const projectCategoriesSelected = this.state.projectCategoriesSelected
        let index

        if (e.target.checked) {
            projectCategoriesSelected.push(e.target.value)
        } else {
            index = projectCategoriesSelected.indexOf(e.target.value)
            projectCategoriesSelected.splice(index, 1)
        }

        this.setState({ projectCategoriesSelected: projectCategoriesSelected })
        this.props.updateOnFilter();
    }

    clearFilter = () => {
        const projectCategoriesSelected = this.state.projectCategoriesSelected;
        while (projectCategoriesSelected.length) { projectCategoriesSelected.pop(); }
        this.props.updateOnFilter();
    }

    render() {
        const { projectCategoriesData, projectCategoriesSelected } = this.state;

        if (!projectCategoriesData || projectCategoriesData.length === 0) {
            return (<></>);
        }

        return (
            <div>
                <div className="FilterCard mt-2">
                    <Row className="mt-2"  >
                        <Col xs={7} className="ml-3">
                            <span className="Gray800-14px-bold"> Category </span>
                            {projectCategoriesSelected.length === 0 ? <span /> :
                                <span> <div className="White-12px BubbleCounts"> {projectCategoriesSelected.length} </div> </span>
                            }
                        </Col>
                        <Col xs={3}>
                            {projectCategoriesSelected.length > 0 ?
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
                            {!projectCategoriesData ? '' : projectCategoriesData.map((category) => {
                                return <InputGroup >
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for following text input" name="toolCategory" checked={projectCategoriesSelected.indexOf(category) !== -1 ? "true" : ""} value={category} onChange={this.changeFilter} />
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

export default CategoryFilterProject;