import React, { useState, useEffect } from 'react';
import Data from './Data.json';
import About from './About';
import AboutTwo from './AboutTwo';
import RelatedResources from './RelatedResourcesDataUse';
import SearchBar from '../../commonComponents/searchBar/SearchBar';
import { Row, Container, Tab, Tabs, Button, Tooltip } from 'react-bootstrap';
import SVGIcon from '../../../images/SVGIcon';
import axios from 'axios';

var baseURL = require('../../commonComponents/BaseURL').getURL();

const View = ({ ...props }) => {
	const [searchBar] = useState(React.createRef());
	const [searchString, setSearchString] = useState('');
	const [showDrawer, setShowDrawer] = useState(false);
	const [dataAPI, setDataAPI] = useState([]);
	const [userState] = useState(
		props.userState || [
			{
				loggedIn: false,
				role: 'user',
				id: null,
				name: null,
			},
		]
	);

	//baseURL + datause/1

	useEffect(() => {
		const getData = () => {
			//axios.get(baseURL + '/api/v2/data-use-registers/614b43a51a819e12f93c54b7').then(res => setDataAPI(res.data));
			axios.get(baseURL + '/api/v2/data-use-registers/' + props.match.params.datauseID).then(res => setDataAPI(res.data));
		};
		getData();
	}, []);

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

	const renderTooltip = props => (
		<Tooltip className='tool-tip' style={{ width: '240px' }}>
			{props}
		</Tooltip>
	);

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
					<div>
						<p className='black-20-semibold'>{dataAPI && dataAPI.projectTitle}</p>
						<p className='black-16-semibold'>{dataAPI && dataAPI.organisationName}</p>
					</div>

					<div>
						<span className='badge-datause badge-tag badge-datause-bold'>
							<SVGIcon name='datauseicon' width={12} height={12} fill={'#fff'} /> {dataAPI && dataAPI.type}
						</span>
					</div>
					<div>
						{dataAPI &&
							dataAPI.keywords &&
							dataAPI.keywords.map(a => (
								<a href={`/search?search=&datasetfeatures=${a}&tab=Datasets`} className='badge-tag badge-datause-bold'>
									{a}
								</a>
							))}
					</div>
				</Row>

				<Tabs defaultActiveKey='About' className='gray700-13 data-use-tabs'>
					{tabs.map(tabName => (
						<Tab eventKey={tabName} title={tabName}>
							{tabName === 'About' && <AboutTwo dataAPI={dataAPI} renderTooltip={renderTooltip} />}
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
