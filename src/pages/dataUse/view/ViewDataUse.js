import React, { useState } from 'react';
import Data from './Data.json';
import About from './About';
import RelatedResources from './RelatedResources';
import SearchBar from '../../commonComponents/searchBar/SearchBar';
import { Row, Container, Tab, Tabs, Button } from 'react-bootstrap';

const View = ({ ...props }) => {
	const [searchBar] = useState(React.createRef());
	const [searchString, setSearchString] = useState('');
	const [showDrawer, setShowDrawer] = useState(false);
	const [userState] = useState(
		props.userState || [
			{
				loggedIn: false,
				role: 'User',
				id: null,
				name: null,
			},
		]
	);

	const doSearch = e => {
		//fires on enter on searchbar
		if (e.key === 'Enter') window.location.href = `/search?search=${encodeURIComponent(searchString)}`;
	};

	const updateSearchString = searchString => {
		setSearchString(searchString);
	};

	const toggleDrawer = () => {
		if (showDrawer === true) {
			searchBar.current.getNumberOfUnreadMessages();
		}
		setShowDrawer(!showDrawer);
	};

	const tabs = ['About', 'Discussion', 'Related resources', 'Collections'];

	return (
		<div>
			<SearchBar
				ref={searchBar}
				searchString={searchString}
				doSearchMethod={doSearch}
				doUpdateSearchString={updateSearchString}
				userState={userState}
				doToggleDrawer={toggleDrawer}
			/>
			<Container className='datause-view'>
				<Row className='datause-card'>Summary section</Row>

				<Tabs defaultActiveKey='About' classNameclassName='gray700-13 data-use-tabs'>
					{tabs.map(tabName => (
						<Tab eventKey={tabName} title={tabName}>
							{tabName === 'About' && <About data={Data.filter(a => a.tab === 'About')} />}
							{tabName === 'Related resources' && <RelatedResources data={Data.filter(a => a.tab === 'Related resources')} />}
						</Tab>
					))}
				</Tabs>
			</Container>
			<Row className='datause-card'>
				<Button>Add to collection</Button>
			</Row>
		</div>
	);
};

export default View;
