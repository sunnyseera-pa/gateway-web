import React, { useState } from 'react';

const NavDropdown = ({ options, onFormSwitchPanel }) => {
    const { questionPanels } = options;
    const { pages } = options;
    const [selectedOption, setSelectedOption] = useState(questionPanels[0].panelId, '');

    const onChangeHandler = (e) => {
        let panelId  = e.target.value;
        let { pageId } = questionPanels.find(q => q.panelId == panelId);
        setSelectedOption(panelId);
        onFormSwitchPanel({ pageId, panelId });
    }
    
    const buildOption = (o) => {
        let  { title } = pages.find(p => p.pageId === o.pageId);
        return (
            <option value={o.panelId} key={o.panelId}>{`${title} - ${o.navHeader}`}</option>
            )
    }

    return (
        <select
          value={selectedOption}
          onChange={e => onChangeHandler(e)}>
          {questionPanels.map(o => buildOption(o))}
        </select>
    );
  };

export default NavDropdown;
