import React, { useState } from 'react';
import Data from './Data.json';
import About from './About';
import RelatedResources from './RelatedResourcesDataUse';
import SearchBar from '../../commonComponents/searchBar/SearchBar';
import { Row, Container, Tab, Tabs, Button } from 'react-bootstrap';
import SVGIcon from '../../../images/SVGIcon';

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

	const mockDataAbout = Data.filter(a => a.tab === 'About');
	const mockDataRelatedResource = Data.filter(a => a.tab === 'Related resources');

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
				<Row className='datause-card'>
					{mockDataAbout.map(a => (
						<div>
							<p className='black-20-semibold'>{a.title}</p>
							<p className='black-16-semibold'>{a.org}</p>
						</div>
					))}
					{mockDataRelatedResource.map(a => (
						<div>
							<span className='badge-datause badge-tag badge-datause-bold'>
								<SVGIcon name='datauseicon' width={12} height={12} fill={'#fff'} /> {a.keywordType}
							</span>
							{a.keywords.map(a => (
								<a href={`/search?search=&datasetfeatures=${a}&tab=Datasets`} className='badge-tag badge-datause-bold'>
									{a}
								</a>
							))}
						</div>
					))}
				</Row>

				<Tabs defaultActiveKey='About' className='gray700-13 data-use-tabs'>
					{tabs.map(tabName => (
						<Tab eventKey={tabName} title={tabName}>
							{tabName === 'About' && <About data={mockDataAbout} />}
							{tabName === 'Related resources' && <RelatedResources data={mockDataRelatedResource} />}
						</Tab>
					))}
				</Tabs>
			</Container>
			<Row className='datause-card datause-bottombanner'>
				<Button className='datause-addcollection'>Add to collection</Button>
			</Row>
		</div>
	);
};

export default View;
