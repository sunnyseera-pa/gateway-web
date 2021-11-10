import { render } from '@testing-library/react';
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import reactRouter from 'react-router';
import AccountDataset from '.';
import { waitFor } from '@testing-library/react';
import { AuthProvider } from '../../../../context/AuthContext';
import { mockUser } from '../../../../services/auth/mockData';
import { server } from '../../../../services/mockServer';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../../i18n';

jest.mock('../../../commonComponents/DatasetCard', () => props => {
	mockDatasetCard(props);
	return <div />;
});

jest.mock('../ActivityLogCard', () => props => {
	mockActivityLogCard(props);
	return <div />;
});

const mockDatasetCard = jest.fn();
const mockActivityLogCard = jest.fn();

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const providers = ({ children }) => (
	<I18nextProvider i18n={i18n}>
		<Suspense fallback='Loading'>
			<AuthProvider value={{ userState: mockUser.data }}>
				<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
			</AuthProvider>
		</Suspense>
	</I18nextProvider>
);

const props = {
	location: {},
};

window.location.assign = jest.fn();

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

			wrapper = render(<AccountDataset {...props} />, { wrapper: providers });
		});

		afterAll(() => {
			window.location.assign.mockReset();
		});

		it('Then matches the previous snapshot', async () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then shows a loader', async () => {
			await waitFor(() => expect(wrapper.getByText('Loading...')).toBeTruthy());
		});

		it('Then calls the DatasetCard the correct number of times', async () => {
			await waitFor(() => expect(mockDatasetCard).toHaveBeenCalledTimes(1));
		});

		it('Then calls the ActivityLogCard the correct number of times', async () => {
			await waitFor(() => expect(mockActivityLogCard).toHaveBeenCalledTimes(4));
		});

		describe('And the next button is clicked', () => {
			beforeAll(async () => {
				await waitFor(() => expect(wrapper.queryAllByText('Next')).toBeTruthy());

				const button = wrapper.queryAllByText('Next')[0];

				await fireEvent.click(button);
			});

			it('Then loads the new dataset', () => {
				expect(window.location.assign.mock.calls[0][0]).toEqual('/account/datasets/a9923649-38fe-4b28-90a1-e6de5fa5d405');
			});
		});
	});

	describe('When the next page is rendered', () => {
		let wrapper;

		beforeAll(() => {
			jest.spyOn(reactRouter, 'useParams').mockReturnValue({
				id: 'd5c99a71-c039-4a0b-9171-dba8a1c33154',
			});

			wrapper = render(<AccountDataset {...props} />, { wrapper: providers });
		});

		afterAll(() => {
			window.location.assign.mockReset();
		});

		describe('And the previous button is clicked', () => {
			beforeAll(async () => {
				await waitFor(() => expect(wrapper.queryAllByText('Previous')).toBeTruthy());

				const button = wrapper.queryAllByText('Previous')[0];

				await fireEvent.click(button);
			});

			it('Then loads the new dataset', () => {
				expect(window.location.assign.mock.calls[0][0]).toEqual('/account/datasets/fd9d9bf3-576b-4efa-89fc-b389d524d667');
			});
		});
	});

	describe('And the dataset is not in review', () => {
		let wrapper;

		beforeAll(async () => {
			jest.spyOn(reactRouter, 'useParams').mockReturnValue({
				id: '1f509fe7-e94f-48fe-af6a-81f2bf8a5270',
			});

			wrapper = render(<AccountDataset {...props} />, { wrapper: providers });
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

			wrapper = render(<AccountDataset {...props} />, { wrapper: providers });
		});

		it('Then shows a no results message', async () => {
			await waitFor(() => expect(wrapper.getAllByText('No dataset found')).toBeTruthy());
		});
	});
});
