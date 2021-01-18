import AccountCourses from '../src/pages/dashboard/AccountCourses';
import { accountCoursesData } from './mocks/dataMock';
import { userStateData } from './mocks/dataMock';
import moxios from 'moxios';
import { act } from 'react-dom/test-utils';

let wrapper;

beforeEach(function () { 
	moxios.install();
	wrapper = mount(<AccountCourses userState={userStateData.userState} />);
});

afterEach(function () {
	moxios.uninstall();
	wrapper.unmount(); 
});

describe('<AccountCourses />', () => {
	it('renders with 5 courses and 2 pagination items showing in tab "active"', async done => {
		await moxios.wait(jest.fn);
		await act(async () => {
            let request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 200,
                    response: { data: accountCoursesData.data },
				})
				.then(async () => {
					wrapper.update();
					let courseEntryActive = await wrapper.find('[data-testid="courseEntryActive"]').hostNodes();
                    expect(courseEntryActive.length).toEqual(5);
                    let activePagination = await wrapper.find('[data-testid="activePagination"]').hostNodes();
                    expect(activePagination.length).toEqual(1);
                    let paginationItems = await wrapper.find('[data-testid="activePaginationItem"]').hostNodes();
                    expect(paginationItems.length).toEqual(2);
					done();
				});
		});
	});

    it('renders with 3 courses and 0 pagination items showing in tab "pending"', async done => {
        await moxios.wait(jest.fn);
        await act(async () => {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: { data: accountCoursesData.data },
                })
                .then(async () => {
                    // Simulate a click on the pending tab
                    wrapper.update();
                    await act(async () => {
                        await wrapper.find('[data-testid="courseTabs"]').at(0).prop('onSelect')('pending');
                    });

                    await act(async () => {
                        let request = moxios.requests.at(1);
                        request
                        .respondWith({
                            status: 200,
                            response: { data: accountCoursesData.pendingData },
                        })
                        .then(async () => {
                            wrapper.update();
                            let courseEntryPending = await wrapper.find('[data-testid="courseEntryPending"]').hostNodes();
                            expect(courseEntryPending.length).toEqual(3);
                            let pendingPagination = await wrapper.find('[data-testid="pendingPagination"]').hostNodes();
                            expect(pendingPagination.length).toEqual(0);
                            let paginationItems = await wrapper.find('[data-testid="pendingPaginationItem"]').hostNodes();
                            expect(paginationItems.length).toEqual(0);
                            done();
                        });
                    });
                });
        });
    });

    it('renders with 2 courses and 0 pagination items showing in tab "rejected"', async done => {
        await moxios.wait(jest.fn);
        await act(async () => {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: { data: accountCoursesData.data },
                })
                .then(async () => {
                    // Simulate a click on the rejected tab
                    wrapper.update();
                    await act(async () => {
                        await wrapper.find('[data-testid="courseTabs"]').at(0).prop('onSelect')('rejected');
                    });

                    await act(async () => {
                        let request = moxios.requests.at(1);
                        request
                        .respondWith({
                            status: 200,
                            response: { data: accountCoursesData.rejectedData },
                        })
                        .then(async () => {
                            wrapper.update();
                            let courseEntryRejected = await wrapper.find('[data-testid="courseEntryRejected"]').hostNodes();
                            expect(courseEntryRejected.length).toEqual(2);
                            let rejectedPagination = await wrapper.find('[data-testid="rejectedPagination"]').hostNodes();
                            expect(rejectedPagination.length).toEqual(0);
                            let paginationItems = await wrapper.find('[data-testid="rejectedPaginationItem"]').hostNodes();
                            expect(paginationItems.length).toEqual(0);
                            done();
                        });
                    });
                });
        });
    });

    it('renders with 4 courses and 3 pagination items showing in tab "archive"', async done => {
        await moxios.wait(jest.fn);
        await act(async () => {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: { data: accountCoursesData.data },
                })
                .then(async () => {
                    // Simulate a click on the archive tab
                    wrapper.update();
                    await act(async () => {
                        await wrapper.find('[data-testid="courseTabs"]').at(0).prop('onSelect')('archive');
                    });

                    await act(async () => {
                        let request = moxios.requests.at(1);
                        request
                        .respondWith({
                            status: 200,
                            response: { data: accountCoursesData.archivedData },
                        })
                        .then(async () => {
                            wrapper.update();
                            let courseEntryArchive = await wrapper.find('[data-testid="courseEntryArchive"]').hostNodes();
                            expect(courseEntryArchive.length).toEqual(4);
                            let archivePagination = await wrapper.find('[data-testid="archivePagination"]').hostNodes();
                            expect(archivePagination.length).toEqual(1);
                            let paginationItems = await wrapper.find('[data-testid="archivePaginationItem"]').hostNodes();
                            expect(paginationItems.length).toEqual(3);
                            done();
                        });
                    });
                });
        });
    });
});