import { css } from '@emotion/react';
import { mixins } from '../Input/Input.styles';

export const inputGroup = ({ variant, rows }) => theme => {
	const {
		colors,
		components: {
			Textarea: { variants },
		},
	} = theme;

	return css`
		width: 100%;

		textarea {
			${mixins.input({ variant })({ colors, variants })}
			width: 100%;
			height: ${rows}em;
		}
	`;
};

export const formGroup = css`
	display: flex;
	flex-direction: column;
`;

export const charCount = ({ colors: { grey700Alt } }) => css`
	display: flex;
	color: ${grey700Alt};
`;

export const charCountValue = () => css`
	flex-grow: 1;
	text-align: right;
`;
