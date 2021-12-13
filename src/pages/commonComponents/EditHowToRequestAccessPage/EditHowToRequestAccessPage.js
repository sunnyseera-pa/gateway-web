import React, { useState } from 'react';

import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import { WysiwygEditor } from '../WysiwygEditor/WysiwygEditor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { ConfirmPublishModal } from './ConfirmPublishModal';
import { has } from 'lodash';
const baseURL = require('../../commonComponents/BaseURL').getURL();

export const EditHowToRequestAccessPage = ({ publisherDetails, showConfirmPublishModal, setShowConfirmPublishModal }) => {
	const body = has(publisherDetails, 'dataRequestModalContent.body') ? publisherDetails.dataRequestModalContent.body : '';
	const [contentState] = useState(convertFromRaw(markdownToDraft(body)));
	const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));

	const updatePublisherModalContent = async () => {
		let contentAsMarkdown = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));

		await axios
			.patch(`${baseURL}/api/v1/publishers/dataRequestModalContent/${publisherDetails._id}`, { content: contentAsMarkdown })
			.then(() => {
				//redirect and show banner
				window.location.href = '/account?tab=customisedataaccessrequests&publishedDARContent=true';
			});
	};
	return (
		<div className='row justify-content-md-center'>
			<div className='col-sm-12 col-md-10'>
				<div className='main-card wysiwyg-main-card'>
					<h1 className='black-20-semibold'>Edit 'Applicant guidance for requesting access to data'</h1>
					<div className='soft-black-14'>
						The guidance below will be displayed to all data applicants at the beginning of their access journey. To ensure that applicants
						are prepared for the process, include all necessary information such as; what to do before they submit an application, the cost
						of accessing data, and any other resources that data applicants would find useful.
					</div>
				</div>

				<div className='main-card mb-0'>
					<WysiwygEditor
						data-testid='wysiwyg-editor'
						editorState={editorState}
						onEditorStateChange={editorState => {
							setEditorState(editorState);
						}}
					/>
					<ConfirmPublishModal
						data-testid='confirm-publish-modal'
						showConfirmPublishModal={showConfirmPublishModal}
						setShowConfirmPublishModal={setShowConfirmPublishModal}
						updatePublisherModalContent={updatePublisherModalContent}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditHowToRequestAccessPage;
