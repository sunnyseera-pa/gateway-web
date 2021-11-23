import React, { useState, useEffect, createRef } from 'react';
import * as Sentry from '@sentry/react';
import axios from 'axios';
import { baseURL } from '../../../configs/url.config';
import { isEmpty } from 'lodash';

import { Container } from 'react-bootstrap';
import EditFormDataUse from './EditDataUseForm';
import SearchBar from '../../commonComponents/searchBar/SearchBar';
import ErrorModal from '../../commonComponents/errorModal/ErrorModal';
import SideDrawer from '../../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../../commonComponents/userMessages/UserMessages';
import DataSetModal from '../../commonComponents/dataSetModal/DataSetModal';
import Loading from '../../commonComponents/Loading';
import moment from 'moment';
import SaveModal from '../SaveEditModal';

const EditDataUse = props => {
	const [data, setData] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [searchBar] = useState(createRef());
	const [searchString, setSearchString] = useState('');
	const [showDrawer, setShowDrawer] = useState(false);
	const [context, setContext] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [keywords, setKeywords] = useState([]);
	const [datasetData, setDatasetData] = useState([]);
	const [toolData, setToolData] = useState([]);
	const [paperData, setPaperData] = useState([]);
	const [personData, setPersonData] = useState([]);
	const [courseData, setCourseData] = useState([]);
	const [summary, setSummary] = useState([]);
	const [tempRelatedObjectIds, setTempRelatedObjectIds] = useState([]);
	const [relatedObjects, setRelatedObjects] = useState([]);
	const [didDelete, setDidDelete] = useState(false);
	const [safeOuputsArray, setSafeOuputsArray] = useState(['']);
	const [disableInput, setDisableInput] = useState(false);
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

	useEffect(async () => {
		setIsLoading(true);
		await Promise.all([doGetKeywordsCall()]);
		axios.get(baseURL + '/api/v2/data-use-registers/' + props.match.params.datauseID).then(res => {
			setData(res.data);
			setRelatedObjects(res.data.relatedObjects ? res.data.relatedObjects : []);
			let safeOutputs = [];
			res.data.gatewayOutputsPapersInfo.forEach(output => {
				safeOutputs.push({ key: output.id, value: output.name });
			});
			res.data.gatewayOutputsToolsInfo.forEach(output => {
				safeOutputs.push({ key: output.id, value: output.name });
			});
			res.data.nonGatewayOutputs.forEach(output => {
				safeOutputs.push({ key: 'nonGateway', value: output });
			});

			setSafeOuputsArray(!isEmpty(safeOutputs) ? safeOutputs : [{ key: '', value: '' }]);
			setDisableInput(getUserRoles(res.data.publisher));
			setIsLoading(false);
		});
	}, []);

	const getUserRoles = publisher => {
		let { teams } = userState[0];
		let foundTeam = teams.filter(team => team._id === publisher);
		if (isEmpty(teams) || isEmpty(foundTeam)) {
			return true;
		}

		return !foundTeam[0].roles.some(role => ['manager', 'reviewer'].includes(role));
	};

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

	const doModalSearch = (e, type = 'dataset', page = 0) => {
		if (e.key === 'Enter' || e === 'click') {
			var searchURL = '';

			if (type === 'dataset' && page > 0) searchURL += '&datasetIndex=' + page;
			if (type === 'tool' && page > 0) searchURL += '&toolIndex=' + page;
			if (type === 'paper' && page > 0) searchURL += '&paperIndex=' + page;
			if (type === 'person' && page > 0) searchURL += '&personIndex=' + page;
			if (type === 'course' && page > 0) searchURL += '&courseIndex=' + page;

			axios
				.get(baseURL + '/api/v1/search?search=' + encodeURIComponent(searchString) + searchURL, {
					params: {
						form: true,
						userID: userState[0].id,
					},
				})
				.then(res => {
					setDatasetData(res.data.datasetResults || []);
					setToolData(res.data.toolResults || []);
					setPaperData(res.data.paperResults || []);
					setPersonData(res.data.personResults || []);
					setCourseData(res.data.courseResults || []);
					setSummary(res.data.summary || []);
					setIsLoading(false);
				});
		}
	};

	const addToTempRelatedObjects = (id, type, pid) => {
		let updatedTempRelatedObjectIds = [...tempRelatedObjectIds];
		if (tempRelatedObjectIds && tempRelatedObjectIds.some(object => object.objectId === id)) {
			updatedTempRelatedObjectIds = updatedTempRelatedObjectIds.filter(object => object.objectId !== id);
		} else {
			updatedTempRelatedObjectIds.push({ objectId: id, objectType: type, pid: pid });
		}
		setTempRelatedObjectIds(updatedTempRelatedObjectIds);
	};

	const addToRelatedObjects = () => {
		let relatedObjectIds = [...tempRelatedObjectIds];

		let newRelatedObjects = relatedObjectIds.map(relatedObject => {
			let newRelatedObject = {
				...relatedObject,
				objectId: relatedObject.type === 'dataset' ? relatedObject.pid : relatedObject.objectId,
				user: userState.name,
				updated: moment().format('DD MMM YYYY'),
			};
			return newRelatedObject;
		});
		setRelatedObjects([...relatedObjects, ...newRelatedObjects]);
		setTempRelatedObjectIds([]);
	};

	const clearRelatedObjects = () => {
		setTempRelatedObjectIds([]);
	};

	const removeObject = (id, type, datasetid) => {
		let countOfRelatedObjects = relatedObjects.length;
		let newRelatedObjects = [...relatedObjects].filter(obj => obj.objectId !== id && obj.objectId !== id.toString() && obj.pid !== id);

		//if an item was not removed try removing by datasetid for retro linkages
		if (countOfRelatedObjects <= newRelatedObjects.length && type === 'dataset') {
			newRelatedObjects = [...relatedObjects].filter(obj => obj.objectId !== datasetid && obj.objectId !== datasetid.toString());
		}
		setRelatedObjects(newRelatedObjects);
		setDidDelete(true);
	};

	const updateDeleteFlag = () => {
		setDidDelete(false);
	};

	const toggleDrawer = () => {
		if (showDrawer === true) {
			searchBar.current.getNumberOfUnreadMessages();
		}
		setShowDrawer(!showDrawer);
	};

	const toggleModal = (showEnquiry = false, context = {}) => {
		setShowModal(!showModal);
		setContext(context);
		setShowDrawer(showEnquiry);
	};

	const showSaveModal = () => {
		setShowModal(true);
		console.log('saved');
	};

	const hideSaveModal = () => {
		setShowModal(false);
	};

	const doGetKeywordsCall = () => {
		return new Promise((resolve, reject) => {
			axios.get(baseURL + '/api/v1/search/filter/feature/tool').then(res => {
				var tempFeaturesArray = [
					'Arbitrage',
					'Association Rules',
					'Attribution Modeling',
					'Bayesian Statistics',
					'Clustering',
					'Collaborative Filtering',
					'Confidence Interval',
					'Cross-Validation',
					'Decision Trees',
					'Deep Learning',
					'Density Estimation',
					'Ensembles',
					'Experimental Design',
					'Feature Selection',
					'Game Theory',
					'Geospatial Modeling',
					'Graphs',
					'Imputation',
					'Indexation / Cataloguing',
					'Jackknife Regression',
					'Lift Modeling',
					'Linear Regression',
					'Linkage Analysis',
					'Logistic Regression',
					'Model Fitting',
					'Monte-Carlo Simulation',
					'Naive Bayes',
					'Nearest Neighbors - (k-NN)',
					'Neural Networks',
					'Pattern Recognition',
					'Predictive Modeling',
					'Principal Component Analysis - (PCA)',
					'Random Numbers',
					'Recommendation Engine',
					'Relevancy Algorithm',
					'Rule System',
					'Scoring Engine',
					'Search Engine',
					'Segmentation',
					'Supervised Learning',
					'Support Vector Machine - (SVM)',
					'Survival Analysis',
					'Test of Hypotheses',
					'Time Series',
					'Yield Optimization',
				];

				res.data.data[0].forEach(fe => {
					if (!tempFeaturesArray.includes(fe) && fe !== '') {
						tempFeaturesArray.push(fe);
					}
				});

				setKeywords(
					tempFeaturesArray.sort(function (a, b) {
						return a.toUpperCase() < b.toUpperCase() ? -1 : a.toUpperCase() > b.toUpperCase() ? 1 : 0;
					})
				);
				resolve();
			});
		});
	};

	if (isLoading) {
		return (
			<Container>
				<Loading data-testid='outerLoadingSpinner' />
			</Container>
		);
	}

	return (
		<Sentry.ErrorBoundary fallback={<ErrorModal show={showModalHandler} handleClose={hideModalHandler} />}>
			<div>
				<SearchBar
					ref={searchBar}
					searchString={searchString}
					doSearchMethod={doSearch}
					doUpdateSearchString={updateSearchString}
					userState={userState}
				/>

				<EditFormDataUse
					data={data}
					userState={userState}
					keywordsData={keywords}
					doToggleDrawer={toggleDrawer}
					doSearchMethod={doModalSearch}
					doUpdateSearchString={updateSearchString}
					datasetData={datasetData}
					toolData={toolData}
					paperData={paperData}
					personData={personData}
					courseData={courseData}
					summary={summary}
					doAddToTempRelatedObjects={addToTempRelatedObjects}
					tempRelatedObjectIds={tempRelatedObjectIds}
					doClearRelatedObjects={clearRelatedObjects}
					doAddToRelatedObjects={addToRelatedObjects}
					doRemoveObject={removeObject}
					relatedObjects={relatedObjects}
					didDelete={didDelete}
					updateDeleteFlag={updateDeleteFlag}
					safeOuputsArray={safeOuputsArray}
					disableInput={disableInput}
				/>
				<SideDrawer open={showDrawer} closed={toggleDrawer}>
					<UserMessages userState={userState[0]} closed={toggleDrawer} toggleModal={toggleModal} drawerIsOpen={toggleDrawer} />
				</SideDrawer>

				<DataSetModal open={showModal} context={context} closed={toggleModal} userState={userState[0]} />
			</div>
		</Sentry.ErrorBoundary>
	);
};

export default EditDataUse;
