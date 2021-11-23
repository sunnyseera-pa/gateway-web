/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ACTIVITY_LOG_PROP_TYPES from '../../../../services/activitylog/activitylog';
import DatasetOnboardingHelper from '../../../../utils/DatasetOnboardingHelper.util';
import { dateFormats } from '../../../../utils/GeneralHelper.util';
import BlockQuote from '../../../storybookComponents/BlockQuote';
import Icon from '../../../storybookComponents/Icon';
import ListInfo from '../../../storybookComponents/ListInfo';
import SLA from '../../../commonComponents/sla/SLA';
import Timeline from '../../../storybookComponents/Timeline';
import * as styles from './ActivityLogCard.styles';

let eventStatusIcons = {
	newDatasetVersionSubmitted: 'Versions_created',
	datasetVersionApproved: 'Application_approved',
	datasetVersionRejected: 'Application_rejected',
	datasetVersionArchived: 'Updates_requested',
	datasetVersionUnarchived: 'Updates_requested',
	datasetUpdatesSubmitted: 'Updates_requested',
};

const ActivityLogCard = props => {
	const { t } = useTranslation();
	const {
		versionNumber,
		meta: { applicationStatus, dateSubmitted },
		events,
		mb,
	} = props;

	return (
		<Suspense fallback={t('loading')}>
			<Row>
				<div className='col-md-12'>
					<div className='layoutCard'>
						<div css={styles.activityCard}>
							<Row css={styles.activityLog(mb)}>
								<Col sm={6} lg={6} data-testid='version-title'>
									<h1>{`Version ${versionNumber}`}</h1>
									<span className='gray800-14'>{t('datetime.submitted', { datetime: dateFormats(dateSubmitted).dateOnly })}</span>
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
							<Timeline
								data={events.map((event, index) => {
									const dateTime = dateFormats(event.timestamp);
									const commentTitle = event.eventType === 'datasetVersionRejected' ? t('activitylog.rejection') : t('comment');

									return {
										icon: <Icon name={eventStatusIcons[event.eventType]} data-testid={`${index}-${event.eventType}`} size='4xl' />,
										time: dateTime.timeOnly,
										content: (
											<div>
												<div
													dangerouslySetInnerHTML={{
														__html: t(event.eventType, { versionNumber: event.version.replace(/\..*$/, ''), ...event.userDetails }),
													}}
													className='mb-3'
												/>
												{event.adminComment && (
													<BlockQuote>
														<h6 className='mb-3 gray800'>{commentTitle}</h6>
														<p className='mb-0'>{event.adminComment}</p>
													</BlockQuote>
												)}
												{event.datasetUpdates &&
													event.datasetUpdates.map((item, i) => {
														const log = DatasetOnboardingHelper.getUpdatesSubmittedLog(item);

														return (
															<div data-testid={`event-detailed-text-${index}-${i}`}>
																<BlockQuote>
																	<h6 className='mb-3 gray800'>{log.heading}</h6>
																	<ListInfo
																		data={[
																			{
																				label: t('question'),
																				value: log.question,
																			},
																			{
																				label: t('previousAnswer'),
																				value: log.answers.previousAnswer,
																			},
																			{
																				label: t('updatedAnswer'),
																				value: log.answers.updatedAnswer,
																			},
																		]}
																	/>
																</BlockQuote>
															</div>
														);
													})}
											</div>
										),
									};
								})}
							/>
						</div>
					</div>
				</div>
			</Row>
		</Suspense>
	);
};

ActivityLogCard.defaultProps = {
	mb: 20,
};

ActivityLogCard.propTypes = {
	...ACTIVITY_LOG_PROP_TYPES,
	mb: PropTypes.string,
};

export default ActivityLogCard;
