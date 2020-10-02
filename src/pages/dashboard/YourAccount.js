import React, { Fragment } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Row, Col, Button, Alert, Form, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { useFormik } from 'formik';
import { Typeahead } from 'react-bootstrap-typeahead';
import queryString from 'query-string';
import Loading from '../commonComponents/Loading';
import _ from 'lodash';
import './Dashboard.scss'; 

var baseURL = require('../commonComponents/BaseURL').getURL();

class YourAccount extends React.Component {

    // initialize our state
    state = {
        data: [],
        userdata: [],
        userState: [],
        topicData: [],
        isLoading: true,
        isUpdated: false,
        showOrg: false,
        showOrgVal: "",
        combinedOrganisations: []
    };

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
    }

    componentDidMount() {
        if (!!window.location.search) {
            var values = queryString.parse(window.location.search);
            this.setState({ isUpdated: values.accountUpdated });
        }
        this.getAccountDetails();
        this.doFilterCall();
        this.doOrganisationsCall();
    }

    getAccountDetails() {
        axios.get(baseURL + '/api/v1/person/' + this.state.userState[0].id)
            .then((res) => {
                axios.get(baseURL + '/api/v1/users/' + this.state.userState[0].id)
                    .then((resUser) => {
                        let showOrg = false;
                        let showOrgVal = "";
                        let { organisation } = res.data.data[0];
                        if(!_.isEmpty(organisation) && !_.isUndefined(organisation)) {
                            showOrg = true;
                            showOrgVal = "yes";
                        }
                        this.setState({
                            userdata: resUser.data.userdata[0],
                            data: res.data.data[0],
                            isLoading: false,
                            showOrg,
                            showOrgVal
                        });
                    })
            })
    }

    doFilterCall() {
        axios.get(baseURL + '/api/v1/search/filter/topic/person')
        .then((res) => {
            this.setState({
                topicData: res.data.data[0],
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    doOrganisationsCall() {
		return new Promise((resolve, reject) => {
			axios.get(baseURL + '/api/v1/search/filter/organisation/person').then((res) => {
				var tempOrganisationsArray = [
                    'Genomics England',
                    'Health Data Research UK',
                    'Lancaster University',
                    'PA Consulting',
                    'Queens University Belfast',
                    'University College London',
                    'University of Portsmouth',
                    'University of Ulster'
				];

				res.data.data[0].forEach((la) => {
					if (!tempOrganisationsArray.includes(la) && la !== '') {
						tempOrganisationsArray.push(la);
					}
				});

				this.setState({
					combinedOrganisations: tempOrganisationsArray.sort(function (a, b) {
						return a.toUpperCase() < b.toUpperCase()
							? -1
							: a.toUpperCase() > b.toUpperCase()
							? 1
							: 0;
					})
				});
				resolve();
			});
		});
	}


    onShowOrgInput() {
        this.setState( ( prevState ) => {
            return { showOrg: !prevState.showOrg };
        });
    }

    render() {
        const { data, isLoading, isUpdated, userdata, topicData, showOrg, showOrgVal, combinedOrganisations} = this.state;

        if (isLoading) {
            return (
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <Loading />
                    </Col>
                    <Col xs={1}></Col>
                </Row> 
            );
        }

        return (
            <Fragment>
                <Row>
                    <Col xs={1}></Col>
                    <Col xs={10}>
                        <YourAccountForm data={data} userdata={userdata} isUpdated={isUpdated} topicData={topicData} combinedOrganisations={combinedOrganisations} showOrg={showOrg} showOrgVal={showOrgVal} onShowOrgInput={() => {this.onShowOrgInput()}} />
                    </Col>
                    <Col xs={1}></Col>
                </Row>    
            </Fragment>
        );
    }
}

const sectorSelect = [
    "NHS",
    "Industry",
    "Academia",
    "Public",
];



//Your Account Form
const YourAccountForm = (props) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted
    const formik = useFormik({
        initialValues: {
            id: props.data.id,
            type: 'person',
            firstname: props.data.firstname,
            lastname: props.data.lastname,
            email: props.userdata.email,
            bio: props.data.bio,
            link: props.data.link,
            orcid: props.data.orcid,
            emailNotifications: props.data.emailNotifications || false, 
            terms: props.data.terms || false,
            sector: props.data.sector || "",
            organisation: props.data.organisation || "",
            showOrganisation: props.data.showOrganisation || false,
            showOrgVal: props.showOrgVal,
            tags: props.data.tags || {
                topics: [],
            },
        },

        validationSchema: Yup.object({
            firstname: Yup.string()
                .required('This cannot be empty'),
            lastname: Yup.string()
                .required('This cannot be empty'),
            email: Yup.string()
                .email('This must be a valid email')
                .required('This cannot be empty'),
            terms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
            sector: Yup.string().required('Please select a sector'),
            organisation: Yup.string().when("showOrgVal", {is: 'yes', then: Yup.string().required('This cannot be empty')})

        }),

        onSubmit: values => {
            if(props.showOrg != true) {
                values.organisation = "";
            }

            axios.put(baseURL + '/api/v1/person', values)
                .then((res) => {
                    window.location.href = '/account?tab=youraccount&accountUpdated=true';
                });
        }
    });

    const handleSectorSelect=(key)=>{
        {formik.setFieldValue("sector", key)};
    }

    return (
        <div>
            {props.isUpdated ? <Alert variant="success" className="mt-3">Done! Your account details have been updated</Alert> : ""}
            <Row className="pixelGapBottom">
                <Col>
                    <div className="rectangle pad-bottom-2">
                        <p className="black-20 mb-0">Add or edit your account details</p>
                        <p className="gray800-14">Your details are visible to other users, with the exception of your email address</p>
                    </div>
                </Col>
            </Row>
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col>
                        <div className="rectangle">
                            <Form.Group className="pb-2">
                                <Form.Label className="gray800-14">First name</Form.Label>
                                <Form.Control id="firstname" name="firstname" type="text" className={formik.touched.firstname && formik.errors.firstname ? "emptyFormInput addFormInput" : "addFormInput"} onChange={formik.handleChange} value={formik.values.firstname} onBlur={formik.handleBlur} />
                                {formik.touched.firstname && formik.errors.firstname ? <div className="errorMessages">{formik.errors.firstname}</div> : null}
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="gray800-14">Last name</Form.Label>
                                <Form.Control id="lastname" name="lastname" type="text" className={formik.touched.lastname && formik.errors.lastname ? "emptyFormInput addFormInput" : "addFormInput"} onChange={formik.handleChange} value={formik.values.lastname} onBlur={formik.handleBlur} />
                                {formik.touched.lastname && formik.errors.lastname ? <div className="errorMessages">{formik.errors.lastname}</div> : null}
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="gray800-14">Email</Form.Label>
                                <Form.Control id="email" name="email" type="text" className={formik.touched.email && formik.errors.email ? "emptyFormInput addFormInput" : "addFormInput"} onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                                {formik.touched.email && formik.errors.email ? <div className="errorMessages">{formik.errors.email}</div> : null}
                            </Form.Group>

                            <Form.Group className="pb-2 form-group">
                                <Form.Label className="gray800-14">Sector</Form.Label>
                                <br />
                                <span className="gray700-13">Select one of the sectors your work falls under below</span>

                                <DropdownButton variant="white"  
                                    title={formik.values.sector || <option disabled selected value></option>}
                                    className={formik.touched.sector && formik.errors.sector ? "emptyFormInput  gray800-14 custom-dropdown margin-top-8 padding-right-0" :  "gray700-13 custom-dropdown margin-top-8 padding-right-0"} 
                                    onChange={(selected) => {formik.setFieldValue("sector", selected.target.value);}}
                                    value={ formik.values.sector } 
                                    onBlur={() => formik.setFieldTouched("sector", true)} 
                                    touched={formik.touched.sector}
                                    onSelect={(selected) => handleSectorSelect(selected)}>
                                    
                                    {sectorSelect.map((sec, i) => (
                                        <Dropdown.Item className="gray800-14 width-100" key={sec} eventKey={sec}>
                                            {sec}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                                {formik.touched.sector && formik.errors.sector ? <div className="errorMessages margin-top-8">{formik.errors.sector}</div> : null}
                            </Form.Group>

                            <Form.Group className="pb-2 margin-bottom-0">
                                <Form.Label className="gray800-14">Are you part of an organisation?</Form.Label>
                                <br/>
                                <InputGroup onChange={props.onShowOrgInput}>
                                    <InputGroup.Prepend>
                                        <Row className="margin-bottom-8">
                                            <InputGroup.Radio id="partOfOrgYes" className="ml-3" aria-label="Yes" name="partOfOrg" defaultChecked={props.showOrg == true} onChange={(e) => {formik.setFieldValue("showOrgVal", "yes")}}/>
                                            <span className="gray800-14 ml-3">Yes</span>
                                            {/* <Form.Check type="radio" label="Yes" className="ml-4 checker" name="partOfOrg" id="partOfOrgYes" defaultChecked={props.showOrg == true} onChange={(e) => {formik.setFieldValue("showOrgVal", "yes")}}/> */}
                                        </Row>
                                        <Row className="margin-bottom-12">
                                            <InputGroup.Radio id="partOfOrgNo" className="ml-3" aria-label="No" name="partOfOrg" defaultChecked={props.showOrg == false} onChange={(e) => {formik.setFieldValue("showOrgVal", "no")}} />
                                            <span className="gray800-14 ml-3">No</span>
                                        </Row>
                                    </InputGroup.Prepend>
                                </InputGroup>
                                { props.showOrg ? 
                                    <Fragment>
                                        <span className="gray700-13">Please specify your affiliation or company</span>
                                        <Form.Group>
                                        <Typeahead 
                                            id="organisation"
                                            name="organisation"
                                            labelKey="organisation"
                                            allowNew
                                            defaultSelected={[formik.values.organisation] || ""}
                                            options={props.combinedOrganisations}
                                            className={(props.showOrg && ((formik.touched.organisation && formik.values.organisation === "") && ( formik.errors.organisation && typeof formik.errors.organisation !== "undefined"))) ? "sectorTypeahead emptyFormInput addFormInput margin-bottom-8 margin-top-8" : "sectorTypeahead addFormInput margin-bottom-8 margin-top-8"} 
                                            onBlur={ formik.handleBlur }
                                            onChange={(selected) => {
                                                var tempSelected = [];
                                                selected.forEach((selectedItem) => {
                                                    selectedItem.customOption === true ? tempSelected.push(selectedItem.organisation) : tempSelected.push(selectedItem);
                                                })
                                                tempSelected.length > 0 ? formik.values.organisation = tempSelected[0] : formik.values.organisation = ""
                                                formik.setFieldTouched("organisation", true)
                                            }}
                                        />
                                        {props.showOrg && (formik.touched.organisation && formik.values.organisation === "" && (formik.errors.organisation && typeof formik.errors.organisation !== "undefined")) ? <div className="errorMessages">{formik.errors.organisation}</div> : ''}
                                        </Form.Group>
                                        
                                        <Row className="mt-2 mb-3">
                                            <Form.Control type="checkbox" className="checker" id="showOrganisation" name="showOrganisation" checked={formik.values.showOrganisation} onChange={formik.handleChange} />
                                            <span className="gray800-14 ml-4 margin-top-2">Do not show my organisation</span>
                                        </Row>
                                    </Fragment> : null
                                }
                            </Form.Group>
                            <Form.Group className="pb-2">
                                <Form.Label className="gray800-14">Bio (optional)</Form.Label>
                                <br />
                                <span className="gray700-13">Please provide a short description of who you are</span>
                                <Form.Control id="bio" name="bio" type="text" className={formik.touched.bio && formik.errors.bio ? "emptyFormInput addFormInput" : "addFormInput"} onChange={formik.handleChange} value={formik.values.bio} onBlur={formik.handleBlur} />
                                {formik.touched.bio && formik.errors.bio ? <div className="errorMessages">{formik.errors.bio}</div> : null}
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="gray800-14">Domain (optional)</Form.Label>
                                <br />
                                <Typeahead
                                    id="tags.topics"
                                    labelKey="topics"
                                    allowNew
                                    defaultSelected={formik.values.tags.topics}
                                    multiple
                                    options={props.topicData}
                                    className="addFormInputTypeAhead"
                                    onChange={(selected) => {
                                        var tempSelected = [];
                                        selected.forEach((selectedItem) => {
                                            selectedItem.customOption === true ? tempSelected.push(selectedItem.topics) : tempSelected.push(selectedItem);
                                        })
                                        formik.values.tags.topics = tempSelected;
                                    }}
                                />
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <span className="gray800-14">Link (optional)</span>
                                <br />
                                <span className="gray700-13">Social media, research gate, anywhere that people can go to find out more about you</span>
                                <Form.Control id="link" name="link" type="text" className="addFormInput" onChange={formik.handleChange} value={formik.values.link} onBlur={formik.handleBlur} />
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <span className="gray800-14">ORCID (optional)</span>
                                <br />
                                <span className="gray700-13">Your unique ORCID identifier</span>
                                <Form.Control id="orcid" name="orcid" type="text" className="addFormInput" onChange={formik.handleChange} value={formik.values.orcid} onBlur={formik.handleBlur} />
                            </Form.Group>
                            <Form.Group className="pb-2">
                               <Row className="mt-2">
                                <Form.Control type="checkbox" className="checker" id="emailNotficiations" name="emailNotifications" checked={formik.values.emailNotifications} onChange={formik.handleChange} />
                                <span className="gray800-14 ml-4 margin-top-2">I want to receive email notifications about activity relating to my account or content</span>
                                </Row>
                            </Form.Group>
                            
                            <Form.Group className="pb-2">
                               <Row className="mt-2">
                                <Form.Control type="checkbox" className="checker" id="terms" name="terms" checked={formik.values.terms} onChange={formik.handleChange} />
                                <span className="gray800-14 ml-4 margin-top-2">I agree to the HDRUK <a href='https://www.hdruk.ac.uk/infrastructure/gateway/terms-and-conditions/' target="_blank">Terms and Conditions</a></span>
                                </Row>
                                <Row className="mt-2">
                                {formik.touched.terms && formik.errors.terms ? <div className="errorMessages margin-left-16">{formik.errors.terms}</div> : null}
                                </Row>
                            </Form.Group>

                        </div>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Col className="text-right">
                        <Button variant="primary" type="submit" className="addButton">
                            Update Details
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default YourAccount;