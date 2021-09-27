import React, { useState, useEffect } from 'react';
import Data from './Data.json';
import About from './About';
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
	const [data, setData] = useState([]);
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
			axios.get(baseURL + '/api/v2/data-use-registers/' + props.match.params.datauseID).then(res => setData(res.data));
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
				<Row className='datause-card datatuse-summary'>
					<div>
						<p className='black-20-semibold'>{data && data.projectTitle}</p>
						<p className='black-16-semibold'>{data && data.organisationName}</p>
					</div>

					<div>
						<span className='badge-datause badge-tag badge-datause-bold'>
							<SVGIcon name='datauseicon' width={12} height={12} fill={'#fff'} /> Data use
						</span>
						{data &&
							data.keywords &&
							data.keywords.map(keyword => (
								<a href={`/search?search=&datasetfeatures=${keyword}&tab=Datasets`} className='badge-tag badge-datause-bold'>
									{keyword}
								</a>
							))}
					</div>
				</Row>

				<Tabs defaultActiveKey='About' className='gray700-13 data-use-tabs'>
					{tabs.map(tabName => (
						<Tab eventKey={tabName} title={tabName}>
							{tabName === 'About' && <About data={data} renderTooltip={renderTooltip} />}
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
