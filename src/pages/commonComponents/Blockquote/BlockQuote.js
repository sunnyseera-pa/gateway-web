/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import * as styles from './BlockQuote.styles';

const BlockQuote = ({ children }) => {
	return <blockquote css={styles.root}>{children}</blockquote>;
};

BlockQuote.propTypes = {
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default BlockQuote;
