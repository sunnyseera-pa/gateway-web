import React from 'react';
import TypeaheadAsyncCustom from './index';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { server } from '../../../../services/mockServer';

const props = {
	value: ['United Kingdon,Cambridge', 'United States'],
};

describe('Given the TypeaheadAsyncCustom component', () => {
	let wrapper;
	beforeAll(() => {
		server.listen();
	});

	afterEach(() => {
		server.resetHandlers();
	});

	afterAll(() => {
		server.close();
	});
	describe('When it is rendered without default value', () => {
		wrapper = render(<TypeaheadAsyncCustom value={[]} />, {
			wrapper: Providers,
		});
		let input = document.querySelector('.rbt-input-main');
		it('Then search Icon  should be rendered', () => {
			expect(wrapper.queryByTestId('searchIcon')).toBeTruthy();
		});
		it('on Input type search Icon  should not rendered', () => {
			fireEvent.click(input);
			fireEvent.change(input, { target: { value: 'test' } });
			expect(input.value).toBe('test');
			expect(wrapper.queryByTestId('searchIcon')).toBeNull();
		});
		it('on empty Input type search Icon  should be rendered', () => {
			fireEvent.click(input);
			fireEvent.change(input, { target: { value: '' } });
			expect(input.value).toBe('');
			expect(wrapper.queryByTestId('searchIcon')).toBeTruthy();
		});

		it('Then handleSearch function should return correct results in dropdown ', async () => {
			fireEvent.click(input);
			fireEvent.change(input, { target: { value: 'test' } });
			expect(input.value).toBe('test');
			await waitFor(() => expect(wrapper.queryByText('United Kingdon,Colchester')).toBeTruthy());
			await waitFor(() => expect(wrapper.queryByText('Colchester')).toBeTruthy());
			await waitFor(() => expect(wrapper.queryAllByText('Ireland')).toBeTruthy());
		});
	});
	describe('When it is rendered with default value', () => {
		wrapper = render(<TypeaheadAsyncCustom {...props} />, {
			wrapper: Providers,
		});
		it('Then search Icon should not be rendered', () => {
			expect(wrapper.queryByTestId('searchIcon')).toBeNull();
		});
		it('Then default values should be rendered', () => {
			expect(screen.queryByText('Cambridge')).toBeTruthy();
			expect(screen.queryByText('United States')).toBeTruthy();
		});
	});
});
