import { useQuery, useMutation } from 'react-query';
import { apiURL } from '../../configs/url.config';
import { getRequest, postRequest } from '../../utils/requests';

const getDataset = (_id, options) => {
	return getRequest(`${apiURL}/datasets/${_id}`, options);
};

const postRejectDatasetRequest = (data, options) => {
	return postRequest(`${apiURL}/datasets/accept`, data, options);
};

const useGetDataset = (id, requestOptions, queryOptions = { queryKey: 'getDataset' }) => {
	return useQuery({
		...queryOptions,
		queryKey: [queryOptions.queryKey, id],
		queryFn: async ({ queryKey }) => getDataset(queryKey[1], requestOptions),
	});
};

const usePostRejectDatasetRequest = (requestOptions, mutateOptions = { queryKey: 'postRejectDatasetRequest' }) => {
	return useMutation(data => postRejectDatasetRequest(data, requestOptions), {
		mutateOptions,
	});
};

export default {
	getDataset,
	postRejectDatasetRequest,
	useGetDataset,
	usePostRejectDatasetRequest
};
