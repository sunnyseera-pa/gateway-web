import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormText from 'react-bootstrap/FormText';

class CategoryFilterProject extends Component {
  state = {
    categoriesSelected: [],
    combinedCategories: []
  };

  constructor(props) {
    super(props);
    this.state.combinedCategories = props.combinedProjectCategories;
    this.state.categoriesSelected = props.categoriesSelected;
  }

  changeFilter = (e) => {
    const categoriesSelected = this.state.categoriesSelected
    let index

    if (e.target.checked) {
      categoriesSelected.push(e.target.value)
    } else {
      index = categoriesSelected.indexOf(e.target.value)
      categoriesSelected.splice(index, 1)
    }

    this.setState({ categoriesSelected: categoriesSelected })
    this.props.doUpdateCombinedCategories(categoriesSelected);
  }

  clearFilter = () => {
    const categoriesSelected = [];
    this.setState({ categoriesSelected: categoriesSelected })
    this.props.doUpdateCombinedCategories(categoriesSelected);
  }

  render() {
    const { combinedCategories, categoriesSelected } = this.state;

    if (!combinedCategories || combinedCategories.length === 0) {
      return (<></>);
    }

    return (
      <div>
        <div className="FilterCard mt-2">
          <Row className="mt-2"  >
            <Col xs={7} className="ml-3">
              <span className="Gray800-14px-bold"> Category </span>
              {categoriesSelected.length === 0 ? <span /> :
                <span> <div className="White-12px BubbleCounts"> {categoriesSelected.length} </div> </span>
              }
            </Col>
            <Col xs={3}>
              {this.state.categoriesSelected.length > 0 ?
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
              {!combinedCategories ? '' : combinedCategories.map((category) => {
                return <InputGroup >
                  <InputGroup.Prepend>
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" name="toolCategory" checked={categoriesSelected.indexOf(category) !== -1 ? "true" : ""} value={category} onChange={this.changeFilter} />
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