import React from 'react'; 
import moxios from 'moxios';
import { mount } from 'enzyme';
import DatasetPage from '../src/pages/dataset/DatasetPage';
import { userStateData, datasetPageData } from './mocks/dataMock';
import { act } from 'react-dom/test-utils';

let wrapper; 
const match = { params: { datasetID: '44729553-3fed-4dda-b714-4a351a39fc3d' } };   

//Mocks useHistory()
jest.mock('react-router-dom', () => ({
	useHistory: () => ({
	  push: jest.fn(),
	}),
  }));

describe('<DatasetPage /> rendering', () => {
	beforeEach(function () {
		// import and pass your custom axios instance to this method
		moxios.install();
	});
	afterEach(function () {
		// import and pass your custom axios instance to this method
		moxios.uninstall();
	});

	it('renders with <Loading /> component', () => {
		wrapper = shallow(<DatasetPage userState={userStateData} match={match} />);
		expect(wrapper.find('[data-testid="isLoading"]').exists()).toEqual(true);
	});
});
