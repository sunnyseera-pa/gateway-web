import React from 'react';
import { Row, Col } from 'react-bootstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import _ from 'lodash';

class MultiField extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value || [''],
			readOnly: props.readOnly || false,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.value !== nextProps.value) this.setState({ value: nextProps.value });
	}

	handleAddShareholder = () => {
		this.setState({
			value: this.state.value.concat(['']),
		});
	};

	handleRemoveShareholder = idx => () => {
		let newValues = this.state.value.filter((s, sidx) => idx !== sidx);
		this.setState({ value: newValues }, this.props.onChange.bind(null, newValues));
	};

	handleChange(newValue, idx) {
		//if (!_.isEmpty(newValue)) {
		const newValues = this.state.value.map((value, sidx) => {
			if (idx !== sidx) return value;
			return newValue;
		});
		this.setState({ value: newValues }, this.props.onChange.bind(null, newValues));
		//}
	}

	handleFocus() {
		this.props.onFocus();
	}
	handleBlur() {
		this.props.onBlur(this.props.value);
	}

	render() {
		return (
			<>
				{this.state.value.map((value, idx) => (
					<Row className='mt-2'>
						<Col sm={12} md={10}>
							<input
								type='text'
								className={this.props.classes.input}
								value={value}
								disabled={this.props.disabled || this.props.readOnly}
								onChange={e => this.handleChange(e.target.value, idx)}
								onBlur={this.props.onBlur.bind(null, value)}
								onFocus={this.props.onFocus.bind(this)}
							/>
						</Col>

						<Col sm={12} md={2}>
							<button
								type='button'
								disabled={this.state.value.length < 2}
								onClick={this.handleRemoveShareholder(idx)}
								className='plusMinusButton'>
								-
							</button>
							<button
								type='button'
								disabled={this.state.value.length - 1 !== idx}
								onClick={this.handleAddShareholder}
								className='plusMinusButton'>
								+
							</button>
						</Col>
					</Row>
				))}
			</>
		);
	}
}

MultiField.defaultProps = {
	id: '',
	options: [],
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
};

export default MultiField;
