import React from 'react';
import CoursesSearchResults from '.';
import { render } from '@testing-library/react';
import { data } from './mockProps';

const mockRelatedObject = jest.fn();

jest.mock('../../../commonComponents/relatedObject/RelatedObject', () => props => {
	mockRelatedObject(props);
	return <div />;
});

let wrapper;

const props = {
	data,
	count: 656,
	pageNumber: 3,
	totalPages: 10,
	type: 'courses',
	search: 'search term',
	updateOnFilterBadge: jest.fn(),
	onPagination: jest.fn(),
	maxResult: 40,
	isLoading: false,
	sort: 'Sort goes here...',
};

describe('Given the CoursesSearchResults component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<CoursesSearchResults {...props} />);
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then calls onClick with step', () => {
			expect(wrapper.getAllByText('Flexible')).toHaveLength(1);
		});

		it('Then has the correct number of results', () => {
			expect(mockRelatedObject).toHaveBeenCalledTimes(40);
		});

		it('Then passes the correct props', () => {
			expect(mockRelatedObject.mock.calls[0][0]).toEqual({
				data: data[0],
				activeLink: true,
				onSearchPage: true,
				updateOnFilterBadge: props.updateOnFilterBadge,
			});
		});
	});
});
