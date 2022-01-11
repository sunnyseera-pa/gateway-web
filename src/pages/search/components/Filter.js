import React, { Fragment, useState, useEffect } from 'react';
import _ from 'lodash';
import { Accordion, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { SlideDown } from 'react-slidedown';
import { FilterCount } from './FilterCount';
import { FilterSearch } from './FilterSearch';
import SVGIcon from '../../../images/SVGIcon';
import { FilterClearSection } from './FilterClearSection';
import CheckboxTree from '../../../components/CheckboxTree';
import FilterTree from './FilterTree';
import TreeSubHeader from './TreeSubHeader';
import { flattenObject, replaceKey } from '../../../utils/GeneralHelper.util';

const Checkbox = ({ node = {}, highlighted = [], parentKey = '', onHandleInputChange }) => {
	let highlight = false;
	const onHandleChange = e => {
		onHandleInputChange(node, parentKey, e.target.checked);
	};
	if (!_.isEmpty(highlighted)) {
		highlight = highlighted.includes(node.label.toLowerCase());
	}

	return (
		<div className='checkbox'>
			<div className={`${highlight ? 'highlighted-text' : 'checkbox-text'}`}>{node.label}</div>
			<input type='checkbox' checked={node.checked} onChange={e => onHandleChange(e)} />
			<span className='checkmark'></span>
		</div>
	);
};

const TreeHeader = ({ node }) => {
	let { label, closed, beta = false } = node;
	let count = 0;

	const getParentCounts = tree => {
		if (_.isEmpty(tree)) {
			return;
		}
		tree.forEach(node => {
			if (typeof node.selectedCount !== 'undefined') {
				count += node.selectedCount;
			}
			if (typeof node.filters !== 'undefined' && !_.isEmpty(node.filters)) {
				let child = getParentCounts(node.filters);
				return child;
			}
		});
		return count;
	};

	const renderCount = () => {
		let parentCount = getParentCounts(node.filters) || node.selectedCount;
		return parentCount > 0 ? (
			<div className='node-micro__count'>
				<FilterCount count={parentCount} />
			</div>
		) : (
			''
		);
	};

	return (
		<Fragment>
			<div className='node-title'>
				<span className={closed ? '' : 'selected'}>{label}</span>
				{beta ? <div className='node-beta'>BETA</div> : ''}
			</div>
			<div className='node-micro'>
				{renderCount()}
				<SVGIcon width='12px' height='12px' className={closed ? '' : 'flip180'} name='chevronbottom' fill={'#475da7'} />
			</div>
		</Fragment>
	);
};

const TreeItem = ({ node, highlighted, parentKey, hasChildren, onHandleInputChange, onHandleToggle }) => {
	const toggleFilter = e => {
		e.preventDefault();
		onHandleToggle(node);
	};

	if (!_.isEmpty(node.key)) {
		return (
			<div className={hasChildren ? 'node-item' : 'node-header'} onClick={e => toggleFilter(e)}>
				{hasChildren ? <TreeSubHeader node={node} /> : <TreeHeader node={node} />}
			</div>
		);
	}

	return <Checkbox node={node} highlighted={highlighted} parentKey={parentKey} onHandleInputChange={onHandleInputChange} />;
};

const TreeComponent = ({ node, parentKey, hasChildren, onHandleInputChange, onHandleClearSection, onHandleToggle, children, selected }) => {
	const [searchValue, setSearchValue] = useState('');
	const [highlighted, setHighlight] = useState([]);

	const onSearchChange = value => {
		setSearchValue(value);
	};
	const onClearSection = () => {
		onHandleClearSection(node);
	};

	const getSubClass = () => {
		if (typeof node.filters !== 'undefined' && node.filters.length > 0) {
			const hasFilterGroups = [...node.filters].filter(i => i.hasOwnProperty('key')).length > 0;
			const rawFilterValues = [...node.filters].filter(i => i.hasOwnProperty('checked')).length > 0;
			if (hasChildren && hasFilterGroups) return 'node-parent-wrap';
			else if (!hasChildren && !hasFilterGroups && rawFilterValues) return 'node-checkbox-items';
			else if (hasChildren) return 'node-checkbox-wrap';
			else return 'node-checbox-single';
		}
	};

	// watch for when node changes and check highlighted
	useEffect(() => {
		// only run if node.highlighted changes
		if (typeof node.highlighted !== 'undefined') setHighlight(node.highlighted);

		if (node.closed) setSearchValue('');
	}, [node.closed, node.highlighted]);

	return (
		<Fragment>
			<TreeItem
				node={node}
				highlighted={highlighted}
				parentKey={parentKey}
				hasChildren={hasChildren}
				onHandleInputChange={onHandleInputChange}
				onHandleToggle={onHandleToggle}
			/>
			<SlideDown closed={false} className={hasChildren ? 'node-check-group' : 'node-single-group'}>
				<div className={getSubClass()}>
					{!children && typeof node.filters !== 'undefined' && node.filters.length > 0 && !node.closed && (
						<Filter
							selected={selected}
							data={node.filters}
							parentKey={node.key}
							highlighted={node.highlighted}
							hasChildren={true}
							searchValue={searchValue}
							onHandleInputChange={onHandleInputChange}
							onHandleClearSection={onHandleClearSection}
							onHandleToggle={onHandleToggle}
						/>
					)}
				</div>
			</SlideDown>
		</Fragment>
	);
};

const Filter = ({
	selected,
	data = [],
	parentKey = null,
	highlighted = [],
	hasChildren = false,
	searchValue = '',
	onHandleInputChange,
	onHandleClearSection,
	onHandleToggle,
}) => {
	let generateClassName = node => {
		let { key = '' } = node;
		let treeClass = 'node';
		if (hasChildren && !_.isEmpty(key)) return `${treeClass}-group`;
		else if (hasChildren) return `${treeClass}-subItem`;
		else return `${treeClass}-wrapper`;
	};

	console.log('Selected map', selected);

	return (
		<Fragment>
			{data &&
				data
					.filter(node => {
						if (!searchValue) return true;

						if (node.label.toUpperCase().includes(searchValue.toUpperCase())) return true;

						return false;
					})
					.map(node => {
						const selectedValues = selected ? selected.map(({ value }) => value) : [];

						return (
							<div key={node.label} className={generateClassName(node)}>
								{!!node.filtersv2 && <FilterTree node={node} checked={selectedValues} onCheck={onHandleInputChange} />}
								{!node.filtersv2 && (
									<>
										{generateClassName(node) !== 'node-subItem' ? (
											<TreeComponent
												selected={selected}
												key={node.id}
												node={node}
												parentKey={parentKey}
												highlighted={node.highlighted}
												hasChildren={hasChildren}
												onHandleInputChange={onHandleInputChange}
												onHandleClearSection={onHandleClearSection}
												onHandleToggle={onHandleToggle}
											/>
										) : (
											<Checkbox node={node} highlighted={highlighted} parentKey={parentKey} onHandleInputChange={onHandleInputChange} />
										)}
									</>
								)}
							</div>
						);
					})}
		</Fragment>
	);
};

export default Filter;
