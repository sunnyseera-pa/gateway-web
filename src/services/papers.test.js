import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { apiURL } from '../configs/url.config';
import service from './papers';

jest.mock('axios');

let wrapper;

const queryClient = new QueryClient();

describe('Given the data-access-request service', () => {
	beforeAll(() => {
		wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
	});

	describe('When getPapers is called', () => {
		it('Then calls axios.get with the correct arguments', () => {
			service.getPapers({
				option1: true,
			});

			expect(axios.get).toHaveBeenCalledWith(`${apiURL}/data-access-request`, {
				option1: true,
			});
		});
	});

	describe('When getPaper is called', () => {
		it('Then calls axios.get with the correct arguments', () => {
			service.getPaper('1234', {
				option1: true,
			});

			expect(axios.get).toHaveBeenCalledWith(`${apiURL}/data-access-request/1234`, {
				option1: true,
			});
		});
	});

	describe('When postPaper is called', () => {
		it('Then calls axios.post with the correct arguments', () => {
			service.postPaper(
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

	describe('When putPaper is called', () => {
		it('Then calls axios.put with the correct arguments', () => {
			service.putPaper(
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

	describe('When patchPaper is called', () => {
		it('Then calls axios.patch with the correct arguments', () => {
			service.patchPaper(
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

	describe('When deletePaper is called', () => {
		it('Then calls axios.delete with the correct arguments', () => {
			service.deletePaper('1234', {
				option1: true,
			});

			expect(axios.delete).toHaveBeenCalledWith(`${apiURL}/data-access-request/1234`, {
				option1: true,
			});
		});
	});

	describe('When useGetPapers is called', () => {
		it('Then calls getPapers with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getPapers');

			const { waitFor, result } = renderHook(() => service.useGetPapers({ option1: true }), { wrapper });

			await waitFor(() => result.current.refetch);

			result.current.refetch().then(() => {
				expect(getSpy).toHaveBeenCalled();
			});
		});
	});

	describe('When useGetPaper is called', () => {
		it('Then calls getPaper with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getPaper');
			const { waitFor, result } = renderHook(() => service.useGetPaper({ option1: true }), { wrapper });

			await waitFor(() => result.current.refetch);

			result.current.refetch('1234').then(() => {
				expect(getSpy).toHaveBeenCalledWith('1234');
			});
		});
	});

	describe('When usePostPaper is called', () => {
		it('Then calls postPaper with the correct arguments', async () => {
			const postSpy = jest.spyOn(service, 'postPaper');
			const { waitFor, result } = renderHook(() => service.usePostPaper({ option1: true }), { wrapper });

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(postSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When usePutPaper is called', () => {
		it('Then calls putPaper with the correct arguments', async () => {
			const putSpy = jest.spyOn(service, 'putPaper');
			const { waitFor, result } = renderHook(() => service.usePutPaper({ option1: true }), { wrapper });

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(putSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When usePatchPaper is called', () => {
		it('Then calls patchPaper with the correct arguments', async () => {
			const putSpy = jest.spyOn(service, 'patchPaper');
			const { waitFor, result } = renderHook(() => service.usePatchPaper({ option1: true }), { wrapper });

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(putSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When useDeletePaper is called', () => {
		it('Then calls deletePaper with the correct arguments', async () => {
			const deleteSpy = jest.spyOn(service, 'deletePaper');
			const { waitFor, result } = renderHook(() => service.useDeletePaper({ option1: true }), { wrapper });

			await waitFor(() => result.current.refetch);

			result.current.refetch('1234').then(() => {
				expect(deleteSpy).toHaveBeenCalledWith('1234');
			});
		});
	});
});
