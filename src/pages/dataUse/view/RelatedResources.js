import React from 'react';
import { Row, Col, Container, Dropdown, DropdownButton } from 'react-bootstrap';

const RelatedResources = ({ data }) => {
	console.log(data);
	return (
		<Container>
			<Row>
				<Col>
					<input />
				</Col>
				<Col>
					<DropdownButton id='dropdown-basic-button' title='Dropdown button'>
						<Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
						<Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
						<Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
					</DropdownButton>
				</Col>
			</Row>

			<Row className='datause-card'>Cards</Row>
		</Container>
	);
};

export default RelatedResources;
