import React, { Fragment, useState } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { Row, Col, Button, Alert, Form, InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import { useFormik } from 'formik';
import { Typeahead } from 'react-bootstrap-typeahead';
import queryString from 'query-string';
import Loading from '../commonComponents/Loading';
import _ from 'lodash';
import './Dashboard.scss';
import SVGIcon from '../../images/SVGIcon'; 


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
        combinedOrganisations: [],
        showSector: false,
        showOrganisation: false,
        showBio: false,
        showDomain: false,
        showLink: false,
        showOrcid: false
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
                            showOrgVal = "yes";
                        }
                        this.setState({
                            userdata: resUser.data.userdata[0],
                            data: res.data.data[0],
                            isLoading: false,
                            showOrg,
                            showOrgVal,
                            showSector: res.data.data[0].showSector,
                            showOrganisation: res.data.data[0].showOrganisation,
                            showBio: res.data.data[0].showBio,
                            showDomain: res.data.data[0].showDomain,
                            showLink: res.data.data[0].showLink,
                            showOrcid: res.data.data[0].showOrcid
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
        const { data, isLoading, isUpdated, userdata, topicData, showOrg, showOrgVal, combinedOrganisations, showBio, showSector, showDomain, showLink, showOrcid, showOrganisation} = this.state;

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
                        <YourAccountForm data={data} userdata={userdata} isUpdated={isUpdated} topicData={topicData} combinedOrganisations={combinedOrganisations} showOrg={showOrg} showOrganisation={showOrganisation} showOrgVal={showOrgVal} showBio={showBio} showSector={showSector} showDomain={showDomain} showLink={showLink} showOrcid={showOrcid} onShowOrgInput={() => {this.onShowOrgInput()}} />
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
    
    //Set initial state
    let showSector = props.showSector;
    let showOrg = props.showOrganisation;
    let showBio = props.showBio;
    let showDomain = props.showDomain;
    let showLink = props.showLink;
    let showOrcid = props.showOrcid;

    //tool tips for eyes
    const mandatoryShowFieldMsg = "This will be visible to others. You cannot change this.";
    const mandatoryHideFieldMsg = "This will not be visible to others. You cannot change this.";
    const optionalShowFieldMsg = "This will be visible to others. Click to hide from your profile.";
    const optionalHideFieldMsg = "This will not be visible to others. Click to show on your profile.";

    //hover state for eyes
    const [inFirstNameHover, setFirstNameHover] = useState(false);
    const [inLastNameHover, setLastNameHover] = useState(false);
    const [inEmailHover, setEmailHover] = useState(false);
    const [inSectorHover, setSectorHover] = useState(false);
    const [inOrgHover, setOrgHover] = useState(false);
    const [inBioHover, setBioHover] = useState(false);
    const [inDomainHover, setDomainHover] = useState(false);
    const [inLinkHover, setLinkHover] = useState(false);
    const [inOrcidHover, setOrcidHover] = useState(false);

    //define toggle for each hideable field
    //set default value on page load based on value taken from state  
    //Updates the corresponding key in formik
    const [showingSector, setShowSector] = useState(showSector);
    const toggleSector = () => {setShowSector(!showingSector); {formik.setFieldValue("showSector", !showingSector);}};
    const [showingOrg, setShowOrg] = useState(showOrg);
    const toggleOrg = () => {setShowOrg(!showingOrg); {formik.setFieldValue("showOrganisation", !showingOrg);}}
    const [showingBio, setShowBio] = useState(showBio);
    const toggleBio = () => {setShowBio(!showingBio); {formik.setFieldValue("showBio", !showingBio);}}
    const [showingDomain, setShowDomain] = useState(showDomain);
    const toggleDomain = () => {setShowDomain(!showingDomain); {formik.setFieldValue("showDomain", !showingDomain);}}
    const [showingLink, setShowLink] = useState(showLink);
    const toggleLink = () => {setShowLink(!showingLink); {formik.setFieldValue("showLink", !showingLink);}}
    const [showingOrcid, setShowOrcid] = useState(showOrcid);
    const toggleOrcid = () => {setShowOrcid(!showingOrcid); {formik.setFieldValue("showOrcid", !showingOrcid);}}

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
            showOrgVal: props.showOrgVal,
            tags: props.data.tags || {
                topics: [],
            },
            showSector: showingSector,
            showOrganisation: showingOrg,
            showBio: showingBio,
            showLink: showingLink,
            showOrcid: showingOrcid,
            showDomain: showingDomain
        },

        validationSchema: Yup.object({
            firstname: Yup.string()
                .required('This cannot be empty'),
            lastname: Yup.string()
                .required('This cannot be empty'),
            email: Yup.string()
                .email('This must be a valid email')
                .required('This cannot be empty'),
            bio: Yup.string()
                .max(500, 'Maximum of 500 characters'),
            terms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
            sector: Yup.string().required('Please select a sector'),
            organisation: Yup.string().when("showOrgVal", {is: 'yes', then: Yup.string().required('This cannot be empty')})
        }),

        onSubmit: values => {
            axios.put(baseURL + '/api/v1/person', values)
                .then((res) => {
                    window.location.href = '/account?tab=youraccount&accountUpdated=true';
                });
        }
    });

    const handleSectorSelect=(key)=>{
        {formik.setFieldValue("sector", key)};
    }

    function bioCount(e) {
        document.getElementById("bioCurrentCount").innerHTML=e.target.value.length
    }

    return (
        <div>
            {props.isUpdated ? <Alert variant="success" className="mt-3">Done! Your account details have been updated</Alert> : ""}
            <Row className="pixelGapBottom">
                <Col>
                    <div className="rectangle pad-bottom-2">
                        <p className="black-20 mb-0">Your details</p>
                        <p className="gray800-14">You can control what appears on your profile using the icons. Your details are also used when you make a data access request application.</p>
                    </div>
                </Col>
            </Row>
            <Form onSubmit={formik.handleSubmit}>
                <Row>
                    <Col>
                        <div className="rectangle">
                            <Form.Group className="pb-2">
                                <Form.Label className="gray800-14">First name</Form.Label>
                                <Row>
                                <Col sm={11} lg={11}>
                                    <Form.Control id="firstname" name="firstname" type="text" className={formik.touched.firstname && formik.errors.firstname ? "emptyFormInput addFormInput" : "addFormInput"} onChange={formik.handleChange} value={formik.values.firstname} onBlur={formik.handleBlur} />
                                </Col>
                                <Col sm={1} lg={1} className='eyeColumn' onMouseEnter={() => setFirstNameHover(true)} onMouseLeave={() => setFirstNameHover(false)}>
                                        {inFirstNameHover && (
                                        <div className="accountClassToolTip">
                                        <span className="white-13-semibold">
                                        {mandatoryShowFieldMsg}
                                        </span>
                                        </div>
                                        )}
                                    <button className='eye' disabled={true}>
                                    <SVGIcon name="eye" width={24} height={24} fill={'#475da7'} className={'pointer, eyeFaded'}/>
                                    </button>
                                </Col>
                                </Row>

                                {formik.touched.firstname && formik.errors.firstname ? <div className="errorMessages">{formik.errors.firstname}</div> : null}
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="gray800-14">Last name</Form.Label>
                                <Row>
                                <Col sm={11} lg={11}>
                                <Form.Control id="lastname" name="lastname" type="text" className={formik.touched.lastname && formik.errors.lastname ? "emptyFormInput addFormInput" : "addFormInput"} onChange={formik.handleChange} value={formik.values.lastname} onBlur={formik.handleBlur} />
                                </Col>
                                <Col sm={1} lg={1} className='eyeColumn' onMouseEnter={() => setLastNameHover(true)} onMouseLeave={() => {setLastNameHover(false)}}>
                                        {inLastNameHover && (
                                        <div className="accountClassToolTip">
                                        <span className="white-13-semibold">
                                        {mandatoryShowFieldMsg}
                                        </span>
                                        </div>
                                        )} 
                                    <button className='eye' disabled={true}>
                                    <SVGIcon name="eye" width={24} height={24} fill={'#475da7'} className={'pointer, eyeFaded'}/>
                                    </button>
                                </Col>
                                </Row>
                                {formik.touched.lastname && formik.errors.lastname ? <div className="errorMessages">{formik.errors.lastname}</div> : null}
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="gray800-14">Email</Form.Label>
                                <Row>
                                <Col sm={11} lg={11}>
                                <Form.Control id="email" name="email" type="text" className={formik.touched.email && formik.errors.email ? "emptyFormInput addFormInput" : "addFormInput"} onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                                </Col>
                                <Col sm={1} lg={1} className='eyeColumn' onMouseEnter={() => setEmailHover(true)} onMouseLeave={() => setEmailHover(false)}>
                                        {inEmailHover && (
                                        <div className="accountClassToolTip">
                                        <span className="white-13-semibold">
                                        {mandatoryHideFieldMsg}
                                        </span>
                                        </div>
                                        )}
                                    <button className='eye' disabled={true}>
                                    <SVGIcon name="eyeCrossed" width={24} height={24} fill={'#868e96'} className={'pointer, eyeFaded'}/>
                                    </button>
                                </Col>
                                </Row>
                                {formik.touched.email && formik.errors.email ? <div className="errorMessages">{formik.errors.email}</div> : null}
                            </Form.Group>

                            <Form.Group className="pb-2 form-group">
                                <Form.Label className="gray800-14">Sector</Form.Label>
                                <br />
                                <span className="gray700-13">Select one of the sectors your work falls under below</span>
                                <Row>
                                <Col sm={4} lg={4}>   
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
                                
                                </Col>
                                <Col sm={1} lg={1} className='eyeColumn' onMouseEnter={() => setSectorHover(true)} onMouseLeave={() => setSectorHover(false)}>
                                    {inSectorHover && (
                                    <div className="accountClassToolTip accountSectorToolTip">
                                    <span className="white-13-semibold">
                                    {showingSector ? optionalShowFieldMsg : optionalHideFieldMsg}
                                    </span>
                                    </div>
                                    )}
                                    <button className='eye' onClick ={(e) => {e.preventDefault(); toggleSector();}}>
                                    {showingSector ? <SVGIcon name="eye" width={24} height={24} fill={'#475da7'} className={'pointer'}/>
                                        : <SVGIcon name="eyeCrossed" width={24} height={24} fill={'#868e96'} className={'pointer'}/>
                                    }
                                    </button>
                                </Col>
                                </Row>
                                {formik.touched.sector && formik.errors.sector ? <div className="errorMessages margin-top-8">{formik.errors.sector}</div> : null}
                            </Form.Group>

                            <Form.Group className="margin-bottom-0">
                                <Form.Label className="gray800-14">Are you part of an organisation?</Form.Label>
                                <br/>
                                <InputGroup onChange={props.onShowOrgInput}>
                                    <InputGroup.Prepend>
                                        <Row className="margin-bottom-8">
                                            <InputGroup.Radio id="partOfOrgYes" className="ml-3" aria-label="Yes" name="partOfOrg" defaultChecked={props.showOrg == true} onChange={(e) => {formik.setFieldValue("showOrgVal", "yes")}}/>
                                            <span className="gray800-14 ml-3">Yes</span>
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
                                        <Row>
                                            <Col sm={11} lg={11}> 
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
                                            </Col>
                                            <Col sm={1} lg={1} className='eyeColumn' onMouseEnter={() => setOrgHover(true)} onMouseLeave={() => setOrgHover(false)}>
                                                {inOrgHover && (
                                                <div className="accountClassToolTip accountSectorToolTip">
                                                <span className="white-13-semibold">
                                                {showingOrg ? optionalShowFieldMsg : optionalHideFieldMsg}
                                                </span>
                                                </div>
                                                )}
                                                <button className='eye' onClick ={(e) => {e.preventDefault(); toggleOrg();}}>
                                                {showingOrg ? <SVGIcon name="eye" width={24} height={24} fill={'#475da7'} className={'pointer'}/>
                                                    : <SVGIcon name="eyeCrossed" width={24} height={24} fill={'#868e96'} className={'pointer'}/>
                                                }
                                                </button>
                                            </Col>
                                        </Row>
                                        {props.showOrg && (formik.touched.organisation && formik.values.organisation === "" && (formik.errors.organisation && typeof formik.errors.organisation !== "undefined")) ? <div className="errorMessages">{formik.errors.organisation}</div> : ''}
                                        </Form.Group>
                                    </Fragment> : null
                                }
                            </Form.Group>
                            <Form.Group className="pb-2">
                                <Form.Label className="gray800-14">Bio (optional)</Form.Label>
                                <br />
                                <Row>
                                    <Col sm={11} lg={11}>
                                    <span className="gray700-13">Please provide a short description of who you are</span>
                                    <span className="gray700-13 floatRight">/500)</span>
                                    <span id="bioCurrentCount" className="gray700-13 floatRight">({formik.values.bio.length || 0}</span>
                                    </Col>
                                    <Col sm={1} lg={1}>
                                    </Col>
                                </Row>
                                <Row>
                                <Col sm={11} lg={11}> 
                                <Form.Control as="textarea" id="bio" name="bio" type="text" 
                                className={formik.touched.bio && formik.errors.bio ? "emptyFormInput addFormInput descriptionInput" : "addFormInput descriptionInput"} onChange={formik.handleChange} value={formik.values.bio} onBlur={formik.handleBlur} onKeyUp={bioCount} />
                                {formik.touched.bio && formik.errors.bio ? <div className="errorMessages">{formik.errors.bio}</div> : null}
                                </Col>
                                <Col sm={1} lg={1} className='eyeColumn' onMouseEnter={() => setBioHover(true)} onMouseLeave={() => setBioHover(false)}>
                                        {inBioHover && (
                                        <div className="accountClassToolTip">
                                        <span className="white-13-semibold">
                                        {showingBio ? optionalShowFieldMsg : optionalHideFieldMsg}
                                        </span>
                                        </div>
                                        )}
                                    <button className='eye' onClick ={(e) => {e.preventDefault(); toggleBio();}}>
                                    {showingBio ? <SVGIcon name="eye" width={24} height={24} fill={'#475da7'} className={'pointer'}/>
                                        : <SVGIcon name="eyeCrossed" width={24} height={24} fill={'#868e96'} className={'pointer'}/>
                                    }
                                    </button>
                                </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <Form.Label className="gray800-14">Domain (optional)</Form.Label>
                                <br />
                                <Row>
                                <Col sm={11} lg={11}> 
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
                                    </Col>
                                    <Col sm={1} lg={1} className='eyeColumn' onMouseEnter={() => setDomainHover(true)} onMouseLeave={() => setDomainHover(false)}>
                                            {inDomainHover && (
                                            <div className="accountClassToolTip">
                                            <span className="white-13-semibold">
                                            {showingDomain ? optionalShowFieldMsg : optionalHideFieldMsg}
                                            </span>
                                            </div>
                                            )}
                                        <button className='eye' onClick ={(e) => {e.preventDefault(); toggleDomain();}}>
                                        {showingDomain ? <SVGIcon name="eye" width={24} height={24} fill={'#475da7'} className={'pointer'}/>
                                            : <SVGIcon name="eyeCrossed" width={24} height={24} fill={'#868e96'} className={'pointer'}/>
                                        }
                                        </button>
                                    </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <span className="gray800-14">Link (optional)</span>
                                <br />
                                <span className="gray700-13">Social media, research gate, anywhere that people can go to find out more about you</span>
                                <Row>
                                    <Col sm={11} lg={11}>
                                    <Form.Control id="link" name="link" type="text" className="addFormInput" onChange={formik.handleChange} value={formik.values.link} onBlur={formik.handleBlur} />
                                    </Col>
                                    <Col sm={1} lg={1} className='eyeColumn' onMouseEnter={() => setLinkHover(true)} onMouseLeave={() => setLinkHover(false)}>
                                        {inLinkHover && (
                                        <div className="accountClassToolTip">
                                        <span className="white-13-semibold">
                                        {showingLink ? optionalShowFieldMsg : optionalHideFieldMsg}
                                        </span>
                                        </div>
                                        )}
                                        <button className='eye' onClick ={(e) => {e.preventDefault(); toggleLink();}}>
                                        {showingLink ? <SVGIcon name="eye" width={24} height={24} fill={'#475da7'} className={'pointer'}/>
                                            : <SVGIcon name="eyeCrossed" width={24} height={24} fill={'#868e96'} className={'pointer'}/>
                                        }
                                        </button>
                                        </Col>
                                </Row>
                            </Form.Group>

                            <Form.Group className="pb-2">
                                <span className="gray800-14">ORCID (optional)</span>
                                <br />
                                <span className="gray700-13">Your unique ORCID identifier</span>
                                <Row>
                                    <Col sm={11} lg={11}>
                                    <Form.Control id="orcid" name="orcid" type="text" className="addFormInput" onChange={formik.handleChange} value={formik.values.orcid} onBlur={formik.handleBlur} />
                                    </Col>
                                    <Col sm={1} lg={1} className='eyeColumn' onMouseEnter={() => setOrcidHover(true)} onMouseLeave={() => setOrcidHover(false)}>
                                        {inOrcidHover && (
                                        <div className="accountClassToolTip">
                                        <span className="white-13-semibold">
                                        {showingOrcid ? optionalShowFieldMsg : optionalHideFieldMsg}
                                        </span>
                                        </div>
                                        )}
                                        <button className='eye' onClick ={(e) => {e.preventDefault(); toggleOrcid();}}>
                                        {showingOrcid ? <SVGIcon name="eye" width={24} height={24} fill={'#475da7'} className={'pointer'}/>
                                            : <SVGIcon name="eyeCrossed" width={24} height={24} fill={'#868e96'} className={'pointer'}/>
                                        }
                                        </button>
                                        </Col>
                                </Row>
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
                        <Button variant="medium" className="dark-14 mr-2" onClick ={(e) => {window.location.href = `/person/${props.userdata.id}`;}}>
                            View my profile
                        </Button>
                        <Button variant="primary" type="submit" className="addButton">
                            Save changes
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default YourAccount;