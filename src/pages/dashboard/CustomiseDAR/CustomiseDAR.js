import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react';
import { isEmpty, has } from 'lodash';
import { Row, Col, Alert, Tabs, Tab, Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import SVGIcon from '../../../images/SVGIcon';
import EditHowToRequestAccessPage from '../../commonComponents/EditHowToRequestAccessPage/EditHowToRequestAccessPage';
import ActionBar from '../../commonComponents/actionbar/ActionBar';
import './CustomiseDAR.scss';
import { useTranslation } from 'react-i18next';
const baseURL = require('../../commonComponents/BaseURL').getURL();

const CustomiseDAR = ({
    userState,
    hasPublishedDARContent,
    publisherId,
    showConfirmPublishModal,
    setShowConfirmPublishModal,
    showHowToRequestAccessEditor,
    activeTab,
    onSelectTab,
}) => {
    const [publisherDetails, setPublisherDetails] = useState({});
    const [howToRequestAccessStatus, setHowToRequestAccessStatus] = useState();
    const [yourAppFormStatus, setYourAppFormStatus] = useState();
    const [howToRequestAccessPublisher, setHowToRequestAccessPublisher] = useState();
    const [yourApplicationFormPublisher, setYourApplicationFormPublisher] = useState();
    const [showGuidanceModal, setShowGuidanceModal] = useState();

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

    useEffect(async () => {
        let publisherInfo;
        await axios.get(`${baseURL}/api/v1/publishers/${publisherId}`).then(res => {
            publisherInfo = res.data.publisher;
            setPublisherDetails(publisherInfo);
            const body = has(publisherInfo, 'dataRequestModalContent.body') ? publisherInfo.dataRequestModalContent.body : '';
            setSectionStatuses(body, publisherInfo.uses5Safes);
        });

        await getHowToRequestAccessPublisher(publisherInfo);
        await getYourApplicationFormPublisher(publisherInfo);
    }, []);

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

    const getHowToRequestAccessPublisher = async publisherInfo => {
        if (has(publisherInfo, 'dataRequestModalContentUpdatedBy')) {
            const response = await axios.get(`${baseURL}/api/v1/person/${publisherInfo.dataRequestModalContentUpdatedBy}`);
            const {
                data: { person },
            } = response;
            setHowToRequestAccessPublisher(`${person.firstname} ${person.lastname}`);
        }
    };

    const getYourApplicationFormPublisher = async publisherInfo => {
        if (has(publisherInfo, 'applicationFormUpdatedBy')) {
            const response = await axios.get(`${baseURL}/api/v1/person/${publisherInfo.applicationFormUpdatedBy}`);
            const {
                data: { person },
            } = response;
            setYourApplicationFormPublisher(`${person.firstname} ${person.lastname}`);
        }
    };

    const loadCustomiseForm = () => {
        window.location.href = `/data-access-request/customiseForm/${publisherId}`;
    };

    const handleShowGuidanceModal = () => {
        setShowGuidanceModal(true);
    };

    const handleSelectTab = () => {
        setShowGuidanceModal(false);

        onSelectTab();
    };

    return !showHowToRequestAccessEditor ? (
        <Fragment>
            {hasPublishedDARContent &&
            howToRequestAccessStatus === sectionStatuses.ACTIVE &&
            yourAppFormStatus === sectionStatuses.ACTIVE ? (
                <Row className=''>
                    <Col sm={1} lg={1} />
                    <Col sm={10} lg={10}>
                        <Alert variant='success' className='customise-dar-pending-banner mb-3'>
                            <SVGIcon name='check' width={28} height={28} fill={'#2c8267'} />
                            You have successfully updated and published the {publisherDetails.name} application form and ‘How to request
                            access’ information
                        </Alert>
                    </Col>
                    <Col sm={1} lg={10} />
                </Row>
            ) : (
                ''
            )}
            {howToRequestAccessStatus === sectionStatuses.PENDING || yourAppFormStatus === sectionStatuses.PENDING ? (
                <Row className=''>
                    <Col sm={1} lg={1} />
                    <Col sm={10} lg={10}>
                        <Alert variant='warning' className='customise-dar-pending-banner mb-3'>
                            <SVGIcon name='attention' className='pt-1' width={28} height={28} fill={'#f0bb24'} />
                            {howToRequestAccessStatus === sectionStatuses.PENDING
                                ? `The ‘How to request access’ information for ${publisherDetails.name} applications is pending going live until the appication form is published`
                                : `The application form for ${publisherDetails.name} applications is pending going live until the ‘How to request access’ information is published`}
                        </Alert>
                    </Col>
                    <Col sm={1} lg={10} />
                </Row>
            ) : (
                ''
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
                                    <SVGIcon name='info' fill={'#475da7'} className='accountSvgs mr-2' />
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
                                            <Fragment>
                                                <span className='box gray200-14'>Published by</span>
                                                <span className='box gray800-14'>{howToRequestAccessPublisher}</span>
                                            </Fragment>
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
                                    <SVGIcon name='dataaccessicon' fill={'#475da7'} className='accountSvgs mr-2' />
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
                                            <Fragment>
                                                <span className='box gray200-14'>Updated by</span>
                                                <span className='box gray800-14'>
                                                    {publisherDetails.applicationFormUpdatedBy
                                                        ? yourApplicationFormPublisher
                                                        : 'No customisations made'}
                                                </span>
                                            </Fragment>
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
            <Modal
                show={showGuidanceModal}
                onHide={() => {
                    setShowGuidanceModal(false);
                }}>
                <Modal.Header>
                    <Modal.Title>
                        <h1 className='black-20-semibold mb-3'>Applicant guidance for requesting access to data</h1>

                        <div className='soft-black-14'>
                            This guidance will be displayed to all data applicants. To ensure that applicants are prepared for the process,
                            include all necessary information such as; what to do before they submit an application, when data can be
                            released, the cost of accessing data, and any other resources that data applicants would find useful.
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <div>
                        <a style={{ cursor: 'pointer' }} href={'/account?tab=customisedataaccessrequests'}>
                            <Button variant='medium' className='cancelButton dark-14 mr-2'>
                                Cancel
                            </Button>
                        </a>
                    </div>
                    <div className='d-flex justify-content-end flex-grow'>
                        <Button
                            data-test-id='add-collection-publish'
                            variant='primary'
                            className='publishButton white-14-semibold mr-2'
                            type='submit'
                            onClick={() => {
                                this.setState({ showConfirmPublishModal: true });
                            }}>
                            Publish
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </Fragment>
    ) : (
        <EditHowToRequestAccessPage
            userState={userState}
            publisherDetails={publisherDetails}
            showConfirmPublishModal={showConfirmPublishModal}
            setShowConfirmPublishModal={setShowConfirmPublishModal}
        />
    );
};

CustomiseDAR.defaultProps = {
    defaultTab: 'customisedataaccessrequests_guidance',
    onSelectTab: () => {},
};

export default CustomiseDAR;
