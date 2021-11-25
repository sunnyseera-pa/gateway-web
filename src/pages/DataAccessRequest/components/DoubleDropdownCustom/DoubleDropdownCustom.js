import React, { useState } from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import SVGIcon from '../../../../images/SVGIcon';
import './DoubleDropdowncustom.scss';

const DoubleDropdownCustom = () => {
	const [closed, setClosed] = useState(true);
	return (
		<Navbar collapseOnSelect expand='lg'>
			<Nav className='mr-auto'>
				<Dropdown>
					<Dropdown.Toggle className='double-dropdown-input'>
						<input />
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
