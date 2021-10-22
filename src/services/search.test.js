import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { apiURL, apiV2URL } from '../configs/url.config';
import { getRequest } from '../utils/requests';
import service from './search';

jest.mock('axios');
jest.mock('../utils/requests');

let wrapper;

const queryClient = new QueryClient();

describe('Given the search service', () => {
	beforeAll(() => {
		wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
	});

	afterAll(() => {
		wrapper.unmount();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('When getSearch is called', () => {
		it('Then calls getRequest with the correct arguments', async () => {
			await service.getSearch('search_term', {
				option1: true,
			});

			expect(getRequest).toHaveBeenCalledWith(`${apiURL}/search?search=search_term`, {
				option1: true,
			});
		});
	});

	describe('When getTopic is called', () => {
		it('Then calls getRequest with the correct arguments', async () => {
			await service.getTopic('paper', {
				option1: true,
			});

			expect(getRequest).toHaveBeenCalledWith(`${apiURL}/search/filter/topic/paper`, {
				option1: true,
			});
		});
	});

	describe('When getFilterBy is called', () => {
		it('Then calls getRequest with the correct arguments', async () => {
			await service.getFilterBy('search_term', {
				option1: true,
			});

			expect(getRequest).toHaveBeenCalledWith(`${apiURL}/search/filter?search=search_term`, {
				option1: true,
			});
		});
	});

	describe('When getFilters is called', () => {
		it('Then calls getRequest with the correct arguments', async () => {
			await service.getFilters('paper', {
				option1: true,
			});

			expect(getRequest).toHaveBeenCalledWith(`${apiV2URL}/filters/paper`, {
				option1: true,
			});
		});
	});

	describe('When useGetSearch is called', () => {
		it('Then calls getSearch with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getSearch');
			const rendered = renderHook(() => service.useGetSearch({ option1: true }), { wrapper });

			assertServiceRefetchCalled(rendered, getSpy, 'search_term', { option1: true });
		});
	});

	describe('When useGetTopic is called', () => {
		it('Then calls getTopic with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getTopic');
			const rendered = renderHook(() => service.useGetTopic({ option1: true }), { wrapper });

			assertServiceRefetchCalled(rendered, getSpy, 'paper', { option1: true });
		});
	});

	describe('When useGetFilterBy is called', () => {
		it('Then calls getFilterBy with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getFilterBy');
			const rendered = renderHook(() => service.useGetFilterBy({ option1: true }), { wrapper });

			assertServiceRefetchCalled(rendered, getSpy, 'search_term', { option1: true });
		});
	});

	describe('When useGetFilters is called', () => {
		it('Then calls getTopic with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getFilters');
			const rendered = renderHook(() => service.useGetFilters({ option1: true }), { wrapper });

			assertServiceRefetchCalled(rendered, getSpy, 'paper', { option1: true });
		});
	});
});
