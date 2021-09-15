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
			{data.map(a => (
				<Container className='datause-card'>
					<Row>
						<p>{a.title}</p>
						<p>{a.org}</p>
					</Row>
					<Row>{a.keywordType}</Row>
					<Row>
						{a.keywords}
						{a.custodian}
					</Row>
					<Row>
						<Col>{a.comments.author}</Col>
						<Col>{a.comments.date}</Col>
					</Row>
					{a.comments.description}
				</Container>
			))}
		</Container>
	);
};

export default RelatedResources;
