/** @jsx jsx */
import { jsx } from '@emotion/react';
import { flatMapDeep } from 'lodash';
import React from 'react';
import { Accordion } from 'react-bootstrap';
import CheckboxTree from '../../../../components/CheckboxTree';
import TreeSubHeader from '../TreeSubHeader';
import * as styles from './FilterTree.styles';

const FilterTree = ({ node, checked, onCheck }) => {
	const [state, setState] = React.useState({
		checked,
		expanded: [],
	});

	const flattenObject = (filters, formattedNodes = []) => {
		filters.forEach(filter => {
			formattedNodes.push(filter);

			flattenObject(filter.children, formattedNodes);
		});

		return formattedNodes;
	};

	const handleChecked = React.useCallback(
		checked => {
			setState({
				...state,
				checked,
			});

			const nodes = flattenObject(formattedNodes).filter(filter => {
				filter.encodedValue = encodeURIComponent(filter.value);

				return checked.includes(filter.value);
			});

			if (onCheck) onCheck(nodes, node.key, true);
		},
		[state, formattedNodes]
	);

	const formatValues = (filters, parentValue = []) => {
		filters.forEach(filter => {
			const values = parentValue.concat([filter.value]);

			//Core search results is replacing all commas with ::, has to be encoded here as a work around
			filter.value = values.join(',');

			return formatValues(filter.children, values);
		});

		return filters;
	};

	const formattedNodes = React.useMemo(() => {
		return formatValues(node.filtersv2);
	}, [node]);

	console.log('FilterTree selected', state);

	return (
		<Accordion css={styles.root}>
			<Accordion.Toggle eventKey='0' css={styles.toggle}>
				<TreeSubHeader node={node} />
			</Accordion.Toggle>
			<Accordion.Collapse eventKey='0'>
				<CheckboxTree
					nodes={formattedNodes}
					checked={state.checked}
					expanded={state.expanded}
					onCheck={handleChecked}
					onExpand={expanded => setState({ ...state, expanded })}
					noCascade
				/>
			</Accordion.Collapse>
		</Accordion>
	);
};

export default FilterTree;
