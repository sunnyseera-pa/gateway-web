import React from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import SelectedOption from './SelectedOption';
import SVGIcon from '../../../../images/SVGIcon';
import tickSVG from '../../../../images/tick.svg';

import './DoubleDropdowncustom.scss';

class DoubleDropdownCustom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedValues: [],
			dropdownMenu: false,
			nestedDropdownMenu: false,
		};
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	changingSelect(eventKey) {
		if (this.state.selectedValues.indexOf(eventKey) === -1) {
			this.setState({ selectedValues: [...this.state.selectedValues, eventKey] });
		}
	}

	handlechange(eventKey) {
		if (this.state.selectedValues.indexOf(eventKey) === -1) {
			this.setState({ selectedValues: [...this.state.selectedValues, eventKey] });
		}
		this.props.onChange.bind(null, this.state.selectedValues);
	}

	removeSelectedOption(option) {
		this.setState({ selectedValues: this.state.selectedValues.filter(value => value !== option) });
	}

	handleFocus(e) {
		this.props.onFocus();
	}
	handleBlur(e) {
		this.props.onBlur(this.props.value);
	}

	openDropDown() {
		this.setState({ dropdownMenu: true });
	}

	openNestedDropDown() {
		this.setState({ nestedDropdownMenu: true });
	}

	render() {
		const extra = this.props.options
			.map(a => a.extraOptions)
			.filter(b => b)
			.pop([]);

		return (
			<Navbar collapseOnSelect expand='lg'>
				<Nav className='mr-auto'>
					<Dropdown
						onSelect={this.changingSelect}
						onChange={this.handlechange}
						onFocus={this.handleFocus}
						onToggle={this.openDropDown}
						autoClose={false}>
						<Dropdown.Toggle className='double-dropdown-input' id={this.props.id}>
							<div className='selected-options-container'>
								{this.state.selectedValues.map(selectedValue => {
									return <SelectedOption text={selectedValue} close={() => this.removeSelectedOption(selectedValue)}></SelectedOption>;
								})}
							</div>
							<SVGIcon
								width='20px'
								height='20px'
								name='chevronbottom'
								fill={'#475da7'}
								className={!this.state.dropdownMenu ? 'chevron main-dropdown-arrow' : 'chevron flip180 main-dropdown-arrow'}
							/>
						</Dropdown.Toggle>
						<Dropdown.Menu className={'dropdown-menu'}>
							{this.props.options.map(b =>
								b.value === 'Biomedical research' ? (
									<Dropdown className='nested-dropdown-whole' onToggle={this.openNestedDropDown}>
										<Dropdown.Toggle className='nested-dropdown'>
											Biomedical research
											<SVGIcon
												width='20px'
												height='20px'
												name='chevronbottom'
												fill={'#475da7'}
												className={!this.state.nestedDropdownMenu ? 'chevron nest-dropdown-arrow' : 'chevron flip180 nest-dropdown-arrow'}
											/>
										</Dropdown.Toggle>

										<Dropdown.Menu className='nested-dropdown-menu'>
											{extra.map(a => (
												<Dropdown.Item eventKey={a.text} onSelect={this.changingSelect}>
													{a.value}
													{this.state.selectedValues.includes(a.value) && (
														<img src={tickSVG} width='20' style={{ float: 'right', marginTop: '3px' }} />
													)}
												</Dropdown.Item>
											))}
										</Dropdown.Menu>
									</Dropdown>
								) : (
									<Dropdown.Item eventKey={b.value}>
										{b.value}
										{this.state.selectedValues.includes(b.value) && (
											<img src={tickSVG} width='20' style={{ float: 'right', marginTop: '3px' }} />
										)}
									</Dropdown.Item>
								)
							)}
						</Dropdown.Menu>
					</Dropdown>
				</Nav>
			</Navbar>
		);
	}
}

DoubleDropdownCustom.defaultProps = {
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
};

export default DoubleDropdownCustom;
