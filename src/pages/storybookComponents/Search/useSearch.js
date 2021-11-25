import React from 'react';

const useSearch = (mutateHook, options) => {
	const [params, setParams] = React.useState(
		options.initialParams || {
			maxResults: 10,
			page: 1,
		}
	);

	const [count, setCount] = React.useState(0);

	const { isLoading, isError, data } = mutateHook;

	const hasNext = React.useCallback(() => {
		const { maxResults, page } = params;
		return Math.floor(count / maxResults) <= page;
	}, [params, count]);

	const hasPrevious = React.useCallback(() => {
		const { page } = params;
		return page > 0;
	}, [params]);

	const getResults = React.useCallback(async queryParams => {
		setParams(queryParams);
	}, []);

	const query = React.useCallback(async () => {
		try {
			const data = await mutateHook.mutateAsync(params);
			const { count } = options;

			setCount(count ? count(data) : data.count);
		} catch (e) {}
	}, [params]);

	const goToPage = i => {
		setParams({
			...params,
			page: i,
			index: (i - 1) * 10,
		});
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

	React.useEffect(() => {
		query();
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
		count,
		isLoading,
		isError,
	};
};

export default useSearch;
