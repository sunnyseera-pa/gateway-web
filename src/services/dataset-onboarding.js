import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { apiURL } from '../configs/url.config';

const getDatasetOnboardings = options => {
	return axios.get(`${apiURL}/dataset-onboarding`, options);
};

const getDatasetOnboarding = (_id, options) => {
	return axios.get(`${apiURL}/dataset-onboarding/${_id}`, options);
};

const postDatasetOnboarding = (_id, data, options) => {
	return axios.post(`${apiURL}/dataset-onboarding/${_id}`, data, options);
};

const putDatasetOnboarding = (_id, data, options) => {
	return axios.put(`${apiURL}/dataset-onboarding/${_id}`, data, options);
};

const patchDatasetOnboarding = (_id, data, options) => {
	return axios.patch(`${apiURL}/dataset-onboarding/${_id}`, data, options);
};

const deleteDatasetOnboarding = (_id, options) => {
	return axios.delete(`${apiURL}/dataset-onboarding/delete/${_id}`, options);
};

const useGetDatasetOnboardings = (requestOptions, queryOptions = { queryKey: 'getDatasetOnboardings' }) => {
	return useQuery({
		...queryOptions,
		queryFn: id => getDatasetOnboardings(requestOptions),
	});
};

const useGetDatasetOnboarding = (requestOptions, queryOptions = { queryKey: 'getDatasetOnboarding' }) => {
	return useQuery({
		...queryOptions,
		queryFn: id => getDatasetOnboarding(id, requestOptions),
	});
};

const usePostDatasetOnboarding = (requestOptions, mutateOptions = { queryKey: 'postDatasetOnboarding' }) => {
	return useMutation((id, data) => postDatasetOnboarding(id, data, requestOptions), {
		mutateOptions,
	});
};

const usePutDatasetOnboarding = (requestOptions, mutateOptions = { queryKey: 'putDatasetOnboarding' }) => {
	return useMutation((id, data) => putDatasetOnboarding(id, data, requestOptions), {
		mutateOptions,
	});
};

const usePatchDatasetOnboarding = (requestOptions, mutateOptions = { queryKey: 'patchDatasetOnboarding' }) => {
	return useMutation((id, data) => patchDatasetOnboarding(id, data, requestOptions), {
		mutateOptions,
	});
};

const useDeleteDatasetOnboarding = (requestOptions, queryOptions = { queryKey: 'deleteDatasetOnboarding' }) => {
	return useQuery({
		...queryOptions,
		queryFn: id => deleteDatasetOnboarding(id, requestOptions),
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
