import React, { Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Container, Row, Col, Button } from 'react-bootstrap';
import Loading from '../commonComponents/Loading';
import SearchBar from '../commonComponents/searchBar/SearchBar';

class AboutPage extends React.Component {

	doSearch = e => {
		//fires on enter on searchbar
		if (e.key === 'Enter') window.location.href = '/search?search=' + this.state.searchString;
	};

	updateSearchString = searchString => {
		this.setState({ searchString: searchString });
	};

	toggleDrawer = () => {
		this.setState(prevState => {
			if (prevState.showDrawer === true) {
				this.searchBar.current.getNumberOfUnreadMessages();
			}
			return { showDrawer: !prevState.showDrawer };
		});
	};

	state = {
		userState: [],
		footer: '<br/>International COVID-19 Data Alliance Gateway<br/><br/><br/>' +
			'The International COVID-19 Data Alliance (ICODA) Gateway allows you to submit an application to access and analyse data in the ICODA COVID-19 Workbench.<br/>' +
			'<br/>' +
			' <br/>' +

			'You can use the ICODA Gateway to search for datasets that are available through ICODA.  Currently the ICODA Gateway is showing a subset of datasets related to ICODA’s Driver Project 1.  In time we will extend this to datasets available from HDR UK’s Gateway and the COVID-19 Workbench FAIR data services.<br/>' +
			'<br/>' +
			' <br/>' +

			'Once you have identified data that you would like to request access to, you can submit an application.<br/>' +
			'<br/>' +
			' <br/>' +

			'To submit an application, you will need to login to the ICODA Gateway using your LinkedIn ID, Google account or with OpenAthens (UK only).<br/>' +
			'<br/>' +
			' <br/>' +

			'You will then be asked for information about yourself, your research team and your project proposal which will be reviewed to ensure that it meets the ‘five safes’ framework.  ICODA has committed to this approach to ensure that all use of data on the COVID-19 Workbench is responsible, secure and demonstrates trustworthiness.<br/>' +
			'<br/>' +
			' <br/>' +

			'If you have already started working on an application, it will be saved within your profile.<br/><br/>'
		,
		isLoading: true
	};

	constructor(props) {
		super(props);
		this.state.userState = props.userState;
	}

	// async componentDidMount() {
	//     const { t } = this.props;
	// 	axios
	// 		.get(t('aboutPageUrl') , { withCredentials: false })
	// 		.then(res => {
	// 			this.setState({
	// 				footer: res.data,
	// 				isLoading: false,
	// 			});
	// 		})
	// 		.catch(error => {
	// 			this.setState({
	// 				isLoading: false,
	// 			});
	// 		});
	// }

	render() {
		const {
			userState,
			isLoading,
			footer
		} = this.state;

		// if (isLoading) {
		// 	return (
		// 		<Row className='mt-4'>
		// 			<Col xs={1}></Col>
		// 			<Col xs={10}>
		// 				<Loading data-testid='isLoading' />
		// 			</Col>
		// 			<Col xs={1}></Col>
		// 		</Row>
		// 	);
		// }


		return (
			<div>
				<SearchBar
					ref={this.searchBar}
					doSearchMethod={this.doSearch}
					doUpdateSearchString={this.updateSearchString}
					doToggleDrawer={this.toggleDrawer}
					userState={userState}
				/>
				<Container>
					<Row className='accountHeader mt-4'>
						<Col sm={1} lg={1}></Col>
						<Col sm={10} lg={10} className='dashboardPadding'>
							<>{footer !== '' ? <div dangerouslySetInnerHTML={{ __html: footer }} /> : <div />}</></Col>
					</Row>
					<Row className='mt-3'>
						<Col className='text-center'>
							<Link className='text-center' to="/search?search=">
								<Button className='addButton' >SEARCH DATASETS</Button>
							</Link>
						</Col>
					</Row>
					<Col sm={1} lg={10} />
				</Container>

			</div>
		);
	}
}

export default AboutPage;


