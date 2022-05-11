import { css } from '@emotion/react';
import { getSpacingStyle } from '../../configs/theme';

export const mixins = {
    input:
        ({ variant, error }) =>
        config => {
            const { colors, variants } = config;

            console.log('BACKGROUND', variants[variant].background);

            return css`
                background: ${colors[variants[variant].background]};
                border-style: solid !important;
                border-width: 2px !important;
                border-color: ${error ? colors.red600 : colors[variants[variant].borderColor]} !important;
                border-radius: 0.25rem !important;

                ${!error &&
                `
                &:focus,
                &.focus,
                &:focus-within,
                &:focus-visible {
                    border-color: ${colors.teal} !important;
                    outline: none;
                }

                &:hover {
                    border-color: ${colors[variants[variant].hoverBorderColor]} !important;
                    outline: none;
                }`}

                &:disabled,
                &.disabled {
                    background: ${colors[variants[variant].disabledBackground]};
                    border-color: ${colors[variants[variant].disabledBorderColor]} !important;
                    outline: none;
                }
            `;
        },
    label:
        ({ variant, disabled }) =>
        theme => {
            const {
                colors,
                components: {
                    Input: {
                        variants: {
                            [variant]: { disabledLabelColor },
                        },
                    },
                },
            } = theme;

            return css`
                ${getSpacingStyle('margin-bottom', 2, theme)}

                ${disabled &&
                `
                    color: ${colors[disabledLabelColor]};
                    
                `}
            `;
        },
    formGroup: ({
        font: {
            size: { default: fontSize },
        },
    }) => css`
        font-size: ${fontSize};
        display: flex;
        flex-direction: column;
        margin-bottom: 0;
    `,
};

export const inputGroup =
    ({ prepend, append, variant, size, error, disabled }) =>
    theme => {
        const {
            colors,
            font: {
                size: { default: defaultSize },
            },
            components: {
                Input: {
                    sizes,
                    variants,
                    variants: {
                        [variant]: { disabledLabelColor },
                    },
                },
            },
        } = theme;

        return css`
            width: 100%;

            input.form-control,
            .rbt-input.form-control {
                ${prepend.offsetWidth ? `padding-left: calc(${prepend.offsetWidth}px + 1.2em);` : ''}
                ${append.offsetWidth ? `padding-right: calc(${append.offsetWidth}px + 1.2em);` : ''}
			font-size: ${defaultSize};
                height: ${sizes[size].height};
                width: 100%;

                ${mixins.input({ variant, error })({ colors, variants })}
            }

            ${disabled &&
            `
                .ui-Icon {
                    color: ${colors[disabledLabelColor]};
                    fill: ${colors[disabledLabelColor]};
                }
                `}
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

export const { formGroup } = mixins;

export const { label } = mixins;
