import { setupServer } from 'msw/node';
import { rest } from 'msw';
import mswDatasets from './datasets/mockMsw';
import mswDatasetOnboarding from './dataset-onboarding/mockMsw';
import mswPostDatasetActivityLog from './activitylog/mockMsw';
import translations from '../../public/locales/en-GB/translation.json';

const mswGetEnTranslations = rest.get(`http://localhost/locales/en/translation.json`, (req, res, ctx) => {
	return res(ctx.status(200), ctx.json(translations));
});

const mswGetEnGbTranslations = rest.get(`http://localhost/locales/en-GB/translation.json`, (req, res, ctx) => {
	return res(ctx.status(200), ctx.json(translations));
});

const handlers = [...mswDatasets, ...mswDatasetOnboarding, ...mswPostDatasetActivityLog, mswGetEnTranslations, mswGetEnGbTranslations];

export const server = setupServer(...handlers);
