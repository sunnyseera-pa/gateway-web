import React, { useState } from 'react';
import { convertToRaw } from 'draft-js';
import { EditorState } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown';
import { stateFromMarkdown } from 'draft-js-import-markdown';
import { Button, Modal } from 'react-bootstrap';
import ActionBar from '../actionbar/ActionBar';
import { WysiwygEditor } from '../WysiwygEditor/WysiwygEditor';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { ReactComponent as CloseButtonSvg } from '../../../images/close-alt.svg';
import axios from 'axios';
const baseURL = require('../../commonComponents/BaseURL').getURL();

export const EditHowToRequestAccessPage = ({ userState, publisherDetails }) => {
	const [contentState] = useState(stateFromMarkdown(publisherDetails.dataRequestModalContent.body));
	const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
	const [showConfirmPublishModal, setShowConfirmPublishModal] = useState(false);

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
					<h1 className='black-20-semibold'>Edit ‘How to request access’ information</h1>
					<div className='soft-black-14'>
						The data access request modal will be displayed to all users at the beginning of their access journey. To ensure that they are
						prepared for the process, include all necessary information such as; what to do before they submit an application, when data can
						be released, the cost and other useful resources.
					</div>
				</div>

				<div className='main-card mb-0'>
					<WysiwygEditor
						editorState={editorState}
						onEditorStateChange={editorState => {
							setEditorState(editorState);
						}}
					/>
					<Modal
						show={showConfirmPublishModal}
						size='lg'
						aria-labelledby='contained-modal-title-vcenter'
						centered
						className='removeUploaderModal'>
						<div className='removeUploaderModal-header'>
							<div className='removeUploaderModal-header--wrap'>
								<div className='removeUploaderModal-head'>
									<h1 className='black-20-semibold'>Publish ‘How to request access’ information</h1>
									<CloseButtonSvg className='removeUploaderModal-head--close' onClick={() => setShowConfirmPublishModal(false)} />
								</div>
								<div className='gray700-13 new-line'>
									Are you sure you want to publish your updates to the ‘How to request access’ information?
								</div>
							</div>
						</div>
						<div className='removeUploaderModal-footer'>
							<div className='removeUploaderModal-footer--wrap'>
								<button className='button-secondary' onClick={() => setShowConfirmPublishModal(false)}>
									No, nevermind
								</button>
								<button
									className='button-primary'
									onClick={() => {
										updatePublisherModalContent();
									}}>
									Publish
								</button>
							</div>
						</div>
					</Modal>
				</div>
				<ActionBar userState={userState}>
					<div className='floatRight'>
						<a style={{ cursor: 'pointer' }} href={'/account?tab=customisedataaccessrequests'}>
							<Button variant='medium' className='cancelButton dark-14 mr-2'>
								Cancel
							</Button>
						</a>

						<Button
							data-test-id='add-collection-publish'
							variant='primary'
							className='publishButton white-14-semibold mr-2'
							type='submit'
							onClick={() => {
								setShowConfirmPublishModal(true);
							}}>
							Publish
						</Button>
					</div>
				</ActionBar>
			</div>
		</div>
	);
};

export default EditHowToRequestAccessPage;
