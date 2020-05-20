
import React from 'react';
import Tool from '../src/pages/commonComponents/Tool';

describe('Tool', () => {
    it('renders without crashing', () => {
        const wrapper = mount(<Tool data={toolData}/>);
    });
});

