import { css } from '@emotion/react';

export const root =
    ({ variant, size }) =>
    theme => {
        const {
            colors,
            components: {
                Button: {
                    sizes: {
                        [size]: { padding, fontSize },
                    },
                    variants: {
                        [variant]: {
                            background,
                            disabledBackground,
                            hoverBackground,
                            borderColor,
                            hoverBorderColor,
                            disabledBorderColor,
                            color,
                            hoverColor,
                            disabledColor,
                        },
                    },
                },
            },
        } = theme;

        return css`
            padding: ${padding};
            background: ${colors[background]};
            color: ${colors[color]};
            border: 1px solid ${colors[borderColor]};
            border-radius: 4px;
            font-size: ${fontSize};

            &:hover {
                background: ${colors[hoverBackground]};
                color: ${colors[hoverColor]};
                border: 1px solid ${colors[hoverBorderColor]};
            }

            &:disabled {
                background: ${colors[disabledBackground]};
                color: ${colors[disabledColor]};
                border: 1px solid ${colors[disabledBorderColor]};
                cursor: default;
            }
        `;
    };
