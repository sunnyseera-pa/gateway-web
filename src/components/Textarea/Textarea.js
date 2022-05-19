/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { Form, InputGroup } from 'react-bootstrap';
import TextareaAutosize from 'react-textarea-autosize';
import { addCommonPropTypes } from '../../configs/propTypes';
import LayoutBox from '../LayoutBox';
import { mixins } from '../Input/Input.styles';
import { PROP_TYPES_LAYOUTBOX } from '../LayoutBox/LayoutBox.propTypes';
import * as styles from './Textarea.styles';

const Textarea = ({
    className,
    autosize,
    label,
    maxCharCount,
    charCountDescription,
    variant,
    value,
    mt,
    mb,
    ml,
    mr,
    width,
    minWidth,
    maxWidth,
    inputRef,
    id,
    rows,
    error,
    disabled,
    ...outerProps
}) => {
    return (
        <LayoutBox {...{ mt, mb, ml, mr, width, minWidth, maxWidth }}>
            <Form.Group controlId={id} className={cx('ui-Textarea', className)} css={styles.formGroup}>
                <Form.Label css={mixins.label({ component: 'Textarea', disabled })}>{label}</Form.Label>
                <InputGroup css={styles.inputGroup({ variant, rows, error })}>
                    {!!maxCharCount && (
                        <div className='ui-TextArea__charCount' css={styles.charCount}>
                            {value.length} {charCountDescription}
                            <span css={styles.charCountValue}>
                                {' '}
                                ({value.length}/{maxCharCount})
                            </span>
                        </div>
                    )}
                    {autosize && <TextareaAutosize type='text' value={value} {...outerProps} ref={inputRef} disabled={disabled} />}
                    {!autosize && <Form.Control as='textarea' {...outerProps} ref={inputRef} disabled={disabled} />}
                </InputGroup>
                {error && <div className='errorMessages'>{error}</div>}
            </Form.Group>
        </LayoutBox>
    );
};

Textarea.defaultProps = {
    autosize: false,
    variant: 'primary',
    charCountDescription: 'character limit',
    value: '',
    rows: 5,
    disabled: false,
    ...PROP_TYPES_LAYOUTBOX,
};

Textarea.propTypes = addCommonPropTypes({
    label: PropTypes.node,
    error: PropTypes.node,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    maxlength: PropTypes.number,
    maxCharCount: PropTypes.number,
    charCountDescription: PropTypes.node,
    onChange: PropTypes.func,
    inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    variant: PropTypes.oneOf(['primary', 'secondary']),
    id: PropTypes.string,
    name: PropTypes.string,
    autosize: PropTypes.bool,
    rows: PropTypes.number,
    disabled: PropTypes.bool,
});

export default Textarea;
