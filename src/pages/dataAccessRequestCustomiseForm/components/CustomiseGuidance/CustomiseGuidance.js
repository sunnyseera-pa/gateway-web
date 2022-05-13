import React, { Fragment, useState, useCallback } from 'react';
import { convertToRaw, convertFromRaw, EditorState } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';

import ReactMarkdown from 'react-markdown';
import { debounce } from 'lodash';
import { WysiwygEditor } from '../../../commonComponents/WysiwygEditor/WysiwygEditor';

const CustomiseGuidance = ({ activeGuidance, isLocked, onGuidanceChange, activeQuestion }) => {
    const [contentState] = useState(convertFromRaw(markdownToDraft(activeGuidance)));
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));

    const debounceChange = useCallback(() => {
        console.log('debounce');
        return debounce(guidanceAsMarkdown => {
            console.log('guidanceAsMarkdown', guidanceAsMarkdown);
            return onGuidanceChange(activeQuestion, guidanceAsMarkdown);
        }, 1500);
    }, []);

    const handleGuidanceChange = editorState => {
        setEditorState(editorState);
        const guidanceAsMarkdown = draftToMarkdown(convertToRaw(editorState.getCurrentContent()));

        // debounceChange(guidanceAsMarkdown);

        console.log(activeQuestion, guidanceAsMarkdown);

        onGuidanceChange(activeQuestion, guidanceAsMarkdown);
    };

    return (
        <>
            {activeGuidance ? (
                <>
                    {isLocked ? (
                        <ReactMarkdown source={activeGuidance} linkTarget='_blank' />
                    ) : (
                        <WysiwygEditor data-testid='wysiwyg-editor' editorState={editorState} onEditorStateChange={handleGuidanceChange} />
                    )}
                </>
            ) : (
                <div className='darTab-guidance'>Click on a question guidance to view details</div>
            )}
        </>
    );
};

export default CustomiseGuidance;
