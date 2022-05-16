/** @jsx jsx */
import { jsx } from '@emotion/react';
import React from 'react';
import PropTypes from 'prop-types';
import _, { merge } from 'lodash';
import Dropdown from '../../../components/Dropdown';
import Input from '../../../components/Input';
import Checkbox from '../../../components/Checkbox';
import Icon from '../../../components/Icon';
import Textarea from '../../../components/Textarea';
import Typography from '../../../components/Typography';

import { ReactComponent as LockIcon } from '../../../images/icons/lock.svg';
import { ReactComponent as PlusIcon } from '../../../images/icons/plus.svg';
import { ReactComponent as EyeIcon } from '../../../images/icons/eye.svg';
import { ReactComponent as TickIcon } from '../../../images/icons/tick.svg';
import { ReactComponent as PencilIcon } from '../../../images/icons/pencil.svg';
import LayoutBox from '../../../components/LayoutBox';
import IconButton from '../../../components/IconButton/IconButton';
import SchemaCreatorConditionalQuestions from './SchemaCreatorConditionalQuestions';
import SchemaCreatorCheckbox from './SchemaCreatorCheckbox';

const inputTypes = ['textInput', 'textareaInput', 'datePickerCustom', 'checkboxOptionsInput', 'radioOptionsInput'];

