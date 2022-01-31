/** @jsx jsx */
import { cx } from '@emotion/css';
import { css, jsx } from '@emotion/react';
import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { addCommonPropTypes } from '../../configs/propTypes';
import useCommonStyles from '../../hooks/useCommonStyles';
import * as styles from './Textarea.styles';
import TextareaAutosize from 'react-textarea-autosize';

const Textarea = ({
	className,
	autosize,
	label,
	charCountLength,
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
	...outerProps
}) => {
	const commonStyles = useCommonStyles({ mt, mb, ml, mr, width, width, minWidth, maxWidth });

	return (
		<Form.Group controlId={id} css={styles.formGroup}>
			<Form.Label css={styles.label}>
				{label}
				{!!charCountLength && (
					<span css={styles.charCount}>
						{' '}
						({value ? value.length : 0}/{charCountLength})
					</span>
				)}
			</Form.Label>

			<InputGroup css={styles.inputGroup({ variant })} className={cx('ui-Textarea', className, commonStyles)}>
				{autosize && <TextareaAutosize type='text' value={value} {...outerProps} ref={inputRef} />}
				{!autosize && <Form.Control as='textarea' {...outerProps} ref={inputRef} />}
			</InputGroup>
		</Form.Group>
	);
};

Textarea.defaultProps = {
	autosize: false,
	variant: 'primary',
};

Textarea.propTypes = addCommonPropTypes({
	label: PropTypes.node,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	maxlength: PropTypes.number,
	charCountLength: PropTypes.number,
	onChange: PropTypes.func,
	inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	variant: PropTypes.oneOf(['primary', 'secondary']),
	id: PropTypes.string,
	name: PropTypes.string,
	autosize: PropTypes.bool,
});

export default Textarea;
