import React, {Fragment} from 'react'
import { isEmpty } from 'lodash';

const NavItem = ({parentForm, questionPanels, onFormSwitchPanel}) => {

    const onClickItem = (e, panel) => {
        e.preventDefault();
        onFormSwitchPanel(panel);
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
