import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';

import { convertFromRaw, EditorState } from 'draft-js';
import { markdownToDraft } from 'markdown-draft-js';

import WysiwygEditor from '.';

jest.mock('react-draft-wysiwyg', () => ({
    ...jest.requireActual('react-draft-wysiwyg'),
    Editor: ({ onEditorStateChange, editorState }) => {
        const React = require('react');

        const { convertFromRaw, EditorState } = require('draft-js');
        const { markdownToDraft } = require('markdown-draft-js');

        const [editorValue, setEditorValue] = React.useState('Initial content');

        const handleChangedContent = ({ target: { value } }) => {
            setEditorValue(value);

            const contentState = convertFromRaw(markdownToDraft(value));
            const editorStateChanged = EditorState.createWithContent(contentState);

            onEditorStateChange(editorStateChanged);
        };

        const handleFocus = () => {
            onEditorStateChange(editorState);
        };

        return <input onChange={handleChangedContent} onFocus={handleFocus} value={editorValue} data-testid='editor' />;
    },
}));

const contentState = convertFromRaw(markdownToDraft('Initial content'));
const editorState = EditorState.createWithContent(contentState);

const props = {
    editorState,
    onEditorStateChange: jest.fn(),
    onContentStateChange: jest.fn(),
    onMarkdownChange: jest.fn(),
};

let wrapper;

describe('Given the WysiwygEditor component', () => {
    describe('When it is rendered', () => {
        beforeAll(() => {
            wrapper = render(<WysiwygEditor {...props} />, {
                wrapper: Providers,
            });
        });

        describe('And the content is not changed but STATE is (focus)', () => {
            it('Then does not call markdown changed', async () => {
                const editor = wrapper.getByTestId('editor');

                fireEvent.focus(editor);

                await waitFor(() => {
                    expect(props.onEditorStateChange).toHaveBeenCalled();
                    expect(props.onMarkdownChange).not.toHaveBeenCalled();
                });
            });
        });

        describe('And the content is changed', () => {
            it('Then calls the correct methods', async () => {
                const editor = wrapper.getByTestId('editor');

                fireEvent.change(editor, {
                    target: { value: 'Changed content' },
                });

                await waitFor(() => {
                    expect(props.onEditorStateChange).toHaveBeenCalled();
                    expect(props.onMarkdownChange.mock.calls[0][0]).toEqual('Changed content');
                });
            });
        });
    });
});
