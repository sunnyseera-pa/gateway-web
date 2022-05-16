import { css } from '@emotion/react';
import { getSpacingStyle } from '../../configs/theme';

export const mixins = {
    input:
        ({ variant, error }) =>
        config => {
            const { colors, variants } = config;

            const bottom = variant === 'tertiary' ? 'bottom-' : '';

            return css`
                background: ${colors[variants[variant].background]};

                ${
                    variant === 'primary' || variant === 'secondary'
                        ? 'border-radius: 0.25rem !important;'
                        : `
                border-radius: 0;
                border: none !important;
                padding-left: 0;
                padding-right: 0;
                `
                }

                border-${bottom}style: solid !important;
                border-${bottom}width: 2px !important;         
                border-${bottom}color: ${error ? colors.red600 : colors[variants[variant].borderColor]} !important;  

                ${
                    !error &&
                    `
                &:focus,
                &.focus,
                &:focus-within,
                &:focus-visible {
                    border-${bottom}color: ${colors.teal} !important;
                    outline: none;
                }

                &:hover {
                    border-${bottom}color: ${colors[variants[variant].hoverBorderColor]} !important;
                    outline: none;
                }`
                }

                &:disabled,
                &.disabled {
                    background: ${colors[variants[variant].disabledBackground]};
                    border-${bottom}color: ${colors[variants[variant].disabledBorderColor]} !important;
                    outline: none;
                }
            `;
        },
    label:
        ({ variant, disabled, inline }) =>
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
                ${!inline ? getSpacingStyle('margin-bottom', 2, theme) : 'margin-bottom: 0;'}
                ${inline && getSpacingStyle('margin-right', 2, theme)}

                ${disabled &&
                `
                    color: ${colors[disabledLabelColor]};
                    
                `}
            `;
        },
    formGroup:
        ({ inline }) =>
        ({
            font: {
                size: { default: fontSize },
            },
        }) =>
            css`
                font-size: ${fontSize};
                display: flex;
                flex-direction: ${inline ? 'row' : 'column'};
                ${inline && `align-items: center;`}
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
            ${variant !== 'tertiary' ? `width: 100%` : `width: auto;`};

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
