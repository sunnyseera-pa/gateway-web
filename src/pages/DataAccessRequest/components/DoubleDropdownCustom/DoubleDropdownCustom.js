import React, { useState } from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import SVGIcon from '../../../../images/SVGIcon';
import './DoubleDropdowncustom.scss';

const DoubleDropdownCustom = ({ name, id, onChange, labelId, required, ...props }) => {
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
	return (
		<Navbar collapseOnSelect expand='lg'>
			<Nav className='mr-auto'>
				<Dropdown>
					<Dropdown.Toggle className='double-dropdown-input'>
						<input
							name={name}
							id={id}
							aria-labelledby={labelId}
							//className={props.classes.input}
							required={required ? 'required' : undefined}
							type='text'
							onChange={e => handleChange(e)}
							//onBlur={handleBlur}
							//onFocus={handleFocus}
							data-test-id='darContributorTextInput'></input>
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
