/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SLA from '../../../commonComponents/sla/SLA';
import DatasetOnboardingHelper from '../../../../utils/DatasetOnboardingHelper.util';
import { dateFormats } from '../../../../utils/GeneralHelper.util';
import '../../../../i18n';
import tick from '../../../../images/tick.svg';
import amber from '../../../../images/attention.svg';
import rejected from '../../../../images/Application_rejected.svg';
import * as styles from './ActivityLogCard.styles';

let eventStatusIcons = {
	newDatasetVersionSubmitted: rejected,
	datasetVersionApproved: tick,
	datasetVersionRejected: rejected,
	datasetVersionArchived: rejected,
	datasetVersionUnarchived: rejected,
	datasetUpdatesSubmitted: rejected,
};

const ActivityLogCard = props => {
	const { t } = useTranslation();
	const { versionNumber, applicationStatus, dateSubmitted, events } = props;
	return (
		<Suspense fallback={'loading'}>
			<Row>
				<div className='col-md-12'>
					<div className='layoutCard'>
						<div css={styles.activityCard}>
							<Row css={styles.activityLog}>
								<Col sm={6} lg={6} data-testid='version-title'>
									<h1>{`Version ${versionNumber}`}</h1>
									<span className='gray800-14'>{`Submitted ${dateFormats(dateSubmitted).dateOnly}`}</span>
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
												<span>
													<img src={eventStatusIcons[event.eventType]} data-testid={`${i}-${event.eventType}`} alt='Icon' />
												</span>
											</Col>
											<Col sm={1} lg={1}>
												<span className='gray800-14' data-testid={`event-time-${i}`}>
													{timestamp.timeOnly}
												</span>
											</Col>
											<Col sm={10} lg={10}>
												<span>{t(event.eventType, { versionNumber: '2', ...event.userDetails })}</span>
												<span data-testid={`event-text-${i}`}>{event.plainText && event.plainText}</span>
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
		</Suspense>
	);
};

ActivityLogCard.propTypes = {
	applicationStatus: PropTypes.string.isRequired,
	versionNumber: PropTypes.number.isRequired,
	dateSubmitted: PropTypes.string.isRequired,
	events: PropTypes.arrayOf(PropTypes.object),
};

export default ActivityLogCard;
