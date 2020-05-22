import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormText from 'react-bootstrap/FormText';

class TopicsFilter extends Component {
  state = {
    topicsSelected: [],
    combinedTopic: []
  };

  constructor(props) {
    super(props);
    this.state.combinedTopic = props.combinedToolTopic;
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
    this.props.doUpdateCombinedTopics(topicsSelected);
  }

  clearFilter = () => {
    const topicsSelected = [];
    this.setState({ topicsSelected: topicsSelected })
    this.props.doUpdateCombinedTopics(topicsSelected);
  }

  render() {

    const { combinedTopic, topicsSelected } = this.state;

    if (!combinedTopic || combinedTopic.length === 0) {
      return (<></>);
    }

    return (
      <div>
        <div className="FilterCard mt-2">
          <Row className="mt-2"  >

            <Col xs={7} className="ml-3">
              <span className="Gray800-14px-bold">Topics</span>
              {topicsSelected.length === 0 ? <span /> :
                <span> <div className="White-12px BubbleCounts"> {topicsSelected.length} </div> </span>
              }
              <span className="mr-5" />
            </Col>
            <Col xs={3}>
              {this.state.topicsSelected.length > 0 ?
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
              {!combinedTopic ? '' : combinedTopic.map((topics) => {
                return <InputGroup >
                  <InputGroup.Prepend>
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" name="topics" checked={topicsSelected.indexOf(topics) !== -1 ? "true" : ""} value={topics} onChange={this.changeFilter} />
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