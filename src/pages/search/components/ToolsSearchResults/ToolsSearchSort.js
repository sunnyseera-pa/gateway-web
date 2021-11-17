import React from 'react';
import SortDropdown from '../../../commonComponents/SortDropdown';

const ToolsSearchSort = ({ sort, onSort, search, ...outerProps }) => {
	return (
		<SortDropdown
			handleSort={onSort}
			sort={sort === '' ? (search === '' ? 'latest' : 'relevance') : sort}
			dropdownItems={['relevance', 'popularity', 'latest', 'resources']}
			{...outerProps}
		/>
	);
};

export default ToolsSearchSort;
