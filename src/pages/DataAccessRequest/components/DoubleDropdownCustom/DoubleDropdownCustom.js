import React, { useState } from 'react';
import { Dropdown, Nav, Navbar } from 'react-bootstrap';
import SVGIcon from '../../../../images/SVGIcon';
import './DoubleDropdowncustom.scss';

const DoubleDropdownCustom = ({ name, id, options, input, onChange, labelId, required }) => {
	const [closed, setClosed] = useState(true);
	const [selectedValue, setSelectedValue] = useState(null);

	const extra = options
		.map(a => a.extraOptions)
		.filter(b => b)
		.pop([]);

	const changingSelect = eventKey => {
		setSelectedValue(eventKey);
	};

	return (
		<Navbar collapseOnSelect expand='lg'>
			<Nav className='mr-auto'>
				<Dropdown onSelect={changingSelect}>
					<Dropdown.Toggle className='double-dropdown-input'>{selectedValue}</Dropdown.Toggle>
					<Dropdown.Menu>
						{options.map(b =>
							b.value === 'Biomedical research' ? (
								<Dropdown className='nested-dropdown-whole'>
									<Dropdown.Toggle className='nested-dropdown'>
										Biomedical research
										<SVGIcon
											width='20px'
											height='20px'
											name='chevronbottom'
											fill={'#475da7'}
											className={closed ? 'chevron nest-dropdown-arrow' : 'chevron flip180 nest-dropdown-arrow'}
										/>
									</Dropdown.Toggle>

									<Dropdown.Menu className='nested-dropdown-menu'>
										{extra.map(a => (
											<Dropdown.Item eventKey={a.text} onSelect={changingSelect}>
												{a.value}
											</Dropdown.Item>
										))}
									</Dropdown.Menu>
								</Dropdown>
							) : (
								<Dropdown.Item eventKey={b.value}>{b.value} </Dropdown.Item>
							)
						)}

						{/*options.map(a => (
							<Dropdown.Item eventKey={a.value}>
								{a.value}
								{a.value === 'Biomedical research' && (
									<Dropdown.Toggle className='nested-dropdown'>
										<SVGIcon
											onClick={closed ? setClosed(false) : setClosed}
											width='20px'
											height='20px'
											name='chevronbottom'
											fill={'#475da7'}
											className={closed ? 'chevron nest-dropdown-arrow' : 'chevron flip180 nest-dropdown-arrow'}
										/>
									</Dropdown.Toggle>
								)}
								{a.value === 'Biomedical research' && !closed && (
									<Dropdown.Menu className='nested-dropdown-menu'>
										{extra.map(a => (
											<Dropdown.Item eventKey={a.text} onSelect={changingSelect}>
												{a.value}
											</Dropdown.Item>
										))}
									</Dropdown.Menu>
								)}
							</Dropdown.Item>
										))*/}
					</Dropdown.Menu>
				</Dropdown>
			</Nav>
		</Navbar>
	);
};

export default DoubleDropdownCustom;

/*
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
									className={closed ? 'chevron nest-dropdown-arrow' : 'chevron flip180 nest-dropdown-arrow'}
								/>
							</Dropdown.Toggle>

							<Dropdown.Menu className='nested-dropdown-menu'>
								<Dropdown.Item>Disease category research</Dropdown.Item>
								<Dropdown.Item>Drug development research</Dropdown.Item>
								<Dropdown.Item>Gentic research</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
						<Dropdown.Item>Gender category research</Dropdown.Item>
						<Dropdown.Item>Method development</Dropdown.Item>
						<Dropdown.Item>Population research</Dropdown.Item>
						<Dropdown.Item>Research control</Dropdown.Item> */

/*
return (
		<Navbar collapseOnSelect expand='lg'>
			<Nav className='mr-auto'>
				<Dropdown>
					<Dropdown.Toggle className='double-dropdown-input'>
						<Typeahead
							name={name}
							id={id}
							multiple
							aria-labelledby={labelId}
							//className={props.classes.input}
							required={required ? 'required' : undefined}
							type='text'
							onChange={e => handleChange(e)}
							//onBlur={handleBlur}
							//onFocus={handleFocus}
							options={schema}
							labelKey='value'
							//selected={this.props.value}
							//data-test-id='darContributorTextInput'
						/>
					</Dropdown.Toggle>

					{/*<Dropdown.Menu>
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
									className={closed ? 'chevron nest-dropdown-arrow' : 'chevron flip180 nest-dropdown-arrow'}
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
					</Dropdown.Menu>}
					</Dropdown>
					</Nav>
				</Navbar>
			);
		};
		 */
