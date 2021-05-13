import React, { useState, useRef } from 'react';
import _ from 'lodash';
import * as Yup from 'yup';
import { Formik, Field, Form, FieldArray } from 'formik';
import TypeaheadDataset from '../../../DataAccessRequest/components/TypeaheadDataset/TypeaheadDataset';

export const EnquiryMessage = () => {
  const [selectedDatasets, setSelectedDatasets] = useState([]);
  const formRef = useRef();

  const onHandleDataSetChange = () => {
    console.log('change dataset change');
  }

  const handleFormSubmission = async () => {
    console.log('Submission');
  };

  return (
    <div>
      <Formik
        innerRef={formRef}
        validationSchema={Yup.object({
          safepeopleprimaryapplicantfullname: Yup.string().trim().required('Applicant name is required'),
          safepeopleprimaryapplicantorganisationname: Yup.string().trim().required('Organisation is required'),
          safepeopleprimaryapplicantemail: Yup.string().trim().email().required('Email is required'),
          safepeopleprimaryapplicanttelephone: Yup.string()
            .required("Phone number is required")
            .matches(
                /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
              "Invalid phone number"
            ),
          projectTitle: Yup.string().trim().required('Project title is required'),
          safeprojectprojectdetailsaimsobjectivesrationale: Yup.string().trim().required('Project title is required'),
          datasetsRequested: Yup.array().of(Yup.string()).required('You must select at least one dataset')
				})}
				onSubmit={async () => {
					await handleFormSubmission();
				}}>
          {(
            { isSubmitting, values, errors, touched, setFieldValue }) => (
              <Form autoComplete='off'>
                <div className="enquiry-form-wrap">

                
                <div className='form-group'>
                  <label htmlFor={`safepeopleprimaryapplicantfullname`} className='form-label'>
                    Applicant Name
                  </label>
                  <Field
                    type='text'
                    name={`safepeopleprimaryapplicantfullname`}
                    data-test-id={`safepeopleprimaryapplicantfullname`}
                    className={`form-control control-name`}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor={`safepeopleprimaryapplicantorganisationname`} className='form-label'>
                    Organisation Name
                  </label>
                  <Field
                    type='text'
                    name={`safepeopleprimaryapplicantorganisationname`}
                    data-test-id={`safepeopleprimaryapplicantorganisationname`}
                    className={`form-control control-name`}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor={`safepeopleprimaryapplicantemail`} className='form-label'>
                    Email 
                    <span>Where do you want the data custodian to contact you?</span>
                  </label>
                  <Field
                    type='email'
                    name={`safepeopleprimaryapplicantemail`}
                    data-test-id={`safepeopleprimaryapplicantemail`}
                    className={`form-control control-name`}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor={`safepeopleprimaryapplicanttelephone`} className='form-label'>
                    Contact number (optional) 
                  </label>
                  <Field
                    type='text'
                    name={`safepeopleprimaryapplicanttelephone`}
                    data-test-id={`safepeopleprimaryapplicanttelephone`}
                    className={`form-control control-name`}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor={`projectTitle`} className='form-label'>
                    Project title
                  </label>
                  <Field
                    type='text'
                    name={`projectTitle`}
                    data-test-id={`projectTitle`}
                    className={`form-control control-name`}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor={`safeprojectprojectdetailsaimsobjectivesrationale`} className='form-label'>
                    Project aim
                    <span>Please briefly explain the purpose of your research and why you require this dataset</span>
                  </label>
                  <Field
                    type='text'
                    name={`safeprojectprojectdetailsaimsobjectivesrationale`}
                    data-test-id={`safeprojectprojectdetailsaimsobjectivesrationale`}
                    className={`form-control control-name`}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor={`DatasetsBeingRequested`} className='form-label'>
                    Dataset being requested
                  </label>
                  <TypeaheadDataset
                    key={0}
										selectedDatasets={selectedDatasets}
										onHandleDataSetChange={e => onHandleDataSetChange(e)}
										readOnly={false}
										allowAllCustodians={false}
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor={`safeprojectprojectdetailsaimsobjectivesrationale`} className='form-label'>
                  Do you have any datasets you would like to link with this one? *                    
                  </label>
                  <div role="group" aria-labelledby="my-radio-group">
                    <label>
                      <Field type="radio" name="Yes" value={true} />
                      Yes
                    </label>
                    <label>
                      <Field type="radio" name="No" value={false} />
                      No
                    </label>
                  </div>
                </div>
                </div>
              </Form>
          )}
      </Formik>
    </div>
  )
}
