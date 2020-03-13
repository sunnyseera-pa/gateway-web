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

class FeaturesFilter extends Component {
  state = {
    featuresSelected: [],
    combinedFeatures: []
  };

    constructor(props) {
        super(props);
        this.state.combinedFeatures = props.combinedFeatures;
        this.state.featuresSelected = props.featuresSelected;
    }

    changeFilter = (e) => {
      const featuresSelected = this.state.featuresSelected
      let index

      if (e.target.checked) {
        featuresSelected.push(e.target.value)
      } else {
        index = featuresSelected.indexOf(e.target.value)
        featuresSelected.splice(index, 1)
      }

      this.setState({ featuresSelected: featuresSelected })
      
      console.log('featuresSelected = ' + this.state.featuresSelected);
      this.props.doUpdateCombinedFeatures(featuresSelected);
  }
  
  clearFilter = () => {
    const featuresSelected = [];
    this.setState({featuresSelected: featuresSelected})
    console.log('clear featuress are: ' + featuresSelected);
    this.props.doUpdateCombinedFeatures(featuresSelected);
}

  render() {

    const { combinedFeatures, featuresSelected } = this.state;

    return (
    <div>
     <div className="FilterCard mt-2">
        <Row className="mt-2"  >
            <Col xs={1}></Col>
            <Col xs={11} className="ml-3">
               <span className="Gray800-14px-bold">Features</span>
                <span className="mr-5 ml-3"/> 
               <span>
                  <button className="ClearButtons Purple-14px pl-5" onClick={() => this.clearFilter()}>
                    Clear
                  </button>
                </span>
            </Col>
        </Row>
    </div>
    <div className="AdFilters Gray800-14px">
       {console.log('combinedFeatures are: ' + combinedFeatures)}

       {combinedFeatures.map((features) => {
            console.log('features: ' + features)
        })}
      
      <Row className="mb-3">
          <Col xs={1}></Col>
          <Col xs={11} className="ml-4">  

        {console.log('combinedFeatures: ' + combinedFeatures )}
          {combinedFeatures.map((features) => {
              return <InputGroup >
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" name="features" checked={featuresSelected.indexOf(features)!=-1 ? "true": ""} value={features} onChange={this.changeFilter} />
                    </InputGroup.Prepend>
                    <FormText className="Gray800-14px ml-4 mt-2 mb-2 pb-1" >{features}</FormText>
                   </InputGroup>
          })}

                {console.log('featuresSelected: ' + featuresSelected)}
            </Col>
        </Row> 
    </div>
    </div>
    );
  }
}

export default FeaturesFilter;