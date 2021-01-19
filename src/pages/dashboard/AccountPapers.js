import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Row, Col, Button, Tabs, Tab, DropdownButton, Dropdown, Pagination } from 'react-bootstrap';
import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading';
import './Dashboard.scss'; 
import ActionModal from '../commonComponents/ActionModal/ActionModal';
import _ from 'lodash';
import { EntityActionButton } from './EntityActionButton.jsx';
import { Event, initGA } from '../../tracking';

var baseURL = require('../commonComponents/BaseURL').getURL();

export const AccountPapers = props => {
	const [userState] = useState(props.userState);
	const [key, setKey] = useState('active');
	const [papersList, setPapersList] = useState([]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [pendingIndex, setPendingIndex] = useState(0);
	const [rejectedIndex, setRejectedIndex] = useState(0);
	const [archiveIndex, setArchiveIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [isResultsLoading, setIsResultsLoading] = useState(true);
	const [activeCount, setActiveCount] = useState(0);
	const [reviewCount, setReviewCount] = useState(0);
	const [rejectedCount, setRejectedCount] = useState(0);
	const [archiveCount, setArchiveCount] = useState(0);
	const [showActionModal, setShowActionModal] = useState(false);
	const actionModalConfig = {
		title: 'Reject this Paper?',
	};
	const maxResult = 40;

	useEffect(() => {
		if (process.env.NODE_ENV === 'production') {
			initGA('UA-166025838-1');
		}
		doPapersCall('active', true, 0, true); 
	}, []);

	const handleSelect = key => {
		setKey(key);

		let index; 
		if(key==="active"){
			index = activeIndex
		} else if(key==="pending"){
			index = pendingIndex
		} else if(key==="rejected"){
			index = rejectedIndex
		} else if(key==="archive"){
			index = archiveIndex
		}

		doPapersCall(key, false, index);
	};

	const handlePagination = (type, index) => {
		if(type === 'active'){
			setActiveIndex(index)
		} else if(type === 'pending'){
			setPendingIndex(index)
		} else if(type === 'rejected'){
			setRejectedIndex(index)
		} else if(type === 'archive'){
			setArchiveIndex(index)
		}
		doPapersCall(type, false, index);
	}

	const previousPageButton = (index, maxResult, key) => {
		return (
			<Pagination.Prev
			onClick={e => {
				handlePagination(key, index - maxResult);
			}}
			disabled={index < maxResult}
			>
			Previous
			</Pagination.Prev>
		)
	}

	const nextPageButton = (count, index, maxResult, key) => {
		return (
			<Pagination.Next
			onClick={e => {
				handlePagination(key, index + maxResult);
			}}
			disabled={count - (index + maxResult) <= 0}
			>
				Next
			</Pagination.Next>
		)
	}

	const doPapersCall = (key, updateCounts, index, firstLoad) => { 
		if(key === 'pending'){
			key = 'review'
		}

		if(firstLoad === true){
			setIsLoading(true);
		}
		setIsResultsLoading(true);

		let apiUrl;
		if (typeof index === 'undefined') {
			apiUrl = baseURL + `/api/v1/papers/getList?status=${key}`;
		} else {
			apiUrl = baseURL + `/api/v1/papers/getList?status=${key}&offset=${index}`;
		}

		axios.get(apiUrl ).then(res => {
			setPapersList(res.data.data[0]);

			if(updateCounts === true) {
				setActiveCount(res.data.data[1].activeCount);
				setReviewCount(res.data.data[1].reviewCount);
				setArchiveCount(res.data.data[1].archiveCount);
				setRejectedCount(res.data.data[1].rejectedCount);
			}

			if(firstLoad === true){
				setIsLoading(false);
			}
			setIsResultsLoading(false);
		});
		window.scrollTo(0, 0);
	};

	const approvePaper = (id, key, index, count) => {
		axios
			.patch(baseURL + '/api/v1/papers/' + id, {
				activeflag: 'active',
			})
			.then(res => {
				if (shouldChangeTab()) {
					setKey('active');
					doPapersCall('active', true);
				} else if(!shouldChangeTab() && count - (index + maxResult) <= 0 && count % maxResult === 1){
					if(key === 'pending'){
						setPendingIndex(index - maxResult)
					} else if(key === 'archive'){
						setArchiveIndex(index - maxResult)
					}
					doPapersCall(key, true, index-maxResult);
				} else if (!shouldChangeTab()) {
					doPapersCall(key, true, index);
				}
			});
	};

	const rejectPaper = (id, rejectionReason, key, index, count) => {
		axios
			.patch(baseURL + '/api/v1/papers/' + id, {
				id: id,
				activeflag: 'rejected',
				rejectionReason: rejectionReason,
			})
			.then(res => {
				if (shouldChangeTab()) {
					setKey('active');
					doPapersCall('active', true);
				} else if(!shouldChangeTab() && count - (index + maxResult) <= 0 && count % maxResult === 1){
					if(key === 'pending'){
						setPendingIndex(index - maxResult)
					} else if(key === 'archive'){
						setArchiveIndex(index - maxResult)
					}
					doPapersCall(key, true, index-maxResult);
				} else if (!shouldChangeTab()) {
					doPapersCall(key, true, index);
				}
			});
	};

	const archivePaper = id => {
		axios
			.patch(baseURL + '/api/v1/papers/' + id, {
				id: id,
				activeflag: 'archive',
			})
			.then(res => {
				setKey('active');
				if(activeCount - (activeIndex + maxResult) <= 0 && activeCount % maxResult === 1){
					setActiveIndex(activeIndex - maxResult)
					doPapersCall(key, true, activeIndex-maxResult);
				} else {
					doPapersCall('active', true, activeIndex);
				}
			});
	};


	const toggleActionModal = () => {
		setShowActionModal(!showActionModal);
	};

	const shouldChangeTab = () => {
		return (key === 'pending' && reviewCount <= 1) || (key === 'archive' && archiveCount <= 1) ? true : false;
	};
	

	let activePaginationItems = []; 
	let pendingPaginationItems = []; 
	let rejectedPaginationItems = []; 
	let archivePaginationItems = []; 

	activePaginationItems.push( previousPageButton(activeIndex, maxResult, 'active') )
	for (let i = 1; i <= Math.ceil(activeCount / maxResult); i++) {
		activePaginationItems.push(
			<Pagination.Item
				data-testid='activePaginationItem'
				key={i}
				active={i === activeIndex / maxResult + 1}
				onClick={e => {
					handlePagination('active', (i - 1) * maxResult);
				}}
			>
				{i}
			</Pagination.Item>
		)
	}
	activePaginationItems.push( nextPageButton(activeCount, activeIndex, maxResult, 'active') )

	pendingPaginationItems.push( previousPageButton(pendingIndex, maxResult, 'pending') )
	for (let i = 1; i <= Math.ceil(reviewCount / maxResult); i++) {
		pendingPaginationItems.push(
			<Pagination.Item
				data-testid='pendingPaginationItem'
				key={i}
				active={i === pendingIndex / maxResult + 1}
				onClick={e => {
					handlePagination('pending', (i - 1) * maxResult);
				}}
			>
				{i}
			</Pagination.Item>
		)
	}
	pendingPaginationItems.push( nextPageButton(reviewCount, pendingIndex, maxResult, 'pending') )

	rejectedPaginationItems.push( previousPageButton(rejectedIndex, maxResult, 'rejected') )
	for (let i = 1; i <= Math.ceil(rejectedCount / maxResult); i++) {
		rejectedPaginationItems.push(
			<Pagination.Item
				data-testid='rejectedPaginationItem'
				key={i}
				active={i === rejectedIndex / maxResult + 1}
				onClick={e => {
					handlePagination('rejected', (i - 1) * maxResult);
				}}
			>
				{i}
			</Pagination.Item>
		)
	}
	rejectedPaginationItems.push( nextPageButton(rejectedCount, rejectedIndex, maxResult, 'rejected') )

	archivePaginationItems.push( previousPageButton(archiveIndex, maxResult, 'archive') )
	for (let i = 1; i <= Math.ceil(archiveCount / maxResult); i++) {
		archivePaginationItems.push(
			<Pagination.Item
				data-testid='archivePaginationItem'
				key={i}
				active={i === archiveIndex / maxResult + 1}
				onClick={e => {
					handlePagination('archive', (i - 1) * maxResult);
				}}
			>
				{i}
			</Pagination.Item>
		)
	}
	archivePaginationItems.push( nextPageButton(archiveCount, archiveIndex, maxResult, 'archive') )

	if (isLoading) {
		return (
			<Row>
				<Col xs={1}></Col>
				<Col xs={10}>
					<Loading data-testid='isLoading' />
				</Col>
				<Col xs={1}></Col>
			</Row>
		);
	}
	

	return (
		<div>
			<Row>
				<Col xs={1}></Col>
				<Col xs={10}>
					<Row className='accountHeader'>
						<Col sm={12} md={8}>
							<Row>
								<span className='black-20'>Papers</span>
							</Row>
							<Row>
								<span className='gray700-13 '>Manage your existing papers or add new ones</span>
							</Row>
						</Col>
						<Col sm={12} md={4} style={{ textAlign: 'right' }}>
							<Button
								variant='primary'
								href='/paper/add'
								className='addButton'
								onClick={() => Event('Buttons', 'Click', 'Add a new paper')}>
								+ Add a new paper
							</Button>
						</Col>
					</Row>
					<Row className='tabsBackground'>
						<Col sm={12} lg={12}>
							<Tabs className='dataAccessTabs gray700-13' data-testid='paperTabs' activeKey={key} onSelect={handleSelect}>
								<Tab eventKey='active' title={'Active (' + activeCount + ')'}>
									{' '} 
								</Tab>
								<Tab eventKey='pending' title={'Pending approval (' + reviewCount + ')'}>
									{' '} 
								</Tab>
								<Tab eventKey='rejected' title={'Rejected (' + rejectedCount + ')'}>
									{' '}
								</Tab>
								<Tab eventKey='archive' title={'Archive (' + archiveCount + ')'}>
									{' '}
								</Tab>
							</Tabs>
						</Col>
					</Row>

					{isResultsLoading && 
							<Row className="width-100">
								<Col xs={12} className="noPadding">
									<Loading/> 
								</Col>
							</Row>
					} 

					{!isResultsLoading && (() => {
						switch (key) {
							case 'active':
								return (
									<div>
										{activeCount <= 0 ? (
											''
										) : (
											<Row className='subHeader mt-3 gray800-14-bold'>
												<Col xs={2}>Updated</Col>
												<Col xs={5}>Name</Col>
												<Col xs={2}>Author</Col>
												<Col xs={3}></Col>
											</Row>
										)}
										{activeCount <= 0 ? (
											<Row className='margin-right-15'>
												<NotFound word='papers' />
											</Row>
										) : (
											papersList.map((paper, i) => {
												if (paper.activeflag !== 'active') {
													return <></>;
												} else {
													return (
														<Row className='entryBox' data-testid='paperEntryActive' key={i}>
															<Col sm={12} lg={2} className='pt-2 gray800-14'>
																{moment(paper.updatedAt).format('D MMMM YYYY HH:mm')}
															</Col>
															<Col sm={12} lg={5} className='pt-2'>
																<a href={'/paper/' + paper.id} className='black-14'>
																	{paper.name}
																</a>
															</Col>
															<Col sm={12} lg={2} className='pt-2 gray800-14'>
																{paper.persons <= 0
																	? 'Author not listed'
																	: paper.persons.map(person => {
																			return (
																				<span>
																					{person.firstname} {person.lastname} <br />
																				</span>
																			);
																	  })}
															</Col>
															<Col sm={12} lg={3} style={{ textAlign: 'right' }} className='toolsButtons'>
																<DropdownButton variant='outline-secondary' alignRight title='Actions' className='floatRight'>
																	<Dropdown.Item href={'/paper/edit/' + paper.id} className='black-14'>
																		Edit
																	</Dropdown.Item>
																	<EntityActionButton id={paper.id} action={archivePaper} entity='paper' actionType='archive' />
																</DropdownButton>
															</Col>
														</Row>
													);
												}
											})
										)}
									</div>
								);
							case 'pending':
								return (
									<div>
										{reviewCount <= 0 ? (
											''
										) : (
											<Row className='subHeader mt-3 gray800-14-bold'>
												<Col xs={2}>Updated</Col>
												<Col xs={5}>Name</Col>
												<Col xs={2}>Author</Col>
												<Col xs={3}></Col>
											</Row>
										)}
										{reviewCount <= 0 ? (
											<Row className='margin-right-15'>
												<NotFound word='papers' />
											</Row>
										) : (
											papersList.map(paper => {
												if (paper.activeflag !== 'review') {
													return <></>;
												} else {
													return (
														<Row className='entryBox' data-testid='paperEntryPending'>
															<Col sm={12} lg={2} className='pt-2 gray800-14'>
																{moment(paper.updatedAt).format('D MMMM YYYY HH:mm')}
															</Col>
															<Col sm={12} lg={5} className='pt-2'>
																<a href={'/paper/' + paper.id} className='black-14'>
																	{paper.name}
																</a>
															</Col>
															<Col sm={12} lg={2} className='pt-2 gray800-14'>
																{paper.persons <= 0
																	? 'Author not listed'
																	: paper.persons.map(person => {
																			return (
																				<span>
																					{person.firstname} {person.lastname} <br />
																				</span>
																			);
																	  })}
															</Col>
															<Col sm={12} lg={3} style={{ textAlign: 'right' }} className='toolsButtons'>
																{userState[0].role === 'Admin' ? (
																	<DropdownButton variant='outline-secondary' alignRight title='Actions' className='floatRight'>
																		<Dropdown.Item href={'/paper/edit/' + paper.id} className='black-14'>
																			Edit
																		</Dropdown.Item>
																		<Dropdown.Item href='#' onClick={() => approvePaper(paper.id, key, pendingIndex, reviewCount)} className='black-14'>
																			Approve
																		</Dropdown.Item>
																		<Dropdown.Item href='#' onClick={() => toggleActionModal()} className='black-14'>
																			Reject
																		</Dropdown.Item>
																		<ActionModal
																			id={paper.id}
																			entityKey={'pending'}
																			entityIndex={pendingIndex} 
																			entityCount={reviewCount}
																			open={showActionModal}
																			context={actionModalConfig}
																			updateApplicationStatus={rejectPaper}
																			close={toggleActionModal}
																		/>
																	</DropdownButton>
																) : (
																	''
																)}
															</Col>
														</Row>
													);
												}
											})
										)}
									</div>
								);
							case 'rejected':
								return (
									<div>
										{rejectedCount <= 0 ? (
											''
										) : (
											<Row className='subHeader mt-3 gray800-14-bold'>
												<Col xs={2}>Updated</Col>
												<Col xs={5}>Name</Col>
												<Col xs={2}>Author</Col>
												<Col xs={3}></Col>
											</Row>
										)}
										{rejectedCount <= 0 ? (
											<Row className='margin-right-15'>
												<NotFound word='papers' />
											</Row>
										) : (
											papersList.map(paper => {
												if (paper.activeflag !== 'rejected') {
													return <></>;
												} else {
													return (
														<Row className='entryBox' data-testid='paperEntryRejected'>
															<Col sm={12} lg={2} className='pt-2 gray800-14'>
																{moment(paper.updatedAt).format('D MMMM YYYY HH:mm')}
															</Col>
															<Col sm={12} lg={5} className='pt-2'>
																<a href={'/paper/' + paper.id} className='black-14'>
																	{paper.name}
																</a>
															</Col>
															<Col sm={12} lg={2} className='pt-2 gray800-14'>
																{paper.persons <= 0
																	? 'Author not listed'
																	: paper.persons.map(person => {
																			return (
																				<span>
																					{person.firstname} {person.lastname} <br />
																				</span>
																			);
																	  })}
															</Col>
															<Col sm={12} lg={3} style={{ textAlign: 'right' }} className='toolsButtons'></Col>
														</Row>
													);
												}
											})
										)}
									</div>
								);
							case 'archive':
								return (
									<div>
										{archiveCount <= 0 ? (
											''
										) : (
											<Row className='subHeader mt-3 gray800-14-bold'>
												<Col xs={2}>Updated</Col>
												<Col xs={5}>Name</Col>
												<Col xs={2}>Author</Col>
												<Col xs={3}></Col>
											</Row>
										)}
										{archiveCount <= 0 ? (
											<Row className='margin-right-15'>
												<NotFound word='papers' />
											</Row>
										) : (
											papersList.map(paper => {
												if (paper.activeflag !== 'archive') {
													return <></>;
												} else {
													return (
														<Row className='entryBox' data-testid='paperEntryArchive'>
															<Col sm={12} lg={2} className='pt-2 gray800-14'>
																{moment(paper.updatedAt).format('D MMMM YYYY HH:mm')}
															</Col>
															<Col sm={12} lg={5} className='pt-2'>
																<a href={'/paper/' + paper.id} className='black-14'>
																	{paper.name}
																</a>
															</Col>
															<Col sm={12} lg={2} className='pt-2 gray800-14'>
																{paper.persons <= 0
																	? 'Author not listed'
																	: paper.persons.map(person => {
																			return (
																				<span>
																					{person.firstname} {person.lastname} <br />
																				</span>
																			);
																	  })}
															</Col>
															<Col sm={12} lg={3} style={{ textAlign: 'right' }} className='toolsButtons'>
																{userState[0].role === 'Admin' ? (
																	<DropdownButton variant='outline-secondary' alignRight title='Actions' className='floatRight'>
																		<Dropdown.Item href={'/paper/edit/' + paper.id} className='black-14'>
																			Edit
																		</Dropdown.Item>
																		<Dropdown.Item href='#' onClick={() => approvePaper(paper.id, key, archiveIndex, archiveCount)} className='black-14'>
																			Approve
																		</Dropdown.Item>
																		<Dropdown.Item href='#' onClick={() => toggleActionModal()} className='black-14'>
																			Reject
																		</Dropdown.Item>
																		<ActionModal
																			id={paper.id}
	                                    									entityKey={'archive'}
																		  	entityIndex={archiveIndex} 
																		  	entityCount={archiveCount}
																			open={showActionModal}
																			context={actionModalConfig}
																			updateApplicationStatus={rejectPaper}
																			close={toggleActionModal}
																		/>
																	</DropdownButton>
																) : (
																	<DropdownButton variant='outline-secondary' alignRight title='Actions' className='floatRight'>
																		<Dropdown.Item href={'/paper/edit/' + paper.id} className='black-14'>
																			Edit
																		</Dropdown.Item>
																	</DropdownButton>
																)}
															</Col>
														</Row>
													); 
												}
											})
										)}
									</div>
								);
						}
					})()}

					{!isResultsLoading &&
						<div className='text-center entityDashboardPagination' >
						{key === 'active' && activeCount > maxResult ? <Pagination className="margin-top-16" data-testid='activePagination'>{activePaginationItems}</Pagination> : ''}
						{key === 'pending' && reviewCount > maxResult ? <Pagination className="margin-top-16" data-testid='pendingPagination'>{pendingPaginationItems}</Pagination> : ''}
						{key === 'rejected' && rejectedCount > maxResult ? <Pagination className="margin-top-16" data-testid='rejectedPagination'>{rejectedPaginationItems}</Pagination> : ''}
						{key === 'archive' && archiveCount > maxResult ? <Pagination className="margin-top-16" data-testid='archivePagination'>{archivePaginationItems}</Pagination> : ''}
						</div>
					}


				</Col>
				<Col xs={1}></Col>
			</Row>
		</div>
	);
};

export default AccountPapers;
