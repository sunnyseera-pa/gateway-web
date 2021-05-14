import React, { Fragment, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ReactComponent as ChevronBottom } from '../../../images/chevron-bottom.svg';

const CustomToggleInner = React.forwardRef(({ children, onClick }, ref) => (
	<a
		href=''
		ref={ref}
		onClick={e => {
			e.preventDefault();
			onClick(e);
		}}
		className='dropdown-sub-menu'>
		{children}
	</a>
));

const CustomSubMenu = React.forwardRef(({ children, style, className, show, 'aria-labelledby': labeledBy }, ref) => {
	const [value] = useState('');
	if (show) {
		return (
			<Fragment ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
				<ul className='list-unstyled'>
					{React.Children.toArray(children).filter(child => !value || child.props.children.toLowerCase().startsWith(value))}
				</ul>
			</Fragment>
		);
	}
});

const UserDropdownTeams = props => {
	const [teams, setTeams] = useState(props.teams);

	const userHasRole = (teamId, role) => {
		const team = teams.filter(t => {
			return t._id === teamId;
		})[0];
		return team && team.roles.some(r => role.includes(r));
	};

	return teams.map(team => {
		return (
			<Fragment>
				<Dropdown.Divider className='mb-1 mt-1' />
				<Dropdown>
					<Dropdown.Toggle as={CustomToggleInner}>
						<span className='black-14'>{team.type === 'admin' ? 'HDR Admin' : team.name}</span>
						<span className='addNewDropDownGap'></span>
						<ChevronBottom />
					</Dropdown.Toggle>
					<Dropdown.Menu as={CustomSubMenu}>
						{team.type === 'admin' ? (
							<Dropdown.Item href={`/account?tab=datasets&team=${team._id}`} className='black-14 user-dropdown-item'>
								Datasets
							</Dropdown.Item>
						) : (
							<Fragment>
								<Dropdown.Item href={`/account?tab=teamManagement&team=${team._id}`} className='black-14 user-dropdown-item'>
									Team Management
								</Dropdown.Item>
								{userHasRole(team._id, ['manager', 'reviewer']) ? (
									<Dropdown.Item href={`/account?tab=dataaccessrequests&team=${team._id}`} className='black-14 user-dropdown-item'>
										Data access requests
									</Dropdown.Item>
								) : (
									''
								)}
								{userHasRole(team._id, ['manager', 'metadata editor']) ? (
									<Dropdown.Item href={`/account?tab=datasets&team=${team._id}`} className='black-14 user-dropdown-item'>
										Datasets
									</Dropdown.Item>
								) : (
									''
								)}
								<Dropdown.Item href={`/account?tab=help&team=${team._id}`} className='black-14 user-dropdown-item'>
									Help
								</Dropdown.Item>
							</Fragment>
						)}
					</Dropdown.Menu>
				</Dropdown>
			</Fragment>
		);
	});
};

export default UserDropdownTeams;
