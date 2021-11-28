import { waitFor } from '@testing-library/react';
import { act } from 'react-test-renderer';
import serviceDatasetOnboarding from '../../services/dataset-onboarding/dataset-onboarding';
import { server } from '../../services/mockServer';
import useSearch from './useSearch';

let wrapper;

const searchOptions = {
	count: (results, { status }) => {
		if (!!results && !!status) {
			const { data } = results;
			return data.counts[status];
		}

		return 0;
	},
};

const waitForValue = async (wrapper, key, value) => {
	const { waitFor } = wrapper;

	await waitFor(() => expect(get(`wrapper.result.current.${key}`)).toEqual(value));
};

describe('Given the useGetPublisher component', () => {
	describe('When it is run', () => {
		beforeAll(() => {
			server.listen();

			wrapper = renderHook(() => useSearch(serviceDatasetOnboarding.useGetPublisher('applicant', { enabled: false }), searchOptions), {
				wrapper: Providers,
			});
		});

		afterEach(() => {
			server.resetHandlers();
		});

		afterAll(() => {
			server.close();
		});

		it('Then gets the correct styles', () => {
			const getSpy = jest.spyOn(serviceDatasetOnboarding, 'getPublisher');

			expect(getSpy).not.toHaveBeenCalled();
		});

		it('Then contains the correct return values', () => {
			expect(wrapper.result.current).toEqual(
				expect.objectContaining({
					count: 0,
					data: undefined,
					isError: false,
					isFetched: false,
					isLoading: false,
					params: { maxResults: 10, page: 1 },
				})
			);
		});

		describe('And getResults is called', () => {
			beforeAll(() => {
				act(() => {
					wrapper.result.current.getResults({
						maxResults: 18,
						status: 'inReview',
						search: 'dataset',
					});
				});
			});

			it('Then sets the loading flag', async () => {
				const { waitFor } = wrapper;

				await waitFor(() => expect(wrapper.result.current.isLoading).toEqual(true));
			});

			it('Then returns the correct values', async () => {
				const { waitFor } = wrapper;

				await waitFor(() => expect(wrapper.result.current.count).toEqual(19));

				expect.objectContaining({
					count: 19,
					data: wrapper.result.current.data,
					isError: false,
					isFetched: true,
					isLoading: false,
					params: { maxResults: 18, page: 1, status: 'inReview' },
				});
			});

			it('Then has no previous pages', () => {
				expect(wrapper.result.current.hasPrevious()).toBe(false);
			});

			it('Then does not have a next page', () => {
				expect(wrapper.result.current.hasNext()).toBe(true);
			});

			describe('And next is clicked', () => {
				beforeAll(async () => {
					act(() => {
						wrapper.result.current.goToNext();
					});
				});

				it('Then has a previous page', async () => {
					const { waitFor } = wrapper;

					await waitFor(() => expect(wrapper.result.current.params.page).toBe(1));

					expect(wrapper.result.current.hasPrevious()).toBe(true);
				});

				it('Then does not have a next page', async () => {
					const { waitFor } = wrapper;

					await waitFor(() => expect(wrapper.result.current.params.page).toBe(2));

					expect(wrapper.result.current.hasNext()).toBe(false);
				});

				describe('And previous is clicked', () => {
					beforeAll(async () => {
						act(() => {
							wrapper.result.current.gotToPrevious();
						});
					});

					it('Then goes back to page 1', async () => {
						const { waitFor } = wrapper;

						await waitFor(() => expect(wrapper.result.current.params.page).toBe(1));
					});
				});
			});
		});
	});
});
