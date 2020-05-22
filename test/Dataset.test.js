
import React from 'react';
import DataSet from '../src/pages/commonComponents/DataSet';
import { dataSetState } from './mocks/dataMock';

let wrapper, props;

beforeEach(() => {
  props = dataSetState;
});

describe('<DataSet /> rendering', () => {
    it('renders <DataSet /> component without crashing', () => {
        wrapper = shallow(<DataSet {...props} />);
    });

    it('renders a title with value "Epilepsy 12 - National organisational audit (service descriptor questionnai..."', () => {
        wrapper = shallow(<DataSet {...props} />);
        const title = wrapper.find('[data-testid="dataset-title"]');
        expect(title.text()).toEqual('Epilepsy 12 - National organisational audit (service descriptor questionnai...');
    });

    it('renders a description correctly', () => {
        wrapper = shallow(<DataSet {...props} />);
        const title = wrapper.find('[data-testid="dataset-desc"]');
        expect(title.text()).toEqual(`A dataset comprising a yearly survey of Trusts' paediatric epilepsy services. The dataset covers England and Wales and includ...`);
    });

    it('renders a full title of `Test`', () => {
        wrapper = mount(<DataSet {...props} />);
        wrapper.setProps({
            data: { title: 'Test' }
        });
        const title = wrapper.find('[data-testid="dataset-title"]');
        expect(title.text()).toEqual(`Test`);
    });



});
