import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { apiURL } from '../configs/url.config';
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '../utils/requests';

const getPersons = options => {
	return getRequest(`${apiURL}/person`, options);
};

const getPerson = (_id, options) => {
	return getRequest(`${apiURL}/person/${_id}`, options);
};

const postPerson = (_id, data, options) => {
	return postRequest(`${apiURL}/person/${_id}`, data, options);
};

const putPerson = (_id, data, options) => {
	return putRequest(`${apiURL}/person/${_id}`, data, options);
};

const patchProfileComplete = (_id, data, options) => {
	return patchRequest(`${apiURL}/person/profileComplete/${id}`, data, options);
};

const patchUnsubscribe = (_id, data, options) => {
	return patchRequest(`${apiURL}/person/unsubscribe/${id}`, data, options);
};

const patchPerson = (_id, data, options) => {
	return patchRequest(`${apiURL}/person/${_id}`, data, options);
};

const deletePerson = (_id, options) => {
	return deleteRequest(`${apiURL}/person/${_id}`, options);
};

const useGetPersons = (requestOptions, queryOptions = { queryKey: 'getPersons' }) => {
	return useQuery({
		...queryOptions,
		queryFn: () => getPersons(requestOptions),
	});
};

const useGetPerson = (requestOptions, queryOptions = { queryKey: 'getPerson' }) => {
	return useQuery({
		...queryOptions,
		queryFn: id => getPerson(id, requestOptions),
	});
};

const usePostPerson = (requestOptions, mutateOptions = { queryKey: 'postPerson' }) => {
	return useMutation((id, data) => postPerson(id, data, requestOptions), {
		mutateOptions,
	});
};

const usePutPerson = (requestOptions, mutateOptions = { queryKey: 'putPerson' }) => {
	return useMutation((id, data) => putPerson(id, data, requestOptions), {
		mutateOptions,
	});
};

const usePatchProfileComplete = (requestOptions, mutateOptions = { queryKey: 'patchProfileComplete' }) => {
	return useMutation((id, data) => patchProfileComplete(id, data, requestOptions), {
		mutateOptions,
	});
};

const usePatchUnsubcribe = (requestOptions, mutateOptions = { queryKey: 'patchUnsubcribe' }) => {
	return useMutation((id, data) => patchUnsubcribe(id, data, requestOptions), {
		mutateOptions,
	});
};
const usePatchPerson = (requestOptions, mutateOptions = { queryKey: 'patchPerson' }) => {
	return useMutation((id, data) => patchPerson(id, data, requestOptions), {
		mutateOptions,
	});
};

const usePatchPerson = (requestOptions, mutateOptions = { queryKey: 'patchPerson' }) => {
	return useMutation((id, data) => patchPerson(id, data, requestOptions), {
		mutateOptions,
	});
};

const useDeletePerson = (requestOptions, queryOptions = { queryKey: 'deletePerson' }) => {
	return useQuery({
		...queryOptions,
		queryFn: id => deletePerson(id, requestOptions),
	});
};

export default {
	getPersons,
	getPerson,
	postPerson,
	putPerson,
	patchPerson,
	patchProfileComplete,
	patchUnsubscribe,
	deletePerson,
	useGetPersons,
	useGetPersons,
	useGetPerson,
	usePostPerson,
	usePutPerson,
	usePatchPerson,
	usePatchProfileComplete,
	usePatchUnsubcribe,
	useDeletePerson,
};
