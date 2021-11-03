import { useQuery } from 'react-query';
import { apiURL } from '../configs/url.config';
import { getRequest } from '../utils/requests';

const getDataset = (_id, options) => {
	return getRequest(`${apiURL}/datasets/${_id}`, options);
};

const useGetDataset = (id, requestOptions, queryOptions = { queryKey: 'getDataset' }) => {
	return useQuery({
		...queryOptions,
		queryKey: [queryOptions.queryKey, id],
		queryFn: async ({ queryKey }) => getDataset(queryKey[1], requestOptions),
	});
};

export default {
	getDataset,
	useGetDataset,
};
