import { css } from '@emotion/react';

export const root =
    ({ variant, color }) =>
    theme => {
        const {
            colors,
            components: {
                Typography: {
                    variants: {
                        [variant]: { fontSize, lineHeight },
                    },
                },
            },
        } = theme;

        return css`
            font-size: ${fontSize} !important;
            line-height: ${lineHeight || 'normal'};
            color: ${colors[color]};

            ${(variant === 'caption' || variant === 'tiny') && 'display: inline-block;'}
        `;
    };
