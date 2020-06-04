import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

class TypaheadCustom extends React.Component {
  constructor(props) {
    super(props);    
    // console.log(props);
    this.state = {
      value: this.props.value || '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      value: e,
    }, this.props.onChange.bind(null, e));
  }

  render() {
    return (
      <Typeahead
        id={'test'}
        multiple
        options={this.props.options ? this.props.options : ['Test', 'Test1']}        
        onChange={this.handleChange}
        selected={this.props.value}
      />
    );
  }
}

TypaheadCustom.defaultProps = {
  id: '',
  options: [],
  onChange: () => {},
};

export default TypaheadCustom;
