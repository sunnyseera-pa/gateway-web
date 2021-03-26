import React, {useEffect} from 'react'
import { isEmpty } from 'lodash';

const Field = ({id = '', data = {}, index = 0, notificationType = '', handleFieldChange}) => {
  let {value, error} = data;
  console.log(data);

  return (
    <div className="form-group">
      <input 
      id={`field${id}`} 
      className={`form-control gray800-14 ${!isEmpty(error) ? 'is-invalid' : ''}`} 
      onChange={e => handleFieldChange(e, index, notificationType)}
      type="text" 
      value={value}
      autoComplete="off" />
      { error &&
        <div className="invalid-feedback">
         {error}
        </div>
      } 
    </div>
  )
}

export default Field;
