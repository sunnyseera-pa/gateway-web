import PropTypes from 'prop-types';
import { addCommonPropTypes } from '../../configs/propTypes';

export const PROP_TYPES_DROPDOWN = addCommonPropTypes({
	defaultValue: PropTypes.string,
	value: PropTypes.string,
	options: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.shape({
				label: PropTypes.node,
				value: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
			})
		),
		PropTypes.arrayOf(PropTypes.string),
	]).isRequired,
	variant: PropTypes.oneOf(['primary', 'secondary']),
	iconSelected: PropTypes.node,
	onSelect: PropTypes.func,
});
