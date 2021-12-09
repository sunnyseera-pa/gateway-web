import React, { useState } from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import SelectedOption from './SelectedOption';
import SVGIcon from '../../../../images/SVGIcon';
import tickSVG from '../../../../images/tick.svg';

import './DoubleDropdowncustom.scss';

const DoubleDropdownCustom = ({ options, id }) => {
	const [selectedValues, setSelectedValues] = useState([]);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [nestedDropdownOpen, setNestedDropdownOpen] = useState(false);

	const extra = options
		.map(a => a.extraOptions)
		.filter(b => b)
		.pop([]);

	const changingSelect = eventKey => {
		if (selectedValues.indexOf(eventKey) === -1) {
			setSelectedValues([...selectedValues, eventKey]);
		}
	};

	const removeSelectedOption = option => {
		setSelectedValues(selectedValues.filter(value => value !== option));
	};

	return (
		<Navbar collapseOnSelect expand='lg'>
			<Nav className='mr-auto'>
				<Dropdown onSelect={changingSelect} onToggle={() => setDropdownOpen(!dropdownOpen)} autoClose={false}>
					<Dropdown.Toggle className='double-dropdown-input' id={id}>
						<div className='selected-options-container'>
							{selectedValues.map(selectedValue => {
								return <SelectedOption text={selectedValue} close={() => removeSelectedOption(selectedValue)}></SelectedOption>;
							})}
						</div>
						<SVGIcon
							width='20px'
							height='20px'
							name='chevronbottom'
							fill={'#475da7'}
							className={!dropdownOpen ? 'chevron main-dropdown-arrow' : 'chevron flip180 main-dropdown-arrow'}
						/>
					</Dropdown.Toggle>
					<Dropdown.Menu className={'dropdown-menu'}>
						{options.map(b =>
							b.value === 'Biomedical research' ? (
								<Dropdown className='nested-dropdown-whole' onToggle={() => setNestedDropdownOpen(!nestedDropdownOpen)}>
									<Dropdown.Toggle className='nested-dropdown'>
										Biomedical research
										<SVGIcon
											width='20px'
											height='20px'
											name='chevronbottom'
											fill={'#475da7'}
											className={!nestedDropdownOpen ? 'chevron nest-dropdown-arrow' : 'chevron flip180 nest-dropdown-arrow'}
										/>
									</Dropdown.Toggle>

									<Dropdown.Menu className='nested-dropdown-menu'>
										{extra.map(a => (
											<Dropdown.Item eventKey={a.text} onSelect={changingSelect}>
												{a.value}
												{selectedValues.includes(a.value) && <img src={tickSVG} width='20' style={{ float: 'right', marginTop: '3px' }} />}
											</Dropdown.Item>
										))}
									</Dropdown.Menu>
								</Dropdown>
							) : (
								<Dropdown.Item eventKey={b.value}>
									{b.value}
									{selectedValues.includes(b.value) && <img src={tickSVG} width='20' style={{ float: 'right', marginTop: '3px' }} />}
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
