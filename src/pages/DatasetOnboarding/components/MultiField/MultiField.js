import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Row, Col } from 'react-bootstrap';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import _ from 'lodash';

class MultiField extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.value || [{ name: '' }],
			options: [
				{ name: 'http://www.linktomypdf1.com/mypdf1.pdf' },
				{ name: 'http://www.linktomypdf2.com/mypdf2.pdf' },
				{ name: 'http://www.linktomypdf3.com/mypdf3.pdf' },
				{ name: 'http://www.linktomypdf4.com/mypdf4.pdf' },
			],
			readOnly: props.readOnly || false,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.value !== nextProps.value) this.setState({ value: nextProps.value });
	}

	handleAddShareholder = () => {
		this.setState({
			value: this.state.value.concat([{ name: '' }]),
		});
	};

	handleRemoveShareholder = idx => () => {
		let newValues = this.state.value.filter((s, sidx) => idx !== sidx);
		this.setState({ value: newValues }, this.props.onChange.bind(null, newValues));
	};

	handleChange(newValue = [], idx) {
		if (!_.isEmpty(newValue)) {
			const newValues = this.state.value.map((value, sidx) => {
				if (idx !== sidx) return value;
				return { ...value, name: newValue[0].name };
			});
			this.setState({ value: newValues }, this.props.onChange.bind(null, newValues));
		}
	}

	handleFocus(e) {
		this.props.onFocus();
	}
	handleBlur(e) {
		this.props.onBlur(this.props.value);
	}

	render() {
		return (
			<>
				{this.state.value.map((value, idx) => (
					<Row className='mt-2'>
						<Col sm={12} md={10}>
						<Typeahead
							id={`typeaheadDataset_${idx}`}
							className={`addFormInputTypeAhead ${_.isEmpty(this.state.value) ? 'emptyFormInputTypeAhead' : ''}`}
							options={this.state.options}
							ref={typeahead => (this._typeahead = typeahead)}
							onChange={e => this.handleChange(e, idx)}
							selected={[this.state.value[idx]]}
							filterBy={['name']}
							disabled={this.state.readOnly}
							labelKey={options => `${options.name}`}
							renderMenuItemChildren={(option, props) => (
								<div>
									<div className='datasetName'>{option.name}</div>
									<div className='datasetDescription'>{option.description}</div>
								</div>
							)}
						/>
                        </Col>

						{/* <input type="text"
                        //name={this.props.name}
                        //id={this.props.id}
                        className={this.props.classes.input}
                        value={this.state.value[idx].name}
                        disabled={this.props.disabled || this.props.readOnly}
                        onChange={this.handleChange(idx).bind(this)}
                        //onChange={this.handleShareholderNameChange(idx)}
                        onBlur={this.props.onBlur.bind(null, this.state.value)}
                        onFocus={this.props.onFocus.bind(this)}/>*/}
                        <Col sm={12} md={2}>
                            <button type='button' onClick={this.handleRemoveShareholder(idx)} className='plusMinusButton'>
                                -
                            </button>
                            <button type='button' onClick={this.handleAddShareholder} className='plusMinusButton'>
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
