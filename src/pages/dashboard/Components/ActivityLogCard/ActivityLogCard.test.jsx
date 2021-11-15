import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient } from 'react-query';
import DatasetOnboardingHelper from '../../../../utils/DatasetOnboardingHelper.util';
import { dateFormats } from '../../../../utils/GeneralHelper.util';
import ActivityLogCard from './ActivityLogCard';
import mockData from './mockData';

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
			expect(screen.getByTestId(`version-title`)).toHaveTextContent(`Version ${props.versionNumber}`);
		});
		it('Then  Status should be rendered', () => {
			const statusText = DatasetOnboardingHelper.datasetSLAText[props.meta.applicationStatus];

			expect(screen.getByTestId('status')).toHaveTextContent(statusText);
		});

		it('Then  all events should be rendered', () => {
			props.events.map((event, i) => {
				const timestamp = dateFormats(event.timestamp);
				expect(screen.getByTestId(`event-time-${i}`)).toHaveTextContent(timestamp.timeOnly);
			});
		});

		it('Then updates submiited log be rendered', () => {
			props.events.map((event, index) => {
				if (event.datasetUpdates) {
					event.datasetUpdates.map((item, i) => {
						const log = DatasetOnboardingHelper.getUpdatesSubmittedLog(item);
						const text = `${log.heading}question${log.question}previousAnswer${log.answers.previousAnswer}updatedAnswer${log.answers.updatedAnswer}`;
						expect(screen.getByTestId(`event-detailed-text-${index}-${i}`)).toHaveTextContent(text);
					});
				}
			});
		});
	});
});
