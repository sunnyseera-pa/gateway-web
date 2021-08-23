import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import SearchBar from '../commonComponents/searchBar/SearchBar';
import Loading from '../commonComponents/Loading';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../commonComponents/userMessages/UserMessages';
import DataSetModal from '../commonComponents/dataSetModal/DataSetModal';
import './AboutPage.scss';

class CookiePage extends React.Component {
	state = {
		userState: [],
		isLoading: true,
		showDrawer: false,
		showModal: false,
		context: {},
		wpData: undefined,
		searchString: '',
	};

	constructor(props) {
		super(props);
		this.state.userState = props.userState;
		this.searchBar = React.createRef();
	}

	async componentDidMount() {
		axios
			.head('', { withCredentials: false })
			.then(res => {
				this.setState({
					isLoading: false,
				});
			})
			.catch(error => {
				console.error(error.message);
			});

		await axios
			.get('https://icoda-research.org/gateway-cookie-poliy/', { withCredentials: false })
			.then(res => {
				this.setState({
					wpData: res.data,
				});
			})
			.catch(error => {
				console.error('There was an error!', error);
			});
	}
	toggleDrawer = () => {
		this.setState(prevState => {
			if (prevState.showDrawer === true) {
				this.searchBar.current.getNumberOfUnreadMessages();
			}
			return { showDrawer: !prevState.showDrawer };
		});
	};

	toggleModal = (showEnquiry = false, context = {}) => {
		this.setState(prevState => {
			return { showModal: !prevState.showModal, context, showDrawer: showEnquiry };
		});
	};
	doSearch = e => {
		//fires on enter on searchbar
		if (e.key === 'Enter') window.location.href = '/search?search=' + this.state.searchString;
	};
	updateSearchString = searchString => {
		this.setState({ searchString: searchString });
	};
	render() {
		const { userState, showDrawer, showModal, context, isLoading, wpData, searchString } = this.state;
		if (isLoading) {
			return (
				<Container>
					<Loading />
				</Container>
			);
		}
		return (
			<div className='searchTabsHolder'>
				<SearchBar
					ref={this.searchBar}
					searchString={searchString}
					doSearchMethod={this.doSearch}
					doUpdateSearchString={this.updateSearchString}
					userState={userState}
					doToggleDrawer={this.toggleDrawer}
				/>
				<div className='about-page-header'>
					<div className='about-page-header-title'>ICODA Gateway</div>
				</div>
				<div className='about-page-button text-center'>
					<Button
						className='addButton'
						onClick={e => {
							window.location.href = `/search?search=&tab=Collections`;
						}}>
						Search for datasets
					</Button>
				</div>
				<div className='collection-rectangle about-page-body'>
					<div className='pad-left-24 pad-right-24 pad-top-24 pad-bottom-16 col-lg-12 col-sm-12' />
					<div className='wpData' dangerouslySetInnerHTML={{ __html: wpData }} />
				</div>

				<SideDrawer open={showDrawer} closed={this.toggleDrawer}>
					<UserMessages
						userState={userState[0]}
						closed={this.toggleDrawer}
						toggleModal={this.toggleModal}
						drawerIsOpen={this.state.showDrawer}
					/>
				</SideDrawer>

				<DataSetModal open={showModal} context={context} closed={this.toggleModal} userState={userState[0]} />
			</div>
		);
	}
}

export default CookiePage;
