import React from 'react';
import Icon from '.';
import { render, waitFor } from '@testing-library/react';

jest.mock('../../../images/SVGIcon', () => props => {
	mockSVGIcon(props);
	return <div />;
});

const mockSVGIcon = jest.fn();
const mockSetState = jest.fn();

let wrapper;
let useStateSpy;

describe('Given the Icon component', () => {
	describe('When it is from a file', () => {
		beforeAll(async () => {
			useStateSpy = jest.spyOn(React, 'useState').mockImplementation(() => [
				{
					default: 'images/Application_approved.svg',
				},
				mockSetState,
			]);

			wrapper = render(<Icon name='Application_approved' />, {
				wrapper: Providers,
			});

			await waitFor(() => expect(wrapper.container.querySelector('img')).toBeTruthy());
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then calls setState', () => {
			expect(mockSetState).toHaveBeenCalled();
		});

		it('Then has the correct className', () => {
			expect(wrapper.container.querySelector('img[src="images/Application_approved.svg"]')).toBeTruthy();
		});
	});

	describe('When it is inline', () => {
		beforeAll(async () => {
			wrapper = render(<Icon name='tick' inline />, {
				wrapper: Providers,
			});

			await waitFor(() => expect(mockSVGIcon).toHaveBeenCalled());
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then has called SVGIcon', () => {
			expect(mockSVGIcon).toHaveBeenCalledWith({
				color: 'inherit',
				fill: 'inherit',
				name: 'tick',
				stroke: 'inherit',
				viewBox: '6 6 12 12',
			});
		});
	});
});
