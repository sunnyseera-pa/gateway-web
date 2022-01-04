/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { addCommonPropTypes } from '../../configs/propTypes';
import useCommonStyles from '../../hooks/useCommonStyles';
import * as styles from './Checkbox.styles';

const Checkbox = ({ className, mt, mb, ml, mr, width, minWidth, maxWidth, variant, label: textLabel, id, ...outerProps }) => {
	const commonStyles = useCommonStyles({ mt, mb, ml, mr, width, minWidth, maxWidth });

	return (
		<label htmlFor={id} css={styles.root({ variant })} className={cx('ui-Checkbox', className, commonStyles)}>
			<input type='checkbox' id={id} {...outerProps} />
			<span className='ui-Checkbox__label'>{textLabel}</span>
		</label>
	);
};

export const PROP_TYPES_INPUT = addCommonPropTypes({
	label: PropTypes.node,
	onChange: PropTypes.func,
	variant: PropTypes.oneOf(['primary', 'secondary']),
});

Checkbox.defaultProps = {
	variant: 'primary',
};

export default Checkbox;
