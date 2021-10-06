import { useQuery, useMutation } from 'react-query';
import { apiURL } from '../configs/url.config';
import { getRequest, postRequest } from '../utils/requests';

export const getRegistration = (_id, options) => {
	return getRequest(`${apiURL}/auth/register/${_id}`, options);
};

export const postRegistration = (data, options) => {
	return postRequest(`${apiURL}/auth/register/`, data, options);
};

export const useGetRegistration = (requestOptions, queryOptions = { queryKey: 'getRegistration' }) => {
	return useQuery({
		...queryOptions,
		queryFn: id => getRegistration(id, requestOptions),
	});
};

export const usePostRegistration = (requestOptions, mutateOptions = { queryKey: 'postRegistration' }) => {
	return useMutation(data => postRegistration(data, requestOptions), {
		mutateOptions,
	});
};
