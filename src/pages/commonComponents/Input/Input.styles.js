import { css } from '@emotion/css';

export const inputGroup = ({ prepend, append }) => css`
	input {
		${prepend.offsetWidth ? `padding-left: calc(${prepend.offsetWidth}px + 1.2em);` : ''}
		${append.offsetWidth ? `padding-right: calc(${append.offsetWidth}px + 1.2em);` : ''}
	}
`;

export const prepend = css`
	left: 1em;
`;

export const append = css`
	right: 1em;
`;

export const decorators = css`
	position: absolute;
	z-index: 4;
	top: 50%;
	transform: translateY(-50%);
	display: inline-flex;
	align-items: center;
`;
