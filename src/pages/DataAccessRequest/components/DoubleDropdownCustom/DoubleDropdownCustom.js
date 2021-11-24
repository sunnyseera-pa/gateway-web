import React from 'react';
import { Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './DoubleDropdowncustom.scss';

const DoubleDropdownCustom = () => (
	<Navbar collapseOnSelect expand='lg'>
		<Nav className='mr-auto'>
			<Dropdown>
				<Dropdown.Toggle>
					<input />
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item>Age category research</Dropdown.Item>
					<Dropdown.Item>Ancestry research</Dropdown.Item>
					<Dropdown>
						<Dropdown.Toggle variant='success' id='dropdown-basic'>
							Biomedical research
						</Dropdown.Toggle>

						<Dropdown.Menu>
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

export default DoubleDropdownCustom;
