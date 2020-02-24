
import React from 'react';
import SearchNotFound from '../src/pages/components/SearchNotFound';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchNotFound', () => {
    it('renders without crashing', () => {
        var data = {data:[{id:"test"}]};
        const wrapper = mount(<SearchNotFound />);
    });
});
