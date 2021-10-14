import React from 'react';
import { Col, Row } from 'react-bootstrap';
import RelatedObject from '../commonComponents/relatedObject/RelatedObject';
import SearchResults from '../commonComponents/SearchResults';
import moment from 'moment';

const CoursesSearchResults = ({ updateOnFilterBadge, ...outerProps }) => {
	const mapResults = React.useCallback(
		data => {
			let currentHeader = '';

			return data.map(course => {
				let output;

				if (!currentHeader) {
					if (course.courseOptions.flexibleDates && currentHeader !== 'Flexible') {
						currentHeader = 'Flexible';
					} else if (course.courseOptions.startDate && currentHeader !== moment(course.courseOptions.startDate).format('MMMM')) {
						currentHeader = moment(course.courseOptions.startDate).format('MMMM');
					}

					output = (
						<Row className='courseDateHeader'>
							<Col>
								<span className='black-20-semibold'>{currentHeader}</span>
							</Col>
						</Row>
					);
				}

				return (
					<>
						{output}
						<RelatedObject key={course.id} data={course} activeLink={true} onSearchPage={true} updateOnFilterBadge={updateOnFilterBadge} />
					</>
				);
			});
		},
		[updateOnFilterBadge]
	);

	return <SearchResults {...outerProps} results={mapResults} />;
};

export default CoursesSearchResults;
