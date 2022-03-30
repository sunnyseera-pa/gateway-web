import { css } from '@emotion/react';

export const root =
    ({ variant }) =>
    theme => {
        const {
            base: { increment },
            colors,
            components: {
                Alert: { variants },
            },
        } = theme;

        return css`
            background: ${colors[variants[variant].background]};
            color: ${colors[variants[variant].color]};
            border: 2px solid ${colors[variants[variant].borderColor]};
            padding: ${increment * 3}px;
            display: flex;
            border-radius: 4px;
        `;
    };

export const content = () => css`
    flex-grow: 1;
    line-height: 1;
`;
