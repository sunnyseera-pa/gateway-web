// /ShowObjects.js
import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import Container from 'react-bootstrap/Container';
import SSOPage from './pages/sso/SSOPage';
import ToolPage from './pages/tool/ToolPage';
import PersonPage from './pages/person/PersonPage';
import ProjectPage from './pages/project/ProjectPage';
import PaperPage from './pages/paper/PaperPage';
import CoursePage from './pages/course/CoursePage';
import DatasetPage from './pages/dataset/DatasetPage';
import SearchPage from './pages/search/SearchPage';
import CollectionPage from './pages/collections/CollectionPage';
import PublicAnalyticsDashboard from './pages/publicDashboard/PublicAnalyticsDashboard';
import Account from './pages/dashboard/Account';
import Unsubscribe from './pages/dashboard/Unsubscribe';
import AddEditToolPage from './pages/tool/AddEditToolPage';
import AddEditProjectPage from './pages/project/AddEditProjectPage';
import AddEditPaperPage from './pages/paper/AddEditPaperPage';
import AddEditCoursePage from './pages/course/AddEditCoursePage';
import AddCollectionPage from './pages/collections/AddCollectionPage';
import EditCollectionPage from './pages/collections/EditCollectionPage';
import DataAccessRequest from './pages/DataAccessRequest/DataAccessRequest';
import Loading from './pages/commonComponents/Loading';
import CompleteRegistration from './pages/registration/CompleteRegistration';
import LoginModal from './pages/commonComponents/LoginModal';
import Footer from './pages/commonComponents/Footer';
import LoginErrorPage from './pages/commonComponents/LoginErrorPage';
import ErrorModal from './pages/commonComponents/errorModal/ErrorModal';

var baseURL = require('./pages/commonComponents/BaseURL').getURL();
class HDRRouter extends Component {
	// initialize our state
	state = {
		userState: [
			{
				loggedIn: false,
				role: 'Reader',
				id: null,
				name: null,
				profileComplete: false,
			},
		],
		isLoading: true,
		showError: false,
	};

