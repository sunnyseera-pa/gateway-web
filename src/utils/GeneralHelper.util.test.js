import { isEditMode } from './GeneralHelper.util';
import { dateFormats } from './GeneralHelper.util';

describe('Test GeneralHelper getUpdatesSubmittedLog', () => {
	it('should test isEditMode fn valid url', () => {
		let validSrc = '/projects/edit/456765';
		let isEdit = isEditMode(validSrc);

		expect(isEdit).toBe(true);
	});

	it('should test isEditMode fn inValid url', () => {
		let invalidSrc = '/projects/465465';
		let isEdit = isEditMode(invalidSrc);

		expect(isEdit).toBe(false);
	});
});

describe('dateFormats function', () => {
	it('should have dateOnly and timeOnly formats ', () => {
		let dateFormat = dateFormats('2021-11-08T14:49:41.225Z');
		expect(dateFormat).toHaveProperty('timeOnly', '14:49');
		expect(dateFormat).toHaveProperty('dateOnly', '8 November 2021');
	});
});
