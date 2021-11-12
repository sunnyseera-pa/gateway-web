import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AccountDatasetApproveModal from './AccountDatasetApproveModal';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

let containerDiv;

describe('Given the AccountDatasetApproveModal component', () => {

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
    });
});
