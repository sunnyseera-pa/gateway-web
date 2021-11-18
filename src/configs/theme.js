export const getSize = (value, { base: { increment, unit } }) => {
	return `${value * increment}${unit}`;
};

export const getSpacingStyle = (prop, value, theme) => {
	return typeof value === 'number' ? `${prop}${getSize(value, theme)};` : '';
};

export const getCommonStyle = (prop, value) => {
	return `${prop}: ${value}`;
};

export const getCommonStyles = ({ ml, mr, mb, mt }, theme) => {
	return `
		${getSpacingStyle('margin-left', ml, theme)};
		${getSpacingStyle('margin-right', mr, theme)};
		${getSpacingStyle('margin-bottom', mb, theme)};
		${getSpacingStyle('margin-top', mt, theme)};
	`;
};

export const theme = {
	base: {
		increment: 4,
		unit: 'px',
	},
	colors: {
		green600: 'blah',
		grey: '#F6F7F8',
		grey700: '#53575A',
		grey700Alt: '#848E97',
		grey800: '#3C3C3B',
	},
	components: {
		Icon: {
			sizes: {
				'x-small': '0.64rem',
				small: '0.8rem',
				default: '1rem',
				large: '1.25rem',
				'x-large': '1.563rem',
				'xx-large': '1.953rem',
				'xxx-large': '2.441rem',
			},
		},
	},
};
