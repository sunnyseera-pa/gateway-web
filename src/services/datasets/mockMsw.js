import { rest } from 'msw';
import { apiURL } from '../../configs/url.config';

export const mswGetDataset = rest.get(`${apiURL}/datasets/0a048419-0796-46fb-ad7d-91e650a6c742`, (req, res, ctx) => {
	return res(
		ctx.status(200),
		ctx.json({
			success: true,
			isLatestVersion: true,
			isDatasetArchived: false,
			data: {
				categories: {
					programmingLanguage: [],
				},
				tags: {
					features: ['COVID-19', 'TRACKER', 'SAIL', 'COVID', 'MOBILE APP', 'CORONAVIRUS', 'SYMPTOM', 'NCS', 'National Core Study'],
					topics: [],
				},
				document_links: {
					doi: [],
					pdf: [],
					html: [],
				},
				datasetfields: {
					geographicCoverage: ['Great Britain'],
					physicalSampleAvailability: ['NOT AVAILABLE'],
					technicaldetails: [
						{
							label: 'DF_ZOE_ALF',
							description:
								'The ZOE_ALF table is exclusively for national emergency response for COVID-19.\n\nData about the patients registered to use the ZOE symtom tracker app.\nSpecifically including the anonymised linking field (ALF) using the split file anonymisation and probabilistic matching.\nThis enables this ZOE_ALF table to be linked to other tables within the SAIL databank.',
							elements: [
								{
									label: 'ALF_MATCH_PCT',
									description: 'Match percentage assigned when deriving the Encrypted Anonymised Linking Field.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'double',
									},
								},
								{
									label: 'LSOA2011_CD',
									description: 'Lower Layer Super Output Area Code of the individual. For the current version of LSOA codes (2011).',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ALF_E',
									description:
										'The Anonymised Linking Field, which has been Encrypted for its use within the database, is derived from the persons NHS number by double encryption (first encryption occurs in NWIS and the second in SAIL). If the NHS number is not supplied in the data extract then matching methods are applied.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'bigint',
									},
								},
								{
									label: 'ID_E',
									description: 'Unique patient ID.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'bigint',
									},
								},
								{
									label: 'SEX',
									description: 'The sex (gender) of the individual.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'smallint',
									},
								},
								{
									label: 'YR_OF_BIRTH',
									description: 'The year of birth of the individual.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'integer',
									},
								},
								{
									label: 'ALF_STS_CD',
									description: 'Status code assigned when deriving the Encrypted Anonymised Linking Field.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'integer',
									},
								},
								{
									label: 'AVAIL_FROM_DATE',
									description: 'Date when the data made available i.e. date of loading.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'date',
									},
								},
							],
						},
						{
							label: 'DF_COVID_TEST',
							description: 'Covid test data',
							elements: [
								{
									label: 'RESULT',
									description: 'Indicates the result of the covid test.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'VERSION',
									description: 'Version of the app this record was created on.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ID_E',
									description: 'Unique covid test ID.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'bigint',
									},
								},
								{
									label: 'UPDATED_AT',
									description: 'UTC timestamp at which this covid test level data was most recently updated.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PATIENT_ID_E',
									description: 'Unique patient ID.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'bigint',
									},
								},
								{
									label: 'TRAINED_WORKER',
									description: 'Indicates if a trained worker performed the covid test.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'TYPE',
									description: 'Indicates the type of covid test the individual had.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DATE_TAKEN_BETWEEN_END',
									description: 'Indicates the end date of the window between which the individual had their covid test taken.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'timestamp',
									},
								},
								{
									label: 'DATE_TAKEN_SPECIFIC',
									description: 'Indicates the specific date the individual had their covid test taken.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'timestamp',
									},
								},
								{
									label: 'COUNTRY_CODE',
									description: 'Country code of the individual. Can take values GB or US only.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'INVITED_TO_TEST',
									description: 'Indicates if the indidivual was invited to the covid test.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'AVAIL_FROM_DATE',
									description: 'Date when the data made available i.e. date of loading.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'date',
									},
								},
								{
									label: 'CREATED_AT',
									description: 'UTC timestamp at which this covid test level data was created.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'LOCATION',
									description: 'Indicates the location of the covid test.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DELETED',
									description: 'Indicates if the covid test has been deleted.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'TIME_OF_TEST',
									description: 'Indicates the time the individual had their covid test taken.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DATE_TAKEN_BETWEEN_START',
									description: 'Indicates the start date of the window between which the individual had their covid test taken.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'timestamp',
									},
								},
							],
						},
						{
							label: 'DF_PATIENTS',
							description: 'Patient level data',
							elements: [
								{
									label: 'YEAR_OF_BIRTH',
									description:
										'Year of birth of the individual. \nExport is anonymised by rounding upwards to 5 years - effectively age rounded down.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'double',
									},
								},
								{
									label: 'LAST_ASKED_LEVEL_OF_ISOLATION',
									description: 'Indicates how much the individual had been isolating the last time they were asked.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'VS_ASKED_AT',
									description: 'Vitamins and Supplements: Indicates when the indiviual was asked about vitamins and supplements.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIET_CHANGE',
									description: 'Indicates the individuals diet change since lockdown.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAS_HAYFEVER',
									description: 'Indicates if the individual has hayfever.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAVE_WORKED_IN_HOSPITAL_CARE_FACILITY',
									description:
										'Indicates if the individual has physically worked in a nursing home, in elderly care or in a group care facility since the COVID-19 epidemic began.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAS_KIDNEY_DISEASE',
									description: 'Indicates if the individual has kidney disease.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'VS_PFNTS',
									description:
										'Vitamins and Supplements: Indicates if the indiviual would prefer not to say whether or not they have been taking vitamins or supplements regularly (more than 3 times a wek on average) for more than 3 months.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_TREATMENT_OTHER_ORAL',
									description:
										'For individuals with diabetes. Indicates if the individual uses an other type of oral treatment as a diabetes treatment.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'EVER_HAD_COVID_TEST',
									description: 'Indicates if the individual has ever had a covid test.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'SNACKING_CHANGE',
									description: 'Indicates the individuals snacking change since lockdown.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_ORAL_MEGLITINIDES',
									description:
										'For individuals with diabetes. Indicates if the individual uses meglitinides as an oral diabetes treatment.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAS_ECZEMA',
									description: 'Indicates if the individual has eczema.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAS_DIABETES',
									description: 'Indictaes if the individual has diabetes',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'VS_GARLIC',
									description:
										'Vitamins and Supplements: Indicates if the indiviual has been taking Garlic regularly (more than 3 times a wek on average) for more than 3 months.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'CLASSIC_SYMPTOMS_DAYS_AGO',
									description: 'For individuals with classic symptoms. The number of days ago their symptoms started.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'integer',
									},
								},
								{
									label: 'DIABETES_ORAL_BIGUANIDE',
									description: 'For individuals with diabetes. Indicates if the individual uses biguanide as an oral diabetes treatment.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_UK_ASIAN',
									description: 'Indicates if the race of the individual is Asian British.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'VS_OMEGA_3',
									description:
										'Vitamins and Supplements: Indicates if the indiviual has been taking Omega-3 or fish oil regularly (more than 3 times a wek on average) for more than 3 months.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'VERSION',
									description: 'Version of the app this record was created on.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_TREATMENT_INSULIN_PUMP',
									description: 'For individuals with diabetes. Indicates if the individual uses an insulin pump as a diabetes treatment.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PAST_SYMPTOM_CHEST_PAIN',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app.  Indicates if they had chest pain.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_DIAGNOSIS_YEAR',
									description: 'For individuals with diabetes. Indicates the year they were diagnosed with diabetes.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'integer',
									},
								},
								{
									label: 'AVAIL_FROM_DT',
									description: 'Date when the data made available i.e. date of loading.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'date',
									},
								},
								{
									label: 'PAST_SYMPTOM_ANOSMIA',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app.  Indicates if they had anosmia.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ALREADY_HAD_COVID',
									description: 'Indicates if the individual thinks they have already had COVID-19, but were not tested.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_OTHER',
									description: 'Indicates if the race of the individual is different from the possible options provided.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'LIFESTYLE_VERSION',
									description: 'Indicates the individuals lifestyle version.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAVE_WORKED_IN_HOSPITAL_INPATIENT',
									description:
										'Indicates if the individual has physically worked in a hospital inpatient department since the COVID-19 epidemic began.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_UK_MIXED_WHITE_BLACK',
									description: 'Indicates if the race of the individual is Mixed White/ Black British.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAVE_USED_PPE',
									description:
										'Indicates if the individual has used personal protective equiptment (PPE) at work since the COVID-19 epidemic began.\nWhere depending on your specific work requirements, PPE might include gloves, masks, face sheilds, etc.\n\nCan take 3 values. Values and corresponding descriptions:\n- always // Always\n- sometimes //  Sometimes\n- never // Never\nThe maximum length of the value is 16.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PAST_SYMPTOMS_CHANGED',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app. Indicates whether or not their symptoms have changed.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAVE_WORKED_IN_HOSPITAL_OUTPATIENT',
									description:
										'Indicates if the individual has physically worked in a hospital outpatient department since the COVID-19 epidemic began.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PAST_SYMPTOM_SHORTNESS_OF_BREATH',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app.  Indicates if they had shortness of breath.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'TAKES_ASPIRIN',
									description: 'Indicates if the individual regularly takes aspirin, either baby aspirin or standard dose.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PAST_SYMPTOM_SKIPPED_MEALS',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app.  Indicates if they had skipped meals.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'NEED_INSIDE_HELP',
									description:
										'Indicates if the individual needs someone to help them on a regular basis, in which the help requires someone to come inside their house.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAVE_WORKED_IN_HOSPITAL_HOME_HEALTH',
									description: 'Indicates if the individual has physically worked in home health since the COVID-19 epidemic began.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'A1C_MEASUREMENT_PERCENT',
									description: 'For individuals with diabetes. Indicates their most recent HbA1c results as a percent.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'double',
									},
								},
								{
									label: 'HT_PROGESTONE_ONLY_PILL',
									description: 'Hormone Therapy: Indicates if the individual is taking an progestone only contraceptive pill.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PAST_SYMPTOM_DELIRIUM',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app.  Indicates if they had delirium.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAVE_WORKED_IN_HOSPITAL_SCHOOL_CLINIC',
									description: 'Indicates if the individual has physically worked in a school clinic since the COVID-19 epidemic began.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PROFILE_ATTRIBUTES_UPDATED_AT',
									description: 'UTC timestamp at which this patient level data was most recently updated.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HT_OESTROGEN_HORMONE_THERAPY',
									description: 'Hormone Therapy: Indicates if the individual is on oestrogen hormone treatment therapy.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'WEIGHT_CHANGE_KG',
									description: 'Indicated the individuals weight change in Kg since lockdown.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'double',
									},
								},
								{
									label: 'VS_ZINC',
									description:
										'Vitamins and Supplements: Indicates if the indiviual has been taking Zinc regularly (more than 3 times a wek on average) for more than 3 months.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'SOMETIMES_USED_SHORTAGE',
									description:
										"For individuals who have sometimes used PPE at work, since the start of the COVID-19 epidemic. Indicates whether:\n\nCan take 3 values. Values and corresponding descriptions:\n- all_needed // They haven't always needed PPE, but have had enough when they did\n- not_enough // They would have used PPE all the time, but they haven't had enough\n- reused // They've had to reuse PPE because of shortage\nThe maximum length of the value is 16",
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'SMOKER_STATUS',
									description:
										'Indicates the smoker status of the individual.\n\nCan take 3 values. Values and corresponding descriptions:\n- yes // Yes\n- not_currently // Not currently\n- never // Never',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'WEIGHT_CHANGE',
									description: 'Indicated the individuals weight change since lockdown.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAVE_WORKED_IN_HOSPITAL_OTHER',
									description:
										'Indicates if the individual has physically worked in any other health care facility (excluding hopsital inpatient; hospital outpatient; a clinic outside a hospital; a nursing home, elderly care or group care facilty; home health; a school clinic) since the COVID-19 epidemic began.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_UK_WHITE',
									description: 'Indicates if the race of the individual is White British.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'LSOA11CD',
									description: 'Lower Layer Super Output Area Code of the individual.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_USES_CGM',
									description: 'For individuals with diabetes. Indicates if the individual uses CGM as a diabetes treatment.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DOES_CHEMIOTHERAPY',
									description:
										'For an individual living with cancer. Indicates if the individual is on chemotherapy or immunotherapy for cancer.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_UK_CHINESE',
									description: 'Indicates if the race of the individual is British Chinese.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'CONTACT_HEALTH_WORKER',
									description: 'Inidcates if the individual is a health worker coming into contact with patients',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'IS_PREGNANT',
									description: 'Indictaes if the individual is pregnant.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HEALTHCARE_PROFESSIONAL',
									description:
										'Indicates if the individual is a health care worker (including hospital, elderly care or in the community).\nCan take three values. Values and corresponding descriptions:\n- yes_does_treat  // Yes, currently treat patients\n- yes_does_not_treat // Yes, do not currently treat patients\n- no // No\nThe maximum length of the value is 20.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'CLASSIC_SYMPTOMS',
									description:
										'Indicates if the individual has had the classic symptoms (high fever and persistent cough) for several days.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ETHNICITY',
									description: 'Indicates the ethnicity of the individual.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HT_PFNTS',
									description:
										'Hormone Therapy: Indicates if the individual would prefer not to say whether or not they are on hormone therapy.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_PREFER_NOT_TO_SAY',
									description: 'Indicates if the individual would prefer not to disclose their race.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'WEIGHT_CHANGE_POUNDS',
									description: 'Indicated the individuals weight change in pounds since lockdown.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'double',
									},
								},
								{
									label: 'HAS_HEART_DISEASE',
									description: 'Indictaes if the individual has heart disease.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_UK_MIXED_OTHER',
									description:
										'Indicates if the race of the individual is Mixed British, but different from the other Mixed British ethnicity options provided..',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_US_INDIAN_NATIVE',
									description: 'Indicates if the race of the individual is Indian Native American.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'NEVER_USED_SHORTAGE',
									description:
										"For individuals who have never used PPE at work, since the start of the COVID-19 epidemic. Indicates whether:\n\nCan take 2 values. Values and corresponding descriptions:\n- not_needed // They haven't needed PPE\n- not_available // They needed PPE, but it wasn't available\nThe maximum length of the value is 16",
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HEIGHT _CM',
									description: 'Height of the individual. Export is anonymised by rounding downwards to 10cm.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'double',
									},
								},
								{
									label: 'DIABETES_TREATMENT_PFNTS',
									description:
										'For individuals with diabetes. Indicates if the individual would prefer not to day whether or not they use diabetes treatment(s).',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PREGNANT_WEEKS',
									description: 'Indicates how many weeks the individual has been pregnant for.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'integer',
									},
								},
								{
									label: 'SMOKED_YEARS_AGO',
									description: 'Indicates the number of years since the individual last smoked.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'integer',
									},
								},
								{
									label: 'LIMITED_ACTIVITY',
									description: 'Indicates if the individual has any problems that require them to limit their activities.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_ORAL_SULFONYLUREA',
									description:
										'For individuals with diabetes. Indicates if the individual uses sulfonylurea as an oral diabetes treatment.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'UNWELL_MONTH_BEFORE',
									description: 'Indicates if the individual had been unwell in the month prior to signing up to the app.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PERIOD_FREQUENCY',
									description: "Indicates the individual's period frequency.",
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HOUSEBOUND_PROBLEMS',
									description: 'Indicates if the individual has any health problems that require them to stay at home.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'BMI',
									description: 'BMI of the individual.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'double',
									},
								},
								{
									label: 'PAST_SYMPTOM_FATIGUE',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app.  Indicates if they had fatigue.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PERIOD_STOPPED_AGE',
									description: "Indicates the indiviual's age when their period stopped.",
									dataType: {
										domainType: 'PrimitiveType',
										label: 'integer',
									},
								},
								{
									label: 'TAKES_BLOOD_PRESSURE_MEDICATIONS_PRIL',
									description:
										'Indicates if the individual is regularly taking blood pressure medications ending in -pril. Such as enalapril, lisinopril, captopril, ramipril.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'MOBILITY_AID',
									description: 'Indicates if the individual regularly uses a stick, walking frame or wheelchair to get about.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_TREATMENT_LIFESTYLE',
									description: 'For individuals with diabetes. Indicates if the individual uses lifestyle as a diabetes treatment.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HT_COMBINED_ORAL_CONTRACEPTIVE_PILL',
									description: 'Hormone Therapy: Indicates if the individual is taking a combined oral contraceptive pill.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ALWAYS_USED_SHORTAGE',
									description:
										'For individuals who have always used PPE at work, since the start of the COVID-19 epidemic. Indicates whether:\n\nCan take 2 values. Values and corresponding descriptions:\n- all_needed // They have had all the PPE they need for work\n- reused // They have had to reuse PPE because of shortage\nThe maximum length of the value is 16.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_TREATMENT_OTHER_INJECTION',
									description:
										'For individuals with diabetes. Indicates if the individual uses an other type of injection as a diabetes treatment.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HT_MIRENA_OR_OTHER_COIL',
									description: 'Hormone Therapy: Indicates if the individual has a mirena or other coil.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'NEEDS_HELP',
									description: 'Indicates if the individual needs someone to help them on a regular basis.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HT_HORMONE_TREATMENT_THERAPY',
									description: 'Hormone Therapy: Indicates if the individual is on hormone treatment therapy.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_ORAL_THIAZOLIDINEDIONES',
									description:
										'For individuals with diabetes. Indicates if the individual uses thiazolidinediones as an oral diabetes treatment.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAS_CANCER',
									description: 'Indicates if the individual is living with cancer.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_UK_MIDDLE_EASTERN',
									description: 'Indicates if the race of the individual is British Middle Eastern.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_UK_BLACK',
									description: 'Indicates if the race of the individual is Black British.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'TAKES_CORTICOSTEROIDS',
									description: 'Indicates if the individual regularly takes "NSAIDs". Such as ibuprofen, nurofen, diclofenac, naproxen.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'LADCD',
									description: 'Local Authority District Code of the individual.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'LSOA11NM',
									description: 'Lower Layer Super Output Area Name of the individual.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HELP_AVAILABLE',
									description: 'Indicates if the individual can count on someone close to them if they need help.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PERIOD_STATUS',
									description: "Indicates the individual's period status.",
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_ORAL_DPP4',
									description: 'For individuals with diabetes. Indicates if the individual uses DPP4 as an oral diabetes treatment.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'TAKES_BLOOD_PRESSURE_MEDICATIONS_SARTAN',
									description:
										'Indicates if the individual is regularly taking blood pressure medications ending in  -sartan. Such as losartan, valsartan, irbesartan.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_US_WHITE',
									description: 'Indicates if the race of the individual is White American.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HT_TESTOSTERONE_HORMONE_THERAPY',
									description: 'Hormone Therapy: Indicates if the individual is on testosterone hormone treatment therapy.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'REPORTED_BY_ANOTHER',
									description:
										'Indicates whether or not someone else is reporting on the behalf of the individual. Meaning that the individual is not self-reporting.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAS_LUNG_DISEASE',
									description: 'Indicates if the individual has lung disease or asthma.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'INTERACTED_WITH_COVID',
									description:
										'Indicates if the individual has EVER been exposed to someone with documented or presumed COVID-10 infection, such as co-workers, family members, or others. \n\nCan take 4 values. Values and corresponding descriptions:\n- yes_documented // Yes, documented COVID-19 cases\n- yes_suspected // Yes, both documented & suspected COVID-19 cases\n- yes_documented_suspected // Yes, presumed COVID-19 cases\n- no // Not that I know of',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ACTIVITY_CHANGE',
									description: 'Indicates the individuals activity change since lockdown.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PAST_SYMPTOM_ABDOMINAL_PAIN',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app.  Indicates if they had abdominal pain.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ALCOHOL_CHANGE',
									description: 'Indicates the individuals alcohol change since lockdown.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'OUTWARD_POSTCODE_TOWN_AREA',
									description:
										'Town area based on the outward postcode of the individual. The outward postcode is the first part of the postcode.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_US_ASIAN',
									description: 'Indicates if the race of the individual is Asian American.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'TAKES_IMMUNOSUPPRESSANTS',
									description:
										'Indicates if the individual regularly takes immunosuppressant medications. Including steroids, methotrexate, biologics.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'VS_VITAMIN_D',
									description:
										'Vitamins and Supplements: Indicates if the indiviual has been taking vitamin D regularly (more than 3 times a wek on average) for more than 3 months.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PAST_SYMPTOM_DIARRHOEA',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app.  Indicates if they had diarrhoea.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'MSOA11NM',
									description: 'Middle Layer Super Output Area Name of the individual.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PAST_SYMPTOM_FEVER',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app.  Indicates if they had a fever.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'IS_CARER_FOR_COMMUNITY',
									description:
										'Indicates if the individual currently cares for multiple people in the community, with direct contact to their patients.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'GENDER',
									description:
										'Code indicating the sex assigned to the individual at birth.\n\nCan take 4 values. Values and corresponding descriptions:\n- 0 // Female\n- 1 // Male\n- 2 // Prefer not to say\n- 3 // Intersex',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'integer',
									},
								},
								{
									label: 'PAST_SYMPTOM_HOARSE_VOICE',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app.  Indicates if they had a hoarse voice.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ID_E',
									description: 'Unique patient ID.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'bigint',
									},
								},
								{
									label: 'INTERACTED_PATIENTS_WITH_COVID',
									description:
										'Indicates if the individual has EVER interacted in person with patients with documented or presumed COVID-10 infection.\n\nCan take 4 values. Values and corresponding descriptions:\n- yes_document // Yes, documented COVID-19 cases only\n- yes_suspected // Yes, suspected COVID-19 cases only\n- yes_doumented_suspected // Yes, both documented & suspected COVID-19 cases\n- no // Not that I know of\nThe maximum length of the value is 32.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'CREATED_AT',
									description: 'UTC timestamp at which this patient level data was created.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'IS_SMOKER',
									description: 'Indicates if the individual smokes.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_US_HAWAIIAN_PACIFIC',
									description: 'Indicates if the race of the individual is Hawaiian Pacific American.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'WEIGHT_KG',
									description: 'Weight of the individual. Export is anonymised by rounding downwards to 10kg.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'double',
									},
								},
								{
									label: 'UPDATED_AT',
									description: 'UTC timestamp at which this patient level data was most recently updated.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'MSOA11CD',
									description: 'Middle Layer Super Output Area Code of the individual.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'COUNTRY_CODE',
									description: 'Country code of the individual. Can take values GB or US only.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAS_LUNG_DISEASE_ONLY',
									description: 'Indicates if the individual has lung disease only (and not asthma).',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'OUTWARD_POSTCODE_REGION',
									description:
										'Region based on the outward postcode of the individual. The outward postcode is the first part of the postcode.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'VS_NONE',
									description:
										'Vitamins and Supplements: Indicates if the indiviual has not been taking any vitamins or supplements regularly (more than 3 times a wek on average) for more than 3 months.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PAST_SYMPTOM_PERSISTENT_COUGH',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app.  Indicates if they had a persistent cough.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'BLOOD_GROUP',
									description: 'Indicates the individuals blood group.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'SAME_HOUSEHOLD_AS_REPORTER',
									description:
										'For individuals who have someone else reporting on their behalf. Indicates if the individual lives in the same household as their reporter.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_ORAL_SGLT2',
									description: 'For individuals with diabetes. Indicates if the individual uses SGLT2 as an oral diabetes treatment.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_TREATMENT_NONE',
									description: 'For individuals with diabetes. Indicates if the individual does not use diabetes treatment(s).',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PAST_SYMPTOMS_DAYS_AGO',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app. The number of days ago their symptoms started.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'integer',
									},
								},
								{
									label: 'DIABETES_TREATMENT_BASAL_INSULIN',
									description: 'For individuals with diabetes. Indicates if the individual uses basal insulin as a diabetes treatment.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'VS_VITAMIN_C',
									description:
										'Vitamins and Supplements: Indicates if the indiviual has been taking vitamin C regularly (more than 3 times a wek on average) for more than 3 months.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'VS_PROBIOTICS',
									description:
										'Vitamins and Supplements: Indicates if the indiviual has been taking Probiotics regularly (more than 3 times a wek on average) for more than 3 months.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_TREATMENT_RAPID_INSULIN',
									description: 'For individuals with diabetes. Indicates if the individual uses rapid insulin as a diabetes treatment.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIABETES_TYPE',
									description: 'For individuals with diabetes. Indicates what type of diabetes they have.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAVE_WORKED_IN_HOSPITAL_CLINIC',
									description:
										'Indicates if the individual has physically worked in a clinic outside a hospital since the COVID-19 epidemic began.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'NEED_OUTSIDE_HELP',
									description:
										'Indicates if the individual needs someone to help them on a regular basis, in which the help does not require someone to come inside their house.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'STILL_HAVE_PAST_SYMPTOMS',
									description:
										'For individuals who had been unwell in the month prior to signing up to the app. Indicates whether or not the individual still has past symptoms.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'RACE_IS_US_BLACK',
									description: 'Indicates if the race of the individual is Black American.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'A1C_MEASUREMENT_MMOL',
									description: 'For individuals with diabetes. Indicates their most recent HbA1c results in millimoles.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'double',
									},
								},
								{
									label: 'HT_DEPOT_INJECTION_OR_IMPLANT',
									description: 'Hormone Therapy: Indicates if the indivual has a depot injection or implant.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAS_ASTHMA',
									description: 'Indicates if the individual has asthma.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'VS_MULTIVITAMINS',
									description:
										'Vitamins and Supplements: Indicates if the indiviual has been taking Multi-vitamins and minerals regularly (more than 3 times a wek on average) for more than 3 months.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'TAKES_ANY_BLOOD_PRESSURE_MEDICATIONS',
									description: 'Indicates if the individual is regularly taking any blood pressure medications.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HT_NONE',
									description: 'Hormone Therapy: Indicates if the indiviual is not on any kind of hormone therapy.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
							],
						},
						{
							label: 'DF_ASSESSMENTS',
							description: 'Assessment level data',
							elements: [
								{
									label: 'COUNTRY_CODE',
									description: 'Country code of the individual. Can take values GB or US only.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'TESTED_COVID_POSITIVE',
									description:
										'For individuals who have been tested for COVID-19. Indicates if they tested positive.\n\nCan take 3 values. Values and corresponding descriptions:\n- yes // Yes\n- no // No\n- waiting // Waiting',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIARRHOEA',
									description: 'For individuals who are not feeling quite right. Indicates if they are experiencing diarrhoea.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ISOLATION_HEALTHCARE_PROVIDER',
									description:
										'Indicator of how much patients have been isolating over the last week.\n\nThe number of times, in the last week, the patient has visited a healthcare provider (e.g. a hospital clinic, a dentist, or a pharmacy)',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'integer',
									},
								},
								{
									label: 'FATIGUE',
									description:
										'For individuals who are not feeling quite right. Indicates if they are experiencing unusual fatigue.\n\nCan take 3 values. Values and corresponding descriptions:\n- no // No\n- mild // Mild fatigue\n- severe // Severe fatigue - I struggle to get out of bed',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'CHILLS_OR_SHIVERS',
									description: 'For individuals who are not feeling quite right.  Indicates if they are experiences chills or shivers.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'MASK_NOT_SURE_PFNTS',
									description:
										"For individuals that have worn a face mask. Indicates if they are not sure what type of mask they're wearing.",
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAVE_USED_PPE',
									description:
										'For health care workers. Indicates if, in the last day, they have used personal protective equipment (PPE) at work.\nWhere depending on their specific work requirements, PPE might include gloves, masks, face shields, etc.\n\nCan take 3 values. Values and corresponding descriptions:\n- always // Always\n- sometimes //  Sometimes\n- never // Never\nThe maximum length of the value is 16.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'EYE_SORENESS',
									description: 'For individuals who are not feeling quite right.  Indicates if they are experiencing eye soreness.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'TEMPERATURE',
									description:
										'For individuals who are not feeling quite right, and have a fever. If they are able to measure their temperature. Measure of their temperature.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HEADACHE',
									description: 'For individuals who are not feeling quite right.  Indicates if they have a headache.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'SHORTNESS_OF_BREATH',
									description:
										'For individuals who are not feeling quite right. Indicates if they are experiencing unusual shortness of breath.\n\nCan take 4 values. Values and corresponding descriptions:\n- no // No\n- mild // Yes. Mild symtpoms - slight shortness of breath during ordinary activity\n- significant // Yes. Significant symptoms - breathing is comfortable only at rest\n- severe // Yes. Severe symptoms - breathing is difficult even at rest',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'TREATED_PATIENTS_WITH_COVID',
									description:
										'For health care workers. Indicates if, in the last day, they have treated patients in person with documented or presumed COVID-19 infection.\n\nCan take 4 values. Values and corresponding descriptions:\n- yes_documented // Yes, documented COVID-19 cases\n- yes_suspected // Yes, both documented & suspected COVID-19 cases\n- yes_documented_suspected // Yes, presumed COVID-19 cases\n- no // Not that I know of\nMaximum length of the value is 32.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HAD_COVID_TEST',
									description: 'Indicates if the individual has had a test for COVID-19.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'CREATED_AT',
									description: 'UTC timestamp at which this assessment data was created.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'AVAIL_FROM_DATE',
									description: 'Date when the data made available i.e. date of loading.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'date',
									},
								},
								{
									label: 'UPDATED_AT',
									description: 'UTC timestamp at which this assessment level data was most recently updated.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'SKIPPED_MEALS',
									description: 'For individuals who are not feeling quite right.  Indicates if they have been skipping meals.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'NAUSEA',
									description: 'For individuals who are not feeling quite right.  Indicates if they are experiencing nausea.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ABDOMINAL_PAIN',
									description: 'For individuals who are not feeling quite right. Indicates if they have an unusual abdominal pain.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ID_E',
									description: 'Unique assessment ID.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'bigint',
									},
								},
								{
									label: 'NEVER_USED_SHORTAGE',
									description:
										"For health care workers, who, in the last day,  have never used PPE at work. Indicates whether:\n\nCan take 2 values. Values and corresponding descriptions:\n- not_needed // They haven't needed PPE\n- not_available // They needed PPE, but it wasn't available\nThe maximum length of the value is 16",
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'BLISTERS_ON_FEET',
									description:
										'For individuals who are not feeling quite right.  Indicates if they are experiencing blisters on their feet.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'FEVER',
									description: 'For individuals who are not feeling quite right. Indicates if they have a fever.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HEALTH_STATUS',
									description:
										"Indicates how the individual feels rights now.\n\nCan take 2 values. Values and corresponding descriptions:\n- healthy // I feel healthy as normal\n- not_healthy // I'm not feeling quite right",
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'SOMETIMES_USED_SHORTAGE',
									description:
										"For health care workers, who, in the last day,  have sometimes used PPE at work. Indicates whether:\n\nCan take 3 values. Values and corresponding descriptions:\n- all_needed // They haven't always needed PPE, but have had enough when they did\n- not_enough // They would have used PPE all the time, but they haven't had enough\n- reused // They've had to reuse PPE because of shortage\nThe maximum length of the value is 16",
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'LOCATION',
									description:
										"For individuals who are not feeling quite right.  Indicates where they are right now.\n\nCan take 4 values. Values and corresponding descriptions:\n- home //  I'm at home. I haven't been to the hospital for suspected COVID-19 symptoms\n- hospital // I am at the hospital with suspected COVID-19 symptoms\n- back_from_hospital // I am back from the hospital, I'd like to tell you about my treatment\n- back_from_hospital // I am back from the hospital, I've already told you about my treatment",
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ALWAYS_USED_SHORTAGE',
									description:
										'For health care workers, who, in the last day,  have always used PPE at work. Indicates whether:\n\nCan take 2 values. Values and corresponding descriptions:\n- all_needed // They have had all the PPE they need for work\n- reused // They have had to reuse PPE because of shortage\nThe maximum length of the value is 16.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PATIENT_ID_E',
									description: 'Unique patient ID.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'bigint',
									},
								},
								{
									label: 'VERSION',
									description: 'Version of the app this record was created on.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'WORN_FACE_MASK',
									description: 'Indicates if the individual has worn a face mask.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'SORE_THROAT',
									description: 'For individuals who are not feeling quite right.  Indicates if they have a sore throat.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HOARSE_VOICE',
									description: 'For individuals who are not feeling quite right. Indicates if they have an unusually hoarse voice.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'CHEST_PAIN',
									description:
										'For individuals who are not feeling quite right. Indicates if they are feeling an unusual chest pain or tightness in their chest',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DELIRIUM',
									description:
										'For individuals who are not feeling quite right.  Indicates if they have any of the following symptoms: confusion, disorientation or drowsiness.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'MASK_N95_FFP',
									description: 'For individuals that have worn a face mask. Indicates if it was a N95 or FFP mask.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'MASK_CLOTH_OR_SCARF',
									description: 'For individuals that have worn a face mask. Indicates if it was a cloth or scarf.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'PERSISTENT_COUGH',
									description:
										'For individuals who are not feeling quite right. Indicates if they have a persistant cough, described as coughing a lot for more than an hour, or 3 or more coughing episodes in 24 hours.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'INTERACTED_ANY_PATIENTS',
									description: 'Indicates if the individual has interacted in person with any patients.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ISOLATION_LOTS_OF_PEOPLE',
									description:
										'Indicator of how much patients have been isolating over the last week.\n\nThe number of times, in the last week, the patient has visited somewhere with lots of people (e.g. whilst getting groceries, on public transport, or at work)',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'integer',
									},
								},
								{
									label: 'DIZZY_LIGHT_HEADED',
									description:
										'For individuals who are not feeling quite right.  Indicates if they have been feeling dizzy or light headed.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'ISOLATION_LITTLE_INTERACTION',
									description:
										'Indicator of how much patients have been isolating over the last week.\n\nThe number of times, in the last week, the patient has been outside with little interaction with people outside their household (e.g. exercising outside)',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'integer',
									},
								},
								{
									label: 'RED_WELTS_ON_FACE_OR_LIPS',
									description:
										'For individuals who are not feeling quite right.  Indicates if they are experiencing red welts on their face or lips.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'MASK_SURGICAL',
									description: 'For individuals that have worn a face mask. Indicates if it was a surgical mask.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'HEADACHE_FREQUENCY',
									description: 'For individuals who are not feeling quite right.  Indicates how often they have a headache.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'LOSS_OF_SMELL',
									description: 'For individuals who are not feeling quite right. Indicates if they have loss of smell or taste.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'LEVEL_OF_ISOLATION',
									description:
										'For individuals who are not feeling quite right.  Indicates how much they have been isolating over the last week.\n\nCan take 3 values. Values and corresponding descriptions:\n- not_left_the_house // I have not left the house\n- rarely_left_the_house // I rarely leave the house. When I do, I have little interaction with others (e.g. for exercise)\n- often_left_the_house // I have to leave the house often and am in contact with other people (e.g. still working outside the house or using public transport)',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'UNUSUAL_MUSCLE_PAINS',
									description: 'For individuals who are not feeling quite right.  Indicates if they have unusual strong muscle pains.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DATE_TEST_OCCURRED_GUESS',
									description:
										'For individuals who have been tested for COVID-19. Indicates the indiviuals guess as to the date the test occurred.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DIARRHOEA_FREQUENCY',
									description: 'For individuals who are not feeling quite right. Indicates how often they are experiencing diarrhoea.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'TEMPERATURE_UNIT',
									description:
										'For individuals who are not feeling quite right, and have a fever. If they are able to measure their temperature. Unit of measurement of their temperature. \nCan take two values: C; F.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
								{
									label: 'DATE_TEST_OCCURRED',
									description: 'For individuals who have been tested for COVID-19. Indicates the date the test occurred.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'timestamp',
									},
								},
								{
									label: 'TYPICAL_HAYFEVER',
									description:
										'For individuals who are not feeling quite right.  Indicates if they are experiencing typical hayfever symptoms.',
									dataType: {
										domainType: 'PrimitiveType',
										label: 'varchar',
									},
								},
							],
						},
					],
					versionLinks: [
						{
							id: '1dfe0cb6-b220-408d-894f-ab34f7e8a10d',
							linkType: 'Superseded By',
							domainType: 'CatalogueSemanticLink',
							source: {
								id: 'fddcb382-3051-4394-8436-b92295f14259',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '13.0.0',
							},
							target: {
								id: '78ce070c-84db-4676-81c5-0c672f4e12e3',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '19.0.0',
							},
						},
						{
							id: 'ed02f234-b8f4-4f76-bc08-d8087a508a18',
							linkType: 'Superseded By',
							domainType: 'CatalogueSemanticLink',
							source: {
								id: 'cb29d860-da77-45a0-80e4-913d445f5a50',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '14.0.0',
							},
							target: {
								id: '78ce070c-84db-4676-81c5-0c672f4e12e3',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '19.0.0',
							},
						},
						{
							id: '41fede0b-476c-4f0c-b687-eaadadafbdc7',
							linkType: 'Superseded By',
							domainType: 'CatalogueSemanticLink',
							source: {
								id: '4e0008a5-c930-494a-bdcc-f88e30fc36d2',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '2.0.0',
							},
							target: {
								id: '78ce070c-84db-4676-81c5-0c672f4e12e3',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '19.0.0',
							},
						},
						{
							id: '1fb2b96f-4a22-49f6-9ae4-98a709b62acc',
							linkType: 'Superseded By',
							domainType: 'CatalogueSemanticLink',
							source: {
								id: '9c5a8ae6-fbc2-43f6-b4ae-4dd2b2a617b5',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '6.0.0',
							},
							target: {
								id: '78ce070c-84db-4676-81c5-0c672f4e12e3',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '19.0.0',
							},
						},
						{
							id: '5ca80bd7-7a3b-4041-a20a-7a181bd194ef',
							linkType: 'Superseded By',
							domainType: 'CatalogueSemanticLink',
							source: {
								id: 'c1231f9b-b617-4ad8-80ad-f84d26f7964a',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '5.0.0',
							},
							target: {
								id: '78ce070c-84db-4676-81c5-0c672f4e12e3',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '19.0.0',
							},
						},
						{
							id: 'b155e1da-55c4-45e7-b4dd-c59d720589dd',
							linkType: 'Superseded By',
							domainType: 'CatalogueSemanticLink',
							source: {
								id: '2197a025-e722-4b21-9208-9e4c8e5d3b6a',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '3.0.0',
							},
							target: {
								id: '78ce070c-84db-4676-81c5-0c672f4e12e3',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '19.0.0',
							},
						},
						{
							id: 'e1a91af6-9922-4409-a3c2-17195bff54ac',
							linkType: 'Superseded By',
							domainType: 'CatalogueSemanticLink',
							source: {
								id: '9dee28f9-44e7-4690-a091-c2e493d9d8ed',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '9.0.0',
							},
							target: {
								id: '78ce070c-84db-4676-81c5-0c672f4e12e3',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '19.0.0',
							},
						},
						{
							id: '759cd234-3c34-476a-9755-d804c2c07e8c',
							linkType: 'Superseded By',
							domainType: 'CatalogueSemanticLink',
							source: {
								id: 'c42ceb2a-c9c2-491d-9f34-3da55413225f',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '12.0.0',
							},
							target: {
								id: '78ce070c-84db-4676-81c5-0c672f4e12e3',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '19.0.0',
							},
						},
						{
							id: '14d88944-f244-4e40-892e-94b84c7a79e0',
							linkType: 'Superseded By',
							domainType: 'CatalogueSemanticLink',
							source: {
								id: 'e525b056-1bac-46ee-838c-6bef8a8815cb',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '11.0.0',
							},
							target: {
								id: '78ce070c-84db-4676-81c5-0c672f4e12e3',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '19.0.0',
							},
						},
						{
							id: '4918086f-51bc-4a47-b4ff-9e71faa19b9b',
							linkType: 'Superseded By',
							domainType: 'CatalogueSemanticLink',
							source: {
								id: '9b604483-9cdc-41b2-b82c-14ee3dd705f6',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '1.0.0',
							},
							target: {
								id: '78ce070c-84db-4676-81c5-0c672f4e12e3',
								domainType: 'DataModel',
								label: 'COVID-19 Symptom Tracker Dataset',
								documentationVersion: '19.0.0',
							},
						},
					],
					phenotypes: [],
					publisher: 'ALLIANCE > SAIL',
					abstract:
						"The COVID Symptom Tracker was designed by doctors and scientists at King's College London (KCL), Guys and St Thomas’ Hospital working in partnership with ZOE Global. Led by Dr Tim Spector, professor of genetic epidemiology at KCL and director of TwinsUK.",
					releaseDate: '2020-04-03',
					accessRequestDuration: '2-6 MONTHS',
					conformsTo: 'LOCAL',
					accessRights: 'https://saildatabank.com/application-process/two-stage-process/',
					jurisdiction: 'GB-GBN',
					datasetStartDate: '2020-03-21',
					datasetEndDate: '2020-08-09',
					statisticalPopulation: '3900000',
					ageBand: '15-150',
					contactPoint: 'saildatabank@swansea.ac.uk',
					periodicity: 'DAILY',
					metadataquality: {
						schema_version: '2.0.1',
						pid: '594cfe55-96e3-45ff-874c-2c0006eeb881',
						id: '78ce070c-84db-4676-81c5-0c672f4e12e3',
						publisher: 'ALLIANCE > SAIL',
						title: 'COVID-19 Symptom Tracker Dataset',
						completeness_percent: 95.24,
						weighted_completeness_percent: 91.95,
						error_percent: 16.28,
						weighted_error_percent: 6.04,
						quality_score: 89.48,
						quality_rating: 'Gold',
						weighted_quality_score: 92.95,
						weighted_quality_rating: 'Platinum',
					},
					datautility: {
						pid: '594cfe55-96e3-45ff-874c-2c0006eeb881',
						id: '78ce070c-84db-4676-81c5-0c672f4e12e3',
						publisher: 'ALLIANCE > SAIL',
						title: 'COVID-19 Symptom Tracker Dataset',
						metadata_richness: 'Platinum',
						availability_of_additional_documentation_and_support: 'Platinum ',
						data_model: 'Gold ',
						data_dictionary: 'Gold ',
						provenance: 'Platinum ',
						data_quality_management_process: 'Platinum ',
						dama_quality_dimensions: '',
						pathway_coverage: 'Platinum ',
						length_of_follow_up: 'Silver ',
						allowable_uses: 'Gold ',
						research_environment: '',
						time_lag: 'Platinum ',
						timeliness: 'Platinum ',
						linkages: 'Silver ',
						data_enrichments: 'Gold ',
					},
					metadataschema: {
						'@context': 'http://schema.org/',
						'@type': 'Dataset',
						identifier: '78ce070c-84db-4676-81c5-0c672f4e12e3',
						url: 'https://healthdatagateway.org/detail/78ce070c-84db-4676-81c5-0c672f4e12e3',
						name: 'COVID-19 Symptom Tracker Dataset',
						description:
							"The COVID Symptom Tracker (https://covid.joinzoe.com/) mobile application was designed by doctors and scientists at King's College London, Guys and St Thomas’ Hospitals working in partnership with ZOE Global Ltd – a health science company.\n\nThis research is led by Dr Tim Spector, professor of genetic epidemiology at King’s College London and director of TwinsUK a scientific study of 15,000 identical and non-identical twins, which has been running for nearly three decades.\n\nThe dataset schema includes:\n\nDemographic Information (Year of Birth, Gender, Height, Weight, Postcode)\nHealth Screening Questions (Activity, Heart Disease, Diabetes, Lung Disease, Smoking Status, Kidney Disease, Chemotherapy, Immunosuppressants, Corticosteroids, Blood Pressure Medications, Previous COVID, COVID Symptoms, Needs Help, Housebound Problems, Help Availability, Mobility Aid)\nCOVID Testing Conducted\nHow You Feel?\nSymptom Description\nLocation Information (Home, Hospital, Back From Hospital)\nTreatment Received\nThe data is hosted within the SAIL Databank, a trusted research environment facilitating remote access to health, social care, and administrative data for various national organisations.\n\nThe process for requesting access to the data is dependent on your use case. SAIL is currently expediting all requests that feed directly into the response to the COVID-19 national emergency, and therefore requests from NHS or Government institutions, or organisations working alongside such care providers and policymakers to feed intelligence directly back into the national response, are being expedited with a ~48-hour governance turnaround for such applications once made. Please make enquiries using the link at the bottom of the page which will go the SAIL Databank team, or to Chris Orton at c.orton@swansea.ac.uk\n\nSAIL is welcoming requests from other organisations and for longer-term academic study on the dataset, but please note if this is not directly relevant to the emergency research being carried out which directly interfaces with national responding agencies, there may be an access delay whilst priority use cases are serviced.",
						license: 'https://covid.joinzoe.com/privacy-notice',
						keywords: [
							'COVID-19,TRACKER,SAIL,COVID,MOBILE APP,CORONAVIRUS,SYMPTOM,NCS,National Core Study',
							'ALLIANCE > SAIL',
							'NOT APPLICABLE',
							'GB-GBN',
							'Great Britain',
						],
						includedinDataCatalog: [
							{
								'@type': 'DataCatalog',
								name: 'ALLIANCE > SAIL',
								url: 'saildatabank@swansea.ac.uk',
							},
							{
								'@type': 'DataCatalog',
								name: 'HDR UK Health Data Gateway',
								url: 'http://healthdatagateway.org',
							},
						],
					},
				},
				timestamps: {
					updated: '2021-05-05T12:32:40.544Z',
					created: '2021-05-05T12:32:40.544Z',
					submitted: '2021-05-05T12:32:40.544Z',
					published: '2021-05-05T12:32:40.544Z',
				},
				authors: [],
				emailNotifications: true,
				showOrganisation: false,
				structuralMetadata: [],
				datasetVersionIsV1: false,
				isCohortDiscovery: false,
				toolids: [],
				datasetids: [],
				_id: '60929068c794e1288d4ec704',
				relatedObjects: [],
				programmingLanguage: [],
				pid: '20e82f06-0af0-4fd6-9054-aefd516047f0',
				datasetVersion: '19.0.0',
				id: 645826635316453,
				datasetid: '78ce070c-84db-4676-81c5-0c672f4e12e3',
				type: 'dataset',
				activeflag: 'inReview',
				source: 'HDRUK MDC',
				is5Safes: true,
				hasTechnicalDetails: true,
				name: 'COVID-19 Symptom Tracker Dataset',
				description:
					"The COVID Symptom Tracker (https://covid.joinzoe.com/) mobile application was designed by doctors and scientists at King's College London, Guys and St Thomas’ Hospitals working in partnership with ZOE Global Ltd – a health science company.\n\nThis research is led by Dr Tim Spector, professor of genetic epidemiology at King’s College London and director of TwinsUK a scientific study of 15,000 identical and non-identical twins, which has been running for nearly three decades.\n\nThe dataset schema includes:\n\nDemographic Information (Year of Birth, Gender, Height, Weight, Postcode)\nHealth Screening Questions (Activity, Heart Disease, Diabetes, Lung Disease, Smoking Status, Kidney Disease, Chemotherapy, Immunosuppressants, Corticosteroids, Blood Pressure Medications, Previous COVID, COVID Symptoms, Needs Help, Housebound Problems, Help Availability, Mobility Aid)\nCOVID Testing Conducted\nHow You Feel?\nSymptom Description\nLocation Information (Home, Hospital, Back From Hospital)\nTreatment Received\nThe data is hosted within the SAIL Databank, a trusted research environment facilitating remote access to health, social care, and administrative data for various national organisations.\n\nThe process for requesting access to the data is dependent on your use case. SAIL is currently expediting all requests that feed directly into the response to the COVID-19 national emergency, and therefore requests from NHS or Government institutions, or organisations working alongside such care providers and policymakers to feed intelligence directly back into the national response, are being expedited with a ~48-hour governance turnaround for such applications once made. Please make enquiries using the link at the bottom of the page which will go the SAIL Databank team, or to Chris Orton at c.orton@swansea.ac.uk\n\nSAIL is welcoming requests from other organisations and for longer-term academic study on the dataset, but please note if this is not directly relevant to the emergency research being carried out which directly interfaces with national responding agencies, there may be an access delay whilst priority use cases are serviced.",
				license: 'https://covid.joinzoe.com/privacy-notice',
				datasetv2: {
					identifier: '',
					version: '',
					issued: '',
					modified: '',
					revisions: [],
					summary: {
						title: '',
						abstract:
							"The COVID Symptom Tracker was designed by doctors and scientists at King's College London (KCL), Guys and St Thomas’ Hospital working in partnership with ZOE Global. Led by Dr Tim Spector, professor of genetic epidemiology at KCL and director of TwinsUK.",
						publisher: {
							identifier: '',
							name: 'SAIL',
							logo: '',
							description: '',
							contactPoint: 'saildatabank@swansea.ac.uk',
							memberOf: 'ALLIANCE',
							accessRights: [],
							deliveryLeadTime: '',
							accessService: '',
							accessRequestCost: '',
							dataUseLimitation: [],
							dataUseRequirements: [],
						},
						contactPoint: 'saildatabank@swansea.ac.uk',
						keywords: ['COVID-19', 'TRACKER', 'SAIL', 'COVID', 'MOBILE APP', 'CORONAVIRUS', 'SYMPTOM', 'NCS', 'National Core Study'],
						alternateIdentifiers: [],
						doiName: 'In Progress',
					},
					documentation: {
						description: '',
						associatedMedia: ['https://saildatabank.com/about-us/overview/', 'https://covid.joinzoe.com/data'],
						isPartOf: 'NOT APPLICABLE',
					},
					coverage: {
						spatial: 'Great Britain',
						typicalAgeRange: '15-150',
						physicalSampleAvailability: ['NOT AVAILABLE'],
						followup: '0 - 6 MONTHS',
						pathway: 'Covid-19',
					},
					provenance: {
						origin: {
							purpose: 'DISEASE REGISTRY',
							source: 'OTHER',
							collectionSituation: 'HOME',
						},
						temporal: {
							accrualPeriodicity: 'DAILY',
							distributionReleaseDate: '2020-04-03',
							startDate: '2020-03-21',
							endDate: '2020-08-09',
							timeLag: 'NO TIMELAG',
						},
					},
					accessibility: {
						usage: {
							dataUseLimitation: 'GENERAL RESEARCH USE',
							dataUseRequirements: ['PROJECT SPECIFIC RESTRICTIONS', 'TIME LIMIT ON USE', 'USER SPECIFIC RESTRICTION'],
							resourceCreator:
								"The COVID symptom tracker was created by doctors and scientists at King's College London, Guys and St Thomas’ Hospitals working in partnership with ZOE Global Ltd – a health science company.",
							investigations: ['https://saildatabank.com/saildata/projects-using-sail/'],
							isReferencedBy: ['D. A. Drew et al., Science 10.1126/science.abc0473 (2020)'],
						},
						access: {
							accessRights: ['https://saildatabank.com/application-process/two-stage-process/'],
							accessService:
								'The SAIL Databank is powered by the UK Secure e-Research Platform (UKSeRP). Following approval through safeguard processes, access to project-specific data within the secure environment is permitted using two-factor authentication',
							accessRequestCost:
								'Data provision is free from SAIL. Overall project costing depends on the number of people that require access to the SAIL Gateway, the activities that SAIL needs to complete (e.g. loading non-standard datasets), data refreshes, analytical work required, disclosure control process, and special case technological requirements.',
							deliveryLeadTime: '2-6 MONTHS',
							jurisdiction: 'GB-GBN',
							dataProcessor: 'SAIL Databank',
							dataController: 'Zoe Global Ltd (https://joinzoe.com/)',
						},
						formatAndStandards: {
							vocabularyEncodingScheme: 'LOCAL',
							conformsTo: 'LOCAL',
							language: 'en',
							format: ['CSV Tables'],
						},
					},
					enrichmentAndLinkage: {
						qualifiedRelation: ['Not Available'],
						derivation: ['Not Available'],
						tools: ['https://conceptlibrary.saildatabank.com/'],
					},
					observations: [],
				},
				createdAt: '2021-05-05T12:32:40.544Z',
				updatedAt: '2021-09-09T14:49:56.727Z',
				__v: 0,
				counter: 84,
				commercialUse: true,
				discourseTopicId: 425,
			},
		})
	);
});

export default [mswGetDataset];
