import React from 'react';
import ProjectsSearchSort from './ProjectsSearchSort';
import { render } from '@testing-library/react';

const mockSortDropdown = jest.fn();
const mockOnSort = jest.fn();

jest.mock('../SortDropdown', () => props => {
	mockSortDropdown(props);
	return <div />;
});

let wrapper;

const props = {
	search: 'search term',
	sort: 'sort by',
	onSort: mockOnSort,
};

const dropdownItems = ['relevance', 'popularity', 'latest', 'resources'];

describe('Given the ProjectsSearchSort component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<ProjectsSearchSort {...props} />);
		});

		it('Then has the correct properties', () => {
			expect(mockSortDropdown).toHaveBeenCalledWith({
				dropdownItems,
				sort: 'sort by',
				handleSort: mockOnSort,
			});
		});

		describe('And there is no search or sort term', () => {
			beforeAll(() => {
				wrapper = render(<ProjectsSearchSort {...props} search='' sort='' />);
			});

			it('Then has the correct properties', () => {
				expect(mockSortDropdown).toHaveBeenCalledWith({
					dropdownItems,
					sort: 'latest',
					handleSort: mockOnSort,
				});
			});
		});

		describe('And there is no sort', () => {
			beforeAll(() => {
				wrapper = render(<ProjectsSearchSort {...props} sort='' />);
			});

			it('Then has the correct properties', () => {
				expect(mockSortDropdown).toHaveBeenCalledWith({
					dropdownItems,
					sort: 'relevance',
					handleSort: mockOnSort,
				});
			});
		});
	});
});
