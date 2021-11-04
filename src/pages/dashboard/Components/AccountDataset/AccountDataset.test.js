import { render } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
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

let wrapper;

const props = {
	location: {},
};

const queryClient = new QueryClient();

jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	useParams: () => ({
		id: '0a048419-0796-46fb-ad7d-91e650a6c742',
	}),
}));

describe('Given the AccountDataset component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			server.listen();
			wrapper = render(
				<AuthProvider value={{ userState: mockUser.data }}>
					<QueryClientProvider client={queryClient}>
						<AccountDataset {...props} />
					</QueryClientProvider>
				</AuthProvider>
			);
		});

		afterEach(() => {
			server.resetHandlers();
		});

		afterAll(() => {
			server.close();
		});

		it('Then matches the previous snapshot', async () => {
			await waitFor(() => expect(mockDatasetCard).toHaveBeenCalledTimes(1));

			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then has a next button', async () => {
			const button = wrapper.getByText('Next');

			expect(button).toBeTruthy();
		});

		describe('And the next button is clicked', () => {
			beforeAll(async () => {
				const button = wrapper.getByText('Next');

				await fireEvent.click(button);
			});

			it('Then loads the new dataset', async () => {
				expect(window.location.assign).toHaveBeenCalledWith('/account/datasets/d5c99a71-c039-4a0b-9171-dba8a1c33154');
			});
		});
	});
});
