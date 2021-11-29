import { render, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import React from 'react';
import SearchControls from '.';

const mockOnSort = jest.fn();
const mockOnChange = jest.fn();
const mockOnSubmit = jest.fn();
const mockOnReset = jest.fn();

const props = {
	onSubmit: mockOnSubmit,
	isLoading: true,
	sortProps: {
		onSort: mockOnSort,
		value: 'relevance',
		options: ['relevance', 'recentlyadded'],
	},
	inputProps: {
		onReset: mockOnReset,
		onChange: mockOnChange,
		value: 'dataset',
	},
};

let wrapper;

describe('Given the SearchControls component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<SearchControls {...props} />, {
				wrapper: Providers,
			});
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container.textContent).toBeFalsy();
		});

		describe('And it is not loading', () => {
			beforeAll(() => {
				wrapper = render(<SearchControls {...props} isLoading={false} />, {
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

				describe('And the input is entered on', () => {
					beforeAll(() => {
						const input = wrapper.container.querySelector('input');

						fireEvent.keyDown(input, { key: 'Enter' });
					});

					it('Then calls onSubmit', async () => {
						await waitFor(() =>
							expect(mockOnSubmit.mock.calls[0][0]).toMatchObject({
								search: 'collection',
								sortBy: 'relevance',
							})
						);
					});
				});
			});

			describe('And the sort is changed on', () => {
				beforeAll(() => {
					const button = wrapper.container.querySelector('.ui-Dropdown button');

					fireEvent.click(button);

					const link = wrapper.container.querySelectorAll('a')[1];

					fireEvent.click(link);
				});

				it('Then calls onSort', async () => {
					await waitFor(() => expect(mockOnSort.mock.calls[0][0]).toEqual('recentlyadded'));
				});

				it('Then calls onSubmit', async () => {
					await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
				});
			});
		});
	});
});
