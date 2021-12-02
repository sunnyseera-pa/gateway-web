import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import AccountDatasets from './AccountDatasets';
import { server } from '../../../../services/mockServer';
import { mockGetPublisher } from '../../../../services/dataset-onboarding/mockMsw';
import '../../../../utils/test.util';

const mockAccountDatasetsTabs = jest.fn();
const mockAccountDatasetsContent = jest.fn();

jest.mock('./AccountDatasetsTabs', () => props => {
	mockAccountDatasetsTabs(props);

	return (
		<button
			onClick={() => {
				props.onSelectTab('inReview');
			}}>
			Select tab
		</button>
	);
});

jest.mock('./AccountDatasetsContent', () => props => {
	mockAccountDatasetsContent(props);

	return (
		<button
			onClick={() => {
				props.onSubmit({
					search: 'dataset',
					sortBy: 'metadataQuality',
				});
			}}>
			Submit
		</button>
	);
});

jest.mock('../../../../components/Icon', () => 'Icon');

const props = {
	alert: { message: 'Message goes here' },
	team: 'applicant',
};

let wrapper;

describe('Given the AccountDatasets component', () => {
	beforeAll(() => {
		server.listen();
	});

	afterEach(() => {
		server.resetHandlers();
	});

	afterAll(() => {
		server.close();
	});

	describe('When it is rendered', () => {
		beforeAll(async () => {
			wrapper = render(<AccountDatasets {...props} />, {
				wrapper: Providers,
			});

			await waitFor(() => expect(wrapper.getByText('Select tab')).toBeTruthy());
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then shows a success message', () => {
			expect(wrapper.getByText('Message goes here')).toBeTruthy();
		});

		it('Then calls the tabs with the correct props', async () => {
			await waitFor(() => {
				expect(mockAccountDatasetsTabs).toHaveBeenCalledLastWithMatch({
					activeKey: 'active',
					counts: { inReview: 19 },
					team: 'applicant',
				});
			});
		});

		it('Then calls the results with the correct props', async () => {
			await waitFor(() => {
				return expect(mockAccountDatasetsContent).toHaveBeenCalledLastWithMatch({
					data: mockGetPublisher.data.results.listOfDatasets,
					isFetched: true,
					isLoading: false,
					status: 'active',
					team: 'applicant',
				});
			});
		});

		describe('And submit is clicked', () => {
			beforeAll(() => {
				mockAccountDatasetsContent.mockClear();

				act(async () => {
					const submit = wrapper.getByText('Submit');

					await fireEvent.click(submit, {
						search: 'dataset',
						sortBy: 'metadataQuality',
					});
				});
			});

			it('Then calls the results with the correct props', async () => {
				await waitFor(() => {
					return expect(mockAccountDatasetsContent).toHaveBeenCalledLastWithMatch({
						isFetched: true,
						isLoading: false,
						status: 'active',
						team: 'applicant',
					});
				});
			});

			describe('And the tab is clicked', () => {
				beforeAll(() => {
					mockAccountDatasetsContent.mockClear();

					act(async () => {
						const tab = wrapper.getByText('Select tab', 'inReview');

						await fireEvent.click(tab);
					});
				});

				it('Then calls the results with the correct props', async () => {
					await waitFor(() => {
						return expect(mockAccountDatasetsContent).toHaveBeenCalledLastWithMatch({
							data: mockGetPublisher.data.results.listOfDatasets,
							isFetched: true,
							isLoading: false,
							status: 'inReview',
							team: 'applicant',
						});
					});
				});
			});
		});
	});
});
