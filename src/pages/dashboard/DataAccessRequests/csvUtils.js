const onDownloadCsvClick = (team) => {
	
	// call the backend
	const dataAccessRequests = getDataAccessRequests(team);
	cosnt csvData = createCSV(dataAccessRequests);
	
	// we pass the 2nd argument, and set a timeout, to ensure that we will get the csv 
	// back from the backend before we download the csv
	this.setState({ csvData: csvData }, () => {
		setTimeout(() => {
			this.csvLink.current.link.click();
		});
	});

	return;
}

const createCSV = (dataAccessRequests) => {

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

const getDataAccessRequests(team) {
	
	// TODO: change it to the correct route. Probably baseURL + '/api/v2/dataAccessRequests/:team' or similiar.
	// Create the route on the backend.
	const response = await axios.get(baseURL + '/api/v2/data-use-registers' + queryString)
	createCSV(response.data.data);

	return;
}


const buildRows = () => {
	return [];
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

export default onDownloadCsvClick;