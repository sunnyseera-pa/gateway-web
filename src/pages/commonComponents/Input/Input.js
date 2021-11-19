/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Form, InputGroup } from 'react-bootstrap';

const Input = ({ iconPrepend, iconAppend, textPrepend, textAppend, ...outerProps }) => (
	<InputGroup>
		{(iconPrepend || textPrepend) && (
			<InputGroup.Prepend>
				{textPrepend && <InputGroup.Text>{textPrepend}</InputGroup.Text>}
				{iconPrepend}
			</InputGroup.Prepend>
		)}
		<Form.Control {...outerProps} />
		{(iconAppend || textAppend) && (
			<InputGroup.Append>
				{iconAppend}
				{textAppend && <InputGroup.Text>{textAppend}</InputGroup.Text>}
			</InputGroup.Append>
		)}
	</InputGroup>
);

export default Input;
