import { css } from '@emotion/react';
import { getComponentStylesFromTheme } from '../../configs/theme';

export const root =
    ({ variant, size }) =>
    theme => {
        const {
            font: {
                size: { default: defaultSize },
            },
            colors,
            components: {
                Dropdown: { variants, sizes },
            },
        } = theme;

        return css`
            .dropdown-toggle {
                position: relative;
                text-align: left;
                width: 100%;
                padding-right: 1.5rem;
                font-size: ${defaultSize};
                height: ${sizes[size].height};

                &:after {
                    position: absolute;
                    right: 0.25rem;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    margin: 0;
                }
            }

            .dropdown-toggle,
            &.show .dropdown-toggle {
                border-width: 2px;
                border-style: solid;

                color: ${colors.grey700};

                ${getComponentStylesFromTheme(variants[variant], theme, true)};
            }

            .dropdown-toggle:hover,
            .dropdown-toggle:focus {
                box-shadow: none;
            }

            .dropdown-menu {
                font-size: ${defaultSize};
                min-width: 100%;
            }
        `;
    };
