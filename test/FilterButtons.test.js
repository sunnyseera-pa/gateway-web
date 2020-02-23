
import React from 'react';
import FilterButtons from '../src/pages/components/FilterButtons';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('FilterButtons', () => {
    it('renders without crashing', () => {
        var data = {data:[{id:"test"}]};
        const wrapper = mount(<FilterButtons data={data}/>);
    });
});
