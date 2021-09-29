/** @jsx jsx */
import { jsx } from '@emotion/react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { DISPLAY_DATE_STANDARD } from '../../../configs/constants';
import * as styles from './ActionBarStatus.styles';

const formatDate = (date) => {
    return moment(date).format(DISPLAY_DATE_STANDARD);
};

const ActionBarStatus = ({ status, dataset, totalQuestions, ...outerProps }) => {
    const {
        timestamps: { published, submitted, rejected, archived },
    } = dataset;

    let content = null;

    switch (status) {
        case 'draft':
            content = totalQuestions;

            break;
        case 'active':
            content = `This version was published on ${formatDate(published)}`;

            break;
        case 'inReview':
            content = `Submitted for review on ${formatDate(submitted)}`;

            break;
        case 'rejected':
            content = `This version was rejected on ${formatDate(rejected)}`;

            break;
        case 'archived':
            content = `This version was published on ${formatDate(
                published
            )} and archived on ${formatDate(archived)}`;

            break;
        default:
            break;
    }

    return (
        <div {...outerProps} css={styles.root}>
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
    totalQuestions: PropTypes.number,
    status: PropTypes.oneOf(['draft', 'active', 'inReview', 'rejected', 'archived']),
    className: PropTypes.string,
};

ActionBarStatus.defaultProps = {
    className: 'padding-md',
};

export default ActionBarStatus;
