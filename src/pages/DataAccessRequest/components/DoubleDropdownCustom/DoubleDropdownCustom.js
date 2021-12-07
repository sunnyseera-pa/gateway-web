import React, { useState } from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import SVGIcon from '../../../../images/SVGIcon';
import './DoubleDropdowncustom.scss';

const DoubleDropdownCustom = ({ name, id, options, input, onChange, labelId, required }) => {
	const [closed, setClosed] = useState(true);
	const [selectedValue, setSelectedValue] = useState(null);

	const extra = options
		.map(a => a.extraOptions)
		.filter(b => b)
		.pop([]);

	const changingSelect = eventKey => {
		setSelectedValue(eventKey);
	};

	return (
		<Navbar collapseOnSelect expand='lg'>
			<Nav className='mr-auto'>
				<Dropdown onSelect={changingSelect}>
					<Dropdown.Toggle className='double-dropdown-input'>{selectedValue}</Dropdown.Toggle>

					<Dropdown.Menu>
						{options.map(a => (
							<Dropdown.Item eventKey={a.value}>
								{a.value}
								{a.value === 'Biomedical research' && (
									<Dropdown.Toggle className='nested-dropdown'>
										<SVGIcon
											onClick={closed ? setClosed(false) : setClosed}
											width='20px'
											height='20px'
											name='chevronbottom'
											fill={'#475da7'}
											className={closed ? 'chevron nest-dropdown-arrow' : 'chevron flip180 nest-dropdown-arrow'}
										/>
									</Dropdown.Toggle>
								)}
								{a.value === 'Biomedical research' && !closed && (
									<Dropdown.Menu className='nested-dropdown-menu'>
										{extra.map(a => (
											<Dropdown.Item eventKey={a.text}>{a.value}</Dropdown.Item>
										))}
									</Dropdown.Menu>
								)}
							</Dropdown.Item>
						))}
					</Dropdown.Menu>
				</Dropdown>
			</Nav>
		</Navbar>
	);
};

export default DoubleDropdownCustom;
