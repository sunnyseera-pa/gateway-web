import { useQuery } from 'react-query';
import { apiURL } from '../configs/url.config';
import { getRequest } from '../utils/requests';

const getRelatedObject = (_id, options) => {
	return getRequest(`${apiURL}/relatedobject/${_id}`, options);
};

const getCourse = (_id, options) => {
	return getRequest(`${apiURL}/relatedobject/course/${_id}`, options);
};

const getLinkedDatasets = (relation, options) => {
	return getRequest(`${apiURL}/relatedobject/linkeddatasets/${relation}`, options);
};

const useGetReviews = (requestOptions, queryOptions = { queryKey: 'getRelatedObject' }) => {
	return useQuery({
		...queryOptions,
		queryFn: () => getReviews(requestOptions),
	});
};

const useGetPending = (requestOptions, queryOptions = { queryKey: 'getCourse' }) => {
	return useQuery({
		...queryOptions,
		queryFn: () => getPending(requestOptions),
	});
};

const useGetAdminPending = (requestOptions, queryOptions = { queryKey: 'getLinkedDatasets' }) => {
	return useQuery({
		...queryOptions,
		queryFn: () => getAdminPending(requestOptions),
	});
};

export default {
	getRelatedObject,
	getCourse,
	getLinkedDatasets,
	useGetReviews,
	useGetPending,
	useGetAdminPending,
};
