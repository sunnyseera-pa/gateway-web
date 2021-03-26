import React from 'react'
import Field from './Field';
import FieldRepeaterAction from './FieldRepeaterAction';
import './FieldRepeater.scss';

const FieldRepeater = ({id, data, handleFieldChange, handleRemoveClick, handleAddClick}) => {
  let { subscribedEmails = [], notificationType = ''} = data;
  return (
    <div key={`repeater-${id}`}>
       {[...subscribedEmails].map(
        (value = {}, index = 1) => (
          <div className='field-repeater' key={`repeater-section-${index}`}>
            <Field id={index + 1} data={value} index={index} notificationType={notificationType} handleFieldChange={handleFieldChange} />
            <FieldRepeaterAction 
              data={subscribedEmails}
              notificationType={notificationType}
              index={index}
              handleRemoveClick={handleRemoveClick}
              handleAddClick={handleAddClick}  />
          </div>
        )
      )}
    </div>
  )
}

export default FieldRepeater;