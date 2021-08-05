import React, { Fragment } from 'react';
import FilterChip from './FilterChip';
import { FilterCount } from './FilterCount';

const FilterSelection = ({ selectedCount, selectedItems, onHandleClearSelection, onHandleClearAll }) => {

	const clearSelection = (e) => {
		e.preventDefault();
		onHandleClearAll();
	}

	return (
		<Fragment>
			<div className='filters'>
				<div className='filters-header'>
					<div className='filters-title gray500-13'>
						Filters applied
						<div className="filters-title__count">
							<FilterCount count={selectedCount} />
						</div>
					</div>
					<div className='purple-13 filters-title__clear' onClick={e => clearSelection(e)}>
						Clear all
					</div>
				</div>
				<div className='filters-body'>
					{selectedItems.length > 0 &&
						selectedItems.map(selectedItem => <FilterChip key={selectedItem.id} filterItem={selectedItem} onHandleClearSelection={onHandleClearSelection} />)
					}
				</div>
			</div>
		</Fragment>
	);
};

export default FilterSelection;
