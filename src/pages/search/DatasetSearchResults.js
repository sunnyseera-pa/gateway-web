const DatasetSearchResults = props => {
	const mapResults = React.useCallback(data => {
		data.map(dataset => {
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
	}, []);

	return <SearchResults {...props} results={mapResults} />;
};
