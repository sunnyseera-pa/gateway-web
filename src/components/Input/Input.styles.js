import { css } from '@emotion/react';

export const inputGroup = ({ prepend, append, variant }) => theme => {
	const {
		font: {
			size: { default: defaultSize },
		},
		colors,
		components: {
			Input: { variants, height },
		},
	} = theme;

	return css`
		input.form-control,
		.rbt-input.form-control {
			${prepend.offsetWidth ? `padding-left: calc(${prepend.offsetWidth}px + 1.2em);` : ''}
			${append.offsetWidth ? `padding-right: calc(${append.offsetWidth}px + 1.2em);` : ''}
			background: ${colors[variants[variant].background]};
			border-style: solid !important;
			border-width: 2px !important;
			border-color: ${colors[variants[variant].borderColor]} !important;
			border-radius: 0.25rem !important;
			font-size: ${defaultSize};
			height: ${height};

			&:focus,
			&.focus {
				border-color: ${colors.teal} !important;
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
