import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient } from 'react-query';
import DatasetOnboardingHelper from '../../../../utils/DatasetOnboardingHelper.util';
import { dateFormats } from '../../../../utils/GeneralHelper.util';
import ActivityLogCard from './ActivityLogCard';
import mockData from './mockData';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const props = {
	...mockData,
};
let wrapper;

describe('Given the ActivityLogCard component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<ActivityLogCard {...props} />, {
				wrapper: Providers,
			});
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then  Title should be rendered with  Submitted Date', () => {
			const date = dateFormats(props.meta.dateSubmitted).dateOnly;
			expect(screen.getByTestId(`version-title`)).toHaveTextContent(`Version ${props.versionNumber}Submitted ${date}`);
		});
		it('Then  Status should be rendered', () => {
			const statusColour = DatasetOnboardingHelper.datasetStatusColours[props.meta.applicationStatus];
			const statusText = DatasetOnboardingHelper.datasetSLAText[props.meta.applicationStatus];

			const date = dateFormats(props.meta.dateSubmitted).dateOnly;
			expect(screen.getByTestId(statusColour)).toHaveTextContent(statusText);
		});

		it('Then  all events should be rendered', () => {
			props.events.map((event, i) => {
				const timestamp = dateFormats(event.timestamp);
				expect(screen.getByTestId(`event-title-${i}`)).toHaveTextContent(timestamp.dateOnly);
				expect(screen.getByTestId(`event-time-${i}`)).toHaveTextContent(timestamp.timeOnly);
			});
		});

		it('Then updates submiited log be rendered', () => {
			props.events.map((event, i) => {
				if (event.datasetUpdates) {
					event.datasetUpdates.map((item, i) => {
						const log = DatasetOnboardingHelper.getUpdatesSubmittedLog(item);
						expect(screen.getByTestId(`heading-${i}`)).toHaveTextContent(log.heading);
						expect(screen.getByTestId(`question-${i}`)).toHaveTextContent(`Question ${log.question}`);
						expect(screen.getByTestId(`answers-${i}`)).toHaveTextContent(
							`Previous Answer ${log.answers.previousAnswer}Updated Answer ${log.answers.updatedAnswer}`
						);
					});
				}
			});
		});
	});
});
