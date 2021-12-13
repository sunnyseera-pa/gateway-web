import React, { Fragment, useState, useCallback } from 'react';
import { WysiwygEditor } from '../../../commonComponents/WysiwygEditor/WysiwygEditor';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';

import ReactMarkdown from 'react-markdown';
import { debounce } from 'lodash';

const CustomiseGuidance = ({ activeGuidance, isLocked, onGuidanceChange, activeQuestion }) => {
	const [contentState] = useState(convertFromRaw(markdownToDraft(activeGuidance)));
	const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));

	const debounceChange = useCallback(
		debounce(guidanceAsMarkdown => onGuidanceChange(activeQuestion, guidanceAsMarkdown), 1500),
		[]
	);

	const handleGuidanceChange = editorState => {
		setEditorState(editorState);
		let guidanceAsMarkdown = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));

		debounceChange(guidanceAsMarkdown);
	};

	return (
		<Fragment>
			{activeGuidance ? (
				<>
					{isLocked ? (
						<ReactMarkdown source={activeGuidance} linkTarget='_blank' />
					) : (
						<WysiwygEditor
							data-testid='wysiwyg-editor'
							editorState={editorState}
							onEditorStateChange={editorState => {
								handleGuidanceChange(editorState);
							}}
						/>
					)}
				</>
			) : (
				<div className='darTab-guidance'>Click on a question guidance to view details</div>
			)}
		</Fragment>
	);
};

export default CustomiseGuidance;
