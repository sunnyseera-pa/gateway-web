/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import queryString from 'query-string';
import { Row, Col, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { isEmpty, isNil } from 'lodash';
import googleAnalytics from '../../../../tracking';
import { stripMarkdown } from '../../../../utils/GeneralHelper.util';
import SVGIcon from '../../../../images/SVGIcon';
import * as styles from './Dataset.styles';
import '../../CommonComponents.scss';
import '../RelatedObject.scss';

function Dataset({
	data,
	activeLink,
	publisherLogo,
	onSearchPage,
	showRelationshipQuestion,
	isCohortDiscovery,
	updateOnFilterBadge,
	removeButton,
}) {
	if (data.type === 'dataset' && data.activeflag === 'archive') {
		return (
			<Row className='noMargin pad-left-24'>
				<Col sm={10} lg={10} className='entity-deleted-edit gray800-14'>
					The dataset '{data.name}' has been deleted by the publisher
				</Col>
				<Col sm={2} lg={2}>
					<Button variant='medium' className='soft-black-14' onClick={removeButton}>
						<SVGIcon name='closeicon' fill={'#979797'} className='buttonSvg mr-2' />
						Remove
					</Button>
				</Col>
			</Row>
		);
	}

	const phenotypesSelected = queryString.parse(window.location.search).phenotypes
		? queryString.parse(window.location.search).phenotypes.split('::')
		: [];
	const searchTerm = queryString.parse(window.location.search).search ? queryString.parse(window.location.search).search : '';
	const phenotypesSeached = data.datasetfields.phenotypes.filter(phenotype => phenotype.name.toLowerCase() === searchTerm.toLowerCase());
	return (
		<>
			<Row className='noMargin'>
				<Col sm={10} lg={10} className='pad-left-24'>
					{activeLink === true ? (
						<a
							onClick={() => {
								googleAnalytics.recordEvent('Datasets', 'Clicked on dataset to open', `Dataset name: ${data.name}`);
							}}
							className='purple-bold-16'
							css={styles.pointer}
							href={'/dataset/' + data.pid}
							data-testid='dataset-title'>
							{data.name}
						</a>
					) : (
						<span className='black-bold-16' data-testid='dataset-title'>
							{' '}
							{data.name}{' '}
						</span>
					)}
					<br />
					{!isEmpty(data.datasetv2) ? (
						<>
							{!isNil(data.datasetv2.summary.publisher.memberOf) ? (
								<span>
									<SVGIcon name='shield' fill={'#475da7'} className='svg-16 mr-2' viewBox='0 0 16 16' />
								</span>
							) : (
								''
							)}
							<span
								className={activeLink ? 'gray800-14 underlined' : 'gray800-14'}
								css={styles.pointer}
								onClick={() =>
									updateOnFilterBadge('publisher', {
										label: data.datasetv2.summary.publisher.name.toUpperCase(),
										parentKey: 'publisher',
									})
								}
								data-testid={`publisher-${data.datasetv2.summary.publisher.name}`}>
								{' '}
								{data.datasetv2.summary.publisher.name.toUpperCase()}{' '}
							</span>
						</>
					) : (
						<span
							className={activeLink ? 'gray800-14 underlined' : 'gray800-14'}
							css={styles.pointer}
							onClick={() => {
								let name = data.datasetfields.publisher;
								updateOnFilterBadge('publisher', {
									label: name.includes('>') ? name.split(' > ')[1].toUpperCase() : name.toUpperCase(),
									parentKey: 'publisher',
								});
							}}>
							{' '}
							{data.datasetfields.publisher}{' '}
						</span>
					)}
				</Col>
				<Col sm={2} lg={2} className='pad-right-24'>
					{!isEmpty(publisherLogo) && (
						<div className='datasetLogoCircle floatRight' css={styles.publisherLogoCSS(publisherLogo)} data-testid='publisher-logo' />
					)}
					{showRelationshipQuestion ? (
						<Button variant='medium' className='soft-black-14' onClick={removeButton}>
							<SVGIcon name='closeicon' fill={'#979797'} className='buttonSvg mr-2' />
							Remove
						</Button>
					) : (
						''
					)}
				</Col>
				<Col sm={12} lg={12} className='pad-left-24 pad-right-24 pad-top-16'>
					<span className='badge-dataset'>
						<SVGIcon name='dataseticon' fill={'#113328'} className='badgeSvg mr-2' viewBox='-2 -2 22 22' />
						<span>Dataset</span>
					</span>
					{isCohortDiscovery ? (
						<span className='badge-project'>
							<SVGIcon name='cohorticon' fill={'#472505'} className='badgeSvg mr-2' width='22' height='22' viewBox='0 0 10 10' />
							<span>Cohort Discovery</span>
						</span>
					) : (
						''
					)}
					{(() => {
						if (phenotypesSeached.length > 0) {
							if (activeLink === true) {
								if (onSearchPage === true) {
									return (
										<span
											css={styles.pointer}
											onClick={event => updateOnFilterBadge('phenotypes', { label: phenotypesSeached[0].name, parentKey: 'phenotypes' })}>
											<div className='badge-phenotype'>Phenotype: {phenotypesSeached[0].name}</div>
										</span>
									);
								} else {
									return (
										<a href={'/search?search=&tab=Datasets&phenotypes=' + phenotypesSeached[0].name}>
											<div className='badge-phenotype'>Phenotype: {phenotypesSeached[0].name}</div>
										</a>
									);
								}
							} else {
								return <div className='badge-phenotype'>Phenotype: {phenotypesSeached[0].name}</div>;
							}
						}
					})()}

					{!phenotypesSelected || phenotypesSelected.length <= 0
						? ''
						: phenotypesSelected.map((phenotype, index) => {
								if (data.datasetfields.phenotypes.find(phenotypeCheck => phenotypeCheck.name.toLowerCase() === phenotype.toLowerCase())) {
									if (activeLink === true) {
										if (onSearchPage === true) {
											return (
												<span
													key={`phenotype-${index}`}
													css={styles.pointer}
													onClick={event => updateOnFilterBadge('phenotypes', { label: phenotype, parentKey: 'phenotypes' })}>
													<div className='badge-phenotype'>Phenotype: {phenotype}</div>
												</span>
											);
										} else {
											return (
												<a href={'/search?search=&tab=Datasets&phenotypes=' + phenotype} key={`phenotype-${index}`}>
													<div className='badge-phenotype'>Phenotype: {phenotype}</div>
												</a>
											);
										}
									} else {
										return (
											<div className='badge-phenotype' key={`phenotype-${index}`}>
												Phenotype: {phenotype}
											</div>
										);
									}
								} else {
									return null;
								}
						  })}

					{!data.tags.features || data.tags.features.length <= 0
						? ''
						: data.tags.features.map((feature, index) => {
								if (activeLink === true) {
									if (onSearchPage === true) {
										return (
											<span
												key={`feature-${index}`}
												css={styles.pointer}
												onClick={event => updateOnFilterBadge('datasetfeatures', { label: feature, parentKey: 'datasetfeatures' })}
												data-testid={`badge-${feature}-span`}>
												<div className='badge-tag' data-testid={`badge-${feature}`}>
													{feature}
												</div>
											</span>
										);
									} else {
										return (
											<a
												href={'/search?search=&tab=Datasets&datasetfeatures=' + feature}
												key={`feature-${index}`}
												data-testid={`badge-${feature}-link`}>
												<div className='badge-tag' data-testid={`badge-${feature}`}>
													{feature}
												</div>
											</a>
										);
									}
								} else {
									return (
										<div className='badge-tag' key={`feature-${index}`} data-testid={`badge-${feature}`}>
											{feature}
										</div>
									);
								}
						  })}
				</Col>
				{!showRelationshipQuestion && (
					<Col sm={12} lg={12} className='pad-left-24 pad-right-24 pad-top-24 pad-bottom-16'>
						<span className='gray800-14' data-testid='dataset-description'>
							{(() => {
								if (!data.datasetfields.abstract || typeof data.datasetfields.abstract === 'undefined') {
									if (data.description) {
										return stripMarkdown(data.description, 255);
									}
								} else {
									return stripMarkdown(data.datasetfields.abstract);
								}
							})()}
						</span>
					</Col>
				)}
			</Row>
		</>
	);
}

Dataset.propTypes = {
	data: PropTypes.object.isRequired,
	activeLink: PropTypes.bool.isRequired,
	publisherLogo: PropTypes.string,
	showRelationshipQuestion: PropTypes.bool.isRequired,
	onSearchPage: PropTypes.bool.isRequired,
	isCohortDiscovery: PropTypes.bool.isRequired,
	updateOnFilterBadge: PropTypes.func.isRequired,
	removeButton: PropTypes.func.isRequired,
};

export default Dataset;
