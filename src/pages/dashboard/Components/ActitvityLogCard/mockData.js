// export default {
// 	version: 'Version 2.0.0',
// 	versionNumber: 2,
// 	dateSubmitted: '2021-11-03T14:18:45.536Z',
// 	applicationStatus: 'active',
// 	events: [
// 		{
// 			_id: '61829a9ae4ea0f9763bd3fd7',
// 			userTypes: ['applicant', 'custodian'],
// 			eventType: 'datasetVersionApproved',
// 			logType: 'dataset',
// 			timestamp: '2021-11-03T14:20:10.420Z',
// 			plainText: 'Version 2.0.0 of this dataset has been approved by portal admin Callum Reekie',
// 			html: '<b>Version 2.0.0</b> of this dataset has been approved by portal admin <b>Callum Reekie</b>',
// 			detailedText: 'Comment:\nThis is a quality dataset!',
// 			detailedHtml:
// 				"<div class='activity-log-detail'><div class='activity-log-detail-header'>Comment:</div><div class='activity-log-detail-row'>This is a quality dataset!</div></div>",
// 			user: '611cfb5a19d737331dad4aff',
// 			version: '2.0.0',
// 			versionId: '61829a39e4ea0f9763bd3f6b',
// 			__v: 0,
// 		},
// 		{
// 			_id: '61829a45e4ea0f9763bd3f8c',
// 			userTypes: ['applicant', 'custodian'],
// 			eventType: 'newDatasetVersionSubmitted',
// 			logType: 'dataset',
// 			timestamp: '2021-11-03T14:18:45.576Z',
// 			plainText: 'Version 2.0.0 of this dataset has been submitted by data custodian Callum Reekie',
// 			html: '<b>Version 2.0.0</b> of this dataset has been submitted by data custodian <b>Callum Reekie</b>',
// 			user: '616993c3034a7d773064e208',
// 			version: '2.0.0',
// 			versionId: '61829a39e4ea0f9763bd3f6b',
// 			__v: 0,
// 		},
// 	],
// };

export default {
	version: 'Version 2.0.0',
	versionNumber: 2,
	dateSubmitted: '2021-11-03T14:18:45.536Z',
	applicationStatus: 'active',
	events: [
		{
			_id: '6188e67b69dbf3ecdd0d0f51',
			eventType: 'datasetVersionApproved',
			logType: 'dataset',
			timestamp: '2021-11-08T08:57:31.987Z',
			user: '611cfb5a19d737331dad4aff',
			userDetails: {
				firstName: 'Callum',
				lastName: 'Reekie',
				role: 'admin',
			},
			version: '2.0.0',
			versionId: '6188e5fa69dbf3ecdd0d0e80',
			userTypes: ['admin', 'custodian'],
			adminComment: 'I approve this new dataset and have made some minor changes.',
			__v: 0,
		},
		{
			_id: '6188e67b69dbf3ecdd0d0f44',
			eventType: 'datasetUpdatesSubmitted',
			logType: 'dataset',
			timestamp: '2021-11-08T08:57:31.906Z',
			user: '611cfb5a19d737331dad4aff',
			userDetails: {
				firstName: 'Callum',
				lastName: 'Reekie',
				role: 'admin',
			},
			version: '2.0.0',
			versionId: '6188e5fa69dbf3ecdd0d0e80',
			userTypes: ['admin', 'custodian'],
			datasetUpdates: {
				summary: {
					abstract: {
						previousAnswer: 'I have changed the abstract of this dataset3.',
						updatedAnswer: 'I have changed the abstract of this dataset. I as admin have made a minor change.',
					},
				},
			},
			__v: 0,
		},
		{
			_id: '6188e61769dbf3ecdd0d0ed6',
			eventType: 'datasetUpdatesSubmitted',
			logType: 'dataset',
			timestamp: '2021-11-08T08:55:51.428Z',
			user: '616993c3034a7d773064e208',
			userDetails: {
				firstName: 'Callum',
				lastName: 'Reekie',
				role: 'custodian',
			},
			version: '2.0.0',
			versionId: '6188e5fa69dbf3ecdd0d0e80',
			userTypes: ['admin', 'custodian'],
			datasetUpdates: {
				summary: {
					title: {
						previousAnswer: 'ActivityLog MegaTest V1',
						updatedAnswer: 'ActivityLog MegaTest V2',
					},
					abstract: {
						previousAnswer:
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum facilisis quis sapien vitae molestie. Integer facilisis, sapien eu ultricies venenatis, arcu nisi efficitur eros, quis tincidunt dolor leo scelerisque ex.',
						updatedAnswer: 'I have changed the abstract of this dataset3.',
					},
					keywords: {
						previousAnswer: ['Advanced Cancer'],
						updatedAnswer: ['Advanced Cancer', 'Test'],
					},
				},
				provenance: {
					temporal: {
						accrualPeriodicity: {
							previousAnswer: 'IRREGULAR',
							updatedAnswer: 'CONTINUOUS',
						},
					},
				},
			},
			__v: 0,
		},
		{
			_id: '6188e61769dbf3ecdd0d0ed5',
			eventType: 'newDatasetVersionSubmitted',
			logType: 'dataset',
			timestamp: '2021-11-08T08:55:51.418Z',
			user: '616993c3034a7d773064e208',
			userDetails: {
				firstName: 'Callum',
				lastName: 'Reekie',
				role: 'custodian',
			},
			version: '2.0.0',
			versionId: '6188e5fa69dbf3ecdd0d0e80',
			userTypes: ['admin', 'custodian'],
			__v: 0,
		},
	],
};
