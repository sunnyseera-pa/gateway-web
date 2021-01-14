import React from 'react'; 
import CompleteRegistration from '../src/pages/registration/CompleteRegistration';
import { userStateData } from './mocks/dataMock';

let wrapper; 
const match = { params: { datasetID: '38386886447696744' } };
describe('<CompleteRegistration />', () => {
    it('renders with <Loading /> component', () => {
        mount(<CompleteRegistration userState={userStateData} match={match} />)
        .find('[data-testid="dropdown-button"]')
        .exists()
        .should.equal(true);
	});
});
