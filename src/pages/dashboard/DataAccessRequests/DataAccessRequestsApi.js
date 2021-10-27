import axios from 'axios';

export const getDataAccessRequests = async (team) => {

	console.log("Backend Call");
	const response = await axios.get('http://localhost:3001/api/v1/data-access-request/team/' + team)
	// testCreateCsv(response.data.dars);

	return response.data.dars;
}
