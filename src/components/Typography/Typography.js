/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import LayoutBox from '../LayoutBox';
import { PROP_TYPES_LAYOUTBOX } from '../LayoutBox/LayoutBox.propTypes';
import * as styles from './Typography.styles';

const Typography = ({ children, className, mt, mb, ml, mr, width, minWidth, maxWidth, variant }) => {
    let tagName = variant;

    if (variant === 'body') {
        tagName = 'p';
    } else if (variant === 'caption' || variant === 'tiny') {
        tagName = 'span';
    }

    return (
        <LayoutBox
            {...{ mt, mb, ml, mr, width, minWidth, maxWidth }}
            as={tagName}
            className={cx('ui-Typography', className)}
            css={styles.root({ variant })}>
            {children}
        </LayoutBox>
    );
};

Typography.propTypes = {
    children: PropTypes.node,
    ...PROP_TYPES_LAYOUTBOX,
};

Typography.defaultProps = {
    children: null,
};

export default Typography;
