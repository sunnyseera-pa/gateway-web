import React from 'react';
import CollectionsSearchResults from '.';
import { render } from '@testing-library/react';
import { data } from './mockProps';

const mockCollectionCard = jest.fn();

jest.mock('../../../commonComponents/collectionCard/CollectionCard', () => props => {
	mockCollectionCard(props);
	return <div />;
});

let wrapper;

const props = {
	data,
	count: 656,
	pageNumber: 3,
	totalPages: 10,
	type: 'collections',
	search: 'search term',
	updateOnFilterBadge: jest.fn(),
	onPagination: jest.fn(),
	maxResult: 40,
	isLoading: false,
	sort: 'Sort goes here...',
};

describe('Given the CollectionsSearchResults component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<CollectionsSearchResults {...props} />);
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then has the correct number of results', () => {
			expect(mockCollectionCard).toHaveBeenCalledTimes(40);
		});

		it('Then passes the correct props', () => {
			expect(mockCollectionCard.mock.calls[0][0]).toEqual({
				data: data[0],
			});
		});
	});
});
