/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';
import { Typeahead as BootstrapTypeahead, AsyncTypeahead as BootstrapTypeaheadAsync } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { addCommonPropTypes, pick } from '../../configs/propTypes';
import Icon from '../Icon';
import Input from '../Input';
import { PROP_TYPES_INPUT } from '../Input/Input.propTypes';

const Typeahead = ({
	className,
	selected,
	variant,
	textPrepend,
	iconPrepend,
	textAppend,
	iconAppend,
	mt,
	mr,
	mb,
	ml,
	minWidth,
	maxWidth,
	width,
	async,
	isLoading,
	...outerProps
}) => {
	const iconsAppend =
		isLoading || iconAppend ? (
			<>
				{isLoading && <div class='rbt-loader'></div>}
				{iconAppend}
			</>
		) : null;

	return (
		<Input
			className={cx(className, 'ui-Typeahead')}
			variant={variant}
			textPrepend={textPrepend}
			iconPrepend={iconPrepend}
			textAppend={textAppend}
			iconAppend={iconsAppend}
			mt={mt}
			mb={mb}
			mr={mr}
			ml={ml}
			width={width}
			maxWidth={maxWidth}
			minWidth={minWidth}>
			{!async && <BootstrapTypeahead {...outerProps} />}
			{async && <BootstrapTypeaheadAsync {...outerProps} />}
		</Input>
	);
};

Typeahead.propTypes = {
	...pick(PROP_TYPES_INPUT, ['className', 'selected', 'variant', 'textPrepend', 'iconPrepend', 'textAppend', 'iconAppend']),
	selected: PropTypes.array,
	async: PropTypes.bool,
};

Typeahead.defaultProps = addCommonPropTypes({
	selected: [],
	variant: 'primary',
	async: false,
});

export default Typeahead;
