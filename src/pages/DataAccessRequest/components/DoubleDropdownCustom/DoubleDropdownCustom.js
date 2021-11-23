import React from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import './DoubleDropdowncustom.scss';

const DoubleDropdownCustom = () => (
	<Navbar collapseOnSelect expand='lg'>
		<Nav className='mr-auto'>
			<Dropdown>
				<Dropdown.Toggle variant='success' id='dropdown-basic'>
					Dropdown Button
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item href='#/action-1'>Age category research</Dropdown.Item>
					<Dropdown.Item href='#/action-2'>Ancestry research</Dropdown.Item>
					<Dropdown>
						<Dropdown.Toggle variant='success' id='dropdown-basic'>
							Biomedical research
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item href='#/action-5'>Disease category research</Dropdown.Item>
							<Dropdown.Item href='#/action-6'>Gentic research</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown.Item href='#/action-3'>Gender category research</Dropdown.Item>
					<Dropdown.Item href='#/action-4'>Method development</Dropdown.Item>
					<Dropdown.Item href='#/action-7'>Population research</Dropdown.Item>
					<Dropdown.Item href='#/action-8'>Research control</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Nav>
	</Navbar>
);

export default DoubleDropdownCustom;
