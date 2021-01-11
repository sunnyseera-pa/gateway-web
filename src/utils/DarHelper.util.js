import _ from 'lodash';
import randomstring from 'randomstring';
import moment from 'moment';

let autoCompleteLookUps = { fullname: ['orcid', 'email', 'bio'] };

let userTypes = {
	CUSTODIAN: 'custodian',
	APPLICANT: 'applicant',
};

let amendmentStatuses = {
	AWAITINGUPDATES: { text: 'Awaiting updates', icon: 'cycle' },
	UPDATESSUBMITTED: { text: 'Updates submitted', icon: 'check' },
	UPDATESREQUESTED: { text: 'Updates requested', icon: 'flag' },
	UPDATESRECEIVED: { text: 'Updates received', icon: 'flag' },
};

let staticContent = {
	aboutPageNav: {
		pageId: 'about',
		active: true,
		title: 'dataAccessRequestForm.aboutThisApplicationSection.title',
		description: 'dataAccessRequestForm.aboutThisApplicationSection.description'
	},
	aboutPanel: {
		panelId: 'about',
		index: 0,
		pageId: 'about',
	},
	filesNav: {
		pageId: 'files',
		active: false,
		title: 'Files',
		description:
			'Applicant should add any files requested here, as well as any additional files that could support the application. A description should be included to clarify the purpose of each document.',
	},
	filesPanel: {
		panelId: 'files',
		index: 100,
		pageId: 'files',
	},
};

let darCommentTitle = {
	approved: 'Conditions',
	'approved with conditions': 'Conditions',
	rejected: 'Reason for rejection',
};

let darStatus = {
	all: 'all',
	inProgress: 'inProgress',
	submitted: 'submitted',
	inReview: 'inReview',
	approved: 'approved',
	'approved with conditions': 'approved',
	rejected: 'rejected',
};

let darSLAText = {
	inProgress: 'Pre-submission',
	submitted: 'Submitted',
	inReview: 'In review',
	approved: 'Approved',
	'approved with conditions': 'Approved',
	rejected: 'Rejected',
};

let darStatusColours = {
	inProgress: 'gray',
	submitted: 'indigo',
	inReview: 'amber',
	approved: 'green',
	'approved with conditions': 'green',
	rejected: 'red',
};

/**
 * [applicationState acts like enum for generating Counts DAR dashboard]
 *
 */
let darStatusCounts = {
	all: 'allCount',
	inProgress: 'preSubmissionCount',
	submitted: 'submittedCount',
	inReview: 'inReviewCount',
	approved: 'approvedCount',
	'approved with conditions': 'approvedCount',
	rejected: 'rejectedCount',
};

let darStaticPageIds = {
	ABOUT: 'about',
	FILES: 'files',
};

let actionKeys = {
	GUIDANCE: 'guidance',
	REQUESTAMENDMENT: 'requestAmendment',
	CANCELREQUEST: 'cancelRequest',
	REVERTTOPREVIOUSANSWER: 'revertToPreviousAnswer',
};

const amendmentModes = {
	ADDED: 'added',
	REMOVED: 'removed',
	REVERTED: 'reverted',
};

const flagIcons = {
	WARNING: 'fas fa-exclamation-circle warning',
	SUCCESS: 'fas fa-check success',
	DANGER: 'fas fa-exclamation-circle danger',
};

const flagPanelIcons = {
	WARNING: 'fas fa-circle warning',
	SUCCESS: 'fas fa-check success',
	DANGER: 'fas fa-circle danger',
};

/**
 * [generateStatusCounts - Used in DataAccessRequest Dashboard for status counts]
 *
 * @param   {[data]}}  [DAR Objects]
 * @return  {{counts}} [return counts]
 */
let generateStatusCounts = (data = []) => {
	// 1. declare obj structure even if no data
	let counts = {
		allCount: 0,
		approvedCount: 0,
		rejectedCount: 0,
		archivedCount: 0,
		preSubmissionCount: 0,
		inReviewCount: 0,
		submittedCount: 0,
	};

	if (!_.isEmpty(data)) {
		// 2. reduce over data from API to generate structure as above counts
		let totalCounts = [...data].reduce((obj, item, i) => {
			// 3. take out applicationStatus ie, inProgress, submitted etc..
			let { applicationStatus } = item;
			// 4. if the applicationStatus not in our obj, set to 1 with key
			if (!obj[darStatusCounts[applicationStatus]]) {
				obj[darStatusCounts[applicationStatus]] = 1;
			} else {
				// 5. if found increment the count
				obj[darStatusCounts[applicationStatus]] = ++obj[darStatusCounts[applicationStatus]];
			}
			obj['allCount'] = ++i;
			// 6. return obj as count format
			return obj;
		}, {});
		return { ...counts, ...totalCounts };
	}
	// 7. return counts as default
	return counts;
};

