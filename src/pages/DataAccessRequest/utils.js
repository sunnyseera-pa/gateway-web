const createCSV = (questionAnswers, id, applicationStatus, createdAt, updatedAt, datasets) => {
		
		// set headers
		const headers = [
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
		
		const row = [
			id,
			applicationStatus,
			createdAt,
			updatedAt,
			datasets[0].name,
			questionAnswers.applicationthisapplication,
			questionAnswers.safeprojectapplicantfullname,
			questionAnswers.safeprojectapplicantfullname,
			questionAnswers.safeprojectapplicantjobtitle,
			questionAnswers.safeprojectapplicanttelephone,
			questionAnswers.safeprojectapplicantaffiliation,
			questionAnswers.safeprojectapplicantorcid,
			questionAnswers.safeprojectapplicantemail,
			questionAnswers.safeprojectapplicantrole,
			questionAnswers.safeprojectapplicantdataaccess,
			questionAnswers.safeprojectorganisationname,
			questionAnswers.safeprojectorganisationaddress1,
			questionAnswers.safeprojectorganisationaddress2,
			questionAnswers.safeprojectorganisationpostcode,
			questionAnswers.safeprojectorganisationcity,
			questionAnswers.safeprojectorganisationcountry,
		];

		
	return [headers, row];
}

export default createCSV;