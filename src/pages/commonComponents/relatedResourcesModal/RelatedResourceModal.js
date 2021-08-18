import React, { Fragment } from 'react';
import { Row, Col, Tab, Tabs, Container, Pagination } from 'react-bootstrap';
import _ from 'lodash';

import SimpleSearchBar from '../searchBar/SimpleSearchBar';
import RelatedObject from '../relatedObject/RelatedObject';
import NotFound from '../../commonComponents/NotFound';
import './RelatedResourcesModal.scss';

class RelatedResourcesModal extends React.Component {
	state = {
		userState: [
			{
				loggedIn: false,
				role: 'Reader',
				id: null,
				name: null,
			},
		],
		key: '',
		summary: [],
		myEntitiesSummary: [],
		datasetIndex: 0,
		toolIndex: 0,
		projectIndex: 0,
		paperIndex: 0,
		personIndex: 0,
		courseIndex: 0,
		relatedObjectIds: [],
		relatedObjects: [],
		selected: {
			datasets: 0,
			tools: 0,
			projects: 0,
			papers: 0,
			persons: 0,
			courses: 0,
		},
		displayTabs: [],
	};

	constructor(props) {
		super(props);
		this.state.userState = props.userState;
		this.state.relatedObjects = props.relatedObjects;
		this.state.relatedObjectIds = [];
		this.state.displayTabs = props.displayTabs;
	}

	handleSelect = key => {
		this.setState({ key: key });
	};

	handlePagination = async (type, page, e) => {
		if (type === 'dataset') {
			await Promise.all([this.setState({ datasetIndex: page })]);
		} else if (type === 'tool') {
			await Promise.all([this.setState({ toolIndex: page })]);
		} else if (type === 'project') {
			await Promise.all([this.setState({ projectIndex: page })]);
		} else if (type === 'paper') {
			await Promise.all([this.setState({ paperIndex: page })]);
		} else if (type === 'person') {
			await Promise.all([this.setState({ personIndex: page })]);
		} else if (type === 'course') {
			await Promise.all([this.setState({ courseIndex: page })]);
		}
		this.props.doSearchMethod(e, type, page);
	};

	clearIndexesOnSearch = e => {
		if (e.key === 'Enter') {
			this.setState({
				datasetIndex: 0,
				toolIndex: 0,
				projectIndex: 0,
				paperIndex: 0,
				personIndex: 0,
				courseIndex: 0,
			});
		}
	};

	getRelatedResourceModalSubheadings = (
		entityIndex,
		index,
		myEntitiesCount,
		entityCount,
		firstMyEntityIndex,
		firstAllEntityIndex,
		type
	) => {
		type = type.toLowerCase();

		let subHeadings;
		if (entityIndex === 0 && index === 0 && myEntitiesCount === 0 && firstAllEntityIndex === 0) {
			subHeadings = (
				<div>
					<div className='margin-top-32'>
						<span className='resultsSubHeading'>
							My {type} ({myEntitiesCount})
						</span>
					</div>{' '}
					<Row className='noMargin noResultsModalSearchCard'>
						<NotFound word={type} relatedResourceModal={true} />
					</Row>{' '}
					<div className='margin-top-16'>
						<span className='resultsSubHeading'>All {type}</span>
					</div>
				</div>
			);
		} else if (entityIndex === 0 && index === 0 && firstMyEntityIndex == 0) {
			subHeadings = (
				<div className='margin-top-32'>
					<span className='resultsSubHeading'>
						My {type} ({myEntitiesCount})
					</span>
				</div>
			);
		} else if ((index !== 0 || (index === 0 && myEntitiesCount === 0)) && index === firstAllEntityIndex) {
			subHeadings = (
				<div className='margin-top-32'>
					{' '}
					<span className='resultsSubHeading'>All {type}</span>{' '}
				</div>
			);
		}
		return subHeadings;
	};

