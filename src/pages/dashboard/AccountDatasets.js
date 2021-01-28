import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row, Button, Tabs, Tab } from 'react-bootstrap';
import { Event, initGA } from '../../tracking';
import _ from 'lodash';
import Loading from '../commonComponents/Loading';
import DatasetCard from '../commonComponents/DatasetCard';
import NotFound from '../commonComponents/NotFound';
import './Dashboard.scss';

var baseURL = require('../commonComponents/BaseURL').getURL();

const AccountDatasets = props => {
    const [userState] = useState(props.userState);
	const [key, setKey] = useState('active');
	const [datasetList, setDatasetList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [activeCount, setActiveCount] = useState(0);
	const [reviewCount, setReviewCount] = useState(0);
	const [archiveCount, setArchiveCount] = useState(0);
	const [rejectedCount, setRejectedCount] = useState(0);
	/* const [showActionModal, setShowActionModal] = useState(false);
	const actionModalConfig = {
		title: 'Reject this Paper?',
	}; */

    let completion1 = {
		Summary: 'partial',
		Documentation: 'partial',
		Coverage: 'empty',
		Provenance: 'partial',
		Accessibility: 'empty',
		Enrichment: 'partial',
		Observations: 'partial',
		'Structural Meta Data': 'partial',
	};
	let completion2 = {
		Summary: 'partial',
		Documentation: 'partial',
		Coverage: 'done',
		Provenance: 'partial',
		Accessibility: 'empty',
		Enrichment: 'empty',
		Observations: 'done',
		'Structural Meta Data': 'empty',
	};

	let statusIcons = { // Move to datasetcard
		partial: { text: 'Partially completed', icon: 'MetadataHalfDoneSvg' },
		done: { text: 'Completed', icon: 'MetadataHalfDoneSvg' },
		empty: { text: 'Not completed', icon: 'MetadataHalfDoneSvg' },
	};


	useEffect(() => {
		initGA('UA-166025838-1');
		doDatasetsCall();
	}, []);

    const doDatasetsCall = async () => {
        setIsLoading(true);
		//axios.get(baseURL + `/api/v1/dataset-onboarding/publisher/${props.teamid}`).then(res => { // Paul - switch to use publisher ids
		await axios.get(baseURL + `/api/v1/dataset-onboarding/publisher/5f3f9e698af2ef61552e1d78`).then(res => {
			setDatasetList(res.data.data.dataset);

			let activeCount = 0;
			let reviewCount = 0;
			let archiveCount = 0;
			let rejectedCount = 0;
debugger
            res.data.data.dataset.forEach(dataset => {
				if (dataset.activeflag === 'active') activeCount++;
				else if (dataset.activeflag === 'review') reviewCount++;
				else if (dataset.activeflag === 'archive') archiveCount++;
				else if (dataset.activeflag === 'rejected') rejectedCount++;
			});

			setActiveCount(activeCount);
			setReviewCount(reviewCount);
			setArchiveCount(archiveCount);
			setRejectedCount(rejectedCount);
			setIsLoading(false);
		});
    };
    
    const createNewDataset = e => {
        e.preventDefault();
        //call to API to create new dataset
        setIsLoading(true);
        axios.post(baseURL + '/api/v1/dataset-onboarding', {publisherID:props.team}).then(res => {
            debugger
            let { id } = res.data.data;
            //load dataset onboarding page
            if (!_.isUndefined(id)) window.location.href = `/dataset-onboarding/${id}`;
            else {
                //show error message
                setIsLoading(false);
            }
        });
        
    };

	const handleSelect = key => {
		setKey(key);
    };

    if (isLoading) {
		return (
			<Row>
				<Col xs={1}></Col>
				<Col xs={10}>
					<Loading />
				</Col>
				<Col xs={1}></Col>
			</Row>
		);
	}

	return (
		<div>
			<Row>
				<Col xs={1}></Col>
				<Col xs={10}>
					<Row className='accountHeader'>
						<Col sm={12} md={8}>
							<Row>
								<span className='black-20'>Datasets</span>
							</Row>
							<Row>
								<span className='gray700-13 '>View, add, edit, archive and check the status of your datasets.</span>
							</Row>
						</Col>
						<Col sm={12} md={4} style={{ textAlign: 'right' }}>
                            <Button
                                variant='primary'
                                className='addButton'
                                onClick={() => Event('Buttons', 'Click', 'Add a new paper'), createNewDataset}>
                                + Add a new dataset
                            </Button>
						</Col>
					</Row>
					<Row className='tabsBackground'>
						<Col sm={12} lg={12}>
							<Tabs className='dataAccessTabs gray700-13' activeKey={key} onSelect={handleSelect}>
								<Tab eventKey='active' title={'Active (' + activeCount + ')'}>
									{' '}
								</Tab>
								<Tab eventKey='pending' title={'Pending approval (' + reviewCount + ')'}>
									{' '}
								</Tab>
								<Tab eventKey='rejected' title={'Rejected (' + rejectedCount + ')'}>
									{' '}
								</Tab>
								<Tab eventKey='archive' title={'Archived (' + archiveCount + ')'}>
									{' '}
								</Tab>
							</Tabs>
						</Col>
					</Row>

                    {(() => {
						switch (key) {
							case 'active':
								return (
									<div>
										{activeCount <= 0 ? (
											<Row className='margin-right-15'>
												<NotFound word='tools' />
											</Row>
										) : (
											datasetList.map(dataset => {
												if (dataset.activeflag !== 'active' && dataset.activeflag !== 'draft') {
													return <></>;
												} else {
													return (
														<>
                                                            <DatasetCard
                                                                id={dataset._id}
                                                                title={dataset.name}
                                                                publisher={dataset.datasetfields.publisher}
                                                                version={dataset.datasetVersion}
                                                                isDraft={true}
                                                                datasetStatus={dataset.activeflag}
                                                                lastActivity={dataset.updatedAt}
                                                                completion={completion1}></DatasetCard>

                                                            {/* <DatasetCard
                                                                title='Diagnostic and Therapy Services Waiting Times'
                                                                publisher='NHS Digital'
                                                                version='3.0'
                                                                // isDraft={true}
                                                                datasetStatus='rejected'
                                                                lastActivity=''
                                                                completion={completion2}></DatasetCard> */}
                                                        </>
													);
												}
											})
										)}
									</div>
								);
							case 'pending':
								return (
									<div>
										{reviewCount <= 0 ? (
											<Row className='margin-right-15'>
												<NotFound word='tools' />
											</Row>
										) : (
											datasetList.map(dataset => {
												if (dataset.activeflag !== 'review') {
													return <></>;
												} else {
													return (
														<>
                                                            <DatasetCard
                                                                title='Cambridge Blood and Stem Cell Biobank'
                                                                publisher='a publisher'
                                                                version='2'
                                                                isDraft={true}
                                                                datasetStatus='isPending'
                                                                lastActivity=''
                                                                completion={completion1}></DatasetCard>

                                                            <DatasetCard
                                                                title='Diagnostic and Therapy Services Waiting Times'
                                                                publisher='NHS Digital'
                                                                version='3.0'
                                                                // isDraft={true}
                                                                datasetStatus='rejected'
                                                                lastActivity=''
                                                                completion={completion2}></DatasetCard>
                                                        </>
													);
												}
											})
										)}
									</div>
								);
							case 'rejected':
								return (
									<div>
										{rejectedCount <= 0 ? (
											<Row className='margin-right-15'>
												<NotFound word='tools' />
											</Row>
										) : (
											datasetList.map(dataset => {
												if (dataset.activeflag !== 'rejected') {
													return <></>;
												} else {
													return (
														<>
                                                            <DatasetCard
                                                                title='Cambridge Blood and Stem Cell Biobank'
                                                                publisher='a publisher'
                                                                version='2'
                                                                isDraft={true}
                                                                datasetStatus='isPending'
                                                                lastActivity=''
                                                                completion={completion1}></DatasetCard>

                                                            <DatasetCard
                                                                title='Diagnostic and Therapy Services Waiting Times'
                                                                publisher='NHS Digital'
                                                                version='3.0'
                                                                // isDraft={true}
                                                                datasetStatus='rejected'
                                                                lastActivity=''
                                                                completion={completion2}></DatasetCard>
                                                        </>
													);
												}
											})
										)}
									</div>
								);
							case 'archive':
								return (
									<div>
										{archiveCount <= 0 ? (
											<Row className='margin-right-15'>
												<NotFound word='tools' />
											</Row>
										) : (
											datasetList.map(dataset => {
												if (dataset.activeflag !== 'archive') {
													return <></>;
												} else {
													return (
														<>
                                                            <DatasetCard
                                                                title='Cambridge Blood and Stem Cell Biobank'
                                                                publisher='a publisher'
                                                                version='2'
                                                                isDraft={true}
                                                                datasetStatus='isPending'
                                                                lastActivity=''
                                                                completion={completion1}></DatasetCard>

                                                            <DatasetCard
                                                                title='Diagnostic and Therapy Services Waiting Times'
                                                                publisher='NHS Digital'
                                                                version='3.0'
                                                                // isDraft={true}
                                                                datasetStatus='rejected'
                                                                lastActivity=''
                                                                completion={completion2}></DatasetCard>
                                                        </>
													);
												}
											})
										)}
									</div>
								);
						}
					})()}







                    {/* <Fragment>
                        <DatasetCard
                            title='Cambridge Blood and Stem Cell Biobank'
                            publisher='a publisher'
                            version='2'
                            isDraft={true}
                            datasetStatus='isPending'
                            lastActivity=''>
                        </DatasetCard>

                        <DatasetCard
                            title='Diagnostic and Therapy Services Waiting Times'
                            publisher='NHS Digital'
                            version='3.0'
                            // isDraft={true}
                            datasetStatus='rejected'
                            lastActivity=''>
                        </DatasetCard>
                    </Fragment> */}

                    


				</Col>
				<Col xs={1}></Col>
			</Row>
		</div>
	);

}

export default AccountDatasets;