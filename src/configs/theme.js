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
