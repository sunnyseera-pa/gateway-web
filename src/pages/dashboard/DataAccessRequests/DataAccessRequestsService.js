import axios from 'axios';
import { getURL as getBaseUrl } from '../../commonComponents/BaseURL';

export const getDataAccessRequests = async (team) => {
	const url = `${getBaseUrl()}/api/v1/publishers/team/${team}/dar`;
	const response = await axios.get(url)		
	return response.data.data;
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
