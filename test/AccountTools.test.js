import AccountTools from '../src/pages/dashboard/AccountTools';
import { accountToolsData } from './mocks/dataMock';
import { userStateData } from './mocks/dataMock';
import moxios from 'moxios';
import { act } from 'react-dom/test-utils';

let wrapper;

beforeEach(function () {
	moxios.install();
	wrapper = mount(<AccountTools userState={userStateData.userState} />);
});

afterEach(function () {
	moxios.uninstall();
	wrapper.unmount(); 
});

describe('<AccountTools />', () => {
	it('renders with 5 tools and 3 pagination items showing in tab "active"', async done => {
		await moxios.wait(jest.fn);
		await act(async () => {
            let request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 200,
                    response: { data: accountToolsData.data },
				})
				.then(async () => {
                    wrapper.update();
					let toolEntryActive = await wrapper.find('[data-testid="toolEntryActive"]').hostNodes();
                    expect(toolEntryActive.length).toEqual(5);  
                    let activePagination = await wrapper.find('[data-testid="activePagination"]').hostNodes();
                    expect(activePagination.length).toEqual(1);
                    let paginationItems = await wrapper.find('[data-testid="activePaginationItem"]').hostNodes();
                    expect(paginationItems.length).toEqual(3);
					done();
				});
		});
	});

    it('renders with 3 tools and 0 pagination items showing in tab "pending"', async done => {
        await moxios.wait(jest.fn);
        await act(async () => {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: { data: accountToolsData.data },
                })
                .then(async () => {
                    // Simulate a click on the pending tab
                    wrapper.update();
                    await act(async () => {
                        await wrapper.find('[data-testid="toolTabs"]').at(0).prop('onSelect')('pending');
                    });

                    await act(async () => {
                        let request = moxios.requests.at(1);
                        request
                        .respondWith({
                            status: 200,
                            response: { data: accountToolsData.pendingData },
                        })
                        .then(async () => {
                            wrapper.update();
                            let toolEntryPending = await wrapper.find('[data-testid="toolEntryPending"]').hostNodes();
                            expect(toolEntryPending.length).toEqual(3);
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

    it('renders with 2 tools and 2 pagination items showing in tab "rejected"', async done => {
        await moxios.wait(jest.fn);
        await act(async () => {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: { data: accountToolsData.data },
                })
                .then(async () => {
                    // Simulate a click on the rejected tab
                    wrapper.update();
                    await act(async () => {
                        await wrapper.find('[data-testid="toolTabs"]').at(0).prop('onSelect')('rejected');
                    });

                    await act(async () => {
                        let request = moxios.requests.at(1);
                        request
                        .respondWith({
                            status: 200,
                            response: { data: accountToolsData.rejectedData },
                        })
                        .then(async () => {
                            wrapper.update();
                            let toolEntryRejected = await wrapper.find('[data-testid="toolEntryRejected"]').hostNodes();
                            expect(toolEntryRejected.length).toEqual(2);
                            let rejectedPagination = await wrapper.find('[data-testid="rejectedPagination"]').hostNodes();
                            expect(rejectedPagination.length).toEqual(1);
                            let paginationItems = await wrapper.find('[data-testid="rejectedPaginationItem"]').hostNodes();
                            expect(paginationItems.length).toEqual(2);
                            done();
                        });
                    });
                });
        });
    });

    it('renders with 1 tool and 0 pagination items showing in tab "archive"', async done => {
        await moxios.wait(jest.fn);
        await act(async () => {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: { data: accountToolsData.data },
                })
                .then(async () => {
                    // Simulate a click on the archive tab
                    wrapper.update();
                    await act(async () => {
                        await wrapper.find('[data-testid="toolTabs"]').at(0).prop('onSelect')('archive');
                    });

                    await act(async () => {
                        let request = moxios.requests.at(1);
                        request
                        .respondWith({
                            status: 200,
                            response: { data: accountToolsData.archivedData },
                        })
                        .then(async () => {
                            wrapper.update();
                            let toolEntryArchived = await wrapper.find('[data-testid="toolEntryArchive"]').hostNodes();
                            expect(toolEntryArchived.length).toEqual(1);
                            let archivePagination = await wrapper.find('[data-testid="archivePagination"]').hostNodes();
                            expect(archivePagination.length).toEqual(0);
                            let paginationItems = await wrapper.find('[data-testid="archivePaginationItem"]').hostNodes();
                            expect(paginationItems.length).toEqual(0);
                            done();
                        });
                    });
                });
        });
    });
});