	render() {
		const { userState, datasetIndex, toolIndex, projectIndex, paperIndex, personIndex, courseIndex, displayTabs } = this.state;
		let { key } = this.state;

		let datasetCount = this.props.summary.datasetCount || 0;
		let toolCount = this.props.summary.toolCount || 0;
		let projectCount = this.props.summary.projectCount || 0;
		let courseCount = this.props.summary.courseCount || 0;
		let paperCount = this.props.summary.paperCount || 0;
		let personCount = this.props.summary.personCount || 0;

		const getActiveTabOnLoad = () => {
			let tabCounts = [
				{ key: 'Datasets', count: datasetCount },
				{ key: 'Tools', count: toolCount },
				{ key: 'Projects', count: projectCount },
				{ key: 'Papers', count: paperCount },
				{ key: 'People', count: personCount },
				{ key: 'Courses', count: courseCount },
			];

			let tempKey = '';

			for (const currentTab of displayTabs) {
				let tabCount = tabCounts.find(tab => tab.key === currentTab);
				if (tabCount.count > 0) {
					tempKey = currentTab;
					break;
				}
			}

			key = tempKey;

			if (key === '' || typeof key === 'undefined') {
				key = displayTabs[0].key;
			}
		};

		if (key === '' || typeof key === 'undefined') {
			getActiveTabOnLoad();
		}

		let datasetPaginationItems = [];
		let toolPaginationItems = [];
		let projectPaginationItems = [];
		let paperPaginationItems = [];
		let personPaginationItems = [];
		let coursePaginationItems = [];
		let maxResult = 40;
		for (let i = 1; i <= Math.ceil(datasetCount / maxResult); i++) {
			datasetPaginationItems.push(
				<Pagination.Item
					key={i}
					active={i === datasetIndex / maxResult + 1}
					onClick={e => {
						this.handlePagination('dataset', (i - 1) * maxResult, 'click');
					}}>
					{i}
				</Pagination.Item>
			);
		}
		for (let i = 1; i <= Math.ceil(toolCount / maxResult); i++) {
			toolPaginationItems.push(
				<Pagination.Item
					key={i}
					active={i === toolIndex / maxResult + 1}
					onClick={e => {
						this.handlePagination('tool', (i - 1) * maxResult, 'click');
					}}>
					{i}
				</Pagination.Item>
			);
		}
		for (let i = 1; i <= Math.ceil(projectCount / maxResult); i++) {
			projectPaginationItems.push(
				<Pagination.Item
					key={i}
					active={i === projectIndex / maxResult + 1}
					onClick={e => {
						this.handlePagination('project', (i - 1) * maxResult, 'click');
					}}>
					{i}
				</Pagination.Item>
			);
		}
		for (let i = 1; i <= Math.ceil(paperCount / maxResult); i++) {
			paperPaginationItems.push(
				<Pagination.Item
					key={i}
					active={i === paperIndex / maxResult + 1}
					onClick={e => {
						this.handlePagination('paper', (i - 1) * maxResult, 'click');
					}}>
					{i}
				</Pagination.Item>
			);
		}
		for (let i = 1; i <= Math.ceil(personCount / maxResult); i++) {
			personPaginationItems.push(
				<Pagination.Item
					key={i}
					active={i === personIndex / maxResult + 1}
					onClick={e => {
						this.handlePagination('person', (i - 1) * maxResult, 'click');
					}}>
					{i}
				</Pagination.Item>
			);
		}
		for (let i = 1; i <= Math.ceil(courseCount / maxResult); i++) {
			coursePaginationItems.push(
				<Pagination.Item
					key={i}
					active={i === courseIndex / maxResult + 1}
					onClick={e => {
						this.handlePagination('course', (i - 1) * maxResult, 'click');
					}}>
					{i}
				</Pagination.Item>
			);
		}

		let editingObjectProject = 0;
		let editingObjectTool = 0;

		if (this.props.projectData && this.props.projectData.some(object => object.id === this.props.projectid)) {
			editingObjectProject = 1;
		}
		if (this.props.toolData && this.props.toolData.some(object => object.id === this.props.toolid)) {
			editingObjectTool = 1;
		}

		this.state.selected.datasets = 0;
		this.state.selected.tools = 0;
		this.state.selected.projects = 0;
		this.state.selected.papers = 0;
		this.state.selected.persons = 0;
		this.state.selected.courses = 0;

		if (this.props.relatedObjects) {
			this.props.relatedObjects.map(object => {
				this.state.relatedObjectIds.push(object.objectId);
				this.state.relatedObjectIds.push(object.pid);

				switch (object.objectType) {
					case 'tool':
						this.props.toolData.map(tool => {
							if (object.objectId === tool.id || object.objectId === JSON.stringify(tool.id)) {
								this.state.selected.tools++;
							}
						});
						break;
					case 'project':
						this.props.projectData.map(project => {
							if (object.objectId === project.id || object.objectId === JSON.stringify(project.id)) {
								this.state.selected.projects++;
							}
						});
						break;
					case 'paper':
						this.props.paperData.map(paper => {
							if (object.objectId === paper.id || object.objectId === JSON.stringify(paper.id)) {
								this.state.selected.papers++;
							}
						});
						break;
					case 'person':
						this.props.personData.map(person => {
							if (object.objectId === person.id || object.objectId === JSON.stringify(person.id)) {
								this.state.selected.persons++;
							}
						});
						break;
					case 'dataset':
						this.props.datasetData.map(dataset => {
							if (
								object.objectId === dataset.datasetid ||
								object.objectId === JSON.stringify(dataset.datasetid) ||
								object.pid === dataset.pid ||
								object.pid === JSON.stringify(dataset.pid)
							) {
								this.state.selected.datasets++;
							}
						});
						break;
					case 'course':
						this.props.courseData.map(course => {
							if (object.objectId === course.id || object.objectId === JSON.stringify(course.id)) {
								this.state.selected.courses++;
							}
						});
						break;
				}
			});
		}

		// Index of the first tool user is an author of
		let firstMyToolIndex = this.props.toolData.map(tool => tool.myEntity).indexOf(true);
		//Index if the first tool user is not an author of
		let firstAllToolIndex = this.props.toolData.map(tool => tool.myEntity).indexOf(false);
		let firstMyProjectIndex = this.props.projectData.map(project => project.myEntity).indexOf(true);
		let firstAllProjectIndex = this.props.projectData.map(project => project.myEntity).indexOf(false);
		let firstMyPaperIndex = this.props.paperData.map(paper => paper.myEntity).indexOf(true);
		let firstAllPaperIndex = this.props.paperData.map(paper => paper.myEntity).indexOf(false);
		let firstMyCourseIndex = this.props.courseData.map(course => course.myEntity).indexOf(true);
		let firstAllCourseIndex = this.props.courseData.map(course => course.myEntity).indexOf(false);

		return (
			<Fragment>
				<div class='related-search-wrap'>
					<div className='realted-search-body'>
						<SimpleSearchBar
							searchString={this.props.searchString}
							doSearchMethod={this.props.doSearchMethod}
							doUpdateSearchString={this.props.doUpdateSearchString}
							userState={this.props.userState}
							doClearIndexesOnSearch={this.clearIndexesOnSearch}
						/>
						{typeof this.props.summary.datasetCount !== 'undefined' ? (
							<div className='searchTabsHolder'>
								<div>
									<Tabs
										data-test-id='related-resource-tabs'
										className='tabsBackground-shadow-bottom gray700-13'
										activeKey={key}
										onSelect={this.handleSelect}>
										{displayTabs.includes('Datasets') && (
											<Tab
												eventKey='Datasets'
												title={
													'Datasets (' +
													(!this.props.summary.datasetCount ? '0' : this.props.summary.datasetCount - this.state.selected.datasets) +
													')'
												}
											/>
										)}

										{displayTabs.includes('Tools') && (
											<Tab
												eventKey='Tools'
												title={
													'Tools (' +
													(!this.props.summary.toolCount
														? '0'
														: this.props.summary.toolCount - this.state.selected.tools - editingObjectTool) +
													')'
												}
											/>
										)}

										{displayTabs.includes('Projects') && (
											<Tab
												eventKey='Projects'
												title={
													'Projects (' +
													(!this.props.summary.projectCount
														? '0'
														: this.props.summary.projectCount - this.state.selected.projects - editingObjectProject) +
													')'
												}
											/>
										)}

										{displayTabs.includes('Courses') && (
											<Tab
												eventKey='Courses'
												title={
													'Courses (' +
													(!this.props.summary.courseCount ? '0' : this.props.summary.courseCount - this.state.selected.courses) +
													')'
												}
											/>
										)}

										{displayTabs.includes('Papers') && (
											<Tab
												data-test-id='related-papers'
												eventKey='Papers'
												title={
													'Papers (' +
													(!this.props.summary.paperCount ? '0' : this.props.summary.paperCount - this.state.selected.papers) +
													')'
												}
											/>
										)}

										{displayTabs.includes('People') && (
											<Tab
												eventKey='People'
												title={
													'People (' +
													(!this.props.summary.personCount ? '0' : this.props.summary.personCount - this.state.selected.persons) +
													')'
												}
											/>
										)}
									</Tabs>
								</div>
							</div>
						) : (
							''
						)}
					</div>
				</div>

				<div className='relatedModalBackground'>
					<Container>
						<Row>
							<Col sm={1} lg={1} />
							<Col sm={10} lg={10} className='mt-2 mb-3'>
								{key === 'Datasets'
									? this.props.datasetData.map(dataset => {
											if (this.state.relatedObjectIds.includes(dataset.datasetid) || this.state.relatedObjectIds.includes(dataset.pid)) {
												return '';
											} else {
												let datasetPublisher;
												let datasetLogo;
												{
													!_.isEmpty(dataset.datasetv2) && _.has(dataset, 'datasetv2.summary.publisher.name')
														? (datasetPublisher = dataset.datasetv2.summary.publisher.name)
														: (datasetPublisher = '');
												}
												{
													!_.isEmpty(dataset.datasetv2) && _.has(dataset, 'datasetv2.summary.publisher.logo')
														? (datasetLogo = dataset.datasetv2.summary.publisher.logo)
														: (datasetLogo = '');
												}

												return (
													<RelatedObject
														key={dataset.id}
														data={dataset}
														activeLink={false}
														doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects}
														tempRelatedObjectIds={this.props.tempRelatedObjectIds}
														datasetPublisher={datasetPublisher}
														datasetLogo={datasetLogo}
													/>
												);
											}
									  })
									: ''}

								{key === 'Tools'
									? !this.props.toolData
										? ''
										: this.props.toolData.map((tool, index) => {
												let modalSubHeadings = this.getRelatedResourceModalSubheadings(
													toolIndex,
													index,
													this.props.myEntitiesSummary.myToolsCount,
													toolCount,
													firstMyToolIndex,
													firstAllToolIndex,
													key
												);

												if (
													this.state.relatedObjectIds.includes(tool.id) ||
													this.state.relatedObjectIds.includes(JSON.stringify(tool.id)) ||
													tool.id === this.props.toolid
												) {
													return '';
												} else {
													return (
														<div>
															{modalSubHeadings}
															<RelatedObject
																key={tool.id}
																data={tool}
																activeLink={false}
																doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects}
																tempRelatedObjectIds={this.props.tempRelatedObjectIds}
															/>
														</div>
													);
												}
										  })
									: ''}

