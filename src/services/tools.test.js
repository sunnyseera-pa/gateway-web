import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from 'react-query';
import { apiURL } from '../configs/url.config';
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '../utils/requests';
import service from './tools';

jest.mock('axios');
jest.mock('../utils/requests');

let wrapper;

const queryClient = new QueryClient();

describe('Given the tools service', () => {
	beforeAll(() => {
		wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
	});

	afterAll(() => {
		wrapper.unmount();
	});

	describe('When getTools is called', () => {
		it('Then calls getRequest with the correct arguments', async () => {
			await service.getTools({
				option1: true,
			});

			expect(getRequest).toHaveBeenCalledWith(`${apiURL}/tools/getList`, {
				option1: true,
			});
		});
	});

	describe('When getTool is called', () => {
		it('Then calls getRequest with the correct arguments', async () => {
			await service.getTool('1234', {
				option1: true,
			});

			expect(getRequest).toHaveBeenCalledWith(`${apiURL}/tools/1234`, {
				option1: true,
			});
		});
	});

	describe('When getToolEdit is called', () => {
		it('Then calls getRequest with the correct arguments', async () => {
			await service.getToolEdit('1234', {
				option1: true,
			});

			expect(getRequest).toHaveBeenCalledWith(`${apiURL}/tools/edit/1234`, {
				option1: true,
			});
		});
	});

	describe('When getProjectTag is called', () => {
		it('Then calls getRequest with the correct arguments', async () => {
			await service.getProjectTag('1234', {
				option1: true,
			});

			expect(getRequest).toHaveBeenCalledWith(`${apiURL}/tools/project/tag/1234`, {
				option1: true,
			});
		});
	});

	describe('When postTool is called', () => {
		it('Then calls postRequest with the correct arguments', async () => {
			await service.postTool(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(postRequest).toHaveBeenCalledWith(
				`${apiURL}/tools/1234`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When postReviewAdd is called', () => {
		it('Then calls postRequest with the correct arguments', async () => {
			await service.postReviewAdd(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(postRequest).toHaveBeenCalledWith(
				`${apiURL}/tools/review/add`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When postToolsReply is called', () => {
		it('Then calls postRequest with the correct arguments', async () => {
			await service.postToolsReply(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(postRequest).toHaveBeenCalledWith(
				`${apiURL}/tools/reply`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When putTool is called', () => {
		it('Then calls putRequest with the correct arguments', async () => {
			await service.putTool(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(putRequest).toHaveBeenCalledWith(
				`${apiURL}/tools/1234`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When putReviewApprove is called', () => {
		it('Then calls putRequest with the correct arguments', async () => {
			await service.putReviewApprove(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(putRequest).toHaveBeenCalledWith(
				`${apiURL}/tools/review/approve`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When patchTool is called', () => {
		it('Then calls patchRequest with the correct arguments', async () => {
			await service.patchTool(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(patchRequest).toHaveBeenCalledWith(
				`${apiURL}/tools/1234`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When deleteTool is called', () => {
		it('Then calls deleteRequest with the correct arguments', async () => {
			await service.deleteTool('1234', {
				option1: true,
			});

			expect(deleteRequest).toHaveBeenCalledWith(`${apiURL}/tools/1234`, {
				option1: true,
			});
		});
	});

	describe('When useGetTools is called', () => {
		it('Then calls getTools with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getTools');

			const { waitFor, result } = renderHook(() => service.useGetTools({ option1: true }), { wrapper });

			await waitFor(() => result.current.refetch);

			result.current.refetch().then(() => {
				expect(getSpy).toHaveBeenCalled();
			});
		});
	});

	describe('When useGetToolEdit is called', () => {
		it('Then calls getTools with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getToolEdit');

			const { waitFor, result } = renderHook(() => service.useGetToolEdit({ option1: true }), { wrapper });

			await waitFor(() => result.current.refetch);

			result.current.refetch().then(() => {
				expect(getSpy).toHaveBeenCalled();
			});
		});
	});

	describe('When useGetProjectTag is called', () => {
		it('Then calls getProjectTag with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getProjectTag');

			const { waitFor, result } = renderHook(() => service.useGetProjectTag({ option1: true }), { wrapper });

			await waitFor(() => result.current.refetch);

			result.current.refetch().then(() => {
				expect(getSpy).toHaveBeenCalled();
			});
		});
	});

	describe('When useGetTool is called', () => {
		it('Then calls getTool with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getTool');
			const { waitFor, result } = renderHook(() => service.useGetTool({ option1: true }), { wrapper });

			await waitFor(() => result.current.refetch);

			result.current.refetch('1234').then(() => {
				expect(getSpy).toHaveBeenCalledWith('1234');
			});
		});
	});

	describe('When usePostTool is called', () => {
		it('Then calls postTool with the correct arguments', async () => {
			const postSpy = jest.spyOn(service, 'postTool');
			const { waitFor, result } = renderHook(() => service.usePostTool({ option1: true }), { wrapper });

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(postSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When usePostReviewAdd is called', () => {
		it('Then calls postReviewAdd with the correct arguments', async () => {
			const postSpy = jest.spyOn(service, 'postReviewAdd');
			const { waitFor, result } = renderHook(() => service.usePostReviewAdd({ option1: true }), { wrapper });

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(postSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When usePostToolsReply is called', () => {
		it('Then calls postToolsReply with the correct arguments', async () => {
			const postSpy = jest.spyOn(service, 'postToolsReply');
			const { waitFor, result } = renderHook(() => service.usePostToolsReply({ option1: true }), { wrapper });

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(postSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When usePutTool is called', () => {
		it('Then calls putTool with the correct arguments', async () => {
			const putSpy = jest.spyOn(service, 'putTool');
			const { waitFor, result } = renderHook(() => service.usePutTool({ option1: true }), { wrapper });

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(putSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When usePutReviewApprove is called', () => {
		it('Then calls putReviewApprove with the correct arguments', async () => {
			const putSpy = jest.spyOn(service, 'putReviewApprove');
			const { waitFor, result } = renderHook(() => service.usePutReviewApprove({ option1: true }), { wrapper });

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(putSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When usePatchTool is called', () => {
		it('Then calls patchTool with the correct arguments', async () => {
			const putSpy = jest.spyOn(service, 'patchTool');
			const { waitFor, result } = renderHook(() => service.usePatchTool({ option1: true }), { wrapper });

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(putSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When useDeleteTool is called', () => {
		it('Then calls deleteTool with the correct arguments', async () => {
			const deleteSpy = jest.spyOn(service, 'deleteTool');
			const { waitFor, result } = renderHook(() => service.useDeleteTool({ option1: true }), { wrapper });

			await waitFor(() => result.current.refetch);

			result.current.refetch('1234').then(() => {
				expect(deleteSpy).toHaveBeenCalledWith('1234');
			});
		});
	});
});
