import React, { Component } from 'react';
import { Row, Col, InputGroup, FormText } from 'react-bootstrap';

class FeaturesFilter extends Component {
  state = {
    featuresSelected: [],
    featuresData: []
  };

  constructor(props) {
    super(props);
    this.state.featuresData = props.featuresData;
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
    this.props.updateOnFilter();
  }

  clearFilter = () => {
    const featuresSelected = this.state.featuresSelected;
    while (featuresSelected.length) { featuresSelected.pop(); }
    this.props.updateOnFilter();
  }

  render() {

    const { featuresData, featuresSelected } = this.state;

    if (!featuresData || featuresData.length === 0) {
      return (<></>);
    }

    return (
      <div>
        <div className="FilterCard mt-2">
          <Row className="mt-2"  >

            <Col xs={7} className="ml-3">
              <span className="Gray800-14px-bold">Features</span>
              {featuresSelected.length === 0 ? <span /> :
                <span> <div className="White-12px BubbleCounts"> {featuresSelected.length} </div> </span>
              }
              <span className="mr-4 ml-1" />

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

              {!featuresData ? '' : featuresData.map((features) => {
                return <InputGroup >
                  <InputGroup.Prepend>
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" name="features" checked={featuresSelected.indexOf(features) !== -1 ? "true" : ""} value={features} onChange={this.changeFilter} />
                  </InputGroup.Prepend>
                  <FormText className="Gray800-14px ml-4 mt-2 mb-2 pb-1" >{features}</FormText>
                </InputGroup>
              })}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default FeaturesFilter;