/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import useCommonStyles from '../../hooks/useCommonStyles';
import { PROP_TYPES_LAYOUTBOX } from './LayoutBox.propTypes';

const LayoutBox = ({ children, className, mt, mb, ml, mr, width, minWidth, maxWidth, as }) => {
    const commonStyles = useCommonStyles({ mt, mb, ml, mr, width, minWidth, maxWidth });

    const Tag = as;

    return <Tag className={cx('ui-LayoutBox', className, commonStyles)}>{children}</Tag>;
};

LayoutBox.propTypes = {
    as: PropTypes.string,
    ...PROP_TYPES_LAYOUTBOX,
};

LayoutBox.defaultProps = {
    as: 'div',
};

export default LayoutBox;
