import React from 'react';
import _ from 'lodash';
import RelatedObject from '../../../commonComponents/relatedObject/RelatedObject';
import SearchResults from '../../../commonComponents/SearchResults';

const PersonCollectionResults = ({ relatedObjects, userId, ...outerProps }) => {
	const canViewResults = object =>
		Boolean(
			object.activeflag === 'active' || (object.type === 'person' && object.activeflag === 'review' && object.authors.includes(userId))
		);

	const mapResults = React.useCallback(
		searchResults => {
			return searchResults.map(object => {
				if (canViewResults(object)) {
					let reason = '';
					let updated = '';
					let user = '';
					let showAnswer = false;
					if (object.type === 'person') {
						relatedObjects.map(dat => {
							if (parseInt(dat.objectId) === object.id) {
								reason = dat.reason;
								updated = dat.updated;
								user = dat.user;
								showAnswer = !_.isEmpty(reason);

								console.log('Dat', dat);
							}
						});

						console.log('Object', object);

						return (
							<RelatedObject
								key={object.id}
								data={object}
								activeLink={true}
								showRelationshipAnswer={showAnswer}
								collectionReason={reason}
								collectionUpdated={updated}
								collectionUser={user}
							/>
						);
					}
				}
			});
		},
		[relatedObjects]
	);

	return <SearchResults type='person' results={mapResults} {...outerProps} />;
};

export default PersonCollectionResults;
