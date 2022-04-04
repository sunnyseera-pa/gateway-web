/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { addCommonPropTypes } from '../../configs/propTypes';
import useCommonStyles from '../../hooks/useCommonStyles';

const LayoutBox = ({ children, mt, mb, ml, mr, width, minWidth, maxWidth, as }) => {
    const commonStyles = useCommonStyles({ mt, mb, ml, mr, width, minWidth, maxWidth });

    const Tag = as;

    return <Tag className={cx('ui-LayoutBox', commonStyles)}>{children}</Tag>;
};

LayoutBox.propTypes = addCommonPropTypes({
    as: PropTypes.oneOf(['div', 'span', 'p']),
});

LayoutBox.defaultProps = {
    as: 'div',
};

export default LayoutBox;
