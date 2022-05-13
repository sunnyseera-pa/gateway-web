import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import './Wysiwyg.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const WysiwygEditor = ({ editorState, onEditorStateChange, onContentStateChange }) => {
    return (
        <Editor
            data-testid='wysiwyg-editor-main'
            wrapperClassName='demo-wrapper'
            editorClassName='wysiwyg-wrapper'
            toolbarClassName='rdw-editor-toolbar'
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            onContentStateChange={onContentStateChange}
            toolbar={{
                options: ['inline', 'blockType', 'list', 'link', 'history'],
                inline: {
                    inDropdown: false,
                    options: ['bold', 'italic'],
                },
                blockType: {
                    inDropdown: false,
                    options: ['Normal', 'H1', 'H2'],
                },
                list: {
                    options: ['unordered', 'ordered'],
                },
                link: {
                    options: ['link'],
                },
                history: {
                    options: ['undo', 'redo'],
                },
            }}
        />
    );
};

export default WysiwygEditor;