								{key === 'Projects'
									? !this.props.projectData
										? ''
										: this.props.projectData.map((project, index) => {
												let modalSubHeadings = this.getRelatedResourceModalSubheadings(
													projectIndex,
													index,
													this.props.myEntitiesSummary.myProjectsCount,
													projectCount,
													firstMyProjectIndex,
													firstAllProjectIndex,
													key
												);

												if (
													this.state.relatedObjectIds.includes(project.id) ||
													this.state.relatedObjectIds.includes(JSON.stringify(project.id)) ||
													project.id === this.props.projectid
												) {
													return '';
												} else {
													return (
														<div>
															{modalSubHeadings}
															<RelatedObject
																key={project.id}
																data={project}
																activeLink={false}
																doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects}
																tempRelatedObjectIds={this.props.tempRelatedObjectIds}
															/>
														</div>
													);
												}
										  })
									: ''}

								{key === 'Papers'
									? !this.props.paperData
										? ''
										: this.props.paperData.map((paper, index) => {
												let modalSubHeadings = this.getRelatedResourceModalSubheadings(
													paperIndex,
													index,
													this.props.myEntitiesSummary.myPapersCount,
													paperCount,
													firstMyPaperIndex,
													firstAllPaperIndex,
													key
												);

												if (
													this.state.relatedObjectIds.includes(paper.id) ||
													this.state.relatedObjectIds.includes(JSON.stringify(paper.id)) ||
													paper.id === this.props.paperid
												) {
													return '';
												} else {
													return (
														<div>
															{modalSubHeadings}
															<RelatedObject
																key={paper.id}
																data={paper}
																activeLink={false}
																doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects}
																tempRelatedObjectIds={this.props.tempRelatedObjectIds}
															/>
														</div>
													);
												}
										  })
									: ''}

								{key === 'People'
									? !this.props.personData
										? ''
										: this.props.personData.map(person => {
												if (
													this.state.relatedObjectIds.includes(person.id) ||
													this.state.relatedObjectIds.includes(JSON.stringify(person.id))
												) {
													return '';
												} else {
													return (
														<RelatedObject
															key={person.id}
															data={person}
															activeLink={false}
															doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects}
															tempRelatedObjectIds={this.props.tempRelatedObjectIds}
														/>
													);
												}
										  })
									: ''}

								{key === 'Courses'
									? !this.props.courseData
										? ''
										: this.props.courseData.map((course, index) => {
												let modalSubHeadings = this.getRelatedResourceModalSubheadings(
													courseIndex,
													index,
													this.props.myEntitiesSummary.myCoursesCount,
													courseCount,
													firstMyCourseIndex,
													firstAllCourseIndex,
													key
												);

												if (
													this.state.relatedObjectIds.includes(course.id) ||
													this.state.relatedObjectIds.includes(JSON.stringify(course.id))
												) {
													return '';
												} else {
													return (
														<div>
															{modalSubHeadings}
															<RelatedObject
																key={course.id}
																data={course}
																activeLink={false}
																doAddToTempRelatedObjects={this.props.doAddToTempRelatedObjects}
																tempRelatedObjectIds={this.props.tempRelatedObjectIds}
															/>
														</div>
													);
												}
										  })
									: ''}

								<div className='text-center'>
									{key === 'Datasets' && datasetCount > maxResult ? <Pagination>{datasetPaginationItems}</Pagination> : ''}

									{key === 'Tools' && toolCount > maxResult ? <Pagination>{toolPaginationItems}</Pagination> : ''}

									{key === 'Projects' && projectCount > maxResult ? <Pagination>{projectPaginationItems}</Pagination> : ''}

									{key === 'Papers' && paperCount > maxResult ? <Pagination>{paperPaginationItems}</Pagination> : ''}

									{key === 'People' && personCount > maxResult ? <Pagination>{personPaginationItems}</Pagination> : ''}

									{key === 'Courses' && courseCount > maxResult ? <Pagination>{coursePaginationItems}</Pagination> : ''}
								</div>
							</Col>
							<Col sm={2} lg={2} />
						</Row>
					</Container>
				</div>
			</Fragment>
		);
	}
}

export default RelatedResourcesModal;
