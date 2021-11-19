import React from 'react';
import Input from '../Input';
import Icon from '../Icon';

const SearchInput = ({ value, onReset, ...outerProps }) => (
	<Input
		iconPrepend={<Icon name='search' size='lg' />}
		iconAppend={!!value && <Icon name='clear' onClick={onReset} size='lg' role='button' />}
		value={value}
		{...outerProps}
	/>
);

export default SearchInput;
