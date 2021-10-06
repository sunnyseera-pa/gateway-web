import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Tab, Tabs, Alert } from 'react-bootstrap';
import axios from 'axios';
import { isEmpty } from 'lodash';
import Table from './DataUseTable';
import Pagination from './DataUsePagination';
import Modal from './ArchiveModal';
import './DataUse.scss';
import SVGIcon from '../../images/SVGIcon';
var baseURL = require('../commonComponents/BaseURL').getURL();

const DataUsePage = React.forwardRef(({ userState, onClickDataUseUpload, team }, ref) => {
	React.useImperativeHandle(ref, () => ({
		showSubmissionAlert,
	}));

	const [row, setRow] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage] = useState(25);
	const [showModal, setShowModal] = useState(false);
	const [showUnarchiveModal, setShowUnarchiveModal] = useState(false);
	const [alert, setAlert] = useState('');

	useEffect(() => {
		axios.get(baseURL + '/api/v2/data-use-registers?team=' + team).then(res => {
			setRow(res.data.data);
			console.log(res.data.data);
		});
	}, [team, alert]);

	const ShowArchiveModal = () => {
		setShowModal(true);
	};

	const HideArchiveModal = () => {
		setShowModal(false);
	};

	const ShowUnArchiveModal = () => {
		setShowUnarchiveModal(true);
	};

	const HideUnArchiveModal = () => {
		setShowUnarchiveModal(false);
	};

	const showSubmissionAlert = () => {
		setAlert('Submitted! The Gateway team will process your uploaded data uses and let you know when they go live.');
		setTimeout(() => {
			setAlert('');
		}, 5000);
	};

	const indexOfLastRow = currentPage * rowsPerPage;
	const indexOfFirstRow = indexOfLastRow - rowsPerPage;

	const tabs = ['Active', 'Pending approval', 'Rejected', 'Archived'];

	const active = row.filter(active => active.activeflag === 'active');
	const pending = row.filter(pending => pending.activeflag === 'inReview');
	const rejected = row.filter(rejected => rejected.activeflag === 'rejected');
	const archived = row.filter(archived => archived.activeflag === 'archived');

	const currentActive = active.slice(indexOfFirstRow, indexOfLastRow);
	const currentPending = pending.slice(indexOfFirstRow, indexOfLastRow);
	const currentRejected = rejected.slice(indexOfFirstRow, indexOfLastRow);
	const currentArchived = archived.slice(indexOfFirstRow, indexOfLastRow);

	const paginate = pageNumber => setCurrentPage(pageNumber);
	const role = userState.map(roleType => roleType.role).toString();
	const custodianAcc = userState.map(groups => groups.teams.length > 0);

	return (
		<Container>
			{!isEmpty(alert) && (
				<Alert variant={'success'} className='main-alert'>
					<SVGIcon name='check' width={24} height={24} fill={'#2C8267'} /> {alert}
				</Alert>
			)}
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
					<Button className='datause-button' onClick={onClickDataUseUpload}>
						+ Upload data uses
					</Button>
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
						{(role === 'User' || custodianAcc) && tabName === 'Active' && (
							<Table data={currentActive} active={true} userState={role} showModal={ShowArchiveModal} />
						)}
						{(role === 'Admin' || custodianAcc) && tabName === 'Pending approval' && <Table data={currentPending} pending={true} />}
						{custodianAcc && tabName === 'Rejected' && <Table data={currentRejected} />}
						{custodianAcc && tabName === 'Archived' && (
							<Table data={currentArchived} archived={true} showUnarchiveModal={ShowUnArchiveModal} />
						)}

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
			{showModal && <Modal archive={true} show={ShowArchiveModal} hide={HideArchiveModal} />}
			{showUnarchiveModal && <Modal archive={false} show={ShowUnArchiveModal} hide={HideUnArchiveModal} />}
		</Container>
	);
});
export default DataUsePage;
