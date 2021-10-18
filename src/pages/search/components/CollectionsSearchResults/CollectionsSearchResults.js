import React from 'react';
import { Col, Row } from 'react-bootstrap';
import CollectionCard from '../../../commonComponents/collectionCard/CollectionCard';
import SearchResults from '../../../commonComponents/SearchResults';

const CollectionsSearchResults = props => {
	const mapResults = React.useCallback(data => {
		return (
			<Row className='mt-2'>
				{data.map(collection => {
					return (
						<Col sm={12} md={12} lg={6} style={{ 'text-align': '-webkit-center' }}>
							<CollectionCard key={collection.id} data={collection} />
						</Col>
					);
				})}
			</Row>
		);
	}, []);

	return <SearchResults type='collections' results={mapResults} {...props} />;
};

export default CollectionsSearchResults;
