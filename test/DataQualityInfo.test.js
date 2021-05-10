import React from 'react';
import DataQualityInfo from '../src/pages/dataset/components/DataQualityInfo';
import { datasetUtilityComplete } from './mocks/dataMock';

let wrapper;

describe('<DataQualityInfo />', () => {
	it('documentation section renders with the correct rating and subsection ratings', () => {
		wrapper = shallow(
			<DataQualityInfo section={'Documentation'} open={true} datasetUtility={datasetUtilityComplete} documentationWeight={'Gold'} />
		);
		expect(wrapper.find('[data-testid="goldSvg"]').exists()).toEqual(true);
		expect(wrapper.find('[data-testid="platinumSubSvg"]').length).toBe(3);
		expect(wrapper.find('[data-testid="goldSubSvg"]').length).toBe(2);
		expect(wrapper.find('[data-testid="addDocAndSupport"]').text().trim()).toEqual(
			'As Gold, plus support personnel available to answer questions'
		);
		expect(wrapper.find('[data-testid="dataModel"]').text().trim()).toEqual(
			'Key fields codified using a national or international standard'
		);
		expect(wrapper.find('[data-testid="dataDictionary"]').text().trim()).toEqual('Dictionary relates to national definitions');
		expect(wrapper.find('[data-testid="provenance"]').text().trim()).toEqual(
			'Ability to view earlier versions, including versions before any transformations have been applied data (in line with deidentification and IG approval) and review the impact of each stage of data cleaning'
		);
	});
});

describe('<DataQualityInfo />', () => {
	it('access & provision section renders with the correct rating and subsection ratings', () => {
		wrapper = shallow(
			<DataQualityInfo section={'Access'} open={true} datasetUtility={datasetUtilityComplete} accessProvisionWeight={'Bronze'} />
		);
		expect(wrapper.find('[data-testid="bronzeSvg"]').exists()).toEqual(true);
		expect(wrapper.find('[data-testid="silverSubSvg"]').length).toBe(1);
		expect(wrapper.find('[data-testid="bronzeSubSvg"]').length).toBe(1);
		expect(wrapper.find('[data-testid="unfilledSubSvg"]').length).toBe(1);
		expect(wrapper.find('[data-testid="allowableUses"]').text().trim()).toEqual(
			'Non-consented, aggregate data for specific academic uses (following IG approval)'
		);
		expect(wrapper.find('[data-testid="timeLag"]').text().trim()).toEqual('Approximately 1 year');
		expect(wrapper.find('[data-testid="timeliness"]').exists()).toEqual(false);
	});
});
