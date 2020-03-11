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
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
// import MultiSelect from "@kenshooui/react-multi-select";

class ProgrammingLanguageFilter extends Component {
  // initialize our state
  state = {
    languages: [],
    languageSelected: [],
    combinedLanguages: [],
    checked: false
  };

    constructor(props) {
        super(props);
        this.state.combinedLanguages = props.combinedLanguages;
        this.state.items = props.combinedLanguages;
    }

    changeFilter = (e) => {
      this.setState({languageSelected : e.target.value});
      

      // this.setState(languages.push(languageSelected));
      console.log('here: ' + typeof(e.target.value));
      console.log('this ' + this.state.languageSelected);
      console.log('this is: ' + typeof(this.state.languageSelected));
      this.tryChange();

      // this.setState(languageSelected.push(e.target.value));

      // this.props.doUpdateCombinedLanguages(e.target.value);
      // this.props.doCallTypeString(e.target.value);
  }

  tryChange = (languages, languageSelected) => {
    console.log('languages are: ' + languages);
    // this.setState(languages.push(languageSelected));
  }

  
  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {

    const { combinedLanguages, languageSelected, selectedItems, items, checked } = this.state;
    console.log('help ' + items)

    return (
    <div className="FilterCard mt-2 Gray800-14px">
       {console.log('combinedLanguages are: ' + combinedLanguages)}

       {combinedLanguages.map((language) => {
            console.log('language: ' + language)
        })}
      
      <Row className="mt-2">
            <Col xs={1}></Col>
            <Col xs={9}>
                <span>Programming Language</span>
            </Col>
        </Row>
      
      <Row className="mt-3">
          <Col xs={2}></Col>
          <Col xs={10}>  

          {combinedLanguages.map((language) => {
              return <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox aria-label="Checkbox for following text input" checked={true} value={language} onChange={this.changeFilter} />
                    </InputGroup.Prepend>
                    <FormText className="ml-2 pb-4">{language}</FormText>
                   </InputGroup>
          })}
        



{/*               {combinedLanguages.map((language) => {
                    return  <Form.Check
                      type="radio"
                      label={language}
                      name="formLanguageRadios"
                      id="formLanguageRadios"
                      select multiple = {true}
                      // checked={this.props.languageSelected === {language} ? true: false}
                      value={language}
                      // value={languageSelected.push(language)}
                      onChange={this.changeFilter}
                    />  
                })} */}
                {console.log('language Selected: ' + languageSelected)}
            </Col>
        </Row> 
    </div>
    );
  }
}

export default ProgrammingLanguageFilter;