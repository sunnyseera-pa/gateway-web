
import React from 'react';
import Tool from '../src/pages/components/Tool';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Tool', () => {
    it('renders without crashing', () => {
        var dataTool = {
          "tags": [
            "Programming language", "Software/Package"
          ],
          "_id": "5e3bf4231c9d440000e8d4a8",
          "id": 89522470,
          "type": "tool",
          "name": "Homebrew",
          "description": "Provision of packages that you need but not available on your operating system (e.g. Apple MacOS or Linux system).",
          "rating": 5,
          "link": "https://homebrew.link",
          "creator": [89522471],
          "_v": 0
        };
        const wrapper = mount(<Tool data={dataTool}/>);
    });
});
