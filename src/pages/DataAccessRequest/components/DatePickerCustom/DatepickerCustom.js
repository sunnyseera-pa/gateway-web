import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { isEmpty, isNil, isNaN } from 'lodash';
import 'react-datepicker/dist/react-datepicker.css';

class DatePickerCustom extends React.Component {
	constructor(props) {
		super(props);
		let date = '';
		if (moment(this.props.value, 'DD/MM/YYYY').isValid()) {
			date = moment(this.props.value, 'DD/MM/YYYY').toDate();
		}
		this.state = {
			date
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	componentWillReceiveProps(nextProps) {
    if(this.props.value !== nextProps.value)
      this.setState({date: moment(nextProps.value, 'DD/MM/YYYY').toDate()});
  }

	handleChange(e) {
		let date = '';
		if (e) {
			date = e;
		}
		if (!isEmpty(date)) {
			moment(date).format('DD/MM/YYYY');
		}
		this.setState(
			{
				date
			},
			this.props.onChange.bind(null, date)
		);
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
				disabled={this.props.readOnly || false}
				name={this.props.name || 'startdate'}
				selected={this.state.date}
				dateFormat='dd/MM/yyyy'
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
	value: null,
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {}
};
export default DatePickerCustom;
