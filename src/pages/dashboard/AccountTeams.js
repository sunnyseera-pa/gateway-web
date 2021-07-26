import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Loading from '../commonComponents/Loading';
import { baseURL } from '../../configs/url.config';
import { tabTypes } from './Team/teamUtil';
import './Dashboard.scss';
import TeamInfo from './Team/TeamInfo';

const AccountTeams = ({ onTeamsTabChange }) => {

	// state
	const [isLoading, setLoading] = useState(false);
	const [teams, setTeams] = useState();
	const [teamManagersIds, setTeamManagersIds] = useState();
	const [activeTabKey, setActiveTab] = useState(tabTypes.Teams);
	let history = useHistory();

	// functions
	const onTabChange = key => {
		onTeamsTabChange(key);
		setActiveTab(key);
	};

	const getTeams = () => {
		setLoading(true);
		axios
			.get(`${baseURL}/api/v1/teams`)
			.then(res => {
				let teams = res.data.teams;
				let teamManagersIds = [];
				teams.map((team, index) => {
					if (team.members.length > 0) {
						team.members
							.filter(member => member.roles.includes('manager'))
							.map(memberId => {
								teamManagersIds.push(memberId.memberid);
							});
					}
				});
				setTeams(teams);
				setTeamManagersIds(teamManagersIds);
				setLoading(false);
			})
			.catch(err => {
				setLoading(false);
				console.error(err.message);
			});
	};
	// lifecycle hook
	useEffect(() => {
		// only call get teamNotifications on tab change
		if (activeTabKey === tabTypes.Teams) getTeams();
	}, [activeTabKey]);

	if (isLoading) {
		return (
			<Row>
				<Col xs={1}></Col>
				<Col xs={10}>
					<Loading data-testid='isLoading' />
				</Col>
				<Col xs={1}></Col>
			</Row>
		);
	}

	return (
		<Fragment>
			<Row>
				<Col xs={1}></Col>
				<div className='col-sm-10'>
					<div className='accountHeader dataAccessHeader'>
						<Col xs={8}>
							<Row>
								<div className='black-20'>Teams</div>
								<div className='gray700-14'>Organise and manage team members and the teams email notifications.</div>
							</Row>
						</Col>
						<Col xs={4} style={{ textAlign: 'right' }}></Col>
					</div>
					<div className='tabsBackground'>
						<Row className='subHeader mt-3 gray800-14-bold'>
							<Col xs={2}>Updated</Col>
							<Col xs={3}>Data custodian</Col>
							<Col xs={3}>Team manager(s)</Col>
							<Col xs={2}>Members</Col>
                            <Col xs={2}></Col>
						</Row>
						<Row>
							<Col sm={12} lg={12}>
								{teams &&
									teams.length > 0 &&
									teams.map((team, index) => {
										return (
											<TeamInfo
												updatedAt={team.updatedAt}
												publisherName={team.publisher.name}
												teamManagers={team.users.filter(user => teamManagersIds.includes(user._id))}
												membersCount={team.membersCount}
											/>
										);
									})}
							</Col>
						</Row>
					</div>
				</div>
				{/*CLOSE col-sm-10 */}
				<Col xs={1}></Col>
			</Row>
		</Fragment>
	);
};

export default AccountTeams;
