import React, { useEffect } from 'react';
import pickBy from 'lodash/pickBy';
import usePersistState from '../../hooks/usePersistState';

const useSearch = (mutateHook, options) => {
	const [params, setParams] = React.useState(
		options.initialParams || {
			maxResults: 10,
			page: 1,
		}
	);

	const [cache, updateCache] = usePersistState();

	const [state, setState] = React.useState({
		total: 0,
		isFetched: false,
	});

	const { isLoading, isError, data, isFetching } = mutateHook;
	const { page } = params;
	const { total } = state;

	const hasNext = React.useCallback(() => {
		const { maxResults, page } = params;
		return page < Math.ceil(total / maxResults);
	}, [params, total]);

	const hasPrevious = React.useCallback(() => {
		const { page } = params;
		return page > 1;
	}, [params]);

	const getCache = React.useCallback(
		key => {
			if (!key) return cache;

			return cache[key];
		},
		[cache]
	);

	const getResults = React.useCallback(
		async (queryParams, cacheKey) => {
			const filteredParams = pickBy(queryParams, value => value !== '');

			setParams({
				page,
				...filteredParams,
			});

			query(filteredParams, cacheKey);
		},
		[params, page]
	);

	const getCachedResults = React.useCallback(
		(queryParams, key) => {
			const existingParams = getCache(key);

			getResults(
				existingParams
					? existingParams.params
					: {
							...options.initialParams,
							...queryParams,
					  },
				key
			);
		},
		[cache]
	);

	const query = React.useCallback(async (queryParams, cacheKey) => {
		try {
			const { data } = await mutateHook.mutateAsync(queryParams);
			const { total, onSuccess } = options;

			setState({
				total: (total ? total(data) : data.data.results.total) || 0,
				isFetched: true,
			});

			updateCache(cacheKey, {
				params: queryParams,
				data,
			});

			if (onSuccess) onSuccess(data, queryParams);
		} catch (e) {
			const { onError } = options;

			if (onError) onError(e, queryParams);
		}
	}, []);

	const goToPage = i => {
		const queryParams = {
			...params,
			page: i,
			index: (i - 1) * 10,
		};

		setParams(queryParams);
		query(queryParams);
	};

	const goToNext = React.useCallback(() => {
		if (hasNext()) {
			const { page } = params;
			goToPage(page + 1);
		}
	}, [params, total]);

	const goToPrevious = React.useCallback(() => {
		if (hasPrevious()) {
			const { page } = params;
			goToPage(page - 1);
		}
	}, [params, total]);

	return {
		goToPage,
		goToNext,
		goToPrevious,
		getResults,
		getCache,
		getCachedResults,
		hasNext,
		hasPrevious,
		total,
		data,
		params,
		isLoading,
		isError,
		isFetching,
		...state,
	};
};

export default useSearch;
