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
      // this.setState({languageSelected : e.target.value});
      // this.setState(languages.push(languageSelected));
     // this.setState(languageSelected.push(e.target.value));

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
      // this.props.doCallTypeString(e.target.value);
  }

  // handleSubmit = () => {

  // }

  
  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {

    const { combinedLanguages, languageSelected } = this.state;

    return (
    <div className="AdFilters mt-2 Gray800-14px">
       {console.log('combinedLanguages are: ' + combinedLanguages)}

       {combinedLanguages.map((language) => {
            console.log('language: ' + language)
        })}
    
      <Row className="mt-2 mb-5"  >
            <Col xs={1}></Col>
            <Col xs={9}>
                <span id="StickyTitle">Programming Language</span>
            </Col>
        </Row>
      
      <Row className="mt-3">
          <Col xs={2}></Col>
          <Col xs={10}>  
          {/* <Form onSubmit={this.handleSubmit}> */}

          {combinedLanguages.map((language) => {
              return <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" name="programmingLanguage" checked={languageSelected.indexOf(language)!=-1 ? "true": ""} value={language} onChange={this.changeFilter} />
                    </InputGroup.Prepend>
                    <FormText className="ml-2 pb-4">{language}</FormText>
                   </InputGroup>
          })}
        
        {/* </Form> */}

                {console.log('language Selected: ' + languageSelected)}
            </Col>
        </Row> 
    </div>
    );
  }
}

export default ProgrammingLanguageFilter;