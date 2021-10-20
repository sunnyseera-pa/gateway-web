import * as Sentry from '@sentry/react';
import axios from 'axios';
import _, { upperFirst } from 'lodash';
import queryString from 'query-string';
import React from 'react';
import { Alert, Button, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import { NotificationContainer } from 'react-notifications';
import SVGIcon from '../../images/SVGIcon';
import googleAnalytics from '../../tracking';
import service from '../../services/search';
import serviceAuth from '../../services/auth';
import AdvancedSearchModal from '../commonComponents/AdvancedSearchModal/AdvancedSearchModal';
import DataSetModal from '../commonComponents/dataSetModal/DataSetModal';
import DataUtilityWizardModal from '../commonComponents/DataUtilityWizard/DataUtilityWizardModal';
import ErrorModal from '../commonComponents/errorModal';
import Loading from '../commonComponents/Loading';
import SavedPreferencesModal from '../commonComponents/savedPreferencesModal/SavedPreferencesModal';
import SaveModal from '../commonComponents/saveModal/SaveModal';
import SearchBar from '../commonComponents/searchBar/SearchBar';
import SearchResults from '../commonComponents/SearchResults';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';
import UserMessages from '../commonComponents/userMessages/UserMessages';
import CollectionsSearchResults from './components/CollectionsSearchResults/CollectionsSearchResults';
import CollectionsSearchSort from './components/CollectionsSearchResults/CollectionsSearchSort';
import CoursesSearchResults from './components/CoursesSearchResults';
import DatasetSearchResults from './components/DatasetSearchResults';
import DatasetSearchSort from './components/DatasetSearchResults/DatasetSearchSort';
import Filter from './components/Filter';
import FilterSelection from './components/FilterSelection';
import PapersSearchSort from './components/PapersSearchResults/PapersSearchSort';
import PeopleSearchSort from './components/PeopleSearchResult/PeopleSearchSort';
import ProjectsSearchSort from './components/ProjectsSearchResults/ProjectsSearchSort';
import SearchFilters from './components/SearchFilters';
import SearchUtilityBanner from './components/SearchUtilityBanner';
import ToolsSearchSort from './components/ToolsSearchResults/ToolsSearchSort';
import './Search.scss';

let baseURL = require('../commonComponents/BaseURL').getURL();

const typeMapper = {
	Datasets: 'dataset',
	Tools: 'tool',
	Projects: 'project',
	Papers: 'paper',
	People: 'person',
	Courses: 'course',
	Collections: 'collection',
};

const indexNames = ['datasetIndex', 'toolIndex', 'projectIndex', 'paperIndex', 'personIndex', 'courseIndex', 'collectionIndex'];
const sortNames = ['datasetSort', 'toolSort', 'projectSort', 'paperSort', 'personSort', 'courseSort', 'collectionSort'];
const filterNames = ['Datasets', 'Tools', 'Projects', 'Papers', 'Courses', 'Collections'];

const initialState = {
	selectedV2Datasets: [],
	selectedV2Tools: [],
	selectedV2Projects: [],
	selectedV2Papers: [],
	selectedV2Collections: [],
	selectedV2Courses: [],
	datasetIndex: 0,
	toolIndex: 0,
	projectIndex: 0,
	paperIndex: 0,
	personIndex: 0,
	courseIndex: 0,
	collectionIndex: 0,
	datasetSort: '',
	toolSort: '',
	projectSort: '',
	paperSort: '',
	personSort: '',
	courseSort: '',
	collectionSort: '',
};

class SearchPage extends React.Component {
	state = {
		search: '',
		datasetData: [],
		toolData: [],
		projectData: [],
		paperData: [],
		personData: [],
		courseData: [],
		collectionData: [],
		filterOptions: [],
		allFilters: [],
		toolCategoriesSelected: [],
		toolProgrammingLanguageSelected: [],
		toolfeaturesSelected: [],
		toolTopicsSelected: [],
		projectCategoriesSelected: [],
		projectFeaturesSelected: [],
		projectTopicsSelected: [],
		paperFeaturesSelected: [],
		paperTopicsSelected: [],
		courseStartDatesSelected: [],
		courseProviderSelected: [],
		courseLocationSelected: [],
		courseStudyModeSelected: [],
		courseAwardSelected: [],
		courseEntryLevelSelected: [],
		courseDomainsSelected: [],
		courseKeywordsSelected: [],
		courseFrameworkSelected: [],
		coursePrioritySelected: [],
		collectionKeywordsSelected: [],
		collectionPublishersSelected: [],
		summary: [],
		key: 'Datasets',
		isLoading: true,
		isResultsLoading: true,
		showDrawer: false,
		showModal: false,
		showAdvancedSearchModal: false,
		showSavedPreferencesModal: false,
		showSavedModal: false,
		context: {},
		userState: [
			{
				loggedIn: false,
				role: 'Reader',
				id: null,
				name: null,
			},
		],
		filtersV2Datasets: [],
		filtersV2Tools: [],
		filtersV2Projects: [],
		filtersV2Papers: [],
		filtersV2Collections: [],
		filtersV2Courses: [],
		savedSearchPanel: true,
		saveSuccess: false,
		showLoggedInModal: true,
		showSavedName: '',
		perferencesSort: '',
		savedFilters: [],
		showDataUtilityWizardModal: false,
		showDataUtilityBanner: false,
		activeDataUtilityWizardStep: 1,
		...initialState,
	};

	constructor(props) {
		super(props);
		let { search = '', tab = 'Datasets' } = queryString.parse(window.location.search);
		if (!Object.keys(typeMapper).some(key => key === tab)) {
			window.location.href = '/search?search=&tab=Datasets';
		}
		this.state.userState = props.userState;
		this.state.search = !_.isEmpty(search) ? search : props.location.search;
		this.searchBar = React.createRef();
		this.updateFilterStates = this.updateFilterStates.bind(this);
		this.doSearchCall = this.doSearchCall.bind(this);
		this.openDataUtilityWizard = this.openDataUtilityWizard.bind(this);
		this.toggleDataUtilityBanner = this.toggleDataUtilityBanner.bind(this);
		this.onWizardStepChange = this.onWizardStepChange.bind(this);
	}

	hideSavedPreferencesModal = () => {
		this.setState({ showSavedPreferencesModal: false });
	};

	hideSavedModal = () => {
		this.setState({ showSavedModal: false });
	};

	hideNoSaveSearchModal = () => {
		this.setState({ showSavedModal: false });
		this.setState({ saveSuccess: false });
	};

	showSuccessMessage = () => {
		this.setState({ saveSuccess: true });
	};

	showSavedName = data => {
		this.setState({ showSavedName: data });
	};

	toggleAdvancedSearchModal = () => {
		if (!this.state.showAdvancedSearchModal) {
			googleAnalytics.recordVirtualPageView('Advanced search modal');
		}
		this.setState(prevState => {
			return { showAdvancedSearchModal: !prevState.showAdvancedSearchModal };
		});
	};

	openDataUtilityWizard(activeStep) {
		this.setState({ showDataUtilityWizardModal: true, activeDataUtilityWizardStep: activeStep });
	}

	onWizardStepChange(activeStep) {
		this.setState({ activeDataUtilityWizardStep: activeStep });
	}

	toggleDataUtilityBanner(show) {
		this.setState({ showDataUtilityBanner: show });
	}

	toggleDataUtilityWizardModal = () => {
		this.setState({ showDataUtilityWizardModal: false });
	};

	showLoginModal = () => {
		// 1. add class to body to stop background scroll
		document.body.classList.add('modal-open');

		document.getElementById('myModal').style.display = 'block';
		document.getElementById('loginWayFinder').style.display = 'none';
		document.getElementById('loginButtons').style.display = 'block';
		document.getElementById('loginModalTitle').innerHTML = 'Sign in or create a new account';
		document.getElementById('modalRequestSection').style.display = 'none';

		window.onclick = function (event) {
			if (event.target === document.getElementById('myModal')) {
				// 2. remove class modal-open from body
				document.body.classList.remove('modal-open');
				document.getElementById('myModal').style.display = 'none';
			}
		};
	};
	async componentDidMount() {
		// 1. fires on first time in or page is refreshed/url loaded / has search location
		if (!!window.location.search) {
			console.log(window.location);

			const urlParams = new URLSearchParams(window.location.search);
			const tab = urlParams.get('tab');
			if (tab) {
				this.setState({ key: tab });
			}
			// 2. call Filters
			await this.getGlobals();

			// 3. splits location search into object { search: search, tab: Datasets}
			let queryParams = queryString.parse(window.location.search);
			// 4. if values has loginReferrer set location href to it.
			if (this.state.userState[0].loggedIn && queryParams.loginReferrer) {
				window.location.href = queryParams.loginReferrer;
			}
			// 5. if logout in params and is true redirect to logout and reload route
			else if (this.state.userState[0].loggedIn && queryParams.logout === 'true') {
				serviceAuth.getLogout().then(() => {
					window.location.reload();
				});
			}
			// 6. if openUserMessages is true open the user messages
			else if (this.state.userState[0].loggedIn && queryParams.openUserMessages === 'true') {
				this.toggleDrawer();
			}
			// 7. if openAdvancedSearch is true open the user messages
			else if (queryParams.openAdvancedSearch === 'true') {
				this.toggleAdvancedSearchModal();
			}
			// 8. set the selectedFilter states from queryParams ** does not return anything **
			await this.updateFilterStates(queryParams);
			// 9. call search API
			this.doSearchCall();
		} else {
			this.setState({ data: [], search: '', isLoading: true });
			this.doSearchCall();
		}
	}

	async componentWillReceiveProps() {
		let queryParams = queryString.parse(window.location.search);
		// 1. if tabs are different update
		if (this.state.key !== queryParams.tab) {
			this.setState({ key: queryParams.tab || 'Datasets' });
		}
	}

	doSearch = e => {
		// fires on enter on searchbar
		if (e.key === 'Enter') {
			// reload window and test for search if entered
			this.setState({ isResultsLoading: true }, () => {
				this.clearFilterStates();
			});
		}
	};

	doClear = e => {
		this.setState({ isResultsLoading: true, search: '' }, () => {
			this.clearFilterStates();
		});
	};

	/**
	 * FindImpliedFilterNode
	 *
	 * @desc 		Finds a relevant node item by cross referencing all filters with a selection of implied values
	 * @param		{array} filters
	 * @param		{string} label
	 * @return	{object} object of {label, value...}
	 */
	findImpliedFilterNode = (filters = [], impliedValues) => {
		if (!_.isEmpty(filters)) {
			const formattedValues = impliedValues
				.split('::')
				.map(value => value.toLowerCase())
				.join(',');
			// TODO - align input from data utility wizard and url so that if function is not needed
			let returnValue = [...filters].find(node => node.value.toLowerCase() === formattedValues) || {};
			if (!_.isEmpty(returnValue)) {
				return returnValue;
			} else {
				return [...filters].find(node => node.impliedValues.toString().toLowerCase() === formattedValues) || {};
			}
		}
		return {};
	};

	/**
	 * @desc      Turns keys into array for looping ['publisher', 'phenotype']
	 * @param {*} filtersV2
	 * @param {*} selectedV2
	 * @param {*} queryParams
	 */
	setSelectedFiltersFromQueryParams = async (filtersV2, selectedV2, queryParams, tab) => {
		if (!_.isEmpty(Object.keys(queryParams))) {
			// 3. loop over queryKeys
			for (const key of Object.keys(queryParams)) {
				if (!_.isNil(queryParams[key])) {
					// 4. convert queryString into array of values
					let queryValues = queryParams[key].split('::');
					// 5. check if key exists in our tree, return {} or undefined
					let parentNode = this.findParentNode(filtersV2, key);
					if (!_.isNil(parentNode)) {
						let { filters } = parentNode;
						// 6. Determine whether to perform regular filter selection or implied filter selection
						const isImpliedFilter = filters.some(filter => _.has(filter, 'impliedValues'));
						let nodes = [];
						if (isImpliedFilter) {
							// find node by implied values
							let foundNode = this.findImpliedFilterNode(filters, queryParams[key]);
							if (!_.isEmpty(foundNode)) {
								nodes.push(foundNode);
							}
						} else {
							// loop over query values
							queryValues.forEach(node => {
								// get the selected values
								let foundNode = this.findNode(filters, node);
								if (!_.isEmpty(foundNode)) {
									nodes.push(foundNode);
								}
							});
						}
						nodes.forEach(node => {
							// 7. set check value
							node.checked = !node.checked;
							// 8. increment highest parent count
							parentNode.selectedCount += 1;
							// 9. prep new selected Item for selected showing
							let selectedNode = {
								parentKey: key,
								id: node.id,
								label: node.label,
								value: node.value,
							};
							// 10. fn for handling the *selected showing* returns new state
							let selected = this.handleSelected(selectedNode, node.checked, tab);
							// 11. update selectedV2 array with our new returned value
							selectedV2 = [...new Set([...selectedV2, ...selected])];
						});
					}
				}
			}
			// 12. set the state of filters and selected options
			const entity = upperFirst(tab);
			this.setState({ [`filtersV2${entity}s`]: filtersV2, [`selectedV2${entity}s`]: selectedV2 });
		}
	};

	/**
	 * UpdateFilterStates
	 *
	 * @desc Sets selectedStates for filters including search string
	 */
	async updateFilterStates(queryParams) {
		filterNames.forEach(key => {
			if (!_.isEmpty(this.state[`filtersV2${key}`])) {
				const filtersV2 = [...this.state[`filtersV2${key}`]];
				const selectedV2 = [...this.state[`selectedV2${key}`]];
				this.setSelectedFiltersFromQueryParams(filtersV2, selectedV2, queryParams, typeMapper[key]);
			}
		});

		// 14. original filters setting of data remove if entity moves to V2 for correct filter
		queryParams.search ? this.setState({ search: queryParams.search }) : this.setState({ search: '' });
		queryParams.tab ? this.setState({ key: queryParams.tab }) : this.setState({ key: 'Datasets' });

		indexNames.forEach(key => {
			this.setState({ [key]: queryParams[key] || 0 });
		});

		sortNames.forEach(key => {
			this.setState({ [key]: queryParams[key] || '' });
		});
	}

	clearFilterStates() {
		let filters = {};

		filterNames.forEach(key => {
			const filterKey = `filtersV2${key}`;
			const data = !_.isNil(this.state[filterKey]) ? [...this.state[filterKey]] : [];
			filters[filterKey] = this.resetTreeChecked(data);
		});

		this.setState(
			() => ({
				...initialState,
				...filters,
			}),
			() => {
				this.doSearchCall();
			}
		);
	}

	updateOnFilterBadge = (filterGroup, filter) => {
		// 1. test type of filter if v2 it will be an object
		if (typeof filter === 'object' && !_.isEmpty(filter)) {
			// 2. title case to match the backend cache implmentation of label value
			let { parentKey, label } = filter;
			let node = {
				parentKey,
				label: label,
			};
			// 3. the filter will contain {label, parentKey (parentKey is defined the filters.mapper API)}
			this.handleInputChange(node, parentKey, true);
		} else {
			return;
		}
	};

	doSearchQuery(textSearch, searchURL) {
		const { search, key } = this.state;

		service
			.getSearch(`${encodeURIComponent(textSearch ? textSearch : search)}${searchURL}`)
			.then(res => {
				const entityType = typeMapper[key];
				const {
					[`${entityType}Results`]: { data = [] },
					summary = [],
				} = res.data;

				this.setState(prevState => {
					return {
						[`${entityType}Data`]: data,
						isLoading: false,
						isResultsLoading: false,
						saveSuccess: false,
						summary,
						search: textSearch ? textSearch : prevState.search,
					};
				});

				window.scrollTo(0, 0);
			})
			.catch(err => {
				console.error(err.message);
			});
	}

	doFilterQuery(textSearch, searchURL) {
		const { search, key } = this.state;

		service
			.getFilterBy(`${encodeURIComponent(textSearch ? textSearch : search)}${searchURL}`)
			.then(res => {
				const filters = this.getFilterState(res);

				if (filterNames.includes(key)) {
					const filterKey = `filtersV2${key}`;
					const currentFilters = this.state[filterKey] || [];
					this.setState({ [filterKey]: this.setHighlightedFilters(filters, [...currentFilters]) });
				} else {
					this.setState({ ...filters });
				}
			})
			.catch(err => {
				console.error(err.message);
			});
	}

	getLoginReferrer() {
		const { userState } = this.state;
		const values = queryString.parse(window.location.search);
		let url = '';

		if (values && values.showLogin === 'true' && userState[0].loggedIn === false) {
			if (!!values.loginReferrer) {
				url = '&loginReferrer=' + encodeURIComponent(values.loginReferrer);
			} else if (!!document.referrer) {
				url = '&loginReferrer=' + encodeURIComponent(document.referrer);
			}
		}

		return url;
	}

	doSearchCall(skipHistory, textSearch = '') {
		let searchURL = '';

		this.toggleDataUtilityBanner(false);

		// 1. build search object from list of selected fitlers v2 only
		let searchObj = {
			...this.buildSearchObj(this.state.selectedV2Datasets),
			...this.buildSearchObj(this.state.selectedV2Tools),
			...this.buildSearchObj(this.state.selectedV2Projects),
			...this.buildSearchObj(this.state.selectedV2Papers),
			...this.buildSearchObj(this.state.selectedV2Courses),
			...this.buildSearchObj(this.state.selectedV2Collections),
		};
		// 2. dynamically build the searchUrl v2 only
		searchURL = this.buildSearchUrl(searchObj);

		indexNames.concat(sortNames).forEach(key => {
			const n = this.state[key];
			if (!!n) searchURL += `&${key}=${encodeURIComponent(n)}`;
		});

		// login status handler
		searchURL += this.getLoginReferrer();

		if (!skipHistory) {
			if (this.state.key) searchURL += '&tab=' + this.state.key;

			this.props.history.push(
				`${window.location.pathname}?search=${encodeURIComponent(textSearch ? textSearch : this.state.search)}` + searchURL
			);
		}

		if (this.state.key !== 'People') {
			// remove once full migration to v2 filters for all other entities 'Tools, Projects, Courses and Papers'
			this.doFilterQuery(textSearch, searchURL);
		}

		// search call brings back search results and now filters highlighting for v2
		this.doSearchQuery(textSearch, searchURL);
	}

	/**
	 * GetFilterState
	 *
	 * @desc return correct filter state for either a V1 or V2 option
	 * @return {object}
	 */
	getFilterState = (response = {}) => {
		const {
			data: { filters = {} },
		} = response;
		return filters;
	};

	setHighlightedFilters = (filters = {}, tree) => {
		for (let key in filters) {
			// Find parent obj - recursive
			const parentNode = this.findParentNode(tree, key);
			// If parentNode exists
			if (!_.isEmpty(parentNode) && typeof parentNode.highlighted !== 'undefined') {
				parentNode.highlighted = [];
				const lowerCasedFilters = filters[key].map(value => value.toLowerCase());
				// Highlight any filter items which include any of the returned filter values
				parentNode.filters.forEach(filter => {
					const filterValues = filter.value.split(',');
					if (filterValues.some(item => lowerCasedFilters.includes(item.toLowerCase())) && !parentNode.highlighted.includes(filter.label)) {
						parentNode.highlighted.push(filter.label.toLowerCase());
					}
				});
			}
		}
		return tree;
	};

	updateSearchString = search => {
		this.setState({ search });
	};

	handleSelect = key => {
		const entityType = typeMapper[`${this.state.key}`];
		googleAnalytics.recordVirtualPageView(`${key} results page ${this.state[`${entityType}Index`] + 1}`);
		let values = queryString.parse(window.location.search);
		values.tab = key;
		this.props.history.push(window.location.pathname + '?' + queryString.stringify(values));

		this.setState({ key, isResultsLoading: true }, () => {
			this.getFilters(key);
			this.doSearchCall();
		});
	};

	handleSort = sort => {
		const entityType = typeMapper[`${this.state.key}`];
		googleAnalytics.recordEvent(`${entityType}s`, `Sorted search results by ${sort}`, 'Sort dropdown option changed');
		this.setState({ [`${entityType}Sort`]: sort, isResultsLoading: true }, () => {
			this.doSearchCall();
		});
	};

	handlePagination = (type = '', page = 0) => {
		if (!_.isEmpty(type)) {
			googleAnalytics.recordVirtualPageView(`${_.startCase(_.toLower(type))}s results page ${page / 40 + 1}`);

			this.setState({ [`${type}Index`]: page, isResultsLoading: true }, () => {
				window.scrollTo(0, 0);
				this.doSearchCall();
			});
		}
	};

	/**
	 * GetFilters
	 *
	 * @desc Get all required global data for page
	 */
	getGlobals = async () => {
		try {
			const response = await axios.get(`${baseURL}/api/v1/global?localeId=en-gb&entry.name=dataUtility`);
			const {
				data: {
					data: {
						entry: { items: dataUtilityFilters = [] },
					},
				},
			} = response;

			if (!_.isEmpty(dataUtilityFilters)) {
				const dataUtilityWizardSteps = dataUtilityFilters.filter(item => item.includeInWizard);
				this.setState({ dataUtilityFilters, dataUtilityWizardSteps });
				await this.getFilters(this.state.key);
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	getFilters = async key => {
		if (key !== 'People') {
			try {
				const response = await service.getFilters(typeMapper[key]);
				const {
					data: { data },
				} = response;

				if (!_.isEmpty(data) && _.isEmpty(this.state[`filtersV2${key}`])) {
					this.setState({ [`filtersV2${key}`]: this.mapFiltersToDictionary(data, this.state.dataUtilityFilters) });
				}
			} catch (error) {
				console.error(error.message);
			}
		}
	};

	/**
	 * MapFiltersToDictionary
	 *
	 * @desc Accepts v2 format filter data and cross references with a data dictionary to rename, reformat, and order values
	 */
	mapFiltersToDictionary = (filterData, filterDictionary) => {
		filterDictionary.forEach(dictionaryEntry => {
			this.mutateFilter(filterData, dictionaryEntry);
		});
		return filterData;
	};

	/**
	 * MutateFilter
	 *
	 * @desc Performs the mutation of filter data for a provided dictionary entry containing allowed values, order etc.
	 */
	mutateFilter(filterData, dictionaryEntry) {
		// Iterate through each filter node to look for the filter by key
		filterData.forEach((dimension, index, arr) => {
			if (_.isEqual(dimension.key, dictionaryEntry.key)) {
				// Update filter to match dictionary definition
				arr[index] = {
					...dimension,
					filters: this.mapFilterValues(dimension.filters, dictionaryEntry.entries),
				};
			} else {
				// If the current node has children, recursively call this function again passing in the node's children
				if (_.has(dimension, 'filters')) {
					this.mutateFilter(dimension.filters, dictionaryEntry);
				}
			}
		});
	}

	/**
	 * MapFilterValues
	 *
	 * @desc Combines and ranks filter values for a given filter dimension using provided dictionary entries
	 */
	mapFilterValues(filterValues, dictionaryEntries) {
		const mappedFilterValues = dictionaryEntries.map(entry => {
			const { label, definition } = entry;
			return {
				...entry,
				value: this.getImpliedFilterValues(filterValues, entry),
				checked: false,
				label: label ? label : definition,
			};
		});

		return _.sortBy(mappedFilterValues, 'displayOrder');
	}

	/**
	 * GetImpliedFilterValues
	 *
	 * @desc Merges multiple implied filter values into a single filter
	 */
	getImpliedFilterValues(filterValues, dictionaryEntry) {
		return filterValues
			.filter(filterValue => {
				const lowercaseValues = dictionaryEntry.impliedValues.map(value => value.toLowerCase());
				return lowercaseValues.includes(filterValue.value.toLowerCase());
			})
			.map(filterValue => filterValue.value)
			.join(',');
	}

	/**
	 * PerformSearch
	 *
	 * @desc builds url string from searchObj from selected filters
	 * @param {object}
	 */
	buildSearchUrl = searchObj => {
		let searchUrl = '';
		if (searchObj) {
			for (let key of Object.keys(searchObj)) {
				const values = searchObj[key].toString().split(',');
				const uniqueValues = [...new Set(values)];
				searchUrl += `&${key}=${encodeURIComponent(uniqueValues.join('::'))}`;
			}
		}
		return searchUrl;
	};

	/**
	 * BuildSearchObj
	 *
	 * @desc builds filters obj ready for parsing
	 * @param {array} FilterArr
	 * @return {object} New Filters Object
	 */
	buildSearchObj = arr => {
		// 1. reduce over array of selected values [{id, value, parentkey}, {}...]
		return [...arr].reduce((obj, { parentKey, value, alias }) => {
			// we need to use alias here if it is defiend to use as override so names do not conflict with other tabs
			let queryParam = alias ? alias : parentKey;

			// 2. group by key { 'publisher': [] }
			if (!obj[queryParam]) obj[queryParam] = [];

			// 3. if key exists and entry is not already included, push in filter value
			obj[queryParam].push(value);

			// 4. return obj iteration
			return obj;
		}, {});
	};

	/**
	 * HandleClearFilters
	 *
	 * @desc function to handle filters applied functionality
	 * @param {string | object} selectedNode
	 */
	handleClearSelection = selectedNode => {
		let selectedV2, filtersV2, parentNode;
		if (!_.isEmpty(selectedNode)) {
			// 1. take label and parentId values from the node
			let { parentKey, label } = selectedNode;
			// 2. copy state data *avoid mutation*
			filtersV2 = this.getFilterStateByKey(this.state.key);
			// 3. find parentNode in the tree
			parentNode = this.findParentNode(filtersV2, parentKey);
			if (!_.isEmpty(parentNode)) {
				// 4. decrement the count on the parent
				--parentNode.selectedCount;
				// 5. get the filters
				let { filters } = parentNode;
				if (!_.isEmpty(filters)) {
					// 6. get child node
					let foundNode = this.findNode(filters, label);
					// 7. set checked value
					foundNode.checked = false;
					// 8. remove from selectedV2 array
					selectedV2 = this.handleSelected(selectedNode, false);
					// 9. set state
					const filtersV2Entity = `filtersV2${this.state.key}`;
					const selectedV2Entity = `selectedV2${this.state.key}`;
					this.setState({ [filtersV2Entity]: filtersV2, [selectedV2Entity]: selectedV2, isResultsLoading: true }, () => {
						this.doSearchCall();
					});
				}
			}
		}
	};

	/**
	 * ResetTreeChecked
	 *
	 * @desc Resets the selected filter options back in the tree for checked and selected counts
	 * @param {object | array} tree
	 * @return new tree
	 */
	resetTreeChecked = tree => {
		if (_.isEmpty(tree)) return;

		tree.forEach(node => {
			if (typeof node.selectedCount !== 'undefined') node.selectedCount = 0;

			if (typeof node.checked !== 'undefined') {
				node.checked = false;
			} else {
				let child = this.resetTreeChecked(node.filters);
				return child;
			}
		});
		return tree;
	};

	/**
	 * HandleClearAll
	 *
	 * @desc User clicks clear all in the filters all section it will reset the tree
	 */
	handleClearAll = () => {
		// 1. take copy of data
		let filtersV2Data = this.getFilterStateByKey(this.state.key);
		// 2. resets the filters UI tree back to default
		let filtersV2 = this.resetTreeChecked(filtersV2Data);
		// 3. set state and call search
		const filtersV2Entity = `filtersV2${this.state.key}`;
		const selectedV2Entity = `selectedV2${this.state.key}`;

		this.setState({ [filtersV2Entity]: filtersV2, [selectedV2Entity]: [], isResultsLoading: true }, () => {
			this.doSearchCall();
		});
	};

	/**
	 * Filter method for v2Selected options
	 * returns new array
	 *
	 * @desc    Returns new selected array for selected items in v2
	 * @param		{object} selected
	 * @param 	{boolena} checked
	 * @return	{array} array of selected items
	 */
	handleSelected = (selected = {}, checked = false, tab = this.state.key) => {
		let selectedV2 = this.getSelectedFiltersStateByKey(tab);
		let results = [];
		if (!_.isEmpty(selected)) {
			if (checked) {
				results = [...selectedV2, selected];
			} else {
				// id important to filter by as labels are not unique
				results = [...selectedV2].filter(node => node.id !== selected.id);
			}
		}
		return results;
	};

	/**
	 * FindParentNode
	 *
	 * @desc 		Do a recursive loop to find the parent node
	 * @param		{array} tree
	 * @param		{number} nodeId
	 * @return	{object} parentNode object
	 */
	findParentNode = (tree, key) => {
		// 1. find if matches key || alias if provided for an override for the queryParam if it conflicts with another key from
		// another entity
		let found = tree.find(node => ((typeof node.alias !== 'undefined' && node.alias === key) || node.key === key ? node : ''));

		// 2. if not found start recursive loop
		if (!found) {
			let i = 0;
			// 3. if not found and current tree has length
			while (!found && i < tree.length) {
				// 4. current tree item get filters check if length
				if (tree[i].filters && tree[i].filters.length) {
					// 5. if filters has length set the current iteration of filters and recall found as findParentNode
					found = this.findParentNode(tree[i].filters, key);
				}
				// 6. increment count
				i++;
			}
		}
		// 7. return found can be node or function findParentNode
		return found;
	};

	/**
	 * FindNode
	 *
	 * @desc 		Finds the selected node item or obj inside filters array already in parent
	 * @param		{array} filters
	 * @param		{string} label
	 * @return	{object} object of {label, value...}
	 */
	findNode = (filters = [], label) => {
		if (!_.isEmpty(filters)) {
			return [...filters].find(node => node.label.toUpperCase() === label.toUpperCase()) || {};
		}
		return {};
	};

	/**
	 * HandleSelection
	 *
	 * @desc remove item from filters applied and update tree
	 * @param {object} node
	 */
	handleClearSection = node => {
		let selectedV2, filtersV2, parentNode, selectedNodeFilters;
		let { key, filters } = node;
		selectedV2 = this.getSelectedFiltersStateByKey(this.state.key);
		// 1. find the filters
		if (!_.isEmpty(filters)) {
			selectedNodeFilters = filters
				.filter(nodeItem => nodeItem.checked)
				.map(node => {
					return { ...node, checked: false };
				});
			// 1. copy state - stop mutation
			filtersV2 = this.getFilterStateByKey(this.state.key);
			// 2. find parent obj - recursive
			parentNode = this.findParentNode(filtersV2, key);
			if (!_.isEmpty(parentNode)) {
				let { filters } = parentNode;
				// 3. loop over selected nodes
				selectedNodeFilters.forEach(node => {
					let foundNode = this.findNode(filters, node.label);
					if (!_.isEmpty(foundNode)) {
						// 4. set check value
						foundNode.checked = false;
						// 5. increment highest parent count
						--parentNode.selectedCount;
						// 7. fn for handling the *selected showing* returns new state
						selectedV2 = [...selectedV2].filter(node => node.id !== foundNode.id);
						// searchObj = this.buildSearchObj(selectedV2);
					}
				});
				// 9. set state
				const filtersV2Entity = `filtersV2${this.state.key}`;
				const selectedV2Entity = `selectedV2${this.state.key}`;
				this.setState({ [filtersV2Entity]: filtersV2, [selectedV2Entity]: [], isResultsLoading: true }, () => {
					this.doSearchCall();
				});
			}
		}
	};

	/**
	 * Get the filters in state for the particular tab
	 */
	getFilterStateByKey = key => {
		switch (key) {
			case 'Datasets':
				return [...this.state.filtersV2Datasets];
			case 'Tools':
				return [...this.state.filtersV2Tools];
			case 'Projects':
				return [...this.state.filtersV2Projects];
			case 'Papers':
				return [...this.state.filtersV2Papers];
			case 'Courses':
				return [...this.state.filtersV2Courses];
			case 'Collections':
				return [...this.state.filtersV2Collections];
			default:
				return [];
		}
	};

	/**
	 * Get the selected filters in state for the particular tab
	 */
	getSelectedFiltersStateByKey = key => {
		switch (key) {
			case 'Datasets':
				return [...this.state.selectedV2Datasets];
			case 'Tools':
				return [...this.state.selectedV2Tools];
			case 'Projects':
				return [...this.state.selectedV2Projects];
			case 'Papers':
				return [...this.state.selectedV2Papers];
			case 'Courses':
				return [...this.state.selectedV2Courses];
			case 'Collections':
				return [...this.state.selectedV2Collections];
			default:
				return [];
		}
	};

	getCountByKey = key => {
		let {
			summary: { datasetCount = 0, toolCount = 0, projectCount = 0, paperCount = 0, personCount = 0, courseCount = 0, collectionCount = 0 },
		} = this.state;

		switch (key) {
			case 'Datasets':
				return datasetCount;
			case 'Tools':
				return toolCount;
			case 'Projects':
				return projectCount;
			case 'Papers':
				return paperCount;
			case 'Courses':
				return courseCount;
			case 'Collections':
				return collectionCount;
			case 'People':
				return personCount;
			default:
				return 0;
		}
	};

	/**
	 * Handle Filter event bubble for option click
	 * within the filter panel
	 *
	 * @param {object} node
	 * @param {string} parentKey
	 * @param {boolean} checkValue
	 */
	handleInputChange = (node, parentKey, checkValue) => {
		// 1. copy state - stop mutation
		let filtersV2 = this.getFilterStateByKey(this.state.key);

		// 2. find parent obj - recursive
		let parentNode = this.findParentNode(filtersV2, parentKey);
		if (!_.isEmpty(parentNode)) {
			// deconstruct important to take alias incase key needs overwritten for query string
			let { filters, key, alias } = parentNode;
			// 3. find checkbox obj
			let foundNode = this.findNode(filters, node.label);
			if (!_.isEmpty(foundNode)) {
				// find if the node already exists in the selectedV2 - if so we are unchecking / removing
				const exists = this.getSelectedFiltersStateByKey(this.state.key).some(selected => selected.id === foundNode.id);
				if (!exists || (exists && foundNode.checked != checkValue)) {
					// 4. set check value
					foundNode.checked = checkValue;
					// 5. increment highest parent count
					checkValue ? ++parentNode.selectedCount : --parentNode.selectedCount;
					// 6. set new object for handle selected *showing*
					let selectedNode = {
						parentKey: alias || key,
						id: foundNode.id,
						label: foundNode.label,
						value: foundNode.value,
					};
					// 7. fn for handling the *selected showing* returns new state
					const selectedV2 = this.handleSelected(selectedNode, checkValue);
					// 8. set state
					const filtersV2Entity = `filtersV2${this.state.key}`;
					const selectedV2Entity = `selectedV2${this.state.key}`;
					const entityIndex = `${typeMapper[this.state.key]}Index`;

					this.setState({ [filtersV2Entity]: filtersV2, [selectedV2Entity]: selectedV2, [entityIndex]: 0, isResultsLoading: true }, () => {
						this.doSearchCall();
					});

					googleAnalytics.recordEvent(
						'Datasets',
						`${checkValue ? 'Applied' : 'Removed'} ${parentNode.label} filter ${
							this.state.showDataUtilityBanner ? 'after utility wizard search' : ''
						}`,
						`Filter value: ${selectedNode.label}`
					);
				}
			}
		}
	};

	/**
	 * HandleToggle V2
	 *
	 * @desc Handles filters menu up and down toggle V2
	 * @param {object} node
	 */
	handleToggle = node => {
		let parentNode;
		if (!_.isEmpty(node)) {
			// 1. copy state - stop mutation
			let filtersV2 = this.getFilterStateByKey(this.state.key);
			// 2. find parent obj - recursive
			let { key } = node;
			// 3. return parent node of toggled
			parentNode = this.findParentNode(filtersV2, key);
			if (!_.isEmpty(parentNode)) {
				parentNode.closed = !parentNode.closed;
				const filtersV2Entity = `filtersV2${this.state.key}`;
				this.setState({ [filtersV2Entity]: filtersV2 });
			}
		}
	};

	toggleDrawer = () => {
		this.setState(prevState => {
			if (prevState.showDrawer === true) {
				this.searchBar.current.getNumberOfUnreadMessages();
			}
			return { showDrawer: !prevState.showDrawer };
		});
	};

	toggleModal = (showEnquiry = false, context = {}) => {
		this.setState(prevState => {
			return { showModal: !prevState.showModal, context, showDrawer: showEnquiry };
		});
	};

	saveFiltersUpdate = viewSaved => {
		this.setState({ showSavedPreferencesModal: false });

		const filters = {};

		filterNames.forEach(key => {
			const filterKey = `filtersV2${key}`;
			const filtersV2 = !_.isNil(this.state[filterKey]) ? [...this.state[filterKey]] : [];
			filters[key] = this.resetTreeChecked(filtersV2);
		});

		this.setState(
			prevState => ({
				...initialState,
				...filters,
			}),
			() => {
				if (viewSaved.tab === 'Datasets') {
					this.setState({ datasetSort: viewSaved.sort });
				} else if (viewSaved.tab === 'Tools') {
					this.setState({ toolSort: viewSaved.sort });
				} else if (viewSaved.tab === 'Projects') {
					this.setState({ projectSort: viewSaved.sort });
				} else if (viewSaved.tab === 'Papers') {
					this.setState({ paperSort: viewSaved.sort });
				} else if (viewSaved.tab === 'People') {
					this.setState({ personSort: viewSaved.sort });
				} else if (viewSaved.tab === 'Collections') {
					this.setState({ collectionSort: viewSaved.sort });
				}

				this.setState({ search: viewSaved.search, key: viewSaved.tab, [`selectedV2${viewSaved.tab}`]: viewSaved.filters }, () => {
					this.doSearchCall();
				});
			}
		);
	};

	getPreference(key) {
		return {
			preferenceFilters: this.state[`selectedV2${key}`],
			preferenceSort: this.state[`${typeMapper[key]}Sort`],
		};
	}

	getFilterProps(key) {
		return {
			data: this.getFilterStateByKey(key),
			onHandleInputChange: this.handleInputChange,
			onHandleClearSection: this.handleClearSection,
			onHandleToggle: this.handleToggle,
		};
	}

	getSearchProps(showSort, sortMenu, maxResult) {
		const { savedSearchPanel, isResultsLoading: isLoading, search } = this.state;

		return {
			maxResult,
			search,
			isLoading,
			sort: showSort && !savedSearchPanel && sortMenu,
			updateOnFilterBadge: this.updateOnFilterBadge,
			onPagination: this.handlePagination,
		};
	}

	getKey() {
		let {
			summary: { datasetCount = 0, toolCount = 0, projectCount = 0, paperCount = 0, personCount = 0, courseCount = 0, collectionCount = 0 },
			key,
		} = this.state;

		if (key === '' || typeof key === 'undefined') {
			if (datasetCount > 0) {
				key = 'Datasets';
			} else if (toolCount > 0) {
				key = 'Tools';
			} else if (projectCount > 0) {
				key = 'Projects';
			} else if (paperCount > 0) {
				key = 'Papers';
			} else if (personCount > 0) {
				key = 'People';
			} else if (courseCount > 0) {
				key = 'Course';
			} else if (collectionCount > 0) {
				key = 'Collections';
			} else {
				key = 'Datasets';
			}
		}

		return key;
	}

	getShowSort(key) {
		return this.getCountByKey(key) > 0;
	}

	getFiltersSelectionProps(preferenceFilters) {
		return {
			selectedCount: preferenceFilters.length,
			selectedItems: preferenceFilters,
		};
	}

	render() {
		let {
			summary: { datasetCount = 0, toolCount = 0, projectCount = 0, paperCount = 0, personCount = 0, courseCount = 0, collectionCount = 0 },
			search,
			datasetData,
			toolData,
			projectData,
			paperData,
			personData,
			courseData,
			collectionData,
			userState,
			isLoading,
			datasetIndex,
			toolIndex,
			projectIndex,
			paperIndex,
			personIndex,
			courseIndex,
			collectionIndex,
			selectedV2Datasets,
			datasetSort,
			toolSort,
			projectSort,
			paperSort,
			personSort,
			collectionSort,

			showDrawer,
			showModal,
			showAdvancedSearchModal,
			context,
			activeDataUtilityWizardStep,

			key: baseKey,
		} = this.state;

		if (isLoading) {
			return (
				<Container>
					<Loading />
				</Container>
			);
		}

		const key = this.getKey(baseKey);

		let maxResult = 40;

		const sortMenu = (
			<div className='text-right save-dropdown'>
				{key === 'Tools' && <ToolsSearchSort onSort={this.handleSort} sort={toolSort} search={search} />}
				{key === 'Datasets' && <DatasetSearchSort onSort={this.handleSort} sort={datasetSort} search={search} />}
				{key === 'Projects' && <ProjectsSearchSort onSort={this.handleSort} sort={projectSort} search={search} />}
				{key === 'Collections' && <CollectionsSearchSort onSort={this.handleSort} sort={collectionSort} search={search} />}
				{key === 'Papers' && <PapersSearchSort onSort={this.handleSort} sort={paperSort} search={search} />}
				{key === 'People' && <PeopleSearchSort onSort={this.handleSort} sort={personSort} search={search} />}
			</div>
		);

		const { preferenceFilters, preferenceSort } = this.getPreference(key);
		const showSort = this.getShowSort(key);
		const filterProps = this.getFilterProps(key);
		const filtersSelectionProps = this.getFiltersSelectionProps(preferenceFilters);
		const searchProps = this.getSearchProps(showSort, sortMenu, maxResult);

		return (
			<Sentry.ErrorBoundary fallback={<ErrorModal />}>
				<div>
					<SearchBar
						ref={this.searchBar}
						search={search}
						doSearchMethod={this.doSearch}
						onClearMethod={this.doClear}
						doUpdateSearchString={this.updateSearchString}
						doToggleDrawer={this.toggleDrawer}
						userState={userState}
					/>

					<div className='searchTabsHolder'>
						<div>
							<Tabs className='tabsBackground gray700-13' activeKey={key} onSelect={this.handleSelect}>
								<Tab eventKey='Datasets' title={'Datasets (' + datasetCount + ')'} />
								<Tab eventKey='Tools' title={'Tools (' + toolCount + ')'} />
								<Tab eventKey='Projects' title={'Projects (' + projectCount + ')'} />
								<Tab eventKey='Collections' title={'Collections (' + collectionCount + ')'} />
								<Tab eventKey='Courses' title={'Courses (' + courseCount + ')'} />
								<Tab eventKey='Papers' title={'Papers (' + paperCount + ')'} />
								<Tab eventKey='People' title={'People (' + personCount + ')'} />
							</Tabs>
						</div>
					</div>

					<div className='container'>
						{this.state.showDataUtilityBanner && (
							<SearchUtilityBanner onClick={this.openDataUtilityWizard} step={activeDataUtilityWizardStep} />
						)}

						{this.state.saveSuccess && !this.state.showSavedModal && (
							<Alert variant='primary' className='blue-banner saved-preference-banner'>
								Saved preference: "{this.state.showSavedName}"
							</Alert>
						)}

						<Container className={this.state.saveSuccess && !this.state.showSavedModal && 'container-saved-preference-banner'}>
							<Row className='filters filter-save'>
								<Col className='title' lg={4}>
									Showing {this.getCountByKey(key)} results {this.state.search != '' && `for '${this.state.search}'`}
								</Col>
								<Col lg={8} className='saved-buttons'>
									{this.state.saveSuccess ? (
										<Button variant='success' className='saved-disabled button-teal button-teal' disabled>
											<SVGIcon width='15px' height='15px' name='tick' fill={'#fff'} /> Saved
										</Button>
									) : this.state.userState[0].loggedIn === false ? (
										<Button variant='outline-success' className='saved button-teal' onClick={() => this.showLoginModal()}>
											Save
										</Button>
									) : (
										<Button variant='outline-success' className='saved button-teal' onClick={() => this.setState({ showSavedModal: true })}>
											Save
										</Button>
									)}

									{this.state.showSavedModal && (
										<SaveModal
											show={this.state.showSavedModal}
											onHide={this.hideSavedModal}
											onSaveHide={this.hideNoSaveSearchModal}
											saveSuccess={this.showSuccessMessage}
											saveName={this.showSavedName}
											search={this.state.search}
											filters={preferenceFilters}
											sort={preferenceSort}
											tab={this.state.key}
										/>
									)}

									<Button
										variant='light'
										className='saved-preference button-tertiary'
										onClick={
											this.state.userState[0].loggedIn === false
												? () => this.showLoginModal()
												: () => this.setState({ showSavedPreferencesModal: true })
										}>
										{' '}
										Saved preferences
									</Button>
									{this.state.showSavedPreferencesModal && (
										<SavedPreferencesModal
											show={this.state.showSavedPreferencesModal}
											onHide={this.hideSavedPreferencesModal}
											viewMatchesLink={this.viewMatches}
											viewSaved={this.saveFiltersUpdate}
											activeTab={key}
										/>
									)}

									{sortMenu}
								</Col>
							</Row>
							<Row>
								{key !== 'People' && (
									<FilterSelection
										{...filtersSelectionProps}
										onHandleClearSelection={this.handleClearSelection}
										onHandleClearAll={this.handleClearAll}
										savedSearches={true}
									/>
								)}
							</Row>
						</Container>
					</div>
					<Container>
						<Row>
							<Col sm={12} md={12} lg={3} className='mt-1 mb-5'>
								{key !== 'People' && (
									<SearchFilters filters={<Filter {...filterProps} />} onAdvancedSearchClick={this.toggleAdvancedSearchModal} />
								)}
							</Col>
							<Col sm={12} md={12} lg={9} className='mt-1 mb-5'>
								{key === 'Datasets' && (
									<DatasetSearchResults
										data={datasetData}
										count={datasetCount}
										pageNumber={datasetIndex / maxResult}
										totalPages={datasetCount / maxResult}
										{...searchProps}
									/>
								)}

								{key === 'Tools' && (
									<SearchResults
										type='tool'
										data={toolData}
										count={toolCount}
										pageNumber={toolIndex / maxResult}
										totalPages={toolCount / maxResult}
										{...searchProps}
									/>
								)}

								{key === 'Projects' && (
									<SearchResults
										type='project'
										data={projectData}
										count={projectCount}
										pageNumber={projectIndex / maxResult}
										totalPages={projectCount / maxResult}
										{...searchProps}
									/>
								)}

								{key === 'Collections' && (
									<CollectionsSearchResults
										data={collectionData}
										count={collectionCount}
										pageNumber={collectionIndex}
										totalPages={collectionCount / maxResult}
										{...searchProps}
									/>
								)}

								{key === 'Papers' && (
									<SearchResults
										type='paper'
										data={paperData}
										count={paperCount}
										pageNumber={paperIndex / maxResult}
										totalPages={paperCount / maxResult}
										{...searchProps}
									/>
								)}

								{key === 'People' && (
									<SearchResults
										type='person'
										data={personData}
										count={personCount}
										pageNumber={personIndex / maxResult}
										totalPages={personCount / maxResult}
										{...searchProps}
									/>
								)}

								{key === 'Courses' && (
									<CoursesSearchResults
										data={courseData}
										count={courseCount}
										pageNumber={courseIndex / maxResult}
										totalPages={courseCount / maxResult}
										{...searchProps}
									/>
								)}
							</Col>
						</Row>
					</Container>

					<NotificationContainer />
					<SideDrawer open={showDrawer} closed={this.toggleDrawer}>
						<UserMessages
							userState={userState[0]}
							closed={this.toggleDrawer}
							toggleModal={this.toggleModal}
							drawerIsOpen={this.state.showDrawer}
						/>
					</SideDrawer>

					<AdvancedSearchModal
						open={showAdvancedSearchModal}
						closed={this.toggleAdvancedSearchModal}
						userProps={userState[0]}
						startDataUtilityWizardJourney={this.openDataUtilityWizard}
					/>

					<DataUtilityWizardModal
						open={this.state.showDataUtilityWizardModal}
						closed={() => {
							this.toggleDataUtilityWizardModal();
						}}
						dataUtilityWizardSteps={this.state.dataUtilityWizardSteps}
						updateFilterStates={this.updateFilterStates}
						datasetCount={datasetCount}
						doSearchCall={this.doSearchCall}
						selectedItems={selectedV2Datasets}
						handleClearSelection={this.handleClearSelection}
						searchValue={this.state.search}
						activeStep={activeDataUtilityWizardStep}
						onWizardComplete={this.toggleDataUtilityBanner}
						onStepChange={this.onWizardStepChange}
					/>

					<DataSetModal open={showModal} context={context} closed={this.toggleModal} userState={userState[0]} />
				</div>
			</Sentry.ErrorBoundary>
		);
	}
}

export default SearchPage;
