
import React from 'react';
import ProjectTitle from '../src/pages/components/ProjectTitle';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('ProjectTitle', () => {
    it('renders without crashing', () => {
        var dataProject = {
            "tags": [
              "Cancer"
            ],
            "_id": "5e3bf4231c9d440000e8d4a7",
            "id": 89522472,
            "type": "project",
            "name": "Leukemia",
            "description": "Group of blood Cancers.",
            "rating": 4.5,
            "link": "https://en.wikipedia.org/wiki/Leukemia",
            "toolids":[89522470,999999],
            "creator":[89522471,69522471],
            "_v": 0
          };
        const wrapper = mount(<ProjectTitle data={dataProject}/>);
    });
});
