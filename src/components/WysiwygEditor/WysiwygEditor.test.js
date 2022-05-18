import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';

import { createEvent } from '@testing-library/dom';
import { convertFromRaw, EditorState } from 'draft-js';
import { markdownToDraft } from 'markdown-draft-js';

import WysiwygEditor from '.';

jest.mock('react-draft-wysiwyg', () => ({
    ...jest.requireActual('react-draft-wysiwyg'),
    Editor: ({ onEditorStateChange }) => {
        return (
            <input
                onChange={x => {
                    console.log('X', x.target);
                    onEditorStateChange(x);
                }}
                data-testid='editor'
            />
        );
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

        describe('And the content is changed', () => {
            beforeAll(() => {
                const editor = wrapper.getByTestId('editor');

                fireEvent(editor, createEvent('change', editor, editorState), { EventType: 'CustomEvent' });
            });
            it('Then calls the correct methods', async () => {
                expect(wrapper.container).toMatchSnapshot();

                await waitFor(() => {
                    expect(props.onEditorStateChange).toHaveBeenCalled();
                });
            });
        });
    });
});
