import React from 'react';
import { Container, Row, Col, Button, Tab, Tabs } from 'react-bootstrap';
import Data from './MockData.json';
import Table from './DataUseTable';
import './DataUse.scss';

//filter the data at this stage and then use it as props for each tab?

// map over the pending, active etc. data here and then send that data down via a prop

// for now have multiple tabs

// and then think about mapping over the tabs AND the status
const DataUsePage = () => {
	const tabs = ['Active', 'Pending approval', 'Rejected', 'Archived'];

	const active = Data.filter(a => a.status === 'active');
	console.log(active);

	const pending = Data.filter(a => a.status === 'pending approval');
	console.log(pending);

	const rejected = Data.filter(a => a.status === 'rejected');
	console.log(rejected);

	const archived = Data.filter(a => a.status === 'archived');
	console.log(archived);

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
							{tabName === 'Active' && <Table data={active} />}
							{tabName === 'Pending approval' && <Table data={pending} />}
							{tabName === 'Rejected' && <Table data={rejected} />}
							{tabName === 'Archived' && <Table data={archived} />}
						</Tab>
					))}
				</Tabs>
			</Row>
		</Container>
	);
};
export default DataUsePage;