	hideModal = () => {
		this.setState({ showError: false });
	};
	async componentDidMount() {
		let currentComponent = this;

		axios.defaults.withCredentials = true;
		axios.defaults.timeout = 60000;
		axios.interceptors.response.use(
			function (response) {
				return response;
			},
			function (error) {
				if (error) {
					if (error.response.status !== 404) {
						console.log(error);
						Sentry.captureException(error);
						return Promise.reject(error).then(currentComponent.setState({ showError: true }));
					}
					return error;
				}
			}
		);

		axios
			.get(baseURL + '/api/v1/auth/status')
			.then(async res => {
				let person = await axios.get(baseURL + '/api/v1/person/' + res.data.data[0].id);
				this.setState({
					userState: [
						{
							loggedIn: res.data.data[0].loggedIn,
							role: res.data.data[0].role,
							id: res.data.data[0].id,
							name: res.data.data[0].name,
							teams: res.data.data[0].teams,
							profileComplete: person.data.person.profileComplete,
						},
					],
					isLoading: false,
				});
			})
			.catch(error => {
				this.setState({
					userState: [
						{
							loggedIn: false,
							role: 'Reader',
							id: null,
							name: null,
						},
					],
					isLoading: false,
				});
			});
	}
	render() {
		const { isLoading, userState, showError } = this.state;
		if (isLoading) {
			return (
				<Container>
					<Loading />
				</Container>
			);
		}

		if (showError) {
			return (
				<Router>
					<ErrorModal show={this.state.showError} handleClose={this.hideModal} />
				</Router>
			);
		}

		return (
			<Router>
				<LoginModal userState={userState} />
				<div className='navBarGap'></div>
				<div className='mainWrap'>
					<Switch>
						{userState[0].loggedIn && !userState[0].profileComplete ? (
							<Route render={props => <Account {...props} userState={userState} profileComplete={false} />} />
						) : (
							''
						)}

						<Route path='/search' render={props => <SearchPage {...props} userState={userState} />} />
						<Route path='/loginerror' render={props => <LoginErrorPage {...props} userState={userState} />} />
						<Route path='/person/:personID' render={props => <PersonPage {...props} userState={userState} />} />
						<Route path='/dataset/:datasetID' render={props => <DatasetPage {...props} userState={userState} />} />
						<Route path='/completeRegistration/:personID' render={props => <CompleteRegistration {...props} userState={userState} />} />
						<Route path='/sso' render={props => <SSOPage {...props} userState={userState} />} />
						<Route path='/account/unsubscribe/:userObjectID' render={props => <Unsubscribe {...props} userState={userState} />} />
						<Route path='/dashboard' render={props => <PublicAnalyticsDashboard {...props} userState={userState} />} />

						{userState[0].loggedIn ? (
							<Route
								path='/data-access-request/dataset/:datasetId'
								render={props => <DataAccessRequest {...props} userState={userState} />}
							/>
						) : (
							''
						)}
						{userState[0].loggedIn ? (
							<Route
								path='/data-access-request/publisher/:publisherId'
								render={props => <DataAccessRequest {...props} userState={userState} />}
							/>
						) : (
							''
						)}
						{userState[0].loggedIn ? (
							<Route path='/data-access-request/:accessId' render={props => <DataAccessRequest {...props} userState={userState} />} />
						) : (
							''
						)}

						{userState[0].loggedIn ? <Route path='/account' render={props => <Account {...props} userState={userState} />} /> : ''}
						{userState[0].loggedIn ? (
							<Route path='/addcollection' render={props => <AddCollectionPage {...props} userState={userState} />} />
						) : (
							''
						)}
						{userState[0].loggedIn ? (
							<Route path='/editcollection/:collectionID' render={props => <EditCollectionPage {...props} userState={userState} />} />
						) : (
							''
						)}
						<Route path='/collection/:collectionID' render={props => <CollectionPage {...props} userState={userState} />} />

						{userState[0].loggedIn ? <Route path='/tool/add' render={props => <AddEditToolPage {...props} userState={userState} />} /> : ''}
						{userState[0].loggedIn ? (
							<Route path='/tool/edit/:toolID' render={props => <AddEditToolPage {...props} userState={userState} isEdit='true' />} />
						) : (
							''
						)}
						<Route path='/tool/:toolID' render={props => <ToolPage {...props} userState={userState} />} />

						{userState[0].loggedIn ? (
							<Route path='/project/add' render={props => <AddEditProjectPage {...props} userState={userState} />} />
						) : (
							''
						)}
						{userState[0].loggedIn ? (
							<Route
								path='/project/edit/:projectID'
								render={props => <AddEditProjectPage {...props} userState={userState} isEdit='true' />}
							/>
						) : (
							''
						)}
						<Route path='/project/:projectID' render={props => <ProjectPage {...props} userState={userState} />} />

						{userState[0].loggedIn ? (
							<Route path='/paper/add' render={props => <AddEditPaperPage {...props} userState={userState} />} />
						) : (
							''
						)}
						{userState[0].loggedIn ? (
							<Route path='/paper/edit/:paperID' render={props => <AddEditPaperPage {...props} userState={userState} isEdit='true' />} />
						) : (
							''
						)}
						<Route path='/paper/:paperID' render={props => <PaperPage {...props} userState={userState} />} />

						{userState[0].loggedIn ? (
							<Route path='/course/add' render={props => <AddEditCoursePage {...props} userState={userState} />} />
						) : (
							''
						)}
						{userState[0].loggedIn ? (
							<Route path='/course/edit/:courseID' render={props => <AddEditCoursePage {...props} userState={userState} isEdit='true' />} />
						) : (
							''
						)}
						<Route path='/course/:courseID' render={props => <CoursePage {...props} userState={userState} />} />

						{/* Catch all path */}
						<Redirect to='/search?search=' />
					</Switch>
				</div>
				<Footer />
			</Router>
		);
	}
}
export default HDRRouter;
