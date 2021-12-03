import React from 'react';
import TypeaheadAsyncCustom from './index';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { server } from '../../../../services/mockServer';

const props = {
	value: ['United Kingdon,Cambridge', 'United States'],
};
let wrapper;

describe('Given the TypeaheadAsyncCustom component', () => {
	beforeAll(() => {
		server.listen();
	});

	afterEach(() => {
		server.resetHandlers();
	});

	afterAll(() => {
		server.close();
	});
	describe('When it is rendered', () => {
		wrapper = render(<TypeaheadAsyncCustom {...props} />, {
			wrapper: Providers,
		});
		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then default values should be rendered', () => {
			expect(screen.queryByText('Cambridge')).toBeTruthy();
			expect(screen.queryByText('United States')).toBeTruthy();
		});
	});
	describe('And when  Autosuggest Input typed ', () => {
		it('Then Input should show the term `Searching...`', async () => {
			let input = document.querySelector('.rbt-input-main');
			fireEvent.click(input);
			fireEvent.change(input, { target: { value: 'london' } });
			expect(input.value).toBe('london');
			await waitFor(() => expect(wrapper.queryByText('Searching...')).toBeTruthy());
		});
		it('Then handleSearch function should return correct results in dropdown', async () => {
			let input = document.querySelector('.rbt-input-main');
			fireEvent.click(input);
			fireEvent.change(input, { target: { value: 'test' } });
			expect(input.value).toBe('test');
			await waitFor(() => expect(wrapper.queryByText('United Kingdon,Colchester')).toBeTruthy());
			await waitFor(() => expect(wrapper.queryByText('Colchester')).toBeTruthy());
			await waitFor(() => expect(wrapper.queryAllByText('Ireland')).toBeTruthy());
		});
	});
});
