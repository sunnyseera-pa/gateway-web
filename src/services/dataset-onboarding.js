import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { apiURL } from '../configs/url.config';

export const getDatasetOnboarding = (_id, options = {}) => {
	return axios.get(`${apiURL}/dataset-onboarding/${_id}`, options);
};

export const postDatasetOnboarding = (_id, data) => {
	return axios.post(`${apiURL}/dataset-onboarding/${_id}`, data);
};

export const putDatasetOnboarding = (_id, data) => {
	return axios.put(`${apiURL}/dataset-onboarding/${_id}`, data);
};

export const patchDatasetOnboarding = (_id, data) => {
	return axios.patch(`${apiURL}/dataset-onboarding/${_id}`, data);
};

export const deleteDatasetOnboarding = (_id, options = {}) => {
	return axios.delete(`${apiURL}/dataset-onboarding/delete/${_id}`, options);
};

export const useGetDatasetOnboarding = (options = {}) => {
	return useQuery(id => getDatasetOnboarding(id), options);
};

export const usePostDatasetOnboarding = (options = {}) => {
	return useMutation((id, data) => postDatasetOnboarding(id, data), options);
};

export const usePutDatasetOnboarding = (options = {}) => {
	return useMutation((id, data) => putDatasetOnboarding(id, data), options);
};

export const usePatchDatasetOnboarding = (options = {}) => {
	return useMutation((id, data) => patchDatasetOnboarding(id, data), options);
};

export const useDeleteDatasetOnboarding = (options = {}) => {
	return useQuery(id => deleteDatasetOnboarding(id), options);
};
