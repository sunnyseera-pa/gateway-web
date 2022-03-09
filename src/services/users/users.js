import { useMutation, useQuery } from 'react-query';
import { apiURL } from '../../configs/url.config';
import { getRequest, patchRequest } from '../../utils/requests';

const getUsers = options => {
	return getRequest(`${apiURL}/users`, options);
};

const getUserById = (id, options) => {
	return getRequest(`${apiURL}/person/${id}`, options);
};

const searchUsers = (term, options) => {
	return getRequest(`${apiURL}/users/search/${term}`, options);
};

const patchRoles = (_id, data, options) => {
	return patchRequest(`${apiURL}/users/advancedsearch/roles/${_id}`, data, options);
};

const patchTerms = (_id, data, options) => {
	return patchRequest(`${apiURL}/users/advancedsearch/terms/${_id}`, data, options);
};

const useGetUsers = (requestOptions, queryOptions = { queryKey: 'getUsers' }) => {
	return useQuery({
		...queryOptions,
		queryFn: () => getUsers(requestOptions),
	});
};

const useGetUserById = (requestOptions, queryOptions = { queryKey: 'getUserById' }) => {
	return useQuery({
		...queryOptions,
		queryFn: () => getUserById(requestOptions),
	});
};

const useSearchUsers = (requestOptions, queryOptions = { queryKey: 'searchUsers' }) => {
	return useQuery({
		...queryOptions,
		queryFn: () => searchUsers(requestOptions),
	});
};

const usePatchRoles = (requestOptions, mutateOptions = { queryKey: 'patchRoles' }) => {
	return useMutation((_id, data) => patchRoles(_id, data, requestOptions), {
		mutateOptions,
	});
};
const usePatchTerms = (requestOptions, mutateOptions = { queryKey: 'patchTerms' }) => {
	return useMutation((_id, data) => patchTerms(_id, data, requestOptions), {
		mutateOptions,
	});
};

export default {
	getUsers,
	getUserById,
	searchUsers,
	patchRoles,
	patchTerms,
	useGetUsers,
	useGetUserById,
	useSearchUsers,
	usePatchRoles,
	usePatchTerms,
};
