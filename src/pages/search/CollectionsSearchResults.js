const CollectionsSearchResults = props => {
	const mapResults = React.useCallback(data => {
		return data.map(collection => {
			return (
				<Col sm={12} md={12} lg={6} style={{ 'text-align': '-webkit-center' }}>
					<CollectionCard key={collection.id} data={collection} />
				</Col>
			);
		});
	}, []);

	return <SearchResults {...props} results={mapResults} />;
};
