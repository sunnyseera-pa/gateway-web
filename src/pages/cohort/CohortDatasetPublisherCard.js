import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import RelatedObject from '../commonComponents/relatedObject/RelatedObject';
import './Cohorts.scss';

export const CohortDatasetPublisherCard = ({ publisher, publisherGroup }) => {
	let history = useHistory();
	return (
		<Row className='mt-2'>
			<Col sm={12} lg={12}>
				<div className='rectangle pad-bottom-8'>
					<Row>
						<Col sm={10}>
							<span className='black-20-semibold'>{publisher}</span>
						</Col>
						<Col sm={2}>
							<button
								className='button-tertiary floatRight'
								onClick={() => {
									history.push(
										{ pathname: `/data-access-request/publisher/${publisher}` },
										{
											datasets: publisherGroup.map(dataset => {
												return { datasetId: dataset.datasetid, publisher };
											}),
										}
									);
								}}>
								Request access
							</button>
						</Col>
					</Row>
					<Row>
						<Col sm={12} className='gray800-14 hdruk-section-body'>
							<ReactMarkdown
								source={`${publisherGroup.length} ${publisherGroup.length > 1 ? 'datasets' : 'dataset'} from this custodian`}
							/>
						</Col>
					</Row>
				</div>
				{publisherGroup.map(dataset => {
					return (
						<RelatedObject
							entries={parseInt(dataset.count).toLocaleString()}
							objectId={dataset.pid}
							objectType='dataset'
							activeLink={true}
							onSearchPage={false}
							isCohortDatasetsTab={true}
						/>
					);
				})}
			</Col>
		</Row>
	);
};
