import React, { useState } from 'react';

import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { NotificationManager } from 'react-notifications';
import publishersService from '../../../../services/publishers';
import { WysiwygEditor } from '../../../commonComponents/WysiwygEditor/WysiwygEditor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { has } from 'lodash';
import { Button, Modal } from 'react-bootstrap';
const baseURL = require('../../../commonComponents/BaseURL').getURL();

export const EditHowToRequestAccessPage = ({ show, onHide, publisherDetails }) => {
    const body = has(publisherDetails, 'dataRequestModalContent.body') ? publisherDetails.dataRequestModalContent.body : '';
    const [contentState] = useState(convertFromRaw(markdownToDraft(body)));
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
    const [showConfirm, setShowConfirm] = useState(false);

    const publishersRequest = publishersService.usePatchModalContent(null, {
        onError: ({ title, message }) => {
            NotificationManager.error(message, title, 10000);
        },
    });

    const handleConfirm = React.useCallback(async () => {
        const content = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));

        const { _id } = publisherDetails;

        publishersRequest
            .mutateAsync({
                _id,
                content,
            })
            .then(() => {
                onHide();
            });
    }, [publisherDetails._id]);

    const handlePublish = React.useCallback(() => {
        setShowConfirm(true);
    }, []);

    return (
        <Modal show={show} onHide={onHide} className={showConfirm ? 'modal-md' : 'modal-xl'}>
            <Modal.Header>
                <h1 className='black-20-semibold'>
                    {!showConfirm
                        ? `Edit 'Applicant guidance for requesting access to data'`
                        : `Publish ‘Applicant guidance for requesting access to data'`}
                </h1>
            </Modal.Header>
            <Modal.Body>
                {!showConfirm ? (
                    <>
                        <p className='soft-black-14'>
                            The guidance below will be displayed to all data applicants at the beginning of their access journey. To ensure
                            that applicants are prepared for the process, include all necessary information such as; what to do before they
                            submit an application, the cost of accessing data, and any other resources that data applicants would find
                            useful.
                        </p>
                        <WysiwygEditor data-testid='wysiwyg-editor' editorState={editorState} onEditorStateChange={setEditorState} />
                    </>
                ) : (
                    <p className='soft-black-14'>
                        Are you sure you want to publish your updates to the 'Applicant guidance for requesting access to data'?`
                    </p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <Button variant='medium' className='cancelButton dark-14 mr-2' onClick={onHide}>
                        Cancel
                    </Button>
                </div>
                <div className='d-flex justify-content-end flex-grow'>
                    {!showConfirm ? (
                        <Button
                            data-test-id='add-collection-publish'
                            variant='primary'
                            className='publishButton white-14-semibold'
                            type='submit'
                            onClick={handlePublish}>
                            Publish
                        </Button>
                    ) : (
                        <Button
                            data-test-id='add-collection-publish'
                            variant='primary'
                            className='publishButton white-14-semibold'
                            type='submit'
                            onClick={handleConfirm}>
                            Confirm
                        </Button>
                    )}
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default EditHowToRequestAccessPage;
