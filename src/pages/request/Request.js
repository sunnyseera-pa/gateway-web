import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loading from '../commonComponents/Loading';
import SearchBar from '../commonComponents/SearchBar';
import * as Yup from 'yup';
import { useFormik } from 'formik';

/**
 * [ValidationSchema]
 * @desc  {Setup Formik Yup Object for validation}
 */
const validationSchema = Yup.object({
    researchAim: Yup.string()
      .required('This cannot be empty'),
    linkedDataSets: Yup.string()
        .required('Please select an answer'),
    dataRequirements: Yup.string()
        .required('Please select an answer')
  });
  

const Request = (props) => {
    const {searchString = '', userState} = props;
    const [reqState, setDefaultState] = useState({
        userState,
        searchString
      });


    /**
     * [Formik - Setup]
     * @desc  {Formik form handling for request access}
     */
    const {handleSubmit, handleChange, values, errors} = useFormik({
        initialValues: {
            researchAim: '',
            linkedDataSets: '',
            namesOfDataSets: '',
            dataRequirements: '',
            dataSetParts: '',
            startDate: '',
            icoRegistration: '',
            researchBenefits: '',
            ethicalProcessingEvidence: '',
            contactNumber: ''
        },
        validationSchema,
        onSubmit: values => {
            debugger;
            console.log((JSON.stringify(values, null, 2)));
        }
      });
    
    const doSearch = (e) => {
        if (e.key === 'Enter') {
            if (!!this.state.searchString) 
                window.location.href = '/search?search=' + reqState.searchString + '&type=all';
            
        }
    };

    const updateSearchString = (searchString) => {
        setDefaultState({ ...reqState, searchString });
    };

    const onRadioChange = (e) => {
        const {target: {name, value}} = e;
        values[name] = value;
    }

    return (
      <div>
        <SearchBar searchString={searchString} doSearchMethod={doSearch} doUpdateSearchString={updateSearchString} userState={userState} />

        <Container className='mt-5 mb-5'>
            {/* HEADER */}
            <div className='Rectangle mb-xs'>
                <Row>
                    <Col>
                        <h1 className='Black-20px'>Request access for</h1>
                        <p className='Gray800-14px'>Epilepsy 12 - National organisational audit (service descriptor questionnaire) and Trust profile</p>
                    </Col>
                </Row>
            </div>
            {/* FORM */}
            <Form onSubmit={handleSubmit}>
                <div className='Rectangle'>
                <Row className='mt-2'>
                    <Col>
                        {/* RESEARCH AIM*/}
                        <Form.Group className='pb-2'>
                            <Form.Label className='Gray800-14px'>Research Aim
                            <Form.Text className='Gray700-13px mt-0'>Please briefly explain the purpose of your research and why you require this dataset.</Form.Text>
                            </Form.Label>
                            <Form.Control onChange={handleChange} value={values.researchAim} name="researchAim" as='textarea' rows='3' isInvalid={!!errors.researchAim} />
                            <Form.Control.Feedback type="invalid">{errors.researchAim}</Form.Control.Feedback>
                        </Form.Group>

                        {/* LINKED datasets */}
                        <Form.Group className='pb-2'>
                            <Form.Label className='Gray800-14px'>Linked datasets
                                <Form.Text className='Gray700-13px mt-0'>Do you have any datasets you would like to link withthis one? </Form.Text>
                            </Form.Label>
                            { /* RADIOS */}
                            <Form.Group className='mb-2 mt-2' style={{ display: 'flex' }}>
                                <Row>
                                    <Col>
                                        <Form.Check 
                                            type='radio' 
                                            label='Yes' 
                                            className='ml-4' 
                                            name='linkedDataSets' 
                                            id='linkedDataSets' 
                                            value='true'
                                            onChange={onRadioChange}
                                            isInvalid={!!errors.linkedDataSets} />
                                    </Col>
                                    <Col className='ml-5'>
                                        <Form.Check 
                                            type='radio' 
                                            label='No' 
                                            className='ml-1' 
                                            name='linkedDataSets' 
                                            id='linkedDataSets' 
                                            value='false'
                                            onChange={onRadioChange}
                                            isInvalid={!!errors.linkedDataSets} />
                                    </Col>
                                </Row>
                                <Form.Control.Feedback type="invalid">{errors.linkedDataSets}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Label className='Gray700-13px'>Please identify the names of the datasets.</Form.Label>
                            <Form.Control onChange={handleChange} value={values.namesOfDataSets} name="namesOfDataSets" as='textarea' rows='3' />
                        </Form.Group>

                        {/* Data Requirements */}
                        <Form.Group className='pb-2'>
                            <Form.Label className='Gray800-14px'>Data requirements <br />
                                <Form.Text className='Gray700-13px'>Do you know which parts of the dataset you are interested in?</Form.Text>
                            </Form.Label>
                            <Form.Group className='mb-2 mt-2' style={{ display: 'flex' }}>
                                <Row>
                                    <Col>
                                        <Form.Check 
                                            type='radio' 
                                            label='Yes' 
                                            className='ml-4' 
                                            name='dataRequirements' 
                                            id='dataRequirements' 
                                            value='true'
                                            onChange={onRadioChange}
                                            isInvalid={!!errors.dataRequirements} />
                                    </Col>
                                    <Col className='ml-5'>
                                        <Form.Check 
                                            type='radio' 
                                            label='No' 
                                            className='ml-1' 
                                            name='dataRequirements' 
                                            id='dataRequirements'
                                            value='false'
                                            onChange={onRadioChange}
                                            isInvalid={!!errors.dataRequirements} />
                                    </Col>
                                <Form.Control.Feedback type="invalid">{errors.dataRequirements}</Form.Control.Feedback>
                                </Row>

                            </Form.Group>
                            <Form.Label className='Gray700-13px'>Please explain which parts of the dataset.</Form.Label>
                            <Form.Control onChange={handleChange} value={values.dataSetParts}  name="dataSetParts" as='textarea' rows='3' />
                        </Form.Group>

                        {/* Proposed project start Date */}
                        <Form.Group className='pb-2'>
                            <Form.Label className='Gray800-14px'>Proposed project start date (optional)</Form.Label>
                            <Form.Control id='startDate' name='startDate' type='text' className='AddFormInput' />
                        </Form.Group>

                        {/* ICO Reg */}
                        <Form.Group className='pb-2'>
                            <Form.Label className='Gray800-14px'>ICO registration (optional)
                                <Form.Text className='Gray700-13px'>This is an 8 digit alphanumeric number</Form.Text>
                            </Form.Label>
                            <Form.Control id='icoRegistration' onChange={handleChange} value={values.icoRegistration} maxLength="8" name="icoRegistration"  type='text' className='AddFormInput' style={{ maxWidth: '480px' }} />
                        </Form.Group>

                        {/* Research Benefits */}
                        <Form.Group className='pb-2'>
                            <Form.Label className='Gray800-14px'>Research benefits (optional)
                                <Form.Text className='Gray700-13px'>Please provide evidence of how your research will benefit the health and social care system.</Form.Text>
                            </Form.Label>
                            <Form.Control id='researchBenefits' onChange={handleChange} value={values.researchBenefits}  name="researchBenefits" as='textarea' rows='3' />
                        </Form.Group>

                        {/* Ethical processing Reg */}
                        <Form.Group className='pb-2'>
                            <Form.Label className='Gray800-14px'> Ethical processing evidence (optional)
                                <Form.Text className='Gray700-13px'>Please provide a link(s) to relevant sources that showcase evidence of thee fair processing of data by your organisation.</Form.Text>
                            </Form.Label>
                            <Form.Control id='ethicalProcessingEvidence' onChange={handleChange} value={values.ethicalProcessingEvidence} name="ethicalProcessingEvidence"  as='textarea' rows='3' />
                        </Form.Group>

                        {/*Contact Number */}
                        <Form.Group className='pb-2'>
                            <Form.Label className='Gray800-14px'>Contact number (optional)</Form.Label>
                            <Form.Control id='contactNumber' onChange={handleChange} value={values.contactNumber}  name="contactNumber" type='text' className='AddFormInput' style={{ maxWidth: '480px' }} />
                        </Form.Group>
                    </Col>
              </Row>
          </div>

                {/* BUTTONS */}
                <Row className='mt-3'>
                    <Col className='text-left'>
                        <Button variant='tertiary' type='cancel'>Cancel</Button>
                    </Col>
                    <Col className='text-right'>
                        <Button variant='primary' type='submit' className='Gray100-14px'>Send enquiry</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
      </div>
    );
}

export default Request;
