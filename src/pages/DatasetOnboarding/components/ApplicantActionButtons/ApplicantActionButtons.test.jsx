import React from 'react';
import ApplicationActionButtons from './ApplicantActionButtons';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

let wrapper;

describe('Given the ApplicationActionButtons component', () => {
    beforeAll(() => {
        wrapper = render(<ApplicationActionButtons isFederated={false} />);
    });

	describe('When the dataset is not from a federated source', () => {
        it('Then it should show the "Manage dataset" button', () => {
            expect(screen.queryByText(/manage dataset/i)).toBeInTheDocument();   
        });
    })

    describe('When the dataset is from a federated source', () => {
        it('Then it should not show the "Manage dataset" button', () => {
            wrapper.rerender(<ApplicationActionButtons isFederated={true} />);
            expect(screen.queryByText(/manage dataset/i)).toBeNull();
        });
    })
})