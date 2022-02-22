import { filterBranches, findAllByKey, isEditMode, iterateDeep } from './GeneralHelper.util';
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

describe('iterateDeep function', () => {
	it('should have the correct output', () => {
		expect(
			iterateDeep(
				[
					{
						value: 'Covid',
						children: [
							{
								value: 'Omicron',
								children: [{ value: 'beta' }],
							},
						],
					},
					{
						value: 'Dicky ticker',
					},
				],
				item => {
					item.checked = true;
				}
			)
		).toEqual([
			{
				value: 'Covid',
				checked: true,
				children: [
					{
						value: 'Omicron',
						checked: true,
						children: [{ value: 'beta', checked: true }],
					},
				],
			},
			{
				value: 'Dicky ticker',
				checked: true,
			},
		]);
	});
});

describe('findAllByKey function', () => {
	it('should return the correct nodes', () => {
		const foundItems = findAllByKey(
			[
				{
					value: 'UK',
					children: [
						{
							value: 'UK, Wales',
						},
					],
				},
				{
					value: 'India',
				},
			],
			(key, value) => {
				return key === 'value' && value === 'UK, Wales';
			}
		);

		expect(foundItems).toEqual([
			{
				value: 'UK, Wales',
			},
		]);
	});
});

describe('filterBranches function', () => {
	it('should return the correct tree', () => {
		const foundItems = filterBranches(
			[
				{
					value: 'UK',
					descendants: [
						{
							value: 'UK, Wales',
						},
						{
							value: 'UK, Island',
						},
					],
				},
				{
					value: 'India',
				},
			],
			(node, key, value) => {
				return key === 'value' && value.includes('Island');
			},
			'descendants'
		);

		expect(foundItems).toEqual([
			{
				value: 'UK',
				descendants: [
					{
						value: 'UK, Island',
						descendants: [],
					},
				],
			},
		]);
	});
});
