import PropTypes from 'prop-types';
import { addCommonPropTypes } from '../../configs/propTypes';

export const PROP_TYPES_INPUT = addCommonPropTypes({
	placeholder: PropTypes.string,
	value: PropTypes.string,
	iconPrepend: PropTypes.node,
	iconAppend: PropTypes.node,
	textPrepend: PropTypes.node,
	textAppend: PropTypes.node,
	onDebounce: PropTypes.func,
	onChange: PropTypes.func,
	debounceDelay: PropTypes.number,
	inputRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
	variant: PropTypes.oneOf(['primary', 'secondary']),
	id: PropTypes.string,
});
