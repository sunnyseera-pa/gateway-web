/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import LayoutBox from '../LayoutBox';
import { addCommonPropTypes } from '../../configs/propTypes';
import * as styles from './BlockQuote.styles';

const BlockQuote = ({ children, className, mt, mb, ml, mr, width, minWidth, maxWidth }) => {
	return (
		<LayoutBox {...{ mt, mb, ml, mr, width, minWidth, maxWidth }}>
			<blockquote css={styles.root} className={cx('ui-Blockquote', className)}>
				{children}
			</blockquote>
		</LayoutBox>
	);
};

BlockQuote.propTypes = addCommonPropTypes({
	children: PropTypes.node,
});

export default BlockQuote;
