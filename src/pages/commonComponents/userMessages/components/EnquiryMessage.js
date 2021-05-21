import React, { useState, useRef, useEffect } from 'react';
import { isEmpty, has, isString, isObject } from 'lodash';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import TypeaheadDataset from '../../../DataAccessRequest/components/TypeaheadDataset/TypeaheadDataset';

export const EnquiryMessage = ({ topic, onDatasetsRequested, onFirstMessageSubmit }) => {
  const formRef = useRef();
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const valueMapper = {
    "safepeopleprimaryapplicantfullname": { title: 'Applicant name' },
    "safepeopleprimaryapplicantorganisationname":  { title: 'Organisation' },
    "safepeopleprimaryapplicantemail": { title: 'Email' },
    "safepeopleprimaryapplicanttelephone": { title: 'Contact number' },
    "safeprojectprojectdetailstitle": { title: 'Project title' },
    "safeprojectprojectdetailsaimsobjectivesrationale": {title: "Project aim" },
    datasetsRequested:  {title: "Datasets being requested" },
    "safedata-otherdatasetsintentiontolinkdata":  {title: "Datasets you would like to link to link with this one" },
    "safedataotherdatasetslinkadditionaldatasetslinkagedetails": {title: "Names of the linked datasets" },
    datasetsInterestedIn:  {title: 'Do you know which parts of the dataset you are interested in?'},
    "safedatadatafieldsdatarequiredjustification": {title: 'Parts of the dataset interesed in'},
    funding: {title: 'Funding'},
    "safeprojectprojectdetailspublicbenefitimpact": {title: 'Research benefits'},
  }

  // Funding do not map as per zeplin design
  const initalValues = {
    "safepeopleprimaryapplicantfullname": '',
    "safepeopleprimaryapplicantorganisationname": '',
    "safepeopleprimaryapplicantemail": '',
    "safepeopleprimaryapplicanttelephone": '',
    "safeprojectprojectdetailstitle": '',
    "safeprojectprojectdetailsaimsobjectivesrationale": '',
    datasetsRequested: selectedDatasets,
    "safedata-otherdatasetsintentiontolinkdata": '',
    "safedataotherdatasetslinkadditionaldatasetslinkagedetails": '',
    datasetsInterestedIn:  '',
    "safedatadatafieldsdatarequiredjustification": '',
    funding: '',
    "safeprojectprojectdetailspublicbenefitimpact": '',
  }

  const schema = Yup.object({
    "safepeopleprimaryapplicantfullname": Yup.string().trim().required('Required'),
    "safepeopleprimaryapplicantorganisationname": Yup.string().trim().required('Required'),
    "safepeopleprimaryapplicantemail": Yup.string().trim().email().required('Required'),
    "safepeopleprimaryapplicanttelephone": Yup.string()
      .matches(
          /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
        "Invalid phone number"
      ),
    "safeprojectprojectdetailstitle": Yup.string().trim().required('Required'),
    "safeprojectprojectdetailsaimsobjectivesrationale": Yup.string().trim().required('Required'),
    datasetsRequested: Yup.array()
      .required('Required')
      .min(1, 'Required'),
    "safedata-otherdatasetsintentiontolinkdata": Yup.string().required('Select an option'),
    "safedataotherdatasetslinkadditionaldatasetslinkagedetails": Yup.string().when("safedata-otherdatasetsintentiontolinkdata",{ is: "Yes", then: Yup.string().required('Required')}),
    datasetsInterestedIn: Yup.string().required('Select an option'),
    "safedatadatafieldsdatarequiredjustification": Yup.string().when('datasetsInterestedIn',{ is: "Yes", then: Yup.string().required('Required')}),
    funding: Yup.string().trim().required('Required'),
    "safeprojectprojectdetailspublicbenefitimpact": Yup.string().trim().required('Required')
  });

  /**
   * hasErrors
   * @desc error handler for form highlight validation with red border]
   * @param   {[Obejct]}  touched  [touched]
   * @param   {[Object]}  errors   [errors]
   * @param   {[String]}  field    [field]
   *
   * @return  {[boolean]}  [return valid]
   */
  const hasErrors = (touched, errors, field) => {
		if (
			touched &&
			errors &&
			typeof errors[field] !== 'undefined' &&
			typeof touched[field] !== 'undefined' &&
			errors[field] &&
			touched[field]
		) {
			return true;
		}
		return false;
	};

  const onHandleDataSetChange = (selected, key, setFieldValue) => {
    console.log(selected);
    // set field value using formik hook - setFieldValue
    setFieldValue(key, selected);
    // update dataset selection in message header
    onDatasetsRequested(selected);
  }

  /**
   * [getFormattedValue]
   *
   * @desc formats each value based on type string | array 
   * @param   {String|Array}  value  [value of the field from fromik]
   * @return  {String}  [return in string format]
   */
  const getFormattedValue = (value) => {
    if (isString(value) && !isEmpty(value))
      return value;

    if (Array.isArray(value)) {
      return [...value].reduce((message, val) => {
          let { name = '' } = val;
          message += `${name} `;
          return message;
      }, '');
    }

    return '';
  }

  /**
   * handleFormSubmission
   * @desc  Handles formik valid submission, API call
   */
  const handleFormSubmission = async () => {
    let {
			current: { values, setSubmitting },
		} = formRef;

    console.log(formRef);
    // new message that is formatted
    let message = '';
    // from formik get the keys of our questionIds
    const keys = Object.keys(values);
    // if keys loop and get readable values Applicant name: 'Rose Clarke'....
    if(keys.length) {
      // loop keys
      for (let key of keys) {
        // get readable quesiton
        const {title} = valueMapper[key];
        // get the value as we have different types, string...array etc
        const value = getFormattedValue(values[key]);
        // build our message with line breaks
        if(!isEmpty(value))
          message += `${title}: ${value} \n`;
      }
      // clear formik form of value
      // TODO 
      // send to parent component UserMessages
      onFirstMessageSubmit(message);
    }

  };

  useEffect(() => {
    if(has(topic, 'tags') && !isEmpty(topic.tags)) {
      setSelectedDatasets(topic.tags);
    }
  }, []);


  return (
    <div className="enquiry-message-container">
      <div className="gray700-13 text-center">After submitting the information below you will be able to message the data custodian freely.</div>
      <Formik
        enableReinitialize
        initialValues={initalValues}
        validationSchema={schema}
        innerRef={formRef}
				onSubmit={async () => {
					await handleFormSubmission();
				}}>
          {(
            { isSubmitting, values, errors, touched, setFieldValue }) => (
              <Form autoComplete='off'>
                <div className="enquiry-message-form">

                {/* APPLICANT NAME */}
                <div className='form-group gray800-14'>
                  <label htmlFor={`safepeopleprimaryapplicantfullname`} className='form-label'>
                    Applicant Name *
                  </label>
                  <Field
                    type='text'
                    name={`safepeopleprimaryapplicantfullname`}
                    data-test-id={`safepeopleprimaryapplicantfullname`}
                    className={`form-control gray800-14 ${hasErrors(touched, errors, 'safepeopleprimaryapplicantfullname') ? 'is-invalid' : '' }`}
                  />
                  {hasErrors(touched, errors, 'safepeopleprimaryapplicantfullname') ? (
                    <div className='errorMessages'>{errors["safepeopleprimaryapplicantfullname"]}</div>
                  ) : null}
                </div>

                {/* ORGANISATION */}
                <div className='form-group gray800-14'>
                  <label htmlFor={`safepeopleprimaryapplicantorganisationname`} className='form-label'>
                    Organisation *
                  </label>
                  <Field
                    type='text'
                    name={`safepeopleprimaryapplicantorganisationname`}
                    data-test-id={`safepeopleprimaryapplicantorganisationname`}
                    className={`form-control gray800-14 ${hasErrors(touched, errors, 'safepeopleprimaryapplicantorganisationname') ? 'is-invalid' : '' }`}
                  />
                  {hasErrors(touched, errors, 'safepeopleprimaryapplicantorganisationname') ? (
                    <div className='errorMessages'>{errors["safepeopleprimaryapplicantorganisationname"]}</div>
                  ) : null}
                </div>

                {/* EMAIL */}
                <div className='form-group gray800-14'>
                  <label htmlFor={`safepeopleprimaryapplicantemail`} className='form-label'>
                    Email * 
                    <span className="gray700-13">Where do you want the data custodian to contact you?</span>
                  </label>
                  <Field
                    type='email'
                    name={`safepeopleprimaryapplicantemail`}
                    data-test-id={`safepeopleprimaryapplicantemail`}
                    className={`form-control gray800-14 ${hasErrors(touched, errors, 'safepeopleprimaryapplicantemail') ? 'is-invalid' : '' }`}
                  />
                  { hasErrors(touched, errors, 'safepeopleprimaryapplicantemail') ? (
                    <div className='errorMessages'>{errors["safepeopleprimaryapplicantemail"]}</div>
                  ) : null }
                </div>

                {/* CONTACT NUMBER */}
                <div className='form-group gray800-14'>
                  <label htmlFor={`safepeopleprimaryapplicanttelephone`} className='form-label'>
                    Contact number (optional) 
                  </label>
                  <Field
                    type='text'
                    name={`safepeopleprimaryapplicanttelephone`}
                    data-test-id={`safepeoplesafepeopleprimaryapplicanttelephone`}
                    className={`form-control gray800-14`}
                  />
                </div>

                {/* PROJECT TITLE */}
                <div className='form-group gray800-14'>
                  <label htmlFor={`safeprojectprojectdetailstitle`} className='form-label'>
                    Project title *
                  </label>
                  <Field
                    type='text'
                    name={`safeprojectprojectdetailstitle`}
                    data-test-id={`safeprojectprojectdetailstitle`}
                    className={`form-control gray800-14 ${hasErrors(touched, errors, 'safeprojectprojectdetailstitle') ? 'is-invalid' : '' }`}
                  />
                  { hasErrors(touched, errors, 'safeprojectprojectdetailstitle') ? (
                    <div className='errorMessages'>{errors["safeprojectprojectdetailstitle"]}</div>
                  ) : null }
                </div>

                {/* PROJECT AIM */}
                <div className='form-group gray800-14'>
                  <label htmlFor={`safeprojectprojectdetailsaimsobjectivesrationale`} className='form-label'>
                    Project aim *
                    <span className="gray700-13">Please briefly explain the purpose of your research and why you require this dataset</span>
                  </label>
                  <Field
                    as="textarea"
                    name={`safeprojectprojectdetailsaimsobjectivesrationale`}
                    data-test-id={`safeprojectprojectdetailsaimsobjectivesrationale`}
                    className={`form-control gray800-14 ${hasErrors(touched, errors, 'safeprojectprojectdetailsaimsobjectivesrationale') ? 'is-invalid' : '' }`}
                  />
                  { hasErrors(touched, errors, 'safeprojectprojectdetailsaimsobjectivesrationale') ? (
                    <div className='errorMessages'>{errors["safeprojectprojectdetailsaimsobjectivesrationale"]}</div>
                  ) : null }
                </div>

                {/* DATASETS  REQUESTED */}
                <div className='form-group gray800-14'>
                  <label htmlFor={`datasetsRequested`} className='form-label gray800-14'>
                    Datasets being requested *
                  </label>
                  <TypeaheadDataset
										selectedDatasets={topic.tags}
                    readOnly={false}
                    allowAllCustodians={false}
										onHandleDataSetChange={selected => {
                      onHandleDataSetChange(selected, 'datasetsRequested', setFieldValue);
                    }}
                    typeaheadClass={`${
                      hasErrors(touched, errors, 'datasetsRequested') ? 'is-invalid' : ''
                    }`}
                  />
                  { hasErrors(touched, errors, 'datasetsRequested') ? (
                    <div className='errorMessages'>{errors.datasetsRequested}</div>
                  ) : null }
                </div>

                {/* DATASETS LINK WITH RADIO */}
                <div className='form-group'>
                  <label htmlFor={`safedata-otherdatasetsintentiontolinkdata`} className='form-label gray800-14'>
                    Do you have any datasets you would like to link with this one? *                    
                  </label>
                  <div className="form-check">
                    <Field type="radio" name="safedata-otherdatasetsintentiontolinkdata" value="Yes" />
                    <label className={`
                        form-check-label 
                        gray800-14`} 
                        htmlFor="safedata-otherdatasetsintentiontolinkdata">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                  <Field type="radio" name="safedata-otherdatasetsintentiontolinkdata" value="No" />
                    <label className={`
                        form-check-label 
                        gray800-14`} 
                        htmlFor="safedata-otherdatasetsintentiontolinkdata">
                      No
                    </label>
                  </div>
                  { hasErrors(touched, errors, 'safedata-otherdatasetsintentiontolinkdata') ? (
                    <div className='errorMessages'>{errors["safedata-otherdatasetsintentiontolinkdata"]}</div>
                  ) : null }
                </div>

                {/* IDENTIFY NAMES OF DATASETS */}
                {  values && values["safedata-otherdatasetsintentiontolinkdata"] === "Yes"  ?
                <div className='form-group gray800-14'>
                  <label htmlFor={`safedataotherdatasetslinkadditionaldatasetslinkagedetails`} className='form-label'>
                    Please identify the names of the datasets *
                  </label>
                  <Field
                    as="textarea"
                    name={`safedataotherdatasetslinkadditionaldatasetslinkagedetails`}
                    data-test-id={`safedataotherdatasetslinkadditionaldatasetslinkagedetails`}
                    className={`form-control gray800-14 ${hasErrors(touched, errors, 'safedataotherdatasetslinkadditionaldatasetslinkagedetails') ? 'is-invalid' : '' }`}
                  />
                   { hasErrors(touched, errors, 'safedataotherdatasetslinkadditionaldatasetslinkagedetails') ? (
                    <div className='errorMessages'>{errors["safedataotherdatasetslinkadditionaldatasetslinkagedetails"]}</div>
                  ) : null }
                </div>
                :  '' }

                {/* PARTS OF DATASET INTERESTED IN */}
                <div className='form-group'>
                  <label htmlFor={`datasetsInterestedIn`} className='form-label gray800-14'>
                    Do you know which parts of the dataset you are interested in? *                 
                  </label>
                  <div className="form-check">
                    <Field type="radio" name="datasetsInterestedIn" value="Yes" />
                    <label className={`
                        form-check-label 
                        gray800-14`} 
                        htmlFor="datasetsInterestedIn">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                  <Field type="radio" name="datasetsInterestedIn" value="No" />
                    <label className={`
                        form-check-label 
                        gray800-14`} 
                        htmlFor="datasetsInterestedIn">
                      No
                    </label>
                  </div>
                  { hasErrors(touched, errors, 'datasetsInterestedIn') ? (
                    <div className='errorMessages'>{errors.datasetsInterestedIn}</div>
                  ) : null }
                </div>

                {/* EXPLAIN PARTS  OF DATASETS */}
                {  values && values.datasetsInterestedIn === "Yes"  ?
                <div className='form-group gray800-14'>
                  <label htmlFor={`safedatadatafieldsdatarequiredjustification`} className='form-label'>
                    Please explain which parts of the dataset * 
                  </label>
                  <Field
                    as="textarea"
                    name={`safedatadatafieldsdatarequiredjustification`}
                    data-test-id={`safedatadatafieldsdatarequiredjustification`}
                    className={`form-control gray800-14 ${hasErrors(touched, errors, 'safedatadatafieldsdatarequiredjustification') ? 'is-invalid' : '' }`}
                  />
                   { hasErrors(touched, errors, 'safedatadatafieldsdatarequiredjustification') ? (
                    <div className='errorMessages'>{errors["safedatadatafieldsdatarequiredjustification"]}</div>
                  ) : null }
                </div>
                :  '' }

                {/* FUNDING */}
                <div className='form-group gray800-14'>
                  <label htmlFor={`funding`} className='form-label'>
                    Funding *
                    <span className="gray700-13">Please provide information on whether your project is funded</span>
                  </label>
                  <Field
                    as="textarea"
                    name={`funding`}
                    data-test-id={`funding`}
                    className={`form-control ${hasErrors(touched, errors, 'funding') ? 'is-invalid' : '' }`}
                  />
                  { hasErrors(touched, errors, 'funding') ? (
                    <div className='errorMessages'>{errors.funding}</div>
                  ) : null }
                </div>

                {/* RESEARCH BENEFITS */}
                <div className='form-group gray800-14'>
                  <label htmlFor={`safeprojectprojectdetailspublicbenefitimpact`} className='form-label'>
                    Research benefits *
                    <span className="gray700-13">Please provide evidence of how your research will benefit the health and social care system</span>
                  </label>
                  <Field
                    as="textarea"
                    name={`safeprojectprojectdetailspublicbenefitimpact`}
                    data-test-id={`safeprojectprojectdetailspublicbenefitimpact`}
                    className={`form-control gray800-14 ${hasErrors(touched, errors, 'safeprojectprojectdetailspublicbenefitimpact') ? 'is-invalid' : '' }`}
                  />
                  { hasErrors(touched, errors, 'safeprojectprojectdetailspublicbenefitimpact') ? (
                    <div className='errorMessages'>{errors["safeprojectprojectdetailspublicbenefitimpact"]}</div>
                  ) : null }
                </div>

                {/* SUBMIT */}
                <div className="d-flex flex-row-reverse p-2">
                  <button className='button-secondary' type="submit">Send message</button>
                </div>
                
                </div>
                {/* <pre>{errors ? errors : ''}</pre> */}
              </Form>
          )}
      </Formik>
    </div>
  )
}
