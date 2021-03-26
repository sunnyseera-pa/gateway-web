import React from 'react'

const FieldRepeaterAction = ({ data, notificationType, index, handleRemoveClick, handleAddClick}) => {
  return (
    <div className="field-action" key={`field-action-${index}`}>
    <button onClick={e => handleRemoveClick(index, notificationType)} className="plusMinusButton" disabled={data.length !== 1 ? false : true}>-</button>
    <button onClick={() => handleAddClick(notificationType)} className="plusMinusButton" disabled={(data.length - 1 !== index) ? true : false}>+</button> 
  </div>
  )
}

export default FieldRepeaterAction;
