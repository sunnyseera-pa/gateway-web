import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Container } from 'react-bootstrap';
import SearchBar from '../commonComponents/searchBar/SearchBar';
import Loading from '../commonComponents/Loading';
import AddEditCohortForm from './AddEditCohortForm';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../commonComponents/userMessages/UserMessages';
import DataSetModal from '../commonComponents/dataSetModal/DataSetModal';
import { isEditMode } from '../../utils/GeneralHelper.util';
import '../paper/Paper.scss';
import 'react-bootstrap-typeahead/css/Typeahead.css';
var baseURL = require('../commonComponents/BaseURL').getURL();

const AddEditCohortPage = props => {
	const [data, setData] = useState([]);
	const [combinedUsers, setCombinedUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [searchString, setSearchString] = useState('');
	const [datasetData, setDatasetData] = useState([]);
	const [toolData, setToolData] = useState([]);
	const [projectData, setProjectData] = useState([]);
	const [paperData, setPaperData] = useState([]);
	const [personData, setPersonData] = useState([]);
	const [courseData, setCourseData] = useState([]);
	const [summary, setSummary] = useState([]);
	const [myEntitiesSummary, setMyEntitiesSummary] = useState([]);
	const [tempRelatedObjectIds, setTempRelatedObjectIds] = useState([]);
	const [relatedObjects, setRelatedObjects] = useState([]);
	const [didDelete, setDidDelete] = useState(false);
	const [showDrawer, setShowDrawer] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [context, setContext] = useState({});
	const [publicFlag, setPublicFlag] = useState(true);
	const [isEdit] = useState(isEditMode(window.location.pathname));
	const [searchBar] = useState(React.createRef());
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
		await doGetUsersCall();
		if (isEdit) getCohortFromDb();
		else setIsLoading(false);
	}, []);

	const doGetUsersCall = async () => {
		await axios.get(baseURL + '/api/v1/users').then(async res => {
			setCombinedUsers(res.data.data);
		});
	};

	const getCohortFromDb = async () => {
		setIsLoading(true);
		await axios.get(baseURL + '/api/v1/cohorts/' + props.match.params.cohortID).then(async res => {
			setData(res.data);
			setRelatedObjects(res.data.relatedObjects ? res.data.relatedObjects : []);
			setPublicFlag(res.data.publicflag);
			setIsLoading(false);
		});
	};

	const doSearch = e => {
		// Fires on enter on searchbar
		if (e.key === 'Enter') window.location.href = `/search?search=${encodeURIComponent(searchString)}`;
	};

	const updateSearchString = searchString => {
		setSearchString(searchString);
	};

	const doModalSearch = (e, type, page) => {
		if (e.key === 'Enter' || e === 'click') {
			var searchURL = '';
			if (type === 'dataset' && page > 0) searchURL += '&datasetIndex=' + page;
			if (type === 'tool' && page > 0) searchURL += '&toolIndex=' + page;
			if (type === 'project' && page > 0) searchURL += '&projectIndex=' + page;
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
					setProjectData(res.data.projectResults || []);
					setPaperData(res.data.paperResults || []);
					setPersonData(res.data.personResults || []);
					setCourseData(res.data.courseResults || []);
					setSummary(res.data.summary || []);
					setMyEntitiesSummary(res.data.myEntitiesSummary || []);
					setIsLoading(false);
				});
		}
	};

	const addToTempRelatedObjects = (id, type, pid) => {
		let tempArray;
		if (tempRelatedObjectIds && tempRelatedObjectIds.some(object => object.objectId === id)) {
			tempArray = tempRelatedObjectIds.filter(object => object.objectId !== id);
		} else {
			tempArray = [...tempRelatedObjectIds, { objectId: id, objectType: type, pid: pid }];
		}
		setTempRelatedObjectIds(tempArray);
	};

	const addToRelatedObjects = () => {
		let relatedObjectIds = [...tempRelatedObjectIds];

		let newRelatedObjects = relatedObjectIds.map(relatedObject => {
			let newRelatedObject = {
				...relatedObject,
				objectId: relatedObject.type === 'dataset' ? relatedObject.pid : relatedObject.objectId,
				user: userState[0].name,
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

	const updatePublicFlag = () => {
		setPublicFlag(!publicFlag);
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

	if (isLoading) {
		return (
			<Container>
				<Loading />
			</Container>
		);
	}
	return (
		<div>
			<SearchBar
				ref={searchBar}
				doSearchMethod={doSearch}
				doUpdateSearchString={updateSearchString}
				doToggleDrawer={toggleDrawer}
				userState={userState}
			/>
			<AddEditCohortForm
				data={data}
				isEdit={isEdit}
				combinedUsers={combinedUsers}
				userState={userState}
				searchString={searchString}
				doSearchMethod={doModalSearch}
				doUpdateSearchString={updateSearchString}
				datasetData={datasetData}
				toolData={toolData}
				projectData={projectData}
				paperData={paperData}
				personData={personData}
				courseData={courseData}
				summary={summary}
				myEntitiesSummary={myEntitiesSummary}
				doAddToTempRelatedObjects={addToTempRelatedObjects}
				tempRelatedObjectIds={tempRelatedObjectIds}
				doClearRelatedObjects={clearRelatedObjects}
				doAddToRelatedObjects={addToRelatedObjects}
				doRemoveObject={removeObject}
				relatedObjects={relatedObjects}
				didDelete={didDelete}
				updateDeleteFlag={updateDeleteFlag}
				publicFlag={publicFlag}
				updatePublicFlag={updatePublicFlag}
				displayTabs={['Tools', 'Projects', 'Courses', 'Papers', 'People']}
			/>
			<SideDrawer open={showDrawer} closed={toggleDrawer}>
				<UserMessages userState={userState[0]} closed={toggleDrawer} toggleModal={toggleModal} drawerIsOpen={showDrawer} />
			</SideDrawer>
			<DataSetModal open={showModal} context={context} closed={toggleModal} userState={userState[0]} />
		</div>
	);
};

export default AddEditCohortPage;
