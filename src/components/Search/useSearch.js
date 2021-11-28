import React from 'react';

const useSearch = (mutateHook, options) => {
	const [params, setParams] = React.useState(
		options.initialParams || {
			maxResults: 10,
			page: 1,
		}
	);

	const [state, setState] = React.useState({
		count: 0,
		isFetched: false,
	});

	const { isLoading, isError, data } = mutateHook;
	const { count } = state;

	const hasNext = React.useCallback(() => {
		const { maxResults, page } = params;

		console.log('************************** Has next', page, count, page < Math.ceil(count / maxResults));
		return page < Math.ceil(count / maxResults);
	}, [params, count]);

	const hasPrevious = React.useCallback(() => {
		const { page } = params;
		return page > 1;
	}, [params]);

	const getResults = React.useCallback(
		async queryParams => {
			const mergedParams = {
				...params,
				...queryParams,
			};

			setParams(mergedParams);
			query(mergedParams);
		},
		[params]
	);

	const query = React.useCallback(async queryParams => {
		try {
			const { data } = await mutateHook.mutateAsync(queryParams);
			const { count } = options;

			setState({
				count: count ? count(data, queryParams) : data.count,
				isFetched: true,
			});
		} catch (e) {
			console.log('e', e);
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
	}, [params]);

	const gotToPrevious = React.useCallback(() => {
		if (hasPrevious()) {
			const { page } = params;
			goToPage(page - 1);
		}
	}, [params]);

	return {
		goToPage,
		goToNext,
		gotToPrevious,
		getResults,
		hasNext,
		hasPrevious,
		data,
		params,
		isLoading,
		isError,
		...state,
	};
};

export default useSearch;
