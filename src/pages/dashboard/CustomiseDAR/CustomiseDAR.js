import { has, isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import queryString from 'query-string';
import SVGIcon from '../../../images/SVGIcon';
import Alert from '../../../components/Alert';
import personService from '../../../services/person';
import publishersService from '../../../services/publishers';
import CustomiseDAREditGuidance from '../Components/CustomiseDAREditGuidance';
import './CustomiseDAR.scss';
import { LayoutContent } from '../../../components/Layout';

const baseURL = require('../../commonComponents/BaseURL').getURL();

const CustomiseDAR = ({ userState, publisherId, showConfirmPublishModal, setShowConfirmPublishModal, activeTab, onSelectTab, alert }) => {
    const [publisherDetails, setPublisherDetails] = useState({});
    const [howToRequestAccessStatus, setHowToRequestAccessStatus] = useState();
    const [yourAppFormStatus, setYourAppFormStatus] = useState();
    const [howToRequestAccessPublisher, setHowToRequestAccessPublisher] = useState();
    const [yourApplicationFormPublisher, setYourApplicationFormPublisher] = useState();
    const [showGuidanceModal, setShowGuidanceModal] = useState();
    const [closeGuidanceMessage, setCloseGuidanceMessage] = useState('');

    const { publishedDARContent } = queryString.parse(window.location.search);

    const publishersRequest = publishersService.useGetPublisher(null, {
        onError: ({ title, message }) => {
            NotificationManager.error(message, title, 10000);
        },
    });

    const personGetRequest = personService.useGetPerson(null, {
        onError: ({ title, message }) => {
            NotificationManager.error(message, title, 10000);
        },
    });

    const { t } = useTranslation();

    const sectionStatuses = {
        ACTIVE: 'Live',
        INACTIVE: 'Inactive',
        PENDING: 'Pending',
    };

    const sectionStatusColours = {
        Live: 'green',
        Inactive: 'gray',
        Pending: 'amber',
    };

    const getHowToRequestAccessPublisher = async publisherInfo => {
        if (has(publisherInfo, 'dataRequestModalContentUpdatedBy')) {
            personGetRequest.mutateAsync(publisherInfo.dataRequestModalContentUpdatedBy).then(res => {
                const {
                    data: { person },
                } = res;

                setHowToRequestAccessPublisher(`${person.firstname} ${person.lastname}`);
            });
        }
    };

    const getYourApplicationFormPublisher = async publisherInfo => {
        if (has(publisherInfo, 'applicationFormUpdatedBy')) {
            personGetRequest.mutateAsync(publisherInfo.applicationFormUpdatedBy).then(res => {
                const {
                    data: { person },
                } = res;

                setYourApplicationFormPublisher(`${person.firstname} ${person.lastname}`);
            });
        }
    };

    const setSectionStatuses = (htraContent, applicationContentComplete) => {
        if (!isEmpty(htraContent)) {
            if (applicationContentComplete) {
                setHowToRequestAccessStatus(sectionStatuses.ACTIVE);
                setYourAppFormStatus(sectionStatuses.ACTIVE);
            } else {
                setHowToRequestAccessStatus(sectionStatuses.PENDING);
                setYourAppFormStatus(sectionStatuses.INACTIVE);
            }
        } else if (applicationContentComplete) {
            setYourAppFormStatus(sectionStatuses.PENDING);
            setHowToRequestAccessStatus(sectionStatuses.INACTIVE);
        } else {
            setYourAppFormStatus(sectionStatuses.INACTIVE);
            setHowToRequestAccessStatus(sectionStatuses.INACTIVE);
        }
    };

    const getModalData = () => {
        publishersRequest.mutateAsync(publisherId).then(async res => {
            const {
                data: { publisher },
            } = res;
            const body = has(publisher, 'dataRequestModalContent.body') ? publisher.dataRequestModalContent.body : '';

            setSectionStatuses(body, publisher.uses5Safes);
            setPublisherDetails(publisher);

            await getHowToRequestAccessPublisher(publisher);
            await getYourApplicationFormPublisher(publisher);
        });
    };

    useEffect(() => {
        getModalData();
    }, [publisherId]);

    const loadCustomiseForm = () => {
        window.location.href = `/data-access-request/customiseForm/${publisherId}`;
    };

    const handleShowGuidanceModal = () => {
        setShowGuidanceModal(true);
    };

    const handleSelectTab = tabId => {
        setShowGuidanceModal(false);

        onSelectTab(tabId);
    };

    const handleCloseGuidanceMessage = () => {
        setCloseGuidanceMessage('');
    };

    return (
        <>
            {(closeGuidanceMessage || alert.message) && (
                <LayoutContent>
                    <Alert variant='success' autoclose onClose={handleCloseGuidanceMessage} mb={3}>
                        {closeGuidanceMessage || alert.message}
                    </Alert>
                </LayoutContent>
            )}

            {(howToRequestAccessStatus === sectionStatuses.PENDING || yourAppFormStatus === sectionStatuses.PENDING) && (
                <LayoutContent>
                    <Alert variant='warning' mb={3}>
                        {howToRequestAccessStatus === sectionStatuses.PENDING
                            ? `The ‘How to request access’ information for ${publisherDetails.name} applications is pending going live until the appication form is published`
                            : `The application form for ${publisherDetails.name} applications is pending going live until the ‘How to request access’ information is published`}
                    </Alert>
                </LayoutContent>
            )}

            <div className='row justify-content-md-center'>
                <div className='col-sm-12 col-md-10'>
                    <div className='accountHeader'>
                        <div>
                            <h1 className='black-20-semibold'>Customise data access requests</h1>
                            <div className='soft-black-14'>
                                Manage and edit the guidance you provide to data applicants, your data access request form, and the
                                workflows you use to manage the data access requests you receive.
                            </div>
                        </div>
                    </div>
                    <div className='tabsBackground mb-3'>
                        <Tabs className='dataAccessTabs gray700-13' activeKey={activeTab} onSelect={handleSelectTab}>
                            <Tab eventKey='customisedataaccessrequests_guidance' title={t('tabs.presubmissionGuidance')}>
                                {' '}
                            </Tab>
                            <Tab eventKey='customisedataaccessrequests_applicationform' title={t('tabs.applicationForm')}>
                                {' '}
                            </Tab>
                        </Tabs>
                    </div>

                    {activeTab === 'customisedataaccessrequests_guidance' && (
                        <div className='main-card cursorPointer' onClick={handleShowGuidanceModal}>
                            <div className='super-header'>
                                <h1 className='black-20-semibold mb-3'>
                                    <SVGIcon name='info' fill='#475da7' className='accountSvgs mr-2' />
                                    <span className='ml-3'>Applicant guidance for requesting access to data</span>
                                    <div className={`status-chip sla-${sectionStatusColours[howToRequestAccessStatus]}`}>
                                        {howToRequestAccessStatus}
                                    </div>
                                </h1>
                                <div className='main-header-desc'>
                                    <div className='soft-black-14'>
                                        This guidance will be displayed to all data applicants. To ensure that applicants are prepared for
                                        the process, include all necessary information such as; what to do before they submit an
                                        application, when data can be released, the cost of accessing data, and any other resources that
                                        data applicants would find useful.
                                    </div>
                                    <div className='customise-dar-body'>
                                        {publisherDetails.dataRequestModalContentUpdatedBy ? (
                                            <>
                                                <span className='box gray200-14'>Published by</span>
                                                <span className='box gray800-14'>{howToRequestAccessPublisher}</span>
                                            </>
                                        ) : (
                                            ''
                                        )}
                                        <span className='box gray200-14'>Last activity</span>
                                        <span className='box gray800-14'>
                                            {publisherDetails.dataRequestModalContentUpdatedOn
                                                ? moment(publisherDetails.dataRequestModalContentUpdatedOn).format('DD MMM YYYY HH:mm')
                                                : 'No customisations made'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'customisedataaccessrequests_applicationform' && (
                        <div className='main-card cursorPointer' onClick={() => loadCustomiseForm()}>
                            <div className='super-header'>
                                <h1 className='black-20-semibold mb-3'>
                                    <SVGIcon name='dataaccessicon' fill='#475da7' className='accountSvgs mr-2' />
                                    <span className='ml-3'>
                                        {has(publisherDetails, 'publisherDetails.name') ? publisherDetails.publisherDetails.name : ''} data
                                        access application form
                                    </span>
                                    <div className={`status-chip sla-${sectionStatusColours[yourAppFormStatus]}`}>{yourAppFormStatus}</div>
                                </h1>
                                <div className='main-header-desc'>
                                    <div className='soft-black-14'>
                                        <p>
                                            You are able to customise the form that users need to complete to request access to your
                                            datasets. You can remove certain questions from your form and edit the guidance. However some
                                            questions and guidance are mandatory as they are based on National Data Guardian practices.
                                        </p>
                                        <p>
                                            If you would like to add any additional questions to the form, please raise a support ticket at
                                            the following link:{' '}
                                            <a
                                                href='https://hdruk.atlassian.net/servicedesk/customer/portal/1'
                                                rel='noopener noreferrer'
                                                target='_blank'>
                                                https://hdruk.atlassian.net/servicedesk/customer/portal/1
                                            </a>
                                        </p>
                                    </div>
                                    <div className='customise-dar-body'>
                                        {publisherDetails.applicationFormUpdatedBy ? (
                                            <>
                                                <span className='box gray200-14'>Updated by</span>
                                                <span className='box gray800-14'>
                                                    {publisherDetails.applicationFormUpdatedBy
                                                        ? yourApplicationFormPublisher
                                                        : 'No customisations made'}
                                                </span>
                                            </>
                                        ) : (
                                            ''
                                        )}
                                        <span className='box gray200-14'>Last activity</span>
                                        <span className='box gray800-14'>
                                            {publisherDetails.applicationFormUpdatedOn
                                                ? moment(publisherDetails.applicationFormUpdatedOn).format('DD MMM YYYY HH:mm')
                                                : 'No customisations made'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {showGuidanceModal && (
                <CustomiseDAREditGuidance
                    userState={userState}
                    publisherDetails={publisherDetails}
                    showConfirmPublishModal={showConfirmPublishModal}
                    setShowConfirmPublishModal={setShowConfirmPublishModal}
                    show={showGuidanceModal}
                    onHide={successMsg => {
                        if (successMsg) {
                            getModalData();

                            setCloseGuidanceMessage(successMsg);
                        }

                        setShowGuidanceModal(false);
                    }}
                />
            )}
        </>
    );
};

CustomiseDAR.defaultProps = {
    defaultTab: 'customisedataaccessrequests_guidance',
    onSelectTab: () => {},
};

export default CustomiseDAR;
