import { render, within, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AccountDatasetApproveModal from './AccountDatasetApproveModal';
import datasetOnboardingService from '../../../../services/dataset-onboarding/dataset-onboarding';

jest.mock('../../../../services/dataset-onboarding/dataset-onboarding');

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

let containerDiv;
const goToNext = jest.fn();
const closed = jest.fn();

describe('Given the AccountDatasetApproveModal component', () => {

    const props = {
        id: "id",
        open: true,
        closed,
        goToNext,
        showGoToNext: true
    };

    describe('When it is rendered', () => {
        let wrapper;

        beforeAll(() => {
            containerDiv = createPortalContainer();
            wrapper = render(
                <QueryClientProvider client={queryClient}>
                    <AccountDatasetApproveModal {...props} container={containerDiv} />
                </QueryClientProvider>
            );
        });

        afterAll(() => {
			removePortalContainer(containerDiv);
		});

        it('Should match the snapshot', async () => {
            expect(containerDiv).toMatchSnapshot();
        });

        it('Then the Approve and go to next button should not be disabled', () => {
            const { getByText } = wrapper;
            const approveAndGoToNextButton = getByText('Approve and go to next');
            expect(approveAndGoToNextButton).not.toHaveAttribute('disabled');
        });

        describe('And showGoToNext is false', () => {
            beforeAll(() => {
                const { rerender } = wrapper;
                const newProps = {
                    ...props,
                    showGoToNext: false
                };

                rerender(
                    <QueryClientProvider client={queryClient}>
                        <AccountDatasetApproveModal {...newProps} container={containerDiv} />
                    </QueryClientProvider>
                )
            });
            it('Then the Approve and go to next button should be disabled', () => {
                const { getByText } = wrapper;
                const approveAndGoToNextButton = getByText('Approve and go to next');
                expect(approveAndGoToNextButton).toHaveAttribute('disabled');
            });
        });

        describe('And the Approve button is clicked', () => {
            let button;

            beforeAll(() => {
                const { rerender } = wrapper;

                rerender(
                    <QueryClientProvider client={queryClient}>
                        <AccountDatasetApproveModal {...props} container={containerDiv} />
                    </QueryClientProvider>
                )

                const { getByTestId } = wrapper;
                button = within(getByTestId('button-container')).getAllByText('Approve')[0];
                fireEvent.click(button);
            });

            it('Then submits the dataset approval request', async () => {
                await waitFor(() => expect(datasetOnboardingService.usePutDatasetOnboarding).toHaveBeenCalledWith({
                    id: 'id',
                    applicationStatus: 'approved',
                    applicationStatusDesc: ''
                }));
            });

            it('Then closes the modal', async () => {
                await waitFor(() => expect(closed).toHaveBeenCalled());
            });
        });

        describe('And the Approve and go to next button is clicked', () => {
            let button;

            beforeAll(() => {
                const { rerender } = wrapper;

                rerender(
                    <QueryClientProvider client={queryClient}>
                        <AccountDatasetApproveModal {...props} container={containerDiv} />
                    </QueryClientProvider>
                )
                
                const { getByText } = wrapper;
                button = getByText('Approve and go to next');
                fireEvent.click(button);
            });

            it('Then submits the dataset approval request', async () => {
                await waitFor(() => expect(datasetOnboardingService.usePutDatasetOnboarding).toHaveBeenCalledWith({
                    id: 'id',
                    applicationStatus: 'approved',
                    applicationStatusDesc: ''
                }));
            });

            it('Then goes to next dataset', async () => {
                await waitFor(() => expect(goToNext).toHaveBeenCalled());
            });

            it('Then closes the modal', async () => {
                await waitFor(() => expect(closed).toHaveBeenCalled());
            });
        });
    });
});
