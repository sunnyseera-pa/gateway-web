import React from 'react';
import { Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import moment from 'moment';

const TeamInfo = ({ updatedAt, publisherName, teamManagers, membersCount }) => {
	return (
		<Row className='entryBox gray800-14'>
			<Col sm={12} lg={2}>
				{moment(updatedAt).format('D MMMM YYYY HH:mm')}
			</Col>
			<Col sm={12} lg={3}>
				{publisherName}
			</Col>
			<Col sm={12} lg={3}>
				{teamManagers &&
					teamManagers.length > 0 &&
					teamManagers.map(teamManager => {
						return <div>{teamManager.firstname + ' ' + teamManager.lastname + ', '}</div>;
					})}
			</Col>
			<Col sm={12} lg={2}>
				{membersCount}
			</Col>
			<Col sm={12} lg={2}>
				<DropdownButton variant='outline-secondary' alignRight title='Actions' className='floatRight'>
					<Dropdown.Item href={''} className='black-14'>
						Edit
					</Dropdown.Item>
				</DropdownButton>
			</Col>
		</Row>
	);
};

export default TeamInfo;
