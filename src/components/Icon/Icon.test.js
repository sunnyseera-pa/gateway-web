import React from 'react';
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import Icon from '.';

jest.mock('axios');

jest.mock('../../images/SVGIcon', () => props => {
    mockSVGIcon(props);
    return <div />;
});

const mockSVGIcon = jest.fn();

let wrapper;

describe('Given the Icon component', () => {
    describe('When it is from a file', () => {
        beforeAll(async () => {
            axios.get.mockImplementation(() => Promise.resolve({ data: '<svg />' }));

            wrapper = render(<Icon svg='Application_approved' />, {
                wrapper: Providers,
            });

            await waitFor(() => expect(wrapper.container.querySelector('svg')).toBeTruthy());
        });

        it('Then matches the previous snapshot', () => {
            expect(wrapper.container).toMatchSnapshot();
        });
    });
});
