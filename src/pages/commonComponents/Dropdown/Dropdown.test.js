import { render, waitFor } from '@testing-library/react';
import React from 'react';
import Dropdown from '.';
import { server } from '../../../services/mockServer';

let wrapper;

const props = {
    handleSelect: jest.fn(),
    defaultValue: 'recentActivity',
    value: 'recentlyPublished',
    type: 'sort',
    options: [
        'recentActivity',
        'alphabetically',
		'recentlyPublished',
		'metadataQuality',
		'mostViewed'
    ]
}

describe('Given the Dropdown component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			server.listen();
			wrapper = render(<Dropdown {...props} />, {
				wrapper: Providers,
			});
		});

		afterEach(() => {
            server.resetHandlers();
        });

		afterAll(() => {
            server.close();
		});

		it('Then matches the previous snapshot', async () => {
			await waitFor(() => expect(wrapper.getByText('Test content')).toBeTruthy());
			expect(wrapper.container).toMatchSnapshot();
		});
	});
});
