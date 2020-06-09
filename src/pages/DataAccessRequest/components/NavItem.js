import React, {Fragment} from 'react'
import { isEmpty } from 'lodash';

const NavItem = ({parentForm, questionPanels, onFormSwitchPanel}) => {

    const onClick = (panelId) => {
        onFormSwitchPanel(panelId);
    }

    const buildNavItem = () => {
        let qPanels = [...questionPanels];
        if(!isEmpty(qPanels)) {
            return qPanels.map((item, index) =>{
                if (parentForm.pageId === item.pageId) {
                    return  (
                        <li 
                            className="Gray800-14px" 
                            style={{cursor: 'pointer'}} 
                            key={index} 
                            onClick={e => onClick(item.panelId)}>
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
