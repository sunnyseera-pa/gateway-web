/** @jsx jsx */
import { jsx, ThemeProvider } from '@emotion/react';
import { theme } from '../src/configs/theme';

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

export const decorators = [
	Story => (
		<ThemeProvider theme={theme}>
			<div className='sb-preview-padded'>
				<Story />
			</div>
		</ThemeProvider>
	),
];

import './main.scss';
