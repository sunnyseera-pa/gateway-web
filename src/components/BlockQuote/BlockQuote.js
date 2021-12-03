/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { addCommonPropTypes } from '../../configs/propTypes';
import useCommonStyles from '../../hooks/useCommonStyles';
import * as styles from './BlockQuote.styles';

const BlockQuote = ({ children, className, mt, mb, ml, mr }) => {
	const commonStyles = useCommonStyles({ mt, mb, ml, mr });

	return (
		<blockquote css={styles.root} className={cx('ui-Blockquote', className, commonStyles)}>
			{children}
		</blockquote>
	);
};

BlockQuote.propTypes = addCommonPropTypes({
	children: PropTypes.node,
});

export default BlockQuote;
