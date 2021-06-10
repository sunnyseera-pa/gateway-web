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

	it('will render with "uptime this month"', () => {
		wrapper = shallow(
			<DashboardKPI
				kpiText={dashboardKPIData.kpiText}
				kpiValue={dashboardKPIData.kpiValue}
				percentageFlag={dashboardKPIData.percentageFlag}
				testId='dashboard-gateway-uptime-percent'
			/>
		);
		expect(wrapper.find('[data-test-id="kpiText"]').text().trim()).toEqual('uptime this month');
	});
});
