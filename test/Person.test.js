
import React from 'react';
import Person from '../src/pages/commonComponents/Person';
import { personData } from './mocks/dataMock';

beforeEach(() => jest.resetModules());

describe('<Person /> rendering - no projects', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Person data={personData}/>);
    });
});

describe('<Person /> rendering with active link', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Person data={personData} activeLink={ true } />);
    });
});

describe('<Person /> rendering with active link, a project and and two tools', () => {
    personData.objects.push({"type": "project"});
    personData.objects.push({"type": "tool"});

    it('renders without crashing', () => {
        const wrapper = shallow(<Person data={personData} activeLink={ false }/>);
    });
});

/*

describe('<Person /> rendering with active link and two projects', () => {
    personData.objects.push({"type": "project"})

    it('renders without crashing', () => {
        const wrapper = shallow(<Person data={personData} />);
    });
});

describe('<Person /> rendering with active link and two projects', () => {
    personData.objects = [];

    it('renders without crashing', () => {
        const wrapper = shallow(<Person data={personData} />);
    });
});

*/