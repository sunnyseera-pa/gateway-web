
import React from 'react';
import Reviews from '../src/pages/components/Reviews';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Reviews', () => {
    it('renders without crashing', () => {
        var data = {data:[{id:"test"}]};
        //const wrapper = mount(<Reviews />);
    });
});
