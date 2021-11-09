/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as styles from './Timeline.styles';

const Timeline = ({ data }) => {
	return (
		<ul css={styles.root}>
			{data.map(item => (
				<li css={styles.listItem}>
					<div css={styles.timeline}>
						<div css={styles.icon} className='timeline-icon'>
							<div>{item.icon}</div>
						</div>
						<div css={styles.time}>
							<time datetime={item.time}>{item.time}</time>
						</div>
					</div>
					<div css={styles.content}>{item.content}</div>
				</li>
			))}
		</ul>
	);
};

export default Timeline;
