import { useMutation, useQuery } from 'react-query';
import { apiURL } from '../configs/url.config';
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '../utils/requests';

const getPapers = options => {
	return getRequest(`${apiURL}/papers/getList`, options);
};

const getPaper = (_id, options) => {
	return getRequest(`${apiURL}/papers/${_id}`, options);
};

const getEdit = (_id, options) => {
	return getRequest(`${apiURL}/papers/edit/${_id}`, options);
};

const postPaper = (_id, data, options) => {
	return postRequest(`${apiURL}/papers/${_id}`, data, options);
};

const putPaper = (_id, data, options) => {
	return putRequest(`${apiURL}/papers/${_id}`, data, options);
};

const patchPaper = (_id, data, options) => {
	return patchRequest(`${apiURL}/papers/${_id}`, data, options);
};

const deletePaper = (_id, options) => {
	return deleteRequest(`${apiURL}/papers/${_id}`, options);
};

const useGetPapers = (requestOptions, queryOptions = { queryKey: 'getPapers' }) => {
	return useQuery({
		...queryOptions,
		queryFn: () => getPapers(requestOptions),
	});
};

const useGetPaper = (requestOptions, queryOptions = { queryKey: 'getPaper' }) => {
	return useQuery({
		...queryOptions,
		queryFn: _id => getPaper(_id, requestOptions),
	});
};

const useGetEdit = (requestOptions, queryOptions = { queryKey: 'getEdit' }) => {
	return useQuery({
		...queryOptions,
		queryFn: _id => getPaper(_id, requestOptions),
	});
};

const usePostPaper = (requestOptions, mutateOptions = { queryKey: 'postPaper' }) => {
	return useMutation((_id, data) => postPaper(_id, data, requestOptions), {
		mutateOptions,
	});
};

const usePutPaper = (requestOptions, mutateOptions = { queryKey: 'putPaper' }) => {
	return useMutation((_id, data) => putPaper(_id, data, requestOptions), {
		mutateOptions,
	});
};

const usePatchPaper = (requestOptions, mutateOptions = { queryKey: 'patchPaper' }) => {
	return useMutation((_id, data) => patchPaper(_id, data, requestOptions), {
		mutateOptions,
	});
};

const useDeletePaper = (requestOptions, queryOptions = { queryKey: 'deletePaper' }) => {
	return useQuery({
		...queryOptions,
		queryFn: _id => deletePaper(_id, requestOptions),
	});
};

export default {
	getPapers,
	getPaper,
	getEdit,
	postPaper,
	putPaper,
	patchPaper,
	deletePaper,
	useGetPapers,
	useGetPaper,
	useGetEdit,
	usePostPaper,
	usePutPaper,
	usePatchPaper,
	useDeletePaper,
};
