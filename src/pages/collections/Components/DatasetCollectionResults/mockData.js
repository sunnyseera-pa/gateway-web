export const data = [
	{
		_id: '609157ae046499024bde30bf',
		tags: {
			features: [
				'DIGITRIALS',
				'A&E',
				'ACCIDENT AND EMERGENCY',
				'ECDS',
				'NCS',
				'National Core Study',
				'URGENT AND EMERGENCY CARE',
				'UEC',
				'COVID-19',
			],
			topics: [],
		},
		datasetfields: {
			publisher: 'ALLIANCE > NHS DIGITAL',
			geographicCoverage: ['England'],
			physicalSampleAvailability: ['NOT AVAILABLE'],
			abstract:
				'The Emergency Care Data Set (ECDS) is a national data set providing information to support the care provided in emergency departments by including the data items needed to understand capacity and demand and help improve patient care.',
			releaseDate: '',
			accessRequestDuration: 'OTHER',
			conformsTo: 'LOCAL,NHS DATA DICTIONARY',
			accessRights: 'https://digital.nhs.uk/services/data-access-request-service-dars',
			jurisdiction: 'GB-ENG',
			datasetStartDate: '2017-10-01',
			datasetEndDate: '',
			statisticalPopulation: '',
			ageBand: '0-150',
			contactPoint: 'enquiries@nhsdigital.nhs.uk',
			periodicity: 'MONTHLY',
			metadataquality: {
				schema_version: '2.0.1',
				pid: '7749d90e-dd7a-4697-8a9c-666491c64a0c',
				id: 'bf563953-2293-4fb4-9842-61f7fdadea57',
				publisher: 'ALLIANCE > NHS DIGITAL',
				title: 'Emergency Care Data Set (ECDS)',
				completeness_percent: 73.81,
				weighted_completeness_percent: 88.59,
				error_percent: 34.88,
				weighted_error_percent: 2.68,
				quality_score: 69.47,
				quality_rating: 'Bronze',
				weighted_quality_score: 92.95,
				weighted_quality_rating: 'Platinum',
			},
			datautility: {
				pid: '',
				id: 'bf563953-2293-4fb4-9842-61f7fdadea57',
				publisher: 'ALLIANCE > NHS DIGITAL',
				title: 'Emergency Care Data Set (ECDS)',
				metadata_richness: 'Platinum',
				availability_of_additional_documentation_and_support: 'Other (please specify)',
				data_model: 'Other (please specify)',
				data_dictionary: 'Bronze',
				provenance: 'Silver ',
				data_quality_management_process: 'Other (please specify)',
				dama_quality_dimensions: '',
				pathway_coverage: 'Bronze',
				length_of_follow_up: '',
				allowable_uses: 'Other (please specify)',
				research_environment: '',
				time_lag: 'Other (please specify)',
				timeliness: '',
				linkages: 'Bronze',
				data_enrichments: 'Silver ',
			},
			metadataschema: {
				'@context': 'http://schema.org/',
				'@type': 'Dataset',
				identifier: 'bf563953-2293-4fb4-9842-61f7fdadea57',
				url: 'https://healthdatagateway.org/detail/bf563953-2293-4fb4-9842-61f7fdadea57',
				name: 'Emergency Care Data Set (ECDS)',
				description:
					"The Emergency Care Data Set (ECDS) is the national data set for urgent and emergency care. It replaced Accident & Emergency Commissioning Data Set (CDS type 010) and was implemented through: ECDS (CDS 6.2.2 Type 011). ECDS allows NHS Digital to provide information to support the care provided in emergency departments by including the data items needed to understand capacity and demand and help improve patient care.\n\nECDS Type 011 is better equipped to keep pace with the increasing complexity of delivering emergency care than its predecessor.  This means that the improved quality of data collected in emergency departments provides better support to healthcare planning and better-informed decision making on improvements to services. \n\nThis improved data helps improve understanding of:\n\nthe complexity and acuity of attending patients\nthe causes of rising demand\nthe value added by emergency departments.\nECDS also allows:\n\nthe capture of better diagnostic data to ensure an enhanced understanding of need, activity and outcomes\nconsistent monitoring of data across local and national initiatives\nsupport for injury surveillance, such that it will be possible to identify patterns that may be amenable to targeted interventions and improved public health.\nWhich in turn informs more effective and efficient resource deployment.\n\nPlease note, data can be submitted to the ECDS on a daily basis, however data extracts are made available via the DARS process on the second Thursday of each month, comprising provisional data for the full financial year up to and including the penultimate full month prior to the publication date. For example: Data for events that occurred 01/04/2020 to 31/10/2020 is made available via DARS extract on 10/12/2020.\n\nTimescales for dissemination of agreed data can be found under 'Our Service Levels' at the following link: https://digital.nhs.uk/services/data-access-request-service-dars/data-access-request-service-dars-process",
				keywords: [
					'DIGITRIALS,A&E,ACCIDENT AND EMERGENCY,ECDS,NCS,National Core Study,URGENT AND EMERGENCY CARE,UEC,COVID-19',
					'ALLIANCE > NHS DIGITAL',
					'NOT APPLICABLE',
					'GB-ENG',
					'England',
				],
				includedinDataCatalog: [
					{
						'@type': 'DataCatalog',
						name: 'ALLIANCE > NHS DIGITAL',
						url: 'enquiries@nhsdigital.nhs.uk',
					},
					{
						'@type': 'DataCatalog',
						name: 'HDR UK Health Data Gateway',
						url: 'http://healthdatagateway.org',
					},
				],
			},
			technicaldetails: [
				{
					domainType: null,
					label: 'Record Identifiers',
					description: 'Record Identifiers',
					elements: [
						{
							domainType: null,
							label: 'RECORD_IDENTIFIER',
							description: 'The generated unique identifier for the episode.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Number',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Discharge Details',
					description: 'Discharge Details',
					elements: [
						{
							domainType: null,
							label: 'DISCHARGE_INFORMATION_GIVEN_VALID_APPROVED',
							description: 'Tests if the Discharge Information Given Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DISCHARGE_STATUS_VALID_APPROVED',
							description: 'Tests if the Discharge Status Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DISCHARGE_STATUS',
							description:
								'EMERGENCY CARE DISCHARGE STATUS (SNOMED CT) is the SNOMED CT concept ID which is used indicate the status of the PATIENT on discharge from an Emergency Care Department.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DISCHARGE_FOLLOW_UP_VALID_APPROVED',
							description: 'Tests if the Discharge FollowUp Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DISCHARGE_INFORMATION GIVEN',
							description:
								'EMERGENCY CARE DISCHARGE INFORMATION GIVEN (SNOMED CT) is the SNOMED CT concept ID which is used to identify whether a copy of a letter to their GENERAL PRACTITIONER has been printed and given to the PATIENT on discharge from an Emergency Care Department.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DISCHARGE_DESTINATION_VALID_APPROVED',
							description: 'Tests if the Discharge Destination Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DISCHARGE_DESTINATION',
							description:
								'EMERGENCY CARE DISCHARGE DESTINATION (SNOMED CT) is the SNOMED CT concept ID which is used to identify the intended destination of the PATIENT following discharge from the Emergency Care Department.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DISCHARGE_FOLLOW_UP',
							description:
								'EMERGENCY CARE DISCHARGE FOLLOW UP (SNOMED CT) is the SNOMED CT concept ID which is used to identify the SERVICE to which a PATIENT was referred for continuing care following an Emergency Care Attendance.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Clinical Treatments',
					description: 'Clinical Treatments',
					elements: [
						{
							domainType: null,
							label: 'TREATMENT_CODE',
							description:
								'EMERGENCY CARE PROCEDURE (SNOMED CT) is the SNOMED CT concept ID which is used to identify a Patient Procedure performed while a PATIENT is under the care of an Emergency Care Department.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'TREATMENTS_VALID_APPROVED',
							description: 'Tests if the Treatment Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'TREATMENT_TIME',
							description:
								'The time at which treatments were performed while the person was under the care of the Emergency Care facility.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'TREATMENT_DATE',
							description:
								'The date on which treatments were performed while the person was under the care of the Emergency Care facility.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Geographical',
					description: 'Geographical',
					elements: [
						{
							domainType: null,
							label: 'COUNTRY',
							description: 'Derived from the Office of National Statistics NHS Postcode Directory',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'IMD_DECILE',
							description:
								'The deciles are calculated by ranking the 32,844 LSOAs in England from most deprived to least deprived and dividing them into 10 equal groups. LSOAs in decile 1 fall within the most deprived 10% of LSOAs nationally and LSOAs in decile 10 fall within the least deprived 10% of LSOAs nationally.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'String',
							},
						},
						{
							domainType: null,
							label: 'ELECTRAL_WARD_1998',
							description: 'Report field 1998 Electoral Area',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'RURAL_URBAN_INDICATOR',
							description:
								'The 2001 Census urban and rural classification of output areas for England and Wales, Scotland and Northern Ireland.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ED_DISTRICT_CODE',
							description: 'Report field ED District Code',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ED_COUNTY_CODE',
							description: 'Report field 1991 Census ED',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'IMD_DESCRIPTION',
							description: 'Description for Index of Multiple Decile Deprivation',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'String',
							},
						},
						{
							domainType: null,
							label: 'PATIENT_POSTCODE_DISTRICT',
							description:
								'This is effectively the outward (leading) part of the submitted postcode. It is formed by removing the last three characters from the postcode value which has first been trimmed to remove non-alphanumeric characters such as spaces.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'POSTCODE',
							description: 'The postcode of the address nominated by the patient.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Attendance Characteristics',
					description: 'Attendance Characteristics',
					elements: [
						{
							domainType: null,
							label: 'ATTENDANCE_CATEGORY',
							description: 'The category of Emergency Care Attendance.The national codes for Attendance Category are:',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'CONCLUSION_TIME',
							description: 'The time (HH:MM:SS) at which the attendance was concluded.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'AMBULANCE_INCIDENT_NUMBER',
							description: 'An identifier for the patient transport journey when the patient arrived at hospital by Ambulance.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ATTENDANCE_SOURCE_ORGANISATION',
							description:
								'ORGANISATION SITE IDENTIFIER (EMERGENCY CARE ATTENDANCE SOURCE) is the ORGANISATION IDENTIFIER of the Organisation Site from which a PATIENT arrived at an Emergency Care Department.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ARRIVAL_MODE_VALID_APPROVED',
							description: 'Tests if the Arrival Mode Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ATTENDANCE_SOURCE_VALID_APPROVED',
							description: 'Tests if the Attendance Source Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ARRIVAL_MODE',
							description:
								'EMERGENCY CARE ARRIVAL MODE (SNOMED CT) is the SNOMED CT concept ID which is used to identify the transport mode by which the PATIENT arrived at the Emergency Care Department.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'TREATMENT_FUNCTION_CODE',
							description:
								'ACTIVITY TREATMENT FUNCTION CODE (DECISION TO ADMIT) is the TREATMENT FUNCTION CODE of the SERVICE to which a PATIENT is to be admitted.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DECIDED_TO_ADMIT_TIME',
							description: 'The time a decision to admit was made.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'CONCLUSION_DATE',
							description:
								"An Accident and Emergency Attendance Conclusion Date is the date that a PATIENT's Accident and Emergency Attendance concludes or when treatment in the Accident and Emergency Department is completed, whichever is the later For those PATIENTS admitted into hospital, the ACCIDENT AND EMERGENCY ATTENDANCE CONCLUSION DATE is recorded as the date when the DECISION TO ADMIT was made.",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'SEEN_DATE',
							description:
								'Accident and Emergency Date Seen For Treatment is the date, that the PATIENT is seen by a clinical decision maker (someone who can define the management plan and discharge the PATIENT) to diagnose the problem and arrange or start definite treatment as necessary.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ARRIVAL_TIME',
							description: 'The time (HH:MM:SS) at which the patient arrived in A&E.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ARRIVAL_DATE',
							description: 'The date on which the patient arrived in Accident and Emergency.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ASSESSMENT_DATE',
							description: 'This records the date when the PATIENT is first assessed in the Accident and Emergency Department.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ATTENDANCE_SOURCE',
							description:
								'EMERGENCY CARE ATTENDANCE SOURCE (SNOMED CT) is the SNOMED CT concept ID which is used to indicate the source of an Emergency Care Attendance.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DECIDED_TO_ADMIT_DATE',
							description:
								'DECIDED TO ADMIT DATE is the same as attribute DECIDED TO ADMIT DATE. DECIDED TO ADMIT DATE may be the same as the date of admission (e.g. most emergency admissions). Alternatively, a decision can be made to admit at a future date. This decision denotes that the PATIENT is intended to be admitted to a Hospital Bed, either immediately or subsequently in the future. It records the event that a clinical DECISION TO ADMIT a PATIENT to a Hospital Bed has been made by or on behalf of someone, who has the right of admission to a Hospital Provider.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DEPARTURE_DATE',
							description:
								'An Accident and Emergency Departure Date is the date that a PATIENT leaves an Accident and Emergency Department after an Accident and Emergency Attendance has concluded.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ASSESSMENT_TIME',
							description: 'The time (HH:MM:SS) at which the A&E Initial Assessment was made.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'SEEN_TIME',
							description: 'The time (HH:MM:SS) at which the patient was seen for treatment.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ATTENDANCE_IDENTIFER',
							description:
								'A number allocated by an Accident and Emergency Department to provide a unique identifier for each Accident and Emergency Attendance.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DEPARTURE_TIME',
							description: 'The time (HH:MM:SS) at which the patient departed A&E.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'CONVEYING_AMBULANCE_TRUST',
							description: 'The organisation code of the conveying ambulance trust, if specified.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Birth and Age',
					description: 'Birth and Age',
					elements: [
						{
							domainType: null,
							label: 'HES_AGE_AT_DEPARTURE',
							description:
								'The age of the patient on the record end date. The maximum value output is 120. If the patient is older than 1 year, a calculation is made by dividing the number of days from the Date of Birth by 365.25 to determine the age in years, otherwise the age is returned as an age range code between 7001 and 7007:',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'AGE_AT_CDS_ACTIVITY_DATE',
							description: 'The age in years of the patient derived by the sender as at the relevant CDS activity date of the CDS type.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'AGE_AT_ARRIVAL',
							description:
								'Age at Start of Episode derived from submitted date of birth and episode start date (defaults to age at CDS activity date if no DOB submitted).',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'BIRTH_DATE',
							description: 'The date of birth of the patient the record refers to.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'HES_AGE_AT_ARRIVAL',
							description:
								'The age of the patient on the record start date. The maximum value output is 120. If the patient is older than 1 year, a calculation is made by dividing the number of days from the Date of Birth by 365.25 to determine the age in years, otherwise the age is returned as an age range code between 7001 and 7007:',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PATIENT_TYPE',
							description: 'Could also be interpreted as Age Band.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'BIRTH_YEAR',
							description: "The year component of the person's date of birth.",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'AGE_RANGE',
							description:
								'The age range of the patient derived from either the A&E Arrival Date, the OP Appointment Date, the Episode Start Date or the Delivery Date. The values are representative of age ranges in 5 year increments:',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'BIRTH_MONTH',
							description: 'The month component of the person\'s date of birth e.g "07" meaning July.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Patient Pathway',
					description: 'Patient Pathway',
					elements: [
						{
							domainType: null,
							label: 'PERIOD_START_DATE',
							description:
								'This is that date of one of a variety of events that starts the referral to treatment clock calculation, for example the initial referral date or the failed to attend clinic date.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'WAITING_TIME_MEASUREMENT_TYPE',
							description: 'The type of waiting time measurement methodology which may be applied during a patient pathway.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'UBRN',
							description:
								'The unique booking reference number is assigned by the choose and book system and where recorded can be used to tie together all of the treatments and visits associated with a single referral.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ORGANISATION_CODE_UBRN',
							description:
								'This is the code of the organisation that assigned the Patient Pathway Identifier. Patient Pathway Identifiers are not necessarily unique across hospitals, the addition of the organisation code ensures uniqueness.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PERIOD_LENGTH',
							description:
								'The total time of the subject referral to treatment period calculated by subtracting the Referral To Treatment Period Start Date from the Referral To Treatment Period End Date (in whole days). Both fields are submitted data.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ORGANISATION_CODE_PATIENT_PATHWAY_IDENTIFIER',
							description:
								'This is the code of the organisation that assigned the Patient Pathway Identifier. Patient Pathway Identifiers are not necessarily unique across hospitals, the addition of the organisation code ensures uniqueness.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PATIENT_PATHWAY_IDENTIFIER',
							description:
								'This is the unique identifier that may be used to tie all treatments within the single care pathway together. It may be absent when Unique Booking Reference Number is present or it may be the same as the Unique Booking Reference Number.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PERIOD_STATUS',
							description:
								"One of a set of defined codes that indicates this treatment's position within a referral to treatment period or the fact that this treatment is not part of a referral to treatment measured pathway.",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PERIOD_END_DATE',
							description:
								'This should indicate the end date of a referral to treatment clock calculation; it may be when the first definite treatment started or when another relevant stopping event occurred.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'System Data',
					description: 'System Data',
					elements: [
						{
							domainType: null,
							label: 'PRIME_RECIPIENT',
							description:
								'The mandatory NHS Organisation Code (or valid Organisation Data Service Default Code) representing the Organisation determined to be the Commissioning Data Set Prime Recipient of the Commissioning Data Set Message as indicated in the Commissioning Data Set Addressing Grid. Where appropriate, the following ODS Default code may be used:',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INTERCHANGE_SENDER',
							description: 'The assigned EDI Address of the physical Organisation or site responsible for sending Commissioning data.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Commissioning',
					description: 'Commissioning',
					elements: [
						{
							domainType: null,
							label: 'REGISTRATION_ENTRY_ID',
							description: 'The registration identifier allocated by the professional body.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'MARKET_FORCES_ADJUSTMENT',
							description: 'The increment to the overall price attributable to application of the Market Forces Factor adjustment.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PROVIDER_REFERENCE_NUMBER',
							description:
								'This is locally defined between the provider and the Commissioner. it is a free text field that may contain letters, numbers or other keyboard symbols for use within a Commissioning Data Set.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'TARIFF',
							description:
								'The national tariff appropriate for either the spell (APC), the appointment (OP) or the attendance (EM). The primary driver is the spell core HRG but this could be modified by:',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'CODE_CLEANING_APPLIED',
							description: 'Signifies whether relevant clinical codes in the record have been cleaned before submission to grouping.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'FINAL_PRICE',
							description: 'This field contains the final calculated national price. The derivation calculations are as follows:',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'TARIFF_DESCRIPTION',
							description:
								'This field will be populated with a string that details which of the possible tariffs has been applied as PbR Final Tariff. It also deals with identifying Best Practice tariffs.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'COSTING_PERIOD',
							description:
								'This returns a formatted costing period, e.g. "M01 - Apr 2016". It is derived from the date of the activity and is the calendar month when payment falls due: For Admitted Patient Care records the date used is the Hospital Discharge Date for the completed spell; for Other Deliveries it is the Delivery Date for Outpatients it is the Appointment Date for Emergency Medicine it is the Arrival Date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'COMMISSIONING_SERIAL_NUMBER',
							description:
								'A code agreed between the provider and the commissioner that indicates the commissioning contract line or other local commissioning granularity to aid commissioning discussion. If it begins with an "=" sign, this indicates that the record is excluded from the national tariff and a local agreement for the activity is in place, this activity will not be given a PbR price.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'LINE_NUMBER',
							description:
								'An optional locally defined identifier that may contain letters, numbers or other keyboard symbols that is used to specify the specific line of a contract or service agreement that the record belongs to.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'HAS_DISCHARGE_RESPONSIBILITY',
							description:
								'An indication of whether a care professional is responsible for discharge of the patient from an emergency care attendance.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'MARKET_FORCES_FACTOR',
							description: 'The MFF adjustment factor applied to the price calculation.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'EXCLUDED',
							description:
								'Signifies whether the record is nationally priced or not. Normally, a record is excluded from national pricing for defined reasons - see the Exclusion Reason field of the record for those reasons.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'EXCLUSION_REASONS',
							description: 'This field contains one of the reasons as to why the record/spell is excluded from national pricing.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'REGISTRATION_ISSUER_CODE',
							description: 'Code identifying the Professional Registration Body.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'GROUPER_VERSION',
							description:
								'This shows which version of the Healthcare Resource Group (HRG) algorithm was used to assign an HRG to the activity.  It will typically show the type of grouper and the year it was in use, eg P1617 refers to the Local Payment grouper used in financial year 2016-1017.  Other types of grouper include the Engagement grouper and the Consultation grouper - these are not currently used by SUS.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'COMMISSIONER_REFERENCE_NUMBER',
							description:
								'This is locally defined between the provider and the Commissioner. it is a free text alphanumeric field for use within a Commissioning Data Set.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'CARE_PROFESSIONAL_TIER',
							description:
								'The tier of care professional treating the patient during an Emergency Care Attendance. The care professional tiers for emergency care are defined in the Royal College of Emergency Medicine Guidelines for Medical and Practitioner Staffing in Emergency Departments. See the Royal College of Emergency Medicine website.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'SHA_COMMISSIONER',
							description:
								"This represents the current NHS England Region code or Non-English Commissioner organisation. It is found in Organisation Data Service (ODS) data using the Clinical Commissioning Group (CCG) code associated with the patient's GP practice code registered in the Personal Demographic Service (PDS).",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Organisation data',
					description: 'Organisation data',
					elements: [
						{
							domainType: null,
							label: 'CANCER_REGISTRY',
							description:
								'The cancer registry that each postcode falls within. A pseudo code is included for Scotland, Northern Ireland, Channel Islands and Isle of Man.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'SITE',
							description:
								'The Organisation Site within the Organisation on which the PATIENT was treated, since facilities may vary on different hospital sites.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'RESIDENCE_CCG_FROM_PATIENT_POSTCODE',
							description:
								'The CCG (formerly PCT) of residence looked up in Organisation Data Service (ODS) reference data either from the postcode found in Personal Demographics Service (PDS) data against the submitted NHS Number or directly from the postcode value submitted as no PDS value was found.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DEPARTMENT_TYPE',
							description: 'The department type in which the PATIENT was treated',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'SHA_PROVIDER',
							description:
								'This represents Either the historical parent SHA of  Provider or the current LAT (Local Area Team) of  provider. It is found in Organisation Data Service (ODS) data using the submitted Provider Code.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PROVIDER_POSTCODE_DISTRICT',
							description:
								'This is effectively the outward (leading) part of the postcode of the submitted Provider Code as found in Organisation Services Data. It is formed by removing the last three characters from the postcode value which has first been trimmed to remove non-alphanumeric characters such as spaces.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'RESIDENCE_CCG',
							description:
								"Organisation Code (Residence Responsibility) is the Organisation Code derived from the patient's postcode of usual address, where they reside  within the boundary of a:",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Clinical Injury',
					description: 'Clinical Injury',
					elements: [
						{
							domainType: null,
							label: 'INJURY_INTENT_VALID_APPROVED',
							description: 'Tests if the Injury Intent Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INJURY_MECHANISM',
							description:
								'EMERGENCY CARE INJURY MECHANISM (SNOMED CT) is the SNOMED CT concept ID which is used to identify how an injury was caused.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INJURY_ACTIVITY_TYPE_VALID_APPROVED',
							description: 'Tests if the Injury Activity Type is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PLACE_OF_INJURY_LONGITUDE',
							description:
								'EMERGENCY CARE PLACE OF INJURY (LONGITUDE) is the longitude of the EMERGENCY CARE PLACE OF INJURY (SNOMED CT), expressed in decimal degrees.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PLACE_OF_INJURY',
							description:
								'EMERGENCY CARE PLACE OF INJURY (SNOMED CT) is the SNOMED CT concept ID which is used to identify the type of LOCATION at which the PATIENT was present when the injury occurred.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INJURY_ACTIVITY_STATUS',
							description:
								'EMERGENCY CARE INJURY ACTIVITY STATUS (SNOMED CT) is the SNOMED CT concept ID which is used to identify the status of activity being undertaken by the PATIENT when the injury occurred.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INJURY_MECHANISM_VALID_APPROVED',
							description: 'Tests if the Injury Mechanism is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PLACE_OF_INJURY_VALID_APPROVED',
							description: 'Tests if the Place Of Injury Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PLACE_OF_INJURY_LATITUDE',
							description:
								'EMERGENCY CARE PLACE OF INJURY (LATITUDE) is the latitude of the EMERGENCY CARE PLACE OF INJURY (SNOMED CT), expressed in decimal degrees.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INJURY_ACTIVITY_STATUS_VALID_APPROVED',
							description: 'Tests if the Injury Activity Status Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INJURY_TIME',
							description: 'An Injury Time is an ACTIVITY DATE TIME.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DRUG_ALCOHOL_CODE_VALID_APPROVED',
							description: 'Tests if the Alcohol Drug Involvement Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INJURY_INTENT',
							description:
								'EMERGENCY CARE INJURY INTENT (SNOMED CT) is the SNOMED CT concept ID which is used to identify the most likely human intent in the occurrence of the injury or poisoning as assessed by the CARE PROFESSIONAL.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INJURY_ACTIVITY_TYPE',
							description:
								'EMERGENCY CARE INJURY ACTIVITY TYPE (SNOMED CT) is the SNOMED CT concept ID which is used to identify the type of activity being undertaken by the PERSON at the moment the injury occurred.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INJURY_DATE',
							description: 'An Injury Date is an ACTIVITY DATE TIME.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DRUG_ALCOHOL_CODE',
							description:
								'EMERGENCY CARE INJURY ALCOHOL OR DRUG INVOLVEMENT (SNOMED CT) is the SNOMED CT concept ID which is used to identify any drugs or alcohol used by the PATIENT, which are thought likely to have contributed to the need to attend the Emergency Care Department.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Provider',
					description: 'Provider',
					elements: [
						{
							domainType: null,
							label: 'PROVIDER_CODE',
							description:
								'The Organisation Code of the Organisation acting as a Health Care Provider as issued by the Organisation Data Service (ODS). This field represents the organisation receiving payment for the associated activity. The value of this field is unaltered and is exactly as it was received in the CDS interchange.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PROVIDER_CODE_DERIVED',
							description:
								"The Organisation Code of the Organisation acting as a Health Care Provider as issued by the Organisation Data Service (ODS). This field represents the organisation receiving payment for the associated activity. The value is the Provider Code reason for access to data held on user smart cards and is used for item 'Reason Access Provided'.",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'nhs number',
					description: 'nhs number',
					elements: [
						{
							domainType: null,
							label: 'NHS_NUMBER',
							description: 'The NHS Number of the patient the record refers to.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'NHS_NUMBER_STATUS_INDICATOR_CODE',
							description:
								'This is a flag that indicates if the NHS Number of the patient has been traced by the sender against the tracing service e.g.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Clinical Investigations',
					description: 'Clinical Investigations',
					elements: [
						{
							domainType: null,
							label: 'INVESTIGATIONS_VALID_APPROVED',
							description: 'Tests if the Investigation Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INVESTIGATION_CODE',
							description: 'The recorded investigation in SNOMED CT format.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INVESTIGATION_DATE',
							description:
								'The date on which investigations were performed while the person was under the care of the emergency care facility.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INVESTIGATION_TIME',
							description:
								'The time at which investigations were performed while the person was under the care of the emergency care facility.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Healthcare resource groups (HRG) data',
					description: 'Healthcare resource groups (HRG) data',
					elements: [
						{
							domainType: null,
							label: 'HEALTH_RESOURCE_GROUP',
							description: 'The core HRG derived by SUS - as a result of HRG grouping - and used for tariff application.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Mental Health Act',
					description: 'Mental Health Act',
					elements: [
						{
							domainType: null,
							label: 'EXPIRY_TIME',
							description: 'The time when a MHA Legal Status Classification for a patient expires.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'EXPIRY_DATE',
							description: 'The date when a MHA Legal Status Classification for a patient expires.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'START_TIME',
							description: 'The start time of the MHA Legal Status Classification Assignment Period.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'START_DATE',
							description: 'The start date of the MHA Legal Status Classification Assignment Period.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'CLASSIFICATION',
							description: 'A code which identifies the MHA Legal Status Classification.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Pre-order data fields',
					description: 'Pre-order data fields',
					elements: [
						{
							domainType: null,
							label: 'DIAGNOSIS_FIRST',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates if this Diagnosis is the primary diagnosis as indicated by the provider.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'RECORD_IDENTIFIER',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  This is a record identifier that is created by the HES system. The digits store a decimal number. This is commonly eight or nine digits but can be up to 14.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Number',
							},
						},
						{
							domainType: null,
							label: 'LSOA_SITE_OF_TREATMENT_DISTANCE_ORIGIN',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  The HES origin code which indicates the origin of the LSOA site of treatment Distance',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'OA_11',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  The 2011 Census Output Areas in GB and SAs in Northern Ireland were based on 2001 Census OAs, and they form the building bricks for defining higher level geographies.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DIAGNOSIS_IS_APPLICABLE_TO_FEMALES',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates if the diagnosis is applicable to females',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'TOKEN_PERSON_ID',
							description:
								'This field contains a unique identifier for each individual patient. \n\nThis allows an individual’s care to be tracked across years and continuous periods to be identified',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Nvarchar',
							},
						},
						{
							domainType: null,
							label: 'CONCLUSION_TIME_SINCE_ARRIVAL',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates waiting time in minutes between from arrival to seen for treatment or attendance conclusion, whichever is greater. If arrival datetime missing, or if neither seen_for_treatment or attendance_conclusion exists, or if the longest calculated duration is less than 0 then derivation result is Null',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'SNOMED_VERSION_NUMBER',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates the Snomed CT reference data version number',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'NHS_NUMBER_IS_VALID',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  This is a flag that indicates if the NHS Number meets validity criteria:',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'LSOA_SITE_OF_TREATMENT_DISTANCE',
							description:
								"NOTE: data currently not populated; you may pre-order this field for future extracts.  The distance between the LSOA centroid of the patient's submitted postcode and the LSOA centroid of the site of treatment.",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DIAGNOSIS_IS_ALLERGY_RELATED',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates if the diagnosis is allergy related',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DIAGNOSIS_QUALIFIER_IS_APPROVED',
							description:
								"NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates if Diagnosis Qualifier SNOMED CT code is approved by the Royal College of Emergency Medicine for use in the Emergency Care Data Set. 'True' indicates approval 'False' indicates a code was submitted but cannot be provided in the extract and the corresponding code column on that line will be blank.",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'CCG_FROM_GP_PRACTICE',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  The derived CCG using the GP Practice in the CDS record',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DIAGNOSIS_IS_APPLICABLE_TO_MALES',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates if the diagnosis is applicable to males',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DIAGNOSIS_IS_INJURY_RELATED',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates if the diagnosis is injury related',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DIAGNOSIS_IS_AEC_RELATED',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates if the diagnosis is AEC related',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INITIAL_ASSESSMENT_TIME_SINCE_ARRIVAL',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates waiting time in minutes from arrival to initial assessment Derived Column - Use Time difference between Arrival_date, Arrival_Time and initial_assessment_date , initial_assessment_time Return - Number in int format (Only the Minutes part ignore the seconds or fraction If either of the submitted element is missing then derivation result is Null',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'RESPONSIBLE_CCG_FROM_GP_PRACTICE_ORIGIN',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  The HES origin code which indicates the origin of the HESCCGResponsibleValue',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DIAGNOSIS_IS_NOTIFIABLE_DISEASE',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates if the diagnosis is a notifiable disease',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PLANNED_ARRIVAL',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates whether attendance was planned or unplanned, derived by checking if Attendance Category is 2.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'FRACTIONAL_AGE_AT_ARRIVAL',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  The age of the patient on the record start date. The maximum value output is 120. If the patient is older than 1 year, a calculation is made by dividing the number of days from the Date of Birth by 365.25 to determine the age in years, otherwise the age is returned as an age in fraction:',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'UNIQUE_IDENTIFER',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  System generated identifier which uniquely identifies an attendance.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'CCG_FROM_PATIENT_POSTCODE',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  The derived CCG using the patient postcode in the CDS record',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'LSOA_PROVIDER_DISTANCE',
							description:
								"NOTE: data currently not populated; you may pre-order this field for future extracts.  The distance between the LSOA centroid of the patient's submitted postcode and the LSOA centroid of the provider.",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'LSOA_PROVIDER_DISTANCE_ORIGIN',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  The HES origin code which indicates the origin of the LSOA Provider Distance',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'CCG_FROM_SITE_CODE',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  The derived CCG using the Treatment Site, or failing that, the Provider Code in the CDS record.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DEPARTURE_TIME_SINCE_ARRIVAL',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates waiting time in minutes between from arrival to Departure Derived Column - Use Time difference between Arrival_date, Arrival_Time and departure_date , departure_time Return - Number in int format (Only the Minutes part ignore the seconds or fraction If either of the submitted element is missing then derivation result is Null',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'CCG_FROM_SITE_CODE_ORIGIN',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  The HES origin code which indicates the origin of the HESCCGFromTreatmentSiteValue',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'SEEN_FOR_TREATMENT_TIME_SINCE_ARRIVAL',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates waiting time in minutes between from arrival to seen for treatment Derived Column - Use Time difference between Arrival_date, Arrival_Time and date_seen_for_treatment , time_seen_for_treatment Return - Number in int format (Only the Minutes part ignore the seconds or fraction If either of the submitted element is missing then derivation result is Null',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ARRIVAL_MONTH',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  The month on which the patient arrived in Emergency Care.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'LSOA_2011',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  A Lower Layer Super Output Area (LSOA) is a GEOGRAPHIC AREA. Lower Layer Super Output Areas are a geographic hierarchy designed to improve the reporting of small area statistics in England and Wales. Lower Layer Super Output Areas are built from groups of contiguous Output Areas and have been automatically generated to be as consistent in population size as possible, and typically contain from four to six Output Areas. The Minimum population is 1000 and the mean is 1500. There are 32,844 Lower-layer Super Output Areas (LSOAs) in England. They were produced by the Office for National Statistics for the reporting of small area statistics.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'RESPONSIBLE_CCG_FROM_PRACTICE',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  This is the Clinical Commissioning Group (CCG) code found in Organisation Data Service (ODS) reference data associated with the practice code for the patient as registered in the Personal Demographic Service (PDS). If no entry is found on PDS then the submitted value for GP Practice is used.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'CHIEF_COMPLAINT_IS_INJURY_RELATED',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates if the Chief Complaint is injury related',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'MSOA_11',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  The 2011 Census MSOA code for England and Wales and IZ code for Scotland. Pseudo codes are included for Northern Ireland, Channel Islands and Isle of Man.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'RESPONSIBLE_CCG_FROM_GP_PRACTICE',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  The derived CCG using the first available valid CCG derivation from input values from the CDS record. GP Practice, Patient Postcode, Treatment Site, Provider Code, in that order.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DECISION_TO_ADMIT_TIME_SINCE_ARRIVAL',
							description:
								'NOTE: data currently not populated; you may pre-order this field for future extracts.  Indicates waiting time in minutes from arrival to the time the decision was made to admit the patient.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'GP',
					description: 'GP',
					elements: [
						{
							domainType: null,
							label: 'PRACTICE_CODE_PATIENT_REGISTRATION',
							description:
								'The organisation code of the GP Practice that the patient is registered with. The code before testing against reference files. In the event that an organisation code cannot be given, the ODS default codes must be used. The ODS default codes used are:',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PDS_GENERAL_PRACTICE',
							description:
								"This is the patient's GP Practice Code as registered in the Personal Demographic Service (PDS) found by using the submitted value of NHS Number",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'GENERAL_MEDICAL_PRACTITIONER',
							description:
								'This is the submitted value of General Medical Practitioner (Specified) which is the PPD (NHS Prescription Services) code for the General Medical Practitioner specified by the patient.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Diagnosis',
					description: 'Diagnosis',
					elements: [
						{
							domainType: null,
							label: 'DIAGNOSIS_CODE',
							description: 'Recorded A&E diagnosis in SNOMED CT format.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DIAGNOSIS_QUALIFIER',
							description: 'The EC Diagnosis qualifier pertaining to the recorded diagnosis in SNOMED CT format.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'DIAGNOSIS_VALID_APPROVED',
							description: 'Tests if the Diagnosis Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'SEQUENCE_NUMBER',
							description: 'The sequence of the diagnosis in order of relevance to the emergency department attendance.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Patient Data',
					description: 'Patient Data',
					elements: [
						{
							domainType: null,
							label: 'ACCESSIBLE_INFORMATION_PROFESSIONAL_REQUIRED',
							description:
								'ACCESSIBLE INFORMATION PROFESSIONAL REQUIRED CODE (SNOMED CT) is the SNOMED CT concept ID which is used to identify that the PATIENT requires support from a communication professional.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'OVERSEAS_VISITOR_CHARGING_CATEGORY',
							description: 'The charging category relating to an overseas visitor at the time of the activity.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ACCOMMODATION_STATUS',
							description:
								'ACCOMMODATION STATUS (SNOMED CT) is the SNOMED CT concept ID which is used to identify the details of the ACCOMMODATION of the PERSON.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ETHNIC_CATEGORY',
							description:
								'A code that indicates the ethnicity of the patient, this is a value that the patients themselves specify. This field will be populated with an alphabetic value from A to Z; consult the NHS data dictionary link below for further details.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'LOCAL_PATIENT_IDENTIFER',
							description:
								'This is a person unique identifier from the sender. In the hospital it may relate to the notes number on a physical patient record or an identifier within the patient administration system.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PREFERRED_SPOKEN_LANGUAGE_VALID',
							description: 'Tests if the Preferred Spoken Language Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INTERPRETER_LANGUAGE',
							description:
								'INTERPRETER LANGUAGE (SNOMED CT) is the SNOMED CT concept ID which is used to record the LANGUAGE of the interpreter required by the PERSON.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'LPI_ORGANISATION_CODE',
							description: 'The organisation code of the organisation that assigned the Local Patient Identifier.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'INTERPRETER_LANGUAGE_VALID',
							description: 'Tests if the Interpreter Language Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'PREFERRED_SPOKEN_LANGUAGE',
							description:
								'PREFERRED SPOKEN LANGUAGE (SNOMED CT) is the SNOMED CT concept ID which is used to capture the preferred spoken LANGUAGE of the PERSON.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'STATED_GENDER',
							description: 'The stated gender of the patient. The codes to be submitted are as follows:',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ACCOMMODATION_STATUS_VALID',
							description: 'Tests if the Accommodation Status Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'WITHHELD_IDENTITY_REASON',
							description:
								'This field allows suppliers of Commissioning Data Set records to indicate to recipients of the record (for example, the Commissioner of the activity) that the record has been purposely anonymised for a valid reason. Values can be:',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ACCESSIBLE_INFORMATION_PROFESSIONAL_REQUIRED_VALID',
							description: 'Tests if the Accessible Information professional Required Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Referrer type',
					description: 'Referrer type',
					elements: [
						{
							domainType: null,
							label: 'SERVICE_REQUEST_TIME',
							description: 'The time the patient was referred to another service during an emergency care attendance.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'SERVICE_REQUEST_DATE',
							description: 'The date the patient was referred to another service during an emergency care attendance.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'REFERRED_TO_SERVICE',
							description: 'An inpatient service to which the patient was referred for admission or opinion by the treating clinician.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'REFERRED_TO_SERVICE_VALID_APPROVED',
							description: 'Tests if the Referred To Service Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'REFERRAL_ASSESSMENT_TIME',
							description: 'The time that a care professional from the referred to service assesses the patient.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'REFERRAL_ASSESSMENT_DATE',
							description: 'The date that a care professional from the referred to service assesses the patient.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'RECEIVING_SITE',
							description:
								'ORGANISATION SITE IDENTIFIER (DISCHARGE FROM EMERGENCY CARE) is the ORGANISATION IDENTIFIER of the Organisation Site to which a PATIENT is discharged following an Emergency Care Attendance.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Clinical',
					description: 'Clinical',
					elements: [
						{
							domainType: null,
							label: 'CHIEF_COMPLAINT',
							description:
								"EMERGENCY CARE CHIEF COMPLAINT (SNOMED CT) is the SNOMED CT concept ID which is used to indicate the nature of the PATIENT's chief complaint as assessed by the CARE PROFESSIONAL first assessing the PATIENT.",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'CHIEF_COMPLAINT_VALID_APPROVED',
							description: 'Tests if the Chief Complaint Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ACUITY',
							description:
								"EMERGENCY CARE ACUITY (SNOMED CT) is the SNOMED CT concept ID which is used to indicate the acuity of the PATIENT's condition on the Emergency Care Initial Assessment Date and Emergency Care Initial Assessment Time.",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'COMORBIDITIES',
							description: 'A record of whether a person has any of the NHS list of medical co-morbidities.',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'CHIEF_COMPLAINT_EXTENDED_CODE',
							description:
								"EMERGENCY CARE CHIEF COMPLAINT (Extended) is the Lorenzo concept ID which is used to indicate the nature of the PATIENT's chief complaint as assessed by the CARE PROFESSIONAL first assessing the PATIENT. This will only appear where code is different from EMERGENCY CARE CHIEF COMPLAINT (SNOMED CT) Group: ATTENDANCE OCCURRENCE ACTIVITY CHARACTERISTICS",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'COMORBIDITIES_VALID_APPROVED',
							description: 'Tests if the Comorbidity Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'ACUITY_VALID_APPROVED',
							description: 'Tests if the Acuity Code is approved on the activity_date',
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
				{
					domainType: null,
					label: 'Commissioning Organisation',
					description: 'Commissioning Organisation',
					elements: [
						{
							domainType: null,
							label: 'COMMISSIONER',
							description:
								"The Organisation Code of the Organisation commissioning health care as issued by the Organisation Data Service (ODS) and validated against reference data. The value is the Commissioner Code reason for access to data held on user smart cards and is used for item 'Reason Access Provided'. This value is submitted by the provider organisation and is subject to change on a given record as data is updated at source and resubmitted.",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
						{
							domainType: null,
							label: 'COMMISSIONER_DERIVED',
							description:
								"The Organisation Code of the Organisation commissioning health care as issued by the Organisation Data Service (ODS) and validated against reference data. The value is the Commissioner Code reason for access to data held on user smart cards and is used for item 'Reason Access Provided'. This value is submitted by the provider organisation and is subject to change on a given record as data is updated at source and resubmitted.",
							dataType: {
								domainType: 'PrimitiveType',
								label: 'Unspecified Type',
							},
						},
					],
				},
			],
			versionLinks: [
				{
					id: 'fe109086-172e-4f79-8dc3-9e7bc5f3bfe9',
					linkType: 'Superseded By',
					domainType: 'CatalogueSemanticLink',
					source: {
						id: '621008c7-67ac-4e3d-9c54-af87cc2f9579',
						domainType: 'DataModel',
						label: 'Emergency Care Data Set (ECDS)',
						documentationVersion: '3.0.0',
					},
					target: {
						id: 'bf563953-2293-4fb4-9842-61f7fdadea57',
						domainType: 'DataModel',
						label: 'Emergency Care Data Set (ECDS)',
						documentationVersion: '4.0.0',
					},
				},
				{
					id: '498716a8-ff1a-401c-bd97-69fece57f3fd',
					linkType: 'Superseded By',
					domainType: 'CatalogueSemanticLink',
					source: {
						id: '4bb4bf38-870b-47e5-b5d1-dc75b3d4ea6a',
						domainType: 'DataModel',
						label: 'Emergency Care Data Set (ECDS)',
						documentationVersion: '1.0.0',
					},
					target: {
						id: 'bf563953-2293-4fb4-9842-61f7fdadea57',
						domainType: 'DataModel',
						label: 'Emergency Care Data Set (ECDS)',
						documentationVersion: '4.0.0',
					},
				},
				{
					id: 'b4b0b5f0-286c-4813-b326-172d91cbd9f8',
					linkType: 'Superseded By',
					domainType: 'CatalogueSemanticLink',
					source: {
						id: '22f3773a-9157-40ad-8f3e-41feaa3be248',
						domainType: 'DataModel',
						label: 'Emergency Care Data Set (ECDS)',
						documentationVersion: '2.0.0',
					},
					target: {
						id: 'bf563953-2293-4fb4-9842-61f7fdadea57',
						domainType: 'DataModel',
						label: 'Emergency Care Data Set (ECDS)',
						documentationVersion: '4.0.0',
					},
				},
			],
			phenotypes: [],
		},
		pid: 'cf47edfe-169b-4ced-ab6e-30556026b124',
		id: 2169527243583722,
		datasetid: 'bf563953-2293-4fb4-9842-61f7fdadea57',
		type: 'dataset',
		activeflag: 'active',
		name: 'Emergency Care Data Set (ECDS)',
		description:
			"The Emergency Care Data Set (ECDS) is the national data set for urgent and emergency care. It replaced Accident & Emergency Commissioning Data Set (CDS type 010) and was implemented through: ECDS (CDS 6.2.2 Type 011). ECDS allows NHS Digital to provide information to support the care provided in emergency departments by including the data items needed to understand capacity and demand and help improve patient care.\n\nECDS Type 011 is better equipped to keep pace with the increasing complexity of delivering emergency care than its predecessor.  This means that the improved quality of data collected in emergency departments provides better support to healthcare planning and better-informed decision making on improvements to services. \n\nThis improved data helps improve understanding of:\n\nthe complexity and acuity of attending patients\nthe causes of rising demand\nthe value added by emergency departments.\nECDS also allows:\n\nthe capture of better diagnostic data to ensure an enhanced understanding of need, activity and outcomes\nconsistent monitoring of data across local and national initiatives\nsupport for injury surveillance, such that it will be possible to identify patterns that may be amenable to targeted interventions and improved public health.\nWhich in turn informs more effective and efficient resource deployment.\n\nPlease note, data can be submitted to the ECDS on a daily basis, however data extracts are made available via the DARS process on the second Thursday of each month, comprising provisional data for the full financial year up to and including the penultimate full month prior to the publication date. For example: Data for events that occurred 01/04/2020 to 31/10/2020 is made available via DARS extract on 10/12/2020.\n\nTimescales for dissemination of agreed data can be found under 'Our Service Levels' at the following link: https://digital.nhs.uk/services/data-access-request-service-dars/data-access-request-service-dars-process",
		datasetv2: {
			identifier: '',
			version: '',
			issued: '',
			modified: '',
			revisions: [],
			summary: {
				title: '',
				abstract:
					'The Emergency Care Data Set (ECDS) is a national data set providing information to support the care provided in emergency departments by including the data items needed to understand capacity and demand and help improve patient care.',
				publisher: {
					identifier: '',
					name: 'NHS DIGITAL',
					logo: '',
					description: '',
					contactPoint: 'enquiries@nhsdigital.nhs.uk',
					memberOf: 'ALLIANCE',
					accessRights: [],
					deliveryLeadTime: '',
					accessService: '',
					accessRequestCost: '',
					dataUseLimitation: [],
					dataUseRequirements: [],
				},
				contactPoint: 'enquiries@nhsdigital.nhs.uk',
				keywords: [
					'DIGITRIALS',
					'A&E',
					'ACCIDENT AND EMERGENCY',
					'ECDS',
					'NCS',
					'National Core Study',
					'URGENT AND EMERGENCY CARE',
					'UEC',
					'COVID-19',
				],
				alternateIdentifiers: [],
				doiName: '',
			},
			documentation: {
				description: '',
				associatedMedia: [
					'https://digital.nhs.uk/data-and-information/information-standards/information-standards-and-data-collections-including-extractions/publications-and-notifications/standards-and-collections/dcb0092-2062-commissioning-data-sets-emergency-care-data-set',
					'https://digital.nhs.uk/data-and-information/data-collections-and-data-sets/data-sets/emergency-care-data-set-ecds',
					'https://digital.nhs.uk/data-and-information/data-tools-and-services/data-services/emergency-care-data-set-ecds-data-quality',
					'https://digital.nhs.uk/services/data-access-request-service-dars/dars-guidance#guidance-on-applying-for-emergency-care-data-set-ecds-through-dars',
					'https://digital.nhs.uk/data-and-information/data-collections-and-data-sets/data-sets/emergency-care-data-set-ecds/ecds-latest-update#enhanced-tos',
				],
				isPartOf: 'NOT APPLICABLE',
			},
			coverage: {
				spatial: 'England',
				typicalAgeRange: '0-150',
				physicalSampleAvailability: ['NOT AVAILABLE'],
				followup: 'OTHER',
				pathway: 'Urgent and Emergency Care',
			},
			provenance: {
				origin: {
					purpose: ['CARE', 'ADMINISTRATIVE', 'FINANCIAL', 'OTHER'],
					source: 'EPR',
					collectionSituation: 'ACCIDENT AND EMERGENCY',
				},
				temporal: {
					accrualPeriodicity: 'MONTHLY',
					distributionReleaseDate: '',
					startDate: '2017-10-01',
					endDate: '',
					timeLag: '1-2 MONTHS',
				},
			},
			accessibility: {
				usage: {
					dataUseLimitation: 'NO RESTRICTION',
					dataUseRequirements: ['INSTITUTION SPECIFIC RESTRICTIONS', 'PROJECT SPECIFIC RESTRICTIONS', 'TIME LIMIT ON USE'],
					resourceCreator: 'NHS DIGITAL',
					investigations: ['https://digital.nhs.uk/services/data-access-request-service-dars/register-of-approved-data-releases'],
					isReferencedBy: [],
				},
				access: {
					accessRights: ['https://digital.nhs.uk/services/data-access-request-service-dars'],
					accessService:
						'Once your DARS application has been approved, data will be made available either by secure file transfer or through the Data Access Environment (DAE).\n\nSecure file transfer: https://digital.nhs.uk/services/transfer-data-securely\n\nDAE: https://digital.nhs.uk/services/data-access-environment-dae',
					accessRequestCost: 'https://digital.nhs.uk/services/data-access-request-service-dars/data-access-request-service-dars-charges',
					deliveryLeadTime: 'OTHER',
					jurisdiction: 'GB-ENG',
					dataProcessor: 'Not Applicable',
					dataController: 'NHS Digital',
				},
				formatAndStandards: {
					vocabularyEncodingScheme: ['SNOMED CT', 'NHS NATIONAL CODES', 'ODS'],
					conformsTo: ['LOCAL', 'NHS DATA DICTIONARY'],
					language: 'en',
					format: ['csv'],
				},
			},
			enrichmentAndLinkage: {
				qualifiedRelation: ['https://digital.nhs.uk/services/data-access-request-service-dars/register-of-approved-data-releases'],
				derivation: [
					'Data will be minimised as appropriate relative to the data access application\n\nAdditional information regarding derived fields available as part of requested extracts can be found at: https://digital.nhs.uk/data-and-information/data-collections-and-data-',
				],
				tools: ['https://digital.nhs.uk/data-and-information/data-collections-and-data-sets/data-sets/emergency-care-data-set-ecds'],
			},
			observations: [],
		},
		counter: 0,
		relatedresources: 0,
		updated: 1620774000000,
	},
];

export const relatedObjects = [
	{
		_id: '609ba78501be09484e0998ba',
		objectId: '9b7d2306-35e2-44a3-a97d-0b0e03a15336',
		reason: '',
		objectType: 'dataset',
		pid: 'e4e2aede-dee5-4faa-baf5-82fc1d27d33e',
		user: 'Lewis Kearsey',
		updated: '12 May 2021',
	},
];
