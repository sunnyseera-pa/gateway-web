import _ from 'lodash';
import randomstring from 'randomstring';

let autoCompleteLookUps = {"fullname": ['orcid', 'email', 'bio']};

let autoComplete =  (questionId, uniqueId, questionAnswers) => {
        let questionList = {};
        let lookupArr = [...autoCompleteLookUps[`${questionId}`]];
        let activeQuestionId = typeof uniqueId !== 'undefined' ? `${questionId}_${uniqueId}` : questionId;
        let answerObj = questionAnswers[`${activeQuestionId}`];
    
        lookupArr.map(val => {
            let key, value;
            value = answerObj[val] || '';
            key = val;
            if(typeof uniqueId !== 'undefined') 
                key = `${key}_${uniqueId}`;
    
            questionList = {
                ...questionList,
                [`${key}`]: value
            };
        });

        // questionAnswers = {...questionAnswers, ...questionList};
        // return questionAnswers
        return {...questionAnswers, ...questionList};
}

let questionSetToDuplicate = (questionSetId, schema) => {
    let { questionSets } = schema;
    // 1. find questionSet
    let qSet = findQuestionSet(questionSetId, schema);
    if(!_.isEmpty(qSet)) {
        // 2. find the questionSet to duplicate for the qSet
        let {questions: [ question ]} = {...qSet};
        // 3. duplicate questionSet ensure we take a copy
        let qSetDuplicate = [...questionSets].find(q => q.questionSetId === question.input.panelId);
        // 5. modify the questions array questionIds
        let qSetModified = modifyQuestionIds(qSetDuplicate);
        // 6. return the modified questionSet
        return qSetModified;
    }
    return {};
}


let modifyQuestionIds = (questionSet) => {
    let {questionSetId, questions} = {...questionSet};
    let uniqueId = randomstring.generate(5);
    questionSetId = `${questionSetId}_${uniqueId}`;
    // 1.loop over each qObj and if questionId update
    let questionsModified = [...questions].reduce((arr, qValue) => {
        // 2. ensure we copy the original question deep
        let question = _.cloneDeep(qValue);
        // 3. if there is a questionId update
        if(typeof question.questionId !== undefined) {
            question.questionId = `${qValue.questionId.toLowerCase()}_${uniqueId}`;
        }
        // 4. if qObj has input and input.options meaning potential nest, loop over nested options
        if(typeof question.input === 'object' && typeof question.input.options !== 'undefined') {
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
                class: 'btn btn-light'
            },
            question: '',
            questionId: `removeApplicant_${uniqueId}`
        }
    ]
    return {
        ...questionSet,
        "questionSetId": questionSetId,
        "questions": questionsModified
    }

}

