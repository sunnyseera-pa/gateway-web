import { css } from '@emotion/react';

export const root = icon => theme => {
	const { colors } = theme;

	return css`
		.location {
			float: left;
		}
		.hierarchy {
			float: right;
			color: ${colors.grey700Alt};
		}
	`;
};
