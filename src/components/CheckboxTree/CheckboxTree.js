/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import ReactCheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { addCommonPropTypes } from '../../configs/propTypes';
import useCommonStyles from '../../hooks/useCommonStyles';
import Icon from '../Icon';
import * as styles from './CheckboxTree.styles';

const CheckboxTree = ({
	className,
	mt,
	mb,
	ml,
	mr,
	width,
	minWidth,
	maxWidth,
	icons,
	checkboxProps: { variant: checkboxVariant },
	...outerProps
}) => {
	const commonStyles = useCommonStyles({ mt, mb, ml, mr, width, minWidth, maxWidth });

	return (
		<div
			css={styles.root({
				variant: 'primary',
				hasLeafIcon: !!icons.leaf,
				hasParentIcon: !!icons.parentClose || !!icons.parentOpen,
				checkboxVariant,
			})}
			className={cx(className, commonStyles, 'ui-CheckboxTree')}>
			<ReactCheckboxTree icons={icons} {...outerProps} />
		</div>
	);
};

CheckboxTree.propTypes = addCommonPropTypes({
	nodes: PropTypes.array,
	icons: PropTypes.shape({
		expandClose: PropTypes.node,
		expandOpen: PropTypes.node,
		parentClose: PropTypes.node,
		parentOpen: PropTypes.node,
		leaf: PropTypes.node,
	}),
	checkboxProps: PropTypes.shape({
		variant: PropTypes.oneOf(['primary', 'secondary']).isRequired,
	}),
});

CheckboxTree.defaultProps = {
	icons: {
		expandClose: <Icon name='chevron-right' size='lg' color='purple500' />,
		expandOpen: <Icon name='chevron-bottom' size='lg' color='purple500' />,
		parentOpen: null,
		parentClose: null,
		leaf: null,
	},
	checkboxProps: {
		variant: 'primary',
	},
};

export default CheckboxTree;