const SchemaCreator = ({ type }) => {
    const [schema, setSchema] = React.useState({
        pages: [
            {
                description:
                    'Who is going to be accessing the data?\n\nSafe People should have the right motivations for accessing research data and understand the legal and ethical considerations when using data that may be sensitive or confidential. Safe People should also have sufficient skills, knowledge and experience to work with the data effectively.  Researchers may need to undergo specific training or accreditation before accessing certain data or research environments and demonstrate that they are part of a bona fide research organisation.\n\nThe purpose of this section is to ensure that:\n- details of people who will be accessing the data and the people who are responsible for completing the application are identified\n- any individual or organisation that intends to access  the data requested is identified\n- all identified individuals have the necessary accreditation and/or expertise to work with the data effectively.',
                title: 'Safe people',
                pageId: 'safepeople',
                active: true,
            },
            {
                active: false,
                pageId: 'safeproject',
                title: 'Safe project',
                description:
                    'What is the purpose of accessing the data?\n\nSafe projects are those that have a valid research purpose with a defined public benefit. \nFor access to data to be granted the researchers need to demonstrate that their proposal is an appropriate and ethical use of the data, and that it is intended to deliver clear public benefits.  The purpose of this section is to ensure that:\n- the project rationale is explained in lay terms\n- the research purpose has a defined public benefit. This can be new knowledge, new treatments, improved pathways of care, new techniques of training staff. \n- how the data requested will be used to achieve the project objectives is articulated.',
            },
            {
                active: false,
                description:
                    'Safe data ensure that researchers have a clear legal basis for accessing the data and do not inadvertently learn something about the data subjects during the course of their analysis, minimising the risks of re-identification.\nThe minimisation of this risk could be achieved by removing direct identifiers, aggregating values, banding variables, or other statistical techniques that may make re-identification more difficult. Sensitive or confidential data could not be considered to be completely safe because of the residual risk to a data subject’s confidentiality.  Hence other limitations on access will need to be applied.\n\nThe purpose of this section is to ensure that: \n- there is a clear legal basis for accessing the requested data\n- the data requested is proportionate to the requirement of the project \n- all data requested is necessary in order to achieve the public benefit declared \n- data subjects cannot be identified by your team by cross-referencing datasets from anywhere else.',
                title: 'Safe data',
                pageId: 'safedata',
            },
            {
                pageId: 'safesettings',
                title: 'Safe settings',
                description:
                    'Safe settings are analytics environments where researchers can access and analyse the requested datasets in a safe and ethical way. Safe settings encompass the physical environment and procedural arrangements such as the supervision and auditing regimes. For safe settings, the likelihood of both deliberate and accidental disclosure needs to be explicitly considered.\n\nThe purpose of this section is to ensure that:\n\n- researchers access requested data in a secure and controlled setting such as a Trusted Research Environment (TRE) that limits the unauthorised use of the data\n- practical controls and appropriate restrictions are in place if researchers access data though non-TRE environment. There may be requirements that data is held on restricted access servers, encrypted and only decrypted at the point of use.',
                active: false,
            },
            {
                description:
                    'Safe outputs ensure that all research outputs cannot be used to identify data subjects. They typically include ‘descriptive statistics’ that have been sufficiently aggregated such that identification is near enough impossible, and modelled outputs which are inherently non-confidential. The purpose of this section is to ensure that:\n\n- controls are in place to minimise risks associated with planned outputs and publications \n- the researchers aim to openly publish their results to enable use, scrutiny and further research.',
                pageId: 'safeoutputs',
                title: 'Safe outputs',
                active: false,
            },
            {
                active: false,
                description:
                    'Any additional information or files requested by the Data Custodian of the datasets you are requesting to access can be uploaded in this section.',
                title: 'Additional information & files',
                pageId: 'additionalinformationfiles',
            },
        ],
        formPanels: [
            {
                panelId: 'primaryapplicant',
                index: 1,
                pageId: 'safepeople',
            },
            {
                panelId: 'safepeople-otherindividuals',
                pageId: 'safepeople',
                index: 2,
            },
            {
                panelId: 'safeproject-aboutthisapplication',
                pageId: 'safeproject',
                index: 3,
            },
            {
                panelId: 'safeproject-projectdetails',
                pageId: 'safeproject',
                index: 4,
            },
            {
                index: 5,
                pageId: 'safeproject',
                panelId: 'safeproject-funderinformation',
            },
            {
                pageId: 'safeproject',
                index: 6,
                panelId: 'safeproject-sponsorinformation',
            },
            {
                index: 7,
                pageId: 'safeproject',
                panelId: 'safeproject-declarationofinterest',
            },
            {
                panelId: 'safeproject-intellectualproperty',
                pageId: 'safeproject',
                index: 8,
            },
            {
                panelId: 'safedata-datafields',
                index: 9,
                pageId: 'safedata',
            },
            {
                index: 10,
                pageId: 'safedata',
                panelId: 'safedata-analysis',
            },
            {
                pageId: 'safedata',
                index: 11,
                panelId: 'safedata-samplesrequired',
            },
            {
                index: 12,
                pageId: 'safedata',
                panelId: 'safedata-otherdatasetsintentiontolinkdata',
            },
            {
                panelId: 'safedata-statisticalanalysis',
                index: 13,
                pageId: 'safedata',
            },
            {
                pageId: 'safedata',
                index: 14,
                panelId: 'safedata-lawfulbasis',
            },
            {
                pageId: 'safedata',
                index: 15,
                panelId: 'safedata-confidentialityavenue',
            },
            {
                panelId: 'safedata-ethicalapproval',
                pageId: 'safedata',
                index: 16,
            },
            {
                index: 17,
                pageId: 'safesettings',
                panelId: 'safesettings-storageandprocessing',
            },
            {
                panelId: 'safesettings-dataflow',
                pageId: 'safesettings',
                index: 18,
            },
            {
                index: 19,
                pageId: 'safeoutputs',
                panelId: 'safeoutputs-outputsdisseminationplans',
            },
            {
                pageId: 'safeoutputs',
                index: 20,
                panelId: 'safeoutputs-retention',
            },
            {
                panelId: 'safeoutputs-archiving',
                index: 21,
                pageId: 'safeoutputs',
            },
            {
                pageId: 'additionalinformationfiles',
                index: 22,
                panelId: 'additionalinformationfiles-invoicecontact',
            },
            {
                pageId: 'additionalinformationfiles',
                index: 23,
                panelId: 'additionalinformationfiles-datasharingagreementsignatory',
            },
        ],
        questionPanels: [
            {
                questionSets: [
                    {
                        index: 1,
                        questionSetId: 'primaryapplicant',
                    },
                ],
                pageId: 'safepeople',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelHeader:
                    "This section should include key contact details for the person who is leading the project; key contact details for the person(s) who (are) leading the project from other organisations. Only one contact from each organisation is needed. \n\nThe 'Primary applicant' is the person filling out the application form and principal contact for the application. This is usually the person with operational responsibility for the proposal. Each application must have details for at least one person.",
                navHeader: 'Primary applicant',
                panelId: 'primaryapplicant',
            },
            {
                pageId: 'safepeople',
                questionSets: [
                    {
                        questionSetId: 'safepeople-otherindividuals',
                        index: 1,
                    },
                    {
                        index: 100,
                        questionSetId: 'add-safepeople-otherindividuals',
                    },
                ],
                navHeader: 'Other individuals',
                panelId: 'safepeople-otherindividuals',
                panelHeader:
                    "This section should include key contact details for the person who is leading the project; key contact details for the person(s) who (are) leading the project from other organisations. Only one contact from each organisation is needed. \n\nThe 'Primary applicant' is the person filling out the application form and principal contact for the application. This is usually the person with operational responsibility for the proposal. Each application must have details for at least one person.",
                questionPanelHeaderText: 'TODO: We need a description for this panel',
            },
            {
                pageId: 'safeproject',
                questionSets: [
                    {
                        index: 1,
                        questionSetId: 'safeproject-aboutthisapplication',
                    },
                ],
                navHeader: 'About this application',
                panelId: 'safeproject-aboutthisapplication',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelHeader: '',
            },
            {
                panelHeader: '',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                navHeader: 'Project details',
                panelId: 'safeproject-projectdetails',
                questionSets: [
                    {
                        index: 1,
                        questionSetId: 'safeproject-projectdetails',
                    },
                ],
                pageId: 'safeproject',
            },
            {
                questionSets: [
                    {
                        index: 1,
                        questionSetId: 'safeproject-funderinformation',
                    },
                ],
                pageId: 'safeproject',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelHeader:
                    "A funder is the organisation or body providing the financial resource to make the project possible, and may be different to the organisation detailed in the Safe people section. Please provide details of the main funder organisations supporting this project.\n\nPlease use the file upload function if you're not able to add all funders via the form.\n",
                panelId: 'safeproject-funderinformation',
                navHeader: 'Funder information',
            },
            {
                pageId: 'safeproject',
                questionSets: [
                    {
                        index: 1,
                        questionSetId: 'safeproject-sponsorinformation',
                    },
                ],
                panelId: 'safeproject-sponsorinformation',
                navHeader: 'Sponsor information',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelHeader:
                    "The sponsor is usually, but does not have to be, the applicant’s substantive employer. The sponsor takes primary responsibility for ensuring that the design of the project meets appropriate standards and that arrangements are in place to ensure appropriate conduct and reporting.\n\nPlease use the file upload function if you're not able to add all sponsors via the form.\n",
            },
            {
                pageId: 'safeproject',
                questionSets: [
                    {
                        questionSetId: 'safeproject-declarationofinterest',
                        index: 1,
                    },
                ],
                panelId: 'safeproject-declarationofinterest',
                navHeader: 'Declaration of interest',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelHeader:
                    'All interests that might unduly influence an individual’s judgement and objectivity in the use of the data being requested are of relevance, particularly if it involves payment or financial inducement. \n\nThese might include any involvement of commercial organisations at arm’s-length to the project, or likely impact on commercial organisations, individually or collectively, that might result from the outcomes or methodology of the project.\n\nAll individuals named in this application who have an interest this application must declare their interest.\n',
            },
            {
                navHeader: 'Intellectual property',
                panelId: 'safeproject-intellectualproperty',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelHeader:
                    'All interests that might unduly influence an individual’s judgement and objectivity in the use of the data being requested are of relevance, particularly if it involves payment or financial inducement. \n\nThese might include any involvement of commercial organisations at arm’s-length to the project, or likely impact on commercial organisations, individually or collectively, that might result from the outcomes or methodology of the project.\n\nAll individuals named in this application who have an interest this application must declare their interest.\n',
                pageId: 'safeproject',
                questionSets: [
                    {
                        questionSetId: 'safeproject-intellectualproperty',
                        index: 1,
                    },
                ],
            },
            {
                pageId: 'safedata',
                questionSets: [
                    {
                        index: 1,
                        questionSetId: 'safedata-datafields',
                    },
                ],
                panelId: 'safedata-datafields',
                navHeader: 'Data fields',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelHeader:
                    'These are the Information assets which your project seeks to access and use. You should consider this definition to be wide in scope and include any source of information which you propose to access and use. The data may be highly structured or less structured in nature, already existing or to be newly collected or gathered. \n\nExamples may include national datasets, local data sets, national or local extracts from systems, national or local registries or networks, patient records, or new information to be gathered from patients, families or other cohorts.  It could also include metadata which may need to be accessed when physical samples are being requested.\n\n“New data” should only include data that is being specifically gathered for the first time for the purposes of this project. i.e., data already held in case notes and transferred to a form is not “new” data, but a survey filled out by clinicians in order to gather information not recorded anywhere else is “new”.',
            },
            {
                questionSets: [
                    {
                        index: 1,
                        questionSetId: 'safedata-analysis',
                    },
                ],
                pageId: 'safedata',
                panelHeader:
                    'These are the Information assets which your project seeks to access and use. You should consider this definition to be wide in scope and include any source of information which you propose to access and use. The data may be highly structured or less structured in nature, already existing or to be newly collected or gathered. \n\nExamples may include national datasets, local data sets, national or local extracts from systems, national or local registries or networks, patient records, or new information to be gathered from patients, families or other cohorts.  It could also include metadata which may need to be accessed when physical samples are being requested.\n\n“New data” should only include data that is being specifically gathered for the first time for the purposes of this project. i.e., data already held in case notes and transferred to a form is not “new” data, but a survey filled out by clinicians in order to gather information not recorded anywhere else is “new”.',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelId: 'safedata-analysis',
                navHeader: 'Analysis',
            },
            {
                pageId: 'safedata',
                questionSets: [
                    {
                        index: 1,
                        questionSetId: 'safedata-samplesrequired',
                    },
                ],
                panelId: 'safedata-samplesrequired',
                navHeader: 'Samples required',
                panelHeader:
                    'These are the Information assets which your project seeks to access and use. You should consider this definition to be wide in scope and include any source of information which you propose to access and use. The data may be highly structured or less structured in nature, already existing or to be newly collected or gathered. \n\nExamples may include national datasets, local data sets, national or local extracts from systems, national or local registries or networks, patient records, or new information to be gathered from patients, families or other cohorts.  It could also include metadata which may need to be accessed when physical samples are being requested.\n\n“New data” should only include data that is being specifically gathered for the first time for the purposes of this project. i.e., data already held in case notes and transferred to a form is not “new” data, but a survey filled out by clinicians in order to gather information not recorded anywhere else is “new”.',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
            },
            {
                pageId: 'safedata',
                questionSets: [
                    {
                        questionSetId: 'safedata-otherdatasetsintentiontolinkdata',
                        index: 1,
                    },
                ],
                panelId: 'safedata-otherdatasetsintentiontolinkdata',
                navHeader: 'Other datasets - Intention to link data',
                panelHeader:
                    'This section should include information on the planned use of datasets not already included in this application. The following information is required:\n\nA descriptive name so that it is clear what the dataset is. \n\nSufficient information to explain the content of the dataset.  \n\nWhether the proposal requires linkage of data, the use of matched controls, or the extraction of anonymised data.\n\nPlease indicate which organisation or body is undertaking these processes and which variables from the data sources requested will be used to achieve the proposed linkage. This should cover every dataset and variable you will require.\n',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
            },
            {
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelHeader: '',
                panelId: 'safedata-statisticalanalysis',
                navHeader: 'Statistical analysis',
                questionSets: [
                    {
                        questionSetId: 'safedata-statisticalanalysis',
                        index: 1,
                    },
                ],
                pageId: 'safedata',
            },
            {
                navHeader: 'Lawful basis',
                panelId: 'safedata-lawfulbasis',
                panelHeader:
                    'General Data Protection Regulation (GDPR) applies to ‘controllers’ and ‘processors’. \n\nA controller determines the purposes and means of processing personal data.\n\nA processor is responsible for processing personal data on behalf of a controller.\n \nGDPR applies to processing carried out by organisations operating within the EU. It also applies to organisations outside the EU that offer goods or services to individuals in the EU.\nGDPR does not apply to certain activities including processing covered by the Law Enforcement Directive, processing for national security purposes and processing carried out by individuals purely for personal/household activities. \n \nGDPR only applies to information which relates to an identifiable living individual. Information relating to a deceased person does not constitute personal data and therefore is not subject to the GDPR.\n',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                pageId: 'safedata',
                questionSets: [
                    {
                        index: 1,
                        questionSetId: 'safedata-lawfulbasis',
                    },
                ],
            },
            {
                navHeader: 'Confidentiality avenue',
                panelId: 'safedata-confidentialityavenue',
                panelHeader:
                    'If confidential information is being disclosed, the organisations holding this data (both the organisation disclosing the information and the recipient organisation) must also have a lawful basis to hold and use this information, and if applicable, have a condition to hold and use special categories of confidential information, and be fair and transparent about how they hold and use this data. \n\nIn England and Wales, if you are using section 251 of the NHS Act 2006 (s251) as a legal basis for identifiable data, you will need to ensure that you have the latest approval letter and application. \n\nFor Scotland this application will be reviewed by the Public Benefit and Privacy Panel.\n\nIn Northern Ireland it will be considered by the Privacy Advisory Committee. If you are using patient consent as the legal basis, you will need to provide all relevant consent forms and information leaflets.\n',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                pageId: 'safedata',
                questionSets: [
                    {
                        questionSetId: 'safedata-confidentialityavenue',
                        index: 1,
                    },
                ],
            },
            {
                panelId: 'safedata-ethicalapproval',
                navHeader: 'Ethical approval',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelHeader:
                    'This section details the research and ethics approval which you have obtained or sought for your project, or otherwise provides evidence as to why such approval is not necessary. \nWhere such approval is not in place, it is important that you demonstrate why this is the case and provide assurances if approval is pending.  If you need advice on whether ethics approval is necessary, you should approach your local ethics services in the first instance. Information about UK research ethics committees and ethical opinions can be found on the Health Research Authority (HRA) website.\n',
                pageId: 'safedata',
                questionSets: [
                    {
                        questionSetId: 'safedata-ethicalapproval',
                        index: 1,
                    },
                ],
            },
            {
                panelId: 'safesettings-storageandprocessing',
                navHeader: 'Storage and processing',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelHeader:
                    "This section details in what way the proposal aims to store and use data, and controls in place to minimise risks associated with this storage and use. If you have indicated that your proposal seeks to store and use data exclusively through a recognised trusted research environment, then you do not need to complete this section.\n \nIn relation to personal data, means any operation or set of operations which is performed on personal data or on sets of personal data (whether or not by automated means, such as collection, recording, organisation, structuring, storage, alteration, retrieval, consultation, use, disclosure, dissemination, restriction, erasure or destruction).\n \nAll Locations where processing will be undertaken, for the avoidance of doubt storage is considered processing. For each separate organisation processing data which is not fully anonymous a separate partner organisation form must also be completed.\n \n Processing, in relation to information or data means obtaining, recording or holding the information or data or carrying out any operation or set of operations on the information or data, including—\n a) organisation, adaptation or alteration of the information or data,\n b) retrieval, consultation or use of the information or data,\n c) disclosure of the information or data by transmission,\n dissemination or otherwise making available, or\n d) alignment, combination, blocking, erasure or destruction of the information or data.\n\nPlease use the file upload function if you're not able to add all organisations via the form. Documents can be uploaded in the Additional Files section of this form.\n",
                pageId: 'safesettings',
                questionSets: [
                    {
                        questionSetId: 'safesettings-storageandprocessing',
                        index: 1,
                    },
                ],
            },
            {
                panelHeader: '',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelId: 'safesettings-dataflow',
                navHeader: 'Dataflow',
                questionSets: [
                    {
                        index: 1,
                        questionSetId: 'safesettings-dataflow',
                    },
                ],
                pageId: 'safesettings',
            },
            {
                pageId: 'safeoutputs',
                questionSets: [
                    {
                        index: 1,
                        questionSetId: 'safeoutputs-outputsdisseminationplans',
                    },
                ],
                panelId: 'safeoutputs-outputsdisseminationplans',
                navHeader: 'Outputs dissemination plans',
                panelHeader:
                    'Please include any plans for dissemination and publication of the data and results arising from your proposal. Please also specify any controls in place to minimise risks associated with publication. Dissemination can take place in a variety of ways and through many mechanisms, including through electronic media, print media or word of mouth.',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
            },
            {
                questionSets: [
                    {
                        index: 1,
                        questionSetId: 'safeoutputs-retention',
                    },
                ],
                pageId: 'safeoutputs',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelHeader:
                    'This section details how the project will treat data being processed after it has been used for the purpose of the proposal outlined, including governance in place to determine how long it will be retained, and controls to manage its subsequent disposal if required. Please reference any relevant policies and procedures which are in place to govern retention and disposal of data as outlined in the proposal.',
                panelId: 'safeoutputs-retention',
                navHeader: 'Retention',
            },
            {
                questionSets: [
                    {
                        questionSetId: 'safeoutputs-archiving',
                        index: 1,
                    },
                ],
                pageId: 'safeoutputs',
                panelHeader:
                    'This section details how the project will treat data being processed after it has been used for the purpose of the proposal outlined, including governance in place to determine how long it will be retained, and controls to manage its subsequent disposal if required. Please reference any relevant policies and procedures which are in place to govern retention and disposal of data as outlined in the proposal.',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                navHeader: 'Archiving',
                panelId: 'safeoutputs-archiving',
            },
            {
                panelHeader:
                    'Some custodians will only process Data Access Requests which include contact details for the invoice contact and the Data Sharing Agreement contact. If these questions are visible, it means that you have selected datasets from custodians who require this information. These contacts will only be approached if your application is approved.',
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                navHeader: 'Invoice contact',
                panelId: 'additionalinformationfiles-invoicecontact',
                questionSets: [
                    {
                        index: 1,
                        questionSetId: 'additionalinformationfiles-invoicecontact',
                    },
                ],
                pageId: 'additionalinformationfiles',
            },
            {
                questionPanelHeaderText: 'TODO: We need a description for this panel',
                panelHeader:
                    'Some custodians will only process Data Access Requests which include contact details for the invoice contact and the Data Sharing Agreement contact. If these questions are visible, it means that you have selected datasets from custodians who require this information. These contacts will only be approached if your application is approved.',
                navHeader: 'Data Sharing Agreement signatory',
                panelId: 'additionalinformationfiles-datasharingagreementsignatory',
                questionSets: [
                    {
                        questionSetId: 'additionalinformationfiles-datasharingagreementsignatory',
                        index: 1,
                    },
                ],
                pageId: 'additionalinformationfiles',
            },
        ],
        questionSets: [
            {
                questionSetId: 'primaryapplicant',
                questionSetHeader: 'Primary applicant',
                questions: [
                    {
                        questionId: 'safepeopleprimaryapplicantfullname',
                        defaultQuestion: 1,
                        lockedQuestion: 1,
                        validations: [
                            {
                                params: [1],
                                type: 'isLength',
                                message: 'Please enter a value',
                            },
                        ],
                        input: {
                            required: true,
                            type: 'textInput',
                        },
                        guidance: 'Please insert your full name.',
                        question: 'Full name',
                    },
                    {
                        question: 'Job title',
                        guidance: 'Job title is the name of the position the applicant holds within their organisation.',
                        lockedQuestion: 1,
                        input: {
                            required: true,
                            type: 'textInput',
                        },
                        validations: [
                            {
                                type: 'isLength',
                                params: [1],
                                message: 'Please enter a value',
                            },
                        ],
                        defaultQuestion: 1,
                        questionId: 'safepeopleprimaryapplicantjobtitle',
                    },
                    {
                        input: {
                            type: 'textInput',
                        },
                        lockedQuestion: 0,
                        guidance: 'Please include a contact telephone number that the applicant can be contacted on.',
                        question: 'Telephone',
                        questionId: 'safepeopleprimaryapplicanttelephone',
                        defaultQuestion: 1,
                    },
                    {
                        questionId: 'safepeopleprimaryapplicantorcid',
                        defaultQuestion: 1,
                        lockedQuestion: 0,
                        input: {
                            type: 'textInput',
                        },
                        guidance:
                            'ORCID provides a persistent digital identifier (an ORCID iD) that you own and control, and that distinguishes you from every other researcher. You can create an ORCID profile at  https://orcid.org/. If you have an ORCID iD please include it here. ',
                        question: 'ORCID',
                    },
                    {
                        lockedQuestion: 1,
                        input: {
                            required: true,
                            type: 'textInput',
                        },
                        validations: [
                            {
                                message: 'Please enter a value',
                                type: 'isLength',
                                params: [1],
                            },
                            {
                                type: 'isEmail',
                            },
                        ],
                        guidance: 'Please include an email address that the applicant can receive communications through.',
                        question: 'Email',
                        questionId: 'safepeopleprimaryapplicantemail',
                        defaultQuestion: 1,
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'safepeopleprimaryapplicantaccessdata',
                        question: 'Will you access the data requested?',
                        guidance: 'Please confirm whether the applicant will be accessing the data that is being requested.',
                        lockedQuestion: 1,
                        input: {
                            options: [
                                {
                                    value: 'Yes',
                                    text: 'Yes',
                                },
                                {
                                    value: 'No',
                                    text: 'No',
                                },
                            ],
                            label: 'Will you access the data requested?',
                            type: 'radioOptionsInput',
                        },
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'safepeopleprimaryapplicantaccreditedresearcher',
                        guidance:
                            'Depending on the type of data you are requesting, you might be required to become an accredited researcher. Most access to data in the Secure Research Service (SRS) will be by researchers accredited under the Digital Economy Act 2017 (DEA). \n\nThe UK Statistics Authority has published further information on the criteria to be met in a Research Code of Practice and Accreditation criteria. Researchers can apply for accreditation through the Research Accreditation Service (RAS).\n\nFull accredited researcher status is valid for five years. Provisional accredited researcher status is valid for one year.\n\nMore information here: https://www.gov.uk/government/publications/digital-economy-act-2017-part-5-codes-of-practice/research-code-of-practice-and-accreditation-criteria#section-b-accreditation-of-researchers-and-peer-reviewers\n\nPlease note if you only need to review cleared outputs from the research, you do NOT need to be accredited for this purpose.',
                        question: 'Are you an accredited researcher under the Digital Economy Act 2017?',
                        lockedQuestion: 0,
                        input: {
                            options: [
                                {
                                    text: 'Yes',
                                    value: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            question: 'If yes, please provide your accredited researcher number.',
                                            questionId: 'safepeopleprimaryapplicantaccreditedresearchernumber',
                                        },
                                    ],
                                },
                                {
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safepeopleprimaryapplicantaccreditedresearcherintention',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            question: 'If no, please specify if you are planning to become an accredited researcher.',
                                        },
                                    ],
                                    value: 'No',
                                    text: 'No',
                                },
                            ],
                            type: 'radioOptionsInput',
                            label: 'Are you an accredited researcher under the Digital Economy Act 2017?',
                        },
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'safepeopleprimaryapplicanttraininginformationgovernance',
                        guidance:
                            'Evidence of Information Governance training is an important aspect of most applications, giving assurance that individuals are aware of the privacy, confidentiality, data protection and Caldicott implications of working with personal data. \n\nPlease ensure you have checked with the data custodian if training is required for your application.\n',
                        question: 'Have you undertaken professional training or education on the topic of Information Governance?',
                        lockedQuestion: 0,
                        input: {
                            options: [
                                {
                                    conditionalQuestions: [
                                        {
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            guidance:
                                                'Evidence of Information Governance training is an important aspect of most applications, giving assurance that individuals are aware of the privacy, confidentiality, data protection and Caldicott implications of working with personal data. \n\nPlease ensure you have checked with the data custodian if training is required for your application.\n',
                                            question: 'Please provide full details regarding the most recent training',
                                            questionId: 'safepeopleprimaryapplicanttraininginformationgovernancerecent',
                                        },
                                    ],
                                    value: 'Yes',
                                    text: 'Yes',
                                },
                                {
                                    value: 'No',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safepeopleprimaryapplicanttraininginformationgovernanceintention',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            guidance:
                                                'Evidence of Information Governance training is an important aspect of most applications, giving assurance that individuals are aware of the privacy, confidentiality, data protection and Caldicott implications of working with personal data. \n\nPlease ensure you have checked with the data custodian if training is required for your application.\n',
                                            question: 'Please provide any details of plans to attend training, if applicable',
                                        },
                                    ],
                                    text: 'No',
                                },
                            ],
                            type: 'radioOptionsInput',
                            label: 'Have you undertaken professional training or education on the topic of Information Governance?',
                        },
                    },
                    {
                        lockedQuestion: 1,
                        input: {
                            type: 'textInput',
                            required: true,
                        },
                        validations: [
                            {
                                message: 'Please enter a value',
                                type: 'isLength',
                                params: [1],
                            },
                        ],
                        question: 'Your organisation name',
                        guidance:
                            'Please give the full name of the organisation on whose behalf you are making the application or within which you work in your professional capacity as an applicant. This should include a parent organisation, and sub-division or department if appropriate (for example University of Edinburgh, Department of Informatics).',
                        questionId: 'safepeopleprimaryapplicantorganisationname',
                        defaultQuestion: 1,
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'safepeopleprimaryapplicantorganisationdatasecurityprotectionkit',
                        guidance:
                            'The Data Security and Protection Toolkit (DSPT) is an online self-assessment tool that allows organisations to measure their performance against the National Data Guardian’s 10 data security standards.\n\nAll organisations that have access to NHS patient data and systems must use the DSPT to provide assurance that they are practising good data security and that personal information is handled correctly.\n\nThe DSPT is an annual assessment.\n\nYou can find out the status of your organisation here https://www.dsptoolkit.nhs.uk/OrganisationSearch',
                        question: 'Does your organisation have a current Data Security and Protection Toolkit (DSPT) published assessment?',
                        lockedQuestion: 0,
                        input: {
                            options: [
                                {
                                    value: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safepeopleprimaryapplicantorganisationdatasecurityprotectionkitstatus',
                                            question: 'If yes, please provide the current status',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                        {
                                            questionId: 'safepeopleprimaryapplicantorganisationdatasecurityprotectionkitdatepublished',
                                            validations: [
                                                {
                                                    type: 'isCustomDate',
                                                },
                                            ],
                                            input: {
                                                type: 'datePickerCustom',
                                            },
                                            question: 'If yes, please provide the date published',
                                        },
                                    ],
                                    text: 'Yes',
                                },
                                {
                                    value: 'No',
                                    text: 'No',
                                },
                            ],
                            label: 'Does your organisation have a current Data Security and Protection Toolkit (DSPT) published assessment?',
                            type: 'radioOptionsInput',
                        },
                    },
                    {
                        questionId: 'safepeopleprimaryapplicantorganisationdatacontroller',
                        defaultQuestion: 1,
                        input: {
                            options: [
                                {
                                    value: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safepeopleprimaryapplicantorganisationicoregisterednumber',
                                            question: 'ICO registration number',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                        {
                                            questionId: 'safepeopleprimaryapplicantorganisationaddressline1',
                                            guidance: "Please include the organisation's business address.",
                                            question: 'Registered address (line 1)',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                        {
                                            input: {
                                                type: 'textInput',
                                            },
                                            question: 'Registered address (line 2)',
                                            guidance: "Please include the organisation's business address.",
                                            questionId: 'safepeopleprimaryapplicantorganisationaddressline2',
                                        },
                                        {
                                            guidance: 'Please specify the city where the organisation is located',
                                            question: 'City',
                                            input: {
                                                type: 'textInput',
                                            },
                                            questionId: 'safepeopleprimaryapplicantorganisationcity',
                                        },
                                        {
                                            questionId: 'safepeopleprimaryapplicantorganisationpostcode',
                                            input: {
                                                type: 'textInput',
                                            },
                                            guidance: "Please include the organisation's business address postcode",
                                            question: 'Postcode',
                                        },
                                        {
                                            questionId: 'safepeopleprimaryapplicantorganisationcountry',
                                            input: {
                                                type: 'textInput',
                                            },
                                            question: 'Country',
                                            guidance: 'Please specify the country where the organisation is located.',
                                        },
                                        {
                                            questionId: 'safepeopleprimaryapplicantorganisationtype',
                                            label: 'Organisation type',
                                            guidance: 'Please select type of organisation.',
                                            question: 'Organisation type',
                                            input: {
                                                type: 'checkboxOptionsInput',
                                                options: [
                                                    {
                                                        text: 'Academic institution',
                                                        value: 'Academic institution',
                                                    },
                                                    {
                                                        value: 'National body',
                                                        text: 'National body',
                                                    },
                                                    {
                                                        value: 'Healthcare provider',
                                                        text: 'Healthcare provider',
                                                    },
                                                    {
                                                        value: 'Healthcare comissioner',
                                                        text: 'Healthcare comissioner',
                                                    },
                                                    {
                                                        text: 'Commercial body',
                                                        value: 'Commercial body',
                                                    },
                                                    {
                                                        text: 'Local Authority',
                                                        value: 'Local Authority',
                                                    },
                                                    {
                                                        value: 'Other',
                                                        text: 'Other',
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    text: 'Yes',
                                },
                                {
                                    text: 'No',
                                    value: 'No',
                                },
                                {
                                    value: 'Unsure',
                                    text: 'Unsure',
                                },
                            ],
                            type: 'radioOptionsInput',
                            label: 'Will your organisation act as data controller?',
                        },
                        lockedQuestion: 0,
                        guidance:
                            'Please specify if your organisation will act as a data controller. If your organisation is not the sole data controller, please provide details of other data controllers.',
                        question: 'Will your organisation act as data controller?',
                    },
                    {
                        question: 'CV',
                        guidance: 'Documents can be uploaded in the Additional Files section of this form.',
                        lockedQuestion: 0,
                        input: {
                            label: 'CV',
                            type: 'checkboxOptionsInput',
                            options: [
                                {
                                    value: 'I have uploaded a CV for this person',
                                    text: 'I have uploaded a CV for this person',
                                },
                            ],
                        },
                        defaultQuestion: 1,
                        questionId: 'safepeopleprimaryapplicantuploadedcv',
                    },
                    {
                        questionId: 'safepeopleprimaryapplicantexperience',
                        defaultQuestion: 1,
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                        question:
                            "Please provide evidence of the primary applicant's expertise and experience relevant to delivering the project",
                        guidance:
                            'You must be able to demonstrate the team are qualified / experienced enough to work on the project. Applicants should provide qualifications as bona fide researcher(s) experienced in the use of large research datasets and provide evidence of their experience in their research field.  ',
                    },
                ],
            },
            {
                questionSetId: 'safepeople-otherindividuals',
                questionSetHeader: 'Other individuals',
                questions: [
                    {
                        questionId: 'safepeopleotherindividualsfullname',
                        defaultQuestion: 1,
                        input: {
                            type: 'textInput',
                        },
                        lockedQuestion: 1,
                        question: 'Full name',
                        guidance: "Full name is the individual's first and last name",
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'safepeopleotherindividualsjobtitle',
                        guidance: 'Job Title is the name of the position the individual holds within their organisation.',
                        question: 'Job title',
                        input: {
                            type: 'textInput',
                        },
                        lockedQuestion: 1,
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'safepeopleotherindividualsorcid',
                        guidance:
                            'ORCID provides a persistent digital identifier (an ORCID iD) that you own and control, and that distinguishes you from every other researcher. You can create an ORCID profile at  https://orcid.org/. If your collaborator has an ORCID iD please include it here.',
                        question: 'ORCID',
                        lockedQuestion: 0,
                        input: {
                            type: 'textInput',
                        },
                    },
                    {
                        questionId: 'safepeopleotherindividualsorganisation',
                        defaultQuestion: 1,
                        input: {
                            type: 'textInput',
                        },
                        lockedQuestion: 0,
                        guidance: "Please include the individual's organisation.",
                        question: 'Organisation',
                    },
                    {
                        questionId: 'safepeopleotherindividualsrole',
                        defaultQuestion: 1,
                        input: {
                            type: 'checkboxOptionsInput',
                            label: 'Role',
                            options: [
                                {
                                    value: 'Principal investigator',
                                    text: 'Principal investigator',
                                },
                                {
                                    text: 'Collaborator',
                                    value: 'Collaborator',
                                },
                                {
                                    text: 'Team member',
                                    conditionalQuestions: [
                                        {
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            question: 'If other, please specify',
                                            questionId: 'safepeopleotherindividualsroleotherdetails',
                                        },
                                    ],
                                    value: 'Team member',
                                },
                                {
                                    text: 'Other',
                                    value: 'Other',
                                },
                            ],
                        },
                        lockedQuestion: 0,
                        guidance:
                            'A role is a function that the applicant plays. It might include role types and accreditation for those that are accessing the secure data and those that are not but would see cleared outputs from the project. \n (i.e. project lead, deputy lead, accrediter, researcher, peer reviewer)\n',
                        question: 'Role',
                    },
                    {
                        guidance: 'Please confirm whether this person will be accessing the resources being requested.',
                        question: 'Will this person access the data requested?',
                        lockedQuestion: 1,
                        input: {
                            options: [
                                {
                                    value: 'Yes',
                                    text: 'Yes',
                                },
                                {
                                    value: 'No',
                                    text: 'No',
                                },
                                {
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safepeopleotherindividualsaccreditedresearcherdetails',
                                            question: 'If yes, please provide details',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                        },
                                    ],
                                },
                            ],
                            type: 'radioOptionsInput',
                            label: 'Will this person access the data requested?',
                        },
                        defaultQuestion: 1,
                        questionId: 'safepeopleotherindividualsaccessdata',
                    },
                    {
                        guidance:
                            'Please confirm whether this person is an accredited researcher under the Digital Economy Act 2017 (https://www.legislation.gov.uk/ukpga/2017/30/contents/enacted).',
                        question: 'Is this person an accredited researcher under the Digital Economy Act 2017?',
                        lockedQuestion: 0,
                        input: {
                            options: [
                                {
                                    text: 'Yes',
                                    value: 'Yes',
                                },
                                {
                                    text: 'No',
                                    value: 'No',
                                },
                                {
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safepeopleotherindividualstraininginformationgovernancerecent',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            question: 'Please provide full details regarding the most recent training',
                                        },
                                    ],
                                },
                            ],
                            label: 'Is this person an accredited researcher under the Digital Economy Act 2017?',
                            type: 'radioOptionsInput',
                        },
                        defaultQuestion: 1,
                        questionId: 'safepeopleotherindividualsaccreditedresearcher',
                    },
                    {
                        questionId: 'safepeopleotherindividualstraininginformationgovernance',
                        defaultQuestion: 1,
                        lockedQuestion: 0,
                        input: {
                            options: [
                                {
                                    text: 'Yes',
                                    value: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safepeopleotherindividualstraininginformationgovernanceintention',
                                            question: 'Please provide any details of plans to attend training, if applicable',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                        },
                                    ],
                                },
                                {
                                    value: 'No',
                                    text: 'No',
                                },
                            ],
                            label: 'Has this person undertaken professional training or education on the topic of Information Governance?',
                            type: 'radioOptionsInput',
                        },
                        question: 'Has this person undertaken professional training or education on the topic of Information Governance?',
                        guidance:
                            'Evidence of Information Governance training is an important aspect of most applications, giving assurance that individuals are aware of the privacy, confidentiality, data protection and Caldicott implications of working with personal data. \n\nPlease ensure you have checked with the data custodian what training is required for your application.',
                    },
                    {
                        input: {
                            label: 'CV',
                            type: 'checkboxOptionsInput',
                            options: [
                                {
                                    text: 'I have uploaded a CV for this person',
                                    value: 'I have uploaded a CV for this person',
                                },
                            ],
                        },
                        lockedQuestion: 0,
                        question: 'CV',
                        guidance: 'Documents can be uploaded in the Additional Files section of this form.',
                        questionId: 'safepeopleotherindividualsuploadedcv',
                        defaultQuestion: 1,
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'safepeopleotherindividualsexperience',
                        guidance:
                            'You must be able to demonstrate the team are qualified / experienced enough to work on the project. Applicants should provide qualifications as bona fide researcher(s) experienced in the use of large research datasets and provide evidence of their experience in their research field.  ',
                        question: "Please provide evidence of this person's expertise and experience relevant to delivering the project",
                        lockedQuestion: 0,
                        input: {
                            type: 'textareaInput',
                        },
                    },
                ],
            },
            {
                questions: [
                    {
                        lockedQuestion: 0,
                        input: {
                            panelId: 'safepeople-otherindividuals',
                            class: 'btn btn-primary addButton',
                            type: 'buttonInput',
                            text: 'Add another individual?',
                            action: 'addRepeatableSection',
                        },
                        questionId: 'add-safepeople-otherindividuals',
                        defaultQuestion: 1,
                    },
                ],
                questionSetId: 'add-safepeople-otherindividuals',
            },
            {
                questions: [
                    {
                        input: {
                            options: [
                                {
                                    value: 'A new application',
                                    text: 'A new application',
                                },
                                {
                                    text: 'An amendment to an existing application',
                                    conditionalQuestions: [
                                        {
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            question: 'Reference or details of previous application',
                                            guidance:
                                                'Please provide the UK Health Research Authority Research Ethics Service reference. If not a research study please provide references or details of previous application. ',
                                            questionId: 'safeprojectaboutthisapplicationtypeamendmentdetails',
                                        },
                                    ],
                                    value: 'An amendment to an existing application',
                                },
                                {
                                    text: 'An extension of an existing approval',
                                    value: 'An extension of an existing approval',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safeprojectaboutthisapplicationtypeextensiondetails',
                                            question: 'Reference or details of previous application',
                                            guidance:
                                                'Please provide the UK Health Research Authority Research Ethics Service reference. If not a research study please provide references or details of previous application. ',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                        },
                                    ],
                                },
                                {
                                    text: 'A renewal of an existing approval',
                                    value: 'A renewal of an existing approval',
                                    conditionalQuestions: [
                                        {
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            guidance:
                                                'Please provide the UK Health Research Authority Research Ethics Service reference. If not a research study please provide references or details of previous application. ',
                                            question: 'Reference or details of previous application',
                                            questionId: 'safeprojectaboutthisapplicationtyperenewaldetails',
                                        },
                                    ],
                                },
                                {
                                    value: 'Related to a previous application (approved or not)',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safeprojectaboutthisapplicationtyperelatedpreviousdetails',
                                            question: 'Reference or details of previous application',
                                            guidance:
                                                'Please provide the UK Health Research Authority Research Ethics Service reference. If not a research study please provide references or details of previous application. ',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                        },
                                    ],
                                    text: 'Related to a previous application (approved or not)',
                                },
                            ],
                            label: 'This application is...',
                            type: 'radioOptionsInput',
                        },
                        lockedQuestion: 1,
                        guidance:
                            'The application could be a new application, an extension, a renewal or amendment. For extensions or amendments, you must highlight the specific information within this form that has been updated, provide an original application number and approval date, any subsequent amendment approval dates and a summary of changes and rationale for the change to your original application and updated approvals signatures in order for the request to be processed.',
                        question: 'This application is...',
                        questionId: 'safeprojectaboutthisapplicationtype',
                        defaultQuestion: 1,
                    },
                ],
                questionSetId: 'safeproject-aboutthisapplication',
                questionSetHeader: 'About this application',
            },
            {
                questions: [
                    {
                        defaultQuestion: 1,
                        guidance:
                            'The title should identify the main area of your research so that another researcher could understand if it might be relevant to their area of study. \n',
                        lockedQuestion: 1,
                        validations: [
                            {
                                type: 'isLength',
                                params: [3, 300],
                            },
                        ],
                        questionId: 'safeprojectprojectdetailstitle',
                        question: 'Title of project',
                        input: {
                            type: 'textInput',
                            required: true,
                        },
                    },
                    {
                        input: {
                            label: 'What is the type of project?',
                            type: 'radioOptionsInput',
                            required: true,
                            options: [
                                {
                                    value: 'Research',
                                    text: 'Research',
                                },
                                {
                                    text: 'Clinic audit',
                                    value: 'Clinic audit',
                                },
                                {
                                    value: 'Service evaluation',
                                    text: 'Service evaluation',
                                },
                                {
                                    value: 'Other',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safeprojectprojectdetailstypeotherdetails',
                                            question: 'If other, please specify',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                    ],
                                    text: 'Other',
                                },
                            ],
                        },
                        validations: [
                            {
                                type: 'isLength',
                                params: [1],
                                message: 'Please select an option',
                            },
                        ],
                        lockedQuestion: 1,
                        guidance:
                            'A research project is a discrete scientific endeavour to answer a research question or a set of research questions. \n\nA clinic audit project is designed and conducted to produce information to inform delivery of best care. It aims to find out if healthcare is being provided in line with standards to inform care providers and patients about where a service is doing well, and where there could be improvements.\n\nA service evaluation project is designed and conducted solely to define or judge current care. It seeks to assess current service to assess how well a service is achieving its intended aims.',
                        question: 'What is the type of project?',
                        questionId: 'safeprojectprojectdetailstype',
                        defaultQuestion: 1,
                    },
                    {
                        lockedQuestion: 0,
                        input: {
                            label: 'Is this a new study or supporting an existing project?',
                            type: 'radioOptionsInput',
                            options: [
                                {
                                    text: 'New project',
                                    value: 'New project',
                                },
                                {
                                    conditionalQuestions: [
                                        {
                                            question: 'Evidence of existing outputs',
                                            input: {
                                                options: [
                                                    {
                                                        value: 'I have enclosed evidence of existing outputs',
                                                        text: 'I have enclosed evidence of existing outputs',
                                                    },
                                                ],
                                                type: 'checkboxOptionsInput',
                                            },
                                            questionId: 'safeprojectprojectdetailsneworexistingexistingoutputevidence',
                                            label: 'Evidence of existing outputs',
                                        },
                                    ],
                                    value: 'Existing project',
                                    text: 'Existing project',
                                },
                            ],
                        },
                        question: 'Is this a new study or supporting an existing project?',
                        questionId: 'safeprojectprojectdetailsneworexisting',
                        defaultQuestion: 1,
                    },
                    {
                        question: 'Has the hypothesis being investigated been commissioned by the NHS?',
                        lockedQuestion: 0,
                        input: {
                            label: 'Has the hypothesis being investigated been commissioned by the NHS?',
                            type: 'radioOptionsInput',
                            options: [
                                {
                                    text: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            question:
                                                'If yes, please provide details of the commission and any peer review to date. (100 words)',
                                            validations: [
                                                {
                                                    params: [10, 700],
                                                    type: 'isLength',
                                                },
                                            ],
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            questionId: 'safeprojectprojectdetailshypothesiscomissionednhsdetails',
                                        },
                                    ],
                                    value: 'Yes',
                                },
                                {
                                    text: 'No',
                                    value: 'No',
                                },
                            ],
                        },
                        defaultQuestion: 1,
                        questionId: 'safeprojectprojectdetailshypothesiscomissionednhs',
                    },
                    {
                        defaultQuestion: 1,
                        guidance:
                            'Please provide a summary of the project in language suitable for non-experts in the field and ensure that all abbreviations in technical terminology are explained. Do not include any confidential or sensitive information in this section as this section may be used to publicise the project if the application is successful.\n\nThe summary must make clear what the specific purpose is, who will be using the data (organisations rather than individual names), what will happen to the data, whether the expected outputs are in record level form, what is known to date about your chosen project including any preliminary/related analysis and background literature reviews. Please include any potential disclosure risks and how these will be addressed.',
                        lockedQuestion: 1,
                        validations: [
                            {
                                type: 'isLength',
                                params: [10, 2000],
                            },
                        ],
                        questionId: 'safeprojectprojectdetailslaysummary',
                        question: 'Please provide a lay summary of the project (300 words)',
                        input: {
                            type: 'textareaInput',
                            required: true,
                        },
                    },
                    {
                        questionId: 'safeproject-projectdetails-startdate',
                        defaultQuestion: 1,
                        input: {
                            type: 'datePickerCustom',
                        },
                        validations: [
                            {
                                type: 'isCustomDate',
                            },
                        ],
                        lockedQuestion: 0,
                        question: 'What is the anticipated start date of the project?',
                    },
                    {
                        question: 'Please provide anticipated end date of the project?',
                        lockedQuestion: 0,
                        input: {
                            type: 'datePickerCustom',
                        },
                        validations: [
                            {
                                type: 'isCustomDate',
                            },
                        ],
                        defaultQuestion: 1,
                        questionId: 'safeproject-projectdetails-enddate',
                    },
                    {
                        input: {
                            type: 'textareaInput',
                            required: true,
                        },
                        validations: [
                            {
                                message: 'Please enter a value',
                                type: 'isLength',
                                params: [1],
                            },
                        ],
                        lockedQuestion: 1,
                        guidance:
                            'Please include background to the project, including why the project is being undertaken and the specific aims and the hypotheses being tested. Summarise how the data requested are required to help address these aims. Please include whether any aspect of the project has been peer reviewed and if applicable, the nature of that review. ',
                        question: 'What are the project aims, objectives and rationale?',
                        questionId: 'safeprojectprojectdetailsaimsobjectivesrationale',
                        defaultQuestion: 1,
                    },
                    {
                        questionId: 'safeprojectprojectdetailsdatausageforobjectives',
                        defaultQuestion: 1,
                        lockedQuestion: 1,
                        validations: [
                            {
                                message: 'Please enter a value',
                                params: [1],
                                type: 'isLength',
                            },
                        ],
                        input: {
                            required: true,
                            type: 'textareaInput',
                        },
                        guidance:
                            'Provide full details of your research methodology. This must include justification of sample size, analyses proposed, statistical methods, additional data sources such as linked data and any plans for collaborative work. \n\nThis information will be key to assessing whether your proposal will be feasible, deliver clear public good and be an appropriate use of data. \n\nEnsure you: \n\nSpecify the method(s) of analysis you plan to use (such as regression);\n\nAs far as possible, try to articulate the outcome or dependent variable(s). \n\nIndicate the starting point for the modelling process - acknowledging that the model may evolve.\n\nExplain (where relevant) how any potential selection/causal bias will be addressed (e.g. by including a control group with information on how this control group will be created); \n\nProvide methodology references, if a non-standard methodology is proposed;\n\nInclude information about any contribution to the field of research methodology that you believe may result from your research;\n\nInclude an explanation of how your methodological approach will answer the research question(s) set out in the project when employing methods not covered by any of the above (e.g. correlation or basic descriptive analysis will only be used, noting that such analysis might be more applicable for exploratory research).',
                        question: 'How will the data requested be used to achieve the project objectives?',
                    },
                    {
                        questionId: 'safeprojectprojectdetailspublicbenefitimpacttype',
                        defaultQuestion: 1,
                        lockedQuestion: 1,
                        input: {
                            options: [
                                {
                                    value: 'Further understanding of the health and care needs of populations',
                                    text: 'Further understanding of the health and care needs of populations',
                                },
                                {
                                    text: 'Lead to the identification and progress of treatments and therapies to improve health',
                                    value: 'Lead to the identification and progress of treatments and therapies to improve health',
                                },
                                {
                                    text: 'Further understanding of regional and national trends in health and social care needs',
                                    value: 'Further understanding of regional and national trends in health and social care needs',
                                },
                                {
                                    text: 'Inform planning health services and programmes',
                                    value: 'Inform planning health services and programmes',
                                },
                                {
                                    text: 'Inform decisions on how to effectively allocate and evaluate funding according to health needs?',
                                    value: 'Inform decisions on how to effectively allocate and evaluate funding according to health needs?',
                                },
                                {
                                    text: 'Further knowledge creation or support exploratory research and the innovations and developments that might result from that exploratory work.',
                                    value: 'Further knowledge creation or support exploratory research and the innovations and developments that might result from that exploratory work.',
                                },
                                {
                                    value: 'Other',
                                    text: 'Other',
                                },
                            ],
                            type: 'checkboxOptionsInput',
                            label: 'How will you demonstrate that use of the data requested will deliver public benefit? Please select all that apply.',
                        },
                        question:
                            'How will you demonstrate that use of the data requested will deliver public benefit? Please select all that apply.',
                        guidance:
                            'The concept of public benefit is broad and flexible, and could include direct, indirect and long-term benefits. However, the benefit needs to be identifiable regardless of whether it can be quantified or measured. Please select at least one of the options provided to indicate how you would determine whether the use of requested data is for public benefit.\n\n---\n\n\n**This guidance is aligned with:  **  \n\n\n![Test image](https://storage.googleapis.com/hdruk-gateway_non-prod-cms/web-assets/NDG-logo-small.png)',
                    },
                    {
                        guidance:
                            'Use this section to give the background and justification of your proposal, to demonstrate how your project will benefit the public, as well as show your understanding of the Information Governance issues specific and inherent to your project. Please make it clear how the data requested will contribute. \n\nPlease also show that you have considered how to balance the privacy risks and public benefits when designing the study.  The requirement for the datasets requested should be fully justified in the light of the aims and objectives of the proposal.\n',
                        question: 'Please provide details to justify your selection above.',
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                        defaultQuestion: 1,
                        questionId: 'safeprojectprojectdetailspublicbenefitimpact',
                    },
                    {
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                        question:
                            'Provide an outline of the public and patient involvement and engagement (PPIE*) strategy for the study, OR a brief explanation as to why this is not required.',
                        guidance:
                            'Provide full details of proposed public engagement plans for patient and/or user group involvement. If you have no public engagement plans, please explain why this is the case.',
                        questionId: 'safeprojectprojectdetailspublicpatientinvolvementengagement',
                        defaultQuestion: 1,
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'safeprojectprojectdetailsindividualprivacyriskmitigation',
                        question:
                            'Do you anticipate any risk to individuals, and if so what steps have you made in your proposal to mitigate these?',
                        guidance:
                            'A data use purpose cannot be considered as beneficial if the harm resulting from the use of the data outweighs the public benefit. Please demonstrate that you have considered how to balance the risks and public benefits when designing the study.\n\nPlease consider:\n\n- Could individual patient privacy be compromised?\n- Could patient or service user safety be harmed? \n- If data was to be used for this purpose, could it make some patients or service users less likely to seek care or be less frank in discussion with health and care professionals? \n- Could the purpose lead to the creation or exacerbation of inequalities or unlawful discrimination against particular communities? \n- Could the use of inaccurate or inadequate health and social care data lead to unrepresentative findings? \n- Could the purpose undermine the sustainability of publicly funded health or adult social care services? \n\n---\n\n\n**This guidance is aligned with:  **  \n\n\n![Test image](https://storage.googleapis.com/hdruk-gateway_non-prod-cms/web-assets/NDG-logo-small.png)',
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 1,
                    },
                    {
                        lockedQuestion: 0,
                        input: {
                            type: 'textareaInput',
                        },
                        question:
                            'In considering your proposal, do you believe it could disadvantage any group or individual?  Explain what steps you have taken to avoid this.',
                        questionId: 'safeprojectprojectdetailsgroupindividualdisavantageavoidance',
                        defaultQuestion: 1,
                    },
                    {
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                        question: 'Please provide up to 6 keywords which best summarise your proposed research project.',
                        questionId: 'safeprojectprojectdetailsresearchprojectsummarykeywords',
                        defaultQuestion: 1,
                    },
                    {
                        lockedQuestion: 0,
                        input: {
                            label: 'Please indicate whether the proposed project will enhance future benefits of our dataset, and describe any expected benefits',
                            type: 'radioOptionsInput',
                            options: [
                                {
                                    text: 'Yes',
                                    value: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safeprojectprojectdetailsresearchprojectfuturedatabasebenefit',
                                            question: 'If yes, please provide details',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                        },
                                    ],
                                },
                                {
                                    text: 'No',
                                    value: 'No',
                                },
                            ],
                        },
                        question:
                            'Please indicate whether the proposed project will enhance future benefits of our dataset, and describe any expected benefits',
                        questionId: 'safeprojectprojectdetailsresearchprojectfuturedatabasebenefityesorno',
                        defaultQuestion: 1,
                    },
                ],
                questionSetHeader: 'Project details',
                questionSetId: 'safeproject-projectdetails',
            },
            {
                questionSetHeader: 'Funder information',
                questionSetId: 'safeproject-funderinformation',
                questions: [
                    {
                        lockedQuestion: 1,
                        input: {
                            options: [
                                {
                                    text: 'Yes',
                                    value: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safeprojectfunderinformationprojecthasfundername',
                                            input: {
                                                type: 'textInput',
                                            },
                                            guidance: 'Please confirm funder organisation name.',
                                            question: 'Please provide the organisation name',
                                        },
                                        {
                                            questionId: 'add-safeproject-funderinformation',
                                            input: {
                                                text: 'Add another organisation?',
                                                action: 'addRepeatableQuestions',
                                                class: 'btn btn-primary addButton',
                                                separatorText: 'Organisation Details',
                                                type: 'buttonInput',
                                                questionIds: ['safeprojectfunderinformationprojecthasfundername'],
                                            },
                                        },
                                    ],
                                },
                                {
                                    value: 'No',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safeprojectfunderinformationprojecthasnofunderfundingsource',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            question: 'If no, please provide details of how you intend to fund the study',
                                        },
                                        {
                                            question: 'Please provide evidence of independent peer review',
                                            guidance: 'Documents can be uploaded in the Additional Files section of this form.',
                                            input: {
                                                options: [
                                                    {
                                                        text: 'I confirm I have provided evidence of independent peer review.',
                                                        value: 'I confirm I have provided evidence of independent peer review.',
                                                    },
                                                ],
                                                type: 'checkboxOptionsInput',
                                            },
                                            label: 'Please provide evidence of independent peer review',
                                            questionId: 'safeprojectfunderinformationprojecthasnofunderindependentpeerreviewevidence',
                                        },
                                    ],
                                    text: 'No',
                                },
                            ],
                            required: true,
                            type: 'radioOptionsInput',
                            label: 'Does your project have a funder?',
                        },
                        validations: [
                            {
                                type: 'isLength',
                                params: [1],
                                message: 'Please select an option',
                            },
                        ],
                        question: 'Does your project have a funder?',
                        guidance: 'Please confirm if your project has a funder.',
                        questionId: 'safeprojectfunderinformationprojecthasfunder',
                        defaultQuestion: 1,
                    },
                ],
            },
            {
                questionSetId: 'safeproject-sponsorinformation',
                questionSetHeader: 'Sponsor information',
                questions: [
                    {
                        guidance: 'Please confirm if your project has a sponsor.',
                        question: 'Does your project have a sponsor?',
                        input: {
                            required: true,
                            options: [
                                {
                                    conditionalQuestions: [
                                        {
                                            question: 'Associated applicant',
                                            input: {
                                                type: 'textInput',
                                            },
                                            questionId: 'safeprojectsponsorinformationprojecthassponsorapplicant',
                                        },
                                        {
                                            questionId: 'safeprojectsponsorinformationprojecthassponsororganisationname',
                                            question: 'Organisation name',
                                            guidance: 'Please provide legal name; to appear on legal documents.',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                        {
                                            questionId: 'safeprojectsponsorinformationprojecthassponsororganisationaddressline1',
                                            input: {
                                                type: 'textInput',
                                            },
                                            guidance: 'Please confirm sponsor organisation address.',
                                            question: 'Registered address (line 1)',
                                        },
                                        {
                                            questionId: 'safeprojectsponsorinformationprojecthassponsororganisationaddressline2',
                                            input: {
                                                type: 'textInput',
                                            },
                                            guidance: 'Please confirm sponsor organisation address.',
                                            question: 'Registered address (line 2)',
                                        },
                                        {
                                            questionId: 'safeprojectsponsorinformationprojecthassponsororganisationcity',
                                            input: {
                                                type: 'textInput',
                                            },
                                            question: 'City',
                                            guidance: 'Please confirm sponsor organisation city.',
                                        },
                                        {
                                            questionId: 'safeprojectsponsorinformationprojecthassponsororganisationpostcode',
                                            question: 'Postcode',
                                            guidance: 'Please confirm sponsor organisation postcode.',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                        {
                                            question: 'Country',
                                            guidance: "Please confirm sponsor organisation's country.",
                                            input: {
                                                type: 'textInput',
                                            },
                                            questionId: 'safeprojectsponsorinformationprojecthassponsororganisationcountry',
                                        },
                                        {
                                            question: 'Sector',
                                            guidance:
                                                "Please provide details of the sponsor's sector e.g. NHS, Academia, Charity, Industry.",
                                            input: {
                                                type: 'textInput',
                                            },
                                            questionId: 'safeprojectsponsorinformationprojecthassponsororganisationsector',
                                        },
                                        {
                                            questionId: 'safeprojectsponsorinformationprojecthassponsororganisationsize',
                                            guidance: 'Please specify the size of the organisation (small, medium, large).',
                                            question: 'Size',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                        {
                                            input: {
                                                type: 'textInput',
                                            },
                                            guidance: 'Please provide additional details, if applicable.',
                                            question: 'Additional details',
                                            questionId: 'safeprojectsponsorinformationprojecthassponsororganisationadditionaldetails',
                                        },
                                        {
                                            questionId: 'safeprojectsponsorinformationprojecthassponsorcontactfullname',
                                            question: 'Contact full name',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                        {
                                            questionId: 'safeprojectsponsorinformationprojecthassponsorcontactemail',
                                            question: 'Contact email address',
                                            guidance: 'Please provide a contact email address for the sponsor organisation',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                        {
                                            input: {
                                                type: 'textInput',
                                            },
                                            question: 'Contact telephone',
                                            questionId: 'safeprojectsponsorinformationprojecthassponsorcontacttelephone',
                                        },
                                        {
                                            questionId: 'add-safeproject-sponsorinformation',
                                            input: {
                                                class: 'btn btn-primary addButton',
                                                action: 'addRepeatableQuestions',
                                                text: 'Add another organisation?',
                                                separatorText: 'Organisation Details',
                                                questionIds: [
                                                    'safeprojectsponsorinformationprojecthassponsorapplicant',
                                                    'safeprojectsponsorinformationprojecthassponsororganisationname',
                                                    'safeprojectsponsorinformationprojecthassponsororganisationaddressline1',
                                                    'safeprojectsponsorinformationprojecthassponsororganisationaddressline2',
                                                    'safeprojectsponsorinformationprojecthassponsororganisationcity',
                                                    'safeprojectsponsorinformationprojecthassponsororganisationpostcode',
                                                    'safeprojectsponsorinformationprojecthassponsororganisationcountry',
                                                    'safeprojectsponsorinformationprojecthassponsororganisationsector',
                                                    'safeprojectsponsorinformationprojecthassponsororganisationsize',
                                                    'safeprojectsponsorinformationprojecthassponsororganisationadditionaldetails',
                                                    'safeprojectsponsorinformationprojecthassponsorcontactfullname',
                                                    'safeprojectsponsorinformationprojecthassponsorcontactemail',
                                                    'safeprojectsponsorinformationprojecthassponsorcontacttelephone',
                                                ],
                                                type: 'buttonInput',
                                            },
                                        },
                                    ],
                                    value: 'Yes',
                                    text: 'Yes',
                                },
                                {
                                    value: 'No',
                                    text: 'No',
                                },
                            ],
                            type: 'radioOptionsInput',
                            label: 'Does your project have a sponsor?',
                        },
                        validations: [
                            {
                                message: 'Please select an option',
                                type: 'isLength',
                                params: [1],
                            },
                        ],
                        lockedQuestion: 1,
                        defaultQuestion: 1,
                        questionId: 'safeprojectsponsorinformationprojecthassponsor',
                    },
                ],
            },
            {
                questions: [
                    {
                        questionId: 'safeprojectdeclarationofinteresthascommercialinterest',
                        defaultQuestion: 1,
                        input: {
                            type: 'radioOptionsInput',
                            label: 'Is there a commercial interest in this project?',
                            options: [
                                {
                                    text: 'Yes',
                                    value: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safeprojectdeclarationofinteresthascommercialinterestorganisationname',
                                            question: 'Organisation name',
                                            guidance: 'Please confirm organisation name.',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                        {
                                            questionId: 'safeprojectdeclarationofinteresthascommercialinterestorganisationaddressline1',
                                            input: {
                                                type: 'textInput',
                                            },
                                            question: 'Registered address (line 1)',
                                            guidance: 'Please confirm organisation address.',
                                        },
                                        {
                                            questionId: 'safeprojectdeclarationofinteresthascommercialinterestorganisationaddressline2',
                                            question: 'Registered address (line 2)',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                        {
                                            questionId: 'safeprojectdeclarationofinteresthascommercialinterestorganisationpostcode',
                                            input: {
                                                type: 'textInput',
                                            },
                                            guidance: 'Please confirm organisation postcode.',
                                            question: 'Postcode',
                                        },
                                        {
                                            questionId: 'safeprojectdeclarationofinteresthascommercialinterestorganisationcity',
                                            input: {
                                                type: 'textInput',
                                            },
                                            question: 'City',
                                            guidance: 'Please confirm organisation city.',
                                        },
                                        {
                                            input: {
                                                type: 'textInput',
                                            },
                                            guidance: 'Please confirm organisation country.',
                                            question: 'Country',
                                            questionId: 'safeprojectdeclarationofinteresthascommercialinterestorganisationcountry',
                                        },
                                        {
                                            questionId: 'safeprojectdeclarationofinteresthascommercialinterestinterestnature',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            question: 'Describe the nature of interest',
                                        },
                                        {
                                            label: 'Public interest',
                                            questionId: 'safeprojectdeclarationofinteresthascommercialinterestconfirmpublicinterest',
                                            question: 'Public interest',
                                            input: {
                                                options: [
                                                    {
                                                        value: 'I confirm that any commercial interest is public interest related.',
                                                        text: 'I confirm that any commercial interest is public interest related.',
                                                    },
                                                ],
                                                type: 'checkboxOptionsInput',
                                            },
                                        },
                                        {
                                            questionId: 'add-safeproject-declarationofinterest',
                                            input: {
                                                class: 'btn btn-primary addButton',
                                                text: 'Add another organisation?',
                                                action: 'addRepeatableQuestions',
                                                questionIds: [
                                                    'safeprojectdeclarationofinteresthascommercialinterestorganisationname',
                                                    'safeprojectdeclarationofinteresthascommercialinterestorganisationaddressline1',
                                                    'safeprojectdeclarationofinteresthascommercialinterestorganisationaddressline2',
                                                    'safeprojectdeclarationofinteresthascommercialinterestorganisationpostcode',
                                                    'safeprojectdeclarationofinteresthascommercialinterestorganisationcity',
                                                    'safeprojectdeclarationofinteresthascommercialinterestorganisationcountry',
                                                    'safeprojectdeclarationofinteresthascommercialinterestinterestnature',
                                                    'safeprojectdeclarationofinteresthascommercialinterestconfirmpublicinterest',
                                                ],
                                                type: 'buttonInput',
                                                separatorText: 'Organisation Details',
                                            },
                                        },
                                    ],
                                },
                                {
                                    value: 'No',
                                    text: 'No',
                                },
                            ],
                            required: true,
                        },
                        validations: [
                            {
                                message: 'Please select an option',
                                type: 'isLength',
                                params: [1],
                            },
                        ],
                        lockedQuestion: 1,
                        guidance: 'Please indicate if there is any commercial aspect or dimension to the project or its outcomes.',
                        question: 'Is there a commercial interest in this project?',
                    },
                ],
                questionSetHeader: 'Declaration of interest',
                questionSetId: 'safeproject-declarationofinterest',
            },
            {
                questions: [
                    {
                        guidance:
                            'Intellectual Property is the tangible output of any intellectual activity that is new or previously undescribed. It has an owner; it can be bought, sold or licensed and must be adequately protected.  It can include inventions, industrial processes, software, data, written work, designs and images. \nAny research which could potentially lead to intellectual property rights for you or your employer should be discussed with your employer and your R&D office as early as possible in the planning of the research.',
                        question:
                            'Please indicate if the research could lead to the development of a new product/process or the generation of intellectual property.',
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                        defaultQuestion: 1,
                        questionId: 'safeprojectintellectualpropertydevelopmentnewproductprocess',
                    },
                ],
                questionSetHeader: 'Intellectual property',
                questionSetId: 'safeproject-intellectualproperty',
            },
            {
                questions: [
                    {
                        lockedQuestion: 1,
                        validations: [
                            {
                                type: 'isLength',
                                params: [1],
                                message: 'Please enter a value',
                            },
                        ],
                        input: {
                            required: true,
                            type: 'textareaInput',
                        },
                        question:
                            'Please indicate the data necessary to conduct the study, the data fields required and the justifications for each field.',
                        guidance:
                            'Please list and make clear the details on the information from each dataset that you would like to have access to.\n\nYou can either upload a file including all data fields, variables and justification for each field/variable or use the free text box. Documents can be uploaded in the Additional Files section of this form.\n\nData requested can only be provided for processing data for specific purpose so you should ensure you explain why each dataset is required to meet your project objectives. Please ensure you have discussed your requirements with the data custodian.\n\nPlease justify why you need each requested dataset to ensure that the appropriateness, proportionality and risk associated can be carefully considered.\nIf you are requesting identifiable or potentially identifiable variables, please justify why you need each variable.\n\nPlease also include year/release of the datasets you propose to access.',
                        questionId: 'safedatadatafieldsdatarequiredjustification',
                        defaultQuestion: 1,
                    },
                    {
                        input: {
                            type: 'checkboxOptionsInput',
                            label: 'Data fields indicated via file upload',
                            options: [
                                {
                                    text: 'I confirm that I have enclosed a list of datasets, fields and variables required for the study as well as justification for each field.',
                                    value: 'I confirm that I have enclosed a list of datasets, fields and variables required for the study as well as justification for each field.',
                                },
                            ],
                        },
                        lockedQuestion: 0,
                        guidance: 'Documents can be uploaded in the Additional Files section of this form.',
                        question: 'Data fields indicated via file upload',
                        questionId: 'safedatadatafieldsfileuploaded',
                        defaultQuestion: 1,
                    },
                    {
                        question: 'Inclusion and exclusion criteria (including date parameters)',
                        guidance:
                            'A description of precisely the criteria which define the patients to be included and to be excluded from the data extract you are requesting should be provided. \n\nThis should include precise date parameters for the start and end of the range requested (dd/mm/yy) and explain which dated project field will be used to define the requested cohort (e.g. date of admission or date of operation).\n',
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                        defaultQuestion: 1,
                        questionId: 'safedatadatafieldsinclusionexclusioncriteria',
                    },
                    {
                        questionId: 'safedatadatafieldsdatarefreshrequired',
                        defaultQuestion: 1,
                        input: {
                            options: [
                                {
                                    value: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safedatadatafieldsdatarefreshrequiredperiodicity',
                                            question: 'How often will the data refreshes be needed?',
                                            guidance: 'Please indicate how often data refreshes will be needed. ',
                                            input: {
                                                type: 'radioOptionsInput',
                                                label: 'How often will the data refreshes be needed?',
                                                options: [
                                                    {
                                                        text: 'Every month',
                                                        value: 'Every month',
                                                    },
                                                    {
                                                        value: 'Every 3 months',
                                                        text: 'Every 3 months',
                                                    },
                                                    {
                                                        value: 'Every 6 months',
                                                        text: 'Every 6 months',
                                                    },
                                                    {
                                                        text: 'Every 12 months',
                                                        value: 'Every 12 months',
                                                    },
                                                    {
                                                        text: 'Other',
                                                        value: 'Other',
                                                        conditionalQuestions: [
                                                            {
                                                                input: {
                                                                    type: 'textInput',
                                                                },
                                                                question: 'If other, please specify',
                                                                questionId: 'safedatadatafieldsdatarefreshrequiredperiodicityotherdetails',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                    text: 'Yes',
                                },
                                {
                                    text: 'No',
                                    value: 'No',
                                },
                            ],
                            type: 'radioOptionsInput',
                            label: 'Will you require periodic refreshes of the data?',
                        },
                        lockedQuestion: 0,
                        question: 'Will you require periodic refreshes of the data?',
                        guidance: 'Please indicate if data refreshers will be required.',
                    },
                    {
                        questionId: 'safedatadatafieldsgeographicalcoverage',
                        defaultQuestion: 1,
                        lockedQuestion: 0,
                        input: {
                            type: 'checkboxOptionsInput',
                            label: 'Geographical coverage of datasets requested',
                            options: [
                                {
                                    text: 'England',
                                    value: 'England',
                                },
                                {
                                    value: 'Wales',
                                    text: 'Wales',
                                },
                                {
                                    text: 'Scotland',
                                    value: 'Scotland',
                                },
                                {
                                    value: 'Northern Ireland',
                                    text: 'Northern Ireland',
                                },
                                {
                                    value: 'Other',
                                    conditionalQuestions: [
                                        {
                                            question: 'If other, please specify',
                                            input: {
                                                type: 'textInput',
                                            },
                                            questionId: 'safedatadatafieldsgeographicalcoverageotherdetails',
                                        },
                                    ],
                                    text: 'Other',
                                },
                            ],
                        },
                        guidance: 'Please indicate geographical coverage of the datasets requested. ',
                        question: 'Geographical coverage of datasets requested',
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'safedatadatafieldsindividualidentifiers',
                        guidance:
                            'Please indicate whether you will be requiring data that contains individual identifiers.\n\nPersonal data means any information relating to an identified or identifiable natural person (‘data subject’); an identifiable natural person is one who can be identified, directly or indirectly, in particular by reference to an identifier such as a name, an identification number, location data, an online identifier or to one or more factors specific to the physical, physiological, genetic, mental, economic, cultural or social identity of that natural person. ',
                        question: 'Are you requesting data that contains individual identifiers?',
                        lockedQuestion: 0,
                        input: {
                            options: [
                                {
                                    text: 'Not applicable',
                                    value: 'Not applicable',
                                },
                                {
                                    text: 'Yes',
                                    value: 'Yes',
                                },
                                {
                                    value: 'No',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safedatadatafieldsindividualidentifiersanonymousdata',
                                            input: {
                                                options: [
                                                    {
                                                        value: 'Not applicable',
                                                        text: 'Not applicable',
                                                    },
                                                    {
                                                        value: 'Yes',
                                                        text: 'Yes',
                                                    },
                                                    {
                                                        text: 'No',
                                                        value: 'No',
                                                    },
                                                ],
                                                type: 'radioOptionsInput',
                                                label: 'Are you requesting anonymous data?',
                                            },
                                            question: 'Are you requesting anonymous data?',
                                            guidance:
                                                'Please indicate whether you will be requiring anonymous data.\n\nAnonymised data is information which does not relate to an identified or identifiable natural person or to personal data rendered anonymous in such a manner that the data subject is not or no longer identifiable. \nIndividual patient level data may also very occasionally be categorised as anonymous. \nJust removing personal identifiers does not constitute anonymisation, as there may still be combinations of variables that might allow anyone to directly or indirectly identify individuals. True anonymisation is irreversible and hard to achieve.\n',
                                        },
                                        {
                                            questionId: 'safedatadatafieldsindividualidentifiersdeidentifieddata',
                                            question: 'Are you requesting de-identified data?',
                                            guidance:
                                                "Please indicate whether you will be requiring de-identified data. \n\nNote that pseudonymised data does not change the status of the data as personal data. Personal data which have undergone pseudonymisation, which could be attributed to a natural person by the use of additional information should be considered to be information on an identifiable natural person.\n\nIf any pseudonymous data or data being described by the applicant as 'anonymous' will be shared with third parties, the fields to be shared should be clarified.\n",
                                            input: {
                                                options: [
                                                    {
                                                        value: 'Not applicable',
                                                        text: 'Not applicable',
                                                    },
                                                    {
                                                        text: 'Yes',
                                                        value: 'Yes',
                                                    },
                                                    {
                                                        text: 'No',
                                                        value: 'No',
                                                    },
                                                ],
                                                type: 'radioOptionsInput',
                                                label: 'Are you requesting de-identified data?',
                                            },
                                        },
                                    ],
                                    text: 'No',
                                },
                            ],
                            label: 'Are you requesting data that contains individual identifiers?',
                            type: 'radioOptionsInput',
                        },
                    },
                    {
                        questionId: 'safedatadatafieldsaggregatedorrecordlevel',
                        defaultQuestion: 1,
                        input: {
                            type: 'radioOptionsInput',
                            label: 'Do you require aggregated or record level data?',
                            options: [
                                {
                                    value: 'Yes',
                                    text: 'Yes',
                                },
                                {
                                    value: 'No',
                                    text: 'No',
                                },
                            ],
                        },
                        lockedQuestion: 0,
                        question: 'Do you require aggregated or record level data?',
                        guidance:
                            "Record level data typically relates to a single individual. There may be one or many records per individual. Such data would usually carry a risk of re-identification, and use of such data would be subject to strict controls.\n\nAggregate data would typically be 'counts' of an event - for example how many people had a particular operation over a specific time period. Aggregate data is not always anonymous data, and therefore may also be subject to specific controls.\n",
                    },
                ],
                questionSetId: 'safedata-datafields',
                questionSetHeader: 'Data fields',
            },
            {
                questions: [
                    {
                        defaultQuestion: 1,
                        questionId: 'safedatadatafieldsdatacustodianconductanalysis',
                        guidance:
                            'Please indicate if you wish to commission the data custodian to conduct the analysis for you, minimising your exposure to the data.',
                        question:
                            'Do you wish to commission the data custodian to conduct the analysis for you, minimising your exposure to the data?',
                        input: {
                            label: 'Do you wish to commission the data custodian to conduct the analysis for you, minimising your exposure to the data?',
                            type: 'radioOptionsInput',
                            options: [
                                {
                                    text: 'Yes',
                                    value: 'Yes',
                                },
                                {
                                    value: 'No',
                                    text: 'No',
                                },
                            ],
                        },
                        lockedQuestion: 0,
                    },
                ],
                questionSetId: 'safedata-analysis',
                questionSetHeader: 'Analysis',
            },
            {
                questionSetHeader: 'Samples required',
                questionSetId: 'safedata-samplesrequired',
                questions: [
                    {
                        question: 'Do you wish to request access to any additional resources (samples or tissues)?',
                        input: {
                            type: 'radioOptionsInput',
                            label: 'Do you wish to request access to any additional resources (samples or tissues)?',
                            options: [
                                {
                                    value: 'Yes',
                                    text: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            question:
                                                'Specify all datasets, organisations which will perform the linkage and how the linkage will take place.',
                                            guidance:
                                                'Please specify your requirements for the additional resources you are requesting.\n\nSamples from healthy or diseased donors? If diseased, please specify which disease.\n\nWhat material types do you require?\ne.g. whole blood, plasma, tissue, etc.\n\nWhat do you intend to do with the sample?\ne.g. cell culture, genetic analysis, histology etc.\n(This will inform which storage conditions you require.)\n\nHow many samples do you need over what timeframe?\n\nHow many samples can you receive at one time?\n\nWhat sized sample or volume do you require?\n\nWhat are your exclusion criteria?\ne.g. no HIV, no cancer, above 18, male, female\n\nWhat associated clinical information do you need?',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            questionId: 'safedatadatafieldsadditionalresourcesdetails',
                                        },
                                    ],
                                },
                                {
                                    text: 'No',
                                    value: 'No',
                                },
                            ],
                        },
                        lockedQuestion: 0,
                        defaultQuestion: 1,
                        questionId: 'safedatadatafieldsadditionalresources',
                    },
                ],
            },
            {
                questionSetId: 'safedata-otherdatasetsintentiontolinkdata',
                questionSetHeader: 'Other datasets - Intention to link data',
                questions: [
                    {
                        input: {
                            type: 'radioOptionsInput',
                            label: 'Do you intend for the datasets requested to be linked with any additional datasets, other than the datasets listed in this application?',
                            required: true,
                            options: [
                                {
                                    text: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            question:
                                                'Specify all datasets, organisations which will perform the linkage and how the linkage will take place.',
                                            guidance: 'Please include details of the organisations undertaking the process of linkage.',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            questionId: 'safedataotherdatasetslinkadditionaldatasetslinkagedetails',
                                        },
                                    ],
                                    value: 'Yes',
                                },
                                {
                                    value: 'No',
                                    text: 'No',
                                },
                            ],
                        },
                        validations: [
                            {
                                message: 'Please select an option',
                                type: 'isLength',
                                params: [1],
                            },
                        ],
                        lockedQuestion: 1,
                        question:
                            'Do you intend for the datasets requested to be linked with any additional datasets, other than the datasets listed in this application?',
                        guidance:
                            'Please specify if you intend for the datasets to be linked with any additional datasets. Please also provide relevant information on the organisations undertaking linkages and provide a data flow diagram where applicable. Documents can be uploaded in the Additional Files section of this form.',
                        questionId: 'safedataotherdatasetslinkadditionaldatasets',
                        defaultQuestion: 1,
                    },
                    {
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 1,
                        question: 'Please summarise the risks/mitigations considered.',
                        questionId: 'safedataotherdatasetsrisksmitigations',
                        defaultQuestion: 1,
                    },
                ],
            },
            {
                questions: [
                    {
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                        guidance: 'Please specify what type of statistical analyses you are planning.',
                        question: 'What forms of statistical analysis are planned?',
                        questionId: 'safedatastatisticalanalysisformsplanned',
                        defaultQuestion: 0,
                    },
                    {
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                        guidance: 'Please explain how you intend to present this in the final output.',
                        question: 'How is it intended that this will be presented in the final output?',
                        questionId: 'safedatastatisticalanalysisfinaloutput',
                        defaultQuestion: 0,
                    },
                    {
                        lockedQuestion: 0,
                        input: {
                            type: 'textareaInput',
                        },
                        guidance: 'For example, an age range of 90-100 in a rare disease may result in a cell value of 1.',
                        question:
                            'What is the smallest cell value that is likely to be generated by this analysis and how will this be managed to avoid disclosure?',
                        questionId: 'safedatastatisticalanalysissmallestcellvalue',
                        defaultQuestion: 0,
                    },
                    {
                        questionId: 'safedatastatisticalanalysisconfounding',
                        defaultQuestion: 0,
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                        question: 'What are your plans for addressing confounding?',
                    },
                    {
                        questionId: 'safedatastatisticalanalysismissingdata',
                        defaultQuestion: 0,
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                        question: 'What are your plans for addressing missing data?',
                    },
                    {
                        question: 'Please present your feasibility calculation',
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                        defaultQuestion: 0,
                        questionId: 'safedatastatisticalanalysisfeasibility',
                    },
                    {
                        questionId: 'safedatastatisticalanalysisstatisticalpower',
                        defaultQuestion: 0,
                        lockedQuestion: 0,
                        input: {
                            label: 'Has the size of the study been informed by a formal statistical power calculation?',
                            type: 'radioOptionsInput',
                            options: [
                                {
                                    text: 'Yes',
                                    value: 'Yes',
                                },
                                {
                                    value: 'No',
                                    text: 'No',
                                },
                            ],
                        },
                        question: 'Has the size of the study been informed by a formal statistical power calculation?',
                    },
                    {
                        questionId: 'safedatastatisticalanalysisstatistician',
                        defaultQuestion: 0,
                        input: {
                            label: 'Has a statistician given an opinion about the statistical aspects of the research?',
                            type: 'radioOptionsInput',
                            options: [
                                {
                                    value: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safedatastatisticalanalysisstatisticianyes',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            question: 'If yes, please give a brief summary of advice offered',
                                            guidance:
                                                'If available, please attach a copy of the comments as an additional file. Documents can be uploaded in the Additional Files section of this form.',
                                        },
                                    ],
                                    text: 'Yes',
                                },
                                {
                                    value: 'No',
                                    text: 'No',
                                },
                            ],
                        },
                        lockedQuestion: 0,
                        question: 'Has a statistician given an opinion about the statistical aspects of the research?',
                    },
                    {
                        questionId: 'safedatastatisticalanalysisalgorithmtraining',
                        defaultQuestion: 0,
                        input: {
                            options: [
                                {
                                    value: 'Yes',
                                    text: 'Yes',
                                },
                                {
                                    text: 'No',
                                    value: 'No',
                                },
                            ],
                            label: 'Will the data requested be used for algorithm generation and training?',
                            type: 'radioOptionsInput',
                        },
                        lockedQuestion: 0,
                        question: 'Will the data requested be used for algorithm generation and training?',
                        guidance: 'These questions are to help us understand the different uses to which the data is being put to.',
                    },
                    {
                        guidance: 'These questions are to help us understand the different uses to which the data is being put to.',
                        question: 'Will the data requested be used for internal validation?',
                        lockedQuestion: 0,
                        input: {
                            type: 'radioOptionsInput',
                            label: 'Will the data requested be used for internal validation?',
                            options: [
                                {
                                    text: 'Yes',
                                    value: 'Yes',
                                },
                                {
                                    text: 'No',
                                    value: 'No',
                                },
                            ],
                        },
                        defaultQuestion: 0,
                        questionId: 'safedatastatisticalanalysisinternalvalidation',
                    },
                    {
                        guidance: 'These questions are to help us understand the different uses to which the data is being put to.',
                        question: 'Will the data requested be used for external validation?',
                        lockedQuestion: 0,
                        input: {
                            type: 'radioOptionsInput',
                            label: 'Will the data requested be used for external validation?',
                            options: [
                                {
                                    text: 'Yes',
                                    value: 'Yes',
                                },
                                {
                                    text: 'No',
                                    value: 'No',
                                },
                                {
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safedatastatisticalanalysisexternalvalidationotherdetails',
                                            question: 'If other, please specify',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                        },
                                    ],
                                    value: 'Other',
                                    text: 'Other',
                                },
                            ],
                        },
                        defaultQuestion: 0,
                        questionId: 'safedatastatisticalanalysisexternalvalidation',
                    },
                    {
                        input: {
                            type: 'radioOptionsInput',
                            label: 'Will the data be subject to any machine learning (ML) techniques?',
                            options: [
                                {
                                    value: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            input: {
                                                type: 'textareaInput',
                                            },
                                            question: 'If yes, please specify the type of machine learning technique',
                                            questionId: 'safedatastatisticalanalysismachinelearningtechniquesdetails',
                                        },
                                    ],
                                    text: 'Yes',
                                },
                                {
                                    value: 'No',
                                    text: 'No',
                                },
                            ],
                        },
                        lockedQuestion: 0,
                        question: 'Will the data be subject to any machine learning (ML) techniques?',
                        guidance: 'These questions are to help us understand the different uses to which the data is being put to.',
                        questionId: 'safedatastatisticalanalysismachinelearningtechniques',
                        defaultQuestion: 0,
                    },
                ],
                questionSetHeader: 'Statistical analysis',
                questionSetId: 'safedata-statisticalanalysis',
            },
            {
                questionSetHeader: 'Lawful basis',
                questionSetId: 'safedata-lawfulbasis',
                questions: [
                    {
                        questionId: 'safedatalawfulbasisgdprarticle6basis',
                        defaultQuestion: 1,
                        lockedQuestion: 0,
                        input: {
                            options: [
                                {
                                    text: 'Not applicable',
                                    value: 'Not applicable',
                                },
                                {
                                    value: '(a) the data subject has given consent to the processing of his or her personal data for one or more specific purposes;',
                                    text: '(a) the data subject has given consent to the processing of his or her personal data for one or more specific purposes;',
                                },
                                {
                                    text: '(b) processing is necessary for the performance of a contract to which the data subject is party or in order to take steps at the request of the data subject prior to entering into a contract;',
                                    value: '(b) processing is necessary for the performance of a contract to which the data subject is party or in order to take steps at the request of the data subject prior to entering into a contract;',
                                },
                                {
                                    value: '(c) processing is necessary for compliance with a legal obligation to which the controller is subject;',
                                    text: '(c) processing is necessary for compliance with a legal obligation to which the controller is subject;',
                                },
                                {
                                    text: '(d) processing is necessary in order to protect the vital interests of the data subject or of another natural person;',
                                    value: '(d) processing is necessary in order to protect the vital interests of the data subject or of another natural person;',
                                },
                                {
                                    value: '(e) processing is necessary for the performance of a task carried out in the public interest or in the exercise of official authority vested in the controller;',
                                    text: '(e) processing is necessary for the performance of a task carried out in the public interest or in the exercise of official authority vested in the controller;',
                                },
                                {
                                    value: '(f) processing is necessary for the purposes of the legitimate interests pursued by the controller or by a third party, except where such interests are overridden by the interests or fundamental rights and freedoms of the data subject which require protection of personal data, in particular where the data subject is a child.',
                                    text: '(f) processing is necessary for the purposes of the legitimate interests pursued by the controller or by a third party, except where such interests are overridden by the interests or fundamental rights and freedoms of the data subject which require protection of personal data, in particular where the data subject is a child.',
                                },
                            ],
                            label: 'Article 6 lawful basis',
                            type: 'radioOptionsInput',
                        },
                        guidance:
                            'The lawful bases for processing are set out in Article 6 of the GDPR (https://gdpr-info.eu/art-6-gdpr/). At least one legal basis must apply whenever you process personal data. Please select the appropriate Article 6 lawful basis. Processing shall be lawful only if, and to the extent, that at least one of the following applies.',
                        question: 'Article 6 lawful basis',
                    },
                    {
                        lockedQuestion: 0,
                        input: {
                            type: 'textareaInput',
                        },
                        guidance: 'Please provide justification for selected Article 6 lawful basis.',
                        question: 'Article 6 legal basis justification',
                        questionId: 'safedatalawfulbasisgdprarticle6basisjustification',
                        defaultQuestion: 1,
                    },
                    {
                        questionId: 'safedatalawfulbasisgdprarticle9conditions',
                        defaultQuestion: 1,
                        lockedQuestion: 0,
                        input: {
                            label: 'Article 9 conditions',
                            type: 'radioOptionsInput',
                            options: [
                                {
                                    value: 'Not applicable',
                                    text: 'Not applicable',
                                },
                                {
                                    text: '(a) the data subject has given explicit consent to the processing of those personal data for one or more specified purposes, except where Union or Member State law provide that the prohibition referred to in paragraph 1 may not be lifted by the data subject;',
                                    value: '(a) the data subject has given explicit consent to the processing of those personal data for one or more specified purposes, except where Union or Member State law provide that the prohibition referred to in paragraph 1 may not be lifted by the data subject;',
                                },
                                {
                                    text: '(b) processing is necessary for the purposes of carrying out the obligations and exercising specific rights of the controller or of the data subject in the field of employment and social security and social protection law in so far as it is authorised by Union or Member State law or a collective agreement pursuant to Member State law providing for appropriate safeguards for the fundamental rights and the interests of the data subject;',
                                    value: '(b) processing is necessary for the purposes of carrying out the obligations and exercising specific rights of the controller or of the data subject in the field of employment and social security and social protection law in so far as it is authorised by Union or Member State law or a collective agreement pursuant to Member State law providing for appropriate safeguards for the fundamental rights and the interests of the data subject;',
                                },
                                {
                                    text: '(c) processing is necessary to protect the vital interests of the data subject or of another natural person where the data subject is physically or legally incapable of giving consent;',
                                    value: '(c) processing is necessary to protect the vital interests of the data subject or of another natural person where the data subject is physically or legally incapable of giving consent;',
                                },
                                {
                                    value: '(d) processing is carried out in the course of its legitimate activities with appropriate safeguards by a foundation, association or any other not-for-profit body with a political, philosophical, religious or trade union aim and on condition that the processing relates solely to the members or to former members of the body or to persons who have regular contact with it in connection with its purposes and that the personal data are not disclosed outside that body without the consent of the data subjects;',
                                    text: '(d) processing is carried out in the course of its legitimate activities with appropriate safeguards by a foundation, association or any other not-for-profit body with a political, philosophical, religious or trade union aim and on condition that the processing relates solely to the members or to former members of the body or to persons who have regular contact with it in connection with its purposes and that the personal data are not disclosed outside that body without the consent of the data subjects;',
                                },
                                {
                                    value: '(e) processing relates to personal data which are manifestly made public by the data subject;',
                                    text: '(e) processing relates to personal data which are manifestly made public by the data subject;',
                                },
                                {
                                    text: '(f) processing is necessary for the establishment, exercise or defence of legal claims or whenever courts are acting in their judicial capacity;',
                                    value: '(f) processing is necessary for the establishment, exercise or defence of legal claims or whenever courts are acting in their judicial capacity;',
                                },
                                {
                                    text: '(g) processing is necessary for reasons of substantial public interest, on the basis of Union or Member State law which shall be proportionate to the aim pursued, respect the essence of the right to data protection and provide for suitable and specific measures to safeguard the fundamental rights and the interests of the data subject;',
                                    value: '(g) processing is necessary for reasons of substantial public interest, on the basis of Union or Member State law which shall be proportionate to the aim pursued, respect the essence of the right to data protection and provide for suitable and specific measures to safeguard the fundamental rights and the interests of the data subject;',
                                },
                                {
                                    text: '(h) processing is necessary for the purposes of preventive or occupational medicine, for the assessment of the working capacity of the employee, medical diagnosis, the provision of health or social care or treatment or the management of health or social care systems and services on the basis of Union or Member State law or pursuant to contract with a health professional and subject to the conditions and safeguards referred to in paragraph 3;',
                                    value: '(h) processing is necessary for the purposes of preventive or occupational medicine, for the assessment of the working capacity of the employee, medical diagnosis, the provision of health or social care or treatment or the management of health or social care systems and services on the basis of Union or Member State law or pursuant to contract with a health professional and subject to the conditions and safeguards referred to in paragraph 3;',
                                },
                                {
                                    text: '(i) processing is necessary for reasons of public interest in the area of public health, such as protecting against serious cross-border threats to health or ensuring high standards of quality and safety of health care and of medicinal products or medical devices, on the basis of Union or Member State law which provides for suitable and specific measures to safeguard the rights and freedoms of the data subject, in particular professional secrecy;',
                                    value: '(i) processing is necessary for reasons of public interest in the area of public health, such as protecting against serious cross-border threats to health or ensuring high standards of quality and safety of health care and of medicinal products or medical devices, on the basis of Union or Member State law which provides for suitable and specific measures to safeguard the rights and freedoms of the data subject, in particular professional secrecy;',
                                },
                                {
                                    value: '(j) processing is necessary for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes in accordance with Article 89(1) based on Union or Member State law which shall be proportionate to the aim pursued, respect the essence of the right to data protection and provide for suitable and specific measures to safeguard the fundamental rights and the interests of the data subject.',
                                    text: '(j) processing is necessary for archiving purposes in the public interest, scientific or historical research purposes or statistical purposes in accordance with Article 89(1) based on Union or Member State law which shall be proportionate to the aim pursued, respect the essence of the right to data protection and provide for suitable and specific measures to safeguard the fundamental rights and the interests of the data subject.',
                                },
                            ],
                        },
                        guidance:
                            "Please select appropriate Article 9 conditions. \n \nProcessing of personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, or trade union membership, and the processing of genetic data, biometric data for the purpose of uniquely identifying a natural person, data concerning health or data concerning a natural person's sex life or sexual orientation shall be prohibited. This does not apply if one of the following applies.\n",
                        question: 'Article 9 conditions',
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'safedatalawfulbasisgdprarticle9basisjustification',
                        question: 'Article 9 legal basis justification',
                        guidance: 'Please provide justification for selected Article 9 conditions.',
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                    },
                ],
            },
            {
                questionSetId: 'safedata-confidentialityavenue',
                questionSetHeader: 'Confidentiality avenue',
                questions: [
                    {
                        input: {
                            type: 'radioOptionsInput',
                            label: 'Please provide the legal basis to process confidential information',
                            options: [
                                {
                                    value: 'Not applicable',
                                    text: 'Not applicable',
                                },
                                {
                                    value: 'Informed consent',
                                    conditionalQuestions: [
                                        {
                                            question: 'Informed consent evidence',
                                            guidance:
                                                'Please ensure a copy of the consent form(s) and patient information sheet have been provided. Documents can be uploaded in the Additional Files section of this form.',
                                            input: {
                                                options: [
                                                    {
                                                        value: 'I have enclosed a blank copy of the patient consent form(s) and all related information sheets relevant to the time period in the data requested',
                                                        text: 'I have enclosed a blank copy of the patient consent form(s) and all related information sheets relevant to the time period in the data requested',
                                                    },
                                                ],
                                                type: 'checkboxOptionsInput',
                                            },
                                            questionId: 'safedataconfidentialityavenueinformedconsentevidence',
                                            label: 'Informed consent evidence',
                                        },
                                    ],
                                    text: 'Informed consent',
                                },
                                {
                                    text: 'Section 251 support',
                                    conditionalQuestions: [
                                        {
                                            label: 'Section 251 exemption evidence',
                                            questionId: 'safedataconfidentialityavenuesection251exemptionevidence',
                                            question: 'Section 251 exemption evidence',
                                            guidance:
                                                'Please ensure a copy of the Section 251 exemption has been provided. Documents can be uploaded in the Additional Files section of this form.',
                                            input: {
                                                type: 'checkboxOptionsInput',
                                                options: [
                                                    {
                                                        value: 'I have enclosed a copy of the S251 approved amendments and any renewal letters',
                                                        text: 'I have enclosed a copy of the S251 approved amendments and any renewal letters',
                                                    },
                                                ],
                                            },
                                        },
                                        {
                                            questionId: 'safedataconfidentialityavenuesection251cagreference',
                                            question: 'CAG reference',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                        {
                                            guidance:
                                                'Please indicate what the Section 251 exemption permits you to do as part of your project.',
                                            question: 'The section 251 approval enables the applicant to',
                                            input: {
                                                options: [
                                                    {
                                                        value: 'Hold/receive personal data',
                                                        text: 'Hold/receive personal data',
                                                    },
                                                    {
                                                        text: 'Transfer/access personal data',
                                                        value: 'Transfer/access personal data',
                                                    },
                                                    {
                                                        text: 'Operate on and link personal data',
                                                        value: 'Operate on and link personal data',
                                                    },
                                                    {
                                                        value: 'Other',
                                                        conditionalQuestions: [
                                                            {
                                                                question: 'If other, please specify',
                                                                input: {
                                                                    type: 'textInput',
                                                                },
                                                                questionId:
                                                                    'safedataconfidentialityavenuesection251approvaldetailsotherdetails',
                                                            },
                                                        ],
                                                        text: 'Other',
                                                    },
                                                ],
                                                type: 'checkboxOptionsInput',
                                            },
                                            label: 'The section 251 approval enables the applicant to',
                                            questionId: 'safedataconfidentialityavenuesection251approvaldetails',
                                        },
                                    ],
                                    value: 'Section 251 support',
                                },
                                {
                                    text: 'Other',
                                    value: 'Other',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safedataconfidentialityavenuelegalbasisconfidentialinformationotherdetails',
                                            input: {
                                                type: 'textInput',
                                            },
                                            question: 'If other, please specify',
                                        },
                                    ],
                                },
                            ],
                        },
                        lockedQuestion: 1,
                        question: 'Please provide the legal basis to process confidential information',
                        guidance:
                            'Please confirm if consent is in place or underway for all disclosures of confidential information, if you have Section 251 exemption, or any other legal basis that you require for the project.\n\nFor England and Wales, please specify if Section 251 exemption is currently being sought and if so, please provide a Confidentiality Advisory group reference code.\n\nIn Scotland applications are required for the consented and unconsented use of data.\n',
                        questionId: 'safedataconfidentialityavenuelegalbasisconfidentialinformation',
                        defaultQuestion: 1,
                    },
                ],
            },
            {
                questionSetHeader: 'Ethical approval',
                questions: [
                    {
                        input: {
                            options: [
                                {
                                    text: 'Yes',
                                    value: 'Yes',
                                },
                                {
                                    text: 'No',
                                    value: 'No',
                                },
                            ],
                            label: 'Do you seek for your project to be approved under the generic favourable ethical opinion of the INSIGHT Research Database (Ref: 20/WS/0087)?',
                            required: true,
                            type: 'radioOptionsInput',
                        },
                        defaultQuestion: 1,
                        questionId: 'safedataethicsapprovalinsightresearch',
                        lockedQuestion: 1,
                        question:
                            'Do you seek for your project to be approved under the generic favourable ethical opinion of the INSIGHT Research Database (Ref: 20/WS/0087)?',
                        validations: [
                            {
                                params: [1],
                                message: 'Please select an option',
                                type: 'isLength',
                            },
                        ],
                    },
                    {
                        input: {
                            options: [
                                {
                                    text: 'Yes',
                                    value: 'Yes',
                                    conditionalQuestions: [
                                        {
                                            question: 'Approval  - REC committee name',
                                            questionId: 'safedataethicsapprovalapprovalobtainedreccommitteename',
                                            guidance: 'Please provide REC or other committee details.',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                        {
                                            input: {
                                                type: 'textInput',
                                            },
                                            questionId: 'safedataethicsapprovalapprovalobtainedrecreferencenumber',
                                            question: 'Approval  - REC reference number',
                                        },
                                        {
                                            question: 'Approval  - Other committee',
                                            questionId: 'safedataethicsapprovalapprovalobtainedothercommittee',
                                            input: {
                                                type: 'textInput',
                                            },
                                        },
                                        {
                                            input: {
                                                options: [
                                                    {
                                                        text: 'I have enclosed a copy of the final REC approval letter and letters documenting any REC approved amendments',
                                                        value: 'I have enclosed a copy of the final REC approval letter and letters documenting any REC approved amendments',
                                                    },
                                                ],
                                                type: 'checkboxOptionsInput',
                                            },
                                            guidance:
                                                'Please confirm a copy of the REC referenced above has been enclosed. Documents can be uploaded in the Additional Files section of this form.',
                                            label: 'Evidence of REC approval',
                                            questionId: 'safedataethicsapprovalapprovalobtainedevidenceenclosed',
                                            question: 'Evidence of REC approval',
                                        },
                                    ],
                                },
                                {
                                    text: 'No',
                                    value: 'No',
                                    conditionalQuestions: [
                                        {
                                            input: {
                                                type: 'textInput',
                                            },
                                            guidance: 'If not, please provide details.',
                                            questionId: 'safedataethicsapprovalapprovalobtainednotobtaineddetails',
                                            question: 'If not, please provide more details',
                                        },
                                    ],
                                },
                                {
                                    value: 'Approval pending',
                                    text: 'Approval pending',
                                    conditionalQuestions: [
                                        {
                                            input: {
                                                type: 'textInput',
                                            },
                                            guidance: 'If approval is pending, please provide details.',
                                            questionId: 'safedataethicsapprovalapprovalobtainedpendingdetails',
                                            question: 'If approval is pending, please provide more details',
                                        },
                                    ],
                                },
                                {
                                    text: 'Not required',
                                    value: 'Not required',
                                    conditionalQuestions: [
                                        {
                                            input: {
                                                type: 'textInput',
                                            },
                                            guidance: 'If not, please provide details.',
                                            questionId: 'safedataethicsapprovalapprovalobtainednotrequireddetails',
                                            question: 'If not, please provide more details',
                                        },
                                    ],
                                },
                            ],
                            label: 'Has ethical approval been obtained?',
                            required: true,
                            type: 'radioOptionsInput',
                        },
                        defaultQuestion: 1,
                        questionId: 'safedataethicsapprovalapprovalobtained',
                        guidance:
                            'Please confirm if research ethics approval has been obtained. Request for research purposes must include enclose evidence of ethics approval or evidence that this is not required.',
                        lockedQuestion: 1,
                        question: 'Has ethical approval been obtained?',
                        validations: [
                            {
                                params: [1],
                                message: 'Please select an option',
                                type: 'isLength',
                            },
                        ],
                    },
                ],
                questionSetId: 'safedata-ethicalapproval',
            },
            {
                questionSetHeader: 'Storage and processing',
                questionSetId: 'safesettings-storageandprocessing',
                questions: [
                    {
                        questionId: 'safedatastorageandprocessingaccessmethod',
                        defaultQuestion: 1,
                        input: {
                            options: [
                                {
                                    text: 'Via a Trusted Research Environment',
                                    value: 'Via a Trusted Research Environment',
                                    conditionalQuestions: [
                                        {
                                            questionId: 'safedatastorageandprocessingaccessmethodtrustedresearchenvironment',
                                            question: 'In which Trusted Research Environment will the data be accessed?',
                                            input: {
                                                type: 'radioOptionsInput',
                                                label: 'In which Trusted Research Environment will the data be accessed?',
                                                options: [
                                                    {
                                                        text: 'Secure e-Research Platform (SeRP)',
                                                        value: 'Secure e-Research Platform (SeRP)',
                                                    },
                                                    {
                                                        text: 'NI Honest Broker Service (NI HBS)',
                                                        value: 'NI Honest Broker Service (NI HBS)',
                                                    },
                                                    {
                                                        value: 'Scottish National Safe Haven (SNSH)',
                                                        text: 'Scottish National Safe Haven (SNSH)',
                                                    },
                                                    {
                                                        text: 'NHS Digital',
                                                        conditionalQuestions: [
                                                            {
                                                                questionId:
                                                                    'safedatastorageandprocessingaccessmethodtrustedresearchenvironmentdspdetails',
                                                                validations: [
                                                                    {
                                                                        message: 'Please enter a value',
                                                                        type: 'isLength',
                                                                        params: [1],
                                                                    },
                                                                ],
                                                                input: {
                                                                    type: 'textInput',
                                                                    required: true,
                                                                },
                                                                question:
                                                                    'Does the applicant organisation have a DSP Toolkit? If so, please provide details including code, score and version completed.',
                                                            },
                                                        ],
                                                        value: 'NHS Digital',
                                                    },
                                                    {
                                                        text: 'SAIL Databank',
                                                        value: 'SAIL Databank',
                                                    },
                                                    {
                                                        text: 'ONS Secure Research Service (SRS)',
                                                        value: 'ONS Secure Research Service (SRS)',
                                                    },
                                                    {
                                                        text: 'Other',
                                                        value: 'Other',
                                                        conditionalQuestions: [
                                                            {
                                                                question: 'If other, please specify',
                                                                input: {
                                                                    type: 'textInput',
                                                                },
                                                                questionId:
                                                                    'safedatastorageandprocessingaccessmethodtrustedresearchenvironmentotherdetails',
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        },
                                    ],
                                },
                                {
                                    conditionalQuestions: [
                                        {
                                            input: {
                                                type: 'textInput',
                                            },
                                            question: 'Registered name of organisation',
                                            questionId: 'safedatastorageandprocessingaccessmethodphysicallocationorganisationname',
                                        },
                                        {
                                            question: 'Registered number',
                                            input: {
                                                type: 'textInput',
                                            },
                                            questionId:
                                                'safedatastorageandprocessingaccessmethodphysicallocationorganisationregisterednumber',
                                        },
                                        {
                                            input: {
                                                type: 'checkboxOptionsInput',
                                                options: [
                                                    {
                                                        value: 'Storage',
                                                        text: 'Storage',
                                                    },
                                                    {
                                                        text: 'Processing',
                                                        value: 'Processing',
                                                    },
                                                ],
                                            },
                                            question: 'Will this organisation be storing or processing the data?',
                                            questionId:
                                                'safedatastorageandprocessingaccessmethodphysicallocationorganisationstoringorprocessing',
                                            label: 'Will this organisation be storing or processing the data?',
                                        },
                                        {
                                            questionId:
                                                'safedatastorageandprocessingaccessmethodphysicallocationorganisationsecurityassurance',
                                            label: 'What type of security assurance does this organisation have in place?',
                                            input: {
                                                options: [
                                                    {
                                                        text: 'Data security and Protection Toolkit (DSP Toolkit)',
                                                        value: 'Data security and Protection Toolkit (DSP Toolkit)',
                                                        conditionalQuestions: [
                                                            {
                                                                question: 'DSP Toolkit organisation code',
                                                                guidance:
                                                                    "As a data controller, the applicant's organisation should be registered with the Information Commissioner's Office (ICO). Please provide Security and Protection Toolkit (DSP Toolkit) details.",
                                                                input: {
                                                                    type: 'textInput',
                                                                },
                                                                questionId:
                                                                    'safedatastorageandprocessingaccessmethodphysicallocationorganisationsecurityassurancedsporganisationcode',
                                                            },
                                                            {
                                                                question: 'DSP Toolkit score',
                                                                input: {
                                                                    type: 'textInput',
                                                                },
                                                                questionId:
                                                                    'safedatastorageandprocessingaccessmethodphysicallocationorganisationsecurityassurancedsptoolkitscore',
                                                            },
                                                            {
                                                                question: 'DSP Toolkit  version completed',
                                                                input: {
                                                                    type: 'textInput',
                                                                },
                                                                questionId:
                                                                    'safedatastorageandprocessingaccessmethodphysicallocationorganisationsecurityassurancedspversioncompleted',
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        text: 'ISO 27001',
                                                        value: 'ISO 27001',
                                                        conditionalQuestions: [
                                                            {
                                                                guidance:
                                                                    'Please confirm that you have enclosed a copy of your ISO 27001 certificate. Documents can be uploaded in the Additional Files section of this form.',
                                                                question: 'Evidence of ISO 27001',
                                                                input: {
                                                                    options: [
                                                                        {
                                                                            value: 'I have enclosed a copy of my certificate',
                                                                            text: 'I have enclosed a copy of my certificate',
                                                                        },
                                                                    ],
                                                                    type: 'checkboxOptionsInput',
                                                                },
                                                                label: 'Evidence of ISO 27001',
                                                                questionId:
                                                                    'safedatastorageandprocessingaccessmethodphysicallocationorganisationsecurityassuranceiso27001evidence',
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        conditionalQuestions: [
                                                            {
                                                                label: 'Evidence of SLSP',
                                                                questionId:
                                                                    'safedatastorageandprocessingaccessmethodphysicallocationorganisationsecurityassuranceslspevidence',
                                                                input: {
                                                                    type: 'checkboxOptionsInput',
                                                                    options: [
                                                                        {
                                                                            value: 'I have enclosed a completed system level security policy for ODR review',
                                                                            text: 'I have enclosed a completed system level security policy for ODR review',
                                                                        },
                                                                    ],
                                                                },
                                                                question: 'Evidence of SLSP',
                                                            },
                                                        ],
                                                        value: 'SLSP',
                                                        text: 'SLSP',
                                                    },
                                                    {
                                                        text: 'Other',
                                                        value: 'Other',
                                                        conditionalQuestions: [
                                                            {
                                                                questionId:
                                                                    'safedatastorageandprocessingaccessmethodphysicallocationorganisationsecurityassuranceotherdetails',
                                                                question: 'If other, please specify',
                                                                input: {
                                                                    type: 'textInput',
                                                                },
                                                            },
                                                        ],
                                                        guidance:
                                                            "If you have selected 'Other', please specify the type of security assurance the organisation has put in place.",
                                                    },
                                                ],
                                                type: 'checkboxOptionsInput',
                                            },
                                            guidance:
                                                'Adequate security assurance must be provided for all processing locations. Each organisation processing data that is not fully anonymous as part of this project must demonstrate that they have appropriate security arrangements are in place. Please confirm whether the applicant organisation has a compliant Data Security and Protection Toolkit.',
                                            question: 'What type of security assurance does this organisation have in place?',
                                        },
                                        {
                                            questionId: 'safedatastorageandprocessingaccessmethodphysicallocationreasonfornotchoosingtre',
                                            question:
                                                'If you do not wish to access via a Trusted Research Environment, please provide the reason.',
                                            input: {
                                                type: 'textareaInput',
                                            },
                                        },
                                        {
                                            questionId: 'add-safesettings-storageandprocessing',
                                            input: {
                                                type: 'buttonInput',
                                                questionIds: [
                                                    'safedatastorageandprocessingaccessmethodphysicallocationorganisationname',
                                                    'safedatastorageandprocessingaccessmethodphysicallocationorganisationregisterednumber',
                                                    'safedatastorageandprocessingaccessmethodphysicallocationorganisationstoringorprocessing',
                                                    'safedatastorageandprocessingaccessmethodphysicallocationorganisationsecurityassurance',
                                                    'safedatastorageandprocessingaccessmethodphysicallocationreasonfornotchoosingtre',
                                                ],
                                                separatorText: 'Organisation Details',
                                                text: 'Add another organisation?',
                                                action: 'addRepeatableQuestions',
                                                class: 'btn btn-primary addButton',
                                            },
                                        },
                                    ],
                                    value: 'Via transfer to a physical location (Provide details of the processing/storage organisations below)',
                                    text: 'Via transfer to a physical location (Provide details of the processing/storage organisations below)',
                                },
                            ],
                            type: 'checkboxOptionsInput',
                            label: 'How will the data be accessed?',
                        },
                        lockedQuestion: 1,
                        question: 'How will the data be accessed?',
                        guidance: 'Please specify if the data will be accessed within a Trusted Research Environment. ',
                    },
                ],
            },
            {
                questionSetId: 'safesettings-dataflow',
                questionSetHeader: 'Dataflow',
                questions: [
                    {
                        validations: [
                            {
                                params: [1],
                                type: 'isLength',
                                message: 'Please select an option',
                            },
                            {
                                message: 'Please enter a value',
                                params: [1],
                                type: 'isLength',
                            },
                            {
                                message: 'Please enter a value',
                                params: [1],
                                type: 'isLength',
                            },
                        ],
                        input: {
                            type: 'radioOptionsInput',
                            label: 'Will the data be transferred outside of the United Kingdom?',
                            options: [
                                {
                                    conditionalQuestions: [
                                        {
                                            validations: [
                                                {
                                                    type: 'isLength',
                                                    params: [1],
                                                    message: 'Please enter a value',
                                                },
                                            ],
                                            input: {
                                                required: true,
                                                type: 'textareaInput',
                                            },
                                            question: 'If yes, please provide more details',
                                            questionId: 'safedatadataflowdatatransferedoutsideukdetails',
                                        },
                                    ],
                                    value: 'Yes',
                                    text: 'Yes',
                                },
                                {
                                    text: 'No',
                                    value: 'No',
                                },
                            ],
                            required: true,
                        },
                        lockedQuestion: 1,
                        question: 'Will the data be transferred outside of the United Kingdom?',
                        questionId: 'safedatadataflowdatatransferedoutsideuk',
                        defaultQuestion: 1,
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'safedatadataflowregionsdataprocessed',
                        question: 'Please specify the regions where data will be processed.',
                        guidance:
                            'Please indicate if data will be transferred outside of the European Economic Area, it must be stated where to and details given of how that will be in compliance with the Data Protection Act 2018.\n\n If data are to be stored or processed outside of England/Wales, it may be that you will need to provide further assurance to support your application\n',
                        lockedQuestion: 0,
                        input: {
                            type: 'checkboxOptionsInput',
                            label: 'Please specify the regions where data will be processed.',
                            options: [
                                {
                                    value: 'England/Wales',
                                    text: 'England/Wales',
                                },
                                {
                                    value: 'United Kingdom',
                                    text: 'United Kingdom',
                                },
                                {
                                    value: 'European Economic Area',
                                    text: 'European Economic Area',
                                },
                                {
                                    text: 'Other',
                                    value: 'Other',
                                },
                            ],
                        },
                    },
                    {
                        questionId: 'safedatadataflowdetailedinformation',
                        defaultQuestion: 1,
                        lockedQuestion: 0,
                        input: {
                            type: 'textareaInput',
                        },
                        question: 'Please provide detailed information on data flows',
                    },
                    {
                        lockedQuestion: 0,
                        input: {
                            type: 'checkboxOptionsInput',
                            label: 'Please include a data flow diagram for the requested data and any additional datasets intended to be linked.',
                            options: [
                                {
                                    text: 'I have enclosed a copy of the dataflow',
                                    value: 'I have enclosed a copy of the dataflow',
                                },
                            ],
                        },
                        question:
                            'Please include a data flow diagram for the requested data and any additional datasets intended to be linked.',
                        guidance:
                            'A data flow diagram is helpful in showing planned data flows of how data will move through the project, whether the data are identifiable or pseudonymised, who has access to, who is responsible for the data at any point, the permissions/consent in place and how it will be kept secure at every stage.\n \n The data flow should describe which organisation (if more than one) will be receiving the data and in what form (anonymised/limited access de-identified/personal). Your data flow should include:\n \n* All locations where the data will be housed/stored\n \n* All transfers of data that will take place between organisations (and premises if an organisation has more than one remises where the data will be housed/stored)\n \n* The format of the data as part of each transfer (anonymised/limited access de-identified/personal)\n \n* If applicable, where the data will undergo any linkages to other data sets\n\n Please attach your data flow diagram to this application as an additional file.  Please display only the data requested and any linked datasets, and not the entire project data flow. Documents can be uploaded in the Additional Files section of this form.\n',
                        questionId: 'safedatadataflowdiagramenclosed',
                        defaultQuestion: 1,
                    },
                ],
            },
            {
                questionSetHeader: 'Outputs dissemination plans',
                questionSetId: 'safeoutputs-outputsdisseminationplans',
                questions: [
                    {
                        defaultQuestion: 1,
                        questionId: 'safeoutputsoutputsdisseminationplansproposalfindings',
                        question: 'How will proposal findings be disseminated, to what audience and in what format?',
                        lockedQuestion: 1,
                        input: {
                            type: 'textareaInput',
                            required: true,
                        },
                        validations: [
                            {
                                type: 'isLength',
                                params: [1],
                                message: 'Please enter a value',
                            },
                        ],
                    },
                    {
                        question: 'Please include any milestones for outputs dissemination.',
                        input: {
                            type: 'textareaInput',
                            required: true,
                        },
                        validations: [
                            {
                                type: 'isLength',
                                params: [1],
                                message: 'Please enter a value',
                            },
                        ],
                        lockedQuestion: 1,
                        defaultQuestion: 1,
                        questionId: 'safeoutputsoutputsdisseminationplansmilestones',
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'safeoutputsoutputsdisseminationplansdisclosurecontrolpolicy',
                        question:
                            'What steps will be taken to ensure that individuals cannot be identified? Please describe what disclosure control policy will be applied.',
                        lockedQuestion: 1,
                        validations: [
                            {
                                type: 'isLength',
                                params: [1],
                                message: 'Please enter a value',
                            },
                        ],
                        input: {
                            required: true,
                            type: 'textareaInput',
                        },
                    },
                    {
                        questionId: 'safeoutputsoutputsdisseminationplansoutputmanipulation',
                        defaultQuestion: 1,
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                        question:
                            'Could the outputs of the use of this data be manipulated to serve purposes that are not in the public interest?',
                        guidance:
                            'A data use purpose cannot be beneficial where the harm which would result from its output outweighs the public benefit.\n\nThe benefit aspect requires that the purpose must be beneficial and any risks that result from the purpose must not outweigh any benefits. The public aspect requires that the purpose should benefit the public, or a sufficient section of the public, and any private or commercial benefit should be proportionately balanced with the benefits to the public.  Any private benefit should be incidental to the public benefit.  Please indicate if outputs of the use of this data could serve for commercial interests or other purposes that are not in the public interest.\n\nPlease note that solely commercial benefits will not satisfy the public aspect of the public benefit requirement.\n\n---\n\n\n**This guidance is aligned with:  **  \n\n\n![Test image](https://storage.googleapis.com/hdruk-gateway_non-prod-cms/web-assets/NDG-logo-small.png)',
                    },
                ],
            },
            {
                questionSetId: 'safeoutputs-retention',
                questionSetHeader: 'Retention',
                questions: [
                    {
                        question: 'Please state the date until which you will retain the data',
                        guidance: 'Please state how long you intend to retain the data relating to your proposal.',
                        lockedQuestion: 0,
                        validations: [
                            {
                                type: 'isLength',
                                params: [1],
                                message: 'Please enter a value',
                            },
                        ],
                        input: {
                            required: true,
                            type: 'datePickerCustom',
                        },
                        defaultQuestion: 1,
                        questionId: 'safeoutputs-dataretention-retaindatadate',
                    },
                    {
                        question: 'Please indicate the reason for this date',
                        lockedQuestion: 0,
                        input: {
                            type: 'textareaInput',
                        },
                        defaultQuestion: 1,
                        questionId: 'safeoutputsdataretentionretaindatadatereason',
                    },
                    {
                        lockedQuestion: 0,
                        input: {
                            type: 'textareaInput',
                        },
                        question:
                            'Please provide details of any permissions that will need to apply for an extension during this period in order to retain a legal basis to hold the data (e.g. section 251)',
                        questionId: 'safeoutputsdataretentionretaindataextensionpermissions',
                        defaultQuestion: 1,
                    },
                    {
                        question:
                            'Please confirm you will only use the data provided for the purpose specified in the Data Sharing Agreement',
                        input: {
                            options: [
                                {
                                    value: 'I confirm',
                                    text: 'I confirm',
                                },
                            ],
                            label: 'Please confirm you will only use the data provided for the purpose specified in the Data Sharing Agreement',
                            type: 'checkboxOptionsInput',
                        },
                        lockedQuestion: 0,
                        defaultQuestion: 1,
                        questionId: 'safeoutputsdataretentionconfirmpurpose',
                    },
                ],
            },
            {
                questionSetHeader: 'Archiving',
                questionSetId: 'safeoutputs-archiving',
                questions: [
                    {
                        guidance:
                            'Please provide details of how the data/files will be disposed of at the end of the period specified above. You might refer to any relevant disposal or destruction policies held by your organisation, by summarising the relevant section from the policy or including a URL and indicating which section is relevant.',
                        question: 'What method of destruction will be used when this period has expired?',
                        lockedQuestion: 0,
                        validations: [
                            {
                                message: 'Please enter a value',
                                params: [1],
                                type: 'isLength',
                            },
                        ],
                        input: {
                            required: true,
                            type: 'textareaInput',
                        },
                        defaultQuestion: 1,
                        questionId: 'safeoutputsdataretentiondestructionmethod',
                    },
                    {
                        questionId: 'safeoutputsdataretentiondestructionevidence',
                        defaultQuestion: 1,
                        input: {
                            type: 'textareaInput',
                        },
                        lockedQuestion: 0,
                        guidance: 'Please confirm what evidence will be obtained following that destruction, if appropriate.',
                        question: 'What evidence will be provided that destruction has occurred and when?',
                    },
                ],
            },
            {
                questions: [
                    {
                        question: 'Full name',
                        guidance: 'Please provide the name of the person to whom we should send the invoice.',
                        input: {
                            type: 'textInput',
                            required: true,
                        },
                        validations: [
                            {
                                message: 'Please enter a value',
                                params: [1],
                                type: 'isLength',
                            },
                        ],
                        lockedQuestion: 0,
                        defaultQuestion: 1,
                        questionId: 'additionalinformationinvoicecontactfullname',
                    },
                    {
                        question: 'Job title',
                        guidance: 'Please provide the job title for the person to whom we should send the invoice.',
                        lockedQuestion: 0,
                        validations: [
                            {
                                type: 'isLength',
                                params: [1],
                                message: 'Please enter a value',
                            },
                        ],
                        input: {
                            type: 'textInput',
                            required: true,
                        },
                        defaultQuestion: 1,
                        questionId: 'additionalinformationinvoicecontactjobtitle',
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'additionalinformationinvoicecontactaddressline1',
                        guidance: 'Please provide the business address for the person to whom we should send the invoice.',
                        question: 'Registered address (line 1)',
                        input: {
                            required: true,
                            type: 'textInput',
                        },
                        validations: [
                            {
                                message: 'Please enter a value',
                                params: [1],
                                type: 'isLength',
                            },
                        ],
                        lockedQuestion: 0,
                    },
                    {
                        input: {
                            type: 'textInput',
                        },
                        lockedQuestion: 0,
                        question: 'Registered address (line 2)',
                        guidance: "Please include the organisation's business address.",
                        questionId: 'additionalinformationinvoicecontactaddressline2',
                        defaultQuestion: 1,
                    },
                    {
                        questionId: 'additionalinformationinvoicecontactcity',
                        defaultQuestion: 1,
                        lockedQuestion: 0,
                        validations: [
                            {
                                message: 'Please enter a value',
                                params: [1],
                                type: 'isLength',
                            },
                        ],
                        input: {
                            type: 'textInput',
                            required: true,
                        },
                        question: 'City',
                        guidance: 'Please specify the city where the organisation is located',
                    },
                    {
                        guidance: "Please include the organisation's business address postcode",
                        question: 'Postcode',
                        lockedQuestion: 0,
                        input: {
                            type: 'textInput',
                            required: true,
                        },
                        validations: [
                            {
                                message: 'Please enter a value',
                                params: [1],
                                type: 'isLength',
                            },
                        ],
                        defaultQuestion: 1,
                        questionId: 'additionalinformationinvoicecontactpostcode',
                    },
                    {
                        defaultQuestion: 1,
                        questionId: 'additionalinformationinvoicecontactcountry',
                        guidance: 'Please specify the country where the organisation is located.',
                        question: 'Country',
                        input: {
                            type: 'textInput',
                            required: true,
                        },
                        validations: [
                            {
                                params: [1],
                                type: 'isLength',
                                message: 'Please enter a value',
                            },
                        ],
                        lockedQuestion: 0,
                    },
                    {
                        questionId: 'additionalinformationinvoicecontacttelephone',
                        defaultQuestion: 1,
                        input: {
                            type: 'textInput',
                        },
                        lockedQuestion: 0,
                        guidance: 'Please provide the telephone number for the person to whom we should send the invoice.',
                        question: 'Telephone',
                    },
                    {
                        guidance: 'Please provide an email address for the person to whom we should send the invoice.',
                        question: 'Email',
                        lockedQuestion: 0,
                        validations: [
                            {
                                params: [1],
                                type: 'isLength',
                                message: 'Please enter a value',
                            },
                            {
                                type: 'isEmail',
                            },
                        ],
                        input: {
                            required: true,
                            type: 'textInput',
                        },
                        defaultQuestion: 1,
                        questionId: 'additionalinformationinvoicecontactemail',
                    },
                ],
                questionSetHeader: 'Invoice contact',
                questionSetId: 'additionalinformationfiles-invoicecontact',
            },
            {
                questions: [
                    {
                        defaultQuestion: 1,
                        questionId: 'additionalinformationdsasignatoryfullname',
                        guidance:
                            'Please provide the name of the person who can sign the Data Sharing Agreement on behalf of your organisation.',
                        question: 'Full name',
                        lockedQuestion: 0,
                        validations: [
                            {
                                type: 'isLength',
                                params: [1],
                                message: 'Please enter a value',
                            },
                        ],
                        input: {
                            type: 'textInput',
                            required: true,
                        },
                    },
                    {
                        guidance:
                            'Please provide the job title for the person who can sign the Data Sharing Agreement on behalf of your organisation.',
                        question: 'Job title',
                        lockedQuestion: 0,
                        input: {
                            type: 'textInput',
                            required: true,
                        },
                        validations: [
                            {
                                params: [1],
                                type: 'isLength',
                                message: 'Please enter a value',
                            },
                        ],
                        defaultQuestion: 1,
                        questionId: 'additionalinformationdsasignatoryjobtitle',
                    },
                    {
                        input: {
                            required: true,
                            type: 'textInput',
                        },
                        validations: [
                            {
                                message: 'Please enter a value',
                                type: 'isLength',
                                params: [1],
                            },
                        ],
                        lockedQuestion: 0,
                        question: 'Registered address (line 1)',
                        guidance:
                            'Please provide the business address for the person who can sign the Data Sharing Agreement on behalf of your organisation.',
                        questionId: 'additionalinformationdsasignatoryaddressline1',
                        defaultQuestion: 1,
                    },
                    {
                        questionId: 'additionalinformationdsasignatoryaddressline2',
                        defaultQuestion: 1,
                        lockedQuestion: 0,
                        input: {
                            type: 'textInput',
                        },
                        question: 'Registered address (line 2)',
                        guidance: "Please include the organisation's business address.",
                    },
                    {
                        input: {
                            required: true,
                            type: 'textInput',
                        },
                        validations: [
                            {
                                params: [1],
                                type: 'isLength',
                                message: 'Please enter a value',
                            },
                        ],
                        lockedQuestion: 0,
                        guidance: 'Please specify the city where the organisation is located',
                        question: 'City',
                        questionId: 'additionalinformationdsasignatorycity',
                        defaultQuestion: 1,
                    },
                    {
                        lockedQuestion: 0,
                        validations: [
                            {
                                params: [1],
                                type: 'isLength',
                                message: 'Please enter a value',
                            },
                        ],
                        input: {
                            required: true,
                            type: 'textInput',
                        },
                        question: 'Postcode',
                        guidance: "Please include the organisation's business address postcode",
                        questionId: 'additionalinformationdsasignatorypostcode',
                        defaultQuestion: 1,
                    },
                    {
                        questionId: 'additionalinformationdsasignatorycountry',
                        defaultQuestion: 1,
                        validations: [
                            {
                                message: 'Please enter a value',
                                type: 'isLength',
                                params: [1],
                            },
                        ],
                        input: {
                            required: true,
                            type: 'textInput',
                        },
                        lockedQuestion: 0,
                        question: 'Country',
                        guidance: 'Please specify the country where the organisation is located.',
                    },
                    {
                        question: 'Telephone',
                        guidance:
                            'Please provide the telephone number for the person who can sign the Data Sharing Agreement on behalf of your organisation.',
                        lockedQuestion: 0,
                        input: {
                            type: 'textInput',
                        },
                        defaultQuestion: 1,
                        questionId: 'additionalinformationdsasignatorytelephone',
                    },
                    {
                        validations: [
                            {
                                type: 'isLength',
                                params: [1],
                                message: 'Please enter a value',
                            },
                            {
                                type: 'isEmail',
                            },
                        ],
                        input: {
                            required: true,
                            type: 'textInput',
                        },
                        lockedQuestion: 0,
                        question: 'Email',
                        guidance:
                            'Please provide an email address for the person who can sign the Data Sharing Agreement on behalf of your organisation.',
                        questionId: 'additionalinformationdsasignatoryemail',
                        defaultQuestion: 1,
                    },
                ],
                questionSetId: 'additionalinformationfiles-datasharingagreementsignatory',
                questionSetHeader: 'Data Sharing Agreement signatory',
            },
        ],
    });

    const [active, setActive] = React.useState({});

    const handleEditLabel = React.useCallback(field => {
        setActive({
            ...field,
        });
    }, []);

    const handleOnLabelChange = React.useCallback((e, field) => {
        setActive({
            ...field,
            question: e.target.value,
        });
    }, []);

    const handleSave = React.useCallback(
        (field, questionSetIndex, fieldIndex) => {
            const updatedSchema = _.update(schema, `questionSets[${questionSetIndex}].questions[${fieldIndex}]`, () => field);

            setSchema({ ...updatedSchema });
            setActive({});
        },
        [schema]
    );

    const handleAddField = React.useCallback(
        (questionSetId, questionSetIndex) => {
            const updatedSchema = _.update(schema, `questionSets[${questionSetIndex}].questions`, questions => {
                return questions.concat({
                    validations: [
                        {
                            type: 'isLength',
                            params: [1],
                            message: 'Please enter a value',
                        },
                    ],
                    input: {
                        required: true,
                        type: 'textInput',
                    },
                    lockedQuestion: 0,
                    question: '[Label]',
                    guidance: 'Default guidance',
                    defaultQuestion: 1,
                    questionId: `${questionSetId}new`,
                });
            });

            setSchema({ ...updatedSchema });
        },
        [schema]
    );

    const handleOnSettingChange = React.useCallback((field, questionSetIndex, fieldIndex, data) => {
        handleSave(merge(field, data), questionSetIndex, fieldIndex);
    }, []);

    return (
        <LayoutBox m={4}>
            {schema.questionSets.map(({ questionSetHeader, questionSetId, questions }, questionSetIndex) => (
                <div className='main-card'>
                    <h1>
                        {questionSetHeader}{' '}
                        <IconButton
                            icon={<Icon color='purple500' svg={<PlusIcon />} />}
                            onClick={() => handleAddField(questionSetId, questionSetIndex)}
                        />
                    </h1>

                    <div>
                        {questions.map((field, fieldIndex) => {
                            const {
                                question: label,
                                input: { type, options, required },
                                lockedQuestion,
                                defaultQuestion,
                                questionId,
                            } = field;

                            return (
                                <LayoutBox
                                    display='flex'
                                    alignItems={type !== 'checkboxOptionsInput' && type !== 'radioOptionsInput' ? 'flex-end' : 'center'}
                                    mb={6}
                                    key={questionId}
                                    background='grey100'
                                    p={4}>
                                    <div>
                                        <LayoutBox display='flex' alignItems='center'>
                                            <LayoutBox width='400px' display='flex' alignItems='center' mb={1}>
                                                {active.questionId !== field.questionId && (
                                                    <Typography onClick={() => handleEditLabel(field)} mb={0}>
                                                        {label}
                                                    </Typography>
                                                )}

                                                {active.questionId === field.questionId && (
                                                    <Input
                                                        value={active.question}
                                                        variant='tertiary'
                                                        onChange={e => {
                                                            handleOnLabelChange(e, field);
                                                        }}
                                                        iconRight={
                                                            <Icon
                                                                color='purple500'
                                                                svg={<TickIcon />}
                                                                onClick={() => handleSave(active, questionSetIndex, fieldIndex)}
                                                            />
                                                        }
                                                    />
                                                )}
                                            </LayoutBox>
                                        </LayoutBox>
                                        <LayoutBox width='500px'>
                                            {type === 'textInput' && <Input disabled={!!lockedQuestion} />}
                                            {type === 'datePickerCustom' && <Input disabled={!!lockedQuestion} type='date' />}
                                            {type === 'textareaInput' && <Textarea disabled={!!lockedQuestion} />}
                                            {type === 'checkboxOptionsInput' && (
                                                <>
                                                    {options.map(({ value, text, conditionalQuestions }) => (
                                                        <LayoutBox mb={2}>
                                                            <Checkbox label={text} value={value} mb={0} />
                                                            {conditionalQuestions && conditionalQuestions.length && (
                                                                <LayoutBox mb={5} mt={3}>
                                                                    <SchemaCreatorConditionalQuestions
                                                                        questions={conditionalQuestions}
                                                                        lockedQuestion={lockedQuestion}
                                                                    />
                                                                </LayoutBox>
                                                            )}
                                                        </LayoutBox>
                                                    ))}
                                                </>
                                            )}
                                            {type === 'radioOptionsInput' && (
                                                <>
                                                    {options.map(({ value, text, conditionalQuestions }) => (
                                                        <LayoutBox mb={3}>
                                                            <LayoutBox as='label' display='flex'>
                                                                <input type='radio' value={value} />{' '}
                                                                <Typography as='span' ml={4}>
                                                                    {text}
                                                                </Typography>
                                                            </LayoutBox>
                                                            {conditionalQuestions && conditionalQuestions.length && (
                                                                <LayoutBox mb={8} mt={3}>
                                                                    <SchemaCreatorConditionalQuestions
                                                                        questions={conditionalQuestions}
                                                                        lockedQuestion={lockedQuestion}
                                                                    />
                                                                </LayoutBox>
                                                            )}
                                                        </LayoutBox>
                                                    ))}
                                                </>
                                            )}
                                        </LayoutBox>
                                    </div>
                                    <LayoutBox display='flex' alignItems='center'>
                                        <Dropdown
                                            options={inputTypes}
                                            value={type}
                                            mr={2}
                                            ml={6}
                                            width='200px'
                                            onSelect={value =>
                                                handleOnSettingChange(field, questionSetIndex, fieldIndex, {
                                                    input: {
                                                        type: value,
                                                    },
                                                })
                                            }
                                        />
                                        <SchemaCreatorCheckbox
                                            field={field}
                                            questionSetIndex={questionSetIndex}
                                            fieldIndex={fieldIndex}
                                            checked={lockedQuestion}
                                            onChange={() =>
                                                handleOnSettingChange(field, questionSetIndex, fieldIndex, {
                                                    lockedQuestion: field.lockedQuestion ? 0 : 1,
                                                })
                                            }
                                            icon={<LockIcon />}
                                        />
                                        <SchemaCreatorCheckbox
                                            field={field}
                                            questionSetIndex={questionSetIndex}
                                            fieldIndex={fieldIndex}
                                            checked={defaultQuestion}
                                            onChange={() =>
                                                handleOnSettingChange(field, questionSetIndex, fieldIndex, {
                                                    defaultQuestion: field.defaultQuestion ? 0 : 1,
                                                })
                                            }
                                            icon={<EyeIcon />}
                                        />
                                        <SchemaCreatorCheckbox
                                            field={field}
                                            questionSetIndex={questionSetIndex}
                                            fieldIndex={fieldIndex}
                                            checked={required}
                                            onChange={() =>
                                                handleOnSettingChange(field, questionSetIndex, fieldIndex, {
                                                    input: {
                                                        required: !field.input.required,
                                                    },
                                                })
                                            }
                                            icon={<TickIcon />}
                                        />
                                        {(type === 'textInput' || type === 'textareaInput') && (
                                            <LayoutBox display='flex' ml={5} width='200px'>
                                                <Input mr={5} label='Min length:' variant='tertiary' size='small' inline />
                                                <Input variant='tertiary' size='small' label='Max length:' inline />
                                            </LayoutBox>
                                        )}
                                    </LayoutBox>
                                </LayoutBox>
                            );
                        })}
                    </div>
                </div>
            ))}
        </LayoutBox>
    );
};

SchemaCreator.propTypes = {
    type: PropTypes.oneOf(['DAR']),
};

SchemaCreator.defaultProps = {
    type: 'DAR',
};

export default SchemaCreator;
