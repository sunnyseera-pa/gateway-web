import { css } from '@emotion/react';
import { mixins } from '../Checkbox/Checkbox.styles';

export const root = ({ variant = 'primary', hasLeafIcon, hasParentIcon }) => theme => {
	const {
		colors,
		base: { increment },
		components: {
			Checkbox: { height, width, variants },
		},
	} = theme;

	return css`
		${mixins.root({ width })}

		${!hasParentIcon &&
		`.rct-node-parent > .rct-text .rct-node-icon {
			display: none;
		}`}

		${!hasLeafIcon &&
		`.rct-node-leaf > .rct-text .rct-node-icon {
				display: none;
			}`}

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

		input + .rct-checkbox {
			position: relative;
			width: ${width};
			height: ${height};
		}

		input + .rct-checkbox .rct-icon::before {
			${mixins.before({ colors, variants, variant, width, height })}
		}

		input + .rct-checkbox .rct-icon::after {
			${mixins.after({ width, height })}
		}

		input:disabled + .rct-checkbox .rct-icon-uncheck::after {
			${mixins.disabledNotChecked({ width, height })}
		}

		input + .rct-checkbox .rct-icon-check::after {
			${mixins.checked({ colors, variants, variant })}
		}

		input:disabled + .rct-checkbox .rct-icon::after {
			${mixins.disabled({ colors, variants, variant })}
		}
	`;
};
