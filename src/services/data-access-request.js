import { useMutation, useQuery } from 'react-query';
import { apiURL } from '../configs/url.config';
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '../utils/requests';

const getDataAccessRequests = options => {
	return getRequest(`${apiURL}/data-access-request`, options);
};

const getDataAccessRequest = (_id, options) => {
	return getRequest(`${apiURL}/data-access-request/${_id}`, options);
};

const postDataAccessRequest = (_id, data, options) => {
	return postRequest(`${apiURL}/data-access-request/${_id}`, data, options);
};

const putDataAccessRequest = (_id, data, options) => {
	return putRequest(`${apiURL}/data-access-request/${_id}`, data, options);
};

const patchDataAccessRequest = (_id, data, options) => {
	return patchRequest(`${apiURL}/data-access-request/${_id}`, data, options);
};

const deleteDataAccessRequest = (_id, options) => {
	return deleteRequest(`${apiURL}/data-access-request/${_id}`, options);
};

const useGetDataAccessRequests = (requestOptions, queryOptions = { queryKey: 'getDataAccessRequests' }) => {
	return useQuery({
		...queryOptions,
		queryFn: () => getDataAccessRequests(requestOptions),
	});
};

const useGetDataAccessRequest = (requestOptions, queryOptions = { queryKey: 'getDataAccessRequest' }) => {
	return useQuery({
		...queryOptions,
		queryFn: _id => getDataAccessRequest(_id, requestOptions),
	});
};

const usePostDataAccessRequest = (requestOptions, mutateOptions = { queryKey: 'postDataAccessRequest' }) => {
	return useMutation((_id, data) => postDataAccessRequest(_id, data, requestOptions), {
		mutateOptions,
	});
};

const usePutDataAccessRequest = (requestOptions, mutateOptions = { queryKey: 'putDataAccessRequest' }) => {
	return useMutation((_id, data) => putDataAccessRequest(_id, data, requestOptions), {
		mutateOptions,
	});
};

const usePatchDataAccessRequest = (requestOptions, mutateOptions = { queryKey: 'patchDataAccessRequest' }) => {
	return useMutation((_id, data) => patchDataAccessRequest(_id, data, requestOptions), {
		mutateOptions,
	});
};

const useDeleteDataAccessRequest = (requestOptions, queryOptions = { queryKey: 'deleteDataAccessRequest' }) => {
	return useQuery({
		...queryOptions,
		queryFn: _id => deleteDataAccessRequest(_id, requestOptions),
	});
};

export default {
	getDataAccessRequests,
	getDataAccessRequest,
	postDataAccessRequest,
	putDataAccessRequest,
	patchDataAccessRequest,
	deleteDataAccessRequest,
	useGetDataAccessRequests,
	useGetDataAccessRequests,
	useGetDataAccessRequest,
	usePostDataAccessRequest,
	usePutDataAccessRequest,
	usePatchDataAccessRequest,
	useDeleteDataAccessRequest,
};
