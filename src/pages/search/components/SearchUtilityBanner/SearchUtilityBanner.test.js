import React from 'react';
import SearchUtilityBanner from '.';
import { render } from '@testing-library/react';
import googleAnalytics from '../../../../tracking';

let wrapper;

const props = {
	onClick: jest.fn(),
	step: 1,
};

jest.mock('../../../../tracking');

describe('Given the ActionBarStatus component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<SearchUtilityBanner {...props} />);
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		describe('And the data wizard link is clicked', () => {
			beforeAll(() => {
				fireEvent.click(wrapper.getByTestId('data-utility-link'));
			});

			it('Then calls onClick with step', () => {
				expect(props.onClick).toHaveBeenCalledWith(props.step);
			});

			it('Then records a virtual page event', () => {
				expect(googleAnalytics.recordVirtualPageView).toHaveBeenCalledWith('Data utility wizard');
			});

			it('Then records an event', () => {
				expect(googleAnalytics.recordEvent).toHaveBeenCalledWith(
					'Datasets',
					'Clicked edit data utility wizard',
					'Reopened data utility wizard modal'
				);
			});
		});
	});
});
