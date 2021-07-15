import React from 'react';
import { Col, Row, Collapse, Alert } from 'react-bootstrap';
import SVGIcon from '../../../images/SVGIcon';
import { ReactComponent as VariableSvg } from '../../../images/variable.svg';
import { ReactComponent as GoldStar } from '../../../images/cd-star.svg';
import '../Dataset.scss';

class TechnicalMetadataVariables extends React.Component {
	state = {
		open: false,
		flagClosed: true,
		techMetadataVariables: null,
	};

	constructor(props) {
		super(props);
		this.state.open = props.open;
		this.state.techMetadataVariables = props.techMetadataVariables;
		this.updateFlag = this.updateFlag.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.open !== this.props.open) {
			this.setState({
				open: this.props.open,
			});
			if (this.props.open) {
				this.setState({
					flagClosed: false,
				});
			} else {
				this.setState({
					flagClosed: true,
				});
			}
		}
	}

	updateFlag() {
		if (this.state.flagClosed === true) {
			this.setState({ flagClosed: false });
		} else if (this.state.flagClosed === false) {
			this.setState({ flagClosed: true });
		}
	}

	render() {
		const { open, flagClosed, techMetadataVariables } = this.state;

		const dummyData = [
			{
				value: 'A782',
				frequency: 1234,
			},
			{
				value: 'B782',
				frequency: 2222,
			},
			{
				value: 'C782',
				frequency: 100,
			},
			{
				value: 'D782',
				frequency: 2,
			},
			{
				value: 'E782',
				frequency: 33,
			},
			{
				value: 'F782',
				frequency: 124,
			},
			{
				value: 'G782',
				frequency: 44,
			},
			{
				value: 'H782',
				frequency: 1,
			},
			{
				value: 'I782',
				frequency: 1208,
			},
			{
				value: 'J782',
				frequency: 1234,
			},
			{
				value: 'K782',
				frequency: 555,
			},
		];
		var svgClassName = '';
		if (flagClosed === false) {
			svgClassName = 'flipSVG';
		}

		return (
			<div
				className={open ? 'variableBox pad-bottom-16 pointer' : 'variableBox pad-bottom-16  heightVariable pointer'}
				onClick={() => this.setState({ open: !open, flagClosed: !flagClosed })}>
				<Row className='centerVariable'>
					<Col sm={11} lg={11} className='black-14-bold pl-3 variablePadding'>
						<span>
							<VariableSvg className='mr-1' style={{ float: 'left' }} />
						</span>

						<span className='pad-right-8' style={{ float: 'left' }}>
							{techMetadataVariables ? techMetadataVariables.label : ''}
						</span>

						<span className='gray800-14-opacity' style={{ float: 'left' }}>
							{open
								? ''
								: techMetadataVariables && techMetadataVariables.description && techMetadataVariables.description !== null
								? techMetadataVariables.description.substr(0, 60) + (techMetadataVariables.description.length > 60 ? '...' : '')
								: ''}
						</span>
						{techMetadataVariables ? (
							<span className='gray800-14-opacity centerSpan' style={{ float: 'right' }}>
								99.3% complete
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
					{techMetadataVariables ? (
						<div>
							<Row>
								<Col sm={11} lg={11} className='gray800-14-opacity pad-top-8'>
									{techMetadataVariables ? techMetadataVariables.description : ''}
								</Col>
							</Row>
							<Row className='pad-top-16'>
								<span className='gray800-14-opacity pad-right-24 margin-left-15'>Data type</span>
								<span className='gray800-14 pad-right-8'>
									{techMetadataVariables.dataType
										? techMetadataVariables.dataType.label.charAt(0).toUpperCase() +
										  techMetadataVariables.dataType.label.substring(1).toLowerCase()
										: '-'}
								</span>
								{techMetadataVariables && techMetadataVariables.dataType.domainType !== 'PrimitiveType' ? (
									<Alert variant='info' className='customLabel gray700-13'>
										Custom type
									</Alert>
								) : (
									' '
								)}
							</Row>
						</div>
					) : (
						<div>
							<Row>
								<Col sm={11} lg={11} className='gray800-14-opacity pad-top-8'>
									{techMetadataVariables ? techMetadataVariables.description : ''}
								</Col>
							</Row>
							<Row className='pad-top-16'>
								<span className='gray800-14-opacity pad-right-24 margin-left-15'>Data type</span>
								<span className='gray800-14 pad-right-8'>
									{techMetadataVariables.dataType
										? techMetadataVariables.dataType.label.charAt(0).toUpperCase() +
										  techMetadataVariables.dataType.label.substring(1).toLowerCase()
										: '-'}
								</span>
								<span className='gray800-14-opacity pad-right-24 margin-left-15'>Max length</span>
								<span className='gray800-14 pad-right-8'>
									{/* {techMetadataVariables.dataType
										? techMetadataVariables.dataType.label.charAt(0).toUpperCase() +
										  techMetadataVariables.dataType.label.substring(1).toLowerCase()
										: '-'} */}
									8
								</span>
								<span className='gray800-14-opacity pad-right-24 margin-left-15'>Number of rows</span>
								<span className='gray800-14 pad-right-8'>
									{/* {techMetadataVariables.dataType
										? techMetadataVariables.dataType.label.charAt(0).toUpperCase() +
										  techMetadataVariables.dataType.label.substring(1).toLowerCase()
										: '-'} */}
									10,456
								</span>
								<span className='gray800-14-opacity pad-right-24 margin-left-15'>Completeness</span>
								<span className='gray800-14 pad-right-8'>
									{/* {techMetadataVariables.dataType
										? techMetadataVariables.dataType.label.charAt(0).toUpperCase() +
										  techMetadataVariables.dataType.label.substring(1).toLowerCase()
										: '-'} */}
									99.4%
								</span>

								{techMetadataVariables && techMetadataVariables.dataType.domainType !== 'PrimitiveType' ? (
									<Alert variant='info' className='customLabel gray700-13'>
										Custom type
									</Alert>
								) : (
									' '
								)}
							</Row>
						</div>
					)}
				</Collapse>
			</div>
		);
	}
}

export default TechnicalMetadataVariables;
