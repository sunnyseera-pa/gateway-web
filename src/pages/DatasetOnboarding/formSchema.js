// Local testing only, dev will use MongoDB.
export const formSchema = {
	classes: {
		form: 'dar-form',
		select: 'form-control',
		typeaheadCustom: 'form-control',
		datePickerCustom: 'form-control',
		multiField: 'form-control',
		question: 'form-group',
		questionWrap: 'question-wrap',
		input: 'form-control',
		button: 'btn btn-primary',
		radioListItem: 'dar__radio--item',
		radioList: 'dar__radio--list list-group',
		checkboxInput: 'checkbox list-group',
		checkboxListItem: 'dar__check--item ',
		checkboxList: 'dar__check list-group',
		controlButton: 'btn btn-primary pull-right',
		backButton: 'btn btn-default pull-left',
		errorMessage: 'alert alert-danger',
		alertWrap: 'alert-wrap',
		buttonBar: 'button-bar hidden',
		actionControl: 'action-control',
		nested: 'nested',
		toolTip: 'toolTip',
		toolTipTop: 'toolTip-top',
		toolTipText: 'toolTipText',
	},
	questionActions: [{ key: 'guidance', icon: 'far fa-question-circle', color: '#475da7', toolTip: 'Guidance', order: 1 }],

	pages: [
		{
			title: 'Summary',
			description: 'Summary metadata must be completed by Data Custodians onboarding metadata.',
			pageId: 'summary',
			active: true,
		},
		{
			title: 'Documentation',
			description:
				'Documentation can include a rich text description of the dataset or links to media such as documents, images, presentations, videos or links to data dictionaries, profiles or dashboards. Organisations are required to confirm that they have permission to distribute any additional media.',
			pageId: 'documentation',
			active: false,
		},
		{
			title: 'Coverage',
			description:
				'This information includes attributes for geographical and temporal coverage, cohort details etc. to enable a deeper understanding of the dataset content so that researchers can make decisions about the relevance of the underlying data.',
			pageId: 'coverage',
			active: false,
		},
		{
			title: 'Provenance',
			description:
				'Provenance information allows researchers to understand data within the context of its origins and can be an indicator of quality, authenticity and timeliness.',
			pageId: 'provenance',
			active: false,
		},
		{
			title: 'Accessibility',
			pageId: 'accessibility',
			description:
				'Accessibility information allows researchers to understand access, usage, limitations, formats, standards and linkage or interoperability with toolsets.',
			active: false,
		},
		{
			title: 'Enrichment and Linkage',
			pageId: 'enrichmentAndLinkage',
			description:
				'This section includes information about related datasets that may have previously been linked, as well as indicating if there is the opportunity to link to other datasets in the future. If a dataset has been enriched and/or derivations, scores and existing tools are available this section allows providers to indicate this to researchers.',
			active: false,
		},
		{
			title: 'Observations',
			pageId: 'observations',
			description:
				'- Based on schema.org observation model and used to specify series of observations about a dataset, such as number of persons, events or findings.\n - Multiple observations about the dataset may be provided and users are expected to provide at least one observation.\n- We will be supporting the schema.org observation model (https://schema.org/Observation) with default values.\n- Users will be encouraged to provide their own statistical populations as the project progresses however, initially we will encourage users to provide observations on the number of persons, number of events and number of findings included in the dataset.\n\n- **Examples**:\n\n - Statistical Population 1\n\n- type: StatisticalPopulation\n\n- populationType: Persons\n\n- numConstraints: 0',
			active: false,
		},
	],

	formPanels: [
		{
			index: 1,
			panelId: 'summary',
			pageId: 'summary',
		},
		{
			index: 2,
			panelId: 'documentation',
			pageId: 'documentation',
		},
		{
			index: 3,
			panelId: 'coverage',
			pageId: 'coverage',
		},
		{
			index: 4,
			panelId: 'origin',
			pageId: 'provenance',
		},
		{
			index: 5,
			panelId: 'temporal',
			pageId: 'provenance',
		},
		{
			index: 6,
			panelId: 'usage',
			pageId: 'accessibility',
		},
		{
			index: 7,
			panelId: 'access',
			pageId: 'accessibility',
		},
		{
			index: 8,
			panelId: 'formatAndStandards',
			pageId: 'accessibility',
		},
		{
			index: 9,
			panelId: 'enrichmentAndLinkage',
			pageId: 'enrichmentAndLinkage',
		},
		{
			index: 10,
			panelId: 'observations',
			pageId: 'observations',
		},
	],

	questionPanels: [
		{
			//"navHeader": "",
			panelId: 'summary',
			pageId: 'summary',
			//"panelHeader": "",
			questionSets: [
				{
					questionSetId: 'summary',
					index: 1,
				},
			],
			//"questionPanelHeaderText": ""
		},
		{
			panelId: 'documentation',
			pageId: 'documentation',
			questionSets: [
				{
					questionSetId: 'documentation',
					index: 1,
				},
			],
		},
		{
			panelId: 'coverage',
			pageId: 'coverage',
			questionSets: [
				{
					questionSetId: 'coverage',
					index: 1,
				},
			],
		},
		{
			panelId: 'origin',
			pageId: 'provenance',
			navHeader: 'Origin',
			questionSets: [
				{
					questionSetId: 'origin',
					index: 1,
				},
			],
		},
		{
			panelId: 'temporal',
			pageId: 'provenance',
			navHeader: 'Temporal',
			questionSets: [
				{
					questionSetId: 'temporal',
					index: 1,
				},
			],
		},
		{
			panelId: 'usage',
			pageId: 'accessibility',
			navHeader: 'Usage',
			questionSets: [
				{
					questionSetId: 'usage',
					index: 1,
				},
			],
		},
		{
			panelId: 'access',
			pageId: 'accessibility',
			navHeader: 'Access',
			questionSets: [
				{
					questionSetId: 'access',
					index: 1,
				},
			],
		},
		{
			panelId: 'formatAndStandards',
			pageId: 'accessibility',
			navHeader: 'Formats and standards',
			questionSets: [
				{
					questionSetId: 'formatAndStandards',
					index: 1,
				},
			],
		},
		{
			panelId: 'enrichmentAndLinkage',
			pageId: 'enrichmentAndLinkage',
			questionSets: [
				{
					questionSetId: 'enrichmentAndLinkage',
					index: 1,
				},
			],
		},
		{
			panelId: 'observations',
			pageId: 'observations',
			questionSets: [
				{
					questionSetId: 'observations',
					index: 1,
				},
				{
					index: 100,
					questionSetId: 'addApplicant',
				},
			],
		},
	],

	questionSets: [
		//Summary start
		{
			questionSetId: 'summary',
			questionSetHeader: 'Dataset',
			questions: [
				{
					questionId: 'summary/title',
					question: 'Title *',
					text: 'This title must be unique',
					guidance:
						'- The **title** should provide a short description of the dataset and be **unique** across the gateway.\n- If your title is not unique, please **add a prefix with your organisation name or identifier** to differentiate it from other datasets within the Gateway.\n- If the dataset is a **“linked dataset”**, please indicate this using the prefix **“Linked”**.\n- Please **avoid acronyms** wherever possible.\n- Good titles should summarise the content of the dataset and if relevant, **the region the dataset covers**.\n- **Example**: North West London COVID-19 Patient Level Situation Report',
					input: {
						type: 'textInput',
					},
					validations: [
						{
							type: 'isLength',
							params: [2, 80],
						},
					],
				},
				{
					questionId: 'summary/abstract',
					question: 'Abstract *',
					guidance:
						'- The abstract should provide a **clear and brief descriptive** signpost for researchers who are searching for data that may be relevant to their research.\n- The abstract should allow the reader to determine the **scope of the data collection and accurately summarise its content**.\n- Effective abstracts should **avoid long sentences and abbreviations** where possible.\n- Note: Researchers will view Titles and Abstracts when searching for datasets and choosing whether to explore their content further. **Abstracts should be different from the full description** for a dataset.\n- **Example**: CPRD Aurum contains primary care data contributed by General Practitioner (GP) practices using EMIS Web® including patient registration information and all care events that GPs have chosen to record as part of their usual medical practice.',
					input: {
						type: 'textareaInputCustom',
						options: [255],
					},
					validations: [
						{
							type: 'isLength',
							params: [5, 255],
						},
					],
				},
				{
					questionId: 'summary/contactPoint',
					question: 'Contact point *',
					guidance:
						'- Please provide a **valid email address** that can be used to coordinate data access requests with the publisher.\n- Organisations are expected to provide a **dedicated email address associated** with the data access request process.\n- Notes: An **employee’s email address can only be provided on a temporary basis** and if one is provided an **explicit consent must be obtained** for this purpose.\n- **Example**: <SAILDatabank@swansea.ac.uk>',
					input: {
						type: 'textInput',
					},
					validations: [
						{
							type: 'isEmail',
						},
					],
				},
				{
					questionId: 'summary/keywords',
					question: 'Keywords *',
					guidance:
						'- Please provide **relevant** and **specific keywords** that can **improve the search engine optimization** of your dataset.\n- Please **enter one keyword at a time** and click **Add New Field** to add further keywords.\n- Text from the title is automatically included in the search, there is no need to include this in the keywords.\n- Include words that researcher may include in their searches.\n- **Example**: Health Data, Research, SAIL, Primary care, GP',
					input: {
						type: 'typeaheadKeywords',
					},
					validations: [
						{
							type: 'isAtLeastOneKeywordSelected',
							message: 'At least one keyword is required',
						},
					],
				},
				{
					questionId: 'summary/doiName',
					question: 'DOI',
					guidance:
						'- Please note: This is **not** the DOI of the publication(s) associated with the dataset.\n- All HDR UK registered **datasets** should either have a **Digital Object Identifier (DOI)** or be working towards obtaining one.\n- If a DOI is available, please provide the DOI.\n- **Example**: 10.1093/ije/dyx196\n- **What happens if I do not have a DOI?**: Contact your academic organisation to find out if there is an existing relationship with a DOI provider. If that is not available, sites such as figshare offer free services to mint a DOI for your dataset. Subsequent versions of the Metadata Exchange will provide a DOI minting service.',
					input: {
						type: 'textInput',
					},
					validations: [
						{
							type: 'isValidDoiName',
							message: 'Please enter a valid DOI',
						},
					],
				},
			],
		},
		//Summary end

		//Documentation start
		{
			questionSetId: 'documentation',
			questions: [
				{
					questionId: 'properties/documentation/description',
					question: 'Description',
					guidance:
						'- An HTML account of the data that **provides context and scope** of the data, **limited to 3000 characters, and/or a resolvable URL** that describes the dataset.\n- Additional information can be recorded and included using media.',
					input: {
						type: 'textareaInputCustom',
						options: ['3,000'],
					},
					validations: [
						{
							type: 'isLength',
							params: [0, 3000],
						},
					],
				},
				{
					questionId: 'properties/documentation/associatedMedia',
					question: 'Associated media',
					guidance:
						'- Please provide any media associated with the Gateway Organisation **using a valid URL** for the content.\n- This is an opportunity to **provide additional context** that could be useful for researchers wanting to understand more about the dataset and its relevance to their research question.\n- Note: media assets can be hosted by the organisation or uploaded using the onboarding portal.\n- **Example**: This could be a **link to a PDF Document** that describes methodology or further detail about the datasets, or a graph or chart that provides further context about the dataset.',
					input: {
						type: 'multiField',
					},
					validations: [
						{
							type: 'isMultiFieldURL',
							message: 'Please enter a valid URL',
						},
					],
				},
				{
					questionId: 'properties/documentation/isPartOf',
					question: 'Is part of',
					guidance:
						'- Please complete only if the dataset is part of a group or family of datasets i.e. Hospital Episode Statistics has several constituents.\n- If your dataset is not part of a group, please enter “NOT APPLICABLE”\n- **Example**: Hospital Episodes Statistics datasets (A&E, APC, OP, AC MSDS).',
					input: {
						type: 'textInput',
					},
					validations: [
						{
							type: 'isLength',
							params: [0, 80],
						},
					],
				},
			],
		},
		//Documentation end

		//Coverage start
		{
			questionSetId: 'coverage',
			questions: [
				{
					questionId: 'properties/coverage/spatial',
					question: 'Spatial',
					guidance:
						'- The **geographical area** covered by the dataset.\n- Please enter a link to entries in a well-maintained gazetteer such as <https://www.geonames.org/>\n- However, for a limited time we will be accepting text based entries.\n- **Example**:\n- <https://www.geonames.org/11609043/north-yorkshire.html>\n- North Yorkshire',
					input: {
						type: 'textInput',
					},
					validations: [
						{
							type: 'isURLValid',
							message: 'Please enter a valid URL',
						},
					],
				},
				{
					questionId: 'properties/coverage/typicalAgeRange',
					question: 'Typical age range',
					guidance:
						'- Please indicate the age range in whole years of participants in the dataset.\n- Please provide range in the following format **‘[min age]–[max age]’ (without spaces)** where both the minimum and maximum are whole numbers (integers).\n- The maximum age limit is **150**.\n- **Example**: ‘0-18’, ‘11-90‘\n- **What if my dataset has participants of all “All Ages” or “Any Ages”?**: In that case, please enter 0-150.',
					input: {
						type: 'textInput',
					},
					validations: [
						{
							type: 'isAgeRangeValid',
							message: 'Age range must be in the format [min age]–[max age]',
						},
					],
				},
				{
					questionId: 'properties/coverage/physicalSampleAvailability',
					question: 'Physical sample availability',
					guidance:
						'- Availability of physical samples associated with the dataset.\n- If samples are available, please indicate the types of samples that are available.\n- More than one type may be provided.\n- If samples are not yet available, please provide **“AVAILABILITY TO BE CONFIRMED”**.\n- If samples are not available, then please provide **“NOT AVAILABLE”**.\n\n- **NOT AVAILABLE**: Samples associated with the dataset are not available\n- **BONE MARROW**: Bone marrow samples associated with the data are available\n- **CANCER CELL LINES**: Cancer cell line samples associated with the data are available\n- **CORE BIOPSY**: Core biopsy samples associated with the data are available\n- **CDNA/MRNA**: CDNA/MRNA samples associated with the data are available\n- **DNA**: DNA samples associated with the data are available\n- **FAECES**: Faeces samples associated with the data are available\n- **IMMORTALIZED CELL LINES**: Immortalized cell line samples associated with the data are available\n- **MICRORNA**: MicroRNA samples associated with the data are available\n- **PERIPHERAL BLOOD CELLS**: Peripheral blood cell samples associated with the data are available\n- **PLASMA**: Plasma samples associated with the data are available\n- **PM TISSUE**: PM Tissue samples associated with the data are available\n- **PRIMARY CELLS**: Primary cell samples associated with the data are available\n- **RNA**: RNA samples associated with the data are available\n- **SALIVA**: Saliva samples associated with the data are available\n- **SERUM**: Serum samples associated with the data are available\n- **SWABS**: Swab samples associated with the data are available\n- **TISSUE**: Tissue samples associated with the data are available\n - **URINE**: Urine samples associated with the data are available\n- **WHOLE BLOOD**: Whole blood samples associated with the data are available\n- **AVAILABILITY TO BE CONFIRMED**: Availability of samples is currently being confirmed\n- **OTHER**: Other types of sample available',
					input: {
						type: 'typeaheadCustom',
						options: [
							'NOT AVAILABLE',
							'BONE MARROW',
							'CANCER CELL LINES',
							'CORE BIOPSY',
							'CDNA/MRNA',
							'DNA',
							'FAECES',
							'IMMORTALIZED CELL LINES',
							'MICRORNA',
							'PERIPHERAL BLOOD CELLS',
							'PLASMA',
							'PM TISSUE',
							'PRIMARY CELLS',
							'RNA',
							'SALIVA',
							'SERUM',
							'SWABS',
							'TISSUE',
							'URINE',
							'WHOLE BLOOD',
							'AVAILABILITY TO BE CONFIRMED',
							'OTHER',
						],
					},
				},
				{
					questionId: 'properties/coverage/followup',
					question: 'Followup',
					guidance:
						'If known, please indicate the typical time span that a patient appears in the dataset (follow up period).\n\n- **0 - 6 MONTHS**: Data typically available for a patient over a 0-6 month period\n- **6 - 12 MONTHS**: Data typically available for a patient over a 6-12 month period\n- **1 - 10 YEARS**: Data typically available for a patient over a 1-10 year period\n- **> 10 YEARS**: Data typically available for a patient for over a 10 year period\n- **UNKNOWN**: Timespan is Unknown\n- **OTHER**: Data available for a patient over another time period ',
					input: {
						type: 'selectInput',
						options: [
							{
								text: '',
								value: '',
							},
							{
								text: '0 - 6 MONTHS',
								value: '0 - 6 MONTHS',
							},
							{
								text: '6 - 12 MONTHS',
								value: '6 - 12 MONTHS',
							},
							{
								text: '1 - 10 YEARS',
								value: '1 - 10 YEARS',
							},
							{
								text: '> 10 YEARS',
								value: '> 10 YEARS',
							},
							{
								text: 'UNKNOWN',
								value: 'UNKNOWN',
							},
							{
								text: 'CONTINUOUS',
								value: 'CONTINUOUS',
							},
							{
								text: 'OTHER',
								value: 'OTHER',
							},
						],
					},
				},
				{
					questionId: 'properties/coverage/pathway',
					question: 'Pathway',
					guidance:
						'- Please indicate if the dataset is representative of the patient pathway and any limitations the dataset may have with respect to pathway coverage.\n- This could include if the dataset is from a single speciality or area, a single tier of care, linked across two tiers (e.g. primary and secondary care), or an integrated care record covering the whole patient pathway.',
					input: {
						type: 'textareaInputCustom',
						options: ['3,000'],
					},
					validations: [
						{
							type: 'isLength',
							params: [0, 3000],
						},
					],
				},
			],
		},
		//Coverage end

		//Origin start
		{
			questionSetId: 'origin',
			questionSetHeader: 'Origin',
			questions: [
				{
					questionId: 'properties/provenance/origin/purpose',
					question: 'Purpose',
					text: 'Please indicate the purpose(s) that the dataset was collected. Select all that apply.',
					guidance:
						'- **STUDY**: Data collected for a specific research study.\n- **DISEASE REGISTRY**: Data collected as part of a disease registry.\n- **TRIAL**: Data collected for as part of a clinical trial.\n- **CARE**: Data collected as part of routine clinical care.\n- **AUDIT**: Data collected as part of an audit programme\n- **ADMINISTRATIVE**: Data collected for administrative and management information purposes\n- **FINANCIAL**: Data collected either for payments or for billing\n- **OTHER**: Data collected for other purpose',
					input: {
						type: 'typeaheadCustom',
						options: ['STUDY', 'DISEASE REGISTRY', 'TRIAL', 'CARE', 'AUDIT', 'ADMINISTRATIVE', 'FINANCIAL', 'STATUTORY', 'OTHER'],
					},
				},
				{
					questionId: 'properties/provenance/origin/source',
					question: 'Source',
					text: 'Please indicate the source of the data extraction.',
					guidance:
						'- **EPR**: Data Extracted from Electronic Patient Record\n- **ELECTRONIC SURVEY**: Data has been extracted from electronic surveys\n- **LIMS**: Data has been extracted from a laboratory information management system\n- **PAPER BASED**: Data has been extracted from paper forms\n- **FREETEXT NLP**: Data has been extracted from unstructured freetext using natural language processing\n- **MACHINE GENERATED**: Data has been machine generated i.e. imaging\n- **OTHER**: Data has been extracted',
					input: {
						type: 'typeaheadCustom',
						options: [
							'EPR',
							'ELECTRONIC SURVEY',
							'LIMS',
							'OTHER INFORMATION SYSTEM',
							'PAPER BASED',
							'FREETEXT NLP',
							'MACHINE GENERATED',
							'OTHER',
						],
					},
				},
				{
					questionId: 'properties/provenance/origin/collectionSituation',
					question: 'Collection situation',
					guidance:
						'- **CLINIC**: Specific clinic such as antenatal clinic\n- **PRIMARY CARE**: General Medical Practitioner Practice\n- **ACCIDENT AND EMERGENCY**: Accident emergency department\n- **OUTPATIENTS**: Outpatient care\n- **IN-PATIENTS**: In-patient care\n- **SERVICES**: Services such as drug misuse or blood transfusion\n- **COMMUNITY**: Community settings\n- **HOME**: Home setting\n- **PRIVATE**: Private Medical Clinic\n- **PHARMACY**: Pharmacy\n- **OTHER**: Other setting',
					input: {
						type: 'typeaheadCustom',
						options: [
							'CLINIC',
							'PRIMARY CARE',
							'ACCIDENT AND EMERGENCY',
							'OUTPATIENTS',
							'IN-PATIENTS',
							'SERVICES',
							'COMMUNITY',
							'HOME',
							'PRIVATE',
							'PHARMACY',
							'OTHER',
						],
					},
				},
			],
		},
		//Origin end

		//Temporal start
		{
			questionSetId: 'temporal',
			questionSetHeader: 'Temporal',
			questions: [
				{
					questionId: 'properties/provenance/temporal/accrualPeriodicity',
					question: 'Accrual periodicity *',
					guidance:
						'- Please indicate the frequency of publishing.\n- If a dataset is published regularly please choose a publishing periodicity from the constrained list and indicate the next release date.\n- When the release date becomes historical, a new release date will be calculated based on the publishing periodicity.\n- If a dataset has been published and will remain static please indicate that it is static and indicate when it was released.\n- If a dataset is released on an irregular basis or “on-demand” please indicate that it is Irregular and leave release date as null.\n- If a dataset can be published in real-time or near-real-time please indicate that it is continuous and leave release date as null.\n- Notes: see <https://www.dublincore.org/specifications/dublin-core/collection-description/frequency/>\n- **STATIC**: Dataset published once.\n- **IRREGULAR**: Dataset published at uneven intervals.\n- **CONTINUOUS**: Dataset published without interruption.\n- **BIENNIAL**: Dataset published every two years.\n- **ANNUAL**: Dataset published occurs once a year.\n- **BIANNUAL**: Dataset published twice a year.\n- **QUARTERLY**: Dataset published every three months.\n- **BIMONTHLY**: Dataset published every two months.\n- **MONTHLY**: Dataset published once a month.\n- **BIWEEKLY**: Dataset published every two weeks.\n- **WEEKLY**: Dataset published once a week.\n- **SEMIWEEKLY**: Dataset published twice a week.\n- **DAILY**: Dataset published once a day.\n- **OTHER**: Dataset published using other interval.',
					input: {
						type: 'selectInput',
						options: [
							{
								text: '',
								value: '',
							},
							{
								text: 'STATIC',
								value: 'STATIC',
							},
							{
								text: 'IRREGULAR',
								value: 'IRREGULAR',
							},
							{
								text: 'CONTINUOUS',
								value: 'CONTINUOUS',
							},
							{
								text: 'BIENNIAL',
								value: 'BIENNIAL',
							},
							{
								text: 'ANNUAL',
								value: 'ANNUAL',
							},
							{
								text: 'BIANNUAL',
								value: 'BIANNUAL',
							},
							{
								text: 'QUARTERLY',
								value: 'QUARTERLY',
							},
							{
								text: 'BIMONTHLY',
								value: 'BIMONTHLY',
							},
							{
								text: 'MONTHLY',
								value: 'MONTHLY',
							},
							{
								text: 'BIWEEKLY',
								value: 'BIWEEKLY',
							},
							{
								text: 'WEEKLY',
								value: 'WEEKLY',
							},
							{
								text: 'SEMIWEEKLY',
								value: 'SEMIWEEKLY',
							},
							{
								text: 'DAILY',
								value: 'DAILY',
							},
							{
								text: 'OTHER',
								value: 'OTHER',
							},
						],
					},
					validations: [
						{
							type: 'isSelectedRequired',
							message: 'Please select an option',
						},
					],
				},
				{
					questionId: 'properties/provenance/temporal/distributionReleaseDate',
					question: 'Distribution release date',
					guidance:
						'- Please indicate the frequency of publishing.\n- If a dataset is published regularly please choose a publishing periodicity from the constrained list and indicate the next release date.\n- When the release date becomes historical, a new release date will be calculated based on the publishing periodicity.\n- If a dataset has been published and will remain static please indicate that it is static and indicate when it was released.\n- If a dataset is released on an irregular basis or “on-demand” please indicate that it is Irregular and leave release date as null.\n- If a dataset can be published in real-time or near-real-time please indicate that it is continuous and leave release date as null.\n- Notes: see <https://www.dublincore.org/specifications/dublin-core/collection-description/frequency/>',
					input: {
						type: 'datePickerCustom',
					},
					validations: [
						{
							type: 'isCustomDate',
							format: 'dd/MM/yyyy',
							message: 'Please select a valid date',
						},
					],
				},
				{
					questionId: 'properties/provenance/temporal/startDate',
					question: 'Start date *',
					guidance:
						'- The start of the time period that the dataset provides coverage for.\n- If there are multiple cohorts in the dataset with varying start dates, please provide the earliest date and use the description or the media attribute to provide more information.',
					input: {
						type: 'datePickerCustom',
					},
					validations: [
						{
							type: 'isCustomDateRequired',
							format: 'dd/MM/yyyy',
							message: 'Please select a valid date',
						},
					],
				},
				{
					questionId: 'properties/provenance/temporal/endDate',
					question: 'End date',
					guidance:
						'- The end of the time period that the dataset provides coverage for.\n- If the dataset is **“Continuous”** and has no known end date, **please leave blank**.\n- If there are **multiple cohorts** in the dataset with varying end dates, please provide the **latest date**.',
					input: {
						type: 'datePickerCustom',
					},
					validations: [
						{
							type: 'isCustomDate',
							format: 'dd/MM/yyyy',
							message: 'Please select a valid date',
						},
					],
				},
				{
					questionId: 'properties/provenance/temporal/timeLag',
					question: 'Time lag *',
					guidance:
						'Please indicate the typical time-lag between an event and the data for that event appearing in the dataset.\n\n- **LESS 1 WEEK**: Typical time lag of less than a week\n- **1-2 WEEKS**: Typical time lag of one to two weeks\n- **2-4 WEEKS**: Typical time lag of two to four weeks\n- **1-2 MONTHS**: Typical time lag of one to two months\n- **2-6 MONTHS**: Typical time lag of two to six months\n- **6 MONTHS PLUS**: Typical time lag of more than six months\n- **VARIABLE**: Variable time lag\n- **NOT APPLICABLE**: Not Applicable i.e. static dataset\n- **OTHER**: Other time lag',
					input: {
						type: 'selectInput',
						options: [
							{
								text: '',
								value: '',
							},
							{
								text: 'LESS THAN 1 WEEK',
								value: 'LESS 1 WEEK',
							},
							{
								text: '1-2 WEEKS',
								value: '1-2 WEEKS',
							},
							{
								text: '2-4 WEEKS',
								value: '2-4 WEEKS',
							},
							{
								text: '1-2 MONTHS',
								value: '1-2 MONTHS',
							},
							{
								text: '2-6 MONTHS',
								value: '2-6 MONTHS',
							},
							{
								text: '6 MONTHS PLUS',
								value: 'MORE 6 MONTHS',
							},
							{
								text: 'VARIABLE',
								value: 'VARIABLE',
							},
							{
								text: 'NO TIMELAG',
								value: 'NO TIMELAG',
							},
							{
								text: 'NOT APPLICABLE',
								value: 'NOT APPLICABLE',
							},
							{
								text: 'OTHER',
								value: 'OTHER',
							},
						],
					},
					validations: [
						{
							type: 'isSelectedRequired',
							message: 'Please select an option',
						},
					],
				},
			],
		},
		//Temporal end

		//Usage start
		{
			questionSetId: 'usage',
			questionSetHeader: 'Usage',
			questions: [
				{
					questionId: 'properties/accessibility/usage/dataUseLimitation',
					question: 'Data use limitation',
					text: 'Please provide an indication of consent permissions for datasets and/or materials. Select all that apply.',
					guidance:
						'Please provide an indication of consent permissions for datasets and/or materials, and relates to the purposes for which datasets and/or material might be removed, stored or used.\n\n- **GENERAL RESEARCH USE**: This data use limitation indicates that use is allowed for general research use for any research purpose\n- **GENETIC STUDIES ONLY**: This data use limitation indicates that use is limited to genetic studies only (i.e., no phenotype-only research)\n- **NO GENERAL METHODS RESEARCH**: This data use limitation indicates that use includes methods development research(e.g., development of software or algorithms) only within the bounds of other use limitations.\n- **NO RESTRICTION**: This data use limitation indicates there is no restriction on use.\n- **RESEARCH SPECIFIC RESTRICTIONS**: This data use limitation indicates that use is limited to studies of a certain research type.\n- **RESEARCH USE ONLY**: This data use limitation indicates that use is limited to research purposes (e.g., does not include its use in clinical care).\n- **NO LINKAGE**: This data use limitation indicates there is a restriction on linking to any other datasets',
					input: {
						type: 'typeaheadCustom',
						options: [
							'GENERAL RESEARCH USE',
							'COMMERCIAL RESEARCH USE',
							'GENETICS STUDIES ONLY',
							'NO GENERAL METHODS RESEARCH',
							'NO RESTRICTION',
							'GEOGRAPHICAL RESTRICTIONS',
							'INSTITUTION SPECIFIC RESTRICTIONS',
							'NOT FOR PROFIT USE',
							'PROJECT SPECIFIC RESTRICTIONS',
							'RESEARCH SPECIFIC RESTRICTIONS',
							'USER SPECIFIC RESTRICTION',
							'RESEARCH USE ONLY',
							'NO LINKAGE',
						],
					},
				},
				{
					questionId: 'properties/accessibility/usage/dataUseRequirements',
					question: 'Data use requirements',
					text: 'Please indicate if there are any additional conditions set for use if any. Select all that apply.',
					guidance:
						'- Please indicate if there are any additional conditions set for use if any, multiple requirements may be provided.\n- Please ensure that these restrictions are documented in access rights information.\n\n- **COLLABORATION REQUIRED**: This requirement indicates that the requestor must agree to collaboration with the primary study investigator(s).\n- **ETHICS APPROVAL REQUIRED**: This requirement indicates that the requestor must provide documentation of local IRB/ERB approval.\n- **GEOGRAPHICAL RESTRICTIONS**: This requirement indicates that use is limited to within a specific geographic region.\n- **INSTITUTION SPECIFIC RESTRICTIONS**: This requirement indicates that use is limited to use within an approved institution.\n- **NOT FOR PROFIT USE**: This requirement indicates that use of the data is limited to not-for-profit organizations and not-for-profit use, non-commercial use.\n- **PROJECT SPECIFIC RESTRICTIONS**: This requirement indicates that use is limited to use within an approved project.\n- **PUBLICATION MORATORIUM**: This requirement indicates that requestor agrees not to publish results of studies until a specific date.\n- **PUBLICATION REQUIRED**: This requirement indicates that requestor agrees to make results of studies using the data available to the larger scientific community.\n- **RETURN TO DATABASE OR RESOURCE**: This requirement indicates that the requestor must return derived/enriched data to the database/resource.\n- **TIME LIMIT ON USE**: This requirement indicates that use is approved for a specific number of months.\n- **USER SPECIFIC RESTRICTION**: This requirement indicates that use is limited to use by approved users.',
					input: {
						type: 'typeaheadCustom',
						options: [
							'COLLABORATION REQUIRED',
							'PROJECT SPECIFIC RESTRICTIONS',
							'ETHICS APPROVAL REQUIRED',
							'GEOGRAPHICAL RESTRICTIONS',
							'INSTITUTION SPECIFIC RESTRICTIONS',
							'PROJECT SPECIFIC RESTRICTIONS',
							'PUBLICATION MORATORIUM',
							'PUBLICATION REQUIRED',
							'RETURN TO DATABASE OR RESOURCE',
							'TIME LIMIT ONE USE',
							'DISCLOSURE CONTROL',
							'NOT FOR PROFIT USE',
							'USER SPECIFIC RESTRICTION',
						],
					},
				},
				{
					questionId: 'properties/accessibility/usage/resourceCreator',
					question: 'Resource creator',
					text: 'This is typically just the name of the publisher. No employee details should be provided.',
					guidance:
						'- Please provide the text that you would like included as part of any citation that credits this dataset.\n- This is typically just the name of the publisher. No employee details should be provided.\n- **Example**: National Services Scotland',
					input: {
						type: 'multiField',
					},
				},
				{
					questionId: 'properties/accessibility/usage/investigations',
					question: 'Investigations',
					text: 'Please provide link to any active projects that are using the dataset.',
					guidance: '',
					input: {
						type: 'multiField',
					},
					validations: [
						{
							type: 'isMultiFieldURL',
							message: 'Please enter a valid URL',
						},
					],
				},
				{
					questionId: 'properties/accessibility/usage/isReferencedBy',
					question: 'Is referenced by',
					text:
						'Please provide the keystone paper(s) associated with the dataset in following format: [Author] ([Year]) [Title] . [DOI] . [Source]',
					guidance:
						'- Please provide the **keystone paper** associated with the dataset.\n- Please also include a list of known citations, if available and should be links to existing resources where the dataset has been used or referenced.\n- Please split your existing list of citations into separate fields.\n- To add multiple entries, please click on **Add New Field** to enter each separate citation.\n- **Example**: de Lusignan S, Correa A, Smith GE, Yonova I, Pebody R, Ferreira F, Elliot AJ, Fleming DM. RCGP Research and Surveillance Centre: 50 years’ surveillance of influenza, infections, and 35 of 53 Access This section includes information about data access. respiratory conditions. BJGP 2017; 67 (663): 440-441. DOI: <https://doi.org/10.3399/bjgp17X692645>.',
					input: {
						type: 'multiField',
					},
				},
			],
		},
		//Usage end

		//Access start
		{
			questionSetId: 'access',
			questionSetHeader: 'Access',
			questions: [
				{
					questionId: 'properties/accessibility/access/accessRights',
					question: 'Access rights *',
					text: 'The URL of a webpage(s) where the data access request process and/or guidance is provided.',
					guidance:
						'- The URL of a webpage where the data access request process and/or guidance is provided. If there is more than one access process i.e. industry vs academic please provide both.\n- If such a resource or the underlying process doesn’t exist, please provide “In Progress”, until both the process and the documentation are ready.',

					input: {
						type: 'multiField',
					},
					validations: [
						{
							type: 'isMultiFieldURLRequired',
							message: 'Please enter a valid URL',
						},
					],
				},
				{
					questionId: 'properties/accessibility/access/accessService',
					question: 'Access service',
					text: 'Please provide a brief description of the environment where data can be accessed by researchers.',
					guidance:
						'Please provide a brief description of the data access services that are available including:\n- environment that is currently available to researchers\n- additional consultancy and services\n- any indication of costs associated\n\nIf no environment is currently available, please indicate the current plans and timelines when and how data will be made available to researchers.\n\nNote: This value will be used as default access environment for all datasets submitted by the organisation. However, there will be the opportunity to overwrite this value for each dataset.',
					input: {
						type: 'textareaInputCustom',
						options: ['5,000'],
					},
					validations: [
						{
							type: 'isLength',
							params: [0, 5000],
						},
					],
				},
				{
					questionId: 'properties/accessibility/access/accessRequestCost',
					question: 'Access request cost',
					text: 'Provide link(s) to a webpage detailing the commercial model for processing data access requests for the organisation.',
					guidance:
						'- Please provide link(s) to a webpage detailing the commercial model for processing data access requests for the organisation (if available).\n- Definition: Indication of commercial model or cost (in GBP) for processing each data access request by the data custodian.',
					input: {
						type: 'multiField',
					},
				},
				{
					questionId: 'properties/accessibility/access/deliveryLeadTime',
					question: 'Delivery lead time',
					text: 'Please provide an indication of the typical processing times based on the types of requests typically received.',
					guidance:
						'- **LESS 1 WEEK**: Access request process typically processed in less than a week\n- **1-2 WEEKS**: Access request process typically processed in one to two weeks\n- **2-4 WEEKS**: Access request process typically processed in two to four weeks\n- **1-2 MONTHS**: Access request process typically processed in one to two months\n- **2-6 MONTHS**: Access request process typically processed in two to six months\n- **MORE 6 MONTHS**: Access request process typically processed in more than six months\n- **VARIABLE**: Access request lead time is variable\n- **NOT APPLICABLE**: Access request process duration is not applicable\n- **OTHER**: If the typical timeframe does not fit into the broad ranges i.e. lightweight application vs linked data application, please choose “Other” and indicate the typical timeframe within the description for the dataset.',
					input: {
						type: 'selectInput',
						options: [
							{
								text: '',
								value: '',
							},
							{
								text: 'LESS THAN 1 WEEK',
								value: 'lessThan1Week',
							},
							{
								text: '1-2 WEEKS',
								value: '12Weeks',
							},
							{
								text: '2-4 WEEKS',
								value: '24Weeks',
							},
							{
								text: '1-2 MONTHS',
								value: '12Months',
							},
							{
								text: '2-6 MONTHS',
								value: '26Months',
							},
							{
								text: '6 MONTHS PLUS',
								value: '6MonthsPlus',
							},
							{
								text: 'VARIABLE',
								value: 'variable',
							},
							{
								text: 'NOT APPLICABLE',
								value: 'notApplicable',
							},
							{
								text: 'OTHER',
								value: 'other',
							},
						],
					},
				},
				{
					questionId: 'properties/accessibility/access/jurisdiction',
					question: 'Jurisdiction *',
					text:
						'Select the country/state under whose laws the data subjects’ data is collected, processed and stored. Select all that apply.',
					guidance:
						'- Please use country code from [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country codes and the associated [ISO 3166-2](https://www.iso.org/standard/63546.html) for regions, cities, states etc. for the country/state under whose laws the data subjects’ data is collected, processed and stored.\n- Multiple Jurisdictions may be provided (if applicable).\n- **Default**: GB-ENG',
					input: {
						type: 'typeaheadCustom',
						options: [
							'- **GB-ENG**: England',
							'- **GB-NIR**: Northern Ireland',
							'- **GB-SCT**: Scotland',
							'- **GB-WLS**: Wales [Cymru GB-CYM]',
							'- **GB-EA**: England and Wales',
							'- **GB-GB**: Great Britain',
						],
					},
					validations: [
						{
							type: 'isAtLeastOneSelected',
							message: 'At least one entry is required',
						},
					],
				},
				{
					questionId: 'properties/accessibility/access/dataController',
					question: 'Data controller *',
					text: 'Person(s) who determine the purposes of and ways in which personal data are to be processed.',
					guidance:
						'- Data Controller means a person/entity who (either alone or jointly or in common with other persons/entities) determines the purposes for which and the way any Data Subject data, specifically personal data or are to be processed.\n- Notes: For most organisations this will be the same as the publisher of the dataset. If this is not the case, please indicate that there is a different controller.\n- If there is a different controller please complete the Data Processor attribute to indicate that the publisher is a Processor rather than the data controller.\n- In some cases, there may be multiple data controllers i.e. GP data. If this is the case please indicate the fact in a free-text field and describe the data sharing arrangement or a link to it, so that this can be understood by research users.\n- **Example**: NHS DIGITAL',
					input: {
						type: 'textareaInputCustom',
						options: ['5,000'],
					},
					validations: [
						{
							type: 'isLength',
							params: [5, 5000],
						},
					],
				},
				{
					questionId: 'properties/accessibility/access/dataProcessor',
					question: 'Data processor',
					text: 'The person/entity who processes the data on behalf of the data controller.',
					guidance:
						'- A Data Processor, in relation to any Data Subject data, specifically personal data, means any person/entity (other than an employee of the data controller) who processes the data on behalf of the data controller.\n- Notes: Required to complete if the Publisher is the Data Processor rather than the data controller.\n- If the Publisher is also the Data Controller please provide “Not Applicable”.\n- **Examples**:\n- Not Applicable\n- SAIL',
					input: {
						type: 'textareaInputCustom',
						options: ['5,000'],
					},
					validations: [
						{
							type: 'isLength',
							params: [0, 5000],
						},
					],
				},
			],
		},
		//Access end

		//Formats and standards start
		{
			questionSetId: 'formatAndStandards',
			questionSetHeader: 'Format and standards',
			questions: [
				{
					questionId: 'properties/accessibility/formatAndStandards/vocabularyEncodingScheme',
					question: 'Vocabulary encoding scheme *',
					text: 'Select all relevant terminologies / ontologies / controlled vocabularies that are being used by the dataset.',
					guidance:
						'- List any relevant terminologies / ontologies / controlled vocabularies, such as ICD 10 Codes, NHS Data Dictionary National Codes or SNOMED CT International, that are being used by the dataset.\n- If the controlled vocabularies are local standards, please make that explicit. If you are using a standard that has not been included in the list, please use “other” and contact support desk to ask for an addition.\n- Notes: More than one vocabulary may be provided.\n- **LOCAL**: Local Coding Standard\n- **OPCS4**: <https://www.datadictionary.nhs.uk/web_site_content/supporting_information/clinical_coding/opcs_classification_of_interventions_and_procedures.asp>\n- **READ**: <https://digital.nhs.uk/services/terminology-and-classifications/read-codes>\n- **SNOMED CT**: <http://www.snomed.org/>\n- **SNOMED RT**: <https://confluence.ihtsdotools.org/display/DOCGLOSS/SNOMED+RT>\n- **DM+D**: <https://digital.nhs.uk/data-and-information/information-standards/information-standards-and-data-collections-including-extractions/publications-and-notifications/standards-and-collections/scci0052-dictionary-of-medicines-and-devices-dm-d>\n- **NHS NATIONAL CODES**: <https://www.datadictionary.nhs.uk/>\n- **ODS**: <https://digital.nhs.uk/services/organisation-data-service>\n- **LOINC**: <https://loinc.org/>\n- **ICD10**: <https://www.who.int/classifications/icd/icdonlineversions/en/>\n- **ICD10CM**: <https://www.cdc.gov/nchs/icd/icd10cm.htm>\n- **ICD10PCS**: <https://ec.europa.eu/eip/ageing/standards/healthcare/e-health/icd-10-pcs_en>\n- **ICD9CM**: <https://www.cdc.gov/nchs/icd/icd9cm.htm>\n- **ICD9**: <https://www.cdc.gov/nchs/icd/icd9.htm>\n- **ICDO3**: <https://www.who.int/classifications/icd/adaptations/oncology/en/>\n- **AMT**: <https://www.digitalhealth.gov.au/about-the-agency/tenders-and-offers/community-pharmacy-software-industry-partnership-offer/Webinar%20-%20Australian%20Medicines%20Terminology%20(AMT)%20and%20Implementation%20Options%2001032017.pdf>\n- **APC**: <https://www.acep.org/administration/reimbursement/reimbursement-faqs/apc-ambulatory-payment-classifications-faq/>\n- **ATC**: <https://www.whocc.no/atc_ddd_index/>\n- **CIEL**: <https://github.com/OpenConceptLab/ocl_web/wiki/CIEL>\n- **HPO**: <https://hpo.jax.org/app/>\n- **CPT4**: <https://www.cms.gov/Regulations-and-Guidance/Legislation/CLIA/Downloads/SubjecttoCLIA.pdf>\n- **DPD**: <https://health-products.canada.ca/dpd-bdpp/index-eng.jsp>\n- **DRG**: <http://www.euro.who.int/__data/assets/pdf_file/0004/162265/e96538.pdf>\n- **HEMONC**: <https://hemonc.org/wiki/Main_Page>\n- **JMDC**: <https://www.jmdc.co.jp/en/>\n- **KCD7**: <https://forums.ohdsi.org/t/adding-kcd7-code-korean-icd-10-to-the-omop-vocabulary/7576>\n- **MULTUM**: <https://www.cerner.com/solutions/drug-database>\n- **NAACCR**: <https://www.naaccr.org/>\n- **NDC**: <https://www.fda.gov/drugs/drug-approvals-and-databases/national-drug-code-directory>\n- **NDFRT** <:https://www.nlm.nih.gov/research/umls/sourcereleasedocs/current/NDFRT/index.html>\n- **OXMIS**: <https://oxrisk.com/oxmis/>\n- **RXNORM**: <https://www.nlm.nih.gov/research/umls/rxnorm/index.html>\n- **RXNORM EXTENSION**: <https://www.nlm.nih.gov/research/umls/rxnorm/index.html>\n- **SPL**: <https://www.fda.gov/industry/fda-resources-data-standards/structured-product-labeling-resources>\n- **OTHER**: Please indicate if there is another standard that you are using. This will trigger a support ticket where you can request the addition of the terminology to the HOP.\n- **NHS SCOTLAND NATIONAL CODES**: <https://www.ndc.scot.nhs.uk/Data-Dictionary/>\n- **NHS WALES NATIONAL CODES**: <http://www.datadictionary.wales.nhs.uk/>',
					input: {
						type: 'typeaheadCustom',
						options: [
							'LOCAL',
							'OPCS4',
							'READ',
							'SNOMED CT',
							'SNOMED RT',
							'DM+D',
							'NHS NATIONAL CODES',
							'ODS',
							'LOINC',
							'ICD10',
							'ICD10CM',
							'ICD10PCS',
							'ICD9CM',
							'ICD9',
							'ICDO3',
							'AMT',
							'APC',
							'ATC',
							'CIEL',
							'HPO',
							'CPT4',
							'DPD',
							'DRG',
							'HEMONC',
							'JMDC',
							'KCD7',
							'MULTUM',
							'NAACCR',
							'NDC',
							'NDFRT',
							'OXMIS',
							'RXNORM',
							'RXNORM EXTENSION',
							'SPL',
							'OTHER',
							'NHS SCOTLAND NATIONAL CODES',
							'NHS WALES NATIONAL CODES',
						],
					},
					validations: [
						{
							type: 'isAtLeastOneSelected',
							message: 'At least one entry is required',
						},
					],
				},
				{
					questionId: 'properties/accessibility/formatAndStandards/conformsTo',
					question: 'Conforms to *',
					text: 'List standardised data models that the dataset has been stored in or transformed to. Select all that apply.',
					guidance:
						'- List standardised data models that the dataset has been stored in or transformed to, such as OMOP or FHIR.\n- If the data is only available in a local format, please make that explicit. If you are using a standard that has not been included in the list, please use “other” and contact support desk to ask for an addition.\n- **HL7 FHIR**: <https://www.hl7.org/fhir/>\n- **HL7 V2**: <https://www.hl7.org/implement/standards/product_section.cfm?section=13>\n- **HL7 CDA**: <https://www.hl7.org/implement/standards/product_section.cfm?section=10>\n- **HL7 CCOW**: <https://www.hl7.org/implement/standards/product_section.cfm?section=16>\n- **DICOM**: <https://www.dicomstandard.org/>\n- **I2B2**: <https://www.i2b2.org/>\n- **IHE**: <https://www.ihe.net/resources/profiles/>\n- **OMOP**: <https://www.ohdsi.org/data-standardization/the-common-data-model/>\n- **OPENEHR**: <https://www.openehr.org/>\n- **SENTINEL**: <https://www.sentinelinitiative.org/sentinel/data/distributed-database-common-data-model>\n- **PCORNET**: <https://pcornet.org/data-driven-common-model/>\n- **CDISC**: <https://www.cdisc.org/standards/data-exchange/odm>\n- **LOCAL**: In-house developed data model\n- **OTHER**: Other standardised data model\n- **NHS DATA DICTIONARY**: <https://www.datadictionary.nhs.uk/>\n- **NHS SCOTLAND DATA DICTIONARY**: <https://www.ndc.scot.nhs.uk/Data-Dictionary/>\n- **NHS WALES DATA DICTIONARY**: <https://www.datadictionary.wales.nhs.uk/>',
					input: {
						type: 'typeaheadCustom',
						options: [
							'HL7 FHIR',
							'HL7 V2',
							'HL7 CDA',
							'HL7 CCOW',
							'DICOM',
							'I2B2',
							'IHE',
							'OMOP',
							'OPENEHR',
							'SENTINEL',
							'PCORNET',
							'CDISC',
							'LOCAL',
							'OTHER',
							'NHS DATA DICTIONARY',
							'NHS SCOTLAND DATA DICTIONARY',
							'NHS WALES DATA DICTIONARY',
						],
					},
					validations: [
						{
							type: 'isAtLeastOneSelected',
							message: 'At least one entry is required',
						},
					],
				},
				{
					questionId: 'properties/accessibility/formatAndStandards/language',
					question: 'Language *',
					text: 'This should list all the languages in which the dataset metadata and underlying data is made available.',
					guidance:
						'- List standardised data models that the dataset has been stored in or transformed to, such as OMOP or FHIR.\n- If the data is only available in a local format, please make that explicit. If you are using a standard that has not been included in the list, please use “other” and contact support desk to ask for an addition.\n- **HL7 FHIR**: <https://www.hl7.org/fhir/>\n- **HL7 V2**: <https://www.hl7.org/implement/standards/product_section.cfm?section=13>\n- **HL7 CDA**: <https://www.hl7.org/implement/standards/product_section.cfm?section=10>\n- **HL7 CCOW**: <https://www.hl7.org/implement/standards/product_section.cfm?section=16>\n- **DICOM**: <https://www.dicomstandard.org/>\n- **I2B2**: <https://www.i2b2.org/>\n- **IHE**: <https://www.ihe.net/resources/profiles/>\n- **OMOP**: <https://www.ohdsi.org/data-standardization/the-common-data-model/>\n- **OPENEHR**: <https://www.openehr.org/>\n- **SENTINEL**: <https://www.sentinelinitiative.org/sentinel/data/distributed-database-common-data-model>\n- **PCORNET**: <https://pcornet.org/data-driven-common-model/>\n- **CDISC**: <https://www.cdisc.org/standards/data-exchange/odm>\n- **LOCAL**: In-house developed data model\n- **OTHER**: Other standardised data model\n- **NHS DATA DICTIONARY**: <https://www.datadictionary.nhs.uk/>\n- **NHS SCOTLAND DATA DICTIONARY**: <https://www.ndc.scot.nhs.uk/Data-Dictionary/>\n- **NHS WALES DATA DICTIONARY**: <https://www.datadictionary.wales.nhs.uk/>',
					input: {
						type: 'typeaheadCustom',
						options: [
							'- **GB-ENG**: England',
							'- **GB-NIR**: Northern Ireland',
							'- **GB-SCT**: Scotland',
							'- **GB-WLS**: Wales [Cymru GB-CYM]',
							'- **GB-EA**: England and Wales',
							'- **GB-GB**: Great Britain',
						],
					},
					validations: [
						{
							type: 'isAtLeastOneSelected',
							message: 'At least one entry is required',
						},
					],
				},
				{
					questionId: 'properties/accessibility/formatAndStandards/format',
					question: 'Format *',
					text: 'e.g. audio, image, message, modal, multipart, text, video etc.',
					guidance:
						'- If multiple formats are available, please specify. See application, audio, image, message, model, multipart, text, video, <https://www.iana.org/assignments/media-types/media-types.xhtml>\n- Please **enter one format type at a time** and click **Add New Field** to add further keywords.\n- Note: If your file format is not included in the current list of formats, please indicate other.\n- If you are using the HOP, you will be directed to a service desk page where you can request your additional format.\n- If not, please go to: <https://metadata.atlassian.net/servicedesk/customer/portal/4> to request your format.\n- **Example**: text/tab-separated-values, application/sql, text/csv, image/diacom-rle',
					input: {
						type: 'multiField',
					},
					validations: [
						{
							type: 'isMultiFieldRequired',
							message: 'At least one entry is required',
						},
					],
					//Paul - mandatory
				},
			],
		},
		//Formats and standards end

		//Enrichment and linkage start
		{
			questionSetId: 'enrichmentAndLinkage',
			questionSetHeader: 'Enrichment and linkage',
			questions: [
				{
					questionId: 'properties/enrichmentAndLinkage/qualifiedRelation',
					question: 'Linked data',
					text: 'Other datasets that have previously been linked to this dataset',
					guidance:
						'- If applicable, please provide the DOI of other datasets that have previously been linked to this dataset and their availability.\n- If no DOI is available, please provide the title of the datasets that can be linked, where possible using the same title of a dataset previously onboarded to the HOP.\n- Note: If all the datasets from Gateway organisation can be linked please indicate “ALL” and the onboarding portal will automate linkage across the datasets submitted.\n- **Examples**:\n- ALL\n- 10.3399/bjgp17X692645',
					input: {
						type: 'multiField',
					},
					//Paul - validation
				},
				{
					questionId: 'properties/enrichmentAndLinkage/derivation',
					question: 'Derivation',
					text: 'Indicate the type derived datasets / predefined extracts available.',
					guidance:
						'- Indicate if derived datasets or predefined extracts are available and the type of derivation available.\n- Notes: Single or multiple dimensions can be provided as a derived extract alongside the dataset.\n- If such derivations are not known by the Publisher, then please provide “Not Known”. If there are no derivations calculated, please indicate “Not Available”.\n- **Defaults**:\n- Not Known\n- Not Available',
					input: {
						type: 'multiField',
					},
					//Paul - validation
				},
				{
					questionId: 'properties/enrichmentAndLinkage/tools',
					question: 'Tools',
					text: 'Provide the URL / names of any analysis tools or models that have been created for this dataset',
					guidance:
						'- Please provide the URL of any analysis tools or models that have been created for this dataset and are available for further use.\n- Multiple tools may be provided.\n- Note: We encourage users to adopt a model along the lines of <https://www.ga4gh.org/news/tool-registry-service-api-enabling-an-interoperable-library-of-genomics-analysis-tools/>',
					input: {
						type: 'multiField',
					},
					validations: [
						{
							type: 'isMultiFieldURL',
							message: 'Please enter a valid URL',
						},
					],
				},
			],
		},
		//Enrichment and linkage end

		//Observations start
		{
			questionSetId: 'observations',
			questionSetHeader: 'Observations',
			questions: [
				{
					questionId: 'properties/observation/observedNode',
					question: 'Observed node *',
					text: 'Please select one of the following statistical populations for your observation.',
					guidance:
						'- **Persons**: Unique persons recorded in the dataset\n- **Events**: Unique events such as procedures and prescriptions within the dataset\n - **Findings**: Unique findings included in the dataset such as diagnoses, test ',
					input: {
						type: 'selectInput',
						options: [
							{
								text: '',
								value: '',
							},
							{
								text: 'PERSONS',
								value: 'PERSONS',
							},
							{
								text: 'EVENTS',
								value: 'EVENTS',
							},
							{
								text: 'FINDINGS',
								value: 'FINDINGS',
							},
						],
					},
					validations: [
						{
							type: 'isSelectedRequired',
							message: 'Please select an option',
						},
					],
				},
				{
					questionId: 'properties/observation/measuredValue',
					question: 'Measured value *',
					text: 'The population size associated with the population type in the dataset',
					guidance:
						'- Please provide the population size associated with the population type the dataset i.e. 1000 people in a study, or 87 images (MRI) of Knee\n- Usage Note: Used with Statistical Population, which specifies the type of the population in the dataset.',
					input: {
						type: 'textInput',
					},
					validations: [
						{
							type: 'isInt',
							params: [{ min: -1 }],
							message: 'Please enter a positive integer',
						},
					],
				},
				{
					questionId: 'properties/observation/disambiguatingDescription',
					question: 'Disambiguating description',
					text: 'A description that disambiguates the population type.',
					guidance:
						'If SNOMED CT term does not provide sufficient detail, please provide a description that disambiguates the population type.',
					input: {
						type: 'textareaInputCustom',
						options: [255],
					},
					validations: [
						{
							type: 'isLength',
							params: [0, 255],
						},
					],
				},
				{
					questionId: 'properties/observation/observationDate',
					question: 'Observation date *',
					text: 'Please provide the date of the observation',
					guidance: '',
					input: {
						type: 'datePickerCustom',
					},
					validations: [
						{
							type: 'isCustomDateRequired',
							format: 'dd/MM/yyyy',
							message: 'Please select a valid date',
						},
					],
				},
				{
					questionId: 'properties/observation/measuredProperty',
					question: 'Measured property *',
					text: 'Initially this will be defaulted to "Count"',
					guidance: '',
					input: {
						type: 'textInput',
					},
					validations: [
						{
							type: 'isLength',
							params: [1, 80],
						},
					],
				},
			],
		},
		//Observations end
		{
			questionSetId: 'addApplicant',
			questions: [
				{
					questionId: 'addFirstName',
					input: {
						type: 'buttonInput',
						action: 'addApplicant',
						panelId: 'applicant',
						text: '+ Add another section',
						class: 'btn btn-primary addButton',
					},
					guidance: 'Some safe project guidance.',
				},
			],
		},
	],
};
