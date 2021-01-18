import AccountPapers from '../src/pages/dashboard/AccountPapers';
import { accountPapersData } from './mocks/dataMock';
import { userStateData } from './mocks/dataMock';
import moxios from 'moxios';
import { act } from 'react-dom/test-utils';

let wrapper;

beforeEach(function () { 
	moxios.install();
	wrapper = mount(<AccountPapers userState={userStateData.userState} />);
});

afterEach(function () {
	moxios.uninstall();
	wrapper.unmount(); 
});

describe('<AccountPapers />', () => {
	it('renders with 2 papers and 4 pagination items showing in tab "active"', async done => {
		await moxios.wait(jest.fn);
		await act(async () => {
            let request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 200,
                    response: { data: accountPapersData.data },
				})
				.then(async () => {
					wrapper.update();
					let paperEntryActive = await wrapper.find('[data-testid="paperEntryActive"]').hostNodes();
                    expect(paperEntryActive.length).toEqual(2);
                    let activePagination = await wrapper.find('[data-testid="activePagination"]').hostNodes();
                    expect(activePagination.length).toEqual(1);
                    let paginationItems = await wrapper.find('[data-testid="activePaginationItem"]').hostNodes();
                    expect(paginationItems.length).toEqual(4);
					done();
				});
		});
	});

    it('renders with 4 papers and 2 pagination items showing in tab "pending"', async done => {
        await moxios.wait(jest.fn);
        await act(async () => {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: { data: accountPapersData.data },
                })
                .then(async () => {
                    // Simulate a click on the pending tab
                    wrapper.update();
                    await act(async () => {
                        await wrapper.find('[data-testid="paperTabs"]').at(0).prop('onSelect')('pending');
                    });

                    await act(async () => {
                        let request = moxios.requests.at(1);
                        request
                        .respondWith({
                            status: 200,
                            response: { data: accountPapersData.pendingData },
                        })
                        .then(async () => { 
                            wrapper.update();
                            let paperEntryPending = await wrapper.find('[data-testid="paperEntryPending"]').hostNodes();
                            expect(paperEntryPending.length).toEqual(4);
                            let pendingPagination = await wrapper.find('[data-testid="pendingPagination"]').hostNodes();
                            expect(pendingPagination.length).toEqual(1);
                            let paginationItems = await wrapper.find('[data-testid="pendingPaginationItem"]').hostNodes();
                            expect(paginationItems.length).toEqual(2);
                            done();
                        });
                    });
                });
        });
    });

    it('renders with 3 papers and 0 pagination items showing in tab "rejected"', async done => {
        await moxios.wait(jest.fn);
        await act(async () => {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: { data: accountPapersData.data },
                })
                .then(async () => {
                    // Simulate a click on the rejected tab
                    wrapper.update();
                    await act(async () => {
                        await wrapper.find('[data-testid="paperTabs"]').at(0).prop('onSelect')('rejected');
                    });

                    await act(async () => {
                        let request = moxios.requests.at(1);
                        request
                        .respondWith({
                            status: 200,
                            response: { data: accountPapersData.rejectedData },
                        })
                        .then(async () => {
                            wrapper.update();
                            let paperEntryRejected = await wrapper.find('[data-testid="paperEntryRejected"]').hostNodes();
                            expect(paperEntryRejected.length).toEqual(3);
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

    it('renders with 5 papers and 0 pagination items showing in tab "archive"', async done => {
        await moxios.wait(jest.fn);
        await act(async () => {
            let request = moxios.requests.mostRecent();
            request
                .respondWith({
                    status: 200,
                    response: { data: accountPapersData.data },
                })
                .then(async () => {
                    // Simulate a click on the archive tab
                    wrapper.update();
                    await act(async () => {
                        await wrapper.find('[data-testid="paperTabs"]').at(0).prop('onSelect')('archive');
                    });

                    await act(async () => {
                        let request = moxios.requests.at(1);
                        request
                        .respondWith({
                            status: 200,
                            response: { data: accountPapersData.archivedData },
                        })
                        .then(async () => {
                            wrapper.update();
                            let paperEntryArchive = await wrapper.find('[data-testid="paperEntryArchive"]').hostNodes();
                            expect(paperEntryArchive.length).toEqual(5);
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