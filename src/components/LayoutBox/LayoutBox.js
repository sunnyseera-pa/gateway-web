/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import useCommonStyles from '../../hooks/useCommonStyles';
import { PROP_TYPES_LAYOUTBOX } from './LayoutBox.propTypes';

const LayoutBox = ({
    children,
    className,
    mt,
    mb,
    ml,
    mr,
    m,
    width,
    minWidth,
    maxWidth,
    as,
    display,
    flexDirection,
    alignItems,
    justifyContent,
    background,
    p,
    pr,
    pl,
    pt,
    pb,
    ...outerProps
}) => {
    const commonStyles = useCommonStyles({
        mt,
        mb,
        ml,
        mr,
        m,
        p,
        pr,
        pl,
        pt,
        pb,
        width,
        minWidth,
        maxWidth,
        display,
        flexDirection,
        alignItems,
        justifyContent,
        background,
    });

    const Tag = as;

    return (
        <Tag className={cx('ui-LayoutBox', className, commonStyles)} {...outerProps}>
            {children}
        </Tag>
    );
};

LayoutBox.propTypes = {
    as: PropTypes.string,
    ...PROP_TYPES_LAYOUTBOX,
};

LayoutBox.defaultProps = {
    as: 'div',
};

export default LayoutBox;
