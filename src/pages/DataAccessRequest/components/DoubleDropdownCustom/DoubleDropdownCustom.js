import React, { useState } from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import SVGIcon from '../../../../images/SVGIcon';
import tickSVG from '../../../../images/tick.svg';

import './DoubleDropdowncustom.scss';

const DoubleDropdownCustom = ({ options, id }) => {
	const [closed, setClosed] = useState(true);
	const [selectedValue, setSelectedValue] = useState(null);
	const [tick, setTick] = useState(false);
	//add typeahead that can select the options from the dropdown menu?!

	const extra = options
		.map(a => a.extraOptions)
		.filter(b => b)
		.pop([]);

	const changingSelect = eventKey => {
		setSelectedValue(eventKey);
		setTick(true);
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
												{a.value === selectedValue && tick && <img src={tickSVG} width='20' style={{ float: 'right', marginTop: '3px' }} />}
											</Dropdown.Item>
										))}
									</Dropdown.Menu>
								</Dropdown>
							) : (
								<Dropdown.Item eventKey={b.value}>
									{b.value}
									{b.value === selectedValue && tick && <img src={tickSVG} width='20' style={{ float: 'right', marginTop: '3px' }} />}
								</Dropdown.Item>
							)
						)}
					</Dropdown.Menu>
				</Dropdown>
			</Nav>
		</Navbar>
	);
};

export default DoubleDropdownCustom;
