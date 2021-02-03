import React from 'react'; 
import DatasetPage from '../src/pages/dataset/DatasetPage';
import { userStateData } from './mocks/dataMock';

let wrapper; 
const match = { params: { datasetID: '44729553-3fed-4dda-b714-4a351a39fc3d' } };
describe('<DatasetPage />', () => {
    it('renders with <Loading /> component', () => {
		wrapper = shallow(<DatasetPage userState={userStateData} match={match} />);
		expect(wrapper.find('[data-testid="isLoading"]').exists()).toEqual(true);
	});
});
