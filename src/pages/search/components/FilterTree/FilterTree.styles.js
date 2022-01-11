import { css } from '@emotion/react';

export const root = css`
	* {
		font-size: 13px;
	}
`;

export const toggle = css`
	background: none;
	border: none;
	outline: 0;
	padding: 0;

	&:focus {
		outline: 0;
	}
`;
