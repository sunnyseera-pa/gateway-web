import React, { useState, useRef, useEffect } from 'react';
import { isEmpty, has } from 'lodash';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import TypeaheadDataset from '../../../DataAccessRequest/components/TypeaheadDataset/TypeaheadDataset';

export const EnquiryMessage = ({ topic, onDatasetsRequested }) => {
  const formRef = useRef();
  const [selectedDatasets, setSelectedDatasets] = useState([]);

  const initalValues = {
    safepeopleprimaryapplicantfullname: '',
    safepeopleprimaryapplicantorganisationname: '',
    safepeopleprimaryapplicantemail: '',
    safepeopleprimaryapplicanttelephone: '',
    projectTitle: '',
    projectAim: '',
    datasetsRequested: selectedDatasets,
    linkedDatasets: '',
    datasetNames: '',
    datasetsInterestedIn:  '',
    funding: '',
    researchBenefits: '',
  }

  const schema = Yup.object({
    safepeopleprimaryapplicantfullname: Yup.string().trim().required('Required'),
    safepeopleprimaryapplicantorganisationname: Yup.string().trim().required('Required'),
    safepeopleprimaryapplicantemail: Yup.string().trim().email().required('Required'),
    safepeopleprimaryapplicanttelephone: Yup.string()
      .matches(
          /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
        "Invalid phone number"
      ),
    projectTitle: Yup.string().trim().required('Required'),
    projectAim: Yup.string().trim().required('Required'),
    datasetsRequested: Yup.array()
    .required('Required')
    .min(1, 'Reequired'),
    linkedDatasets: Yup.string().required('Select an option'),
    datasetNames: Yup.string().when('linkedDatasets',{ is: "Yes", then: Yup.string().required('Required')}),
    datasetsInterestedIn: Yup.string().required('Select an option'),
    datasetParts: Yup.string().when('datasetsInterestedIn',{ is: "Yes", then: Yup.string().required('Required')}),
    funding: Yup.string().trim().required('Required'),
    researchBenefits: Yup.string().trim().required('Required')
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

  const handleFormSubmission = async () => {
    let {
			current: { values, setSubmitting },
		} = formRef;

    console.log(formRef);
    console.log(values);
  };

  // useEffect(() => {
  //   if(has(topic, 'tags') && !isEmpty(topic.tags)) {
  //     setSelectedDatasets(topic.tags);
  //   }
  // }, []);


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
                    className={`form-control ${hasErrors(touched, errors, 'safepeopleprimaryapplicantfullname') ? 'is-invalid' : '' }`}
                  />
                  {hasErrors(touched, errors, 'safepeopleprimaryapplicantfullname') ? (
                    <div className='errorMessages'>{errors.safepeopleprimaryapplicantfullname}</div>
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
                    className={`form-control ${hasErrors(touched, errors, 'safepeopleprimaryapplicantorganisationname') ? 'is-invalid' : '' }`}
                  />
                  {hasErrors(touched, errors, 'safepeopleprimaryapplicantorganisationname') ? (
                    <div className='errorMessages'>{errors.safepeopleprimaryapplicantorganisationname}</div>
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
                    className={`form-control ${hasErrors(touched, errors, 'safepeopleprimaryapplicantemail') ? 'is-invalid' : '' }`}
                  />
                  { hasErrors(touched, errors, 'safepeopleprimaryapplicantemail') ? (
                    <div className='errorMessages'>{errors.safepeopleprimaryapplicantemail}</div>
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
                    data-test-id={`safepeopleprimaryapplicanttelephone`}
                    className={`form-control`}
                  />
                </div>

                {/* PROJECT TITLE */}
                <div className='form-group gray800-14'>
                  <label htmlFor={`projectTitle`} className='form-label'>
                    Project title *
                  </label>
                  <Field
                    type='text'
                    name={`projectTitle`}
                    data-test-id={`projectTitle`}
                    className={`form-control ${hasErrors(touched, errors, 'projectTitle') ? 'is-invalid' : '' }`}
                  />
                  { hasErrors(touched, errors, 'projectTitle') ? (
                    <div className='errorMessages'>{errors.projectTitle}</div>
                  ) : null }
                </div>

                {/* PROJECT AIM */}
                <div className='form-group gray800-14'>
                  <label htmlFor={`projectAim`} className='form-label'>
                    Project aim *
                    <span className="gray700-13">Please briefly explain the purpose of your research and why you require this dataset</span>
                  </label>
                  <Field
                    as="textarea"
                    name={`projectAim`}
                    data-test-id={`projectAim `}
                    className={`form-control ${hasErrors(touched, errors, 'projectAim') ? 'is-invalid' : '' }`}
                  />
                  { hasErrors(touched, errors, 'projectAim') ? (
                    <div className='errorMessages'>{errors.projectAim}</div>
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
                  <label htmlFor={`linkedDatasets`} className='form-label gray800-14'>
                    Do you have any datasets you would like to link with this one? *                    
                  </label>
                  <div className="form-check">
                    <Field type="radio" name="linkedDatasets" value="Yes" />
                    <label className={`
                        form-check-label 
                        gray800-14`} 
                        htmlFor="linkedDatasets">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                  <Field type="radio" name="linkedDatasets" value="No" />
                    <label className={`
                        form-check-label 
                        gray800-14`} 
                        htmlFor="linkedDatasets">
                      No
                    </label>
                  </div>
                  { hasErrors(touched, errors, 'linkedDatasets') ? (
                    <div className='errorMessages'>{errors.linkedDatasets}</div>
                  ) : null }
                </div>

                {/* IDENTIFY NAMES OF DATASETS */}
                {  values && values.linkedDatasets === "Yes"  ?
                <div className='form-group gray800-14'>
                  <label htmlFor={`datasetNames`} className='form-label'>
                    Please identify the names of the datasets *
                  </label>
                  <Field
                    as="textarea"
                    name={`datasetNames`}
                    data-test-id={`datasetNames`}
                    className={`form-control ${hasErrors(touched, errors, 'datasetNames') ? 'is-invalid' : '' }`}
                  />
                   { hasErrors(touched, errors, 'datasetNames') ? (
                    <div className='errorMessages'>{errors.datasetNames}</div>
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
                  <label htmlFor={`datasetParts`} className='form-label'>
                    Please explain which parts of the dataset * 
                  </label>
                  <Field
                    as="textarea"
                    name={`datasetParts`}
                    data-test-id={`datasetParts`}
                    className={`form-control ${hasErrors(touched, errors, 'datasetParts') ? 'is-invalid' : '' }`}
                  />
                   { hasErrors(touched, errors, 'datasetParts') ? (
                    <div className='errorMessages'>{errors.datasetParts}</div>
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
                  <label htmlFor={`researchBenefits`} className='form-label'>
                    Research benefits *
                    <span className="gray700-13">Please provide evidence of how your research will benefit the health and social care system</span>
                  </label>
                  <Field
                    as="textarea"
                    name={`researchBenefits`}
                    data-test-id={`researchBenefits`}
                    className={`form-control ${hasErrors(touched, errors, 'researchBenefits') ? 'is-invalid' : '' }`}
                  />
                  { hasErrors(touched, errors, 'researchBenefits') ? (
                    <div className='errorMessages'>{errors.researchBenefits}</div>
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
