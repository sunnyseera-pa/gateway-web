import React from 'react';
import SortDropdown from '../SortDropdown';

const CohortsSearchSort = ({ sort, onSort, search, ...outerProps }) => {
	return (
		<SortDropdown
			handleSort={onSort}
			sort={sort === '' ? (search === '' ? 'latest' : 'relevance') : sort}
			dropdownItems={['relevance', 'popularity', 'latest', 'resources', 'entries', 'datasets']}
			{...outerProps}
		/>
	);
};

export default CohortsSearchSort;
