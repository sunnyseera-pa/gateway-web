import axios from 'axios';
import { apiURL } from '../configs/url.config';
import service from './data-access-request';
import { renderHook } from '@testing-library/react-hooks';
import { QueryClientProvider, QueryClient } from 'react-query';
import { act } from 'react-test-renderer';

jest.mock('axios');

let wrapper;

const queryClient = new QueryClient();

describe('Given the data-access-request service', () => {
	beforeAll(() => {
		wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
	});

	describe('When getDataAccessRequest is called', () => {
		it('Then calls axios.get with the correct arguments', () => {
			service.getDataAccessRequest('1234', {
				option1: true,
			});

			expect(axios.get).toHaveBeenCalledWith(`${apiURL}/data-access-request/1234`, {
				option1: true,
			});
		});
	});

	describe('When postDataAccessRequest is called', () => {
		it('Then calls axios.post with the correct arguments', () => {
			service.postDataAccessRequest(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(axios.post).toHaveBeenCalledWith(
				`${apiURL}/data-access-request/1234`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When putDataAccessRequest is called', () => {
		it('Then calls axios.put with the correct arguments', () => {
			service.putDataAccessRequest(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(axios.put).toHaveBeenCalledWith(
				`${apiURL}/data-access-request/1234`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When patchDataAccessRequest is called', () => {
		it('Then calls axios.patch with the correct arguments', () => {
			service.patchDataAccessRequest(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(axios.patch).toHaveBeenCalledWith(
				`${apiURL}/data-access-request/1234`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When deleteDataAccessRequest is called', () => {
		it('Then calls axios.delete with the correct arguments', () => {
			service.deleteDataAccessRequest('1234', {
				option1: true,
			});

			expect(axios.delete).toHaveBeenCalledWith(`${apiURL}/data-access-request/1234`, {
				option1: true,
			});
		});
	});

	describe('When useGetDataAccessRequest is called', () => {
		it('Then calls getDataAccessRequest with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getDataAccessRequest');
			let rendered;

			act(() => {
				rendered = renderHook(() => service.useGetDataAccessRequest({ option1: true }), { wrapper });
			});

			const { waitFor, result } = rendered;

			await waitFor(() => result.current.refetch);

			result.current.refetch('1234').then(() => {
				expect(getSpy).toHaveBeenCalledWith('1234');
			});
		});
	});

	describe('When usePostDataAccessRequest is called', () => {
		it('Then calls postDataAccessRequest with the correct arguments', async () => {
			const postSpy = jest.spyOn(service, 'postDataAccessRequest');
			let rendered;

			act(() => {
				rendered = renderHook(() => service.usePostDataAccessRequest({ option1: true }), { wrapper });
			});

			const { waitFor, result } = rendered;

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(postSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When usePutDataAccessRequest is called', () => {
		it('Then calls putDataAccessRequest with the correct arguments', async () => {
			const putSpy = jest.spyOn(service, 'putDataAccessRequest');
			let rendered;

			act(() => {
				rendered = renderHook(() => service.usePutDataAccessRequest({ option1: true }), { wrapper });
			});

			const { waitFor, result } = rendered;

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(putSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When usePatchDataAccessRequest is called', () => {
		it('Then calls patchDataAccessRequest with the correct arguments', async () => {
			const putSpy = jest.spyOn(service, 'patchDataAccessRequest');
			let rendered;

			act(() => {
				rendered = renderHook(() => service.usePatchDataAccessRequest({ option1: true }), { wrapper });
			});

			const { waitFor, result } = rendered;

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(putSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When useDeleteDataAccessRequest is called', () => {
		it('Then calls deleteDataAccessRequest with the correct arguments', async () => {
			const deleteSpy = jest.spyOn(service, 'deleteDataAccessRequest');
			let rendered;

			act(() => {
				rendered = renderHook(() => service.useDeleteDataAccessRequest({ option1: true }), { wrapper });
			});

			const { waitFor, result } = rendered;

			await waitFor(() => result.current.refetch);

			result.current.refetch('1234').then(() => {
				expect(deleteSpy).toHaveBeenCalledWith('1234');
			});
		});
	});
});
