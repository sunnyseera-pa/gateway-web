import React, { useState } from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import _ from 'lodash';
import SVGIcon from '../../../../images/SVGIcon';
import './DoubleDropdowncustom.scss';

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	<a
		className='noTextDecoration'
		href='javascript:void(0)'
		ref={ref}
		onClick={e => {
			e.preventDefault();
			onClick(e);
		}}>
		{children}
	</a>
));

class DoubleDropdownCustom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
			readOnly: props.readOnly || false,
			closed: true,
		};
		this.handleFocus = this.handleFocus.bind(this);
		this.handleBlur = this.handleBlur.bind(this);
	}

	// initialize our state
	state = {
		contributorsInfo: [],
	};

	setContributorValue(contributor) {
		this.setState(this.props.onChange.bind(null, contributor));
	}

	handleChange(e) {
		this.setState(
			{
				value: e.target.value,
			},
			this.props.onChange.bind(null, e.target.value)
		);
	}

	handleFocus(e) {
		this.props.onFocus();
	}
	handleBlur(e) {
		this.props.onBlur(this.props.value);
	}

	render() {
		const { contributorsInfo } = this.state;

		return (
			<Navbar collapseOnSelect expand='lg'>
				<Nav className='mr-auto'>
					<Dropdown>
						<Dropdown.Toggle className='double-dropdown-input'>
							<input
								name={this.props.name}
								id={this.props.id}
								disabled={this.state.readOnly}
								aria-labelledby={this.props.labelId}
								//className={this.props.classes.input}
								required={this.props.required ? 'required' : undefined}
								type='text'
								onChange={e => this.handleChange(e)}
								onBlur={this.handleBlur}
								onFocus={this.handleFocus}
								value={this.state.value}
								data-test-id='darContributorTextInput'></input>
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item>Age category research</Dropdown.Item>
							<Dropdown.Item>Ancestry research</Dropdown.Item>
							<Dropdown className='nested-dropdown-whole'>
								<Dropdown.Toggle className='nested-dropdown'>
									Biomedical research
									<SVGIcon
										width='20px'
										height='20px'
										name='chevronbottom'
										fill={'#475da7'}
										className={this.state.closed ? 'chevron nest-dropdown-arrow' : 'chevron flip180 nest-dropdown-arrow'}
									/>
								</Dropdown.Toggle>

								<Dropdown.Menu className='nested-dropdown-menu'>
									<Dropdown.Item>Disease category research</Dropdown.Item>
									<Dropdown.Item>Gentic research</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							<Dropdown.Item>Gender category research</Dropdown.Item>
							<Dropdown.Item>Method development</Dropdown.Item>
							<Dropdown.Item>Population research</Dropdown.Item>
							<Dropdown.Item>Research control</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Nav>
			</Navbar>
		);
	}
}

DoubleDropdownCustom.defaultProps = {
	value: '',
	onChange: () => {},
	onFocus: () => {},
	onBlur: () => {},
};

export default DoubleDropdownCustom;
