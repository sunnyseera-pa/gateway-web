import React from 'React';
import { mount } from 'enzyme';
import UpdateRequestModal from '../UpdateRequestModal';
import { updateRequestProps } from '../../../../../utils/__mocks__/DarHelper.mock';

let wrapped;
let props = updateRequestProps;

beforeEach(() => {
  wrapped = mount(
    <UpdateRequestModal {...props }/>
  )
});

afterEach(() => {
  wrapped.unmount();
});

/**
 * Test Script
 * 1. Shows a list of Requested Updates as custodian has selected
 * 2. Shows two buttons 'No, Nevermind' and 'Request Updates'
 * 3. When 'Request Updates' clicked fire event
 */

 describe('UpdateRequestModal component <UpdateRequestModal />', () => {
   it('will display a list of requested changes', () => {

   });

   it('will display `No, Nevermind` button', () => {

   });

   it('will display `Request updates button`', () => {

   });
 });

 describe('UpdateRequestModal actions <UpdateRequestModal />', () => {

 });