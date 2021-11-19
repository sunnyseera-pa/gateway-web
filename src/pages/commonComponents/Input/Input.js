/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import * as styles from './Input.styles';
import useDOMChanged from '../../../hooks/useDomChanged';

const Input = ({ iconPrepend, iconAppend, textPrepend, textAppend, ...outerProps }) => {
	const prependRef = useRef(null);
	const appendRef = useRef(null);

	const domPrependChanged = useDOMChanged(prependRef);
	const domAppendChanged = useDOMChanged(appendRef);

	return (
		<InputGroup className={styles.inputGroup({ prepend: domPrependChanged, append: domAppendChanged })}>
			{(iconPrepend || textPrepend) && (
				<InputGroup.Prepend className={cx([styles.decorators, styles.prepend])} ref={prependRef}>
					{textPrepend && <InputGroup.Text>{textPrepend}</InputGroup.Text>}
					{iconPrepend}
				</InputGroup.Prepend>
			)}
			<Form.Control {...outerProps} />
			{(iconAppend || textAppend) && (
				<InputGroup.Append className={cx([styles.decorators, styles.append])} ref={appendRef}>
					{iconAppend}
					{textAppend && <InputGroup.Text>{textAppend}</InputGroup.Text>}
				</InputGroup.Append>
			)}
		</InputGroup>
	);
};

export default Input;
