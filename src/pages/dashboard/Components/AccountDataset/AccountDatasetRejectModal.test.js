import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AccountDatasetRejectModal from './AccountDatasetRejectModal';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

let containerDiv;

describe('Given the AccountDatasetRejectModal component', () => {

    const props = {
        id: "id",
        open: true,
        closed: jest.fn(),
        goToNext: jest.fn(),
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
    });
});
