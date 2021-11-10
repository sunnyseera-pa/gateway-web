/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SLA from '../../../commonComponents/sla/SLA';
import DatasetOnboardingHelper from '../../../../utils/DatasetOnboardingHelper.util';
import ACTIVITY_LOG_PROP_TYPES from '../../../../services/activitylog/activitylog';
import { dateFormats } from '../../../../utils/GeneralHelper.util';
import approved from '../../../../images/Application_approved.svg';
import rejected from '../../../../images/Application_rejected.svg';
import * as styles from './ActivityLogCard.styles';

let eventStatusIcons = {
	newDatasetVersionSubmitted: rejected,
	datasetVersionApproved: approved,
	datasetVersionRejected: rejected,
	datasetVersionArchived: rejected,
	datasetVersionUnarchived: rejected,
	datasetUpdatesSubmitted: rejected,
};

const ActivityLogCard = props => {
	const { t } = useTranslation();
	const { versionNumber, meta, events } = props;
	return (
		<Row>
			<div className='col-md-12'>
				<div className='layoutCard'>
					<div css={styles.activityCard}>
						<Row css={styles.activityLog()}>
							<Col sm={6} lg={6} data-testid='version-title'>
								<h1>{`Version ${versionNumber}`}</h1>
								<span className='gray800-14'>{`Submitted ${dateFormats(meta.dateSubmitted).dateOnly}`}</span>
							</Col>
							<Col sm={6} lg={6}>
								<span css={styles.applicationStatus} data-testid='status'>
									<SLA
										classProperty={DatasetOnboardingHelper.datasetStatusColours[meta.applicationStatus]}
										text={DatasetOnboardingHelper.datasetSLAText[meta.applicationStatus]}
									/>
								</span>
							</Col>
						</Row>
						{events.map((event, i) => {
							const timestamp = dateFormats(event.timestamp);
							return (
								<div key={`event-${i}`}>
									<Row css={styles.activityLog()}>
										<Col sm={12} lg={12}>
											<h1>
												<span data-testid={`event-title-${i}`}>{timestamp.dateOnly}</span>
											</h1>
										</Col>
									</Row>
									<Row css={styles.activityLog()}>
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
											<span dangerouslySetInnerHTML={{ __html: t(event.eventType, { versionNumber: '2', ...event.userDetails }) }} />
										</Col>
									</Row>
									{event.adminComment && (
										<Row>
											<Col sm={1} lg={1}></Col>
											<Col sm={1} lg={1}></Col>
											<Col sm={10} lg={10}>
												<div css={styles.changeLogCard}>
													<div>
														<span css={styles.changeLog}>
															{meta.applicationStatus === 'rejected' ? 'Reason for rejection:' : 'Admin comment:'}
														</span>
													</div>
													<div>
														<span>{event.adminComment}</span>
													</div>
												</div>
											</Col>
										</Row>
									)}
									{event.datasetUpdates &&
										event.datasetUpdates.map((item, i) => {
											const log = DatasetOnboardingHelper.getUpdatesSubmittedLog(item);
											return (
												<Row css={styles.activityLog()} key={`datasetUpdates-${i}`}>
													<Col sm={1} lg={1}></Col>
													<Col sm={1} lg={1}></Col>
													<Col sm={10} lg={10}>
														<div data-testid={`event-dataset-updates-${i}`} css={styles.changeLogCard}>
															<div data-testid={`heading-${i}`}>
																<span css={styles.changeLog}>{log.heading}</span>
															</div>
															<div data-testid={`question-${i}`}>
																<span css={styles.changeLog}>Question</span>&nbsp;
																{`${log.question}`}
															</div>

															<div data-testid={`answers-${i}`}>
																<p>
																	<span css={styles.changeLog}>Previous Answer</span>&nbsp;
																	{`${log.answers.previousAnswer}`}
																	<br />
																	<span css={styles.changeLog}>Updated Answer</span>&nbsp;
																	{`${log.answers.updatedAnswer}`}
																</p>
															</div>
														</div>
													</Col>
												</Row>
											);
										})}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</Row>
	);
};

ActivityLogCard.propTypes = ACTIVITY_LOG_PROP_TYPES;

export default ActivityLogCard;
