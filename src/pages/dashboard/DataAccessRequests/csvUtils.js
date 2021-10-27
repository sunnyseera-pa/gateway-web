const mockData = {
    authorIds: [],
    datasetIds: [ 'datasetid-fair-driver-project-1-data-model-output' ],
    datasetTitles: [ 'Driver Project 1 datasets' ],
    applicationStatus: 'inReview',
    publisher: 'ICODA',
    formType: '5 safe',
    version: 1,
    userId: 3492768768829626,
    dataSetId: 'datasetid-fair-driver-project-1-data-model-output',
    isCloneable: false,
    jsonSchema: {},
    questionAnswers: {
      applicationthisapplication: 'A new application',
      applicationaccreditation: 'No',

      // First Applicant
      safeprojectapplicantfullname: 'Full name*',
      safeprojectapplicantjobtitle: 'Job title*',
      safeprojectapplicanttelephone: 'Telephone',
      safeprojectapplicantaffiliation: 'Institutional affiliation*',
      safeprojectapplicantorcid: 'ORCID',
      safeprojectapplicantemail: 'sam.haim@paconsulting.com',
      safeprojectapplicantrole: 'Principal investigator',
      safeprojectapplicantdataaccess: 'Yes',

      // Second Applicant 
      safeprojectapplicantfullname_tNX9H: 'Joe DiMaggio',
      safeprojectapplicantjobtitle_tNX9H: 'Job title* applicant 2',
      safeprojectapplicanttelephone_tNX9H: 'Telephone Applicant 2',
      safeprojectapplicantaffiliation_tNX9H: 'Applicant 2 Institutional affiliation*',
      safeprojectapplicantorcid_tNX9H: 'Applicant 2 ORCID',
      safeprojectapplicantemail_tNX9H: 'joe@test.test',
      safeprojectapplicantrole_tNX9H: 'Principal investigator',
      safeprojectapplicantdataaccess_tNX9H: 'No',

      safeprojectanotherperson: '\n' +
        "Please provide evidence of the team's expertise and experience relevant to delivering the project (3000 characters)*",
      
      safeprojectorganisationname: 'Organisation name*',
      safeprojectorganisationaddress1: 'Registered address (line 1)*',
      safeprojectorganisationaddress2: 'Registered address (line 2)*',
      safeprojectorganisationpostcode: 'Postcode*',
      safeprojectorganisationcity: 'City*',
      safeprojectorganisationcountry: 'United Kingdom',
      projectdetalisisaproject: 'No',
      linkingdataintention: 'No',
      
      linkingdataintentiondata: 'Please indicate the data necessary to conduct the study, the data fields required and the justifications for including each field. (3000 characters)*',
      linkingdataintentiontimeperiod: 'Time period for which data is requested*',
      linkingdataintentionarea: 'Geographical area for which data is requested*',
      linkingdataintentiongender: 'Gender variables requested*',
      linkingdataintentionage: 'Age variables requested*',
      linkingdataintentionlistofitems: 'Please list any sensitive data items required with justification for their requirement. (500 characters)*',
      publicationfindings: 'How will your findings be made public, to which audiences and in which formats, including how you intend to generate impact? (1000 characters)*',
      publicationplans: 'Please describe your publication plans, including how you would publicise potentially sensitive findings . (1000 characters)*',
      publicationdisclosure: 'Please describe what disclosure control policy and procedures will be applied to ensure individual level data is not identifiable. (1000 characters)*'
    },
    dateSubmitted: "2021-10-21T13:59:05.513Z",
    dateReviewStart: "2021-10-21T16:27:55.430Z"
 };

const testCreateCSV = (mockData) => {

	// set headers
	const headers = buildHeaders();

	// push the headers as the first row of the csv document
	let csvRows = [ headers ];

	// for each dataAccessRequest create csv rows and append it to the csv rows
	for (const dar in dataAccessRequests) {
		const rows = buildRows(dar);
		csvRows.push(rows);
	}

	return csvRows
}

const buildRows = (dar) => {
	let rows = [];
	const applicants = extractApplicants(dar);
	for (const applicant of applicants) {
		console.log("applicant", applicants);
		const row = buildOneRow(dar, applicant);
		console.log("row = ", row);
		rows.push(row);
	}
	return rows;
}

const extractApplicants = (dar) => {

	// Take the uncommon part (after applicationthisapplication and before safeprojectorganisationname)
	let applicants = [];
	let userFound = 0;
	let applicant = {};
	let index = 0;
	for (let key in dar.questionAnswers) {

		if (key.substring(0, 28) === 'safeprojectapplicantfullname') {
			index = 0;
			userFound = 1;
			
			if (key.indexOf('_') > 0)
				key = key.substring(0, key.indexOf('_'));
			applicant[key] = dar.questionAnswers[key];  			
		}

		if (userFound === 1 && index < 8) {

			if (key.indexOf('_') > 0)
				key = key.substring(0, key.indexOf('_'));
			applicant[key] = dar.questionAnswers[key];
			index++;
		}

		if (userFound === 1 && index === 8) {
			userFound = 0;
			index = 0;
			applicants.push(applicant);
			applicant = {};
		}
	
	}

	return applicants;
}

// buildOneRow and not buildRow: To make it distinct from buildRows
const buildOneRow = (dar, applicant) => {

	const row = [
			"test",
			dar.applicationStatus,
			dar.createdAt,
			dar.updatedAt,
			dar.datasetTitles[0],			
			dar.questionAnswers.applicationthisapplication,

			applicant.safeprojectapplicantfullname, //"Project submitted by"
			applicant.safeprojectapplicantjobtitle,
			applicant.safeprojectapplicanttelephone,		
			applicant.safeprojectapplicantaffiliation,
			applicant.safeprojectapplicantorcid,
			applicant.safeprojectapplicantemail,
			applicant.safeprojectapplicantrole,
			applicant.safeprojectapplicantdataaccess,
			
			dar.questionAnswers.safeprojectorganisationname,
			dar.questionAnswers.safeprojectorganisationaddress1,
			dar.questionAnswers.safeprojectorganisationaddress2,
			dar.questionAnswers.safeprojectorganisationpostcode,
			dar.questionAnswers.safeprojectorganisationcity,
			dar.questionAnswers.safeprojectorganisationcountry,
		];

	return row;

}

const buildHeaders = () => {
	return [
				"ID", 
				"Status", 
				"Created At", 
				"Updated At", 
				"Datasets", 
				"Project name", 
				"Project submitted by", 
				"Applicant full name", 
				"Job title", 
				"Telephone", 
				"Institutional afflilation", 
				"ORCID", 
				"Email", 
				"Role", 
				"Access to data", 
				"Organisation name", 
				"Line address 1",	
				"Line address 2", 
				"Postcode", 
				"City", 
				"Country"
			];
}

buildRows(mockData);