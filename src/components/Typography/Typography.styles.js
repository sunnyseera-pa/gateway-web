import { css } from '@emotion/react';

export const root =
    ({ variant }) =>
    theme => {
        const {
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

            ${(variant === 'caption' || variant === 'tiny') && 'display: inline-block;'}
        `;
    };
