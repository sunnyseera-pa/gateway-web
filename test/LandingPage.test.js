
import React from 'react';
import LandingPage from '../src/pages/LandingPage';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('LandingPage', () => {
    it('renders without crashing', () => {
        //var test = mount(<LandingPage />);
        
    });
});
