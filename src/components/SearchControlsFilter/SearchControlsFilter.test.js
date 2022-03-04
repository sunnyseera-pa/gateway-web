import { render } from '@testing-library/react';
import * as formik from 'formik';
import React from 'react';
import SearchControlsFilter from '.';

const mockOnSubmit = jest.fn();
const mockSearchControlsForm = jest.fn();

jest.mock('./SearchControlsFilter', () => props => {
    mockSearchControlsForm(props);
    return <div />;
});

const props = {
    onSubmit: mockOnSubmit,
    isLoading: true,
    dropdownProps: {
        value: 'relevance',
        options: ['relevance'],
    },
    inputProps: {
        value: 'dataset',
    },
};

let wrapper;

const formikSpy = jest.spyOn(formik, 'Formik');

describe('Given the SearchControls component', () => {
    describe('When it is loading', () => {
        beforeAll(() => {
            wrapper = render(<SearchControlsFilter {...props} />, {
                wrapper: Providers,
            });
        });

        it('Then matches the previous snapshot', () => {
            expect(wrapper.container.textContent).toEqual('');
        });
    });

    describe('When it is rendered', () => {
        beforeAll(() => {
            wrapper = render(<SearchControlsFilter {...props} isLoading={false} />, {
                wrapper: Providers,
            });
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        it('Then calls the form with the correct props', () => {
            expect(mockSearchControlsForm).toHaveBeenCalledWith({ inputProps: props.inputProps, dropdownProps: props.dropdownProps });
        });

        it('Then calls formik with the correct props', () => {
            expect(formikSpy.mock.calls[0][0]).toMatchObject({
                children: expect.any(Object),
                initialValues: { search: 'dataset', filterValue: 'relevance' },
                onSubmit: mockOnSubmit,
            });
        });
    });

    describe('When it is rendered without values', () => {
        beforeAll(() => {
            wrapper = render(<SearchControlsFilter {...props} isLoading={false} inputProps={{}} dropdownProps={{}} />, {
                wrapper: Providers,
            });
        });

        afterAll(() => {
            jest.clearAllMocks();
        });

        it('Then calls the form with the correct props', () => {
            expect(mockSearchControlsForm).toHaveBeenCalledWith({ inputProps: {}, dropdownProps: {} });
        });

        it('Then calls formik with the correct props', () => {
            expect(formikSpy.mock.calls[0][0]).toMatchObject({
                initialValues: { search: '', filterValue: '' },
                onSubmit: mockOnSubmit,
            });
        });
    });
});
