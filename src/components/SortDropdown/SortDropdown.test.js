import { render, waitFor } from '@testing-library/react';
import React from 'react';
import SortDropdown from '.';

const mockOnSort = jest.fn();

const props = {
	onSort: mockOnSort,
	options: ['relevance', 'recentlyadded'],
};

let wrapper;

describe('Given the SortDropdown component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<SortDropdown {...props} />, {
				wrapper: Providers,
			});

			const input = wrapper.container.querySelector('button');

			fireEvent.click(input);
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		describe('When it is selected', () => {
			beforeAll(() => {
				const link = wrapper.container.querySelectorAll('a')[1];

				fireEvent.click(link);
			});

			it('Then calls onSort', async () => {
				await waitFor(() => expect(mockOnSort).toHaveBeenCalledWith('recentlyadded'));
			});
		});
	});
});
