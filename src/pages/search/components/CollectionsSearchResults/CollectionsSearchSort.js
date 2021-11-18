import React from 'react';
import SortDropdown from '../../../commonComponents/SortDropdown';

const CollectionsSearchSort = ({ sort, onSort, search, ...outerProps }) => {
	return (
		<SortDropdown
			onSort={onSort}
			defaultValue={search === '' ? 'latest' : 'relevance'}
			value={sort}
			options={['relevance', 'popularity', 'latest', 'resources']}
			{...outerProps}
		/>
	);
};

export default CollectionsSearchSort;
