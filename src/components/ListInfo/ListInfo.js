/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { addCommonPropTypes } from '../../configs/propTypes';
import LayoutBox from '../LayoutBox';
import * as styles from './ListInfo.styles';

const ListInfo = ({ data, className, widthCol1, mt, mb, ml, mr, width, minWidth, maxWidth }) => {
	return (
		<LayoutBox {...{ mt, mb, ml, mr, width, minWidth, maxWidth }}>
			<ul css={styles.root} className={cx('ui-ListInfo', className)}>
				{data.map(({ label, value }, i) => (
					<li css={styles.listItem} key={`${i}-${label}`}>
						<div css={styles.col1(widthCol1)}>{label}</div>
						<div>{value}</div>
					</li>
				))}
			</ul>
		</LayoutBox>
	);
};

ListInfo.propTypes = addCommonPropTypes({
	data: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.node,
			value: PropTypes.node,
		})
	).isRequired,
	widthCol1: PropTypes.string,
});

ListInfo.defaultProps = {
	widthCol1: '105px',
};

export default ListInfo;
