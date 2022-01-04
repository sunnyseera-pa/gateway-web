import { css } from '@emotion/react';

export const root = ({ variant }) => theme => {
	const {
		colors,
		components: {
			Checkbox: { height, width, variants },
		},
	} = theme;

	return css`
		position: relative;
		padding-left: calc(${width} + 0.5rem);
		padding-top: 2px;

		input {
			display: none;
		}

		&:hover {
			cursor: pointer;
		}

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			border-width: 2px;
			border-style: solid;
			border-color: ${colors[variants[variant].borderColor]};
			width: ${width};
			height: ${height};
		}

		input + .ui-Checkbox__label::after {
			content: '';
			position: absolute;
			top: 5px;
			left: 5px;
			width: calc(${width} - 10px);
			height: calc(${height} - 10px);
		}

		input:disabled:not(:checked) + .ui-Checkbox__label::after {
			content: '';
			position: absolute;
			top: 2px;
			left: 2px;
			width: calc(${width} - 4px);
			height: calc(${height} - 4px);
		}

		input:checked + .ui-Checkbox__label::after {
			background: ${colors.green700};
		}

		input:disabled + .ui-Checkbox__label::after {
			background: ${colors[variants[variant].backgroundDisabled]};
		}
	`;
};
