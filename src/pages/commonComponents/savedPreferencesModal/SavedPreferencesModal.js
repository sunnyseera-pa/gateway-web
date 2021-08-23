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

	return (
		<Modal show={show} onHide={onHide} dialogClassName='save-modal-preferences '>
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

			<Tabs defaultActiveKey={1} className='save-tabsBackground gray700-13'>
				{tabs.map((a, index) => (
					<Tab eventKey={a} title={a}>
						data
					</Tab>
				))}
			</Tabs>

			<Tabs defaultActiveKey={1} className='save-tabsBackground gray700-13'>
				<Tab eventKey={1} title='Datasets'>
					<Modal.Body style={{ 'max-height': 'calc(100vh - 450px)', 'overflow-y': 'auto', 'background-color': '#f6f7f8' }}>
						{data
							.filter(a => a.name)
							.filter(a => a.filterCriteria.tab === 'Datasets')
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
				<Tab eventKey={2} title='Tools'>
					<Modal.Body style={{ 'max-height': 'calc(100vh - 450px)', 'overflow-y': 'auto', 'background-color': '#f6f7f8' }}>
						{data
							.filter(a => a.name)
							.filter(a => a.filterCriteria.tab === 'Tools')
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
								</div>
							))}
					</Modal.Body>
				</Tab>
				<Tab eventKey={3} title='Projects'>
					<Modal.Body style={{ 'max-height': 'calc(100vh - 450px)', 'overflow-y': 'auto', 'background-color': '#f6f7f8' }}>
						{data
							.filter(a => a.name)
							.filter(a => a.filterCriteria.tab === 'Projects')
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
								</div>
							))}
					</Modal.Body>
				</Tab>
				<Tab eventKey={4} title='Collections'>
					<Modal.Body style={{ 'max-height': 'calc(100vh - 450px)', 'overflow-y': 'auto', 'background-color': '#f6f7f8' }}>
						{data
							.filter(a => a.name)
							.filter(a => a.filterCriteria.tab === 'Collections')
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
								</div>
							))}
					</Modal.Body>
				</Tab>
				<Tab eventKey={5} title='Courses'>
					<Modal.Body style={{ 'max-height': 'calc(100vh - 450px)', 'overflow-y': 'auto', 'background-color': '#f6f7f8' }}>
						{data
							.filter(a => a.name)
							.filter(a => a.filterCriteria.tab === 'Courses')
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
								</div>
							))}
					</Modal.Body>
				</Tab>
				<Tab eventKey={6} title='Papers'>
					<Modal.Body style={{ 'max-height': 'calc(100vh - 450px)', 'overflow-y': 'auto', 'background-color': '#f6f7f8' }}>
						{data
							.filter(a => a.name)
							.filter(a => a.filterCriteria.tab === 'Papers')
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
								</div>
							))}
					</Modal.Body>
				</Tab>
				<Tab eventKey={7} title='People'>
					<Modal.Body style={{ 'max-height': 'calc(100vh - 450px)', 'overflow-y': 'auto', 'background-color': '#f6f7f8' }}>
						{data
							.filter(a => a.name)
							.filter(a => a.filterCriteria.tab === 'People')
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
								</div>
							))}
					</Modal.Body>
				</Tab>
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
