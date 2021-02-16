import React, { Fragment, useState } from 'react';
import { OverlayTrigger, Tooltip, Row, Button, Accordion, Col } from 'react-bootstrap';
import _ from 'lodash';
import SLA from '../commonComponents/sla/SLA';
import TimeDuration from './timeDuration/TimeDuration';
import AccessActivity from '../../pages/dashboard/DataAccessRequests/AccessActivity/AccessActivity';
import DatasetOnboardingHelper from './../../utils/DatasetOnboardingHelper.util';
import CommentItem from '../dashboard/DataAccessRequests/CommentItem/CommentItem.js';
import StatusDisplay from './StatusDisplay';
import SVGIcon from '../../images/SVGIcon';
import moment from 'moment';

import '../commonComponents/DatasetCard.scss';

export const DatasetCard = props => {
    let { id, publisher, title, version, isDraft, datasetStatus, completion, createdAt, lastActivity, rejectionText } = props;
    const [flagClosed, setFlagClosed] = useState(true);
    
    return (
        <Row
            key={`dataset_card_${title}`}
            onClick={event => window.location.href = `/dataset-onboarding/${id}`}>
            {/* onClick={e => this.navigateToLocation(e, _id, applicationStatus)} */}
            <div className='col-md-12'>
                <div className='layoutCard mb-0'>
                    <div className='header mb-0 mt-2'>
                        <div className='header-title'>
                            <h1>{title}</h1>
                        </div>
                        <div className='header-status'>
                            {datasetStatus === 'draft' ? (
                                <TimeDuration text={`${DatasetOnboardingHelper.calculateTimeDifference(createdAt)} days since start`} />
                            ) : ('')}

                            {datasetStatus === 'inReview' ? (
                                <TimeDuration text={`${DatasetOnboardingHelper.calculateTimeDifference(createdAt)} days since submission`} />
                            ) : ('')}

                            <SLA classProperty={DatasetOnboardingHelper.datasetStatusColours[datasetStatus]} text={DatasetOnboardingHelper.datasetSLAText[datasetStatus]} />
                        </div>
                    </div>
                    <div className='dataset-completion-wheels'>
                        {Object.keys(completion).map(key => (
                            <OverlayTrigger
                                key={key}
                                placement='top'
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        {key}: {completion[key]}
                                    </Tooltip>
                                }>
                                <div>
                                    <StatusDisplay section={key} status={completion[key]} />
                                </div>
                            </OverlayTrigger>
                        ))}
                    </div>

                    <div className='body'>
                        <Fragment>
                            <div className='box'>Publisher</div>
                            <div className='box'>{publisher}</div>
                            <div className='box'>Version</div>
                            <div className='box'>
                                {version}
                                {datasetStatus === 'draft' ? ' (Draft)' : ''}

                                {/* {isDraft ? ' (Draft)' : ` (${datasetStatus})`} */}
                            </div>
                            {/* <div className='box version-list'>Version2</div>
							<div className='box'>
								<Accordion defaultActiveKey='1' style={{ width: '100%' }}>
									<Accordion.Toggle
										as={Button}
										variant='link'
										eventKey='0'
										onClick={() => setFlagClosed(!flagClosed)}
										data-testid='accordion-toggle'
										style={{ width: '100%', padding: '0px', border: '0px' }}
										className='version-list'>
										<div className='version-list'>
											4.99 (Example)
											<SVGIcon
												name='chevronbottom'
												fill={'#475da7'}
												style={{ width: '18px', height: '18px', paddingLeft: '4px' }}
												className={flagClosed === true ? 'svg-24' : 'svg-24 flipSVG'}
											/>
										</div>
									</Accordion.Toggle>
									<Accordion.Collapse eventKey='0' style={{ paddingRight: '20px' }}>
										<Fragment>
											<div className='version-list'>4.5 (Example)</div>
											<div className='version-list'>4.4 (Example)</div>
											<div className='version-list'>4.2 (Example)</div>
										</Fragment>
									</Accordion.Collapse>
								</Accordion>
							</div> */}

                            <div className='box'>Last activity</div>
                            <div className='box'>{moment(lastActivity).format('D MMMM YYYY HH:mm')}</div>

                            {/* <div className='box'>
								{moment(updatedAt).format('D MMMM YYYY HH:mm')}
								{isTeam == true ? (
									<div className='box-meta'>
										{applicationStatus === DatasetOnboardingHelper.darStatus.submitted ? (
											<button
												id='startReview'
												className='button-primary'
												onClick={e => {
													onClickStartReview(e);
												}}>
												Start review
											</button>
										) : !_.isEmpty(reviewStatus) || !_.isEmpty(amendmentStatus) ? (
											setActivityMeta()
										) : (
											''
										)}
									</div>
								) : !_.isEmpty(amendmentStatus) ? (
									setActivityMeta()
								) : (
									''
								)}
							</div> */}
                        </Fragment>
                    </div>
                    {datasetStatus === 'rejected' ? (
                        <CommentItem
                            text={rejectionText}
                            title={'Reason for rejection'}
                            subtitle={`Paul McCafferty`}
                            decisionDate={moment(lastActivity).format('D MMMM YYYY HH:mm')}
                        />
                    ) : (
                            ''
                        )}
                </div>
            </div>
        </Row>
    );
};

export default DatasetCard;
