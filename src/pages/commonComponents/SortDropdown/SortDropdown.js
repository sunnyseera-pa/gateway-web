import React from 'react';
import { Dropdown } from 'react-bootstrap';
import Icon from '../../../components/Icon';

const SortDropdown = ({ handleSort, defaultValue, value, options, iconSelected }) => {
	const currentValue = !value ? defaultValue : value;

	return (
		<Dropdown className='ui-SortDropdown' alignRight onSelect={handleSort}>
			<Dropdown.Toggle variant='info'>
				{(() => {
					if (currentValue === 'popularity') return 'Sort by number of views';
					else if (currentValue === 'metadata' || currentValue === 'metadataQuality') return 'Sort by metadata quality';
					else if (currentValue === 'resources') return 'Sort by related resources';
					else if (currentValue === 'latest' || currentValue === 'recentActivity') return 'Sort by latest';
					else if (currentValue === 'recentlyadded' || currentValue === 'recentlyPublished') return 'Sort by recently added';
					else if (currentValue === 'sortbyyear') return 'Sort by year';
					else return 'Sort by match to search terms';
				})()}
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{options.map(item => {
					return (
						<Dropdown.Item eventKey={item} className='gray800-14'>
							{(() => {
								if (item === 'popularity') return 'Number of views (highest to lowest)';
								else if (item === 'metadata' || item === 'metadataQuality') return 'Metadata quality (platinum to bronze)';
								else if (item === 'resources') return 'Related resources (most first)';
								else if (item === 'latest' || item === 'recentActivity') return 'Latest (recently updated first)';
								else if (item === 'recentlyadded' || item === 'recentlyPublished') return 'Recently added to collection (newest first)';
								else if (item === 'relevance') return 'Match to search terms (closest first)';
								else if (item === 'sortbyyear') return 'Sort by year (latest first)';
							})()}
							{item === currentValue && iconSelected}
						</Dropdown.Item>
					);
				})}
			</Dropdown.Menu>
		</Dropdown>
	);
};

SortDropdown.defaultProps = {
	options: [],
	defaultValue: 'relevance',
	iconSelected: <Icon name='check' color='green600' ml={1} />,
};

export default SortDropdown;
