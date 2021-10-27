const testCreateCSV = (dataAccessRequests) => {

	// set headers
	const headers = buildHeaders();

	// push the headers as the first row of the csv document
	let csvRows = [ headers ];

	// for each dataAccessRequest create csv rows and append it to the csv rows
	let i = 0;
	for (const dar of dataAccessRequests) {
		const rows = buildRows(dar, i);
		csvRows = csvRows.concat(rows);
		i++;
	}

	console.log("csvRows", csvRows);
	return csvRows
}

const buildRows = (dar, index) => {
	let rows = [];
	const applicants = extractApplicants(dar);
	for (const applicant of applicants) {
		const row = buildOneRow(dar, applicant);
		rows.push(row);
	}

	console.log(`rows of dar ${index}`, rows);
	return rows;
}

const extractApplicants = (dar) => {

	// Take the uncommon part (after applicationthisapplication and before safeprojectorganisationname)
	let applicants = [];
	let userFound = 0;
	let applicant = {};
	let index = 0;
	let propertyName = '';
	for (let key in dar.questionAnswers) {

		if (key.substring(0, 28) === 'safeprojectapplicantfullname') {
			index = 0;
			userFound = 1;
			propertyName = FetchKeyNameBeforeTheUnderScore(key);
			applicant[propertyName] = dar.questionAnswers[key];  			
		}

		if (userFound === 1 && index < 8) {
			propertyName = FetchKeyNameBeforeTheUnderScore(key);
			applicant[propertyName] = dar.questionAnswers[key];
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

const FetchKeyNameBeforeTheUnderScore = (key) => {
	if (key.indexOf('_') > -1) 
		return key.substring(0, key.indexOf('_'))
	else
		return key;
}

// buildOneRow and not buildRow: To make it distinct from buildRows
const buildOneRow = (dar, applicant) => {

	const row = [
			dar._id,
			dar.applicationStatus,
			dar.createdAt.substring(0, 10),
			dar.updatedAt.substring(0, 10),
			dar.datasetTitles[0],			
			"Project name",
			"Project submitted by",
			// dar.questionAnswers.applicationthisapplication,

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
				"Organisation Line address 1",	
				"Organisation Line address 2", 
				"Organisation Postcode", 
				"Organisation City", 
				"Organisation Country"
			];
}

export default testCreateCSV