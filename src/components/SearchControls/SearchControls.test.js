import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import SearchInput from '../SearchInput';
import SortDropdown from '../../pages/commonComponents/SortDropdown';
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
			expect(wrapper.container.textContent).toEqual('');
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
				beforeAll(async () => {
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
					const link = wrapper.container.querySelectorAll('.ui-Dropdown')[0];

					fireEvent.click(link, 'relevance');
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
	});
});
