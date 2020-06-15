import _ from 'lodash';

let getQuestionPanelInvalidQuestions = (Winterfell, questionSets, questionAnswers) => {
    debugger;
    return Winterfell.validation.default.getQuestionPanelInvalidQuestions(questionSets, questionAnswers);
}

let buildInvalidMessages = (Winterfell, invalidQuestions)  => {
    let validationMessages = {};
    if (Object.keys(invalidQuestions).length > 0) {
        validationMessages =  _.mapValues(invalidQuestions, validations => {
            return validations.map(validation => {
                return {
                    questionSetId: validation.questionSetId,                        
                    message : Winterfell.errorMessages.getErrorMessage(validation)
                };
            })
        });
    }
    return validationMessages;
}

let formatValidationObj = (validationSet = {}, questionPanels = []) => {
    let errorArr = [];
    let groupedPages = {};
    let errorObj = {}
    if(!_.isEmpty(validationSet)) {
        // 1. return [{ pageId, questionSetId, message, fieldID}]
        errorArr = _.reduce({...validationSet}, (arr, errors, fieldId) => {
            if(errors.length) {
                errors.map((error) => {
                    let {  questionSetId, message } = error;
                    let { pageId } = questionPanels.find(el => el.panelId === questionSetId) || '';
                    arr.push({pageId, questionSetId, message, fieldId})
                });
            }
            return arr;
        }, []);

        if(errorArr.length) {
            // 2. group our new errorArr by pageId key [SafePeople: {}, SafeProject: {}]
            groupedPages = _.groupBy(errorArr, 'pageId');
            // 3. returns an object, iterate through keys, perform second groupBy to on questionSetId result [SafePeople: {applicant: {...}}]
            errorObj = _.forEach(groupedPages, (value, key) => {
                        groupedPages[key] = _.groupBy(groupedPages[key], (item) => {
                            return item.questionSetId;
                        });
                    });
        }
    }
    return errorObj;
}

export default {
    getQuestionPanelInvalidQuestions   : getQuestionPanelInvalidQuestions,
    buildInvalidMessages               : buildInvalidMessages,
    formatValidationObj                : formatValidationObj
};