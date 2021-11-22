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
		green600: '#329276',
		grey: '#F6F7F8',
		grey700: '#53575A',
		grey700Alt: '#848E97',
		grey800: '#3C3C3B',
	},
	components: {
		Icon: {
			sizes: {
				xxs: '10px',
				xs: '12px',
				sm: '13px',
				md: '14px',
				default: '14px',
				lg: '16px',
				xl: '20px',
				'2xl': '24px',
				'3xl': '28px',
				'4xl': '32px',
				'5xl': '40px',
			},
		},
	},
};
