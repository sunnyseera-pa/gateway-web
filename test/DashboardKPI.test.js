import React from 'react';
import DashboardKPI from '../src/pages/dashboard/DARComponents/DashboardKPI';
import { dashboardKPIData } from './mocks/dataMock';

let wrapper;

describe('<DashboardKPI /> rendering', () => {
	it('renders without crashing', () => {
		wrapper = shallow(
			<DashboardKPI
				kpiText={dashboardKPIData.kpiText}
				kpiValue={dashboardKPIData.kpiValue}
				percentageFlag={dashboardKPIData.percentageFlag}
				testId='dashboard-gateway-uptime-percent'
			/>
		);
	});

	it('will render with "data access requests this month"', () => {
		wrapper = shallow(
			<DashboardKPI kpiText='data access requests this month' kpiValue={4} testId='dashboard-data-access-requests-count' />
		);
		expect(wrapper.find('[data-test-id="kpiText"]').text().trim()).toEqual('data access requests this month');
	});

	it('will render using <CountUp />', () => {
		wrapper = shallow(
			<DashboardKPI kpiText='data access requests this month' kpiValue={4} testId='dashboard-data-access-requests-count' />
		);
		expect(wrapper.find('[data-test-id="dashboard-data-access-requests-count"]').exists()).toEqual(true);
		expect(wrapper.find('[data-test-id="dashboard-data-access-requests-count"]').text().trim()).toEqual('<CountUp />');
	});

	it('will render with "total datasets"', () => {
		wrapper = shallow(<DashboardKPI kpiText='total datasets' kpiValue={648} testId='dashboard-dataset-count' />);
		expect(wrapper.find('[data-test-id="kpiText"]').text().trim()).toEqual('total datasets');
	});

	it('will render with "648"', () => {
		wrapper = shallow(<DashboardKPI kpiText='total datasets' kpiValue={648} testId='dashboard-dataset-count' />);
		expect(wrapper.find('[data-test-id="dashboard-dataset-count"]').exists()).toEqual(true);
		expect(wrapper.find('[data-test-id="dashboard-dataset-count"]').text().trim()).toEqual('648');
	});

	it('will render with "datasets with technical metadata"', () => {
		wrapper = shallow(
			<DashboardKPI
				kpiText='datasets with technical metadata'
				kpiValue='47'
				percentageFlag={true}
				testId='dashboard-dataset-metadata-percent'
			/>
		);
		expect(wrapper.find('[data-test-id="kpiText"]').text().trim()).toEqual('datasets with technical metadata');
	});

	it('will render with "47%"', () => {
		wrapper = shallow(
			<DashboardKPI
				kpiText='datasets with technical metadata'
				kpiValue={47}
				percentageFlag={true}
				testId='dashboard-dataset-metadata-percent'
			/>
		);
		expect(wrapper.find('[data-test-id="dashboard-dataset-metadata-percent"]').text().trim()).toEqual('47%');
	});
});
