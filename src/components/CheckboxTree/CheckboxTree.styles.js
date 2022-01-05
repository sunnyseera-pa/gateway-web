import { css } from '@emotion/react';

export const root = ({ variant = 'primary', hasLeafIcon, hasParentIcon }) => theme => {
	const {
		colors,
		base: { increment },
		components: {
			Checkbox: { height, width, variants },
		},
	} = theme;

	return css`
		position: relative;
		padding-left: calc(${width} + 0.5rem);
		padding-top: 2px;

		${!hasParentIcon &&
		`.rct-node-parent > .rct-text .rct-node-icon {
			display: none;
		}`}

		${!hasLeafIcon &&
		`.rct-node-leaf > .rct-text .rct-node-icon {
				display: none;
			}`}

		input {
			display: none;
		}

		label {
			display: flex;
		}

		.rct-collapse {
			display: flex;
			justify-content: center;
			align-items: center;
			width: ${4 * increment}px;
		}

		.rct-collapse:focus {
			outline: none;
		}

		.rct-collapse,
		.rct-checkbox,
		.rct-node-icon {
			margin: 0 ${increment}px 0 0;
			padding: 0;
		}

		.rct-title {
			padding: 0 0 0 ${increment}px;
		}

		.rct-text {
			padding: 0 0 ${2 * increment}px 0;
		}

		&:hover {
			cursor: pointer;
		}

		input + .rct-checkbox {
			position: relative;
			width: ${width};
			height: ${height};
		}

		input + .rct-checkbox .rct-icon::before {
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

		input + .rct-checkbox .rct-icon::after {
			content: '';
			position: absolute;
			top: 5px;
			left: 5px;
			width: calc(${width} - 10px);
			height: calc(${height} - 10px);
		}

		input:disabled + .rct-checkbox .rct-icon-uncheck::after {
			content: '';
			position: absolute;
			top: 2px;
			left: 2px;
			width: calc(${width} - 4px);
			height: calc(${height} - 4px);
		}

		input + .rct-checkbox .rct-icon-check::after {
			background: ${colors[variants[variant].checkedBackground]};
		}

		input:disabled + .rct-checkbox .rct-icon::after {
			background: ${colors[variants[variant].backgroundDisabled]};
		}
	`;
};
