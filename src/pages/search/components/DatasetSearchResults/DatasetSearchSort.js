import React from 'react';
import SortDropdown from '../../../commonComponents/SortDropdown';

const DatasetSearchSort = ({ sort, onSort, search, ...outerProps }) => {
	return (
		<SortDropdown
			onSort={onSort}
			defaultValue={search === '' ? 'metadata' : 'relevance'}
			value={sort}
			options={['relevance', 'popularity', 'metadata', 'latest', 'resources']}
			{...outerProps}
		/>
	);
};

export default DatasetSearchSort;
