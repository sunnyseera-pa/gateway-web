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
    xxs: '8px',
    xs: '10px',
    sm: '12px',
    md: '13px',
    default: '13px',
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
        size: THEME_FONT_SIZES,
    },
    colors: {
        white: '#fff',
        transparent: 'transparent',
        inherit: 'inherit',
        purple500: '#475DA7',
        platinum50: '#E3F4FB',
        platinum700: '#4682B4',
        green50: '#E2F3F0',
        green400: '#3DB28C',
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
        red50: '#FFECF1',
        red600: '#EF3F4B',
        red700: '#DC3645',
        purple: '#475da7',
        teal: '#3db28c',
        yellow700: '#F0BB24',
        yellow50: '#FDFCE6',
    },
    components: {
        Alert: {
            variants: {
                success: {
                    background: 'green50',
                    color: 'green400',
                    borderColor: 'green400',
                },
                info: {
                    background: 'platinum50',
                    color: 'platinum700',
                    borderColor: 'platinum700',
                },
                warning: {
                    background: 'yellow50',
                    color: 'yellow700',
                    borderColor: 'yellow700',
                },
                danger: {
                    background: 'red50',
                    color: 'red700',
                    borderColor: 'red700',
                },
            },
        },
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
        Icon: {
            sizes: THEME_FONT_SIZES,
        },
        Input: THEME_INPUT,
        Dropdown: THEME_INPUT,
        Textarea: THEME_INPUT,
        Typeahead: THEME_INPUT,
        Typography: {
            variants: {
                h1: {
                    fontSize: THEME_FONT_SIZES['5xl'],
                },
                h2: {
                    fontSize: THEME_FONT_SIZES['4xl'],
                },
                h3: {
                    fontSize: THEME_FONT_SIZES['3xl'],
                },
                h4: {
                    fontSize: THEME_FONT_SIZES['2xl'],
                },
                h5: {
                    fontSize: THEME_FONT_SIZES.xl,
                },
                h6: {
                    fontSize: THEME_FONT_SIZES.lg,
                },
                body: {
                    fontSize: THEME_FONT_SIZES.md,
                    lineHeight: '20px',
                },
                caption: {
                    fontSize: THEME_FONT_SIZES.sm,
                    lineHeight: '16px',
                },
                tiny: {
                    fontSize: THEME_FONT_SIZES.xs,
                    lineHeight: '14px',
                },
            },
        },
    },
};
