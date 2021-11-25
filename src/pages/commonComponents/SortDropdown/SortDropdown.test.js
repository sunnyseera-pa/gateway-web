import { render } from '@testing-library/react';
import React from 'react';
import SortDropdown from '.';
import { server } from '../../../services/mockServer';

let wrapper;

const props = {
    handleSelect: jest.fn(),
    defaultValue: 'recentActivity',
    value: 'recentlyPublished',
    type: 'sort',
    options: [
        'popularity',
        'metadata',
		'resources',
		'latest',
		'recentlyadded',
        'sortbyyear',
        'relevance'
    ]
}

describe('Given the Dropdown component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			server.listen();
			wrapper = render(<SortDropdown {...props} />, {
				wrapper: Providers,
			});
		});

		afterEach(() => {
            server.resetHandlers();
        });

		afterAll(() => {
            server.close();
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});
	});
});
