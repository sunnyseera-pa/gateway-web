import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import InputGroup from 'react-bootstrap/InputGroup';
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

    if (combinedFeatures.length === 0) {
      return (<></>);
    }

    return (
    <div>
     <div className="FilterCard mt-2">
        <Row className="mt-2"  >
           
            <Col xs={7} className="ml-3">
               <span className="Gray800-14px-bold">Features</span>
              {featuresSelected.length == 0 ? <span /> :
               <span> <div className="White-12px BubbleCounts"> {featuresSelected.length} </div> </span>
              }

                <span className="mr-4 ml-1"/> 
  
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

        {console.log('combinedFeatures: ' + combinedFeatures )}
          {!combinedFeatures ? '' :combinedFeatures.map((features) => {
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