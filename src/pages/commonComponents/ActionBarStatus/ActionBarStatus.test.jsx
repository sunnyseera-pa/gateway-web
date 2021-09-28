import React from 'react';
import toJson from 'enzyme-to-json';
import ActionBarStatus from '.';

let wrapper;

describe('Given the ActionBarStatus component', () => {
    describe('When it is rendered', () => {
        beforeAll(() => {
            wrapper = mount(
                <ActionBarStatus
                    dataset={{
                        timestamps: {
                            published: '2021-09-28',
                            submitted: '2021-09-22',
                            rejected: '2021-09-23',
                            archived: '2021-09-29',
                        },
                    }}
                    status="active"
                    totalQuestions={101}
                />
            );
        });

        it('Then matches the previous snapshot', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        describe('And the status is active', () => {
            it('Then has the correct output', () => {
                expect(wrapper.text()).toEqual('This version was published on 28 September 2021');
            });
        });

        describe('And the status is published', () => {
            it('Then has the correct output', () => {
                wrapper.setProps({
                    status: 'draft',
                });

                expect(wrapper.text()).toEqual('101');
            });
        });

        describe('And the status is published', () => {
            it('Then has the correct output', () => {
                wrapper.setProps({
                    status: 'inReview',
                });

                expect(wrapper.text()).toEqual('Submitted for review on 22 September 2021');
            });
        });

        describe('And the status is published', () => {
            it('Then has the correct output', () => {
                wrapper.setProps({
                    status: 'rejected',
                });

                expect(wrapper.text()).toEqual('This version was rejected on 23 September 2021');
            });
        });

        describe('And the status is published', () => {
            it('Then has the correct output', () => {
                wrapper.setProps({
                    status: 'archived',
                });

                expect(wrapper.text()).toEqual(
                    'This version was published on 28 September 2021 and archived on 29 September 2021'
                );
            });
        });

        describe('And there is no status', () => {
            it('Then has no output', () => {
                wrapper.setProps({
                    status: undefined,
                });

                expect(wrapper.text()).toEqual('');
            });
        });
    });
});
