/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { dateFormats } from '../../../utils/GeneralHelper.util';
import * as styles from './ActionBarStatus.styles';

const ActionBarStatus = ({ status, dataset, totalQuestions, className, ...outerProps }) => {
	const {
		timestamps: { published, submitted, rejected, archived },
	} = dataset;

	let content = null;

	switch (status) {
		case 'draft':
			content = totalQuestions;

			break;
		case 'active':
			content = `This version was published on ${dateFormats(published).dateOnly}`;

			break;
		case 'inReview':
			content = `Submitted for review on ${dateFormats(submitted).dateOnly}`;

			break;
		case 'rejected':
			content = `This version was rejected on ${dateFormats(rejected).dateOnly}`;

			break;
		case 'archived':
			content = `This version was published on ${dateFormats(published).dateOnly} and archived on ${dateFormats(archived).dateOnly}`;

			break;
		default:
			break;
	}

	return (
		<div {...outerProps} className={cx('action-bar-status', className)} css={styles.root}>
			{content}
		</div>
	);
};

ActionBarStatus.propTypes = {
	dataset: PropTypes.shape({
		timestamps: PropTypes.shape({
			published: PropTypes.string,
			submitted: PropTypes.string,
			rejected: PropTypes.string,
			archived: PropTypes.string,
		}),
	}),
	totalQuestions: PropTypes.string,
	status: PropTypes.oneOf(['draft', 'active', 'inReview', 'rejected', 'archived']),
	className: PropTypes.string,
};

ActionBarStatus.defaultProps = {
	className: 'padding-md',
};

export default ActionBarStatus;