let configActionModal = (type = '') => {
	let config = {};
	if (!_.isEmpty(type)) {
		switch (type.toUpperCase()) {
			case 'APPROVE':
				config = {
					title: 'Application approval',
					subTitle: 'Are you sure you want to approve this application?',
					description: false,
					buttons: {
						cancel: {
							label: 'No, nevermind',
							action: 'cancel',
							class: 'button-secondary mr-2',
						},
						confirmApproval: {
							label: 'Confirm approval',
							action: 'confirmApproval',
							class: 'btn btn-primary addButton',
						},
					},
				};
				break;
			case 'REJECT':
				config = {
					title: 'Application rejection',
					subTitle:
						'Are you sure you want to reject this application? If, so please provide the applicant with a reason for the failed request.',
					description: true,
					buttons: {
						cancel: {
							label: 'No, nevermind',
							action: 'cancel',
							class: 'button-secondary mr-2',
						},
						confirmReject: {
							label: 'Confirm rejection',
							action: 'confirmRejection',
							class: 'btn btn-primary addButton',
						},
					},
				};
				break;
			case 'APPROVEWITHCONDITIONS':
				config = {
					title: 'Application approval with conditions',
					subTitle:
						'Are you sure you want to apprive this application? If so, please provide the conditions of this approval to the applicant',
					description: true,
					buttons: {
						cancel: {
							label: 'No, nevermind',
							action: 'cancel',
							class: 'button-secondary mr-2',
						},
						confirmApprovalConditions: {
							label: 'Confirm approval with conditions',
							action: 'confirmApprovalConditions',
							class: 'btn btn-primary addButton',
						},
					},
				};
		}
	}

	return config;
};

let autoComplete = (questionId, uniqueId, questionAnswers) => {
	let questionList = {};
	let lookupArr = [...autoCompleteLookUps[`${questionId}`]];
	let activeQuestionId = typeof uniqueId !== 'undefined' ? `${questionId}_${uniqueId}` : questionId;
	let answerObj = questionAnswers[`${activeQuestionId}`];

	lookupArr.map(val => {
		let key, value;
		value = answerObj[val] || '';
		key = val;
		if (typeof uniqueId !== 'undefined') key = `${key}_${uniqueId}`;

		questionList = {
			...questionList,
			[`${key}`]: value,
		};
	});
	// return questionAnswers
	return { ...questionAnswers, ...questionList };
};

let questionSetToDuplicate = (questionSetId, schema) => {
	let { questionSets } = schema;
	// 1. find questionSet
	let qSet = findQuestionSet(questionSetId, schema);
	if (!_.isEmpty(qSet)) {
		// 2. find the questionSet to duplicate for the qSet
		let {
			questions: [question],
		} = { ...qSet };
		// 3. duplicate questionSet ensure we take a copy
		let qSetDuplicate = [...questionSets].find(q => q.questionSetId === question.input.panelId);
		// 5. modify the questions array questionIds
		let qSetModified = modifyQuestionIds(qSetDuplicate);
		// 6. return the modified questionSet
		return qSetModified;
	}
	return {};
};

let modifyQuestionIds = questionSet => {
	let { questionSetId, questions } = { ...questionSet };
	let uniqueId = randomstring.generate(5);
	questionSetId = `${questionSetId}_${uniqueId}`;
	// 1.loop over each qObj and if questionId update
	let questionsModified = [...questions].reduce((arr, qValue) => {
		// 2. ensure we copy the original question deep
		let question = _.cloneDeep(qValue);
		// 3. if there is a questionId update
		if (typeof question.questionId !== undefined) {
			question.questionId = `${qValue.questionId.toLowerCase()}_${uniqueId}`;
		}
		// 4. if qObj has input and input.options meaning potential nest, loop over nested options
		if (typeof question.input === 'object' && typeof question.input.options !== 'undefined') {
			modifyNestedQuestionIds([...question.input.options], uniqueId);
		}
		return [...arr, question];
	}, []);

	questionsModified = [
		...questionsModified,
		{
			// panelId to be dynamically passed in **HARDCODED*** action must be remove***
			input: {
				type: 'buttonInput',
				action: 'removeApplicant',
				panelId: `applicant`,
				text: 'Remove Applicant',
				class: 'btn btn-light',
			},
			question: '',
			questionId: `removeApplicant_${uniqueId}`,
		},
	];
	return {
		...questionSet,
		questionSetId: questionSetId,
		questions: questionsModified,
	};
};

