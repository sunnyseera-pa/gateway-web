/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import * as styles from './Timeline.styles';

const Timeline = ({ data, className }) => {
	return (
		<ul css={styles.root} className={className}>
			{data.map((item, i) => (
				<li css={styles.listItem} key={`${i}-item`}>
					<div css={styles.timeline}>
						<div css={styles.icon} className='timeline-icon'>
							<div>{item.icon}</div>
						</div>
						<div css={styles.time}>
							<time dateTime={item.time}>{item.time}</time>
						</div>
					</div>
					<div css={styles.content}>{item.content}</div>
				</li>
			))}
		</ul>
	);
};

Timeline.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
			time: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
			content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
		})
	).isRequired,
};

export default Timeline;
