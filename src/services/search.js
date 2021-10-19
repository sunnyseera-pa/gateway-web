import { useQuery } from 'react-query';
import { apiURL, apiV2URL } from '../configs/url.config';
import { getRequest } from '../utils/requests';

const getSearch = (value, options) => {
	return getRequest(`${apiURL}/search?search=${value}`, options);
};

const getFilterBy = (value, options) => {
	return getRequest(`${apiURL}/search/filter?search=${value}`, options);
};

const getTopic = (topic, options) => {
	return getRequest(`${apiURL}/search/filter/topic/${topic}`, options);
};

const getFilters = (filter, options) => {
	return getRequest(`${apiV2URL}/filters/${filter}`, options);
};

const useGetSearch = (requestOptions, queryOptions = { queryKey: 'getSearch' }) => {
	return useQuery({
		...queryOptions,
		queryFn: value => getSearch(value, requestOptions),
	});
};

const useGetFilterBy = (requestOptions, queryOptions = { queryKey: 'getFilterBy' }) => {
	return useQuery({
		...queryOptions,
		queryFn: value => getFilterBy(value, requestOptions),
	});
};

const useGetTopic = (requestOptions, queryOptions = { queryKey: 'getTopic' }) => {
	return useQuery({
		...queryOptions,
		queryFn: () => getTopic(requestOptions),
	});
};

const useGetFilters = (requestOptions, queryOptions = { queryKey: 'getFilters' }) => {
	return useQuery({
		...queryOptions,
		queryFn: () => getFilters(requestOptions),
	});
};

export default {
	getSearch,
	getFilterBy,
	getTopic,
	getFilters,
	useGetSearch,
	useGetFilterBy,
	useGetTopic,
	useGetFilters,
};