let modifyNestedQuestionIds = (questionsArr, uniqueId) => {
	let child;
	let qArr = [...questionsArr];

	if (!questionsArr) return;

	for (let questionObj of qArr) {
		// 1. test each option obj if have conditionals and a length
		if (typeof questionObj.conditionalQuestions !== 'undefined' && questionObj.conditionalQuestions.length > 0) {
			// 2. for each option in conditional questions loop
			questionObj.conditionalQuestions.forEach(option => {
				// 3. test if option has a questionId and if so modify
				if (typeof option.questionId !== undefined) {
					option['questionId'] = `${option.questionId.toLowerCase()}_${uniqueId}`;
				}
				// 4. test the input for options and if options defined means it is another recursive loop call
				if (typeof questionObj.input === 'object' && typeof questionObj.input.options !== 'undefined') {
					child = modifyNestedQuestionIds(option.conditionalQuestions, uniqueId);
				}
			});
		}
		// 5. return recursive call
		if (child) return child;
	}
};

let insertSchemaUpdates = (questionSetId, duplicateQuestionSet, schema) => {
	let { questionPanels, questionSets } = { ...schema };
	// 1. update the questionSets with our new duplicatedQuestion
	questionSets = [...questionSets, duplicateQuestionSet];

	let qSet = findQuestionSet(questionSetId, schema);

	if (!_.isEmpty(qSet)) {
		// 2. find the questionSet to duplicate for the qSet
		let {
			questions: [question],
		} = qSet;
		// 3. get the questionSetId that we need to insert into our questionPanel
		if (typeof question.input.panelId !== undefined) {
			let {
				input: { panelId },
			} = question;
			// 4. find question panel
			let questionPanel = findQuestionPanel(panelId, questionPanels) || {};
			if (!_.isEmpty(questionPanel)) {
				let { questionSets } = questionPanel;
				// 5. new questionSet to be pushed
				let questionSet = {
					index: 5,
					questionSetId: duplicateQuestionSet.questionSetId,
				};
				let idx = questionSets.length - 1;
				// 6. push into preliminary position
				questionSets.splice(idx, 0, questionSet);
			}
			return {
				...schema,
				questionSets,
				questionPanels,
			};
		}
	}
	return { ...schema };
};

let removeQuestionReferences = (questionSetId, questionId, schema) => {
	let questionSet, question;
	let { questionPanels, questionSets } = { ...schema };
	// 1. find questionSet in questionSets
	questionSet = findQuestionSet(questionSetId, schema);
	// 2. find the question in questionSet
	question = findQuestion(questionId, questionSet);
	if (!_.isEmpty(question)) {
		// 3. extract panelId
		let {
			input: { panelId },
		} = question;
		// 4. remove from questionSet
		questionSets = questionSets.filter(qs => {
			return qs.questionSetId !== questionSetId;
		});
		// 5. remove from questionPanel
		questionPanels = questionPanels.map(questionSetObj => {
			return removeQuestionSet(questionSetObj, panelId, questionSetId);
		});
		// 6. return new schema
		return {
			...schema,
			questionPanels,
			questionSets,
		};
	}
	return schema;
};

let removeQuestionAnswers = (questionId = '', questionAnswers = {}) => {
	if (!_.isEmpty(questionId) && !_.isEmpty(questionAnswers)) {
		let [first, id] = questionId.split('_');
		if (typeof id != 'undefined') {
			Object.keys(questionAnswers).forEach(key => {
				if (key.includes(id)) {
					questionAnswers[key] = '';
				}
			});
		}
	}
	return questionAnswers;
};

