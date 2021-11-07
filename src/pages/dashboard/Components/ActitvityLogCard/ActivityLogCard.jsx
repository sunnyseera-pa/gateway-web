/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SLA from '../../../commonComponents/sla/SLA';
import DatasetOnboardingHelper from '../../../../utils/DatasetOnboardingHelper.util';
import { dateFormats } from '../../../../utils/GeneralHelper.util';
import * as styles from './ActivityLogCard.styles';

const ActivityLogCard = props => {
	const { versionNumber, applicationStatus, dateSubmitted, events } = props;
	return (
		<Row>
			<div className='col-md-12'>
				<div className='layoutCard'>
					<div css={styles.activityCard}>
						<Row css={styles.activityLog}>
							<Col sm={6} lg={6} data-testid='version-title'>
								<h1>{`Version ${versionNumber}`}</h1>
								<span>{`Submitted ${dateFormats(dateSubmitted).dateOnly}`}</span>
							</Col>
							<Col sm={6} lg={6}>
								<span css={styles.applicationStatus} data-testid='status'>
									<SLA
										classProperty={DatasetOnboardingHelper.datasetStatusColours[applicationStatus]}
										text={DatasetOnboardingHelper.datasetSLAText[applicationStatus]}
									/>
								</span>
							</Col>
						</Row>
						{events.map((event, i) => {
							const timestamp = dateFormats(event.timestamp);
							return (
								<div key={`event-${i}`}>
									<Row css={styles.activityLog}>
										<Col sm={12} lg={12}>
											<h1>
												<span data-testid={`event-title-${i}`}>{timestamp.dateOnly}</span>
											</h1>
										</Col>
									</Row>
									<Row css={styles.activityLog}>
										<Col sm={1} lg={1}>
											<span>{timestamp.timeOnly}</span>
										</Col>
										<Col sm={1} lg={1}>
											<span data-testid={`event-time-${i}`}>{timestamp.timeOnly}</span>
										</Col>
										<Col sm={10} lg={10}>
											<span data-testid={`event-text-${i}`}>{event.plainText}</span>
										</Col>
									</Row>
									{event.detailedText && (
										<Row css={styles.activityLog}>
											<Col sm={1} lg={1}></Col>
											<Col sm={1} lg={1}></Col>
											<Col sm={10} lg={10}>
												<div className='jumbotron' data-testid={`event-detailed-text-${i}`}>
													<span>{event.detailedText}</span>
												</div>
											</Col>
										</Row>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</Row>
	);
};

ActivityLogCard.propTypes = {
	applicationStatus: PropTypes.string.isRequired,
	versionNumber: PropTypes.number.isRequired,
	dateSubmitted: PropTypes.string.isRequired,
	events: PropTypes.arrayOf(PropTypes.object),
};

export default ActivityLogCard;
