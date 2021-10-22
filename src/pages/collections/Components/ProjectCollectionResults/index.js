import React from 'react';
import _ from 'lodash';
import RelatedObject from '../../../commonComponents/relatedObject/RelatedObject';
import SearchResults from '../../../commonComponents/SearchResults';

const ProjectCollectionResults = ({ relatedObjects, userId, ...outerProps }) => {
	const canViewResults = object =>
		Boolean(
			object.activeflag === 'active' || (object.type === 'project' && object.activeflag === 'review' && object.authors.includes(userId))
		);

	const mapResults = React.useCallback(
		searchResults => {
			return searchResults.map(object => {
				if (canViewResults) {
					let reason = '';
					let updated = '';
					let user = '';
					let showAnswer = false;
					if (object.type === 'project') {
						relatedObjects.map(dat => {
							if (parseInt(dat.objectId) === object.id) {
								reason = dat.reason;
								updated = dat.updated;
								user = dat.user;
								showAnswer = !_.isEmpty(reason);
							}
						});

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

	return <SearchResults type='project' results={mapResults} {...outerProps} />;
};

export default ProjectCollectionResults;
