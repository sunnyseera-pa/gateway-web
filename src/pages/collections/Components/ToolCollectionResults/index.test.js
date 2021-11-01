import { render } from '@testing-library/react';
import React from 'react';
import ToolCollectionResults from './index';
import { data, relatedObjects } from './mockData';

const mockRelatedObject = jest.fn();

jest.mock('../../../commonComponents/relatedObject/RelatedObject', () => props => {
	mockRelatedObject(props);
	return <div />;
});

describe('Given the ToolCollectionResults component', () => {
	describe('When no results can be viewed', () => {
		const props = {
			count: 0,
			pageNumber: 0,
			totalPages: 0,
			data: [],
			relatedObjects: [],
		};

		test('Then no related results will be rendered', () => {
			render(<ToolCollectionResults {...props} />);

			expect(mockRelatedObject).not.toHaveBeenCalled();
		});
	});

	describe('When results can be viewed', () => {
		const props = {
			count: 1,
			pageNumber: 1,
			totalPages: 1,
			data,
			relatedObjects,
		};

		test('Then related results will be rendered', async () => {
			render(<ToolCollectionResults {...props} />);

			expect(mockRelatedObject).toHaveBeenCalledWith({
				data: data[0],
				activeLink: true,
				collectionReason: '',
				collectionUpdated: '20 May 2021',
				collectionUser: 'Lewis Kearsey',
				showRelationshipAnswer: false,
			});
		});
	});
});
