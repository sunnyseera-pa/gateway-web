/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as styles from './BlockQuote.styles';

const BlockQuote = ({ children }) => {
	return <blockquote css={styles.root}>{children}</blockquote>;
};

export default BlockQuote;
