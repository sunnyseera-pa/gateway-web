import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import Loading from '../commonComponents/Loading';
import { baseURL } from '../../configs/url.config';
import { tabTypes } from './Team/teamUtil';
import './Dashboard.scss';
import TeamInfo from './Team/TeamInfo';
import _ from 'lodash';

const maxResult = 40;

const AccountTeams = () => {
	// state
	const [isLoading, setLoading] = useState(false);
	const [teams, setTeams] = useState();
	const [teamsCount, setTeamsCount] = useState(0);
	const [activeIndex, setActiveIndex] = useState(0);
	const [teamManagersIds, setTeamManagersIds] = useState();
	const [activeTabKey, setActiveTab] = useState(tabTypes.Teams);

	const handlePaginatedItems = () => {
		// Returns the related resources that have the same object type as the current active tab and performs a chunk on them to ensure each page returns 24 results
		let paginatedItems = _.chunk(teams, maxResult);
		// If there are items to show based on search results, display them on the currently active page
		if (paginatedItems.length > 0) {
			return paginatedItems[activeIndex];
		} else {
			return [];
		}
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
				setTeamsCount(teams.length);
				setTeamManagersIds(teamManagersIds);
				setLoading(false);
			})
			.catch(err => {
				setLoading(false);
				console.error(err.message);
			});
	};

    let paginationItems = [];
	for (let i = 1; i <= Math.ceil(teamsCount / maxResult); i++) {
		paginationItems.push(
			<Pagination.Item
				key={i}
				active={i === activeIndex + 1}
				onClick={e => {
					setActiveIndex(i - 1)
				}}>
				{i}
			</Pagination.Item>
		);
	}
	// lifecycle hook
	useEffect(() => {
		// only call get teams on tab change
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
					<Row className='accountHeader'>
						<Col sm={12} md={8}>
							<Row>
								<span className='black-20'>Teams</span>
							</Row>
							<Row>
								<span className='gray700-13 '>Organise and manage team members and the teams email notifications.</span>
							</Row>
						</Col>
						<Col sm={12} md={4} style={{ textAlign: 'right' }}>
							<Button
								data-test-id='add-team-btn'
								variant='primary'
								href=''
								className='addButton'
								// TODO - Add Teams onClick={}
                                >
								+ Add a new team
							</Button>
						</Col>
					</Row>
					<Row className='subHeader mt-3 gray800-14-bold'>
						<Col sm={2}>Updated</Col>
						<Col sm={3}>Data custodian</Col>
						<Col sm={3}>Team manager(s)</Col>
						<Col sm={2}>Members</Col>
						<Col sm={2}></Col>
					</Row>
					<Row>
						<Col sm={12} lg={12}>
							{teams &&
								teams.length > 0 &&
								handlePaginatedItems().map(team => {
									return (
										<TeamInfo
											updatedAt={team.updatedAt}
											publisherName={team.publisher.name}
											teamManagers={team.users.filter(user => teamManagersIds.includes(user._id))}
											membersCount={team.membersCount}
										/>
									);
								})}
							<div className='text-center entityDashboardPagination'>
								{teamsCount > maxResult ? <Pagination>{paginationItems}</Pagination> : ''}
							</div>
						</Col>
					</Row>
				</div>
				<Col xs={1}></Col>
			</Row>
		</Fragment>
	);
};

export default AccountTeams;
