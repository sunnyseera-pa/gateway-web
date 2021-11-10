/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as styles from './ListInfo.styles';

const ListInfo = ({ data, widthCol1 }) => {
	return (
		<ul css={styles.root}>
			{data.map(({ label, value }) => (
				<li css={styles.listItem}>
					<div css={styles.col1(widthCol1)}>{label}</div>
					<div>{value}</div>
				</li>
			))}
		</ul>
	);
};

ListInfo.defaultProps = {
	widthCol1: '105px',
};

export default ListInfo;
