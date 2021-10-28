import axios from 'axios';

export const getDataAccessRequests = async (team) => {
	const response = await axios.get('http://localhost:3001/api/v1/data-access-request/team/' + team)
	return response.data.dars;
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
