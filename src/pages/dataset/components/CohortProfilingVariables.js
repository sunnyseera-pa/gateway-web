import React from 'react';
import { Col, Row, Collapse, Button } from 'react-bootstrap';
import { has } from 'lodash';
import SVGIcon from '../../../images/SVGIcon';
import Loading from '../../commonComponents/Loading';
import axios from 'axios';
import { ReactComponent as VariableSvg } from '../../../images/variable.svg';
import { ReactComponent as GoldStar } from '../../../images/cd-star.svg';
import '../Dataset.scss';

var baseURL = require('../../commonComponents/BaseURL').getURL();
class CohortProfilingVariables extends React.Component {
	state = {
		open: false,
		flagClosed: true,
		cohortProfilingVariables: null,
		cohortProfilingData: null,
		isLoading: false,
		searchString: '',
		sortType: '-frequency',
		showAllRows: false,
	};

	constructor(props) {
		super(props);
		this.state.cohortProfilingVariables = props.cohortProfilingVariables;
		this.updateFlag = this.updateFlag.bind(this);
	}

	onSearch = e => {
		this.setState({ searchString: e.target.value });
	};

	async getVariableData() {
		this.setState({ open: !this.state.open, flagClosed: !this.state.flagClosed });
		if (!this.state.cohortProfilingData) {
			this.setState({ isLoading: true });
			await axios
				.get(
					baseURL +
						'/api/v2/cohortProfiling/' +
						this.props.datasetID +
						'/' +
						this.props.tableName +
						'/' +
						this.props.cohortProfilingVariables.name
				)
				.then(res => {
					this.setState({
						cohortProfilingData: res.data.cohortProfiling[0],
						isLoading: false,
					});
				});
		}
	}

	async searchVariableData(e) {
		if (e.key === 'Enter') {
			this.setState({ isLoading: true });
			await axios
				.get(
					baseURL +
						'/api/v2/cohortProfiling/' +
						this.props.datasetID +
						'/' +
						this.props.tableName +
						'/' +
						this.props.cohortProfilingVariables.name +
						'?value=' +
						this.state.searchString
				)
				.then(res => {
					this.setState({
						cohortProfilingData: res.data.cohortProfiling[0],
						isLoading: false,
					});
				});
		}
	}

	async sortVariableData(sortType) {
		this.setState({ isLoading: true });
		if (sortType === this.state.sortType) {
			sortType = '-' + sortType;
		}

		await axios
			.get(
				baseURL +
					'/api/v2/cohortProfiling/' +
					this.props.datasetID +
					'/' +
					this.props.tableName +
					'/' +
					this.props.cohortProfilingVariables.name +
					'?sort=' +
					sortType
			)
			.then(res => {
				this.setState({
					cohortProfilingData: res.data.cohortProfiling[0],
					isLoading: false,
					sortType,
				});
			});
	}

	showAllRows() {
		if (has(this.state.cohortProfilingData, 'values') && this.state.cohortProfilingData.values.length > 10 && !this.state.showAllRows) {
			return (
				<>
					{this.state.cohortProfilingData.values.slice(0, 1).map(value => (
						<Row className='variable-row'>
							<Col sm={3} lg={3} className='gray800-14 pad-top-8'>
								{value.value}
							</Col>
							<Col sm={1} lg={1} className='gray800-14 pad-top-8'>
								{value.frequency}
							</Col>
							<Col sm={8} lg={8} className='gray800-14 pad-top-8'>
								<div className='frequency-bar' style={{ width: `${value.frequencyAsPercentage * 100}%` }}>
									&nbsp;
								</div>
							</Col>
						</Row>
					))}
					<Row>
						<Col sm={12} lg={12}>
							<button className='button-tertiary show-all-button mt-3' type='button' onClick={() => this.toggleRows()}>
								Show all {this.state.cohortProfilingData.values.length} rows
							</button>
						</Col>
					</Row>
				</>
			);
		} else {
			return (
				<>
					{this.state.cohortProfilingData.values.map(value => (
						<Row className='variable-row'>
							<Col sm={3} lg={3} className='gray800-14 pad-top-8'>
								{value.value}
							</Col>
							<Col sm={1} lg={1} className='gray800-14 pad-top-8'>
								{value.frequency}
							</Col>
							<Col sm={8} lg={8} className='gray800-14 pad-top-8'>
								<div className='frequency-bar' style={{ width: `${value.frequencyAsPercentage * 100}%` }}>
									&nbsp;
								</div>
							</Col>
						</Row>
					))}
				</>
			);
		}
	}

	toggleRows() {
		this.setState({ showAllRows: true });
		this.showAllRows();
	}
	updateFlag() {
		this.setState({ flagClosed: !this.state.flagClosed });
	}

