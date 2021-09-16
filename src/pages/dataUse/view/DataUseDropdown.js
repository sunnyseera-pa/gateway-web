import React from 'react';
import { Dropdown, Row, Col } from 'react-bootstrap';

const DataUseDropdown = () => (
	<Dropdown className='sorting-dropdown' alignRight>
		<Dropdown.Toggle variant='info' className='gray800-14 datause-dropdown'>
			Show all resources
		</Dropdown.Toggle>
		<Dropdown.Menu>
			<Row className='sort-dropdown-item sortingDropdown'>
				<Col xs={12} className='p-0'>
					<Dropdown.Item className='gray800-14'>Show all resources</Dropdown.Item>
					<Dropdown.Item className='gray800-14'>Show datasets</Dropdown.Item>
					<Dropdown.Item className='gray800-14'>Show tools</Dropdown.Item>
					<Dropdown.Item className='gray800-14'>Show data uses</Dropdown.Item>
				</Col>
			</Row>
		</Dropdown.Menu>
	</Dropdown>
);
export default DataUseDropdown;
