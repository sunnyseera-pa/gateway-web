import { setupServer } from 'msw/node';
import mswDatasets from './datasets/mockMsw';
import mswDatasetOnboarding from './dataset-onboarding/mockMsw';

const handlers = [...mswDatasets, ...mswDatasetOnboarding];

export const server = setupServer(...handlers);
