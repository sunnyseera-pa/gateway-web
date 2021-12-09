import { useMutation, useQuery } from 'react-query';
import { apiURL } from '../configs/url.config';
import { getRequest, postRequest } from '../utils/requests';

export const getCollectionRequest = (_id, options) => {
	return getRequest(`${apiURL}/collections/${_id}`, options);
};

export const getCollectionRelatedObjectsRequest = (_id, options) => {
	return getRequest(`${apiURL}/collections/relatedobjects/${_id}`, options);
};

export const postCollectionCounterUpdateRequest = (data, options) => {
	return postRequest(`${apiURL}/collectioncounter/update`, data, options);
};

const useGetCollectionRequest = (_id, requestOptions, queryOptions = { queryKey: 'getCollectionRequest' }) => {
	return useQuery({
		...queryOptions,
		queryKey: [queryOptions.queryKey, _id],
		queryFn: async ({ queryKey }) => getCollectionRequest(queryKey[1], requestOptions),
	});
};

const useGetCollectionRelatedObjectsRequest = (_id, requestOptions, queryOptions = { queryKey: 'getCollectionRelatedObjectsRequest' }) => {
	return useQuery({
		...queryOptions,
		queryKey: [queryOptions.queryKey, _id],
		queryFn: async ({ queryKey }) => getCollectionRelatedObjectsRequest(queryKey[1], requestOptions),
	});
};

const usePostCollectionCounterUpdateRequest = (requestOptions, mutateOptions = { queryKey: 'postCollectionCounterUpdateRequest' }) => {
	return useMutation(data => postCollectionCounterUpdateRequest(data, requestOptions), {
		mutateOptions,
	});
};

export default {
	getCollectionRequest,
	getCollectionRelatedObjectsRequest,
	postCollectionCounterUpdateRequest,
	useGetCollectionRequest,
	useGetCollectionRelatedObjectsRequest,
	usePostCollectionCounterUpdateRequest,
};
