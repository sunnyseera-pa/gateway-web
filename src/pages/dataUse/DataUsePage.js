import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Button, Tab, Tabs, Alert } from 'react-bootstrap';
import axios from 'axios';
import { isEmpty } from 'lodash';
import Table from './DataUseTable';
import Pagination from './DataUsePagination';
import ArchiveModal from './ArchiveModal';
import './DataUse.scss';
import SVGIcon from '../../images/SVGIcon';
import DataUseApproveModal from './modals/DataUseApproveModal';
import DataUseRejectModal from './modals/DataUseRejectModal';
import DarHelperUtil from '../../utils/DarHelper.util';

import Loading from '../commonComponents/Loading';
import googleAnalytics from '../../tracking';
import { LayoutContent } from '../../components/Layout';

const baseURL = require('../commonComponents/BaseURL').getURL();

const DataUsePage = React.forwardRef(({ onClickDataUseUpload, team }, ref) => {
    React.useImperativeHandle(ref, () => ({
        showAlert,
    }));

    const [row, setRow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(40);
    const [alert, setAlert] = useState('');
    const [activeTab, setActiveTab] = useState('');
    const [dataUseId, setDataUseId] = useState(-1);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [showUnarchiveModal, setShowUnarchiveModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${baseURL}/api/v2/data-use-registers?team=${team}`).then(res => {
            const dataUses = res.data.data;

            dataUses.sort((dataUseOne, dataUseTwo) => Date.parse(dataUseTwo.lastActivity) - Date.parse(dataUseOne.lastActivity));
            setRow(dataUses);
            setIsLoading(false);
        });
    }, [team, alert]);

    const toggleApproveModal = () => {
        setShowApproveModal(!showApproveModal);
    };

    const toggleRejectModal = () => {
        setShowRejectModal(!showRejectModal);
    };

    const toggleArchiveModal = () => {
        setShowArchiveModal(!showArchiveModal);
    };

    const toggleUnarchiveModal = () => {
        setShowUnarchiveModal(!showUnarchiveModal);
    };

    const onClickArchive = id => {
        toggleArchiveModal();
        setDataUseId(id);
    };

    const onClickUnarchive = id => {
        toggleUnarchiveModal();
        setDataUseId(id);
    };

    const onClickApprove = id => {
        toggleApproveModal();
        setDataUseId(id);
    };

    const onClickReject = id => {
        toggleRejectModal();
        setDataUseId(id);
    };

    const showAlert = (message, tab) => {
        setAlert(message);
        setActiveTab(tab);
        setTimeout(() => {
            setAlert('');
        }, 5000);
    };

    const updataDataUseStatus = (oldStatus, newStatus, rejectionReason = '') => {
        axios.patch(`${baseURL}/api/v2/data-use-registers/${dataUseId}`, { activeflag: newStatus, rejectionReason }).then(res => {
            if (oldStatus === DarHelperUtil.dataUseRegisterStatus.INREVIEW && newStatus === DarHelperUtil.dataUseRegisterStatus.ACTIVE) {
                showAlert('Your data use have been successfully approved.');
                toggleApproveModal();
            } else if (
                oldStatus === DarHelperUtil.dataUseRegisterStatus.ARCHIVED &&
                newStatus === DarHelperUtil.dataUseRegisterStatus.ACTIVE
            ) {
                showAlert('Your data use have been successfully unarchived.');
                toggleUnarchiveModal();
            } else if (newStatus === DarHelperUtil.dataUseRegisterStatus.REJECTED) {
                showAlert('Your data use have been successfully rejected.');
                toggleRejectModal();
            } else if (newStatus === DarHelperUtil.dataUseRegisterStatus.ARCHIVED) {
                showAlert('Your data use have been successfully archived.');
                toggleArchiveModal();
            }
        });
    };

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    const tabs = ['Active', 'Pending approval', 'Rejected', 'Archived'];

    const active = row.filter(active => active.activeflag === 'active');
    const pending = row.filter(pending => pending.activeflag === 'inReview');
    const rejected = row.filter(rejected => rejected.activeflag === 'rejected');
    const archived = row.filter(archived => archived.activeflag === 'archived');

    const currentActive = active.slice(indexOfFirstRow, indexOfLastRow);
    const currentPending = pending.slice(indexOfFirstRow, indexOfLastRow);
    const currentRejected = rejected.slice(indexOfFirstRow, indexOfLastRow);
    const currentArchived = archived.slice(indexOfFirstRow, indexOfLastRow);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (isLoading) {
        return (
            <LayoutContent>
                <Loading data-testid='isLoading' />
            </LayoutContent>
        );
    }

    return (
        <>
            <LayoutContent>
                <Row>
                    <Col className='pl-0 pr-0'>
                        {!isEmpty(alert) && (
                            <Alert variant='success' className='main-alert'>
                                <SVGIcon name='check' width={24} height={24} fill='#2C8267' /> {alert}
                            </Alert>
                        )}
                    </Col>
                </Row>
                <div className='accountHeader'>
                    <Row>
                        <Col sm={12} md={8}>
                            <div>
                                <span className='black-20'>Data uses</span>
                            </div>
                            <div>
                                <span className='gray700-13 '>Manage your data use register by uploading or editing data uses.</span>
                            </div>
                        </Col>
                        <Col sm={12} md={4} style={{ textAlign: 'right' }}>
                            <Button
                                variant='primary'
                                className='addButton'
                                onClick={
                                    (() =>
                                        googleAnalytics.recordEvent('DataUses', 'Upload a data use', 'Data use dashboard button clicked'),
                                    onClickDataUseUpload)
                                }>
                                + Upload
                            </Button>
                        </Col>
                    </Row>
                </div>

                <Row className=''>
                    <Col sm={12} lg={12}>
                        <Tabs
                            defaultActiveKey={
                                activeTab || (team === 'user' || (team !== 'user' && team !== 'admin') ? 'Active' : 'Pending approval')
                            }
                            className='gray700-13 data-use-tabs'>
                            {tabs.map(tabName => (
                                <Tab
                                    eventKey={tabName}
                                    title={
                                        ((team === 'user' || (team !== 'user' && team !== 'admin')) &&
                                            tabName === 'Active' &&
                                            `${tabName} (${active.length})`) ||
                                        ((team === 'admin' || (team !== 'user' && team !== 'admin')) &&
                                            tabName === 'Pending approval' &&
                                            `${tabName} (${pending.length})`) ||
                                        (team !== 'user' &&
                                            team !== 'admin' &&
                                            tabName === 'Rejected' &&
                                            `${tabName} (${rejected.length})`) ||
                                        (team !== 'user' && team !== 'admin' && tabName === 'Archived' && `${tabName} (${archived.length})`)
                                    }>
                                    {(team === 'user' || (team !== 'user' && team !== 'admin')) && tabName === 'Active' && (
                                        <Table data={currentActive} active team={team} onClickArchive={onClickArchive} />
                                    )}
                                    {(team === 'admin' || (team !== 'user' && team !== 'admin')) && tabName === 'Pending approval' && (
                                        <Table
                                            team={team}
                                            data={currentPending}
                                            pending
                                            onClickApprove={onClickApprove}
                                            onClickReject={onClickReject}
                                        />
                                    )}
                                    {team !== 'user' && team !== 'admin' && tabName === 'Rejected' && (
                                        <Table team={team} data={currentRejected} />
                                    )}
                                    {team !== 'user' && team !== 'admin' && tabName === 'Archived' && (
                                        <Table team={team} data={currentArchived} archived onClickUnarchive={onClickUnarchive} />
                                    )}

                                    <Pagination
                                        rowsPerPage={rowsPerPage}
                                        totalRows={
                                            tabName === 'Active'
                                                ? active.length
                                                : tabName === 'Pending approval'
                                                ? pending.length
                                                : tabName === 'Rejected'
                                                ? rejected.length
                                                : tabName === 'Archived'
                                                ? archived.length
                                                : row.length
                                        }
                                        paginate={paginate}
                                    />
                                </Tab>
                            ))}
                        </Tabs>
                    </Col>
                </Row>
                {showArchiveModal && (
                    <ArchiveModal archive onConfirm={updataDataUseStatus} isVisible={showArchiveModal} toggleModal={toggleArchiveModal} />
                )}
                {showUnarchiveModal && (
                    <ArchiveModal
                        archive={false}
                        onConfirm={updataDataUseStatus}
                        isVisible={showUnarchiveModal}
                        toggleModal={toggleUnarchiveModal}
                    />
                )}
                {showApproveModal && (
                    <DataUseApproveModal onConfirm={updataDataUseStatus} isVisible={showApproveModal} toggleModal={toggleApproveModal} />
                )}
                {showRejectModal && (
                    <DataUseRejectModal onConfirm={updataDataUseStatus} isVisible={showRejectModal} toggleModal={toggleRejectModal} />
                )}
            </LayoutContent>
        </>
    );
});
export default DataUsePage;
