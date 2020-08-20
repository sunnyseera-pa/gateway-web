import React, { Component } from 'react';
import { Row, Col, Container, Alert } from 'react-bootstrap';
import SearchBar from '../commonComponents/SearchBar';
import axios from 'axios';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../commonComponents/userMessages/UserMessages';
import DataSetModal from '../commonComponents/dataSetModal/DataSetModal';

var baseURL = require('../commonComponents/BaseURL').getURL();

class Unsubscribe extends Component {
	state = {
		isLoading: true,
		userState: [
			{
				loggedIn: false,
				role: 'Reader',
				id: null,
				name: null
			}
		],
		searchString: null,
		msg: '',
		showDrawer: false,
		showModal: false
	};

	constructor(props) {
		super(props);
		this.state.userState = props.userState;
		this.searchBar = React.createRef();
	}

	componentDidMount() {
		this.unsubscribeUser();
	}

	unsubscribeUser = async () => {
		if (this.props.match.params.userObjectID) {
			this.setState({ isLoading: true });
			await axios
				.put(
					baseURL +
						'/api/v1/person/unsubscribe/' +
						this.props.match.params.userObjectID
				)
				.then((response) => {
					this.setState({
						isLoading: false,
						msg: response.data.msg,
						error: false
					});
				})
				.catch((err) => {
					this.setState({
						isLoading: false,
						msg: err.response.data.msg,
						error: true
					});
				});
		} else {
			this.setState({
				isLoading: false,
				msg: 'A problem occurred unsubscribing from email notifications.',
				error: true
			});
		}
	};

	doSearch = (e) => {
		//fires on enter on searchbar
		if (e.key === 'Enter') {
			if (!!this.state.searchString) {
				window.location.href =
					window.location.search + '/search?search=' + this.state.searchString;
			}
		}
	};

	updateSearchString = (searchString) => {
		this.setState({ searchString: searchString });
	};

    toggleDrawer = () => {
        this.setState( ( prevState ) => {
            if(prevState.showDrawer === true) {
                this.searchBar.current.getNumberOfUnreadMessages();
            }
            return { showDrawer: !prevState.showDrawer };
        });
    }

	toggleModal = (showEnquiry = false) => {
		this.setState((prevState) => {
			return { showModal: !prevState.showModal };
		});

		if (showEnquiry) {
			this.toggleDrawer();
		}
	};

	render() {
		const {
			searchString,
			userState,
			error,
			showDrawer,
			showModal
		} = this.state;

		return (
			<div>
				<SearchBar
					ref={this.searchBar}
					searchString={searchString}
					doSearchMethod={this.doSearch}
					doUpdateSearchString={this.updateSearchString}
					doToggleDrawer={this.toggleDrawer}
					userState={userState}
				/>
				<div className='rectangle mt-1'>
					<Container>
						<Row>
							<Col sm={1} lg={1} />
							<Col sm={10} lg={10}>
								<Alert variant={error ? 'danger' : 'success'} className='mt-3'>
									{this.state.msg}
								</Alert>
							</Col>
							<Col sm={1} lg={10} />
						</Row>
					</Container>
					<SideDrawer open={showDrawer} closed={this.toggleDrawer}>
						<UserMessages
							closed={this.toggleDrawer}
							toggleModal={this.toggleModal}
							drawerIsOpen={this.state.showDrawer}
						/>
					</SideDrawer>

					<DataSetModal
						open={showModal}
						closed={this.toggleModal}
						userState={userState[0]}
					/>
				</div>
			</div>
		);
	}
}

export default Unsubscribe;
