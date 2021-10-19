import React from 'react';
import { Pagination, Row } from 'react-bootstrap';
import Loading from '../Loading';
import NoResults from '../NoResults';
import RelatedObject from '../relatedObject/RelatedObject';

const SearchResults = ({
	results,
	type,
	count,
	search,
	data,
	sort,
	pageNumber,
	onPagination,
	maxResult,
	updateOnFilterBadge,
	isLoading,
	totalPages,
}) => (
	<>
		{!isLoading && (
			<>
				{sort && (
					<Row>
						<div className='text-right save-dropdown'>{sort}</div>
					</Row>
				)}
				{count <= 0 && <NoResults type={type} searchString={search} />}
				{!results &&
					count > 0 &&
					data.map(item => {
						return (
							<RelatedObject key={item.id} data={item} activeLink={true} onSearchPage={true} updateOnFilterBadge={updateOnFilterBadge} />
						);
					})}
				{results && count > 0 && results(data)}
				{count > maxResult && (
					<Pagination>
						{new Array(Math.ceil(totalPages)).fill().map((value, i) => (
							<Pagination.Item key={i} active={i === pageNumber} onClick={() => onPagination(type, i * maxResult)}>
								{i + 1}
							</Pagination.Item>
						))}
					</Pagination>
				)}
			</>
		)}
		{!!isLoading && (
			<div style={{ marginTop: '30px' }}>
				<Loading data-testid='loader' />
			</div>
		)}
	</>
);

export default SearchResults;
