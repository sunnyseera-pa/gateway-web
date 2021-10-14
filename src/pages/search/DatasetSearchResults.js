import React from 'react';
import _ from 'lodash';
import RelatedObject from '../commonComponents/relatedObject/RelatedObject';
import SearchResults from '../commonComponents/SearchResults';

const DatasetSearchResults = ({ updateOnFilterBadge, ...outerProps }) => {
	const mapResults = React.useCallback(
		data => {
			return data.map(dataset => {
				let datasetPublisher;
				let datasetLogo;

				!_.isEmpty(dataset.datasetv2) && _.has(dataset, 'datasetv2.summary.publisher.name')
					? (datasetPublisher = dataset.datasetv2.summary.publisher.name)
					: (datasetPublisher = '');

				!_.isEmpty(dataset.datasetv2) && _.has(dataset, 'datasetv2.summary.publisher.logo')
					? (datasetLogo = dataset.datasetv2.summary.publisher.logo)
					: (datasetLogo = '');

				return (
					<RelatedObject
						key={dataset.id}
						data={dataset}
						activeLink={true}
						onSearchPage={true}
						updateOnFilterBadge={updateOnFilterBadge}
						datasetPublisher={datasetPublisher}
						datasetLogo={datasetLogo}
					/>
				);
			});
		},
		[updateOnFilterBadge]
	);

	return <SearchResults {...outerProps} results={mapResults} />;
};

export default DatasetSearchResults;
