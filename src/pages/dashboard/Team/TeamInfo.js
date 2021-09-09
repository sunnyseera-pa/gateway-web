import React from 'react';
import { Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import moment from 'moment';

const TeamInfo = ({ updatedAt, publisher, teamManagers, membersCount, editTeam }) => {
	let teamManagerNames = '';
	return (
		<Row className='entryBox gray800-14'>
			<Col sm={12} lg={2}>
				{moment(updatedAt).format('D MMMM YYYY HH:mm')}
			</Col>
			<Col sm={12} lg={3}>
				{publisher.name}
			</Col>
			<Col sm={12} lg={3}>
				{teamManagers &&
					teamManagers.length > 0 &&
					teamManagers.map((teamManager, index) => {
						teamManagerNames += teamManager.firstname + ' ' + teamManager.lastname + (teamManagers.length === index + 1 ? '' : ', ');
					})}
				<p className='gray800-14'>{teamManagerNames ? teamManagerNames.substr(0, 35) + (teamManagerNames.length > 35 ? '...' : '') : ''}</p>
			</Col>
			<Col sm={12} lg={2}>
				<p>{membersCount}</p>
			</Col>
			<Col sm={12} lg={2}>
				<DropdownButton variant='outline-secondary' alignRight title='Actions' className='floatRight'>
					<Dropdown.Item onClick={() => editTeam(publisher, teamManagers)} className='black-14'>
						Edit
					</Dropdown.Item>
				</DropdownButton>
			</Col>
		</Row>
	);
};

export default TeamInfo;
