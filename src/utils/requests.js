import axios from 'axios';

export const getRequest = (url, options) => {
	return axios.get(url, options);
};

export const postRequest = (url, data, options) => {
	return axios.post(url, data, options);
};

export const putRequest = (url, data, options) => {
	return axios.put(url, data, options);
};

export const patchRequest = (url, data, options) => {
	return axios.patch(url, data, options);
};

export const deleteRequest = (url, options) => {
	return axios.delete(url, options);
};
