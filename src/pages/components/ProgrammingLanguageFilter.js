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
// import { Sticky } from 'semantic-ui-react';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
// import MultiSelect from "@kenshooui/react-multi-select";

class ProgrammingLanguageFilter extends Component {
  // initialize our state
  state = {
    // languages: [],
    languageSelected: [],
    combinedLanguages: []
  };

    constructor(props) {
        super(props);
        this.state.combinedLanguages = props.combinedLanguages;
        this.state.languageSelected = props.languageSelected;
    }

    changeFilter = (e) => {

      // current array of options
      const languageSelected = this.state.languageSelected
      let index

      // check if the check box is checked or unchecked
      if (e.target.checked) {
        // add the numerical value of the checkbox to options array
        languageSelected.push(e.target.value)
      } else {
        // or remove the value from the unchecked checkbox from the array
        index = languageSelected.indexOf(e.target.value)
        languageSelected.splice(index, 1)
      }

      // update the state with the new array of options
      this.setState({ languageSelected: languageSelected })
      
      console.log('languageSelected = ' + this.state.languageSelected);
      this.props.doUpdateCombinedLanguages(languageSelected);
  }

  clearFilter = () => {
    const languageSelected = [];
    this.setState({languageSelected: languageSelected})
    console.log('clear languages are: ' + languageSelected);
    this.props.doUpdateCombinedLanguages(languageSelected);
}

  render() {

    const { combinedLanguages, languageSelected } = this.state;

    return (
    <div>
     <div className="FilterCard mt-2">
        <Row className="mt-2"  >
            {/* <Col xs={1}></Col> */}
            <Col xs={7} className="ml-3">
                <span className="Gray800-14px-bold">Programming</span>
                <span> <div className="White-12px BubbleCounts"> {combinedLanguages.length} </div> </span>
                {/* <span>
                  <button className="ClearButtons Purple-14px pl-5" onClick={() => this.clearFilter()}>
                    Clear
                  </button>
                </span> */}
                <br />
                <span>Language</span>
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
       {console.log('combinedLanguages are: ' + combinedLanguages)}

       {combinedLanguages.map((language) => {
            console.log('language: ' + language)
        })}
    
      {/* <Row className="mt-2 mb-2"  >
            <Col xs={2}></Col>
            <Col xs={10}>
                <span id="StickyTitle" className="Gray800-14px-bold">Programming Language</span>
            </Col>
        </Row> */}
      
      <Row className="mb-3">
          <Col xs={1}></Col>
          <Col xs={11} className="ml-4">  
          {/* <Form onSubmit={this.handleSubmit}> */}

          {combinedLanguages.map((language) => {
              return <InputGroup >
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" name="programmingLanguage" checked={languageSelected.indexOf(language)!=-1 ? "true": ""} value={language} onChange={this.changeFilter} />
                    </InputGroup.Prepend>
                    <FormText className="Gray800-14px ml-4 mt-2 mb-2 pb-1">{language}</FormText>
                   </InputGroup>
          })}
        
        {/* </Form> */}

                {console.log('language Selected: ' + languageSelected)}
            </Col>
        </Row> 
    </div>
    </div>
    );
  }
}

export default ProgrammingLanguageFilter;