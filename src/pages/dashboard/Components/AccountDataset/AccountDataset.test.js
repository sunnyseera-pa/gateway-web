import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { QueryClient } from 'react-query';
import reactRouter from 'react-router';
import AccountDataset from '.';
import { server } from '../../../../services/mockServer';

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
const mockPush = jest.fn();

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

		jest.spyOn(reactRouter, 'useHistory').mockImplementation(() => ({
			push: mockPush,
		}));
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
				id: 'd5c99a71-c039-4a0b-9171-dba8a1c33154',
			});

			wrapper = render(<AccountDataset {...props} />, {
				wrapper: ({ children }) => <Providers queryClient={queryClient}>{children}</Providers>,
			});
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

			afterAll(() => {
				mockPush.mockReset();
			});

			it('Then loads the new dataset', () => {
				expect(mockPush).toHaveBeenCalledWith('/account/datasets/4932179f-1c9c-40a0-81b5-9b499aff7a64');
			});
		});

		describe('And the previous button is clicked', () => {
			beforeAll(async () => {
				await waitFor(() => expect(wrapper.queryAllByText('Previous')).toBeTruthy());

				const button = wrapper.queryAllByText('Previous')[0];

				await fireEvent.click(button);
			});

			afterAll(() => {
				mockPush.mockReset();
			});

			it('Then loads the new dataset', () => {
				expect(mockPush).toHaveBeenCalledWith('/account/datasets/0a048419-0796-46fb-ad7d-91e650a6c742');
			});
		});
	});

	describe('And the dataset is not in review', () => {
		let wrapper;

		beforeAll(async () => {
			jest.spyOn(reactRouter, 'useParams').mockReturnValue({
				id: '1f509fe7-e94f-48fe-af6a-81f2bf8a5270',
			});

			wrapper = render(<AccountDataset {...props} />, {
				wrapper: ({ children }) => <Providers queryClient={queryClient}>{children}</Providers>,
			});
		});

		afterAll(() => {
			mockPush.mockReset();
		});

		it('Then loads the new dataset', () => {
			expect(mockPush).toHaveBeenCalledWith('/account?tab=datasets');
		});
	});

	describe('And the dataset is not valid', () => {
		let wrapper;

		beforeAll(async () => {
			jest.spyOn(reactRouter, 'useParams').mockReturnValue({
				id: 'invalid',
			});

			wrapper = render(<AccountDataset {...props} />, {
				wrapper: ({ children }) => <Providers queryClient={queryClient}>{children}</Providers>,
			});
		});

		afterAll(() => {
			mockPush.mockReset();
		});

		it('Then loads the new dataset', () => {
			expect(mockPush).toHaveBeenCalledWith('/account?tab=datasets');
		});
	});
});
