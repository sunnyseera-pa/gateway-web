import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { apiURL } from '../configs/url.config';

const getDataAccessRequest = (_id, options) => {
	return axios.get(`${apiURL}/data-access-request/${_id}`, options);
};

const postDataAccessRequest = (_id, data, options) => {
	return axios.post(`${apiURL}/data-access-request/${_id}`, data, options);
};

const putDataAccessRequest = (_id, data, options) => {
	return axios.put(`${apiURL}/data-access-request/${_id}`, data, options);
};

const patchDataAccessRequest = (_id, data, options) => {
	return axios.patch(`${apiURL}/data-access-request/${_id}`, data, options);
};

const deleteDataAccessRequest = (_id, options) => {
	return axios.delete(`${apiURL}/data-access-request/${_id}`, options);
};

const useGetDataAccessRequest = (requestOptions, queryOptions = { queryKey: 'getDataAccessRequest' }) => {
	return useQuery({
		...queryOptions,
		queryFn: id => getDataAccessRequest(id, requestOptions),
	});
};

const usePostDataAccessRequest = (requestOptions, mutateOptions = { queryKey: 'postDataAccessRequest' }) => {
	return useMutation((id, data) => postDataAccessRequest(id, data, requestOptions), {
		mutateOptions,
	});
};

const usePutDataAccessRequest = (requestOptions, mutateOptions = { queryKey: 'putDataAccessRequest' }) => {
	return useMutation((id, data) => putDataAccessRequest(id, data, requestOptions), {
		mutateOptions,
	});
};

const usePatchDataAccessRequest = (requestOptions, mutateOptions = { queryKey: 'patchDataAccessRequest' }) => {
	return useMutation((id, data) => patchDataAccessRequest(id, data, requestOptions), {
		mutateOptions,
	});
};

const useDeleteDataAccessRequest = (requestOptions, queryOptions = { queryKey: 'deleteDataAccessRequest' }) => {
	return useQuery({
		...queryOptions,
		queryFn: id => deleteDataAccessRequest(id, requestOptions),
	});
};

export default {
	getDataAccessRequest,
	postDataAccessRequest,
	putDataAccessRequest,
	patchDataAccessRequest,
	deleteDataAccessRequest,
	useGetDataAccessRequest,
	usePostDataAccessRequest,
	usePutDataAccessRequest,
	usePatchDataAccessRequest,
	useDeleteDataAccessRequest,
};
