import { css } from '@emotion/react';

export const root = ({ variant }) => theme => {
	const {
		font: {
			size: { default: defaultSize },
		},
		colors,
		components: {
			Dropdown: { variants, height },
		},
	} = theme;

	return css`
		.dropdown-toggle {
			position: relative;
			text-align: left;
			width: 100%;
			padding-right: 1.5rem;
			font-size: ${defaultSize};
			height: ${height};

			&:after {
				position: absolute;
				right: 0.25rem;
				top: 50%;
				transform: translate(-50%, -50%);
				margin: 0;
			}
		}

		.dropdown-toggle,
		&.show .dropdown-toggle {
			border-width: 2px;
			border-style: solid;
			background: ${colors[variants[variant].background]};
			border-color: ${colors[variants[variant].borderColor]};
			color: ${colors.grey700};
		}

		.dropdown-toggle:focus {
			box-shadow: none;
			border-color: ${colors.green700};
		}

		.dropdown-menu {
			font-size: ${defaultSize};
			min-width: 100%;
		}
	`;
};