let findQuestion = (questionId = '', questionSet = []) => {
	if (!_.isEmpty(questionId) && !_.isEmpty(questionSet)) {
		let { questions } = questionSet;
		if (!_.isEmpty(questions)) {
			return questions.find(q => q.questionId === questionId);
		}
	}
	return {};
};

let findQuestionSet = (questionSetId = '', schema = {}) => {
	if (!_.isEmpty(questionSetId) && !_.isEmpty(schema)) {
		let { questionSets } = schema;
		return [...questionSets].find(q => q.questionSetId === questionSetId);
	}
	return {};
};

let findQuestionPanel = (panelId = '', questionPanels = []) => {
	if (!_.isEmpty(panelId) && !_.isEmpty(questionPanels)) {
		return [...questionPanels].find(qp => qp.panelId === panelId) || {};
	}
	return {};
};

let removeQuestionSet = (questionSetObj = {}, panelId = '', questionSetId = '') => {
	if (questionSetObj.panelId === panelId) {
		const items = questionSetObj.questionSets.filter(qs => {
			return qs.questionSetId !== questionSetId;
		});
		questionSetObj.questionSets = items;

		return questionSetObj;
	}

	return questionSetObj;
};

/**
 * [TotalQuestionAnswered]
 * @desc - Sets total questions answered for each section
 */
let totalQuestionsAnswered = (component, panelId = '', questionAnswers = {}) => {
	let totalQuestions = 0;
	let totalAnsweredQuestions = 0;

	if (_.isEmpty(panelId)) {
		const formPanels = [...component.state.jsonSchema.formPanels];
		let applicationQuestionAnswers = formPanels.reduce(
			(acc, val) => {
				let countObj = totalQuestionsAnswered(component, val.panelId);
				acc[0] = acc[0] + countObj.totalAnsweredQuestions;
				acc[1] = acc[1] + countObj.totalQuestions;
				return acc;
			},
			[0, 0]
		);
		return {
			totalAnsweredQuestions: applicationQuestionAnswers[0],
			totalQuestions: applicationQuestionAnswers[1],
		};
	} else {
		if (_.isEmpty(questionAnswers)) ({ questionAnswers } = { ...component.state });
		// 1. deconstruct state
		let {
			jsonSchema: { questionSets },
		} = { ...component.state };
		// 2. omits out blank null, undefined, and [] values from this.state.answers
		questionAnswers = _.pickBy({ ...questionAnswers }, v => v !== null && v !== undefined && v.length != 0);
		// 3. find the relevant questionSet { questionSetId: applicant }
		let questionSet = [...questionSets].find(q => q.questionSetId === panelId) || '';

		if (!_.isEmpty(questionSet)) {
			// 4. get questions
			let { questions } = questionSet;
			// 5. total questions in panel
			totalQuestions = questions.length;
			let totalQuestionKeys = _.map({ ...questions }, 'questionId');

			// 6. return count of how many questions completed
			if (!_.isEmpty(questionAnswers)) {
				let count = Object.keys(questionAnswers).map(value => {
					return totalQuestionKeys.includes(value) ? totalAnsweredQuestions++ : totalAnsweredQuestions;
				});
			}
			return { totalAnsweredQuestions, totalQuestions };
		}
		return { totalAnsweredQuestions: 0, totalQuestions: 0 };
	}
};

/**
 * [saveTime]
 * @desc Sets the lastSaved state on a field
 */
let saveTime = () => {
	let currentTime = moment().format('DD MMM YYYY HH:mm');
	let lastSaved = `Last saved ${currentTime}`;
	return lastSaved;
};

/**
 * [getSavedAgo]
 * @desc Returns the saved time for DAR
 */
let getSavedAgo = lastSaved => {
	if (!_.isEmpty(lastSaved)) return lastSaved;
	else return ``;
};

let getActiveQuestion = (questionsArr, questionId) => {
	let child;

	if (!questionsArr) return;

	for (const questionObj of questionsArr) {
		if (questionObj.questionId === questionId) return questionObj;

		if (typeof questionObj.input === 'object' && typeof questionObj.input.options !== 'undefined') {
			questionObj.input.options
				.filter(option => {
					return typeof option.conditionalQuestions !== 'undefined' && option.conditionalQuestions.length > 0;
				})
				.forEach(option => {
					if(!child) {
						child = getActiveQuestion(option.conditionalQuestions, questionId);
					}
				});
		}

		if (child) return child;
	}
};

