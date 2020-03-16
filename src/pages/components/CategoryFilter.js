// /ShowObjects/ToolsCreated.js
import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import FormText from 'react-bootstrap/FormText';

class CategoryFilter extends Component {
  state = {
    categoriesSelected: [],
    combinedCategories:[]
  };

    constructor(props) {
        super(props);
        this.state.combinedCategories = props.combinedCategories;
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
      
      console.log('categoriesSelected = ' + this.state.categoriesSelected);
      this.props.doUpdateCombinedCategories(categoriesSelected);
  }

  clearFilter = () => {
      const categoriesSelected = [];
      this.setState({categoriesSelected: categoriesSelected})
      console.log('clear categories are: ' + categoriesSelected);
      this.props.doUpdateCombinedCategories(categoriesSelected);
  }
  
  render() {

    const { combinedCategories, categoriesSelected } = this.state;

    return (
    <div>
      {console.log('cats are: ' + JSON.stringify(categoriesSelected))}
      {console.log('cats length is: ' + categoriesSelected.length)}
      {console.log('state cats are: ' + this.state.categoriesSelected)}
      {console.log('state cats length is: ' + this.state.categoriesSelected.length)}
      {console.log('comb are: ' + JSON.stringify(combinedCategories))}
      {console.log('comb length are: ' + combinedCategories.length)}


    <div className="FilterCard mt-2">
        <Row className="mt-2"  >
            {/* <Col xs={1}></Col> */}
            <Col xs={7} className="ml-3">
                <span className="Gray800-14px-bold">Tool Category </span>
                <span> <div className="White-12px BubbleCounts"> {combinedCategories.length} </div> </span>
                {/* <span>
                    <button className="ClearButtons Purple-14px pl-5" onClick={() => this.clearFilter()}>
                        Clear
                    </button>
                </span> */}
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
       {console.log('combinedCategories are: ' + combinedCategories)}

       {combinedCategories.map((category) => {
            console.log('category: ' + category)
        })}
      
      <Row className="mb-3">
          <Col xs={1}></Col>
          <Col xs={11} className="ml-4">  

        {console.log('combinedCategories: ' + combinedCategories )}
          {combinedCategories.map((category) => {
              return <InputGroup >
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox  aria-label="Checkbox for following text input" name="toolCategory" checked={categoriesSelected.indexOf(category)!=-1 ? "true": ""} value={category} onChange={this.changeFilter} />
                    </InputGroup.Prepend>
                    <FormText className="Gray800-14px ml-4 mt-2 mb-2 pb-1" >{category}</FormText>
                   </InputGroup>
          })}

                {console.log('categoriesSelected: ' + categoriesSelected)}
            </Col>
        </Row> 
    </div>
    </div>
    );
  }
}

export default CategoryFilter;