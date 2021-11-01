import { render, screen } from '@testing-library/react';
import React from 'react';
import DatasetCollectionResults from './index';
import { data, relatedObjects } from './mockData';

const mockRelatedObject = jest.fn();

jest.mock('../../../commonComponents/relatedObject/RelatedObject', () => props => {
	mockRelatedObject(props);
	return <div />;
});

describe('Given the DatasetCollectionResults component', () => {
	describe('When no results can be viewed', () => {
		const props = {
			count: 0,
			pageNumber: 0,
			totalPages: 0,
			onPagination: jest.fn(),
			maxResult: 40,
			isLoading: false,
			data: [],
			relatedObjects: [],
		};

		test('Then no related results will be rendered', () => {
			render(<DatasetCollectionResults {...props} />);
			expect(mockRelatedObject).not.toHaveBeenCalled();
		});
	});

	describe('When results can be viewed', () => {
		const props = {
			count: 1,
			pageNumber: 1,
			totalPages: 1,
			onPagination: jest.fn(),
			maxResult: 40,
			isLoading: false,
			data,
			relatedObjects,
		};

		test('Then related results will be rendered', async () => {
			render(<DatasetCollectionResults {...props} />);

			expect(mockRelatedObject).toHaveBeenCalledWith({
				data: data[0],
				activeLink: true,
				datasetLogo: '',
				datasetPublisher: 'NHS DIGITAL',
				collectionReason: '',
				collectionUpdated: '',
				collectionUpdated: '',
				collectionUser: '',
				showRelationshipAnswer: false,
			});
		});
	});
});
