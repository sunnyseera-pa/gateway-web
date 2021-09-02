import React from 'react';
import { Container, Row, Col, Button, Tab, Tabs } from 'react-bootstrap';
import Data from './MockData.json';
import Table from './DataUseTable';
import './DataUse.scss';

const DataUsePage = () => {
	const tabs = ['Active', 'Pending approval', 'Rejected', 'Archived'];
	return (
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
			<Row>
				<Tabs defaultActiveKey={'Active'} className='gray700-13'>
					{tabs.map(tabName => (
						<Tab eventKey={tabName} title={tabName}>
							Data
						</Tab>
					))}
				</Tabs>
			</Row>
			<Table data={Data} />
		</Container>
	);
};
export default DataUsePage;
