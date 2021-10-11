import { renderHook } from '@testing-library/react-hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { apiURL } from '../configs/url.config';
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '../utils/requests';
import service from './data-access-request';

jest.mock('axios');
jest.mock('../utils/requests');

let wrapper;

const queryClient = new QueryClient();

describe('Given the data-access-request service', () => {
	beforeAll(() => {
		wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
	});

	afterAll(() => {
		wrapper.unmount();
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('When getDataAccessRequests is called', () => {
		it('Then calls getRequest with the correct arguments', async () => {
			service.getDataAccessRequests({
				option1: true,
			});

			expect(getRequest).toHaveBeenCalledWith(`${apiURL}/data-access-request`, {
				option1: true,
			});
		});
	});

	describe('When getDataAccessRequest is called', () => {
		it('Then calls getRequest with the correct arguments', async () => {
			await service.getDataAccessRequest('1234', {
				option1: true,
			});

			expect(getRequest).toHaveBeenCalledWith(`${apiURL}/data-access-request/1234`, {
				option1: true,
			});
		});
	});

	describe('When postDataAccessRequest is called', () => {
		it('Then calls postRequest with the correct arguments', async () => {
			await service.postDataAccessRequest(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(postRequest).toHaveBeenCalledWith(
				`${apiURL}/data-access-request/1234`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When putDataAccessRequest is called', () => {
		it('Then calls putRequest with the correct arguments', async () => {
			await service.putDataAccessRequest(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(putRequest).toHaveBeenCalledWith(
				`${apiURL}/data-access-request/1234`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When patchDataAccessRequest is called', () => {
		it('Then calls patchRequest with the correct arguments', async () => {
			await service.patchDataAccessRequest(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(patchRequest).toHaveBeenCalledWith(
				`${apiURL}/data-access-request/1234`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When deleteDataAccessRequest is called', () => {
		it('Then calls deleteRequest with the correct arguments', async () => {
			await service.deleteDataAccessRequest('1234', {
				option1: true,
			});

			expect(deleteRequest).toHaveBeenCalledWith(`${apiURL}/data-access-request/1234`, {
				option1: true,
			});
		});
	});

	describe('When useGetDataAccessRequests is called', () => {
		it('Then calls getDataAccessRequests with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getDataAccessRequests');
			const rendered = renderHook(() => service.useGetDataAccessRequests({ option1: true }), { wrapper });

			assertServiceRefetchCalled(rendered, getSpy);
		});
	});

	describe('When useGetDataAccessRequest is called', () => {
		it('Then calls getDataAccessRequest with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getDataAccessRequest');
			const rendered = renderHook(() => service.useGetDataAccessRequest({ option1: true }), { wrapper });

			assertServiceRefetchCalled(rendered, getSpy, '1234');
		});
	});

	describe('When usePostDataAccessRequest is called', () => {
		it('Then calls postDataAccessRequest with the correct arguments', async () => {
			const postSpy = jest.spyOn(service, 'postDataAccessRequest');
			const rendered = renderHook(() => service.usePostDataAccessRequest({ option1: true }), { wrapper });

			assertServiceMutateAsyncCalled(rendered, postSpy, '1234', { status: 'archive' });
		});
	});

	describe('When usePutDataAccessRequest is called', () => {
		it('Then calls putDataAccessRequest with the correct arguments', async () => {
			const putSpy = jest.spyOn(service, 'putDataAccessRequest');
			const rendered = renderHook(() => service.usePutDataAccessRequest({ option1: true }), { wrapper });

			assertServiceMutateAsyncCalled(rendered, putSpy, '1234', { status: 'archive' });
		});
	});

	describe('When usePatchDataAccessRequest is called', () => {
		it('Then calls patchDataAccessRequest with the correct arguments', async () => {
			const patchSpy = jest.spyOn(service, 'patchDataAccessRequest');
			const rendered = renderHook(() => service.usePatchDataAccessRequest({ option1: true }), { wrapper });

			assertServiceMutateAsyncCalled(rendered, patchSpy, '1234', { status: 'archive' });
		});
	});

	describe('When useDeleteDataAccessRequest is called', () => {
		it('Then calls deleteDataAccessRequest with the correct arguments', async () => {
			const deleteSpy = jest.spyOn(service, 'deleteDataAccessRequest');
			const rendered = renderHook(() => service.useDeleteDataAccessRequest({ option1: true }), { wrapper });

			assertServiceRefetchCalled(rendered, deleteSpy, '1234');
		});
	});
});
