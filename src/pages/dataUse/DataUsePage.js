import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Tab, Tabs } from 'react-bootstrap';
import Data from './MockData.json';
import Table from './DataUseTable';
import Pagination from './DataUsePagination';
import './DataUse.scss';

const DataUsePage = ({ userState }) => {
	const [row, setRow] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(2);

	useEffect(() => {
		setRow(Data);
	}, []);

	const indexOfLastRow = currentPage * rowsPerPage;
	const indexOfFirstRow = indexOfLastRow - rowsPerPage;

	const tabs = ['Active', 'Pending approval', 'Rejected', 'Archived'];

	const active = Data.filter(active => active.status === 'active');
	const pending = Data.filter(pending => pending.status === 'pending approval');
	const rejected = Data.filter(rejected => rejected.status === 'rejected');
	const archived = Data.filter(archived => archived.status === 'archived');

	const currentActive = active.slice(indexOfFirstRow, indexOfLastRow);
	const currentPending = pending.slice(indexOfFirstRow, indexOfLastRow);
	const currentRejected = rejected.slice(indexOfFirstRow, indexOfLastRow);
	const currentArchived = archived.slice(indexOfFirstRow, indexOfLastRow);

	const paginate = pageNumber => setCurrentPage(pageNumber);
	const role = userState.map(roleType => roleType.role).toString();
	const custodianAcc = userState.map(groups => groups.teams.length > 0);

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
			<Tabs defaultActiveKey={role === 'User' || custodianAcc ? 'Active' : 'Pending approval'} className='gray700-13 data-use-tabs'>
				{tabs.map(tabName => (
					<Tab
						eventKey={tabName}
						title={
							((role === 'User' || custodianAcc) && tabName === 'Active' && tabName + ' (' + active.length + ')') ||
							((role === 'Admin' || custodianAcc) && tabName === 'Pending approval' && tabName + ' (' + pending.length + ')') ||
							(custodianAcc && tabName === 'Rejected' && tabName + ' (' + rejected.length + ')') ||
							(custodianAcc && tabName === 'Archived' && tabName + ' (' + archived.length + ')')
						}>
						{(role === 'User' || custodianAcc) && tabName === 'Active' && <Table data={currentActive} active={true} userState={role} />}
						{(role === 'Admin' || custodianAcc) && tabName === 'Pending approval' && <Table data={currentPending} pending={true} />}
						{custodianAcc && tabName === 'Rejected' && <Table data={currentRejected} />}
						{custodianAcc && tabName === 'Archived' && <Table data={currentArchived} archived={true} />}
						<Pagination
							rowsPerPage={rowsPerPage}
							totalRows={
								tabName === 'Active'
									? active.length
									: tabName === 'Pending approval'
									? pending.length
									: tabName === 'Rejected'
									? rejected.length
									: tabName === 'Archived'
									? archived.length
									: row.length
							}
							paginate={paginate}
						/>
					</Tab>
				))}
			</Tabs>
		</Container>
	);
};
export default DataUsePage;
