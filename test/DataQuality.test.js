import React from 'react';
import DataQuality from '../src/pages/dataset/components/DataQuality';
import { datasetUtilityComplete, datasetUtilityMetadataRichness, datasetUtilityNotRated } from './mocks/dataMock';

let wrapper;

describe('<DataQuality />', () => {
	it('renders with all 5 data utility sections', () => {
		wrapper = shallow(<DataQuality datasetUtility={datasetUtilityComplete} />);
		expect(wrapper.find('[data-testid="documentationWeight"]').exists()).toEqual(true);
		expect(wrapper.find('[data-testid="technicalQualityWeight"]').exists()).toEqual(true);
		expect(wrapper.find('[data-testid="accessProvisionWeight"]').exists()).toEqual(true);
		expect(wrapper.find('[data-testid="valueInterestWeight"]').exists()).toEqual(true);
		expect(wrapper.find('[data-testid="coverageWeight"]').exists()).toEqual(true);
	});
});

describe('<DataQuality />', () => {
	it('renders with only the "Documentation" section and "Metadata richness" subsection', () => {
		wrapper = shallow(<DataQuality datasetUtility={datasetUtilityMetadataRichness} />);
		expect(wrapper.find('[data-testid="documentationWeightOnly"]').exists()).toEqual(true);
	});
});

describe('<DataQuality />', () => {
	it('renders with "Not rated" badge"', () => {
		wrapper = shallow(<DataQuality datasetUtility={datasetUtilityNotRated} />);
		expect(wrapper.find('[data-testid="notRated"]').exists()).toEqual(true);
	});
});
