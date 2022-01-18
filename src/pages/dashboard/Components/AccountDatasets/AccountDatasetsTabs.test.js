import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AccountDatasetsTabs from './AccountDatasetsTabs';

const props = {
	counts: { inReview: 0, active: 0, rejected: 0, archive: 0 },
	team: 'admin',
	onSelectTab: jest.fn(),
	activeKey: 'inReview',
};
let wrapper;
describe('Given the AccountDatasetsTabs component', () => {
	describe('When it is rendered and team is admin', () => {
		beforeAll(() => {
			wrapper = render(<AccountDatasetsTabs {...props} />);
		});

		it('Only Pending approval tab should  be rendered', () => {
			expect(wrapper.queryByText('Pending approval (0)')).toBeTruthy();
			expect(wrapper.queryByText('Active(0)')).toBeNull();
		});
	});

	describe('when team is not admin', () => {
		beforeAll(() => {
			wrapper.rerender(<AccountDatasetsTabs {...props} team='manager' />);
		});

		it('Active tab should be rendered', async () => {
			expect(screen.queryByText('Active (0)')).toBeTruthy();
		});

		it('Rejected tab should be rendered', async () => {
			expect(screen.queryByText('Rejected (0)')).toBeTruthy();
		});

		it('Pending approval tab should be rendered', async () => {
			expect(screen.queryByText('Pending approval (0)')).toBeTruthy();
		});

		it('Archived tab should be rendered', async () => {
			expect(screen.queryByText('Archived (0)')).toBeTruthy();
		});

		it('onSelect Tab', async () => {
			fireEvent.click(screen.queryByText('Archived (0)'));
			expect(props.onSelectTab.mock.calls.length).toBe(1);
			expect(props.onSelectTab.mock.calls[0][0]).toBe('archive');
		});
	});
});
