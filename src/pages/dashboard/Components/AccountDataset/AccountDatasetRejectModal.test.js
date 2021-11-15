import { render, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import React from 'react';
import AccountDatasetRejectModal from './AccountDatasetRejectModal';
import datasetOnboardingService from '../../../../services/dataset-onboarding/dataset-onboarding';
import { server } from '../../../../services/mockServer';

jest.mock('../../../../services/dataset-onboarding/dataset-onboarding');

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
            server.listen();
            containerDiv = createPortalContainer();
            wrapper = render(
                <AccountDatasetRejectModal {...props} container={containerDiv} />, {
                    wrapper: Providers,
                }
            );
        });

        afterEach(() => {
            server.resetHandlers();
        });

        afterAll(() => {
            server.close();
			removePortalContainer(containerDiv);
		});

        it('Should match the snapshot', async () => {
            expect(containerDiv).toMatchSnapshot();
        });

        it('Then the Reject and go to next button should not be disabled', async () => {
            await waitFor(() => expect(wrapper.getByText('Reject and go to next')).toBeTruthy());

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
                    <AccountDatasetRejectModal {...newProps} container={containerDiv} />, {
                        wrapper: Providers,
                    }
                )
            });
            it('Then the Reject and go to next button should be disabled', async () => {
                await waitFor(() => expect(wrapper.getByText('Reject and go to next')).toBeTruthy());

                const { getByText } = wrapper;
                const rejectAndGoToNextButton = getByText('Reject and go to next');
                expect(rejectAndGoToNextButton).toHaveAttribute('disabled');
            });
        });

        describe('And the Reject button is clicked', () => {
            let button;

            beforeAll(async () => {
                const { rerender } = wrapper;

                rerender(
                    <AccountDatasetRejectModal {...props} container={containerDiv} />, {
                        wrapper: Providers,
                    }
                )

                await waitFor(() => expect(wrapper.getByText('Reject and go to next')).toBeTruthy());

                const { getByTestId, getByRole } = wrapper;

                const descriptionTextArea = getByRole('textarea');
                userEvent.type(descriptionTextArea, "rejected");

                button = within(getByTestId('button-container')).getAllByText('Reject')[0];
                userEvent.click(button);
            });

            it('Then submits the dataset rejection request', async () => {
                await waitFor(() => expect(datasetOnboardingService.usePutDatasetOnboarding).toHaveBeenCalledWith({
                    id: 'id',
                    applicationStatus: 'rejected',
                    applicationStatusDesc: ''
                }));
            });

            it('Then closes the modal', async () => {
                await waitFor(() => expect(closed).toHaveBeenCalled());
            });
        });

        describe('And the Reject and go to next button is clicked', () => {
            let button;

            beforeAll(async () => {
                const { rerender } = wrapper;

                rerender(
                    <AccountDatasetRejectModal {...props} container={containerDiv} />, {
                        wrapper: Providers,
                    }
                )

                await waitFor(() => expect(wrapper.getByText('Reject and go to next')).toBeTruthy());
                
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
