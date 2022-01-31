import { css } from '@emotion/react';
import { mixins } from '../Input/Input.styles';

export const inputGroup = ({ variant }) => theme => {
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
		}
	`;
};

export const formGroup = css`
	display: flex;
	flex-direction: column;
`;

export const label = css`
	display: flex;
`;

export const charCount = ({ colors: { grey700Alt } }) => css`
	flex-grow: 1;
	text-align: right;
	color: ${grey700Alt};
`;
