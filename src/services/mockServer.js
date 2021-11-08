import { setupServer } from 'msw/node';
import mswDatasets from './datasets/mockMsw';
import mswDatasetOnboarding from './dataset-onboarding/mockMsw';
import mswPostDatasetActivityLog from './activitylog/mockMsw';

const handlers = [...mswDatasets, ...mswDatasetOnboarding, ...mswPostDatasetActivityLog];

export const server = setupServer(...handlers);
