import isNil from 'lodash/isNil';

export const getSize = (value, { base: { increment, unit } }) => {
	return `${value * increment}${unit}`;
};

export const getSpacingStyle = (prop, value, theme) => {
	return typeof value === 'number' ? `${prop}: ${getSize(value, theme)};` : '';
};

export const getCommonStyle = (prop, value) => {
	return !isNil(value) ? `${prop}: ${value};` : '';
};

export const getCommonStyles = ({ ml, mr, mb, mt, width, maxWidth, minWidth }, theme) => {
	return `
		${getSpacingStyle('margin-left', ml, theme)}
		${getSpacingStyle('margin-right', mr, theme)}
		${getSpacingStyle('margin-bottom', mb, theme)}
		${getSpacingStyle('margin-top', mt, theme)}
		${getCommonStyle('width', width)}
		${getCommonStyle('max-width', maxWidth)}
		${getCommonStyle('min-width', minWidth)}
	`;
};

export const THEME_INPUT = {
	sizes: {
		small: {
			height: '30px',
		},
		default: {
			height: '40px',
		},
		large: {
			height: '50px',
		},
	},
	variants: {
		primary: {
			background: 'white',
			borderColor: 'grey200',
		},
		secondary: {
			background: 'grey100',
			borderColor: 'grey100',
		},
	},
};

export const THEME_FONT_SIZES = {
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
};

export const theme = {
	base: {
		increment: 4,
		unit: 'px',
	},
	font: {
		size: {
			default: '14px',
		},
	},
	colors: {
		white: '#fff',
		transparent: 'transparent',
		inherit: 'inherit',
		purple500: '#475DA7',
		green600: '#329276',
		green700: '#2c8267',
		grey: '#F6F7F8',
		grey100: '#F6F7F8',
		grey200: '#EEE',
		grey300: '#E2E2E2',
		grey400: '#D0D3D4',
		grey700: '#53575A',
		grey700Alt: '#848E97',
		grey800: '#3C3C3B',
		red600: '#EF3F4B',
		purple: '#475da7',
		teal: '#3db28c',
	},
	components: {
		Icon: {
			sizes: THEME_FONT_SIZES,
		},
		Input: THEME_INPUT,
		Dropdown: THEME_INPUT,
		Textarea: THEME_INPUT,
		Checkbox: {
			height: '20px',
			width: '20px',
			variants: {
				primary: {
					borderColor: 'grey200',
					backgroundDisabled: 'grey100',
					checkedBackground: 'green700',
					hoverBackground: 'grey200',
				},
				secondary: {
					borderColor: 'grey200',
					backgroundDisabled: 'grey100',
					checkedBackground: 'grey700',
					hoverBackground: 'grey200',
				},
			},
		},
		Typeahead: THEME_INPUT,
	},
};
