import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Row, Col, Button, Tabs, Tab, DropdownButton, Dropdown } from 'react-bootstrap';
import MessageNotFound from '../commonComponents/MessageNotFound';
import Loading from '../commonComponents/Loading';
import ActionModal from '../commonComponents/ActionModal/ActionModal';
import './Dashboard.scss';
import { EntityActionButton } from './EntityActionButton.jsx';
import googleAnalytics from '../../tracking';
import { PaginationHelper } from '../commonComponents/PaginationHelper';
import { LayoutContent } from '../../components/Layout';

var baseURL = require('../commonComponents/BaseURL').getURL();

export const AccountProjects = props => {
    const [userState] = useState(props.userState);
    const [key, setKey] = useState('active');
    const [projectsList, setProjectsList] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [pendingIndex, setPendingIndex] = useState(0);
    const [rejectedIndex, setRejectedIndex] = useState(0);
    const [archiveIndex, setArchiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isResultsLoading, setIsResultsLoading] = useState(true);
    const [activeCount, setActiveCount] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [archiveCount, setArchiveCount] = useState(0);
    const [showActionModal, setShowActionModal] = useState(false);
    const actionModalConfig = {
        title: 'Reject this Project?',
    };
    const maxResults = 40;

    useEffect(() => {
        doProjectsCall('active', true, 0, true);
    }, []);

    const handleSelect = key => {
        setKey(key);

        let index;
        if (key === 'active') {
            index = activeIndex;
        } else if (key === 'pending') {
            index = pendingIndex;
        } else if (key === 'rejected') {
            index = rejectedIndex;
        } else if (key === 'archive') {
            index = archiveIndex;
        }

        doProjectsCall(key, false, index);
    };

    const doProjectsCall = (key, updateCounts, index, firstLoad) => {
        if (key === 'pending') {
            key = 'review';
        }
        if (firstLoad === true) {
            setIsLoading(true);
        }
        setIsResultsLoading(true);

        let apiUrl;
        if (typeof index === 'undefined') {
            apiUrl = baseURL + `/api/v1/projects/getList?status=${key}`;
        } else {
            apiUrl = baseURL + `/api/v1/projects/getList?status=${key}&offset=${index}&limit=${maxResults}`;
        }

        axios.get(apiUrl).then(res => {
            setProjectsList(res.data.data[0]);

            if (updateCounts === true) {
                setActiveCount(res.data.data[1].activeCount);
                setReviewCount(res.data.data[1].reviewCount);
                setArchiveCount(res.data.data[1].archiveCount);
                setRejectedCount(res.data.data[1].rejectedCount);
            }

            if (firstLoad === true) {
                setIsLoading(false);
            }
            setIsResultsLoading(false);
        });
        window.scrollTo(0, 0);
    };

    const approveProject = (id, key, index, count) => {
        axios
            .patch(baseURL + '/api/v1/projects/' + id, {
                activeflag: 'active',
            })
            .then(res => {
                if (shouldChangeTab()) {
                    setKey('active');
                    doProjectsCall('active', true);
                } else if (!shouldChangeTab() && count - (index + maxResults) <= 0 && count % maxResults === 1) {
                    if (key === 'pending') {
                        setPendingIndex(index - maxResults);
                    } else if (key === 'archive') {
                        setArchiveIndex(index - maxResults);
                    }
                    doProjectsCall(key, true, index - maxResults);
                } else if (!shouldChangeTab()) {
                    doProjectsCall(key, true, index);
                }
            });
    };

    const rejectProject = (id, rejectionReason, key, index, count) => {
        axios
            .patch(baseURL + '/api/v1/projects/' + id, {
                id: id,
                activeflag: 'rejected',
                rejectionReason: rejectionReason,
            })
            .then(res => {
                if (shouldChangeTab()) {
                    setKey('active');
                    doProjectsCall('active', true);
                } else if (!shouldChangeTab() && count - (index + maxResults) <= 0 && count % maxResults === 1) {
                    if (key === 'pending') {
                        setPendingIndex(index - maxResults);
                    } else if (key === 'archive') {
                        setArchiveIndex(index - maxResults);
                    }
                    doProjectsCall(key, true, index - maxResults);
                } else if (!shouldChangeTab()) {
                    doProjectsCall(key, true, index);
                }
            });
    };

    const archiveProject = id => {
        axios
            .patch(baseURL + '/api/v1/projects/' + id, {
                id: id,
                activeflag: 'archive',
            })
            .then(res => {
                setKey('active');
                if (activeCount - (activeIndex + maxResults) <= 0 && activeCount % maxResults === 1) {
                    setActiveIndex(activeIndex - maxResults);
                    doProjectsCall(key, true, activeIndex - maxResults);
                } else {
                    doProjectsCall('active', true, activeIndex);
                }
            });
    };

    const toggleActionModal = () => {
        setShowActionModal(!showActionModal);
    };

    const shouldChangeTab = () => {
        return (key === 'pending' && reviewCount <= 1) || (key === 'archive' && archiveCount <= 1) ? true : false;
    };

    if (isLoading) {
        return (
            <LayoutContent>
                <Loading data-testid='isLoading' />
            </LayoutContent>
        );
    }

    return (
        <div>
            <LayoutContent>
                <Row className='accountHeader'>
                    <Col sm={12} md={8}>
                        <Row>
                            <span className='black-20'>Projects</span>
                        </Row>
                        <Row>
                            <span className='gray700-13 '>Manage your existing projects or add new ones</span>
                        </Row>
                    </Col>
                    <Col sm={12} md={4} style={{ textAlign: 'right' }}>
                        <Button
                            variant='primary'
                            href='/project/add'
                            className='addButton'
                            onClick={() =>
                                googleAnalytics.recordEvent('Projects', 'Add a new project', 'Projects dashboard button clicked')
                            }
                        >
                            + Add a new project
                        </Button>
                    </Col>
                </Row>

                <Row className='tabsBackground'>
                    <Col sm={12} lg={12}>
                        <Tabs className='dataAccessTabs gray700-13' data-testid='projectTabs' activeKey={key} onSelect={handleSelect}>
                            <Tab eventKey='active' title={'Active (' + activeCount + ')'}>
                                {' '}
                            </Tab>
                            <Tab eventKey='pending' title={'Pending approval (' + reviewCount + ')'}>
                                {' '}
                            </Tab>
                            <Tab eventKey='rejected' title={'Rejected (' + rejectedCount + ')'}>
                                {' '}
                            </Tab>
                            <Tab eventKey='archive' title={'Archive (' + archiveCount + ')'}>
                                {' '}
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>

                {isResultsLoading && (
                    <Row className='width-100'>
                        <Col xs={12} className='noPadding'>
                            <Loading />
                        </Col>
                    </Row>
                )}

                {!isResultsLoading &&
                    (() => {
                        switch (key) {
                            case 'active':
                                return (
                                    <div>
                                        {activeCount <= 0 ? (
                                            ''
                                        ) : (
                                            <Row className='subHeader mt-3 gray800-14-bold'>
                                                <Col xs={2}>Last activity</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Uploader(s)</Col>
                                                <Col xs={3}></Col>
                                            </Row>
                                        )}

                                        {activeCount <= 0 ? (
                                            <Row className='margin-right-15'>
                                                <MessageNotFound word='projects' />
                                            </Row>
                                        ) : (
                                            projectsList.map(project => {
                                                if (project.activeflag !== 'active') {
                                                    return <></>;
                                                } else {
                                                    return (
                                                        <Row className='entryBox' data-testid='projectEntryActive'>
                                                            <Col sm={12} lg={2} className='pt-2 gray800-14'>
                                                                {moment(project.updatedAt).format('D MMMM YYYY HH:mm')}
                                                            </Col>
                                                            <Col sm={12} lg={5} className='pt-2'>
                                                                <a href={'/project/' + project.id} className='black-14'>
                                                                    {project.name}
                                                                </a>
                                                            </Col>
                                                            <Col sm={12} lg={2} className='pt-2 gray800-14'>
                                                                {project.persons <= 0
                                                                    ? 'Author not listed'
                                                                    : project.persons.map(person => {
                                                                          return (
                                                                              <span>
                                                                                  {person.firstname} {person.lastname} <br />
                                                                              </span>
                                                                          );
                                                                      })}
                                                            </Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: 'right' }} className='toolsButtons'>
                                                                <DropdownButton
                                                                    variant='outline-secondary'
                                                                    alignRight
                                                                    title='Actions'
                                                                    className='floatRight'
                                                                >
                                                                    <Dropdown.Item
                                                                        href={'/project/edit/' + project.id}
                                                                        className='black-14'
                                                                    >
                                                                        Edit
                                                                    </Dropdown.Item>
                                                                    <EntityActionButton
                                                                        id={project.id}
                                                                        action={archiveProject}
                                                                        entity='project'
                                                                        actionType='archive'
                                                                    />
                                                                </DropdownButton>
                                                            </Col>
                                                        </Row>
                                                    );
                                                }
                                            })
                                        )}
                                    </div>
                                );
                            case 'pending':
                                return (
                                    <div>
                                        {reviewCount <= 0 ? (
                                            ''
                                        ) : (
                                            <Row className='subHeader mt-3 gray800-14-bold'>
                                                <Col xs={2}>Last activity</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Author</Col>
                                                <Col xs={3}></Col>
                                            </Row>
                                        )}

                                        {reviewCount <= 0 ? (
                                            <Row className='margin-right-15'>
                                                <MessageNotFound word='projects' />
                                            </Row>
                                        ) : (
                                            projectsList.map(project => {
                                                if (project.activeflag !== 'review') {
                                                    return <></>;
                                                } else {
                                                    return (
                                                        <Row className='entryBox' data-testid='projectEntryPending'>
                                                            <Col sm={12} lg={2} className='pt-2 gray800-14'>
                                                                {moment(project.updatedAt).format('D MMMM YYYY HH:mm')}
                                                            </Col>
                                                            <Col sm={12} lg={5} className='pt-2'>
                                                                <a href={'/project/' + project.id} className='black-14'>
                                                                    {project.name}
                                                                </a>
                                                            </Col>
                                                            <Col sm={12} lg={2} className='pt-2 gray800-14'>
                                                                {project.persons <= 0
                                                                    ? 'Author not listed'
                                                                    : project.persons.map(person => {
                                                                          return (
                                                                              <span>
                                                                                  {person.firstname} {person.lastname} <br />
                                                                              </span>
                                                                          );
                                                                      })}
                                                            </Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: 'right' }} className='toolsButtons'>
                                                                {userState[0].role === 'Admin' ? (
                                                                    <DropdownButton
                                                                        variant='outline-secondary'
                                                                        alignRight
                                                                        title='Actions'
                                                                        className='floatRight'
                                                                    >
                                                                        <Dropdown.Item
                                                                            href={'/project/edit/' + project.id}
                                                                            className='black-14'
                                                                        >
                                                                            Edit
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item
                                                                            href='#'
                                                                            onClick={() =>
                                                                                approveProject(project.id, key, pendingIndex, reviewCount)
                                                                            }
                                                                            className='black-14'
                                                                        >
                                                                            Approve
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item
                                                                            href='#'
                                                                            onClick={() => toggleActionModal()}
                                                                            className='black-14'
                                                                        >
                                                                            Reject
                                                                        </Dropdown.Item>
                                                                        <ActionModal
                                                                            id={project.id}
                                                                            entityKey={'pending'}
                                                                            entityIndex={pendingIndex}
                                                                            entityCount={reviewCount}
                                                                            open={showActionModal}
                                                                            context={actionModalConfig}
                                                                            updateApplicationStatus={rejectProject}
                                                                            close={toggleActionModal}
                                                                        />
                                                                    </DropdownButton>
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    );
                                                }
                                            })
                                        )}
                                    </div>
                                );
                            case 'rejected':
                                return (
                                    <div>
                                        {rejectedCount <= 0 ? (
                                            ''
                                        ) : (
                                            <Row className='subHeader mt-3 gray800-14-bold'>
                                                <Col xs={2}>Last activity</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Author</Col>
                                                <Col xs={3}></Col>
                                            </Row>
                                        )}

                                        {rejectedCount <= 0 ? (
                                            <Row className='margin-right-15'>
                                                <MessageNotFound word='projects' />
                                            </Row>
                                        ) : (
                                            projectsList.map(project => {
                                                if (project.activeflag !== 'rejected') {
                                                    return <></>;
                                                } else {
                                                    return (
                                                        <Row className='entryBox' data-testid='projectEntryRejected'>
                                                            <Col sm={12} lg={2} className='pt-2 gray800-14'>
                                                                {moment(project.updatedAt).format('D MMMM YYYY HH:mm')}
                                                            </Col>
                                                            <Col sm={12} lg={5} className='pt-2'>
                                                                <a href={'/project/' + project.id} className='black-14'>
                                                                    {project.name}
                                                                </a>
                                                            </Col>
                                                            <Col sm={12} lg={2} className='pt-2 gray800-14'>
                                                                {project.persons <= 0
                                                                    ? 'Author not listed'
                                                                    : project.persons.map(person => {
                                                                          return (
                                                                              <span>
                                                                                  {person.firstname} {person.lastname} <br />
                                                                              </span>
                                                                          );
                                                                      })}
                                                            </Col>

                                                            <Col
                                                                sm={12}
                                                                lg={3}
                                                                style={{ textAlign: 'right' }}
                                                                className='toolsButtons'
                                                            ></Col>
                                                        </Row>
                                                    );
                                                }
                                            })
                                        )}
                                    </div>
                                );
                            case 'archive':
                                return (
                                    <div>
                                        {archiveCount <= 0 ? (
                                            ''
                                        ) : (
                                            <Row className='subHeader mt-3 gray800-14-bold'>
                                                <Col xs={2}>Last activity</Col>
                                                <Col xs={5}>Name</Col>
                                                <Col xs={2}>Author</Col>
                                                <Col xs={3}></Col>
                                            </Row>
                                        )}

                                        {archiveCount <= 0 ? (
                                            <Row className='margin-right-15'>
                                                <MessageNotFound word='projects' />
                                            </Row>
                                        ) : (
                                            projectsList.map(project => {
                                                if (project.activeflag !== 'archive') {
                                                    return <></>;
                                                } else {
                                                    return (
                                                        <Row className='entryBox' data-testid='projectEntryArchive'>
                                                            <Col sm={12} lg={2} className='pt-2 gray800-14'>
                                                                {moment(project.updatedAt).format('D MMMM YYYY HH:mm')}
                                                            </Col>
                                                            <Col sm={12} lg={5} className='pt-2'>
                                                                <a href={'/project/' + project.id} className='black-14'>
                                                                    {project.name}
                                                                </a>
                                                            </Col>
                                                            <Col sm={12} lg={2} className='pt-2 gray800-14'>
                                                                {project.persons <= 0
                                                                    ? 'Author not listed'
                                                                    : project.persons.map(person => {
                                                                          return (
                                                                              <span>
                                                                                  {person.firstname} {person.lastname} <br />
                                                                              </span>
                                                                          );
                                                                      })}
                                                            </Col>

                                                            <Col sm={12} lg={3} style={{ textAlign: 'right' }} className='toolsButtons'>
                                                                {userState[0].role === 'Admin' ? (
                                                                    <DropdownButton
                                                                        variant='outline-secondary'
                                                                        alignRight
                                                                        title='Actions'
                                                                        className='floatRight'
                                                                    >
                                                                        <Dropdown.Item
                                                                            href={'/project/edit/' + project.id}
                                                                            className='black-14'
                                                                        >
                                                                            Edit
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item
                                                                            href='#'
                                                                            onClick={() =>
                                                                                approveProject(project.id, key, archiveIndex, archiveCount)
                                                                            }
                                                                            className='black-14'
                                                                        >
                                                                            Approve
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item
                                                                            href='#'
                                                                            onClick={() => toggleActionModal()}
                                                                            className='black-14'
                                                                        >
                                                                            Reject
                                                                        </Dropdown.Item>
                                                                        <ActionModal
                                                                            id={project.id}
                                                                            entityKey={'archive'}
                                                                            entityIndex={archiveIndex}
                                                                            entityCount={archiveCount}
                                                                            open={showActionModal}
                                                                            context={actionModalConfig}
                                                                            updateApplicationStatus={rejectProject}
                                                                            close={toggleActionModal}
                                                                        />
                                                                    </DropdownButton>
                                                                ) : (
                                                                    <DropdownButton
                                                                        variant='outline-secondary'
                                                                        alignRight
                                                                        title='Actions'
                                                                        className='floatRight'
                                                                    >
                                                                        <Dropdown.Item
                                                                            href={'/project/edit/' + project.id}
                                                                            className='black-14'
                                                                        >
                                                                            Edit
                                                                        </Dropdown.Item>
                                                                    </DropdownButton>
                                                                )}
                                                            </Col>
                                                        </Row>
                                                    );
                                                }
                                            })
                                        )}
                                    </div>
                                );
                            default:
                                return key;
                        }
                    })()}

                {!isResultsLoading && (
                    <div className='text-center entityDashboardPagination'>
                        {key === 'active' && activeCount > maxResults ? (
                            <PaginationHelper
                                doEntitiesCall={doProjectsCall}
                                entityCount={activeCount}
                                statusKey={key}
                                paginationIndex={activeIndex}
                                setPaginationIndex={setActiveIndex}
                                maxResults={maxResults}
                            ></PaginationHelper>
                        ) : (
                            ''
                        )}
                        {key === 'pending' && reviewCount > maxResults ? (
                            <PaginationHelper
                                doEntitiesCall={doProjectsCall}
                                entityCount={reviewCount}
                                statusKey={key}
                                paginationIndex={pendingIndex}
                                setPaginationIndex={setPendingIndex}
                                maxResults={maxResults}
                            ></PaginationHelper>
                        ) : (
                            ''
                        )}
                        {key === 'rejected' && rejectedCount > maxResults ? (
                            <PaginationHelper
                                doEntitiesCall={doProjectsCall}
                                entityCount={rejectedCount}
                                statusKey={key}
                                paginationIndex={rejectedIndex}
                                setPaginationIndex={setRejectedIndex}
                                maxResults={maxResults}
                            ></PaginationHelper>
                        ) : (
                            ''
                        )}
                        {key === 'archive' && archiveCount > maxResults ? (
                            <PaginationHelper
                                doEntitiesCall={doProjectsCall}
                                entityCount={archiveCount}
                                statusKey={key}
                                paginationIndex={archiveIndex}
                                setPaginationIndex={setArchiveIndex}
                                maxResults={maxResults}
                            ></PaginationHelper>
                        ) : (
                            ''
                        )}
                    </div>
                )}
            </LayoutContent>
        </div>
    );
};

export default AccountProjects;
