import React from 'react';
import _ from 'lodash';
import 'react-bootstrap-typeahead/css/Typeahead.css';

class TextareaInputCustom extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value,
			length: this.props.options[0],
		};
	}

	handleChange(e) {
		this.setState(
			{
				value: e.target.value,
			},
			this.props.onChange.bind(null, e.target.value)
		);
	}

	descriptionCount(e) {
		var input = e.target.value;
		document.getElementById('currentCount').innerHTML = e.target.value.length;
	}

	render() {
		return (
			<>
                <div className='wordCount'>
                    <span>{this.state.length} character limit</span> <span>(<span id='currentCount'>{this.state.value ? this.state.value.length : 0}</span>/{this.state.length})</span>
                </div>

				<textarea
					type='text'
					name={this.props.name}
					id={this.props.id}
					aria-labelledby={this.props.labelId}
					className={this.props.classes.input}
					placeholder={this.props.placeholder}
					value={this.state.value}
					required={this.props.required ? 'required' : undefined}
					onChange={this.handleChange.bind(this)}
					onBlur={this.props.onBlur.bind(null, this.state.value)}
				/>
			</>
		);
	}
}

TextareaInputCustom.defaultProps = {
	id: '',
	options: [],
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
};

export default TextareaInputCustom;
