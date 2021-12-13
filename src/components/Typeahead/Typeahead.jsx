/** @jsx jsx */
import { cx } from '@emotion/css';
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { Typeahead as BootstrapTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { addCommonPropTypes, pick } from '../../configs/propTypes';
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
	...outerProps
}) => {
	return (
		<Input
			className={cx(className, 'ui-Typeahead')}
			variant={variant}
			textPrepend={textPrepend}
			iconPrepend={iconPrepend}
			textAppend={textAppend}
			iconAppend={iconAppend}
			mt={mt}
			mb={mb}
			mr={mr}
			ml={ml}
			width={width}
			maxWidth={maxWidth}
			minWidth={minWidth}>
			<BootstrapTypeahead {...outerProps} />
		</Input>
	);
};

Typeahead.propTypes = {
	...pick(PROP_TYPES_INPUT, ['className', 'selected', 'variant', 'textPrepend', 'iconPrepend', 'textAppend', 'iconAppend']),
	selected: PropTypes.array,
};

Typeahead.defaultProps = addCommonPropTypes({
	selected: [],
	variant: 'primary',
});

export default Typeahead;
