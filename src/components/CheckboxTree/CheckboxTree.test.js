import React from 'react';
import { render, waitFor, getByRole } from '@testing-library/react';
import CheckboxTree from '.';

const mockReactCheckboxTree = jest.fn(() => null);

const props = {
	className: 'additional-classname',
	nodes: [
		{
			value: 'India',
			label: 'India',
		},
		{
			value: 'Malaysia',
			label: 'Malaysia',
		},
	],
};

let wrapper;

jest.mock('react-checkbox-tree', () => props => {
	mockReactCheckboxTree(props);
	return <div />;
});

describe('Given the Checkbox component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<CheckboxTree {...props} />, {
				wrapper: Providers,
			});
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then has the correct className', () => {
			expect(wrapper.container.querySelector('.additional-classname')).toBeTruthy();
		});

		it('Then passes in the correct props', () => {
			const { nodes } = props;

			expect(mockReactCheckboxTree.mock.calls[0][0]).toMatchObject({
				nodes,
				icons: {
					leaf: null,
					parentClose: null,
					parentOpen: null,
				},
			});
		});
	});
});
