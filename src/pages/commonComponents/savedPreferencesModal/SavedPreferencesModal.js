import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Row, Container, Tab, Tabs } from 'react-bootstrap';
import './SavedPreferencesModal.scss';

var baseURL = require('../../commonComponents/BaseURL').getURL();

const SavedPreferencesModal = ({ show, onHide }) => {
	const [data, setData] = useState([]);
	const [showButtons, setShowButtons] = useState(false);

	useEffect(() => {
		axios.get(baseURL + '/api/v1/search-preferences').then(res => {
			setData(res.data.data);
			console.log(res.data.data);
		});
	}, []);

	const tabs = ['Datasets', 'Tools', 'Projects', 'Collections', 'Courses', 'Papers', 'People'];

	const datasetsTotal = data.filter(a => a.name).filter(a => a.filterCriteria.tab === 'Datasets').length;
	const toolsTotal = data.filter(a => a.name).filter(a => a.filterCriteria.tab === 'Tools').length;
	const projectTotal = data.filter(a => a.name).filter(a => a.filterCriteria.tab === 'Projects').length;
	const collectionsTotal = data.filter(a => a.name).filter(a => a.filterCriteria.tab === 'Collections').length;
	const coursesTotal = data.filter(a => a.name).filter(a => a.filterCriteria.tab === 'Courses').length;
	const papersTotal = data.filter(a => a.name).filter(a => a.filterCriteria.tab === 'Papers').length;
	const peopleTotal = data.filter(a => a.name).filter(a => a.filterCriteria.tab === 'People').length;

	return (
		<Modal show={show} onHide={onHide} dialogClassName='save-modal-preferences'>
			<Modal.Header closeButton>
				<Container>
					<Row>
						<h5 className='black-20-semibold'>Search preferences</h5>
					</Row>
					<Row>
						<p className='black-14'>
							View saved preferences across all resources on the Gateway. To create a new preference, apply your desired filters on the
							resources search results page and select 'save'.
						</p>
					</Row>
				</Container>
			</Modal.Header>

			<Tabs defaultActiveKey={'Datasets'} className='save-tabsBackground gray700-13'>
				{tabs.map(tabName => (
					<Tab
						eventKey={tabName}
						title={
							tabName +
							' ' +
							((tabName === 'Datasets' && '(' + datasetsTotal + ')') ||
								(tabName === 'Tools' && '(' + toolsTotal + ')') ||
								(tabName === 'Projects' && '(' + projectTotal + ')') ||
								(tabName === 'Collections' && '(' + collectionsTotal + ')') ||
								(tabName === 'Courses' && '(' + coursesTotal + ')') ||
								(tabName === 'Papers' && '(' + papersTotal + ')') ||
								(tabName === 'People' && '(' + peopleTotal + ')'))
						}>
						<Modal.Body style={{ 'max-height': 'calc(100vh - 450px)', 'overflow-y': 'auto', 'background-color': '#f6f7f8' }}>
							{data
								.filter(a => a.name)
								.filter(a => a.filterCriteria.tab === tabName)
								.map(a => (
									<div className='filters saved-card-click' onClick={() => setShowButtons(true)}>
										<h5 className='black-20-semibold'>{a.name}</h5>
										<p className='black-14'>
											Search term:{' '}
											{a.filterCriteria && a.filterCriteria.searchTerm === '' ? (
												'N/A'
											) : (
												<p className='black-14-bold'>{a.filterCriteria.searchTerm}</p>
											)}
										</p>
										<p> {a.filterCriteria && a.filterCriteria.tab}</p>

										{/*a.filterCriteria &&
								a.filterCriteria.sort &&
								a.filterCriteria.sort
									.map(a => (a === '' ? [{ highlighted: [''] }] : a))
									.filter(b => b)
									.map(b =>
										b.reduce(c => {
											return c;
										})
									)
									.map(a => a.highlighted)
									.map(([filter]) => (filter == undefined ? { filter: '' } : { filter }))
									.map(a => a.filter)*/}
									</div>
								))}
						</Modal.Body>
					</Tab>
				))}
			</Tabs>

			<Modal.Footer className='saved-preference-modal-footer'>
				<Button onClick={onHide} className='saved-preferences-cancel button-tertiary'>
					Cancel
				</Button>
				{showButtons && (
					<Row className='delete-view-buttons'>
						<Button variant='outline-success' className='saved delete-button button-teal'>
							Delete
						</Button>
						<Button>View matches</Button>
					</Row>
				)}
			</Modal.Footer>
		</Modal>
	);
};

export default SavedPreferencesModal;
/*
{data
							.filter(b => b.name)
							.map(b => (
								<a
									href={
										baseURL +
										'/search?search=' +
										b.filterCriteria.filterType +
										'=' +
										b.filterCriteria.filtersApplied +
										'&tab=' +
										b.filterCriteria.tab
									}>
									<Button>View matches</Button>
								</a>
							))} */

/*

	const filterData = data
		.filter(a => a.name)
		.map(a => a.filterCriteria.sort)
		.map(a => (a === '' ? [{ highlighted: [''] }] : a))
		.filter(b => b)
		.map(b =>
			b.reduce(c => {
				return c;
			})
		)
		.map(a => a.highlighted)
		.map(([filter]) => (filter == undefined ? { filter: '' } : { filter }));

	console.log(filterData);
 */

/*{data
					.filter(a => a.name)
					.map(a => (
						<div className='filters saved-card-click' onClick={() => setShowButtons(true)}>
							<h5 className='black-20-semibold'>{a.name}</h5>
							<p className='black-14'>
								Search term:{' '}
								{a.filterCriteria && a.filterCriteria.searchTerm === '' ? (
									'N/A'
								) : (
									<p className='black-14-bold'>{a.filterCriteria.searchTerm}</p>
								)}
							</p>
							{/*a.filterCriteria &&
								a.filterCriteria.sort &&
								a.filterCriteria.sort
									.map(a => (a === '' ? [{ highlighted: [''] }] : a))
									.filter(b => b)
									.map(b =>
										b.reduce(c => {
											return c;
										})
									)
									.map(a => a.highlighted)
									.map(([filter]) => (filter == undefined ? { filter: '' } : { filter }))
									.map(a => a.filter)}
									</div>
									))} */
