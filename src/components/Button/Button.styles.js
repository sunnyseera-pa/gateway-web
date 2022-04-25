import { css } from '@emotion/react';

export const root =
    ({ variant, size }) =>
    theme => {
        const {
            colors,
            base: { unit, increment },
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
            fill: ${colors[color]};
            border: 2px solid ${colors[borderColor]};
            border-radius: 4px;
            font-size: ${fontSize};
            display: inline-flex;
            align-items: center;
            gap: ${increment * 1.5}${unit};

            .ui-Icon {
                height: 1em;
                width: 1em;
            }

            &:hover {
                background: ${colors[hoverBackground]};
                color: ${colors[hoverColor]};
                ${hoverBorderColor && `border-color: ${colors[hoverBorderColor]};`}
            }

            &:disabled {
                background: ${colors[disabledBackground]};
                color: ${colors[disabledColor]};
                ${disabledBorderColor && `border-color: ${colors[disabledBorderColor]};`}
                cursor: default;
            }
        `;
    };
