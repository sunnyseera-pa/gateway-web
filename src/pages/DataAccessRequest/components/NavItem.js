import React, {Fragment} from 'react'
import { isEmpty } from 'lodash';

const NavItem = ({parentForm, questionPanels, onFormSwitchPanel, activePanelId}) => {

    const onClickItem = (e, panel) => {
        e.preventDefault();
        onFormSwitchPanel(panel);
    }

    const buildNavItem = () => {
        let qPanels = [...questionPanels];
        const baseClasses = 'gray800-14 dar-nav-item';
        if(!isEmpty(qPanels)) {
            return qPanels.map((item, index) =>{
                if (parentForm.pageId === item.pageId) {
                    let classes = item.panelId === activePanelId ? baseClasses + ' nav-item-active' : baseClasses;
                    return  (
                        <li 
                            className={classes} 
                            style={{cursor: 'pointer'}} 
                            key={index} 
                            onClick={e => onClickItem(e, item)}>
                            {item.navHeader}
                        </li> 
                    )
                }
            });
        }
    }

    return (
        <Fragment>
            {buildNavItem()}
        </Fragment>
    )
}

export default NavItem;
