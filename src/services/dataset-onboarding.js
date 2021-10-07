import { useMutation, useQuery } from 'react-query';
import { apiURL } from '../configs/url.config';
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '../utils/requests';

const getDatasetOnboardings = options => {
	return getRequest(`${apiURL}/dataset-onboarding`, options);
};

const getDatasetOnboarding = (_id, options) => {
	return getRequest(`${apiURL}/dataset-onboarding/${_id}`, options);
};

const postDatasetOnboarding = (_id, data, options) => {
	return postRequest(`${apiURL}/dataset-onboarding/${_id}`, data, options);
};

const putDatasetOnboarding = (_id, data, options) => {
	return putRequest(`${apiURL}/dataset-onboarding/${_id}`, data, options);
};

const patchDatasetOnboarding = (_id, data, options) => {
	return patchRequest(`${apiURL}/dataset-onboarding/${_id}`, data, options);
};

const deleteDatasetOnboarding = (_id, options) => {
	return deleteRequest(`${apiURL}/dataset-onboarding/delete/${_id}`, options);
};

const useGetDatasetOnboardings = (requestOptions, queryOptions = { queryKey: 'getDatasetOnboardings' }) => {
	return useQuery({
		...queryOptions,
		queryFn: _id => getDatasetOnboardings(requestOptions),
	});
};

export const useGetDatasetOnboarding = (requestOptions, queryOptions = { queryKey: 'getDatasetOnboarding' }) => {
	return useQuery({
		...queryOptions,
		queryFn: _id => getDatasetOnboarding(_id, requestOptions),
	});
};

const usePostDatasetOnboarding = (requestOptions, mutateOptions = { queryKey: 'postDatasetOnboarding' }) => {
	return useMutation((_id, data) => postDatasetOnboarding(_id, data, requestOptions), {
		mutateOptions,
	});
};

const usePutDatasetOnboarding = (requestOptions, mutateOptions = { queryKey: 'putDatasetOnboarding' }) => {
	return useMutation((_id, data) => putDatasetOnboarding(_id, data, requestOptions), {
		mutateOptions,
	});
};

const usePatchDatasetOnboarding = (requestOptions, mutateOptions = { queryKey: 'patchDatasetOnboarding' }) => {
	return useMutation((_id, data) => patchDatasetOnboarding(_id, data, requestOptions), {
		mutateOptions,
	});
};

export const useDeleteDatasetOnboarding = (requestOptions, queryOptions = { queryKey: 'deleteDatasetOnboarding' }) => {
	return useQuery({
		...queryOptions,
		queryFn: _id => deleteDatasetOnboarding(_id, requestOptions),
	});
};

export default {
	getDatasetOnboardings,
	getDatasetOnboarding,
	postDatasetOnboarding,
	putDatasetOnboarding,
	patchDatasetOnboarding,
	deleteDatasetOnboarding,
	useGetDatasetOnboardings,
	useGetDatasetOnboarding,
	usePostDatasetOnboarding,
	usePutDatasetOnboarding,
	usePatchDatasetOnboarding,
	useDeleteDatasetOnboarding,
};
