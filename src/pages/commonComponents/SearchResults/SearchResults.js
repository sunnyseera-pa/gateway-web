import React from 'react';
import { Pagination, Row } from 'react-bootstrap';
import Loading from '../Loading';
import NoResults from '../NoResults';
import RelatedObject from '../relatedObject/RelatedObject';

const typeMapper = {
	Datasets: 'dataset',
	Tools: 'tool',
	Projects: 'project',
	Papers: 'paper',
	People: 'person',
	Courses: 'course',
	Collections: 'collection',
};

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
}) => (
	<>
		{!isLoading && (
			<>
				{sort && (
					<Row>
						<div className='text-right save-dropdown'>{sort}</div>
					</Row>
				)}
				{count <= 0 && <NoResults type={type} search={search} />}
				{!results &&
					count > 0 &&
					data.map(item => {
						return (
							<RelatedObject key={item.id} data={item} activeLink={true} onSearchPage={true} updateOnFilterBadge={updateOnFilterBadge} />
						);
					})}
				{results && results(data)}
				{count > maxResult && (
					<Pagination>
						{new Array(Math.ceil(count / maxResult)).fill().map((value, i) => (
							<Pagination.Item key={i} active={i + 1 === pageNumber} onClick={() => onPagination(typeMapper[type], i * maxResult)}>
								{i + 1}
							</Pagination.Item>
						))}
					</Pagination>
				)}
			</>
		)}
		{!!isLoading && (
			<div style={{ marginTop: '30px' }}>
				<Loading />
			</div>
		)}
	</>
);

export default SearchResults;
