import { render, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AccountDatasetRejectModal from './AccountDatasetRejectModal';
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

describe('Given the AccountDatasetRejectModal component', () => {

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
                    <AccountDatasetRejectModal {...props} container={containerDiv} />
                </QueryClientProvider>
            );
        });

        afterAll(() => {
			removePortalContainer(containerDiv);
		});

        it('Should match the snapshot', async () => {
            expect(containerDiv).toMatchSnapshot();
        });

        it('Then the Reject and go to next button should not be disabled', () => {
            const { getByText } = wrapper;
            const rejectAndGoToNextButton = getByText('Reject and go to next');
            expect(rejectAndGoToNextButton).not.toHaveAttribute('disabled');
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
                        <AccountDatasetRejectModal {...newProps} container={containerDiv} />
                    </QueryClientProvider>
                )
            });
            it('Then the Reject and go to next button should be disabled', () => {
                const { getByText } = wrapper;
                const rejectAndGoToNextButton = getByText('Reject and go to next');
                expect(rejectAndGoToNextButton).toHaveAttribute('disabled');
            });
        });

        describe('And the Reject button is clicked with no description', () => {
            it('Should render an error message', async () => {
                const { getByTestId, findByText } = wrapper;
                const rejectButton = getByTestId('reject-button');
                fireEvent.click(rejectButton);

                expect(await findByText('Description cannot be empty')).toBeTruthy();
            });
        });

        describe('And the Reject button is clicked', () => {
            let button;

            beforeAll(() => {
                const { rerender } = wrapper;

                rerender(
                    <QueryClientProvider client={queryClient}>
                        <AccountDatasetRejectModal {...props} container={containerDiv} />
                    </QueryClientProvider>
                )

                const { getByTestId } = wrapper;

                const descriptionTextArea = getByTestId('dataset-reject-applicationStatusDesc');
                fireEvent.change(descriptionTextArea, { target: { value: 'rejected' } });

                button = within(getByTestId('button-container')).getAllByText('Reject')[0];
                fireEvent.click(button);
            });

            it('Then submits the dataset rejection request', async () => {
                await waitFor(() => expect(datasetOnboardingService.usePutDatasetOnboarding).toHaveBeenCalledWith({
                    id: 'id',
                    applicationStatus: 'rejected',
                    applicationStatusDesc: 'rejected'
                }));
            });

            it('Then closes the modal', async () => {
                await waitFor(() => expect(closed).toHaveBeenCalled());
            });
        });

        describe('And the Reject and go to next button is clicked', () => {
            let button;

            beforeAll(() => {
                const { rerender } = wrapper;

                rerender(
                    <QueryClientProvider client={queryClient}>
                        <AccountDatasetRejectModal {...props} container={containerDiv} />
                    </QueryClientProvider>
                )
                
                const { getByText, getByTestId } = wrapper;

                const descriptionTextArea = getByTestId('dataset-reject-applicationStatusDesc');
                fireEvent.change(descriptionTextArea, { target: { value: 'rejected' } });

                button = getByText('Reject and go to next');
                fireEvent.click(button);
            });

            it('Then submits the dataset rejection request', async () => {
                await waitFor(() => expect(datasetOnboardingService.usePutDatasetOnboarding).toHaveBeenCalledWith({
                    id: 'id',
                    applicationStatus: 'rejected',
                    applicationStatusDesc: 'rejected'
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
