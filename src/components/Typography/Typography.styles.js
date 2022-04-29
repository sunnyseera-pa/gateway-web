import { css } from '@emotion/react';

export const root =
    ({ variant, color }) =>
    theme => {
        const {
            colors,
            components: {
                Typography: {
                    variants: {
                        [variant]: { fontSize, fontWeight, lineHeight },
                    },
                },
            },
        } = theme;

        return css`
            font-size: ${fontSize} !important;
            line-height: ${lineHeight || 'normal'};
            color: ${colors[color]} !important;
            ${fontWeight && `font-weight: ${fontWeight};`}

            ${(variant === 'caption' || variant === 'tiny') && 'display: inline-block;'}
        `;
    };
