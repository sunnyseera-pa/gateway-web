
import React from 'react';
import NotFound from '../src/pages/components/NotFound';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('NotFound', () => {
    it('renders without crashing', () => {
        var data = {data:[{id:"test"}]};
        const wrapper = mount(<NotFound words="test" />);
    });
});
