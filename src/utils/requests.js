const getRequest = (url, options) => {
	return axios.get(url, options);
};

const postRequest = (url, data, options) => {
	return axios.post(url, data, options);
};

const putRequest = (url, data, options) => {
	return axios.put(url, data, options);
};

const patchRequest = (url, data, options) => {
	return axios.patch(url, data, options);
};

const deleteRequest = (url, options) => {
	return axios.delete(url, options);
};

export default {
	getRequest,
	postRequest,
	putRequest,
	patchRequest,
	deleteRequest,
};
