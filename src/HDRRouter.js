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
import { GuardedRoute } from './pages/commonComponents/GuardedRoute';

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
						<GuardedRoute path='/data-access-request/dataset/:datasetId' component={DataAccessRequest} userState={userState} />
						<GuardedRoute path='/data-access-request/publisher/:publisherId' component={DataAccessRequest} userState={userState} />
						<GuardedRoute path='/data-access-request/:accessId' component={DataAccessRequest} userState={userState} />
						<GuardedRoute path='/account' component={Account} userState={userState} />
						<GuardedRoute path='/addcollection' component={AddCollectionPage} userState={userState} />
						<GuardedRoute path='/editcollection/:collectionID' component={EditCollectionPage} userState={userState} />
						<GuardedRoute path='/collection/:collectionID' component={CollectionPage} userState={userState} />
						<GuardedRoute path='/tool/add' component={AddEditToolPage} userState={userState} />
						<GuardedRoute path='/tool/edit/:toolID' component={AddEditToolPage} userState={userState} />
						<GuardedRoute path='/tool/:toolID' component={ToolPage} userState={userState} />
						<GuardedRoute path='/project/add' component={AddEditProjectPage} userState={userState} />
						<GuardedRoute path='/project/edit/:projectID' component={AddEditProjectPage} userState={userState} />
						<GuardedRoute path='/project/:projectID' component={ProjectPage} userState={userState} />
						<GuardedRoute path='/paper/add' component={AddEditPaperPage} userState={userState} />
						<GuardedRoute path='/paper/edit/:paperID' component={AddEditPaperPage} userState={userState} />
						<GuardedRoute path='/paper/:paperID' component={PaperPage} userState={userState} />
						<GuardedRoute path='/course/add' component={AddEditCoursePage} userState={userState} />
						<GuardedRoute path='/course/edit/:courseID' component={AddEditCoursePage} userState={userState} />
						<GuardedRoute path='/course/:courseID' component={AddEditCoursePage} userState={userState} />
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
