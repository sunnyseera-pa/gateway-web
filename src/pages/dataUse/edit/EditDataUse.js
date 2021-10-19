import React, { useState, useEffect, createRef } from 'react';
import * as Sentry from '@sentry/react';
import axios from 'axios';
import { baseURL } from '../../../configs/url.config';

import { Row, Col, Button } from 'react-bootstrap';
import SVGIcon from '../../../images/SVGIcon';
import EditFormDataUse from './EditDataUseForm';
import SearchBar from '../../commonComponents/searchBar/SearchBar';
import ErrorModal from '../../commonComponents/errorModal/ErrorModal';
import ActionBar from '../../commonComponents/actionbar/ActionBar';
import SaveModal from '../SaveEditModal';

const EditDataUse = props => {
	const [data, setData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [searchBar] = useState(createRef());
	const [searchString, setSearchString] = useState('');
	const [showDrawer, setShowDrawer] = useState(false);
	const [userState] = useState(
		props.userState || [
			{
				loggedIn: false,
				role: 'Reader',
				id: null,
				name: null,
			},
		]
	);

	useEffect(() => {
		axios.get(baseURL + '/api/v2/data-use-registers/' + props.match.params.datauseID).then(res => setData(res.data));
	}, []);

	console.log(data);

	let showError = false;

	const showModalHandler = () => {
		showError = true;
	};

	const hideModalHandler = props => {
		showError = false;
	};

	const doSearch = e => {
		//fires on enter on searchbar
		if (e.key === 'Enter') window.location.href = `/search?search=${encodeURIComponent(searchString)}`;
	};

	const updateSearchString = searchString => {
		setSearchString(searchString);
	};

	const toggleDrawer = () => {
		if (showDrawer === true) {
			searchBar.current.getNumberOfUnreadMessages();
		}
		setShowDrawer(!showDrawer);
	};

	const showSaveModal = () => {
		setShowModal(true);
		console.log('saved');
	};

	const hideSaveModal = () => {
		setShowModal(false);
	};

	return (
		<Sentry.ErrorBoundary fallback={<ErrorModal show={showModalHandler} handleClose={hideModalHandler} />}>
			<SearchBar
				ref={searchBar}
				searchString={searchString}
				doSearchMethod={doSearch}
				doUpdateSearchString={updateSearchString}
				userState={userState}
				doToggleDrawer={toggleDrawer}
			/>
			<div className='datause-card datause-edit-card'>
				<Row>
					<Col md={10}>
						<h5 className='black-20-semibold'>Edit a data use</h5>
					</Col>
					<Col md={2}>
						<span className='badge-datause datause-badge-right'>
							<SVGIcon name='datauseicon' fill={'#fff'} className='badgeSvg mr-2' viewBox='-2 -2 22 22' />
							<span>Data use</span>
						</span>
					</Col>
				</Row>

				<Row>
					<Col md={10}>
						<p className='gray800-14-normal'>
							A data use register is a public record of data an organisation has shared with other individuals and organisations. Data uses
							help people understand how data is being used and why. Please edit data uses to ensure that the information is accurate and
							up-to-date
						</p>
					</Col>
				</Row>
				<hr className='datause-border' />
				<Row>
					<EditFormDataUse data={data} />
				</Row>
				{userState[0].loggedIn && (
					<ActionBar userState={userState}>
						<Button className='datause-cancel dark-14'>Cancel</Button>
						<Button onClick={showSaveModal} className='datause-save white-14'>
							Save
						</Button>
					</ActionBar>
				)}
				{showModal && <SaveModal savedEdit={true} id={props.match.params.datauseID} show={showSaveModal} hide={hideSaveModal} />}
			</div>
		</Sentry.ErrorBoundary>
	);
};

export default EditDataUse;
