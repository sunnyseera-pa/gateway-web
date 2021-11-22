import PropTypes from 'prop-types';
import _ from 'lodash';

export const COMMON_PROP_TYPES = {
	ml: PropTypes.number,
	mr: PropTypes.number,
	mb: PropTypes.number,
	mt: PropTypes.number,
	className: PropTypes.string,
};

export const omit = (propTypes, exclude) => {
	return _.omit(propTypes, exclude);
};

export const addCommonPropTypes = propTypes => {
	return {
		...propTypes,
		...COMMON_PROP_TYPES,
	};
};
