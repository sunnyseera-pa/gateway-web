/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx, css } from '@emotion/react';
import debounce from 'lodash/debounce';
import React, { useCallback, useMemo, useRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import useCommonStyles from '../../hooks/useCommonStyles';
import useDOMChanged from '../../hooks/useDOMChanged';
import { PROP_TYPES_INPUT } from './Input.propTypes';
import * as styles from './Input.styles';

const Input = ({
	iconPrepend,
	iconAppend,
	textPrepend,
	textAppend,
	onDebounce,
	onChange,
	debounceDelay,
	inputRef,
	className,
	ml,
	mr,
	mb,
	mt,
	width,
	minWidth,
	maxWidth,
	variant,
	label,
	id,
	size,
	...outerProps
}) => {
	const prependRef = useRef(null);
	const appendRef = useRef(null);

	const domPrependChanged = useDOMChanged(prependRef);
	const domAppendChanged = useDOMChanged(appendRef);
	const commonStyles = useCommonStyles({ mt, mb, ml, mr, width, width, minWidth, maxWidth });

	const handleDebounced = useCallback(debounce(onDebounce, debounceDelay), [onDebounce]);

	const handleChange = React.useCallback(e => {
		if (onChange) onChange(e);
		if (handleDebounced) handleDebounced(e);
	}, []);

	return (
		<Form.Group
			controlId={id}
			css={css`
				${styles.formGroup};
			`}>
			<Form.Label>{label}</Form.Label>
			<InputGroup
				css={styles.inputGroup({ prepend: domPrependChanged, append: domAppendChanged, variant, size })}
				className={cx('ui-Input', className, commonStyles)}>
				{(iconPrepend || textPrepend) && (
					<InputGroup.Prepend
						css={css`
							${styles.decorators};
							${styles.prepend};
						`}
						ref={prependRef}>
						{textPrepend && <InputGroup.Text>{textPrepend}</InputGroup.Text>}
						{iconPrepend}
					</InputGroup.Prepend>
				)}
				<Form.Control {...outerProps} onChange={handleChange} ref={inputRef} />
				{(iconAppend || textAppend) && (
					<InputGroup.Append
						css={css`
							${styles.decorators};
							${styles.append};
						`}
						ref={appendRef}>
						{iconAppend}
						{textAppend && <InputGroup.Text>{textAppend}</InputGroup.Text>}
					</InputGroup.Append>
				)}
			</InputGroup>
		</Form.Group>
	);
};

Input.propTypes = PROP_TYPES_INPUT;

Input.defaultProps = {
	size: 'default',
	variant: 'primary',
	debounceDelay: 300,
	onDebounce: () => {},
};

export default Input;
