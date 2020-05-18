
import React from 'react';
import Creators from '../src/pages/commonComponents/Creators';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Creators', () => {
    it('renders without crashing', () => {
        var data = {data:[{id:"test"}]};
        //const wrapper = mount(<Creators data={data}/>);
        
        
        
        /* expect(wrapper.find('.foo')).to.have.lengthOf(1);
        expect(wrapper.find('.bar')).to.have.lengthOf(0);
        wrapper.setState({ data: {} });
        expect(wrapper.find('.foo')).to.have.lengthOf(0);
        expect(wrapper.find('.bar')).to.have.lengthOf(1);
        const div = document.createElement('div');
        var test = mount(<Creators/ >);
        expect(test.state()).toEqual({ test: 'tgreg' }); */
        
    });
});
