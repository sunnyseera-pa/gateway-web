import axios from 'axios';
import { getURL as getBaseUrl } from '../../commonComponents/BaseURL';

export const getDataAccessRequests = async (team) => {

	const url = `${getBaseUrl()}/api/v1/data-access-request/publisher/${team}`;
	const response = await axios.get(url)		
	return response.data.dars;
}

export const getAccessRequestsUserDetails = async (userId) => {
	const url = `${getBaseUrl()}/api/v1/data-access-request/${userId}/userDetails`;
	const response = await axios.get(url)
	return response.data;
}

export const isUserManagerofCurrentTeam = (currentTeam, userTeams) => {
	let isManager = false;	

	// find team in userTeamsAndRoles
	for (const team of userTeams) {
	  	if (team.name === currentTeam) {
	  		isManager = team.roles.includes('manager');
	  		break;
	  	}
	}

	return isManager;
}
