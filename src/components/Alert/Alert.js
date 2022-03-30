/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';
import { ReactComponent as CloseIcon } from '../../images/close-alt.svg';
import { PROP_TYPES_LAYOUTBOX } from '../LayoutBox/LayoutBox.propTypes';

import * as styles from './Alert.styles.js';
import LayoutBox from '../LayoutBox';

const Alert = ({ variant, onClose, children, mt, mb, ml, mr, width, minWidth, maxWidth, ...outerProps }) => {
    const [show, setShow] = React.useState(true);

    const handleClose = React.useCallback(() => {
        setShow(false);

        onClose();
    }, []);

    return (
        show && (
            <LayoutBox {...{ mt, mb, ml, mr, width, minWidth, maxWidth }}>
                <div css={styles.root({ variant })} {...outerProps}>
                    <div css={styles.content}>{children}</div>
                    <Icon svg={<CloseIcon />} color='red600' fill='red600' onClick={handleClose} />
                </div>
            </LayoutBox>
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
