cosnt createCSV = (dataAccessRequests) => {
	
	// set headers
	const headers = buildHeaders();

	// push the headers as the first row of the csv document
	let csvRows = [ headers ];

	// for each dataAccessRequest create csv rows and append it to the csv rows
	for (const dar in dataAccessRequests) {
		const rows = buildRows(dar);
		csvRows.append.apply(rows);
	}

	return csvRows
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

export default createCSV;