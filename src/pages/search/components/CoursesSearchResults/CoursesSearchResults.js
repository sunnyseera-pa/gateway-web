import React from 'react';
import { Col, Row } from 'react-bootstrap';
import RelatedObject from '../../../commonComponents/relatedObject/RelatedObject';
import SearchResults from '../../../commonComponents/SearchResults';
import moment from 'moment';

const CoursesSearchResults = ({ updateOnFilterBadge, ...outerProps }) => {
	const mapResults = React.useCallback(
		data => {
			let courseRender = [];
			let currentHeader = '';

			data.forEach(course => {
				let showHeader = false;

				if (!showHeader) {
					const courseStartDate = courseStartDate && moment(course.courseOptions.startDate).format('MMMM');

					if (course.courseOptions.flexibleDates && currentHeader !== 'Flexible') {
						currentHeader = 'Flexible';
						showHeader = true;
					} else if (courseStartDate) {
						currentHeader = courseStartDate;
						showHeader = true;
					}
				}

				if (showHeader) {
					courseRender.push(
						<Row className='courseDateHeader'>
							<Col>
								<span className='black-20-semibold '>{currentHeader}</span>
							</Col>
						</Row>
					);
				}

				courseRender.push(
					<RelatedObject key={course.id} data={course} activeLink={true} onSearchPage={true} updateOnFilterBadge={updateOnFilterBadge} />
				);
			});

			return courseRender;
		},
		[updateOnFilterBadge]
	);

	return <SearchResults {...outerProps} results={mapResults} />;
};

export default CoursesSearchResults;
