import React from 'react';
import _ from 'lodash';
import RelatedObject from '../../../commonComponents/relatedObject/RelatedObject';

const CohortCollectionResults = ({ searchResults, relatedObjects, userId }) => {
	const canViewResults = searchResult => Boolean(searchResult.activeflag === 'active' && searchResult.publicflag === true);

	return searchResults.map(searchResult => {
		if (canViewResults(searchResult)) {
			let reason = '';
			let updated = '';
			let user = '';
			let showAnswer = false;
			if (searchResult.type === 'cohort') {
				relatedObjects.map(dat => {
					if (parseInt(dat.objectId) === searchResult.id) {
						reason = dat.reason;
						updated = dat.updated;
						user = dat.user;
						showAnswer = !_.isEmpty(reason);
					}
				});
				return (
					<RelatedObject
						key={searchResult.id}
						data={searchResult}
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
};

export default CohortCollectionResults;
