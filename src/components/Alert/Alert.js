import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import { ReactElement as CloseIcon } from '../../images/close.svg';
import { PROP_TYPES_LAYOUTBOX } from '../LayoutBox/LayoutBox.propTypes';

const Alert = ({ variant, onClose, children, ...outerProps }) => {
    const [show, setShow] = React.useState(true);

    return (
        show && (
            <div show={show} variant={variant} {...outerProps}>
                <Icon svg={<CloseIcon />} color='red' />
                {children}
            </div>
        )
    );
};

Alert.propTypes = {
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'info', 'danger']).isRequired,
    ...PROP_TYPES_LAYOUTBOX,
};

Alert.defaultProps = {
    className: 'ui-Alert',
    onClose: () => {},
};

export default Alert;
