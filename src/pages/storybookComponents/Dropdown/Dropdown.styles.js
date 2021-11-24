import { css } from '@emotion/react';

export const root = ({ variant }) => theme => {
	const {
		colors,
		components: {
			Dropdown: { variants },
		},
	} = theme;

	return css`
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
	`;
};
