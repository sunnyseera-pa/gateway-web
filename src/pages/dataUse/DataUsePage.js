import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './DataUse.scss';

const DataUsePage = () => (
	<Container>
		<Row className='datause-card'>
			<Col md={10}>
				<Row>
					<p className='black-20-semibold'>Data uses</p>
				</Row>
				<Row>
					<p className='soft-black-14 datause-para'>Manage your data use register by uploading or editing data uses.</p>
				</Row>
			</Col>
			<Col md={2} className='datause-button-grid'>
				<Button className='datause-button'>+ Upload data uses</Button>
			</Col>
		</Row>
		<Row className='datause-tabs'>Tabs</Row>
	</Container>
);
export default DataUsePage;
