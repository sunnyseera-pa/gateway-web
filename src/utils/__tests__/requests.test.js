import axios from 'axios';
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from '../requests';

jest.mock('axios');

describe('Given the request helpers', () => {
	describe('When getRequest is called', () => {
		it('Then calls axios.get with the correct arguments', () => {
			getRequest('1234', {
				option1: true,
			});

			expect(axios.get).toHaveBeenCalledWith('1234', {
				option1: true,
			});
		});
	});

	describe('When postRequest is called', () => {
		it('Then calls axios.post with the correct arguments', () => {
			postRequest(
				'1234',
				{ status: 'archived' },
				{
					option1: true,
				}
			);

			expect(axios.post).toHaveBeenCalledWith(
				'1234',
				{ status: 'archived' },
				{
					option1: true,
				}
			);
		});
	});

	describe('When putRequest is called', () => {
		it('Then calls axios.put with the correct arguments', () => {
			putRequest(
				'1234',
				{ status: 'archived' },
				{
					option1: true,
				}
			);

			expect(axios.put).toHaveBeenCalledWith(
				'1234',
				{ status: 'archived' },
				{
					option1: true,
				}
			);
		});
	});

	describe('When patchRequest is called', () => {
		it('Then calls axios.get with the correct arguments', () => {
			patchRequest(
				'1234',
				{ status: 'archived' },
				{
					option1: true,
				}
			);

			expect(axios.patch).toHaveBeenCalledWith(
				'1234',
				{ status: 'archived' },
				{
					option1: true,
				}
			);
		});
	});

	describe('When deleteRequest is called', () => {
		it('Then calls axios.delete with the correct arguments', () => {
			deleteRequest('1234', {
				option1: true,
			});

			expect(axios.delete).toHaveBeenCalledWith('1234', {
				option1: true,
			});
		});
	});
});
