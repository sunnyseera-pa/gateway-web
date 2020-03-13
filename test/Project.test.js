
import React from 'react';
import Project from '../src/pages/components/Project';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Project', () => {
    it('renders without crashing', () => {
        var dataProject = {"_id":{"$oid":"5e544facbd427b6e9cd90595"},"tags":{"topics":["Neuroscience","Diabetes","Cancer","Epilepsy","Migraine","Endocrinology","Endocrine & metabolic control - Physiological functions","Neuroendocrinology","Dravet syndrome"]},"toolids":[{"$numberInt":"900000006"}],"id":{"$numberInt":"900000001"},"link":"https://www.academia.edu/34","updatedon":"2020-02-13T00:00:00.000Z","creatorids":[{"$numberInt":"900000015"},{"$numberInt":"900000011"}],"authors":["900000015","900000012"],"categories":{"category":"White paper"},"description":"Ketogenic diets (KD) have been in existence since the 1920s. A 2015 Cochrane Report has validated the use of KD therapy in medication-resistant epilepsy based on numerous published studies. Those who maintain KDs, typically a short term therapy, may receive long-lasting benefits beyond their tenure on the diet. Animal research has shown that KDS have disease-modifying effects in a broad range of neurological disorders. Enhanced energy use in neuronal cells has been a common theme in these studies. Successful use of KD therapies in people with co-morbidities, such as someone who has both epilepsy and diabetes, has opened the door to the applications of the KD beyond epilepsy.","type":"project","name":"Proceedings of Ketogenic Diet Therapies Symposium The Charlie Foundation for Ketogenic Therapies","activeflag":"active","reviews":{"activeflag":"active"},"updatedAt":{"$date":{"$numberLong":"1583853673437"}}};
        const wrapper = mount(<Project data={dataProject}/>);
    });
});
