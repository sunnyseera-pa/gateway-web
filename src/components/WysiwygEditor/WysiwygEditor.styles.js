import { css } from '@emotion/react';
import { getSize } from '../../configs/theme';

export const root = () => theme => {
    const {
        colors,
        components: {
            Icon: { sizes },
        },
    } = theme;

    return css`
        .wysiwyg-wrapper {
            border: 2px solid ${colors.grey400};
            border-top: none;
            padding: 0px ${getSize(4, theme)};
            min-height: 400px;
            max-height: 520px;
        }

        .rdw-editor-toolbar {
            padding: 6px 5px 0;
            border-radius: 2px;
            border: 1px solid ${colors.grey100};

            border-top: solid 2px ${colors.grey400} !important;
            border-left: solid 2px ${colors.grey400} !important;
            border-right: solid 2px ${colors.grey400} !important;

            display: flex;
            justify-content: flex-start;
            background: white;
            flex-wrap: wrap;
            font-size: 15px;
            margin-bottom: 0px !important;
            user-select: none;
        }

        .wysiwyg-main-card {
            margin-bottom: 0px;
            border-bottom: solid 1px $background;
        }
    `;
};
