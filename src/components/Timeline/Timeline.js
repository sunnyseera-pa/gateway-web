/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { addCommonPropTypes } from '../../configs/propTypes';
import useCommonStyles from '../../hooks/useCommonStyles';
import * as styles from './Timeline.styles';

const Timeline = ({ data, className, mt, mb, ml, mr }) => {
	const commonStyles = useCommonStyles({ mt, mb, ml, mr });

	return (
		<ul css={styles.root} className={cx('ui-Timeline', className, commonStyles)}>
			{data.map((item, i) => (
				<li css={styles.listItem} key={`${i}-item`}>
					<div css={styles.timeline}>
						<div css={styles.icon} className='timeline-icon'>
							<div>{item.icon}</div>
						</div>
						<div css={styles.time}>
							<time data-testid={`event-time-${i}`} dateTime={item.time}>
								{item.time}
							</time>
						</div>
					</div>
					<div css={styles.content}>{item.content}</div>
				</li>
			))}
		</ul>
	);
};

Timeline.propTypes = addCommonPropTypes({
	data: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.node,
			time: PropTypes.node,
			content: PropTypes.node,
		})
	).isRequired,
});

export default Timeline;
