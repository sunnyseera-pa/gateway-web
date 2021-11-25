import { css } from '@emotion/react';

export const inputGroup = ({ prepend, append, variant }) => theme => {
	const {
		colors,
		components: {
			Input: { variants },
		},
	} = theme;

	return css`
		input {
			${prepend.offsetWidth ? `padding-left: calc(${prepend.offsetWidth}px + 1.2em);` : ''}
			${append.offsetWidth ? `padding-right: calc(${append.offsetWidth}px + 1.2em);` : ''}
			background: ${colors[variants[variant].background]};
			border-color: ${colors[variants[variant].borderColor]};
			border-radius: 0.25rem !important;

			&:focus {
				border-color: ${colors.green700};
			}
		}
	`;
};

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
