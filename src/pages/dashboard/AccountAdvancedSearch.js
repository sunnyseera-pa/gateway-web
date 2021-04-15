import React, { useState } from 'react';
import { Col, Row, Accordion, Card, Button } from 'react-bootstrap';
import './Dashboard.scss';
import './AdvancedSearchRequestAccessModal';
import axios from 'axios';
import AdvancedSearchRequestAccessModal from './AdvancedSearchRequestAccessModal';
import AdvancedSearchTermsandConditionsModal from './AdvancedSearchTAndCsModal';
import _ from 'lodash';
const baseURL = require('../commonComponents/BaseURL').getURL();
const GENERAL_ACCESS = 'GENERAL_ACCESS';
const BANNED = 'BANNED';
const urlEnv = require('../commonComponents/BaseURL').getURLEnv();

export const AccountAdvancedSearch = props => {
	const [userState, setUserState] = useState(props.userState);
	const [activeAccordionCardState, setActiveAccoactiveAccordionCardState] = useState(0);
	const [showRequestAccessModal, setShowRequestAccessModal] = useState(false);
	const [showTermsandConditionsModal, setShowTermsAndConditionsModal] = useState(false);

	const accessRQuest = async () => {
		const approvedUser = await authorisedForAdvancedSearch();
		if (approvedUser && userState[0].acceptedAdvancedSearchTerms) {
			console.log('Redirecting to RQuest');
			if (urlEnv === 'prod') {
				window.location.assign('https://rquest.prod.healthdatagateway.org/bcrquest/');
			} else {
				window.location.assign('https://rquest.test.healthdatagateway.org/bcrquest/');
			}
		} else {
			determineModalToShow(approvedUser);
		}
	};

	const authorisedForAdvancedSearch = async () => {
		if (userState[0].advancedSearchRoles.includes(BANNED)) {
			return false;
		} else if (userState[0].advancedSearchRoles.includes(GENERAL_ACCESS)) {
			return true;
		} else if (userState[0].provider === 'oidc') {
			//if user is from open athens but not authorised and not banned, assign them an advanced search role
			let authorised = false;
			await axios
				.patch(baseURL + '/api/v1/users/advancedSearch/roles/' + userState[0].id, {
					advancedSearchRoles: [GENERAL_ACCESS],
				})
				.then(res => {
					authorised = true;
					let newUserState = userState;
					newUserState[0].advancedSearchRoles = res.data.response.advancedSearchRoles;
					setUserState(newUserState);
				})
				.catch(err => {
					console.error(err.message);
				});
			return authorised;
		} else {
			return false;
		}
	};

	const determineModalToShow = approvedUser => {
		if (approvedUser) {
			toggleShowTermsandConditionsModal();
		} else {
			toggleShowRequestAccessModal();
		}
	};

	const updateUserAcceptedAdvancedSearchTerms = async () => {
		await axios
			.patch(baseURL + '/api/v1/users/advancedSearch/terms/' + userState[0].id, {
				acceptedAdvancedSearchTerms: true,
			})
			.then(res => {
				// Update the state so that if user moves away from page they are still authorised
				let newUserState = userState;
				newUserState[0].acceptedAdvancedSearchTerms = res.data.response.acceptedAdvancedSearchTerms;
				setUserState(newUserState);
				accessRQuest();
			})
			.catch(err => {
				console.error(err.message);
			});
	};

	const toggleShowRequestAccessModal = () => {
		setShowRequestAccessModal(!showRequestAccessModal);
	};

	const toggleShowTermsandConditionsModal = () => {
		setShowTermsAndConditionsModal(!showTermsandConditionsModal);
	};

	const toggleCard = (e, eventKey) => {
		e.preventDefault();
		if (activeAccordionCardState === eventKey) {
			eventKey = -1;
		}
		setActiveAccoactiveAccordionCardState(eventKey);
	};

	return (
		<div>
			<Row className='pixelGapBottom'>
				<Col sm={1} lg={1} />
				<Col sm={10} lg={10}>
					<div className='rectangle'>
						<span className='black-20-semibold'>Cohort Discovery</span>
						<div id='thisTag' className='margin-left-8 margin-bottom-8'>
							<span className='white-13-bold'>BETA</span>
						</div>
						<p className='gray800-15 margin-bottom-6'>
							Cohort Discovery provides remote querying of multiple clinical databases in situ, even those with different data models to
							determine the dataset appropriate for your research needs. We are adding more datasets into the cohort discovery service
							monthly, please check back in from time to time to discover datasets suitable for your research.
						</p>
					</div>
				</Col>
				<Col sm={1} lg={1} />
			</Row>

			<Row>
				<Col sm={1} lg={1} />
				<Col sm={10} lg={10}>
					<Accordion defaultActiveKey='0' activeKey={activeAccordionCardState.toString()}>
						<Card className={activeAccordionCardState === 0 ? 'activeCard datasetCard' : 'datasetCard'}>
							<Accordion.Toggle as={Card.Header} eventKey='0' onClick={e => toggleCard(e, 0)} className='datasetCard'>
								<div className={activeAccordionCardState === 0 ? 'stepNumber active' : 'stepNumber'}>1</div>
								<span className='black-16 noTextDecoration'>Creating cohorts</span>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey='0'>
								<Card.Body className='datasetCard gray800-14'>
									<ul className='gray800-14'>
										<li>Access the advanced search tool using the button below.</li>
										<li>
											Select the patient characteristics you need for your research project, such as disease, age, gender, ethnicity and
											region.
										</li>
										<li>Use AND/OR to specify how you would like to combine the patient characteristics.</li>
										<li>Use Groups to define your control and research cohorts.</li>
										<li>
											The cohort query builder will give you a count of the patients matching your defined characteristics and a breakdown
											by age and gender. You will also receive a list of datasets listed on the Gateway where this data is available.
										</li>
										<li>Your search queries are automatically saved and you can return to them later.</li>
									</ul>
									<p>
										It is important to understand that the number of patients that match your query may not reflect the true number within
										the datasets, as there may be changes within the dataset between discovery of the dataset and the time your data access
										request is submitted and approved.
									</p>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
						<Card className={activeAccordionCardState === 1 ? 'activeCard datasetCard' : 'datasetCard'}>
							<Accordion.Toggle as={Card.Header} eventKey='1' onClick={e => toggleCard(e, 1)} className='datasetCard'>
								<div className={activeAccordionCardState === 1 ? 'stepNumber active' : 'stepNumber'}>2</div>
								<span className='black-16 noTextDecoration'>Requesting access</span>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey='1'>
								<Card.Body className='datasetCard gray800-14'>
									<ul className='gray800-14'>
										<li>Once you have found the datasets you need, you can make a Data Access Request via the Innovation Gateway</li>
										<li>Search for the datasets on the Innovation Gateway and either make an enquiry or request access</li>
										<li>Data Access Requests must be made individually for each dataset</li>
									</ul>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
					<div className='rectangle text-right'>
						<Button
							data-test-id='access-advanced-search'
							id='advancedSearchButton'
							variant='primary'
							className='white-14-semibold margin-right-16'
							onClick={() => {
								accessRQuest();
							}}>
							Access the advanced search tool
						</Button>

						<AdvancedSearchTermsandConditionsModal
							open={showTermsandConditionsModal}
							close={() => toggleShowTermsandConditionsModal()}
							updateUserAcceptedAdvancedSearchTerms={() => updateUserAcceptedAdvancedSearchTerms()}></AdvancedSearchTermsandConditionsModal>
						<AdvancedSearchRequestAccessModal
							open={showRequestAccessModal}
							close={() => toggleShowRequestAccessModal()}></AdvancedSearchRequestAccessModal>
					</div>
				</Col>
				<Col sm={1} lg={1} />
			</Row>
		</div>
	);
};

export default AccountAdvancedSearch;
