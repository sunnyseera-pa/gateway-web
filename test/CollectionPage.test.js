import React, { useState as useStateMock } from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';
import CollectionPage from '../src/pages/collections/CollectionPage';
import RelatedObject from '../src/pages/commonComponents/relatedObject/RelatedObject';
import { userStateData, collectionPageData, tryData } from './mocks/dataMock';
import { act } from 'react-dom/test-utils';

let wrapper; 
// const match = { params: { collectionID: 5506469491028065 } };  
const match = { params: { collectionID: 5252501631473394 } };  

// jest.mock('react', () => ({
// 	...jest.requireActual('react'),
// 	useState: jest.fn(),
//   }))

//   describe('<CollectionPage />  useState', () => {
// 	const setState = jest.fn()
  
// 	beforeEach(() => {
// 	  useStateMock.mockImplementation(init => [init, setState])
// 	})
  
// 	it('renders', () => {
// 		wrapper = mount(
// 			<CollectionPage 
// 				userState={userStateData} 
// 				match={match} 
// 			/>
// 		);

// 		expect(setState).toHaveBeenCalledTimes(1)
// 		expect(wrapper).toBeTruthy()
// 	})
//   })

// const ids = {
//     objectData1: "input[data-testid='objectData1']",
// };

// describe("Modifying Inputs", () => {
// 	const component = shallow(
// 		<Calculator result={""} isBusy={false} calculate={jest.fn()}/>
// 	);

// 	//Can directly set state for the test
// 	it("Set Input 1", () => {
// 		component.setState({input1: 99});

// 		expect(component.find(ids.input1).first().props().value)
// 			.toEqual(99);
// 	});
// });

// describe('<CollectionPage /> renders x <RelatedObject /> components', () => {
// 	const container = shallow(<CollectionPage userState={userStateData} match={match} />);
// });

