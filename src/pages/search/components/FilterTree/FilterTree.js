/** @jsx jsx */
import { jsx } from '@emotion/react';
import { flatMapDeep } from 'lodash';
import React from 'react';
import { Accordion } from 'react-bootstrap';
import CheckboxTree from '../../../../components/CheckboxTree';
import TreeSubHeader from '../TreeSubHeader';
import * as styles from './FilterTree.styles';

const FilterTree = ({ node, filters, checked, onCheck }) => {
	const [state, setState] = React.useState({
		checked,
		expanded: [],
	});

	const flattenObject = (filters, nodes = []) => {
		filters.forEach(filter => {
			nodes.push(filter);

			flattenObject(filter.children, nodes);
		});

		return nodes;
	};

	const handleChecked = React.useCallback(
		checked => {
			setState({
				...state,
				checked,
			});

			const nodes = flattenObject(filters).filter(filter => {
				return checked.includes(filter.value);
			});

			if (onCheck) onCheck(nodes, node.key, true);
		},
		[state, node]
	);

	return (
		<Accordion css={styles.root}>
			<Accordion.Toggle eventKey='0' css={styles.toggle}>
				<TreeSubHeader node={node} />
			</Accordion.Toggle>
			<Accordion.Collapse eventKey='0'>
				<CheckboxTree
					nodes={filters}
					checked={state.checked}
					expanded={state.expanded}
					onCheck={handleChecked}
					onExpand={expanded => setState({ ...state, expanded })}
				/>
			</Accordion.Collapse>
		</Accordion>
	);
};

export default FilterTree;
