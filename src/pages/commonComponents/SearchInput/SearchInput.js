import PropTypes from 'prop-types';
import React from 'react';
import { omit } from '../../../configs/propTypes';
import Icon from '../Icon';
import Input from '../Input';
import { PROP_TYPES_INPUT } from '../Input/Input.propTypes';

const SearchInput = ({ value, onReset, ...outerProps }) => {
	const inputRef = React.useRef(null);

	const handleReset = React.useCallback(
		e => {
			if (onReset) onReset(inputRef.current, e);
		},
		[inputRef.current]
	);

	return (
		<Input
			inputRef={inputRef}
			iconPrepend={<Icon name='search' size='lg' />}
			iconAppend={!!value && <Icon name='clear' onClick={handleReset} size='lg' role='button' />}
			value={value}
			{...outerProps}
		/>
	);
};

SearchInput.propTypes = {
	...omit(PROP_TYPES_INPUT, ['inputRef']),
	onReset: PropTypes.func,
};

SearchInput.defaultProps = {
	className: 'ui-SearchInput',
};

export default SearchInput;
