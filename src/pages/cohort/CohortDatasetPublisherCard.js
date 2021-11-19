import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import googleAnalytics from '../../tracking';
import RelatedObject from '../commonComponents/relatedObject/RelatedObject';
import './Cohorts.scss';
import DataSetModal from '../commonComponents/dataSetModal/DataSetModal';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../commonComponents/userMessages/UserMessages';
import DataSetHelper from '../../utils/DataSetHelper.util';
import CommunicateDataCustodianModal from '../commonComponents/communicateDataCustodianModal/CommunicateDataCustodianModal';

export const CohortDatasetPublisherCard = ({ publisher, publisherGroup, userState, topicContext, searchBar }) => {
	let history = useHistory();
	const [showModal, setShowModal] = useState(false);
	const [topicContextState, setTopicContextState] = useState(topicContext);
	const [showDrawer, setShowDrawer] = useState(false);
	const [showCustodianModal, setShowCustodianModal] = useState(false);

	const toggleDrawer = () => {
		if (showDrawer) {
			searchBar.current.getNumberOfUnreadMessages();
		}
		setShowDrawer(!showDrawer);
	};

	const toggleModal = action => {
		setShowModal(!showModal);

		if (action === 'SUBMIT_APPLICATION') {
			toggleCustodianModal();
		} else if (action === 'ENQUIRY') {
			setTopicContextState({ ...topicContextState, allowNewMessage: true });
			toggleDrawer();
		}
	};

	const toggleCustodianModal = (action = '') => {
		setShowCustodianModal(!showCustodianModal);

		if (action === 'ENQUIRY') {
			console.log('Show message drawer');
			setTopicContextState({ ...topicContextState, allowNewMessage: true });
			toggleDrawer();
		} else if (action === 'SUBMIT_APPLICATION') {
			console.log('Take user to application');
			const { publisher } = topicContextState.datasets[0];
			googleAnalytics.recordEvent('Data access request', 'Start application', 'Modal button clicked');
			history.push(
				{ pathname: `/data-access-request/publisher/${publisher}` },
				{
					datasets: publisherGroup.map(dataset => {
						return { datasetId: dataset.datasetid, publisher };
					}),
				}
			);
		}
	};

	const showLoginModal = title => {
		DataSetHelper.showLoginPanel(window, title);
	};

	return (
		<Row className='mt-2'>
			<Col sm={12} lg={12}>
				<div className='rectangle pad-bottom-8'>
					<Row>
						<Col sm={10}>
							<span className='black-20-semibold'>{publisher}</span>
						</Col>
						<Col sm={2}>
							<button
								className='button-tertiary floatRight'
								onClick={() => {
									setShowModal(true);
								}}>
								Request access
							</button>
							<DataSetModal
								open={showModal}
								closed={toggleModal}
								context={topicContextState}
								userState={userState}
								showLoginModal={() => {
									showLoginModal(topicContextState.subTitle);
								}}
								is5Safes={topicContextState.is5Safes}
							/>
							<SideDrawer open={showDrawer} closed={toggleDrawer}>
								<UserMessages
									userState={userState}
									closed={toggleDrawer}
									toggleModal={toggleModal}
									drawerIsOpen={showDrawer}
									topicContext={topicContextState}
									is5Safes={topicContextState.is5Safes}
								/>
							</SideDrawer>
							<CommunicateDataCustodianModal open={showCustodianModal} closed={toggleCustodianModal} />
						</Col>
					</Row>
					<Row>
						<Col sm={12} className='gray800-14 hdruk-section-body'>
							<ReactMarkdown
								source={`${publisherGroup.length} ${publisherGroup.length > 1 ? 'datasets' : 'dataset'} from this custodian`}
							/>
						</Col>
					</Row>
				</div>
				{publisherGroup.map(dataset => {
					return (
						<RelatedObject
							entries={parseInt(dataset.count).toLocaleString()}
							objectId={dataset.pid}
							objectType='dataset'
							activeLink={true}
							onSearchPage={false}
							isCohortDatasetsTab={true}
						/>
					);
				})}
			</Col>
		</Row>
	);
};
