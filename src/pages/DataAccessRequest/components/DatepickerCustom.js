import React from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { isEmpty } from 'lodash'
import "react-datepicker/dist/react-datepicker.css";

class DatePickerCustom extends React.Component {
  constructor(props) {
    super(props);    
    this.state = {
      date: isEmpty(this.props.value) ? '' : moment(this.props.value).toDate(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  handleChange(e) {
    let date = '';
    if(e) {
      date = moment(e).toDate();
    }

    this.setState({
      date,
    }, this.props.onChange.bind(null, date));
  }

  handleFocus(e) {
    this.props.onFocus();
  }

  handleBlur(e) {
    this.props.onBlur(this.props.value);
  }

  render() {
    return (
        <DatePicker
            name={this.props.name || 'startdate'}
            dateFormat="dd/MM/yyyy"
            selected={this.state.date}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
      />
    );
  }
}

DatePickerCustom.defaultProps = {
  name: '',
  dateFormat: 'dd/MM/yyyy',
  selectDate: {},
  value: '',
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {}
};

export default DatePickerCustom;
