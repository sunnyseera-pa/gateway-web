import { convertFromRaw, EditorState } from 'draft-js';
import { debounce } from 'lodash';
import { markdownToDraft } from 'markdown-draft-js';
import React, { useCallback, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { WysiwygEditor } from '../../../commonComponents/WysiwygEditor/WysiwygEditor';

const CustomiseGuidance = ({ activeGuidance, isLocked, onGuidanceChange, activeQuestion }) => {
    const [editorState, setEditorState] = useState(null);

    const debounceChange = useCallback(
        debounce(guidanceAsMarkdown => {
            return onGuidanceChange(activeQuestion, guidanceAsMarkdown);
        }, 1500),
        [activeQuestion]
    );

    const handleGuidanceChange = markdown => {
        debounceChange(markdown);
    };

    const handleEditorStateChange = React.useCallback(
        editorStateChanged => {
            setEditorState(editorStateChanged);
        },
        [activeQuestion]
    );

    React.useEffect(() => {
        const contentState = convertFromRaw(markdownToDraft(activeGuidance));
        setEditorState(EditorState.createWithContent(contentState));
    }, [activeQuestion]);

    return (
        <>
            {activeGuidance ? (
                <>
                    {isLocked ? (
                        <ReactMarkdown source={activeGuidance} linkTarget='_blank' />
                    ) : (
                        editorState && (
                            <WysiwygEditor
                                data-testid='wysiwyg-editor'
                                editorState={editorState}
                                onEditorStateChange={handleEditorStateChange}
                                onMarkdownChange={handleGuidanceChange}
                            />
                        )
                    )}
                </>
            ) : (
                <div className='darTab-guidance'>Click on a question guidance to view details</div>
            )}
        </>
    );
};

export default CustomiseGuidance;
