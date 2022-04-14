/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import LayoutBox from '../LayoutBox';
import { PROP_TYPES_LAYOUTBOX } from '../LayoutBox/LayoutBox.propTypes';
import * as styles from './Button.styles';

const Button = ({ variant, children, size, mt, mb, ml, mr, width, minWidth, maxWidth, ...outerProps }) => {
    return (
        <LayoutBox {...{ mt, mb, ml, mr, width, minWidth, maxWidth }} as='button' css={styles.root({ variant, size })} {...outerProps}>
            {children}
        </LayoutBox>
    );
};

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
    size: PropTypes.oneOf(['small', 'default', 'large']),
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    disabled: PropTypes.bool,
    ...PROP_TYPES_LAYOUTBOX,
};

Button.defaultProps = {
    size: 'default',
    variant: 'primary',
    type: 'input',
    disabled: false,
};

export default Button;
