import React from 'react';
import AccountAdvancedSearch from '../src/pages/dashboard/AccountAdvancedSearch';
import AdvancedSearchTAndCsModal from '../src/pages/dashboard/AdvancedSearchTAndCsModal';
import AdvancedSearchRequestAccessModal from '../src/pages/dashboard/AdvancedSearchRequestAccessModal';
import { userStateData } from './mocks/dataMock';
import { Card } from 'react-bootstrap';

let wrapper;

describe('<AccountAdvancedSearch /> rendering', () => {
	it('renders without crashing', () => {
		wrapper = shallow(<AccountAdvancedSearch UserState={userStateData} />);
	});

	it('renders 2 <Card /> components', () => {
		wrapper = shallow(<AccountAdvancedSearch UserState={userStateData} />);
		expect(wrapper.find(Card).length).toBe(2);
	});

	it('<AdvancedSearchTAndCsModal/> renders without crashing', () => {
		wrapper = shallow(<AdvancedSearchTAndCsModal UserState={userStateData} />);
	});

	it('<AdvancedSearchRequestAccessModal/> renders without crashing', () => {
		wrapper = shallow(<AdvancedSearchRequestAccessModal UserState={userStateData} />);
	});
});
