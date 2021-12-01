import React from 'react';
import TypeaheadAsyncCustom from './index';
import _ from 'lodash';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const props = {
	value: ['United Kingdon,Cambridge', 'United States'],
};
let wrapper;
let handlerFn;

describe('Given the TypeaheadAsyncCustom component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<TypeaheadAsyncCustom {...props} />);
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then default values should be rendered', () => {
			expect(screen.queryByText('Cambridge')).toBeTruthy();
			expect(screen.queryByText('United States')).toBeTruthy();
		});
	});
	describe('And when typed ', () => {
		it('Then handleSearch function should be called', () => {
			const { rerender, container } = wrapper;
			handlerFn = jest.fn();
			rerender(<TypeaheadAsyncCustom {...props} handleSearch={handlerFn} />);
			props.ssoBtnsConfig.map(value => {
				expect(screen.getByTestId(value.id)).toBeTruthy();
				if (value.id === 'google') {
					expect(screen.getByTestId(value.id + '-lastChoice')).toBeTruthy();
				} else {
					expect(screen.queryByTestId(value.id + '-lastChoice')).toBeNull();
				}
			});
		});
	});
});
