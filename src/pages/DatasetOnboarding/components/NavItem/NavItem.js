import React, { useState, Fragment } from 'react';
import { isEmpty } from 'lodash';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import DarHelper from '../../../../utils/DarHelper.util';
import StatusDisplay from '../../../commonComponents/StatusDisplay';
import '../../DatasetOnboarding.scss';


const NavItem = ({ parentForm, questionPanels, onFormSwitchPanel, activePanelId, enabled, notForReview }) => {
	const onClickItem = (e, panel) => {
		e.preventDefault();
		if (enabled) {
			onFormSwitchPanel(panel);
		}
	};

	let completion = {
		Summary: 'partial',
		Documentation: 'partial',
		Coverage: 'empty',
		Provenance: 'partial',
		Origin: 'partial',
		Temporal: 'partial',
		Accessibility: 'empty',
		Usage: 'empty',
		Access: 'empty',
		'Formats and standards': 'empty',
		Enrichment: 'partial',
		Observations: 'partial',
		'Structural Meta Data': 'partial',
	};


							

	const buildNavItem = () => {
		let qPanels = [...questionPanels];
		const baseClasses = 'dar-nav-item text-size-small ';
		if (!isEmpty(qPanels)) {
			return qPanels.map((item, index) => {
				if (parentForm.pageId === item.pageId && item.navHeader) {
					let classes = item.panelId === activePanelId ? baseClasses + ' nav-item-active ' : baseClasses;
					classes = notForReview === true ? classes + ' section-not-inreview' : classes + ' gray800-14';

					return (
						<li className={classes} style={{ cursor: 'pointer' }} key={index} onClick={e => onClickItem(e, item)}>
							<div>
							<div className='completionIconHolder'>
								<OverlayTrigger
									key={item.navHeader}
									placement='top'
									overlay={
										<Tooltip id={`tooltip-top`}>
											{item.navHeader}: {completion[item.navHeader]}
										</Tooltip>
									}>
									<div>
										<StatusDisplay section={item.navHeader} status={completion[item.navHeader]} />
									</div>
								</OverlayTrigger>
							</div>
							<div className='titleHolder'>{item.navHeader}</div>
							<div>{item.flag && <i className={DarHelper.flagPanelIcons[item.flag]}></i>}</div>
							</div>
						</li>
					);
				}
			});
		}
	};

	return <Fragment>{buildNavItem()}</Fragment>;
};

export default NavItem;
