import { getRequest, postRequest } from '../utils/requests';
import { apiURL } from '../configs/url.config';
import * as service from './registration';
import { renderHook } from '@testing-library/react-hooks';
import { QueryClientProvider, QueryClient } from 'react-query';
import { act } from 'react-test-renderer';

jest.mock('../utils/requests');

let wrapper;

const queryClient = new QueryClient();

describe('Given the registration service', () => {
    beforeAll(() => {
		wrapper = ({ children }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
	});

    describe('When getRegistration is called', () => {
		it('Then calls getRequest with the correct arguments', async () => {
			await service.getRegistration('1234', {
				option1: true,
			});

			expect(getRequest).toHaveBeenCalledWith(`${apiURL}/auth/register/1234`, {
				option1: true,
			});
		});
	});

    describe('When postRegistration is called', () => {
		it('Then calls postRequest with the correct arguments', async () => {
			await service.postRegistration(
				{
					firstname: 'simon',
				},
				{ option1: true }
			);

			expect(postRequest).toHaveBeenCalledWith(
				`${apiURL}/auth/register/`,
				{
					firstname: 'simon',
				},
				{ option1: true }
			);
		});
	});

    describe('When useGetRegistration is called', () => {
		it('Then calls getRegistration with the correct arguments', async () => {
			const getRegistrationSpy = jest.spyOn(service, 'getRegistration');
			let rendered;

			act(() => {
				rendered = renderHook(() => service.useGetRegistration({ option1: true }), { wrapper });
			});

			const { waitFor, result } = rendered;

			await waitFor(() => result.current.refetch);

			result.current.refetch('1234').then(() => {
				expect(getRegistrationSpy).toHaveBeenCalledWith('1234');
			});
		});
	});

    describe('When usePostRegistration is called', () => {
		it('Then calls postRegistration with the correct arguments', async () => {
			const postRegistrationSpy = jest.spyOn(service, 'postRegistration');
			let rendered;

			act(() => {
				rendered = renderHook(() => service.usePostRegistration({ option1: true }), { wrapper });
			});

			const { waitFor, result } = rendered;

			await waitFor(() => result.current.mutateAsync);

			result.current.mutateAsync({ firstname: 'simon' }).then(() => {
				expect(postRegistrationSpy).toHaveBeenCalledWith({ firstname: 'simon' });
			});
		});
	});
});