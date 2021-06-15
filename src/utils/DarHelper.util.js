import _ from 'lodash';
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
		title: 'Before you begin',
		description:
			'Preparation is key to a successful data access request. You need to be able to demonstrate how you will ensure safe use of patient data and the potential for public benefit. The steps below are intended to help you get off to a good start.',
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

let darApplicationTypes = {
	inProgress: 'inProgress',
	initial: 'initial',
	resubmission: 'resubmission',
	amendment: 'amendment',
	extension: 'extension',
	renewal: 'renewal',
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

/**
 * [TotalQuestionAnswered]
 * @desc - Sets total questions answered for each section
 */
let totalQuestionsAnswered = (component, panelId = '', questionAnswers = {}, jsonSchema = {}) => {
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
		// 1. deconstruct schema
		if (_.isEmpty(jsonSchema)) {
			({ jsonSchema } = { ...component.state });
		}
		let { questionPanels = [], questionSets = [] } = jsonSchema;
		// 2. omits out blank null, undefined, and [] values from this.state.answers
		questionAnswers = _.pickBy({ ...questionAnswers }, v => v !== null && v !== undefined && v.length != 0);
		// 3. find the relevant questionSetIds within the panel
		const qPanel = questionPanels.find(qp => qp.panelId === panelId);
		if (!_.isNil(qPanel)) {
			const { questionSets: panelQuestionSets = [] } = qPanel;
			const qsIds = panelQuestionSets.map(qs => qs.questionSetId);
			// 4. find the relevant questionSets
			const qsets = questionSets.filter(qs => qsIds.includes(qs.questionSetId));
			// 5. ensure at least one was found
			if (!_.isEmpty(qsets)) {
				// 6. iterate through each question set to calculate answered and unanswered
				for (const questionSet of qsets) {
					// 7. get questions
					const { questions = [] } = questionSet;
					// 8. filter out buttons added as questions
					const filteredQuestions = filterInvalidQuestions(questions);
					// 9. Iterate through each top-level question
					for (const question of filteredQuestions) {
						// 10. Recursively gather question status from each question path
						const conditionalQuestions = getRecursiveQuestionCounts(question, questionAnswers);
						totalQuestions += conditionalQuestions.questionCount;
						totalAnsweredQuestions += conditionalQuestions.answerCount;
					}
				}
				// 11. Return question totals
				return { totalAnsweredQuestions, totalQuestions };
			}
		}
		return { totalAnsweredQuestions: 0, totalQuestions: 0 };
	}
};

let filterInvalidQuestions = questions => {
	const filteredQuestions = [...questions].filter(q => {
		const { input = {} } = q;
		return !_.isEmpty(input) && input.type !== 'buttonInput';
	});
	return filteredQuestions;
};

let getRecursiveQuestionCounts = (question, questionAnswers) => {
	let questionCount = 0,
		answerCount = 0;
	// 1. Count parent question
	questionCount++;
	// 2. Count parent question if it has been answered
	if (_.has(questionAnswers, question.questionId)) {
		answerCount++;
		// 3. Check if the question has children/conditional questions
		if (_.has(question, 'input.options')) {
			// 4. Check if question allows multiple answers
			let conditionalQuestions = [];
			const answeredOptions = question.input.options.filter(opt => {
				return (
					(Array.isArray(questionAnswers[question.questionId]) && questionAnswers[question.questionId].includes(opt.value)) ||
					questionAnswers[question.questionId] === opt.value
				);
			});
			if (!_.isEmpty(answeredOptions)) {
				answeredOptions.forEach(answeredOption => {
					({ conditionalQuestions = [] } = answeredOption);
					// 4. Recursively iterate through conditional questions
					conditionalQuestions.forEach(function iter(currentQuestion) {
						// 5. Ensure valid question type (remove buttons)
						const { input = {} } = currentQuestion;
						if (!_.isEmpty(input) && input.type !== 'buttonInput') {
							// 6. Increment question count
							questionCount++;
							// 7. Increment answer count if answer found
							if (_.has(questionAnswers, currentQuestion.questionId)) {
								answerCount++;
								// 8. Call next level of recursion if answer has been provided
								if (_.has(currentQuestion, 'input.options')) {
									// 9. Find option based on answer provided
									let recursiveConditionalQuestions = [];
									const answeredRecursiveOptions = currentQuestion.input.options.filter(opt => {
										return (
											(Array.isArray(questionAnswers[currentQuestion.questionId]) &&
												questionAnswers[currentQuestion.questionId].includes(opt.value)) ||
											questionAnswers[currentQuestion.questionId] === opt.value
										);
									});
									if (!_.isEmpty(answeredRecursiveOptions)) {
										answeredRecursiveOptions.forEach(answeredRecursiveOption => {
											({ conditionalQuestions: recursiveConditionalQuestions = [] } = answeredRecursiveOption);
											// 10. Repeat function call
											if (!_.isEmpty(recursiveConditionalQuestions)) {
												Array.isArray(recursiveConditionalQuestions) && recursiveConditionalQuestions.forEach(iter);
											}
										});
									}
								}
							}
						}
					});
				});
			}
		}
	}
	return { questionCount, answerCount };
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
					if (!child) {
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
	findQuestionSet: findQuestionSet,
	findQuestion: findQuestion,
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
	darApplicationTypes: darApplicationTypes,
	actionKeys: actionKeys,
	amendmentModes: amendmentModes,
	flagIcons: flagIcons,
	flagPanelIcons: flagPanelIcons,
	userTypes: userTypes,
	amendmentStatuses: amendmentStatuses,
	removeStaticPages: removeStaticPages,
};
