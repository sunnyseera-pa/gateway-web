import { render } from '@testing-library/react';
import React from 'react';
import Dropdown from '.';

let wrapper;

const props = {
    handleSelect: jest.fn(),
    defaultValue: 'value',
    value: 'value',
    type: 'sort',
    options: [
        'value',
        'another value'
    ]
}

describe('Given the Dropdown component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<Dropdown {...props} />, {
				wrapper: Providers,
			});
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});
	});
});
