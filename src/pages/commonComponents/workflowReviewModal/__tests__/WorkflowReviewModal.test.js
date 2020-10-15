
import React from 'react';
import WorkflowReviewModal from '../WorkflowReviewModal';

let wrapper, props;

beforeEach(() => {
  // props = ;
  jest.resetModules();
});

describe('<WorkflowReviewModal /> rendering', () => {
    it('renderes 1 + 1 equals 2', () => {
      expect(1).toEqual(1);
      const mckFN = jest.fn();
      mck('test');
      expect(mckFN).toHaveBeenCalled();
      expect(mckFN).toHaveBeenCalledWith('test');

        // wrapper = shallow(<WorkflowReviewModal {...props} /> );
        // expect(wrapper.find('[data-testid="searchbar"]').text()).toEqual('');
    });

    
});




