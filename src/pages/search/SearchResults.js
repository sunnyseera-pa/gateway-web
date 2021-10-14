import { Pagination } from 'react-bootstrap';

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
	filters,
	sort,
	pageNumber,
	onPagination,
	maxResult,
	updateOnFilterBadge,
	onAdvancedSearchClick,
	isLoading,
}) => {
	<Container>
		<Row>
			{filters && (
				<Col sm={12} md={12} lg={3} className='mt-1 mb-5'>
					<div className='saved-filterHolder'>{filters}</div>
				</Col>
			)}
			{!filters && <Col sm={12} md={12} lg={3} />}
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
			{!isLoading && (
				<Col sm={12} md={12} lg={9} className='mt-1 mb-5'>
					<Row>
						<div className='text-right save-dropdown'>{sort}</div>
					</Row>
					{count <= 0 && <NoResults type={type} search={search} />}
					{!results &&
						count > 0 &&
						data.map(item => {
							return (
								<RelatedObject key={item.id} data={item} activeLink={true} onSearchPage={true} updateOnFilterBadge={updateOnFilterBadge} />
							);
						})}
					{results && results(data)}
					{count >
						maxResult(
							<Pagination>
								{new Array(Math.ceil(count / maxResult)).fill().map((value, i) => {
									<Pagination.Item
										key={i}
										active={i === pageNumber / maxResult}
										onClick={() => onPagination(typeMapper[type], i * maxResult)}>
										{i}
									</Pagination.Item>;
								})}
							</Pagination>
						)}
				</Col>
			)}
			{!!isResultsLoading && (
				<Col style={{ marginTop: '30px' }} sm={12} md={12} lg={9}>
					<Loading />
				</Col>
			)}
		</Row>
	</Container>;
};

export default SearchResults;