describe('<CollectionPage /> rendering moxios', () => {
	beforeEach(function () {
		// import and pass your custom axios instance to this method
		moxios.install();
	});
	afterEach(function () {
		// import and pass your custom axios instance to this method
		moxios.uninstall();
	});


	it('renders with 1 tool showing in tab "Tools"', async done => {
		 wrapper = mount( 
			<CollectionPage 
				userState={userStateData} 
				match={match} 
			/>
		);
		
		await moxios.wait(jest.fn);
		await act(async () => {
			console.log('INSIDE moxios.wait()');
			// let request = moxios.requests.mostRecent();
			let request = moxios.requests.at(0); 
			// let request1 = moxios.requests.at(1);
			console.log(`request - ${JSON.stringify(request, null, 2)}`)
			// console.log(`request1 - ${JSON.stringify(request1, null, 2)}`)
			request
				.respondWith({
					status: 200,
					response: { 
						success: true,
						data: tryData.data, 
					},
				})
				.then(async () => {
					console.log('before timeout');
					// setTimeout(() => {
		setTimeout(async() => {
						console.log('in timeout')
						wrapper.update();
		// await act(async () => {
						let request1 = moxios.requests.at(1);
						console.log(`request1 - ${JSON.stringify(request1, null, 2)}`)
						request1
						.respondWith({
							status: 200,
							response: { 
								success: true,
								data: tryData.courseObjectData
							},
						})
						.then(async () => {
		// await act(async () => {
		
							let request2 = moxios.requests.at(2);
							console.log(`request2 - ${JSON.stringify(request2, null, 2)}`)

							request2
							.respondWith({
							status: 200,
							response: { 
								success: true,
								data: tryData.toolObjectData
							},
						})
							wrapper.update();
							// expect(wrapper.find(RelatedObject).length).toEqual(1); 
							// expect(wrapper.find(RelatedObject).length).toBe(1); 
							expect(wrapper.find('[data-testid="collectionName"]').exists()).toEqual(true);

							// let collectionName = await wrapper.find('[data-testid="collectionName"]').hostNodes();
							// wrapper.update();
							// expect(collectionName.exists()).toEqual(true);
							// expect(collectionName.length).toEqual(1);
							done();

						});
		// });
		// });
					   }, 3000);
					console.log('after timeout');
				});
		});

	});

	// it('loads the correct collection info', async done => {
	// 	wrapper = mount(
	// 		<CollectionPage 
	// 			userState={userStateData}  
	// 			match={match} 
	// 		/>
	// 	);
		
	// 	await moxios.wait(jest.fn);
	// 	await act(async () => {
	// 		console.log('INSIDE moxios.wait()');
	// 		// let request = moxios.requests.mostRecent();
	// 		let request = moxios.requests.at(0); 
	// 		request
	// 			.respondWith({
	// 				status: 200,
	// 				response: { 
	// 					success: true,
	// 					data: tryData.data,
	// 					objectData: tryData.objectData
	// 				},
	// 			})
	// 			.then(async () => {
	// 				console.log(' a in then');
	// 				// jest.setTimeout(300000); 
	// 				// setTimeout(() => {
	// 				setTimeout(async() => {
	// 					console.log('in timeout')
	// 					wrapper.update();
	// 					// expect(wrapper.find('[data-testid="collectionName"]').exists()).toEqual(true);

	// 				let collectionName = await wrapper.find('[data-testid="collectionName"]').hostNodes();
	// 				expect(collectionName.exists()).toEqual(true);
	// 				// wrapper.update();
	// 				// expect(collectionName.length).toEqual(5);
	// 				// expect(wrapper.find(RelatedObject).length).toBe(2); 
	// 				// expect(wrapper.find('[data-testid="collectionName"]').exists()).toEqual(true);

	// 					done();
	// 				   }, 3000);
	// 				console.log('a in then - after timer');
	// 				// wrapper.update();
	// 				// let collectionEntryActive = await wrapper.find('[data-testid="collectionEntryActive"]').hostNodes();
	// 				// expect(collectionEntryActive.exists()).toEqual(true);
	// 				// wrapper.update();
	// 				// expect(collectionEntryActive.length).toEqual(5);
	// 				// expect(wrapper.find(RelatedObject).length).toBe(2); 
	// 				// expect(wrapper.find('[data-testid="collectionName"]').exists()).toEqual(true);

	// 				// expect(wrapper.find(RelatedObject).length).toEqual(2); 
	// 				// done();
	// 			});
	// 	});
	// });



	// it('calls appropriate url request', async done => {
	// 	wrapper = mount(
	// 		<CollectionPage 
	// 			userState={userStateData} 
	// 			match={match} 
	// 		/>
	// 	);
		  
	// 	moxios.wait(async() => {
	// 		let request = await moxios.requests.mostRecent();
	// 		let request1 = await moxios.requests.at(0);

	// 			expect(request.config.url).toEqual('http://localhost:3001/api/v1/collections/5252501631473394')
	// 			expect(request1.config.url).toEqual('http://localhost:3001/api/v1/collections/5252501631473394')
	// 			done();
	// 	});
	//   });

});
 