	render() {
		const { open, flagClosed, cohortProfilingVariables, cohortProfilingData, searchString, sortType } = this.state;

		let svgClassName = '';
		if (flagClosed === false) {
			svgClassName = 'flipSVG';
		}

		if (this.state.isLoading) {
			return <Loading />;
		}

		return (
			<div className={open ? 'variableBox pad-bottom-16 pointer' : 'variableBox pad-bottom-16  heightVariable pointer'}>
				<Row className='centerVariable' onClick={() => this.getVariableData()}>
					<Col sm={11} lg={11} className='black-14-bold pl-3 variablePadding'>
						<span>
							<VariableSvg className='mr-1' style={{ float: 'left' }} />
						</span>

						<span className='pad-right-8' style={{ float: 'left' }}>
							{cohortProfilingVariables ? cohortProfilingVariables.name : ''}
						</span>

						<span className='gray800-14-opacity' style={{ float: 'left' }}>
							{open
								? ''
								: cohortProfilingVariables && cohortProfilingVariables.description && cohortProfilingVariables.description !== null
								? cohortProfilingVariables.description.substr(0, 60) + (cohortProfilingVariables.description.length > 60 ? '...' : '')
								: ''}
						</span>
						{cohortProfilingVariables ? (
							<span className='gray800-14-opacity centerSpan' style={{ float: 'right' }}>
								{cohortProfilingVariables.completeness}% complete
								<GoldStar fill={'#f98e2b'} height='20' width='20' className='ml-1' />
							</span>
						) : (
							''
						)}
					</Col>

					<Col sm={1} lg={1}>
						<span>
							<SVGIcon
								name='chevronbottom'
								fill={'#475da7'}
								className={flagClosed === true ? 'svg-24 variableArrow' : 'svg-24 flipSVG variableArrow'}
							/>
						</span>
					</Col>
				</Row>

				<Collapse in={this.state.open} className='collapseWait pad-top-8'>
					{cohortProfilingData ? (
						<div>
							<Row>
								<Col sm={11} lg={11} className='gray800-14-opacity pad-top-8'>
									{cohortProfilingVariables ? cohortProfilingVariables.description : ''}
								</Col>
							</Row>
							<Row className='pad-top-16 mb-2'>
								<Col sm={2} lg={2} className='gray800-14-opacity pad-right-24 margin-left-15'>
									Data Type
								</Col>
								<Col sm={9} lg={9} className='gray800-14 pad-right-8'>
									{cohortProfilingData.dataType ? cohortProfilingData.maxLength : '-'}
								</Col>
							</Row>
							<Row className='mb-2'>
								<Col sm={2} lg={2} className='gray800-14-opacity pad-right-24 margin-left-15'>
									Max length
								</Col>
								<Col sm={9} lg={9} className='gray800-14 pad-right-8'>
									{cohortProfilingData.maxLength ? cohortProfilingData.maxLength : '-'}
								</Col>
							</Row>
							<Row className='mb-2'>
								<Col sm={2} lg={2} className='gray800-14-opacity pad-right-24 margin-left-15'>
									Number of rows
								</Col>
								<Col sm={9} lg={9} className='gray800-14 pad-right-8'>
									{cohortProfilingData.numRows ? cohortProfilingData.numRows : '-'}
								</Col>
							</Row>
							<Row className='mb-2'>
								<Col sm={2} lg={2} className='gray800-14-opacity pad-right-24 margin-left-15'>
									Completeness
								</Col>
								<Col sm={9} lg={9} className='gray800-14 pad-right-8'>
									{cohortProfilingData.completeness ? `${cohortProfilingData.completeness}%` : '-'}
								</Col>
							</Row>
							<Row className='sorting-buttons-container'>
								<Col sm={3} lg={3} className='gray800-14 pad-top-8 pad-bottom-8'>
									<button className='sort-button' type='button' onClick={() => this.sortVariableData('value')}>
										Value{' '}
										<span>
											{sortType === 'value' ? <SVGIcon name='chevronbottom' viewBox="0 0 25 25" fill={'#475da7'} className={'svg-24'} /> : ''}
											{sortType === '-value' ? (
												<SVGIcon name='chevronbottom' viewBox="0 0 25 25" fill={'#475da7'} className={'svg-24 flipSVG'} />
											) : (
												''
											)}
										</span>
									</button>
								</Col>
								<Col sm={9} lg={9} className='gray800-14 pad-top-8 pad-bottom-8'>
									<button className='sort-button' type='button' onClick={() => this.sortVariableData('frequency')}>
										Frequency{' '}
										{
											<span>
												{sortType === '-frequency' ? (
													<SVGIcon name='chevronbottom' viewBox="0 0 25 25" fill={'#475da7'} className={'svg-24'} />
												) : (
													''
												)}
												{sortType === 'frequency' ? (
													<SVGIcon name='chevronbottom' viewBox="0 0 25 25" fill={'#475da7'} className={'svg-24 flipSVG'} />
												) : (
													''
												)}
											</span>
										}
									</button>
								</Col>
							</Row>
							<Row>
								<Col sm={12} lg={12} className='gray800-14 pad-top-8'>
									<span className='variableSearchBar form-control'>
										<span className='variableSearchIcon'>
											<SVGIcon name='searchicon' width={20} height={20} fill={'#2c8267'} stroke='none' type='submit' />
										</span>
										<span>
											<input
												id='variableSearchBarInput'
												type='text'
												placeholder='Search value'
												onChange={event => this.onSearch(event)}
												value={searchString}
												onKeyDown={event => this.searchVariableData(event)}
											/>
										</span>
									</span>
								</Col>
							</Row>

							{this.showAllRows()}
						</div>
					) : (
						<div></div>
					)}
				</Collapse>
			</div>
		);
	}
}

export default CohortProfilingVariables;
