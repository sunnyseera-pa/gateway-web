import React from 'react';
import { render } from '@testing-library/react';
import UnmetDemandSection from '.';
import featureEnabled from '../../../../../utils/featureSwitches/unmetDemands';

jest.mock('../../../../../utils/featureSwitches/unmetDemands');

describe('<UnmetDemandSection', () => {
    it('should not render component when disabled from feature switch', () => {
        featureEnabled.mockReturnValue(false);

        const { queryByText } = render(<UnmetDemandSection />);

        expect(queryByText('Unmet demand')).toBeFalsey();
    });

    it('should render component when enabled from feature switch', () => {
        featureEnabled.mockReturnValue(true);

        const { queryByText } = render(<UnmetDemandSection />);

        expect(queryByText('Unmet demand')).toBeTruthy();
    });
});