describe('<CollectionPage /> rendering', () => {
	
	it('renders without crashing', () => {
		wrapper = shallow(<CollectionPage userState={userStateData} match={match} />);
	});

	it('renders with <Loading /> component', () => {
		wrapper = shallow(<CollectionPage userState={userStateData} match={match} />);
		expect(wrapper.find('[data-testid="isLoading"]').exists()).toEqual(true);
	});

// 	// it('renders 4 <RelatedObject /> components in tab "All"', () => { 
// 	// 	wrapper = shallow(<CollectionPage userState={userStateData} match={match} />);
// 	// 	wrapper.setState({ isLoading: false, key: 'All', data: collectionPageData.data, objectData: collectionPageData.objectData });
// 	// 	expect(wrapper.find(RelatedObject).length).toBe(4);
// 	// });

// 	// it('renders 1 <RelatedObject /> component in tab "Datasets"', () => {
// 	// 	wrapper = shallow(<CollectionPage userState={userStateData} match={match} />);
// 	// 	wrapper.setState({ isLoading: false, key: 'Datasets', data: collectionPageData.data, objectData: collectionPageData.objectData });
// 	// 	expect(wrapper.find(RelatedObject).length).toBe(1);
// 	// });

// 	// it('renders 2 <RelatedObject /> components in tab "Tools"', () => {
// 	// 	wrapper = shallow(<CollectionPage userState={userStateData} match={match} />);
// 	// 	wrapper.setState({ isLoading: false, key: 'Tools', data: collectionPageData.data, objectData: collectionPageData.objectData });
// 	// 	expect(wrapper.find(RelatedObject).length).toBe(2);
// 	// });
	

// 	// it('renders 2 <RelatedObject /> components in tab "Tools"', () => {
// 	// 	wrapper = shallow(<CollectionPage userState={userStateData} match={match} />);
// 	// 	// wrapper = shallow(<CollectionPage userState={userStateData} objectData={collectionPageData.objectData} isLoading= {false} key={'Tools'} match={match} />);

// 	// 	// wrapper.find(objectData).simulate('change', {
// 	// 	// 	target: {
// 	// 	// 	  value: 'somenewpassword ',
// 	// 	// 	},
// 	// 	//   });

// 	// 	// wrapper.setState({ isLoading: false, key: 'Tools', objectData: collectionPageData.objectData });
// 	// 	expect(wrapper.find(RelatedObject).length).toBe(2); 
// 	// });

// 	// it('renders 1 <RelatedObject /> component in tab "Projects"', () => {
// 	// 	wrapper = shallow(<CollectionPage userState={userStateData} match={match} />);
// 	// 	wrapper.setState({ isLoading: false, key: 'Projects', data: collectionPageData.data, objectData: collectionPageData.objectData });
// 	// 	expect(wrapper.find(RelatedObject).length).toBe(1);
// 	// });

// 	// it('does not render any <RelatedObject /> components in tab "Papers"', () => {
// 	// 	wrapper = shallow(<CollectionPage userState={userStateData} match={match} />);
// 	// 	wrapper.setState({ isLoading: false, key: 'Papers', data: collectionPageData.data, objectData: collectionPageData.objectData });
// 	// 	expect(wrapper.find(RelatedObject).length).toBe(0);
// 	// });

// 	// it('does not render any <RelatedObject /> components in tab "People"', () => {
// 	// 	wrapper = shallow(<CollectionPage userState={userStateData} match={match} />);
// 	// 	wrapper.setState({ isLoading: false, key: 'People', data: collectionPageData.data, objectData: collectionPageData.objectData });
// 	// 	expect(wrapper.find(RelatedObject).length).toBe(0);
// 	// });
// });

// test('useState mock', () => {
// 	// const myInitialState = collectionPageData.objectData; 
// 	const initailaStateForObjectData = collectionPageData.objectData;
// 	const initailaStateForKey = 'Tools';
// 	const initailaStateForIsLoading = false;
// 	const initailStateForCollectionData = collectionPageData.data;
 
// 	// console.log( `myInitialState ${JSON.stringify(myInitialState, null, 2)}` )
// 	// React.useState = jest.fn().mockReturnValue([myInitialState, {}])

// 	// React.useState = jest.fn().mockReturnValue([objectData, {}])
// 	// React.useState = jest.fn().mockReturnValue([key, {}])
// 	// React.useState = jest.fn().mockReturnValue([isLoading, {}])

// 	React.useState = jest.fn()
// 		.mockReturnValueOnce([initailaStateForObjectData, {}])
// 		.mockReturnValueOnce([initailaStateForKey, {}])
// 		.mockReturnValueOnce([initailaStateForIsLoading, {}])
// 		.mockReturnValueOnce([initailStateForCollectionData, {}])
	
// 	const wrapper = shallow((<CollectionPage userState={userStateData} match={match} />))
// 	// console.log( `initailaStateForObjectData ${JSON.stringify(initailaStateForObjectData, null, 2)}` )

// 	expect(wrapper.find(RelatedObject).length).toBe(2); 
 
// 	// initial state is set and you can now test your component 
 }
);


// in MyComponent.js

// import React from 'react'

// const [myFirstState, setMyFirstState] = React.useState();
// const [mySecondState, setMySecondState] = React.useState();

// // in MyComponent.test.js

// test('useState mock', () => {
//    const initialStateForFirstUseStateCall = 'My First Initial State'
//    const initialStateForSecondUseStateCall = 'My Second Initial State'

//    React.useState = jest.fn()
//      .mockReturnValueOnce([initialStateForFirstUseStateCall, {}])
//      .mockReturnValueOnce([initialStateForSecondUseStateCall, {}])
   
//    const wrapper = shallow(<MyComponent />)

//    // initial states are set and you can now test your component 
// }
// actually testing of many `useEffect` calls sequentially as shown
// above makes your test fragile. I would recommend to use 
// `useReducer` instead.