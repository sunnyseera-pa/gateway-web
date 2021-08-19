import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Row, Container, Tab, Tabs } from 'react-bootstrap';
import './SavedPreferencesModal.scss';

var baseURL = require('../../commonComponents/BaseURL').getURL();

const SavedPreferencesModal = ({ show, onHide }) => {
	const [data, setData] = useState([]);
	const [showButtons, setShowButtons] = useState(false);

	useEffect(() => {
		axios
			.get(baseURL + '/api/v1/search-preferences')
			.then(res => {
				setData(res.data.data);
			})
			.catch(err => console.log(err));
	}, []);

	const filterData = data
		.filter(a => a.name)
		.map(a => a.filterCriteria.sort)
		.map(a => a)
		.filter(b => b.length > 0)
		.map(b =>
			b.reduce(c => {
				return c;
			})
		)
		.map(a => a.highlighted)
		.map(([filter]) => (filter == undefined ? { filter: '' } : { filter }));

	console.log(filterData);

	return (
		<Modal show={show} onHide={onHide} dialogClassName='save-modal-preferences '>
			<Modal.Header closeButton>
				<Container>
					{' '}
					<Row>
						<h5 className='black-20-semibold'>Search preferences</h5>
					</Row>
					<Row>
						<p className='black-14'>
							View saved preferences across all resources on the Gateway. To create a new preference, apply your desired filters on the
							resources search results page and select 'save'.
						</p>
					</Row>
					<Row>
						<div className='searchTabsHolder save-searchTabsHolder'>
							<Tabs className='save-tabsBackground gray700-13' activeKey='' onSelect=''>
								<Tab eventKey='Datasets' title='Datasets' className='saved-tab' />
								<Tab eventKey='Tools' title='Tools' className='saved-tab' />
								<Tab eventKey='Projects' title='Projects' className='saved-tab' />
								<Tab eventKey='Collections' title='Collections' className='saved-tab' />
								<Tab eventKey='Courses' title='Courses' className='saved-tab' />
								<Tab eventKey='Papers' title='Papers ' className='saved-tab' />
								<Tab eventKey='People' title='People' className='saved-tab' />
							</Tabs>
						</div>
					</Row>
				</Container>
			</Modal.Header>
			<Modal.Body style={{ 'max-height': 'calc(100vh - 450px)', 'overflow-y': 'auto', 'background-color': '#f6f7f8' }}>
				{data
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

							<p className='black-14'>
								Filters:{' '}
								{a.filterCriteria.sort
									.map(a => a)
									.filter(b => b.length > 0)
									.map(b =>
										b.reduce(c => {
											return c;
										})
									)
									.map(a => a.highlighted)
									.map(([filter]) => (filter == undefined ? { filter: '' } : { filter }))
									.map(a => a.filter)}
							</p>
						</div>
					))}
			</Modal.Body>
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
