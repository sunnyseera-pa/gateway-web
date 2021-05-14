import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../commonComponents/CommonComponents.scss';
import { Dropdown } from 'react-bootstrap';
import SVGIcon from '../../../images/SVGIcon';

const baseURL = require('../BaseURL');
const cmsURL = baseURL.getCMSURL();
const env = baseURL.getURLEnv();
const local = 'local';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	<a
		href=''
		ref={ref}
		className='cmsDropdownTitle'
		onClick={e => {
			e.preventDefault();
			onClick(e);
		}}>
		{children}
		<SVGIcon name='chevronbottom' fill={'#475DA7'} className='svg-16' />
	</a>
));

export const CmsDropdown = props => {
	const [dropdownUrl] = useState(props.dropdownUrl);
	const [dropdownLinks, setDropdownLinks] = useState('');

	//componentDidMount - on loading of page detail page
	useEffect(() => {
		let url = env === local ? 'https://uatbeta.healthdatagateway.org' : cmsURL;

		axios
			.get(`${url}/${dropdownUrl}`, { withCredentials: false })

			.then(res => {
				setDropdownLinks(res.data);
			});
	}, []);

	const getDropdownTitle = dropdownUrl => {
		let dropdownUrls = new Map([
			['exploreDropdown', 'Explore'],
			['helpDropdown', 'Help'],
			['usageDataDropdown', 'Usage Data'],
			['aboutUsDropdown', 'About Us'],
		]);

		let dropdownTitle = dropdownUrls.get(dropdownUrl.trim());

		return dropdownTitle;
	};

	return (
		<Dropdown className='cmsDropdown'>
			<Dropdown.Toggle as={CustomToggle}>
				<span className='black-14'>{getDropdownTitle(dropdownUrl)}</span>
			</Dropdown.Toggle>

			{/* <Dropdown.Menu as={CustomMenu} className='desktopLoginMenu'> */}
			<Dropdown.Menu className='cmsDropdownMenu'>
				{dropdownLinks !== '' ? <div dangerouslySetInnerHTML={{ __html: dropdownLinks }} /> : <div className='footerBottom' />}{' '}
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default CmsDropdown;
