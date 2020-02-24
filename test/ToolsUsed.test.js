
import React from 'react';
import ToolsUsed from '../src/pages/components/ToolsUsed';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('ToolsUsed', () => {
    it('renders without crashing', () => {
        var data = {data:[{name:"test"}]};
        //const wrapper = mount(<ToolsUsed data={data}/>);
    });
});
