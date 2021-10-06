import { useMutation, useQuery } from 'react-query';
import { apiURL } from '../configs/url.config';
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '../utils/requests';

const getPapers = options => {
	return getRequest(`${apiURL}/papers`, options);
};

const getPaper = (_id, options) => {
	return getRequest(`${apiURL}/papers/${_id}`, options);
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

const useGetPapers = (requestOptions, queryOptions = { queryKey: 'getPaper' }) => {
	return useQuery({
		...queryOptions,
		queryFn: () => getPapers(requestOptions),
	});
};

const useGetPaper = (requestOptions, queryOptions = { queryKey: 'getPaper' }) => {
	return useQuery({
		...queryOptions,
		queryFn: id => getPaper(id, requestOptions),
	});
};

const usePostPaper = (requestOptions, mutateOptions = { queryKey: 'postPaper' }) => {
	return useMutation((id, data) => postPaper(id, data, requestOptions), {
		mutateOptions,
	});
};

const usePutPaper = (requestOptions, mutateOptions = { queryKey: 'putPaper' }) => {
	return useMutation((id, data) => putPaper(id, data, requestOptions), {
		mutateOptions,
	});
};

const usePatchPaper = (requestOptions, mutateOptions = { queryKey: 'patchPaper' }) => {
	return useMutation((id, data) => patchPaper(id, data, requestOptions), {
		mutateOptions,
	});
};

const useDeletePaper = (requestOptions, queryOptions = { queryKey: 'deletePaper' }) => {
	return useQuery({
		...queryOptions,
		queryFn: id => deletePaper(id, requestOptions),
	});
};

export default {
	getPapers,
	getPaper,
	postPaper,
	putPaper,
	patchPaper,
	deletePaper,
	useGetPapers,
	useGetPaper,
	usePostPaper,
	usePutPaper,
	usePatchPaper,
	useDeletePaper,
};
