import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import './CookiePage.scss';
import { Container } from 'react-bootstrap';
import SearchBar from '../commonComponents/searchBar/SearchBar';
import Loading from '../commonComponents/Loading';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../commonComponents/userMessages/UserMessages';
import DataSetModal from '../commonComponents/dataSetModal/DataSetModal';

class CookiePage extends React.Component {
	state = {
		userState: [],
		isLoading: true,
		showDrawer: false,
		showModal: false,
		context: {},
		wpData: undefined,
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
				this.setState({ errorMessage: error.message });
				console.error('There was an error!', error);
			});

		await axios
			.get('https://icoda-research.org/icoda-gateway/', { withCredentials: false })
			.then(res => {
				this.setState({
					wpData: res.data,
				});
			})
			.catch(error => {
				this.setState({ errorMessage: error.message });
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
	render() {
		const { userState, showDrawer, showModal, context, isLoading, wpData } = this.state;
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
					doSearchMethod={this.doSearch}
					doUpdateSearchString={this.updateSearchString}
					doToggleDrawer={this.toggleDrawer}
					userState={userState}
				/>
				<div className='cookie-page-header'>
					<div className='cookie-page-header-title'>ICODA Gateway</div>
				</div>
				<div className='cookie-page-button text-center'>
					<Button
						className='addButton'
						onClick={e => {
							window.location.href = `/search?search=&tab=Collections`;
						}}>
						Search for datasets
					</Button>
				</div>
				<div className='collection-rectangle cookie-page-body'>
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
