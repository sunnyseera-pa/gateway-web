import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ActivityLogCard from './ActivityLogCard';
import DatasetOnboardingHelper from '../../../../utils/DatasetOnboardingHelper.util';
import { dateFormats } from '../../../../utils/GeneralHelper.util';
import mockData from './mockData';

const props = {
	...mockData,
};
let wrapper;

describe('Given the ActivityLogCard component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<ActivityLogCard {...props} />);
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then  Title should be rendered with  Submitted Date', () => {
			const date = dateFormats(props.dateSubmitted).dateOnly;
			expect(screen.getByTestId(`version-title`)).toHaveTextContent(`Version ${props.versionNumber}Submitted ${date}`);
		});
		it('Then  Status should be rendered', () => {
			const statusColour = DatasetOnboardingHelper.datasetStatusColours[props.applicationStatus];
			const statusText = DatasetOnboardingHelper.datasetSLAText[props.applicationStatus];

			const date = dateFormats(props.dateSubmitted).dateOnly;
			expect(screen.getByTestId(statusColour)).toHaveTextContent(statusText);
		});

		it('Then  all events should be rendered', () => {
			props.events.map((event, i) => {
				const timestamp = dateFormats(event.timestamp);
				expect(screen.getByTestId(`event-title-${i}`)).toHaveTextContent(timestamp.dateOnly);
				expect(screen.getByTestId(`event-time-${i}`)).toHaveTextContent(timestamp.timeOnly);
				expect(screen.getByTestId(`event-text-${i}`)).toHaveTextContent(event.plainText);
				// expect(screen.getByTestId(`event-detailed-text-${i}`)).toHaveTextContent(event.detailedText);
				event.detailedText && expect(screen.getByTestId(`event-detailed-text-${i}`)).toHaveClass('jumbotron');
			});
		});
	});
});
