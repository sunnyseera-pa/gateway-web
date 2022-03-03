/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typeahead from '../../../components/Typeahead/Typeahead';
import serviceUsers from '../../../services/users/users';
import serviceAuth from '../../../services/auth/auth';
import UploaderUtil from '../../../utils/Uploader.util';
import Icon from '../../../components/Icon';
import * as styles from './AsyncTypeAheadUsers.styles';

function AsyncTypeAheadUsers(props) {
	const [isLoading, setIsLoading] = useState(false);
	const [options, setOptions] = useState([]);
	const [selected, setSelected] = useState([]);
	const [showIcon, setShowIcon] = useState(true);
	const [currentUserInfo, setCurrentUserInfo] = useState([]);

	useEffect(() => {
		getCurrentUserInfo();
		props.selectedUsers && props.getUsersInfo ? getUsersInfo(props.selectedUsers) : setSelected(props.selectedUsers);
	}, [props.selectedUsers]);

	const getCurrentUserInfo = async () => {
		const res = await serviceAuth.getStatus();
		let userData = res.data.data[0];
		userData.name = `${userData.name} (You)`;
		setCurrentUserInfo(userData);
	};

	const getUsersInfo = async contributors => {
		const selectedUsers = await Promise.all(
			contributors.map(async id => {
				const userInfo = await UploaderUtil.getUserInfo(id);
				return userInfo
					? { id: userInfo.id, name: `${userInfo.firstname} ${userInfo.lastname} ${id == props.currentUserId ? '(You)' : ''}` }
					: { id: 123, name: 'null' };
			})
		);
		setSelected(selectedUsers);
	};

	const handleSearch = async query => {
		setIsLoading(true);
		const locations = await serviceUsers.getUsers();
		const { data } = locations.data;
		// if (data) {
		// 	const options = data.map(i => ({
		// 		location: i.location,
		// 		hierarchy: i.hierarchy,
		// 	}));
		// 	setOptions(options);
		// }
		setIsLoading(false);
	};

	const handleChange = options => {
		if (props.showAuthor) {
			props.changeHandler(options);
		} else {
			props.changeHandler(options);
			if (options.length) {
				setSelected(options);
				props.changeHandler(options);
			} else {
				setSelected([]);
				props.changeHandler([]);
			}
		}
	};

	const handleInputChange = value => {
		value ? setShowIcon(false) : setShowIcon(true);
	};

	const handleOnFocus = async () => {
		const response = await serviceUsers.getUsers();
		const { data } = response.data;
		const users = data.slice(0, 10);
		setOptions(users);
	};
	const filterBy = () => true;

	return (
		<Typeahead
			css={styles.root(showIcon)}
			filterBy={filterBy}
			data-testid='async-location'
			id='async-location'
			isLoading={isLoading}
			labelKey='name'
			// minLength={3}
			placeholder='Recently added'
			onSearch={handleSearch}
			onFocus={handleOnFocus}
			onChange={handleChange}
			onInputChange={handleInputChange}
			options={options}
			selected={selected}
			iconPrepend={<Icon name='search' size='xl' fill='purple' />}
			multiple
			renderMenuItemChildren={({ id, name }, props, index) => (
				<div class='menu'>
					<span className='name' data-testid={`name-${index}`}>
						{name}
					</span>
				</div>
			)}
		/>
	);
}

AsyncTypeAheadUsers.propTypes = {
	selectedUsers: PropTypes.array,
	showAuthor: PropTypes.bool,
	getUsersInfo: PropTypes.bool,
	changeHandler: PropTypes.func,
	currentUserId: PropTypes.number,
};
AsyncTypeAheadUsers.defaultProps = {
	selectedUsers: [],
	showAuthor: false,
	getUsersInfo: false,
};

export default AsyncTypeAheadUsers;
