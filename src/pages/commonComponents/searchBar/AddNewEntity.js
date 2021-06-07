import React, { useState, Fragment } from 'react';
import { Dropdown } from 'react-bootstrap';
import { ReactComponent as ChevronBottom } from '../../../images/chevron-bottom.svg';
import './AddNewEntity.scss';

const CustomMenu = React.forwardRef(({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
	const [value] = useState('');

	return (
		<div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
			<ul className='list-unstyled mb-0 mt-0'>
				{React.Children.toArray(children).filter(child => !value || child.props.children.toLowerCase().startsWith(value))}
			</ul>
		</div>
	);
});

const CustomToggle = React.forwardRef(({ children, onClick, loggedIn, showLoginModal }, ref) => (
	<button
		href=''
		ref={ref}
		onClick={e => {
			e.preventDefault();
			if (loggedIn) {
				onClick(e);
			} else {
				showLoginModal();
			}
		}}
		className='addNewEntityDropdown'>
		{children}
	</button>
));

const AddNewEntity = props => {
	const showLoginModal = () => {
		let modalID = 'myModal';
		document.getElementById(modalID).style.display = 'block';
		document.getElementById('modalRequestSection').style.display = 'none';
	};

	return (
		<Fragment>
			<Dropdown data-test-id='addNewEntityDropdown' className='addNewEntityDropdown'>
				<Dropdown.Toggle as={CustomToggle} showLoginModal={showLoginModal} loggedIn={props.loggedIn}>
					+ Add new
					<span className='addNewDropDownGap'></span>
					<ChevronBottom />
				</Dropdown.Toggle>

				<Dropdown.Menu as={CustomMenu} className='addNewEntityMenu'>
					<Dropdown.Item href='/collection/add' className='black-14' data-test-id='addNewCollection'>
						Collection
					</Dropdown.Item>
					<Dropdown.Item href='/course/add' className='black-14' data-test-id='addNewCourse'>
						Course
					</Dropdown.Item>
					<Dropdown.Item href='/paper/add' className='black-14' data-test-id='addNewPaper'>
						Paper
					</Dropdown.Item>
					<Dropdown.Item href='/project/add' className='black-14' data-test-id='addNewProject'>
						Project
					</Dropdown.Item>
					<Dropdown.Item href='/tool/add' className='black-14 ' data-test-id='addNewTool'>
						Tool
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</Fragment>
	);
};

export default AddNewEntity;
