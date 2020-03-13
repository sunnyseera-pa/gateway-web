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

class TopicsFilter extends Component {
  state = {
    topicsSelected: [],
    combinedTopic: []
  };

    constructor(props) {
        super(props);
        this.state.combinedTopic = props.combinedTopic;
        this.state.topicsSelected = props.topicsSelected;
    }

    changeFilter = (e) => {
      const topicsSelected = this.state.topicsSelected
      let index

      if (e.target.checked) {
        topicsSelected.push(e.target.value)
      } else {
        index = topicsSelected.indexOf(e.target.value)
        topicsSelected.splice(index, 1)
      }

      this.setState({ topicsSelected: topicsSelected })
      
      console.log('topicsSelected = ' + this.state.topicsSelected);
      this.props.doUpdateCombinedTopics(topicsSelected);
  }
  
  clearFilter = () => {
    const topicsSelected = [];
    this.setState({topicsSelected: topicsSelected})
    console.log('clear featuress are: ' + topicsSelected);
    this.props.doUpdateCombinedTopics(topicsSelected);
}

  render() {

    const { combinedTopic, topicsSelected } = this.state;

    return (   
    <div>
    <div className="FilterCard mt-2">
        <Row className="mt-2"  >
            <Col xs={1}></Col>
            <Col xs={11} className="ml-3">
               <span className="Gray800-14px-bold">Topics</span>
               <span className="mr-5 ml-4"/> 
               <span>
                  <button className="ClearButtons Purple-14px pl-5" onClick={() => this.clearFilter()}>
                    Clear
                  </button>
                </span>
            </Col>
        </Row>
    </div>
    <div className="AdFilters Gray800-14px">
       {console.log('combinedFeatures are: ' + combinedTopic)}

       {combinedTopic.map((topics) => {
            console.log('topics: ' + topics)
        })}
      
      <Row className="mb-3">
          <Col xs={1}></Col>
          <Col xs={11} className="ml-4">  

        {console.log('combinedTopic: ' + combinedTopic )}
          {combinedTopic.map((topics) => {
              return <InputGroup >
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" name="topics" checked={topicsSelected.indexOf(topics)!=-1 ? "true": ""} value={topics} onChange={this.changeFilter} />
                    </InputGroup.Prepend>
                    <FormText className="Gray800-14px ml-4 mt-2 mb-2 pb-1" >{topics}</FormText>
                   </InputGroup>
          })}

                {console.log('topicsSelected: ' + topicsSelected)}
            </Col>
        </Row> 
    </div>
    </div>
    );
  }
}

export default TopicsFilter;