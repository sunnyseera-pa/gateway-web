import React, { useState } from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import SVGIcon from '../../../../images/SVGIcon';
import './DoubleDropdowncustom.scss';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import TypeaheadCustom from '../TypeaheadCustom/TypeaheadCustom';

const DoubleDropdownCustom = ({ name, id, options, onChange, labelId, required, ...props }) => {
	const [closed, setClosed] = useState(true);
	const [value, setValue] = useState('');

	const handleFocus = e => {
		this.props.onFocus();
	};

	const handleBlur = e => {
		this.props.onBlur(this.props.value);
	};

	const handleChange = e => {
		setValue(e.target.value);

		onChange.bind(null, e.target.value);
	};

	console.log(options);

	const schema = [
		{
			text: 'Age category research',
			value: 'Age category research',
		},
		{
			text: 'Ancestry research',
			value: 'Ancestry research',
		},
		{
			text: 'Biomedical research',
			value: 'Biomedical research',
			extraOptions: [
				{ text: 'Disease category research', value: 'Disease category research' },
				{ text: 'Drug development research', value: 'Drug development research' },
				{ text: 'Genetic research', value: 'Genetic research' },
			],
		},
		{
			text: 'Gender category research',
			value: 'Gender category research',
		},
		{
			text: 'Method development',
			value: 'Method development',
		},
		{
			text: 'Population research',
			value: 'Population research',
		},
		{
			text: 'Research control',
			value: 'Research control',
		},
	];

	return (
		<Navbar collapseOnSelect expand='lg'>
			<Nav className='mr-auto'>
				<Dropdown>
					<Dropdown.Toggle className='double-dropdown-input'>
						<Typeahead
							name={name}
							id={id}
							multiple
							aria-labelledby={labelId}
							//className={props.classes.input}
							required={required ? 'required' : undefined}
							type='text'
							onChange={e => handleChange(e)}
							//onBlur={handleBlur}
							//onFocus={handleFocus}
							options={schema}
							labelKey='value'
							//selected={this.props.value}
							//data-test-id='darContributorTextInput'
						/>
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item>Age category research</Dropdown.Item>
						<Dropdown.Item>Ancestry research</Dropdown.Item>
						<Dropdown className='nested-dropdown-whole'>
							<Dropdown.Toggle className='nested-dropdown'>
								Biomedical research
								<SVGIcon
									width='20px'
									height='20px'
									name='chevronbottom'
									fill={'#475da7'}
									className={closed ? 'chevron nest-dropdown-arrow' : 'chevron flip180 nest-dropdown-arrow'}
								/>
							</Dropdown.Toggle>

							<Dropdown.Menu className='nested-dropdown-menu'>
								<Dropdown.Item>Disease category research</Dropdown.Item>
								<Dropdown.Item>Gentic research</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Dropdown.Item>Gender category research</Dropdown.Item>
						<Dropdown.Item>Method development</Dropdown.Item>
						<Dropdown.Item>Population research</Dropdown.Item>
						<Dropdown.Item>Research control</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Nav>
		</Navbar>
	);
};

export default DoubleDropdownCustom;
