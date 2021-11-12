import { render } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import reactRouter from 'react-router';
import AccountDataset from '.';
import { waitFor } from '@testing-library/react';
import { AuthProvider } from '../../../../context/AuthContext';
import { mockUser } from '../../../../services/auth/mockData';
import { server } from '../../../../services/mockServer';

const mockDatasetCard = jest.fn();

window.location.assign = jest.fn();

jest.mock('../../../commonComponents/DatasetCard', () => props => {
	mockDatasetCard(props);
	return <div />;
});

const props = {
	location: {},
};

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

describe('Given the AccountDataset component', () => {
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
		let wrapper;

		beforeAll(() => {
			jest.spyOn(reactRouter, 'useParams').mockReturnValue({
				id: '0a048419-0796-46fb-ad7d-91e650a6c742',
			});

			wrapper = render(
				<AuthProvider value={{ userState: mockUser.data }}>
					<QueryClientProvider client={queryClient}>
						<AccountDataset {...props} />
					</QueryClientProvider>
				</AuthProvider>
			);
		});

		afterAll(() => {
			window.location.assign.mockReset();
		});

		it('Then shows a loader', async () => {
			await waitFor(() => expect(wrapper.getByText('Loading...')).toBeTruthy());
		});

		it('Then matches the previous snapshot', async () => {
			await waitFor(() => expect(mockDatasetCard).toHaveBeenCalledTimes(1));

			expect(wrapper.container).toMatchSnapshot();
		});

		describe('And the next button is clicked', () => {
			beforeAll(async () => {
				await waitFor(() => expect(wrapper.getByText('Next')).toBeTruthy());

				const button = wrapper.getByText('Next');

				await fireEvent.click(button);
			});

			it('Then loads the new dataset', () => {
				expect(window.location.assign.mock.calls[0][0]).toEqual('/account/datasets/d5c99a71-c039-4a0b-9171-dba8a1c33154');
			});
		});

		describe('And the Make a decision button is clicked', () => {
			beforeAll(async () => {
				await waitFor(() => expect(wrapper.getByText('Make a decision')).toBeTruthy());

				const button = wrapper.queryAllByText('Make a decision')[0];

				await fireEvent.click(button);
			});

			it('Then loads the Make a decision overlay', () => {
				expect(wrapper.container).toMatchSnapshot();
			});

			describe('And the Reject button is clicked', () => {
				beforeAll(async () => {
					await waitFor(() => expect(wrapper.getByText('Reject')).toBeTruthy());

					const button = wrapper.queryAllByText('Reject')[0];

					await fireEvent.click(button);
				});

				it('Then loads the Reject dataset modal', () => {
					expect(wrapper.container).toMatchSnapshot();
				});
			});
		});
	});

	describe('When the next page is rendered', () => {
		let wrapper;

		beforeAll(() => {
			jest.spyOn(reactRouter, 'useParams').mockReturnValue({
				id: 'd5c99a71-c039-4a0b-9171-dba8a1c33154',
			});

			wrapper = render(
				<AuthProvider value={{ userState: mockUser.data }}>
					<QueryClientProvider client={queryClient}>
						<AccountDataset {...props} />
					</QueryClientProvider>
				</AuthProvider>
			);
		});

		afterAll(() => {
			window.location.assign.mockReset();
		});

		describe('And the previous button is clicked', () => {
			beforeAll(async () => {
				await waitFor(() => expect(wrapper.getByText('Previous')).toBeTruthy());

				const button = wrapper.queryAllByText('Previous')[0];

				await fireEvent.click(button);
			});

			it('Then loads the new dataset', () => {
				expect(window.location.assign.mock.calls[0][0]).toEqual('/account/datasets/0a048419-0796-46fb-ad7d-91e650a6c742');
			});
		});
	});

	describe('And the dataset is not in review', () => {
		let wrapper;

		beforeAll(async () => {
			jest.spyOn(reactRouter, 'useParams').mockReturnValue({
				id: '1f509fe7-e94f-48fe-af6a-81f2bf8a5270',
			});

			wrapper = render(
				<AuthProvider value={{ userState: mockUser.data }}>
					<QueryClientProvider client={queryClient}>
						<AccountDataset {...props} />
					</QueryClientProvider>
				</AuthProvider>
			);
		});

		it('Then shows an info message', async () => {
			await waitFor(() => expect(wrapper.getByText('The activity log for this dataset cannot be accessed. It must be set to in review.')));
		});
	});

	describe('And the dataset is not valid', () => {
		let wrapper;

		beforeAll(async () => {
			jest.spyOn(reactRouter, 'useParams').mockReturnValue({
				id: 'invalid',
			});

			wrapper = render(
				<AuthProvider value={{ userState: mockUser.data }}>
					<QueryClientProvider client={queryClient}>
						<AccountDataset {...props} />
					</QueryClientProvider>
				</AuthProvider>
			);
		});

		it('Then shows a no results message', async () => {
			await waitFor(() => expect(wrapper.getAllByText('No dataset found')).toBeTruthy());
		});
	});
});
