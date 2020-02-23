
import React from 'react';
import ToolsCreated from '../src/pages/components/ToolsCreated';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('ToolsCreated', () => {
    it('renders without crashing', () => {
        var data = {data:[{id:"test"}]};
        const wrapper = mount(<ToolsCreated data={data}/>);
    });
});
