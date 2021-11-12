/** @jsx jsx */
import { jsx } from '@emotion/react';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SLA from '../../../commonComponents/sla/SLA';
import ListInfo from '../../../commonComponents/ListInfo';
import DatasetOnboardingHelper from '../../../../utils/DatasetOnboardingHelper.util';
import { dateFormats } from '../../../../utils/GeneralHelper.util';
import '../../../../i18n';
import tick from '../../../../images/tick.svg';
import amber from '../../../../images/attention.svg';
import rejected from '../../../../images/Application_rejected.svg';
import * as styles from './ActivityLogCard.styles';
import Timeline from '../../../commonComponents/Timeline/Timeline';
import BlockQuote from '../../../commonComponents/Blockquote';
import _ from 'lodash';

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
	const {
		versionNumber,
		meta: { applicationStatus },
		dateSubmitted,
		events,
	} = props;

	return (
		<Suspense fallback={t('loading')}>
			<Row>
				<div className='col-md-12'>
					<div className='layoutCard'>
						<div css={styles.activityCard}>
							<Row css={styles.activityLog}>
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
								data={events.map((event, i) => {
									const dateTime = dateFormats(event.timestamp);
									const commentTitle = event.eventType === 'datasetVersionRejected' ? t('activitylog.rejection') : t('comment');

									return {
										icon: <img src={eventStatusIcons[event.eventType]} data-testid={`${i}-${event.eventType}`} alt='Icon' />,
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
													event.datasetUpdates.map(updates => {
														const key = Object.keys(updates)[0];

														return (
															<BlockQuote data-testid={`event-detailed-text-${i}`}>
																<h6 className='mb-3 gray800'>{_.startCase(key.replace(/[^\/]*$/g, '')).replace(/\s/g, ' | ')}</h6>
																<ListInfo
																	data={[
																		{
																			label: t('question'),
																			value: _.startCase(key.replace(/^.*\//, '')),
																		},
																		{
																			label: t('previousAnswer'),
																			value: updates[key].previousAnswer,
																		},
																		{
																			label: t('updatedAnswer'),
																			value: updates[key].updatedAnswer,
																		},
																	]}
																/>
															</BlockQuote>
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

ActivityLogCard.propTypes = {
	applicationStatus: PropTypes.string.isRequired,
	versionNumber: PropTypes.number.isRequired,
	meta: {
		dateSubmitted: PropTypes.string.isRequired,
		dateCreated: PropTypes.string.isRequired,
		applicationStatus: PropTypes.string.isRequired,
	},
	events: PropTypes.arrayOf(PropTypes.object),
};

export default ActivityLogCard;
