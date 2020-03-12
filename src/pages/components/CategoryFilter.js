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
  
  render() {

    const { combinedCategories, categoriesSelected } = this.state;

    return (
    <div className="AdFilters mt-2 Gray800-14px">
       {console.log('combinedCategories are: ' + combinedCategories)}

       {combinedCategories.map((category) => {
            console.log('category: ' + category)
        })}
    
      <Row className="mt-2 mb-5"  >
            <Col xs={1}></Col>
            <Col xs={9}>
                <span id="StickyTitle">Tool Category</span>
            </Col>
        </Row>
      
      <Row className="mt-3">
          <Col xs={2}></Col>
          <Col xs={10}>  

        {console.log('combinedCategories: ' + combinedCategories )}
          {combinedCategories.map((category) => {
              return <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" name="toolCategory" checked={categoriesSelected.indexOf(category)!=-1 ? "true": ""} value={category} onChange={this.changeFilter} />
                    </InputGroup.Prepend>
                    <FormText className="ml-2">{category}</FormText>
                   </InputGroup>
          })}

                {console.log('categoriesSelected: ' + categoriesSelected)}
            </Col>
        </Row> 
    </div>
    );
  }
}

export default CategoryFilter;