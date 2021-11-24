import { useMutation, useQuery } from 'react-query';
import { apiURL } from '../../configs/url.config';
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '../../utils/requests';

const getDatasetOnboardings = options => {
	return getRequest(`${apiURL}/dataset-onboarding`, options);
};

const getDatasetOnboarding = (_id, options) => {
	return getRequest(`${apiURL}/dataset-onboarding/${_id}`, options);
};

const getPublisher = (_id, options) => {
	console.log(`${apiURL}/dataset-onboarding/publisher/${_id}`, options);
	return getRequest(`${apiURL}/dataset-onboarding/publisher/${_id}`, options);
};

const postDatasetOnboarding = (data, options) => {
	return postRequest(`${apiURL}/dataset-onboarding`, data, options);
};

const postDuplicate = (_id, data, options) => {
	return postRequest(`${apiURL}/dataset-onboarding/duplicate/${_id}`, data, options);
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
		queryFn: () => getDatasetOnboardings(requestOptions),
	});
};

const useGetDatasetOnboarding = (requestOptions, queryOptions = { queryKey: 'getDatasetOnboarding' }) => {
	return useQuery({
		...queryOptions,
		queryFn: _id => getDatasetOnboarding(_id, requestOptions),
	});
};

const useGetPublisher = (publisherId, requestOptions, mutateOptions = { queryKey: 'getPublisher' }) => {
	const _id = Array.isArray(publisherId) ? publisherId[0] : publisherId;

	return useMutation(params => getPublisher(_id, { params }, requestOptions), {
		mutateOptions,
	});
};

const usePostDatasetOnboarding = (data, requestOptions, queryOptions = { queryKey: 'postDatasetOnboarding' }) => {
	console.log(data, requestOptions);

	return useQuery({
		...queryOptions,
		queryFn: () => postDatasetOnboarding(data, requestOptions),
	});
};

const usePostDuplicate = (requestOptions, mutateOptions = { queryKey: 'postDuplicate' }) => {
	return useMutation((_id, data) => postDuplicate(_id, data, requestOptions), {
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

const useDeleteDatasetOnboarding = (requestOptions, queryOptions = { queryKey: 'deleteDatasetOnboarding' }) => {
	return useQuery({
		...queryOptions,
		queryFn: _id => deleteDatasetOnboarding(_id, requestOptions),
	});
};

export default {
	getDatasetOnboardings,
	getDatasetOnboarding,
	getPublisher,
	postDatasetOnboarding,
	postDuplicate,
	putDatasetOnboarding,
	patchDatasetOnboarding,
	deleteDatasetOnboarding,
	useGetDatasetOnboardings,
	useGetDatasetOnboarding,
	useGetPublisher,
	usePostDatasetOnboarding,
	usePostDuplicate,
	usePutDatasetOnboarding,
	usePatchDatasetOnboarding,
	useDeleteDatasetOnboarding,
};
