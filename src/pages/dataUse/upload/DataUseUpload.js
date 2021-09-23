import React, { useState } from 'react';
import readXlsxFile from 'read-excel-file';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loading from './../../commonComponents/Loading';
import './../DataUse.scss';
import DataUseSubmitModal from './DataUseSubmitModal';

const DataUseUpload = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitModalVisible, toggleSubmitModal] = useState(false);

	const onUploadDataUseRegister = input => {
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
		}, 50000);

		// readXlsxFile(input.target.files[0], {
		// 	sheet: 'Data Uses Template',
		// }).then((rows, errors) => {
		// 	console.log(rows);
		// });
	};

	const submitDataUse = () => {
		console.log('data use submitted');
	};

	return (
		<>
			<Container>
				<Row className='datause-card'>
					<Col md={10}>
						<Row>
							<p className='black-20-semibold'>Upload Data uses</p>
						</Row>
						<Row>
							<p className='soft-black-14'>
								Please use the template provided to add new approved data uses . You can also download your current data use register from
								the Gateway, edit offline and uploading the edited file here:{' '}
							</p>
						</Row>
						<Row>
							<button className='button-tertiary'>
								<Link to='/DataUseUploadTemplate.xlsx' download target='_blank'>
									Download the data use template
								</Link>{' '}
							</button>
						</Row>
					</Col>
				</Row>
				<Row className='datause-card'>
					{isLoading ? (
						<Col>
							<Loading />
						</Col>
					) : (
						<Col md={10}>
							<Row>
								<p className='black-20-semibold'>Upload</p>
							</Row>
							<Row>
								<label className='btn button-tertiary'>
									<input name='dataUseSpreadSheet' type='file' style={{ display: 'None' }} onChange={() => onUploadDataUseRegister()} />
									<span>Select file...</span>
								</label>
							</Row>
						</Col>
					)}
				</Row>
			</Container>

			<DataUseSubmitModal open={isSubmitModalVisible} close={toggleSubmitModal} confirm={submitDataUse} />
		</>
	);
};

export default DataUseUpload;
