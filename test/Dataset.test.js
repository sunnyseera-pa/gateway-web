
import React from 'react';
import DataSet from '../src/pages/components/DataSet';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Dataset', () => {
    it('renders without crashing', () => {
        var data = {data:[{id:"test"}]};
        const wrapper = mount(<DataSet data={data}/>);
    });
});
