import axios from 'axios';

export const getDataAccessRequests = async (team) => {
	const response = await axios.get('http://localhost:3001/api/v1/data-access-request/team/' + team)
	return response.data.dars;
}