let modifyNestedQuestionIds = (questionsArr, uniqueId) => {
    let child;
    let qArr = [...questionsArr];
    
    if (!questionsArr) 
        return; 

    for (let questionObj of qArr) {
        // 1. test each option obj if have conditionals and a length
        if(typeof questionObj.conditionalQuestions !== 'undefined' &&  questionObj.conditionalQuestions.length > 0) {
            // 2. for each option in conditional questions loop
            questionObj.conditionalQuestions
                .forEach(option => {        
                    // 3. test if option has a questionId and if so modify
                    if(typeof option.questionId !== undefined) {
                        option['questionId'] = `${option.questionId.toLowerCase()}_${uniqueId}`;
                    }
                    // 4. test the input for options and if options defined means it is another recursive loop call
                    if(typeof questionObj.input === 'object' && typeof questionObj.input.options !== 'undefined') {
                        child = this.modifyNestedQuestionIds(option.conditionalQuestions, uniqueId);
                    }
                });
        }
        // 5. return recursive call
        if (child) 
            return child; 
    }
 }

 let insertSchemaUpdates = (questionSetId, duplicateQuestionSet, schema) => {
     let {questionPanels, questionSets} = {...schema};
     // 1. update the questionSets with our new duplicatedQuestion
    questionSets = [...questionSets, duplicateQuestionSet];

    let qSet = findQuestionSet(questionSetId, schema);

    if(!_.isEmpty(qSet)) {
        // 2. find the questionSet to duplicate for the qSet
        let {questions: [ question ]} = qSet;
        // 3. get the questionSetId that need to insert into our questionPanel
        if(typeof question.input.panelId !== undefined) {
            let {input: {panelId}} = question;
            // 4. find question panel
            let questionPanel = findQuestionPanel(panelId, questionPanels) || {};
            if(!_.isEmpty(questionPanel)) {
                let { questionSets } = questionPanel;
                // 5. new questionSet to be pushed
                let questionSet = {
                    index: 5,
                    questionSetId: duplicateQuestionSet.questionSetId
                }
                let idx = questionSets.length - 1;
                // 6. push into preliminary position
                questionSets.splice(idx, 0, questionSet);
            }
            return {
                ...schema,
                questionSets,
                questionPanels,
            }
        }
    }
    return {...schema};
 }

 let removeQuestionReferences = (questionSetId, questionId, schema) => {
    let questionSet, question;
    let {questionPanels, questionSets} = {...schema};
    // 1. find questionSet in questionSets
    questionSet = findQuestionSet(questionSetId, schema);
    // 2. find the question in questionSet
    question = findQuestion(questionId, questionSet);
    if(!_.isEmpty(question)) {
        // 3. extract panelId 
        let {input: { panelId }} = question;
        // 4. remove from questionSet
        questionSets = questionSets
            .filter(qs => { return qs.questionSetId !== questionSetId });
        // 5. remove from questionPanel
        questionPanels = questionPanels
            .map(questionSetObj => { return removeQuestionSet(questionSetObj, panelId, questionSetId)});
        // 6. return new schema
        return {
            ...schema,
            questionPanels,
            questionSets,
        }
    }
    return schema;
 }

 let removeQuestionAnswers = (questionId = '', questionAnswers = {}) => {
    if(!_.isEmpty(questionId) && !_.isEmpty(questionAnswers)) {
        let [first, id] = questionId.split('_');
        if(typeof id != 'undefined') {
            Object.keys(questionAnswers).forEach(key => {
                if(key.includes(id)) {
                    questionAnswers[key] = '';
                }
            });
        }
    }
    return questionAnswers;
 }

 let findQuestion = (questionId = '', questionSet = []) => {
    if(!_.isEmpty(questionId) && !_.isEmpty(questionSet)) {
        let {questions} = questionSet;
        if(!_.isEmpty(questions)) {
            return questions.find(q => q.questionId === questionId);
        }
    }
    return {};
 }

 let findQuestionSet = (questionSetId = '', schema = {}) => {
     if(!_.isEmpty(questionSetId) &&  !_.isEmpty(schema)) { 
        let { questionSets } = schema;
        return [...questionSets].find(q => q.questionSetId === questionSetId);
    }
    return {}
 }

 let findQuestionPanel = (panelId = '', questionPanels = []) => {
    if(!_.isEmpty(panelId) && !_.isEmpty(questionPanels)) {
        return [...questionPanels].find(qp => qp.panelId === panelId) || {};
    }
    return {};
 }
 
 let removeQuestionSet = (questionSetObj = {}, panelId = '', questionSetId = '') => {
    if(questionSetObj.panelId === panelId) {
        const items = questionSetObj.questionSets.filter(qs => {
            return qs.questionSetId !== questionSetId;
        });
        questionSetObj.questionSets = items;

        return questionSetObj;
    } 
        
    return questionSetObj;
 }



export default {
    questionSetToDuplicate   : questionSetToDuplicate,
    insertSchemaUpdates      : insertSchemaUpdates,
    removeQuestionReferences : removeQuestionReferences,
    findQuestionSet          : findQuestionSet,
    findQuestion             : findQuestion,
    removeQuestionAnswers    : removeQuestionAnswers,
    autoComplete             : autoComplete
};