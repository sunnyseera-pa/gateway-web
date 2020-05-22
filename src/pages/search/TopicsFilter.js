import React, { Component } from 'react';
import { Row, Col, InputGroup, FormText } from 'react-bootstrap';

class TopicsFilter extends Component {
  state = {
    toolTopicsSelected: [],
    toolTopicData: []
  };

  constructor(props) {
    super(props);
    this.state.toolTopicData = props.toolTopicData;
    this.state.toolTopicsSelected = props.toolTopicsSelected;
  }

  changeFilter = (e) => {
    const toolTopicsSelected = this.state.toolTopicsSelected
    let index

    if (e.target.checked) {
        toolTopicsSelected.push(e.target.value)
    } else {
      index = toolTopicsSelected.indexOf(e.target.value)
      toolTopicsSelected.splice(index, 1)
    }

    this.setState({ toolTopicsSelected: toolTopicsSelected })
    this.props.updateOnFilter();
  }

  clearFilter = () => {
    const toolTopicsSelected = this.state.toolTopicsSelected;
    while (toolTopicsSelected.length) { toolTopicsSelected.pop(); }
    this.props.updateOnFilter();
  }

  render() {

    const { toolTopicData, toolTopicsSelected } = this.state;

    if (!toolTopicData || toolTopicData.length === 0) {
      return (<></>);
    }

    return (
      <div>
        <div className="FilterCard mt-2">
          <Row className="mt-2"  >

            <Col xs={7} className="ml-3">
              <span className="Gray800-14px-bold">Topics</span>
              {toolTopicsSelected.length === 0 ? <span /> :
                <span> <div className="White-12px BubbleCounts"> {toolTopicsSelected.length} </div> </span>
              }
              <span className="mr-5" />
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
              {!toolTopicData ? '' : toolTopicData.map((topics) => {
                return <InputGroup >
                  <InputGroup.Prepend>
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" name="topics" checked={toolTopicsSelected.indexOf(topics) !== -1 ? "true" : ""} value={topics} onChange={this.changeFilter} />
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

export default TopicsFilter;