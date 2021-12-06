import { css } from '@emotion/react';

export const location = css`
	float: left;
`;
export const hierarchy = css`
	float: right;
	color: grey;
`;

export const icons = css`
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
`;

export const cursor = show => css`
	${show ? ` padding: 5px 0 0 25px;` : `padding: 5px 0 0 0;`}
`;
