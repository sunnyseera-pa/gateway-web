import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Tab, Tabs, Alert } from 'react-bootstrap';
import axios from 'axios';
import { isEmpty } from 'lodash';
import Table from './DataUseTable';
import Pagination from './DataUsePagination';
import ArchiveModal from './ArchiveModal';
import './DataUse.scss';
import SVGIcon from '../../images/SVGIcon';
var baseURL = require('../commonComponents/BaseURL').getURL();

const DataUsePage = React.forwardRef(({ onClickDataUseUpload, team }, ref) => {
	React.useImperativeHandle(ref, () => ({
		showAlert,
	}));

	const [row, setRow] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage] = useState(13);
	const [showModal, setShowModal] = useState(false);
	const [showUnarchiveModal, setShowUnarchiveModal] = useState(false);
	const [alert, setAlert] = useState('');
	const [dataUseId, setDataUseId] = useState(-1);

	useEffect(() => {
		axios.get(baseURL + '/api/v2/data-use-registers?team=' + team).then(res => {
			let dataUses = res.data.data;
			dataUses.sort((dataUseOne, dataUseTwo) => Date.parse(dataUseTwo.lastActivity) - Date.parse(dataUseOne.lastActivity));
			setRow(dataUses);
		});
	}, [team, alert]);

	const ShowArchiveModal = dataUseId => {
		setShowModal(true);
		setDataUseId(dataUseId);
	};

	const HideArchiveModal = () => {
		setShowModal(false);
		setDataUseId(-1);
	};

	const ShowUnArchiveModal = dataUseId => {
		setShowUnarchiveModal(true);
		setDataUseId(dataUseId);
	};

	const HideUnArchiveModal = () => {
		setShowUnarchiveModal(false);
		setDataUseId(-1);
	};

	const showAlert = message => {
		setAlert(message);
		setTimeout(() => {
			setAlert('');
		}, 5000);
	};

	const updataDataUseStatus = newStatus => {
		axios.patch(baseURL + '/api/v2/data-use-registers/' + dataUseId, { activeflag: newStatus }).then(res => {
			if (newStatus === 'archived') {
				showAlert('Your data use have been successfully archived.');
				setShowModal(false);
			} else {
				showAlert('Your data use have been successfully unarchived.');
				setShowUnarchiveModal(false);
			}
		});
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

	return (
		<Container>
			<Row>
				<Col className='pl-0 pr-0'>
					{!isEmpty(alert) && (
						<Alert variant={'success'} className='main-alert'>
							<SVGIcon name='check' width={24} height={24} fill={'#2C8267'} /> {alert}
						</Alert>
					)}
				</Col>
			</Row>
			<Row className='datause-card mt-1'>
				<Col md={10}>
					<Row>
						<p className='black-20-semibold'>Data uses</p>
					</Row>
					<Row>
						<p className='soft-black-14 datause-para'>Manage your data use register by uploading or editing data uses.</p>
					</Row>
				</Col>
				{team !== 'user' && (
					<Col md={2} className='datause-button-grid'>
						<Button className='datause-button' onClick={onClickDataUseUpload}>
							+ Upload data uses
						</Button>
					</Col>
				)}
			</Row>

			<Tabs
				defaultActiveKey={team === 'user' || (team !== 'user' && team !== 'admin') ? 'Active' : 'Pending approval'}
				className='gray700-13 data-use-tabs'>
				{tabs.map(tabName => (
					<Tab
						eventKey={tabName}
						title={
							((team === 'user' || (team !== 'user' && team !== 'admin')) &&
								tabName === 'Active' &&
								tabName + ' (' + active.length + ')') ||
							((team === 'admin' || (team !== 'user' && team !== 'admin')) &&
								tabName === 'Pending approval' &&
								tabName + ' (' + pending.length + ')') ||
							(team !== 'user' && team !== 'admin' && tabName === 'Rejected' && tabName + ' (' + rejected.length + ')') ||
							(team !== 'user' && team !== 'admin' && tabName === 'Archived' && tabName + ' (' + archived.length + ')')
						}>
						{(team === 'user' || (team !== 'user' && team !== 'admin')) && tabName === 'Active' && (
							<Table data={currentActive} active={true} team={team} showArchiveModal={ShowArchiveModal} />
						)}
						{(team === 'admin' || (team !== 'user' && team !== 'admin')) && tabName === 'Pending approval' && (
							<Table team={team} data={currentPending} pending={true} />
						)}
						{team !== 'user' && team !== 'admin' && tabName === 'Rejected' && <Table team={team} data={currentRejected} />}
						{team !== 'user' && team !== 'admin' && tabName === 'Archived' && (
							<Table team={team} data={currentArchived} archived={true} showUnarchiveModal={ShowUnArchiveModal} />
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
			{showModal && <ArchiveModal archive={true} onConfirm={updataDataUseStatus} show={ShowArchiveModal} hide={HideArchiveModal} />}
			{showUnarchiveModal && (
				<ArchiveModal archive={false} onConfirm={updataDataUseStatus} show={ShowUnArchiveModal} hide={HideUnArchiveModal} />
			)}
		</Container>
	);
});
export default DataUsePage;
