import { css } from '@emotion/react';

export const root =
    ({ variant, disabled, textLabel }) =>
    theme => {
        const {
            colors,
            components: {
                Checkbox: { height, width, variants, fontSize, disabledColor },
            },
        } = theme;

        return css`
            ${mixins.root({ width, height, disabled, textLabel })}

            font-size: ${fontSize};

            &::before {
                ${mixins.before({ colors, variants, variant, width, height })}
            }

            input:disabled + span {
                color: ${colors[disabledColor]};
            }

            input + .ui-Checkbox__label::after {
                ${mixins.after({ width, height })}
            }

            input:disabled:not(:checked) + .ui-Checkbox__label::after {
                ${mixins.disabledNotChecked({ width, height })}
            }

            input:checked + .ui-Checkbox__label::after {
                ${mixins.checked({ colors, variants, variant })}
            }

            input:checked + .ui-Checkbox__label::after {
                ${mixins.checked({ colors, variants, variant })}
            }

            input + .ui-Checkbox__label > span::after {
                ${mixins.partial({ width, height })}
            }

            input:disabled + .ui-Checkbox__label::after {
                ${mixins.disabled({ colors, variants, variant })}
            }
        `;
    };

export const mixins = {
    root: ({ width, height, disabled, textLabel }) => `
		position: relative;
		${textLabel ? `padding-left: calc(${width} + 0.5rem);` : `padding-left: ${width};`}
		min-height: ${height};

		input {
			display: none;
		}

		${
            !disabled
                ? `&:hover {
			cursor: pointer;
			}`
                : ''
        }
	`,
    before: ({ colors, variants, variant, width, height }) => `
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		border-width: 2px;
		border-style: solid;
		border-color: ${colors[variants[variant].borderColor]};
		width: ${width};
		height: ${height};
	`,
    after: ({ width, height }) => `
		content: '';
		position: absolute;
		top: 5px;
		left: 5px;
		width: calc(${width} - 10px);
		height: calc(${height} - 10px);
	`,
    disabledNotChecked: ({ width, height }) => `
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: calc(${width} - 4px);
		height: calc(${height} - 4px);
	`,
    checked: ({ colors, variants, variant }) => `
		background: ${colors[variants[variant].checkedBackground]};
		display: flex;
		align-items: center;
		justify-content: center;
	`,
    partial: ({ width, height }) => `
		content: '-';
		font-size: 22px;
		color: white;
		z-index: 1;
		left: 0;
		top: -1px;
		position: absolute;
		width: calc(${width} - 10px);
		height: calc(${height} - 10px);
		display: flex;
		align-items: center;
		justify-content: center;
	`,
    disabled: ({ colors, variants, variant }) => `
		background: ${colors[variants[variant].backgroundDisabled]};
	`,
};
