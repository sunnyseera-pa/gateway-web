/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import debounce from 'lodash/debounce';
import React, { useRef } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import useCommonStyles from '../../../hooks/useCommonStyles';
import useDOMChanged from '../../../hooks/useDomChanged';
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
	...outerProps
}) => {
	const prependRef = useRef(null);
	const appendRef = useRef(null);

	const domPrependChanged = useDOMChanged(prependRef);
	const domAppendChanged = useDOMChanged(appendRef);
	const commonStyles = useCommonStyles({ mt, mb, ml, mr });

	const handleChange = React.useCallback(e => {
		onChange(e);

		if (onDebounce) {
			debounce(() => {
				onDebounce(e);
			}, debounceDelay);
		}
	}, []);

	return (
		<InputGroup
			css={styles.inputGroup({ prepend: domPrependChanged, append: domAppendChanged })}
			className={cx('ui-Input', className, commonStyles)}>
			{(iconPrepend || textPrepend) && (
				<InputGroup.Prepend className={cx([styles.decorators, styles.prepend])} ref={prependRef}>
					{textPrepend && <InputGroup.Text>{textPrepend}</InputGroup.Text>}
					{iconPrepend}
				</InputGroup.Prepend>
			)}
			<Form.Control {...outerProps} onChange={handleChange} ref={inputRef} />
			{(iconAppend || textAppend) && (
				<InputGroup.Append className={cx([styles.decorators, styles.append])} ref={appendRef}>
					{iconAppend}
					{textAppend && <InputGroup.Text>{textAppend}</InputGroup.Text>}
				</InputGroup.Append>
			)}
		</InputGroup>
	);
};

Input.propTypes = PROP_TYPES_INPUT;

export default Input;
