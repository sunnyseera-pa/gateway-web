import React, { useState } from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import SVGIcon from '../../../../images/SVGIcon';
import './DoubleDropdowncustom.scss';

const DoubleDropdownCustom = ({ options, id }) => {
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
					<Dropdown.Toggle className='double-dropdown-input' id={id}>
						{selectedValue}
					</Dropdown.Toggle>
					<Dropdown.Menu>
						{options.map(b =>
							b.value === 'Biomedical research' ? (
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
										{extra.map(a => (
											<Dropdown.Item eventKey={a.text} onSelect={changingSelect}>
												{a.value}
											</Dropdown.Item>
										))}
									</Dropdown.Menu>
								</Dropdown>
							) : (
								<Dropdown.Item eventKey={b.value}>{b.value} </Dropdown.Item>
							)
						)}
					</Dropdown.Menu>
				</Dropdown>
			</Nav>
		</Navbar>
	);
};

export default DoubleDropdownCustom;
