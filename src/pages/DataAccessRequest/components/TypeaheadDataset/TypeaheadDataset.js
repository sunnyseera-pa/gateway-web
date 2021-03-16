import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import _ from 'lodash';
import { baseURL } from '../../../../configs/url.config';

class TypeaheadDataset extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: props.selectedDatasets,
			options: [],
			id: props.id,
			readOnly: props.readOnly || false,
			publisher: null,
		};
	}

	componentDidMount() {
		this.getData();
	}

	componentDidUpdate(prevProps) {
		const { selectedDatasets } = this.props;
		if (selectedDatasets !== prevProps.selectedDatasets) {
			if (selectedDatasets.length < 2) {
				this.getData();
			}
			this.setState({
				value: selectedDatasets,
			});
		}
	}

	getData() {
		const { selectedDatasets, allowAllCustodians } = this.props;
		let { publisher } = this.state;

		if (selectedDatasets && selectedDatasets.length > 0) {
			({ publisher } = selectedDatasets[0]);
		} else if (allowAllCustodians) {
			publisher = null;
		}

		this.setState({
			publisher,
		});

		axios
			.get(`${baseURL}/api/v2/datasets`, {
				params: {
					activeflag: 'active',
					fields: 'datasetid,name,description,datasetfields.abstract,_id,datasetfields.publisher,datasetfields.contactPoint',
					populate: 'publisher',
					is5Safes: true,
					...(publisher ? { ['datasetfields.publisher']: publisher } : {}),
				},
			})
			.then(res => {
				const {
					data: { datasets = [] },
				} = res;
				const formattedDatasets = datasets.map(dataset => {
					let {
						_id,
						datasetid: datasetId,
						name,
						description,
						publisher: publisherObj,
						datasetfields: { abstract, publisher, contactPoint },
					} = dataset;
					return {
						_id,
						datasetId,
						name,
						description,
						abstract,
						publisher,
						publisherObj,
						contactPoint,
					};
				});
				let value = [...this.state.value];
				this.setState({ options: [...formattedDatasets], value });
			})
			.catch(err => {
				console.error(err);
				alert('Failed to fetch publisher datasets');
			});
	}

	handleChange(e) {
		this.props.onHandleDataSetChange(e);
		this.setState({
			value: e,
		});
	}

	datasetOption(item) {
		const { publisher = 'No publisher set', description, abstract, name: optionName = 'No dataset name' } = item;
		const { publisher: publisherSelected } = this.state;
		const optionDescription =
			publisherSelected === null ? publisher : description || abstract || 'No description set';

		return (
			<div>
				<div className='optionName'>{optionName}</div>
				<div className='optionDescription'>{optionDescription}</div>
			</div>
		);
	}

	render() {
		return (
			<Typeahead
				id={'typeaheadDataset'}
				className={`addFormInputTypeAhead ${_.isEmpty(this.state.value) ? 'emptyFormInputTypeAhead' : ''}`}
				options={this.state.options}
				ref={typeahead => (this._typeahead = typeahead)}
				onChange={e => {
					this.handleChange(e);
				}}
				selected={this.state.value}
				filterBy={['name']}
				multiple
				disabled={this.state.readOnly}
				defaultSelected={this.state.value}
				labelKey={options => `${options.name}`}
				renderMenuItemChildren={option => this.datasetOption(option)}
			/>
		);
	}
}

TypeaheadDataset.defaultProps = {
	id: '',
	options: [],
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
};

export default TypeaheadDataset;
