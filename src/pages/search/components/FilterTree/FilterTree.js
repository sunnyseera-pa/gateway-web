/** @jsx jsx */
import { jsx } from '@emotion/react';
import { flatMapDeep } from 'lodash';
import React from 'react';
import { Accordion } from 'react-bootstrap';
import CheckboxTree from '../../../../components/CheckboxTree';
import Input from '../../../../components/Input';
import SearchInput from '../../../../components/SearchInput';
import { replaceKey } from '../../../../utils/GeneralHelper.util';
import TreeSubHeader from '../TreeSubHeader';
import * as styles from './FilterTree.styles';

const FilterTree = ({ node, filters, highlighted, checked, expanded, onCheck }) => {
	const [nodesChecked, setNodesChecked] = React.useState(checked);
	const [nodesExpanded, setNodesExpanded] = React.useState(expanded);

	console.log('highlighted', highlighted);

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

	const formattedFilters = filters => {
		return replaceKey(filters, filter => {
			filter.label = <span className={!highlighted.includes(filter.value) && 'checkbox-text'}>{filter.label}</span>;

			return filter.children;
		});
	};

	console.log('formattedFilters', formattedFilters);

	return (
		<Accordion css={styles.root}>
			<Accordion.Toggle eventKey='0' css={styles.toggle}>
				<TreeSubHeader node={node} />
			</Accordion.Toggle>
			<Accordion.Collapse eventKey='0'>
				<>
					<SearchInput variant='secondary' size='small' />
					<CheckboxTree
						nodes={formattedFilters(filters)}
						checked={nodesChecked}
						expanded={nodesExpanded}
						onCheck={handleChecked}
						onExpand={setNodesExpanded}
					/>
				</>
			</Accordion.Collapse>
		</Accordion>
	);
};

FilterTree.defaultProps = {
	highlighted: [],
};

export default FilterTree;
