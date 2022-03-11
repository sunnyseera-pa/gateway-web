import {getAccessRequestsUserDetails } from './DataAccessRequestsService';
//import logger from './Logger'
/**
 * written by: Sam H. @ PA
 * 
 * createCSV gets a dataAccessRequest and create an array of arrays that represent 
 * a csv and can be used easily with react-csv library.
 * 
 * output structure:
 * [
 * 	["first name", "last name"],
 *  ["Joe", "DiMaggio"],
 *  ["Micky", "Mental"]
 * ]
 */
const createCSV = (dataAccessRequests) => {

	try {
		// set headers
		const headers = buildHeaders();

		// push the headers as the first row of the csv document
		let csvRows = [ headers ];
		// for each dataAccessRequest create csv rows and append it to the csv rows
		for (const dar of dataAccessRequests) {
			const rows = buildRows(dar);
			csvRows = csvRows.concat(rows);
		}

		return csvRows		
	} catch (err) {
		console.log("error inside createCSV");
		return [["An", "error", "has ", "occurred", "please", "contact", "support"]];
	}
}

/**
 * written by: Sam H. @ PA
 * 
 * buildRows gets a dataAccessRequest and build the csv rows.
 * The logic in this function dictated stricted by the client.
 * client: Matt @ HDR UK
 */
const buildRows = (dar) => {
	let rows = [];
	const applicants = extractApplicants(dar);

	/* for each applicant we will create a new line. This logic was a specific requirement 
	   of the client, Matt @ HDR UK */
	for (const applicant of applicants) {
		const row = buildOneRow(dar, applicant);
		rows.push(row);
	}

	return rows;
}

/**
 * written by: Sam H. @ PA
 * 
 * extractApplicants is a helper function to support buildRows.
 * extractApplicants gets dataAccressRequest and returns array javascript generic objects
 * Each object contain applicant details
 * 
 * extractApplicants returns array of object. Each object has the following structure:
 * {
 *  safeprojectapplicantaffiliation: "NY Yankees"
 *  safeprojectapplicantdataaccess: "No"
 *  safeprojectapplicantemail: "joe@test.test"
 *  safeprojectapplicantfullname: "Joe DiMaggio"
 *  safeprojectapplicantjobtitle: "Baseball Player"
 *  safeprojectapplicantorcid: "12345"
 *  safeprojectapplicantrole: "Center Field"
 *  safeprojectapplicanttelephone: "07425 123 456"
 * }
 *  
 * Note: This function is a good candidate for refactoring
 */
const extractApplicants = (dar) => {

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

		if (userFound === 1 && index === 7) {
			userFound = 0;
			index = 0;
			applicants.push(applicant);
			applicant = {};
		}
	};

	return applicants;
}

/**
 * written by: Sam H. @ PA
 * 
 * extractApplicants is a helper function to support buildRows.
 *  
 * input 1: safeprojectapplicantfullname_tNX9H 
 * output 1: safeprojectapplicantfullname
 * 	
 * input 2: safeprojectapplicantfullname
 * output 2: safeprojectapplicantfullname
 * 
 */
const FetchKeyNameBeforeTheUnderScore = (key) => {
	if (key.indexOf('_') > -1) 
		return key.substring(0, key.indexOf('_'))
	else
		return key;
}

/**
 * written by: Sam H. @ PA
 * 
 * buildOneRow is a helper function to support buildRows.
 * 
 * function named buildOneRow and not buildRow to make it distinct from buildRows
 * and  avoid confusiom
 *  
 * buildOneRow gets dataAccessRequest and build a csv row according the headers that were 
 * dictated by the client and according to the way that dataAccessRequest is stored in the 
 * database. Any changes of these two (csv headers or db implementation) will most likely will
 * impact this function, and changes will need to be done
 * 
 */
 const buildOneRow = async (dar, applicant) => {

 const userDetails = await getAccessRequestsUserDetails(dar.userId);

 console.log("userDetails.mainApplicantUserName", userDetails.mainApplicantUserName)

	const row = [
			dar._id,
			dar.applicationStatus,
			dar.applicationStatusDesc,
			dar.createdAt.substring(0, 10), // YYYY-MM-DD
			dar.updatedAt.substring(0, 10), // YYYY-MM-DD
			dar.datasetTitles.join(';'),			

			dar.aboutApplication.projectName, // Project name
			userDetails.mainApplicantUserName,
			applicant.safeprojectapplicantfullname, //"Applicant full name"
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

/**
 * written by: Sam H. @ PA
 * 
 * buildHeaders is a helper function to support buildRows.
 * buildHeaders returns the headers as dictated by HDR UK
 */
const buildHeaders = () => {
	return [
				"ID", 
				"Status", 
				"Status Notes", 
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


export default createCSV