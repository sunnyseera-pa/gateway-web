import { css } from '@emotion/react';

export const root =
    ({ variant }) =>
    theme => {
        const {
            font: { size },
            base: { increment },
            colors,
            components: {
                Alert: { variants },
            },
        } = theme;

        return css`
            background: ${colors[variants[variant].background]};
            color: ${colors[variants[variant].color]};
            fill: ${colors[variants[variant].color]};
            border: 2px solid ${colors[variants[variant].borderColor]};
            padding: ${increment * 3}px;
            display: flex;
            border-radius: 4px;
            line-height: 1;
            font-size: ${size.default};
        `;
    };

export const icon = ({ base: { increment } }) => css`
    margin-right: ${increment * 2}px;
`;

export const content = () => css`
    flex-grow: 1;

    > *:last-child {
        margin-bottom: 0;
    }
`;
