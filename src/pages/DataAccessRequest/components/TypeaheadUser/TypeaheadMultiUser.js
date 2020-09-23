import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { baseURL } from '../../../../configs/url.config';
import _ from 'lodash';


class TypaheadMultiUser extends React.Component {
  constructor(props) {
    super(props);  
    this.state = {
      value: props.selectedContributors || [],
      options: [],
      id: props.id,
      readOnly: props.readOnly || false
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
		if (this.props.selectedContributors !== prevProps.selectedContributors) {
      let { options } = this.state;
      let value = [...options].filter((user)  => { 
        return this.props.selectedContributors.includes(user.id);
      });
      this.setState({
        value
      });
		}
	}

  getData() {
    axios.get(`${baseURL}/api/v1/users`)
      .then((res) => {
        let {data: {data}} = res;
        if(!_.isEmpty(this.props.currentUserId.toString())) {
          data = data.filter((user) => { return user.id !== this.props.currentUserId });
        }
        let value = [...data].filter((user)  => { 
          return this.props.selectedContributors.includes(user.id);
        });
        debugger;
        this.setState({ options: data, value });
      })
      .catch(err => {
        console.error(err);
        alert('Failed to fetch users');
      });
  }

  handleChange(e) {
    this.props.onHandleContributorChange(e);
    let { options } = this.state;
    debugger;
    let value = [...options].filter((user)  => { 
      return e.some(contributor => contributor.id === user.id);
    });
    debugger;
    this.setState({
       value
    });
  }

  render() {
    return (
      <Typeahead
        id={'typeaheadMultiUser'}
        className={'addFormInputTypeAhead'}
        options={this.state.options}        
        onChange={e => this.handleChange(e)}
        selected={this.state.value}
        minLength={3}
        filterBy={['name']}
        multiple
        disabled={this.state.readOnly}
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

TypaheadMultiUser.defaultProps = {
  id: '',
  options: [],
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {}
};

export default TypaheadMultiUser;
