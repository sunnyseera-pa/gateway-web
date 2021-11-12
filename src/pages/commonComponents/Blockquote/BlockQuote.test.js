import { render } from '@testing-library/react';
import React from 'react';
import BlockQuote from '.';

let wrapper;

describe('Given the AlertModal component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<BlockQuote>Content</BlockQuote>);
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then has the correct content', () => {
			expect(wrapper.getByText('Content')).toBeTruthy();
		});
	});
});
