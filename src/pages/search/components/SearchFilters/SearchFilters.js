import React from 'react';
import { ReactComponent as CDStar } from '../../../../images/cd-star.svg';
import googleAnalytics from '../../../../tracking';

const SearchFilters = ({ filters, onAdvancedSearchClick }) => (
	<>
		{filters && <div className='saved-filterHolder'>{filters}</div>}
		<div className='advanced-search-link-container'>
			<CDStar fill='#f98e2b' height='20' width='20' />
			<a
				href='javascript:void(0)'
				className='textUnderline gray800-14 cursorPointer'
				onClick={() => {
					googleAnalytics.recordEvent('Datasets', 'User clicked advanced search link', 'Advanced search modal opened');
					if (onAdvancedSearchClick) onAdvancedSearchClick();
				}}>
				Advanced Search
			</a>
		</div>
	</>
);

export default SearchFilters;
