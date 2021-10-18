import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Paper from './Paper';
import mockData from './mockData';
const props = {
	data: { ...mockData },
	onSearchPage: false,
	activeLink: false,
	showRelationshipQuestion: false,
	updateOnFilterBadge: jest.fn(),
	removeButton: jest.fn(),
};
let wrapper;

describe('Given the Paper component', () => {
	describe('When it is rendered', () => {
		beforeAll(() => {
			wrapper = render(<Paper {...props} />);
		});

		it('Then matches the previous snapshot', () => {
			expect(wrapper.container).toMatchSnapshot();
		});

		it('Then Paper Title should be rendered with description', () => {
			expect(screen.getByTestId('paper-title')).toHaveTextContent(props.data.name);
			expect(screen.getByTestId('paper-description')).toHaveTextContent(props.data.description);
		});

		it('Then Paper SVG Icon should be rendered', () => {
			expect(screen.getByTestId('newprojecticon')).toBeTruthy();
		});

		it('Then the Features Badge  should be rendered without links', () => {
			props.data.tags.features.map(value => {
				expect(screen.getByTestId(`badge-${value}`)).toBeTruthy();
				expect(screen.queryByTestId(`badge-${value}-link`)).toBeNull();
			});
		});

		it('Then the Topic Badges should be rendered without links', () => {
			props.data.tags.topics.map(value => {
				expect(screen.getByTestId(`badge-${value}`)).toBeTruthy();
				expect(screen.queryByTestId(`badge-${value}-link`)).toBeNull();
			});
		});
	});

	describe('And activeLink is true', () => {
		it('Then the Tilte should be clickable with a link', () => {
			const { rerender } = wrapper;
			rerender(<Paper {...props} activeLink={true} />);
			expect(screen.getByTestId('paper-title')).toHaveAttribute('href', `/paper/${props.data.id}`);
		});
		it('Then the Features Badge/Tag should be rendered with links', () => {
			props.data.tags.features.map(value => {
				expect(screen.getByTestId(`badge-${value}`)).toBeTruthy();
				expect(screen.getByTestId(`badge-${value}-link`)).toHaveAttribute('href', `/search?search=&tab=Papers&paperfeatures=${value}`);
			});
		});

		it('Then the Topics Badge/Tag should be rendered with links', () => {
			props.data.tags.topics.map(value => {
				expect(screen.getByTestId(`badge-${value}`)).toBeTruthy();
				expect(screen.getByTestId(`badge-${value}-link`)).toHaveAttribute('href', `/search?search=&tab=Papers&papertopics=${value}`);
			});
		});

		describe('And onSearchPage is true', () => {
			let updateOnFilterBadge = jest.fn();
			it('Then Badge Tags/Features should be rendered without links', () => {
				const { rerender } = wrapper;
				rerender(<Paper {...props} activeLink={true} onSearchPage={true} updateOnFilterBadge={updateOnFilterBadge} />);
				props.data.tags.features.map(value => {
					expect(screen.getByTestId(`badge-${value}`)).toBeTruthy();
					expect(screen.queryByTestId(`badge-${value}-link`)).toBeNull();
				});
			});
			it('Then the Features Badge/Tag updateOnFilterBadge should be called', () => {
				fireEvent.click(screen.getByTestId(`badge-${props.data.tags.features[0]}`));
				expect(updateOnFilterBadge.mock.calls.length).toBe(1);
				expect(updateOnFilterBadge.mock.calls[0][0]).toEqual('paperFeaturesSelected');
				expect(updateOnFilterBadge.mock.calls[0][1]).toEqual({ label: props.data.tags.features[0], parentKey: 'paperfeatures' });
			});

			it('Then the Topic Badge/Tag updateOnFilterBadge should be called', () => {
				const { rerender } = wrapper;
				let updateOnFilterBadgeTopic = jest.fn();
				rerender(<Paper {...props} activeLink={true} onSearchPage={true} updateOnFilterBadge={updateOnFilterBadgeTopic} />);
				fireEvent.click(screen.getByTestId(`badge-${props.data.tags.topics[0]}`));
				expect(updateOnFilterBadgeTopic.mock.calls.length).toBe(1);
				expect(updateOnFilterBadgeTopic.mock.calls[0][0]).toEqual('paperTopicsSelected');
				expect(updateOnFilterBadgeTopic.mock.calls[0][1]).toEqual({ label: props.data.tags.topics[0], parentKey: 'papertopics' });
			});
		});
	});
	describe('And showRelationshipQuestion is true', () => {
		it('Then the remove button should be rendered ', () => {
			const { rerender } = wrapper;
			rerender(<Paper {...props} showRelationshipQuestion={true} />);
			expect(screen.getByTestId('closeicon')).toBeTruthy();
		});
		it('Then onclick removeButton function should be called', () => {
			fireEvent.click(screen.getByTestId('closeicon'));
			expect(props.removeButton.mock.calls.length).toBe(1);
		});
		it('Then the description should not be rendered', () => {
			expect(screen.queryByTestId('paper-description')).toBeNull();
		});
	});
});
