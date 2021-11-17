export const addCommonStyle = (prop, value) => {
	return `${prop}: ${value}`;
};

export const addCommonStyles = ({ ml, mr, mb, mt }, styles) => {
	return css`
		${addCommonStyle('margin-left', ml)};
		${addCommonStyle('margin-right', mr)};
		${addCommonStyle('margin-bottom', mb)};
		${addCommonStyle('margin-top', mt)};
		${styles}
	`;
};

export const theme = {
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
				small: 16,
				default: 20,
				large: 24,
			},
		},
	},
};