let calcAccordionClasses = (active, allowedNavigation) => {
	let classes = ['black-16'];
	if (!allowedNavigation) classes = [...classes, 'disabled'];

	if (active) classes = [...classes, 'active'];

	return classes;
};

let createTopicContext = (datasets = []) => {
	if (_.isEmpty(datasets)) {
		return {
			datasets: [],
			tags: [],
			relatedObjectIds: [],
			subTitle: '',
			allowNewMessage: false,
		};
	}
	let dataRequestModalContent = {},
		allowsMessaging = false,
		requiresModal = false,
		allowNewMessage = false;
	let { publisherObj = {}, contactPoint = '', publisher = '' } = datasets[0];
	if (!_.isEmpty(publisherObj)) {
		dataRequestModalContent = publisherObj.dataRequestModalContent;
		allowsMessaging = publisherObj.allowsMessaging;
		requiresModal = !_.isEmpty(publisherObj.dataRequestModalContent) ? true : false;
		allowNewMessage = publisherObj.allowsMessaging;
	}
	return {
		requiresModal,
		allowNewMessage,
		allowsMessaging,
		dataRequestModalContent,
		datasets:
			datasets.map(dataset => {
				let { datasetId } = dataset;
				return { datasetId, publisher };
			}) || [],
		tags: datasets.map(dataset => dataset.name) || [],
		relatedObjectIds: datasets.map(dataset => dataset._id),
		title: publisher || '',
		subTitle: datasets.map(dataset => dataset.name).join(' '),
		contactPoint,
	};
};

let createModalContext = (datasets = []) => {
	let dataRequestModalContent = {},
		allowsMessaging = false,
		requiresModal = false,
		allowNewMessage = false;
	let { publisherObj = {}, contactPoint = '', publisher = '' } = datasets[0];
	if (!_.isEmpty(publisherObj)) {
		dataRequestModalContent = publisherObj.dataRequestModalContent;
		allowsMessaging = publisherObj.allowsMessaging;
		requiresModal = !_.isEmpty(publisherObj.dataRequestModalContent) ? true : false;
		allowNewMessage = publisherObj.allowsMessaging;
	}
	return {
		requiresModal,
		allowNewMessage,
		allowsMessaging,
		dataRequestModalContent,
		datasets,
		contactPoint,
		title: publisher,
	};
};

/**
 * [removeStaticPages]
 * @desc 		Removes the static pageId to stop Nav from duplicating
 * @param   {[object]}  schema  [schema]
 * @return  {[object]}          [return schema]
 */
let removeStaticPages = (schema = {}) => {
	let { pages, formPanels } = { ...schema };
	// filter pageId within pages
	let originalPages = _.uniqBy(pages, 'pageId');
	// unique panelId within form panels
	let originalFormPanels = _.uniqBy(formPanels, 'panelId');
	// return updated schema
	return {
		...schema,
		pages: originalPages,
		formPanels: originalFormPanels,
	};
};

export default {
	questionSetToDuplicate: questionSetToDuplicate,
	insertSchemaUpdates: insertSchemaUpdates,
	removeQuestionReferences: removeQuestionReferences,
	findQuestionSet: findQuestionSet,
	findQuestion: findQuestion,
	removeQuestionAnswers: removeQuestionAnswers,
	autoComplete: autoComplete,
	totalQuestionsAnswered: totalQuestionsAnswered,
	saveTime: saveTime,
	getSavedAgo: getSavedAgo,
	getActiveQuestion: getActiveQuestion,
	calcAccordionClasses: calcAccordionClasses,
	createTopicContext: createTopicContext,
	createModalContext: createModalContext,
	configActionModal: configActionModal,
	generateStatusCounts: generateStatusCounts,
	staticContent: staticContent,
	darStatus: darStatus,
	darStatusColours: darStatusColours,
	darSLAText: darSLAText,
	darCommentTitle: darCommentTitle,
	darStaticPageIds: darStaticPageIds,
	actionKeys: actionKeys,
	amendmentModes: amendmentModes,
	flagIcons: flagIcons,
	flagPanelIcons: flagPanelIcons,
	userTypes: userTypes,
	amendmentStatuses: amendmentStatuses,
	removeStaticPages: removeStaticPages,
};
