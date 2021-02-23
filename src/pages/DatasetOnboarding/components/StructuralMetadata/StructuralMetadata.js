import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { ReactComponent as UploadSVG } from '../../../../images/upload.svg';
import readXlsxFile from 'read-excel-file';
import { Row, Col, Alert, Table } from 'react-bootstrap';
import { baseURL } from '../../../../configs/url.config';
import './StructuralMetadata.scss';

const StructuralMetadata = ({ onStructuralMetaDataUpdate, structuralMetadata, structuralMetadataErrors, currentVersionId, readOnly }) => {
	// 10mb - 10485760
	// 2mb - 2097152
	const maxSize = 10485760;
	const [newStructuralMetaData, setNewStructuralMetaData] = useState(structuralMetadata);
	const [newStructuralMetaDataErrors, setNewStructuralMetaDataErrors] = useState(structuralMetadataErrors);

	const schema = {
		'Table Name': {
			prop: 'tableName',
			type: String,
			required: true,
		},
		'Table Description': {
			prop: 'tableDescription',
			type: String,
		},
		'Column Name': {
			prop: 'columnName',
			type: String,
			required: true,
		},
		'Column Description': {
			prop: 'columnDescription',
			type: String,
			required: true,
		},
		'Data Type': {
			prop: 'dataType',
			type: String,
			required: true,
		},
		Sensitive: {
			prop: 'sensitive',
			type: Boolean,
			required: true,
		},
	};

	const onChange = event => {
		if (maxSize < event.target.files[0].size) {
			setNewStructuralMetaDataErrors([{ error: 'fileSizeError' }]);
		} else {
			readXlsxFile(event.target.files[0], { schema }).then(({ rows, errors }) => {
				if (errors.length > 0) setNewStructuralMetaDataErrors(errors);
				else setNewStructuralMetaDataErrors([]);

				setNewStructuralMetaData(rows);

				if (rows.length > 0 && errors.length === 0) {
					let params = {
						rows: JSON.stringify(rows),
						key: 'structuralMetadata',
					};
					axios.patch(`${baseURL}/api/v1/dataset-onboarding/${currentVersionId}`, params);
				}
			});
		}
		event.target.value = null;
	};

	useEffect(() => {
		onStructuralMetaDataUpdate(newStructuralMetaData, newStructuralMetaDataErrors);
	}, [newStructuralMetaData, newStructuralMetaDataErrors]);

	const hiddenFileInput = React.useRef(null);

	const handleClick = () => {
		hiddenFileInput.current.click();
	};

	return (
		<div className='files'>
			<Table className='text-size-small gray-800'>
				<thead>
					<th className='metadata-field'>Metadata field</th>
					<th>Completion guidance</th>
				</thead>
				<tbody>
					<tr>
						<td>Table name*</td>
						<td>Name of the table in the dataset. Use a fully qualified name if appropiate</td>
					</tr>
					<tr>
						<td>Table description</td>
						<td>Description of the table in the dataset</td>
					</tr>
					<tr>
						<td>Column name*</td>
						<td>Name of the column in the table dataset</td>
					</tr>
					<tr>
						<td>Column description*</td>
						<td>Decription of the column in the table content</td>
					</tr>
					<tr>
						<td>Data type*</td>
						<td>Type of data contained in the column</td>
					</tr>
					<tr>
						<td>Sensitive*</td>
						<td>
							Please indicate (True / False) whether the information must be treated as sensitive and may need additional constraints /
							removal / anonymisation / masking through the data access request process. Definition: An ODRL conformant policy expressing
							the rights associated with the resource.
						</td>
					</tr>
				</tbody>
			</Table>
			<div>
				<button href='/somefile.txt' download className='button-tertiary margin-top-8 margin-bottom-24'>
					Download data dictionary template
				</button>
			</div>
			<div className='files-header'>
				<div>
					<input type='file' id='input' hidden ref={hiddenFileInput} onChange={onChange} />
					<p className='black-20-semibold margin-bottom-16'>Upload</p>
					<div className='upload'>
						<button className='button-tertiary' onClick={handleClick} disabled={readOnly}>
							<UploadSVG /> Select file...
						</button>
						<span className='gray700-alt-13'>Excel or xls. Max 10MB per file.</span>
					</div>
				</div>
			</div>
			<div className='files-area'>
				{structuralMetadataErrors.length > 0 ? (
					structuralMetadataErrors[0].error === 'fileSizeError' ? (
						'Test'
					) : (
						<Row>
							<Col xs={12} s={12} md={12}>
								<Alert variant='danger'>
									There are errors in the data you uploaded. Please correct these and try again. Errors are listed below.
								</Alert>
							</Col>
						</Row>
					)
				) : (
					''
				)}

				{structuralMetadataErrors.length !== 0 ? (
					<Row>
						<p className='dark-red-semibold-20 margin-top-16 margin-left-8'>Uploaded data errors</p>
						<Col xs={12} s={12} md={12}>
							<Alert variant='danger'>
								{structuralMetadataErrors.map(errors => {
									return (
										<>
											{errors.column === 'Sensitive' ? (
												errors.error === 'required' ? (
													<>
														Error in row {errors.row}: "{errors.column}" is empty and should be "True" or "False"
														<br />
													</>
												) : (
													<>
														Error in row {errors.row}: "{errors.column}" is "{errors.value}" and should be "True" or "False"
														<br />
													</>
												)
											) : (
												<>
													Error in row {errors.row}: "{errors.column}" is empty and is required
													<br />
												</>
											)}
										</>
									);
								})}
							</Alert>
						</Col>
					</Row>
				) : (
					''
				)}

				<Table responsive size='sm' className='margin-top-8'>
					{structuralMetadata.length !== 0 ? (
						<thead>
							<tr className='gray800-14-bold'>
								<th>Table name</th>
								<th className='table-description'>Table description</th>
								<th>Column name</th>
								<th>Column description</th>
								<th>Data type</th>
								<th>Sensitive</th>
							</tr>
						</thead>
					) : (
						''
					)}
					<tbody>
						{structuralMetadata.map((data, index) => {
							const filtered = structuralMetadataErrors.filter(dat => dat.row === index + 1);

							return (
								<tr className='gray800-14'>
									<td className={_.some(filtered, ['column', 'Table Name']) ? 'invalid-info table-cell' : 'table-cell'}>
										{data.tableName}
									</td>
									<td className={_.some(filtered, ['column', 'Table Description']) ? 'invalid-info table-cell' : 'table-cell'}>
										{data.tableDescription}
									</td>
									<td className={_.some(filtered, ['column', 'Column Name']) ? 'invalid-info table-cell' : 'table-cell'}>
										{data.columnName}
									</td>
									<td className={_.some(filtered, ['column', 'Column Description']) ? 'invalid-info table-cell' : 'table-cell'}>
										{data.columnDescription}
									</td>
									<td className={_.some(filtered, ['column', 'Data Type']) ? 'invalid-info table-cell' : 'table-cell'}>{data.dataType}</td>
									<td className={_.some(filtered, ['column', 'Sensitive']) ? 'invalid-info table-cell' : 'table-cell'}>
										{_.some(filtered, ['column', 'Sensitive']) ? _.find(filtered, ['column', 'Sensitive']).value : String(data.sensitive)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</div>
	);
};

export default StructuralMetadata;
