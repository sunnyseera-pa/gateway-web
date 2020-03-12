
import React from 'react';
import Tool from '../src/pages/components/Tool';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Tool', () => {
    it('renders without crashing', () => {
        var dataTool = {"_id":{"$oid":"5e67aeba61033f6b1afd1a3f"},"categories":{"programmingLanguage":[""],"category":"","programmingLanguageVersion":""},"tags":{"features":[""],"topics":[""]},"authors":[{"$numberLong":"7445336375688558"}],"reviews":[""],"id":{"$numberDouble":"255199130616951"},"type":"tool","name":"testing123","link":"testing123","description":"testing123","license":"","activeflag":"active","updatedon":{"$date":{"$numberLong":"1583853242073"}},"createdAt":{"$date":{"$numberLong":"1583853242076"}},"updatedAt":{"$date":{"$numberLong":"1583853278278"}},"__v":{"$numberInt":"0"},"persons":[]};
        const wrapper = mount(<Tool data={dataTool}/>);
    });
});

