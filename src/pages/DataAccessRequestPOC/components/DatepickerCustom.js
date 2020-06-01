import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class DatePickerCustom extends React.Component {
  constructor(props) {
    super(props);    
    // console.log(props);
    this.state = {
      date: this.props.value || '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // console.log(e);
    this.setState({
      date: e,
    }, this.props.onChange.bind(null, e));
  }

  render() {
    return (
        <DatePicker
            name={this.props.name || 'startdate'}
            dateFormat="dd/MM/yyyy"
            selected={this.state.date}
            onChange={this.handleChange}
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
};

export default DatePickerCustom;
