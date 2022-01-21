/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import reduceDeep from 'deepdash-es/reduceDeep';
import CheckboxTree from '../../../../components/CheckboxTree';
import { filterBranches, findAllByKey } from '../../../../utils/GeneralHelper.util';

const FilterTree = ({ node, filters, highlighted, checked, expanded, onCheck, searchValue }) => {
	const [nodesChecked, setNodesChecked] = React.useState(checked);
	const [nodesExpanded, setNodesExpanded] = React.useState(expanded);
	const [nodeFilters, setNodeFilters] = React.useState([]);

	React.useEffect(() => {
		setNodesChecked(checked);
	}, [checked]);

	React.useEffect(() => {
		setNodeFilters(filters);
	}, [filters]);

	const flattenObject = (filters, nodes = []) => {
		filters.forEach(filter => {
			nodes.push(filter);

			flattenObject(filter.children, nodes);
		});

		return nodes;
	};

	const handleChecked = React.useCallback(
		checked => {
			setNodesChecked(checked);

			const nodes = flattenObject(filters).filter(filter => {
				return checked.includes(filter.value);
			});

			if (onCheck) onCheck(nodes, node.key, true);
		},
		[node]
	);

	React.useEffect(() => {
		const formatLabels = filters => {
			const data = [...filters];

			data.forEach((item, i) => {
				const clonedItem = { ...item };

				clonedItem.label = highlighted.includes(clonedItem.value) ? (
					clonedItem.label
				) : (
					<span className='checkbox-text'>{clonedItem.label}</span>
				);

				data[i] = clonedItem;

				formatLabels(data[i].children);
			});

			return data;
		};

		setNodeFilters(
			formatLabels(
				filterBranches(filters, (node, key, value) => {
					return key === 'value' && value.toLowerCase().includes(searchValue.toLowerCase());
				})
			)
		);
	}, [highlighted, filters, searchValue]);

	return (
		<CheckboxTree
			nodes={nodeFilters}
			checked={nodesChecked}
			expanded={nodesExpanded}
			onCheck={handleChecked}
			onExpand={setNodesExpanded}
			mt={3}
		/>
	);
};

FilterTree.defaultProps = {
	highlighted: [],
};

export default FilterTree;
