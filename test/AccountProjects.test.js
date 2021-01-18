import AccountProjects from '../src/pages/dashboard/AccountProjects';
import { accountProjectsData } from './mocks/dataMock';
import { userStateData } from './mocks/dataMock';
import moxios from 'moxios';
import { act } from 'react-dom/test-utils';

let wrapper;

beforeEach(function () { 
	moxios.install();
	wrapper = mount(<AccountProjects userState={userStateData.userState} />);
});

afterEach(function () {
	moxios.uninstall();
	wrapper.unmount(); 
});

describe('<AccountProjects />', () => {
	it('renders with 3 projects and 2 pagination items showing in tab "active"', async done => {
		await moxios.wait(jest.fn);
		await act(async () => {
            let request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 200,
                    response: { data: accountProjectsData.data },
				})
				.then(async () => {
					wrapper.update();
					let projectEntryActive = await wrapper.find('[data-testid="projectEntryActive"]').hostNodes();
                    expect(projectEntryActive.length).toEqual(3);
                    let activePagination = await wrapper.find('[data-testid="activePagination"]').hostNodes();
                    expect(activePagination.length).toEqual(1);
                    let paginationItems = await wrapper.find('[data-testid="activePaginationItem"]').hostNodes();
                    expect(paginationItems.length).toEqual(2);
					done();
				});
		});
	});

    it('renders with 2 projects and 0 pagination items showing in tab "pending"', async done => {
        await moxios.wait(jest.fn);
        await act(async () => {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: { data: accountProjectsData.data },
                })
                .then(async () => {
                    // Simulate a click on the pending tab
                    wrapper.update();
                    await act(async () => {
                        await wrapper.find('[data-testid="projectTabs"]').at(0).prop('onSelect')('pending');
                    });

                    await act(async () => {
                        let request = moxios.requests.at(1);
                        request
                        .respondWith({
                            status: 200,
                            response: { data: accountProjectsData.pendingData },
                        })
                        .then(async () => {
                            wrapper.update();
                            let projectEntryPending = await wrapper.find('[data-testid="projectEntryPending"]').hostNodes();
                            expect(projectEntryPending.length).toEqual(2);
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

    it('renders with 1 project and 0 pagination items showing in tab "rejected"', async done => {
        await moxios.wait(jest.fn);
        await act(async () => {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: { data: accountProjectsData.data },
                })
                .then(async () => {
                    // Simulate a click on the rejected tab
                    wrapper.update();
                    await act(async () => {
                        await wrapper.find('[data-testid="projectTabs"]').at(0).prop('onSelect')('rejected');
                    });

                    await act(async () => {
                        let request = moxios.requests.at(1);
                        request
                        .respondWith({
                            status: 200,
                            response: { data: accountProjectsData.rejectedData },
                        })
                        .then(async () => {
                            wrapper.update();
                            let projectEntryRejected = await wrapper.find('[data-testid="projectEntryRejected"]').hostNodes();
                            expect(projectEntryRejected.length).toEqual(1);
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

    it('renders with 4 projects and 3 pagination items showing in tab "archive"', async done => {
        await moxios.wait(jest.fn);
        await act(async () => {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: { data: accountProjectsData.data },
                })
                .then(async () => {
                    // Simulate a click on the archive tab
                    wrapper.update();
                    await act(async () => {
                        await wrapper.find('[data-testid="projectTabs"]').at(0).prop('onSelect')('archive');
                    });

                    await act(async () => {
                        let request = moxios.requests.at(1);
                        request
                        .respondWith({
                            status: 200,
                            response: { data: accountProjectsData.archivedData },
                        })
                        .then(async () => {
                            wrapper.update();
                            let projectEntryArchive = await wrapper.find('[data-testid="projectEntryArchive"]').hostNodes();
                            expect(projectEntryArchive.length).toEqual(4);
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