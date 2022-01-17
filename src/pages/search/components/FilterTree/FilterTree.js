/** @jsx jsx */
import { jsx } from '@emotion/react';
import { flatMapDeep } from 'lodash';
import React from 'react';
import { Accordion } from 'react-bootstrap';
import CheckboxTree from '../../../../components/CheckboxTree';
import TreeSubHeader from '../TreeSubHeader';
import * as styles from './FilterTree.styles';

const FilterTree = ({ node, filters, checked, expanded, onCheck }) => {
	const [nodesChecked, setNodesChecked] = React.useState(checked);
	const [nodesExpanded, setNodesExpanded] = React.useState(expanded);

	React.useEffect(() => {
		setNodesChecked(checked);
	}, [checked]);

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
	return (
		<Accordion css={styles.root}>
			<Accordion.Toggle eventKey='0' css={styles.toggle}>
				<TreeSubHeader node={node} />
			</Accordion.Toggle>
			<Accordion.Collapse eventKey='0'>
				<CheckboxTree nodes={filters} checked={nodesChecked} expanded={nodesExpanded} onCheck={handleChecked} onExpand={setNodesExpanded} />
			</Accordion.Collapse>
		</Accordion>
	);
};

export default FilterTree;
