import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { has } from 'lodash';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useTranslation } from 'react-i18next';
import { NotificationManager } from 'react-notifications';
import publishersService from '../../../../services/publishers';
import { WysiwygEditor } from '../../../commonComponents/WysiwygEditor/WysiwygEditor';
import './CustomiseDAREditGuidance.scss';

const baseURL = require('../../../commonComponents/BaseURL').getURL();

export const EditHowToRequestAccessPage = ({ show, onHide, publisherDetails }) => {
    const body = has(publisherDetails, 'dataRequestModalContent.body') ? publisherDetails.dataRequestModalContent.body : '';
    const [contentState] = useState(convertFromRaw(markdownToDraft(body)));
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
    const [showConfirm, setShowConfirm] = useState(false);
    const [showCancel, setShowCancel] = useState(false);

    const { t } = useTranslation();

    const publishersRequest = publishersService.usePatchModalContent(null, {
        onError: ({ title, message }) => {
            NotificationManager.error(message, title, 10000);
        },
    });

    const handleConfirmOk = React.useCallback(async () => {
        const content = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));

        const { _id } = publisherDetails;

        publishersRequest
            .mutateAsync({
                _id,
                content,
            })
            .then(() => {
                window.location.href = '/account?tab=customisedataaccessrequests_guidance&publishedDARContent=true';
            });
    }, [publisherDetails._id]);

    const handlePublish = React.useCallback(() => {
        setShowConfirm(true);
    }, []);

    const handleConfirmCancel = React.useCallback(() => {
        setShowConfirm(false);
    }, []);

    const handleCancel = React.useCallback(() => {
        setShowCancel(true);
    }, []);

    const handleCancelCancel = React.useCallback(() => {
        setShowCancel(false);
    }, []);

    const handleCancelOk = React.useCallback(() => {
        onHide();
    }, []);

    let modalContent = {
        header: `Edit 'Applicant guidance for requesting access to data'`,
        body: `The guidance below will be displayed to all data applicants at the beginning of their access journey. To ensure that applicants are prepared for the process, include all necessary information such as; what to do before they submit an application, the cost of accessing data, and any other resources that data applicants would find useful.`,
        cancel: (
            <Button variant='medium' className='cancelButton dark-14 mr-2' onClick={handleCancel}>
                {t('buttons.cancel')}
            </Button>
        ),
        confirm: (
            <Button
                data-test-id='add-collection-publish'
                variant='primary'
                className='publishButton white-14-semibold'
                type='submit'
                onClick={handlePublish}>
                {t('buttons.publish')}
            </Button>
        ),
    };

    if (showConfirm) {
        modalContent = {
            header: `Publish 'Applicant guidance for requesting access to data'`,
            body: `Are you sure you want to publish your updates to the 'Applicant guidance for requesting access to data'?`,
            cancel: (
                <Button variant='medium' className='cancelButton dark-14 mr-2' onClick={handleConfirmCancel}>
                    {t('buttons.neverMind')}
                </Button>
            ),
            confirm: (
                <Button
                    data-test-id='add-collection-publish'
                    variant='primary'
                    className='publishButton white-14-semibold'
                    type='submit'
                    onClick={handleConfirmOk}>
                    {t('buttons.confirm')}
                </Button>
            ),
        };
    } else if (showCancel) {
        modalContent = {
            header: `Cancel 'Applicant guidance for requesting access to data'`,
            body: `Are you sure you want to leave this page? Any changes you have made have not been published and will not be saved.`,
            cancel: (
                <Button variant='medium' className='cancelButton dark-14 mr-2' onClick={handleCancelCancel}>
                    {t('buttons.neverMind')}
                </Button>
            ),
            confirm: (
                <Button
                    data-test-id='add-collection-publish'
                    variant='primary'
                    className='publishButton white-14-semibold'
                    type='submit'
                    onClick={handleCancelOk}>
                    {t('buttons.cancel')}
                </Button>
            ),
        };
    }

    return (
        <Modal show={show} onHide={onHide} className={showConfirm || showCancel ? 'modal-md' : 'modal-xl'}>
            <Modal.Header>
                <h1 className='black-20-semibold'>{modalContent.header}</h1>
            </Modal.Header>
            <Modal.Body>
                <p className='soft-black-14'>{modalContent.body}</p>
                {!showConfirm && !showCancel && (
                    <WysiwygEditor data-testid='wysiwyg-editor' editorState={editorState} onEditorStateChange={setEditorState} />
                )}
            </Modal.Body>
            <Modal.Footer>
                <div>{modalContent.cancel}</div>
                <div className={!showCancel && !showConfirm && 'd-flex justify-content-end flex-grow'}>{modalContent.confirm}</div>
            </Modal.Footer>
        </Modal>
    );
};

export default EditHowToRequestAccessPage;
