import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { baseURL } from '../../../configs/url.config';


class TypeaheadDataset extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      value: [],
      options: [],
      id: props.id
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get(`${baseURL}/api/v1/users`)
      .then((res) => {
        let id;
        let value = [];
        let {data: {data}} = res;
        if(typeof this.props.value !== 'undefined') {
          ({id} = this.props.value);
          value = [...data].filter(d => d.id === id) ;
        }
        this.setState({ options: data, value });
      })
      .catch(err => {
        alert('Failed to fetch users');
      });
}

  handleChange(e) {
    debugger;
    this.props.onHandleDataSetChange(e);
    console.log(e);
    //let user = '';
    //if(e.length > 0) 
      //[user] = e;
  
    //this.setState({
      //value: (user ? [user] : []),
    //}, this.props.onChange.bind(null, user));
  }

  render() {
    return (

      <Typeahead
        id={'typeaheadDataset'}
        className={'addFormInputTypeAhead'}
        options={this.state.options}        
        onChange={e => {this.handleChange(e)}}
        selected={this.state.value}
        minLength={3}
        filterBy={['name']}
        multiple
        defaultSelected={this.state.value}
        labelKey={options => `${options.name}`}
        renderMenuItemChildren={(option, props) => (
          <div className="userOption">
            <div>{option.name}</div>
            <div><span>{option.bio || 'Institution not set'}</span> <span>{option.orcid || 'No ORCID'}</span></div>
          </div>
        )}
      />
    );
  }
}

TypeaheadDataset.defaultProps = {
  id: '',
  options: [],
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {}
};

export default TypeaheadDataset;
