import axios from 'axios';
import { apiURL } from '../configs/url.config';
import service from './dataset-onboarding';
import { renderHook } from '@testing-library/react-hooks';
import { QueryClientProvider, QueryClient } from 'react-query';
import { act } from 'react-test-renderer';

jest.mock('axios');

let wrapper;

const queryClient = new QueryClient();

describe('Given the dataset-onboarding service', () => {
	beforeAll(() => {
		wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
	});

	describe('When getDatasetOnboarding is called', () => {
		it('Then calls axios.get with the correct arguments', () => {
			service.getDatasetOnboarding('1234', {
				option1: true,
			});

			expect(axios.get).toHaveBeenCalledWith(`${apiURL}/dataset-onboarding/1234`, {
				option1: true,
			});
		});
	});

	describe('When postDatasetOnboarding is called', () => {
		it('Then calls axios.post with the correct arguments', () => {
			service.postDatasetOnboarding(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(axios.post).toHaveBeenCalledWith(
				`${apiURL}/dataset-onboarding/1234`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When putDatasetOnboarding is called', () => {
		it('Then calls axios.put with the correct arguments', () => {
			service.putDatasetOnboarding(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(axios.put).toHaveBeenCalledWith(
				`${apiURL}/dataset-onboarding/1234`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When patchDatasetOnboarding is called', () => {
		it('Then calls axios.patch with the correct arguments', () => {
			service.patchDatasetOnboarding(
				'1234',
				{
					status: 'archive',
				},
				{ option1: true }
			);

			expect(axios.patch).toHaveBeenCalledWith(
				`${apiURL}/dataset-onboarding/1234`,
				{
					status: 'archive',
				},
				{ option1: true }
			);
		});
	});

	describe('When deleteDatasetOnboarding is called', () => {
		it('Then calls axios.delete with the correct arguments', () => {
			service.deleteDatasetOnboarding('1234', {
				option1: true,
			});

			expect(axios.delete).toHaveBeenCalledWith(`${apiURL}/dataset-onboarding/delete/1234`, {
				option1: true,
			});
		});
	});

	describe('When useGetDatasetOnboarding is called', () => {
		it('Then calls getDatasetOnboarding with the correct arguments', async () => {
			const getSpy = jest.spyOn(service, 'getDatasetOnboarding');
			let rendered;

			act(() => {
				rendered = renderHook(() => service.useGetDatasetOnboarding({ option1: true }), { wrapper });
			});

			const { waitFor, result } = rendered;

			await waitFor(() => result.current.refetch);

			result.current.refetch('1234').then(() => {
				expect(getSpy).toHaveBeenCalledWith('1234');
			});
		});
	});

	describe('When usePostDatasetOnboarding is called', () => {
		it('Then calls postDatasetOnboarding with the correct arguments', async () => {
			const postSpy = jest.spyOn(service, 'postDatasetOnboarding');
			let rendered;

			act(() => {
				rendered = renderHook(() => service.usePostDatasetOnboarding({ option1: true }), { wrapper });
			});

			const { waitFor, result } = rendered;

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(postSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When usePutDatasetOnboarding is called', () => {
		it('Then calls putDatasetOnboarding with the correct arguments', async () => {
			const putSpy = jest.spyOn(service, 'putDatasetOnboarding');
			let rendered;

			act(() => {
				rendered = renderHook(() => service.usePutDatasetOnboarding({ option1: true }), { wrapper });
			});

			const { waitFor, result } = rendered;

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(putSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When usePatchDatasetOnboarding is called', () => {
		it('Then calls patchDatasetOnboarding with the correct arguments', async () => {
			const putSpy = jest.spyOn(service, 'patchDatasetOnboarding');
			let rendered;

			act(() => {
				rendered = renderHook(() => service.usePatchDatasetOnboarding({ option1: true }), { wrapper });
			});

			const { waitFor, result } = rendered;

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync('1234', { status: 'archive' }).then(() => {
				expect(putSpy).toHaveBeenCalledWith('1234', { status: 'archive' });
			});
		});
	});

	describe('When useDeleteDatasetOnboarding is called', () => {
		it('Then calls deleteDatasetOnboarding with the correct arguments', async () => {
			const deleteSpy = jest.spyOn(service, 'deleteDatasetOnboarding');
			let rendered;

			act(() => {
				rendered = renderHook(() => service.useDeleteDatasetOnboarding({ option1: true }), { wrapper });
			});

			const { waitFor, result } = rendered;

			await waitFor(() => result.current.refetch);

			result.current.refetch('1234').then(() => {
				expect(deleteSpy).toHaveBeenCalledWith('1234');
			});
		});
	});
});
