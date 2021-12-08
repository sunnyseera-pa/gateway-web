import { css } from '@emotion/react';

export const root = icon => theme => {
	const { colors } = theme;

	return css`
		${icon ? ` padding: 5px 0 0 25px;` : `padding: 5px 0 0 0;`}
		.location {
			float: left;
		}
		.hierarchy {
			float: right;
			color: ${colors.grey700Alt};
		}
		.icons {
			align-items: center;
			display: flex;
			bottom: 0;
			justify-content: center;
			pointer-events: none;
			position: absolute;
			right: 0;
			top: 0;
			width: 34px;
			left: -95%;
			width: auto;
		}
	`;
};
