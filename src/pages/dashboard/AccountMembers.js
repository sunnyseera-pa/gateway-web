import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'react-bootstrap';
import NotFound from '../commonComponents/NotFound';
import Loading from '../commonComponents/Loading';
import '../../css/styles.scss';
import './Dashboard.scss';
import AccountMembersModal from './AccountMemberModal';
import { initGA } from '../../tracking';

var baseURL = require('../commonComponents/BaseURL').getURL();

export const AccountMembers = props => {
	const [userState] = useState(props.userState);
	const [isLoading, setIsLoading] = useState(true);
	const [members, setMembers] = useState([]);
	const [userIsManager, setUserIsManager] = useState(false);
	const [showAccountAddMemberModal, setShowAccountAddMemberModal] = useState(false);
	const [accountMembersId] = useState(props.teamId);

	useEffect(() => {
		initGA('UA-166025838-1');
		doMembersCall();
	}, []);

	const doMembersCall = async () => {
		if (accountMembersId) {
			setIsLoading(true);
			await axios.get(baseURL + `/api/v1/teams/${accountMembersId}/members`).then(async res => {
				setMembers(res.data.members);
				setUserIsManager(res.data.members.filter(m => m.id === userState[0].id).map(m => m.roles[0] === 'manager')[0]);
			});
		}
		setIsLoading(false);
	};

	const onShowAccountMembersModal = () => {
		setShowAccountAddMemberModal(!showAccountAddMemberModal);
	};

	const onMemberAdded = members => {
		setMembers(members);
	};

	let roles = {
		manager: 'Manager',
		reviewer: 'Reviewer',
		metadata_editor: 'Metadata Editor',
	};

	if (isLoading) {
		return (
			<Row>
				<Col xs={1}></Col>
				<Col xs={10}>
					<Loading />
				</Col>
				<Col xs={1}></Col>
			</Row>
		);
	}

	return (
		<Fragment>
			<Row>
				<Col xs={1}></Col>
				<Col xs={10}>
					<Row className='accountHeader'>
						<Col sm={12} md={9}>
							<Row className=''>
								<span className='black-20'>Members</span>
							</Row>
							<Row>
								<span className='gray700-13'>
									To remove team members or change their roles, please raise a support ticket at the following link:
								</span>
							</Row>
							<Row>
								<span className='purple-13 pad-bottom-24'>
									{' '}
									<a href='https://hdruk.atlassian.net/servicedesk/customer/portal/1'>
										https://hdruk.atlassian.net/servicedesk/customer/portal/1
									</a>
								</span>
							</Row>
							<Row>
								<span className='gray700-13 pad-bottom-24'>
									Managers can; manage members, create and assign workflows, review applications that are assigned to them and make the
									final decision on data access request applications.
								</span>
							</Row>
							<Row>
								<span className='gray700-13'>Reviewers can review applications that are assigned to them.</span>
							</Row>
						</Col>

						<Col sm={12} md={3} style={{ textAlign: 'right' }}>
							{userIsManager ? (
								<Button variant='primary' className='addButton' onClick={e => onShowAccountMembersModal()}>
									+ Add a new member
								</Button>
							) : (
								''
							)}
						</Col>
					</Row>

					{(() => {
						return (
							<div>
								{members.length <= 0 ? (
									''
								) : (
									<Row className='subHeader mt-3 gray800-14-bold'>
										<Col xs={5}>Name</Col>
										<Col xs={4}>Role</Col>
										<Col xs={3}></Col>
									</Row>
								)}
								{members.length <= 0 ? (
									<Row className='margin-right-15'>
										<NotFound word='members' />
									</Row>
								) : (
									members.map(m => {
										return (
											<Row className='entryBox padding-left-20 '>
												<Col sm={12} lg={5}>
													<a href={'/person/' + m.id} className='purple-14'>
														{m.firstname} {m.lastname}
													</a>
													<Row sm={5} lg={5}>
														<Col sm={10} lg={10} className='gray-600-14 ellipsis'>
															{m.organisation ? m.organisation : m.bio}
														</Col>
													</Row>
												</Col>
												<Col sm={4} lg={4} className='black-14'>
													{m.roles.map(n => {
														return (
															<>
																{roles[n]}
																<br />
															</>
														);
													})}
												</Col>
											</Row>
										);
									})
								)}

								<AccountMembersModal
									open={showAccountAddMemberModal}
									close={onShowAccountMembersModal}
									teamId={accountMembersId}
									onMemberAdded={onMemberAdded}></AccountMembersModal>
							</div>
						);
					})()}
				</Col>
				<Col xs={1}></Col>
			</Row>
		</Fragment>
	);
};

export default AccountMembers;
