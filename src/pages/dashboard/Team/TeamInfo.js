import React from 'react';
import { Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import moment from 'moment';

const TeamInfo = ({ updatedAt, publisherName, teamManagers, membersCount }) => {
	return (
		<div className='tm-notification'>
			<Row className='entryBox'>
				<Col className='pt-2 gray800-14' sm={2} lg={2}>
					{moment(updatedAt).format('D MMMM YYYY HH:mm')}
				</Col>
				<Col sm={3} lg={3} className='pt-2 gray800-14'>
					{publisherName}
				</Col>
				<Col sm={3} lg={3} className='pt-2 gray800-14'>
					{teamManagers &&
						teamManagers.length > 0 &&
						teamManagers.map(teamManager => {
							return <div>{teamManager.firstname + ' ' + teamManager.lastname + ', '}</div>;
						})}
				</Col>
				<Col sm={2} lg={2} className='pt-2 gray800-14'>
					{membersCount}
				</Col>
				<Col sm={2} lg={2} className='pt-2'>
					<DropdownButton variant='outline-secondary' alignRight title='Actions' className='floatRight'>
						<Dropdown.Item href={''} className='black-14'>
							Edit
						</Dropdown.Item>
					</DropdownButton>
				</Col>
			</Row>
		</div>
	);
};

export default TeamInfo;
