
import React from 'react';
import Person from '../src/pages/commonComponents/Person';
import { personData } from './mocks/dataMock';

describe('<Person /> rendering', () => {
    it('renders without crashing', () => {
        const wrapper = shallow(<Person data={personData}/>);
    });
});
