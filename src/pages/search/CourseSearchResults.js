const CourseSearchResults = props => {
	const mapResults = React.useCallback(data => {
		let courseRender = [];
		let currentHeader = '';

		return courseData.map(course => {
			if (!currentHeader && course.courseOptions.flexibleDates && currentHeader !== 'Flexible') {
				currentHeader = 'Flexible';
			} else if (
				!currentHeader &&
				course.courseOptions.startDate &&
				currentHeader !== moment(course.courseOptions.startDate).format('MMMM')
			) {
				currentHeader = moment(course.courseOptions.startDate).format('MMMM');
			}

			if (showHeader) {
				courseRender.push();
			}

			return (
				<>
					{currentHeader && (
						<Row className='courseDateHeader'>
							<Col>
								<span className='black-20-semibold'>{currentHeader}</span>
							</Col>
						</Row>
					)}
					<RelatedObject
						key={course.id}
						data={course}
						activeLink={true}
						onSearchPage={true}
						updateOnFilterBadge={this.updateOnFilterBadge}
					/>
				</>
			);
		});
	}, []);

	return <SearchResults {...props} results={mapResults} />;
};
