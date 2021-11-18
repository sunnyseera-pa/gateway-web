import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon';

const SortDropdown = ({ handleSort, defaultValue, value, options, iconSelected }) => {
	const { t } = useTranslation();
	const currentValue = !!value ? defaultValue : value;

	return (
		<Dropdown className='ui-SortDropdown' alignRight onSelect={handleSort}>
			<Dropdown.Toggle variant='info'>
				{/* {(() => {
					if (sorting === 'popularity') return 'Sort by number of views';
					else if (sorting === 'metadata') return 'Sort by metadata quality';
					else if (sorting === 'resources') return 'Sort by related resources';
					else if (sorting === 'latest') return 'Sort by latest';
					else if (sorting === 'recentlyadded') return 'Sort by recently added';
					else if (sorting === 'sortbyyear') return 'Sort by year';
					else return 'Sort by match to search terms';
				})()} */}
				{t(`sort.label.${currentValue}`)}
			</Dropdown.Toggle>
			<Dropdown.Menu>
				{options.map(item => {
					return (
						<Dropdown.Item eventKey={item} className='gray800-14'>
							{t(`sort.option.${item}`)}
							{/* {(() => {
								if (item === 'popularity') return 'Number of views (highest to lowest)';
								else if (item === 'metadata') return 'Metadata quality (platinum to bronze)';
								else if (item === 'resources') return 'Related resources (most first)';
								else if (item === 'latest') return 'Latest (recently updated first)';
								else if (item === 'recentlyadded') return 'Recently added to collection (newest first)';
								else if (item === 'relevance') return 'Match to search terms (closest first)';
								else if (item === 'sortbyyear') return 'Sort by year (latest first)';
							})()} */}
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
