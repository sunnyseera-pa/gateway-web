import React from 'react'; 
import CompleteRegistration from '../src/pages/registration/CompleteRegistration';
import { userStateData } from './mocks/dataMock';

let wrapper;
const match = { params: { personID: 38386886447696744 } }; 

describe('<CompleteRegistration />', () => {
    it('renders with <Loading /> component', () => {
		wrapper = shallow(<CompleteRegistration userState={userStateData} match={match} />);
		expect(wrapper.find('[data-testid="isLoading"]').exists()).toEqual(true);
    });

    it('renders with <YourAccountForm /> component', () => {
        wrapper = shallow(<CompleteRegistration match={match} />);
        wrapper.setState({ isLoading: false });
		expect(wrapper.find('[data-testid="your-account"]').exists()).toEqual(true);
    });

    it('renders with the "Your Details" section part of form', () => {
        wrapper = shallow(<CompleteRegistration match={match} />);
        wrapper.setState({ isLoading: false });
        expect(wrapper.find('[data-testid="your-account"]').dive().find('[data-testid="your-details"]').exists()).toEqual(true);
    });

    it('form fields allows typing', () => {
        wrapper = shallow(<CompleteRegistration match={match} />);
        wrapper.setState({ isLoading: false });
        const mockEvent = {
			target: { 
                name: 'firstname',
                value: 'hello'
             },
		};
        expect(wrapper.find('[data-testid="your-account"]').dive().find('[data-testid="first-name"]').simulate('change', mockEvent));
    });

    it('dropdown allows click', () => {
        wrapper = shallow(<CompleteRegistration match={match} />);
        wrapper.setState({ isLoading: false });
        expect(wrapper.find('[data-testid="your-account"]').dive().find('[data-testid="dropdown-button"]').simulate('click'));
    });

    it('typeahead allows updating', () => {
        wrapper = shallow(<CompleteRegistration match={match} />);
        wrapper.setState({ isLoading: false });
        const mockEvent = ["Genomics England"];
        expect(wrapper.find('[data-testid="your-account"]').dive().find('[data-testid="typeahead"]').simulate('click'));
        expect(wrapper.find('[data-testid="your-account"]').dive().find('[data-testid="typeahead"]').simulate('change', mockEvent));
    });
});