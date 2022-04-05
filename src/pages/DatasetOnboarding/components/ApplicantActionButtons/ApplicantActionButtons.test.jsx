import React from 'react';
import ApplicationActionButtons from './ApplicantActionButtons';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

let wrapper;

describe('Given the ApplicationActionButtons component', () => {
    beforeAll(() => {
        wrapper = render(<ApplicationActionButtons isFederated={false} showCreateNewVersion={true} />);
    });

	describe('When the dataset IS NOT from a federated source', () => {
        it('Then it should show the "Manage dataset" action button', () => {
            expect(screen.queryByText(/manage dataset/i)).toBeInTheDocument();   
        });

        it('Then it should show the "Create a new version" action button', () => {
            expect(screen.queryByText(/create a new version/i)).toBeInTheDocument();   
        });
    })

    describe('When the dataset IS from a federated source', () => {
        it('Then it should not show the "Manage dataset" action button', () => {
            wrapper.rerender(<ApplicationActionButtons isFederated={true}  showCreateNewVersion={true} />);
            expect(screen.queryByText(/manage dataset/i)).toBeNull();
        });

        it('Then it should not show the "Create a new version" action button', () => {
            wrapper.rerender(<ApplicationActionButtons isFederated={true}  showCreateNewVersion={true} />);
            expect(screen.queryByText(/create a new version/i)).toBeNull();
        });
    })
})