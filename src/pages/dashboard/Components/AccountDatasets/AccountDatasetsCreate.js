import React, { useEffect } from 'react';
import _ from 'lodash';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import SVGIcon from '../../../../images/SVGIcon';
import serviceDatasetOnboarding from '../../../../services/dataset-onboarding/dataset-onboarding';
import googleAnalytics from '../../../../tracking';

const AccountDatasetsCreate = props => {
	const {
		publisherID,
		team,
		alert: { message },
	} = props;

	const dataPostDatasetOnboarding = serviceDatasetOnboarding.usePostDatasetOnboarding({ publisherID }, null, {
		enabled: false,
	});

	const createNewDataset = e => {
		e.preventDefault();

		dataPostDatasetOnboarding.refetch();
	};

	useEffect(() => {
		if (dataPostDatasetOnboarding.data) {
			const {
				data: {
					data: {
						data: { id },
					},
				},
			} = dataPostDatasetOnboarding;

			if (!_.isUndefined(id)) window.location.href = `/dataset-onboarding/${id}`;
		}
	}, [dataPostDatasetOnboarding.data]);

	return (
		<>
			{message && (
				<Alert variant={'success'} className='col-sm-12 main-alert'>
					<SVGIcon name='check' width={18} height={18} fill={'#2C8267'} /> {message}
				</Alert>
			)}
			<div className='accountHeader'>
				<Row>
					<Col sm={12} md={8}>
						<div>
							<span className='black-20'>Datasets</span>
						</div>
						<div>
							<span className='gray700-13 '>
								{publisherID !== 'admin'
									? 'View, add, edit, archive and check the status of your datasets.'
									: 'Approve or reject pending datasets'}
							</span>
						</div>
					</Col>
					<Col sm={12} md={4} style={{ textAlign: 'right' }}>
						{team !== 'admin' && (
							<Button
								variant='primary'
								className='addButton'
								onClick={
									(() => googleAnalytics.recordEvent('Datasets', 'Add a new dataset', 'Datasets dashboard button clicked'),
									createNewDataset)
								}>
								+ Add a new dataset
							</Button>
						)}
					</Col>
				</Row>
			</div>
		</>
	);
};

export default AccountDatasetsCreate;
