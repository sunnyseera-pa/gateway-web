
import React from 'react';
import NotFound from '../src/pages/commonComponents/NotFound';
import { notFound } from './mocks/dataMock';

let wrapper, props;

beforeEach(() => {
  props = notFound;
});


describe('<NotFound /> rendering', () => {
    it('renders NotFound component with "No results found"', () => {
        wrapper = shallow(<NotFound {...props} /> );
        expect(wrapper.find('[data-testid="notFound"]').text()).toEqual('results');
    });

});