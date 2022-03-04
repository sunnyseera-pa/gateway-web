import { render, waitFor } from '@testing-library/react';
import React from 'react';
import SearchControlsFilter from '.';

const mockOnSelect = jest.fn();
const mockOnChange = jest.fn();
const mockOnSubmit = jest.fn();

jest.mock('../Icon', () => {
    return props => <button {...props}>Icon</button>;
});

const props = {
    onSubmit: mockOnSubmit,
    isLoading: true,
    dropdownProps: {
        onSelect: mockOnSelect,
        value: 'relevance',
        options: ['relevance', 'recentlyadded'],
    },
    inputProps: {
        onChange: mockOnChange,
        value: 'dataset',
    },
    type: 'dataset',
};

let wrapper;

describe('Given the SearchControls component', () => {
    describe('When it is rendered', () => {
        beforeAll(() => {
            wrapper = render(<SearchControlsFilter {...props} />, {
                wrapper: Providers,
            });
        });

        it('Then matches the previous snapshot', () => {
            expect(wrapper.container.textContent).toBeFalsy();
        });

        describe('And it is not loading', () => {
            beforeAll(() => {
                wrapper = render(<SearchControlsFilter {...props} isLoading={false} />, {
                    wrapper: Providers,
                });
            });

            it('Then matches the previous snapshot', () => {
                expect(wrapper.container).toMatchSnapshot();
            });

            describe('And the input is changed', () => {
                beforeAll(() => {
                    const input = wrapper.container.querySelector('input');

                    fireEvent.change(input, { target: { name: 'search', value: 'collection' } });
                });

                it('Then calls onChange', async () => {
                    await waitFor(() => expect(mockOnChange).toHaveBeenCalledWith('collection'));
                });

                describe('And the input receives keyDown', () => {
                    beforeEach(() => {
                        jest.clearAllMocks();
                    });

                    it('Then calls onSubmit', async () => {
                        const input = wrapper.container.querySelector('input');

                        fireEvent.keyDown(input, { key: 'Enter' });

                        await waitFor(() =>
                            expect(mockOnSubmit.mock.calls[0][0]).toMatchObject({
                                search: 'collection',
                                filterValue: 'relevance',
                            })
                        );
                    });

                    it('Then does not call onSubmit', async () => {
                        const input = wrapper.container.querySelector('input');

                        fireEvent.keyDown(input, { key: '13' });

                        expect(mockOnSubmit).not.toHaveBeenCalled();
                    });
                });

                describe('And the dropdown is changed', () => {
                    beforeAll(() => {
                        jest.clearAllMocks();

                        const button = wrapper.container.querySelector('.ui-Dropdown button');

                        fireEvent.click(button);

                        const link = wrapper.container.querySelectorAll('a')[1];

                        fireEvent.click(link);
                    });

                    it('Then calls onSelect', async () => {
                        await waitFor(() =>
                            expect(mockOnSelect).toHaveBeenCalledWith({
                                value: 'recentlyadded',
                                direction: 'desc',
                            })
                        );
                    });

                    it('Then calls onSubmit', async () => {
                        await waitFor(() =>
                            expect(mockOnSubmit.mock.calls[0][0]).toEqual({
                                search: 'collection',
                                filterValue: 'recentlyadded',
                            })
                        );
                    });
                });

                describe('And the field is reset', () => {
                    beforeAll(() => {
                        jest.clearAllMocks();

                        const reset = wrapper.container.querySelector('[name="clear"]');

                        fireEvent.click(reset);
                    });

                    it('Then has the correct value', () => {
                        const input = wrapper.container.querySelector('input');

                        expect(input.value).toEqual('');
                    });

                    it('Then calls onSubmit', async () => {
                        await waitFor(() =>
                            expect(mockOnSubmit.mock.calls[0][0]).toEqual({
                                search: '',
                                filterValue: 'recentlyadded',
                            })
                        );
                    });
                });
            });

            describe('And it does not have dropdown props', () => {
                it('Then should not show the dropdown', () => {
                    wrapper = render(<SearchControlsFilter {...props} dropdownProps={null} />, {
                        wrapper: Providers,
                    });

                    expect(wrapper.container.querySelector('.ui-Dropdown')).toBeFalsy();
                });
            });
        });
    });
});
