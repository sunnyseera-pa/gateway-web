import AccountCollections from '../src/pages/dashboard/AccountCollections';
import { accountCollectionsData } from './mocks/dataMock';
import { userStateData } from './mocks/dataMock';
import moxios from 'moxios';
import { act } from 'react-dom/test-utils';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });

describe('<AccountCollections />', () => {
	beforeEach(function () {
		moxios.install();
	});

	afterEach(function () {
		moxios.uninstall();
	});

	it('renders with <Loading /> component', () => {
		let wrapper = shallow(<AccountCollections userState={userStateData.userState} />);
		expect(wrapper.find('[data-testid="isLoading"]').exists()).toEqual(true);
	});

	it('renders with 5 collections showing in tab "active"', async done => {
		let wrapper = mount(<AccountCollections userState={userStateData.userState} />);

		await moxios.wait(jest.fn);
		await act(async () => {
			let request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 200,
					response: { data: accountCollectionsData.data },
				})
				.then(async () => {
					wrapper.update();
					let collectionEntryActive = await wrapper.find('[data-testid="collectionEntryActive"]').hostNodes();
					expect(collectionEntryActive.length).toEqual(5);
					wrapper.unmount();
					done();
				});
		});
	});

	it('renders collectionEntry not found', async done => {
		let wrapper = mount(<AccountCollections userState={userStateData.userState} />);

		await moxios.wait(jest.fn);
		await act(async () => {
			let request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 200,
					response: { data: [] },
				})
				.then(async () => {
					wrapper.update();
					let collectionEntryNotFound = await wrapper.find('[data-testid="collectionEntryNotFound"]').hostNodes();
					expect(collectionEntryNotFound.exists()).toEqual(true);
					wrapper.unmount();
					done();
				});
		});
	});

	it('renders with 2 collections showing in tab "archive"', async done => {
		let wrapper = mount(<AccountCollections userState={userStateData.userState} />);

		await moxios.wait(jest.fn);
		await act(async () => {
			let request = moxios.requests.mostRecent();
			request
				.respondWith({
					status: 200,
					response: { data: accountCollectionsData.data },
				})
				.then(async () => {
					// 1. Simulate a click on the archive tab
					wrapper.update();
					await act(async () => {
						await wrapper.find('[data-testid="collectionTabs"]').at(0).prop('onSelect')('archive');
					});
					// 2. Find Archived collections
					await wrapper.update();
					let collectionEntryArchive = await wrapper.find('[data-testid="collectionEntryArchive"]').hostNodes();
					// 3. Assert
					expect(collectionEntryArchive.length).toEqual(2);
					wrapper.unmount();
					done();
				});
		});
	});
});
