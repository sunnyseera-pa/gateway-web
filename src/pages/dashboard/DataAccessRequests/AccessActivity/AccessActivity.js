import React, {Fragment} from 'react';
import _ from 'lodash';
import moment from 'moment';
import SLA from '../../../commonComponents/sla/SLA';

const AccessActivity = ({datasets = [], updatedAt, applicants = '', dateSubmitted = '', publisher = ''}) =>{

 
  const buildAccessRequest = () => {
    return (
      <Fragment>
        <div className="box gray800-14">Datasets</div>
        <div className="box">
          {datasets.map((d, i) => {
            return (
              <SLA
                key={i}
                classProperty='default'
                text={d.name} />
            )
          })}
        </div>
        <div className="box">Custodian</div>
        <div className="box">{publisher}</div>
        <div className="box">Applicants</div>
        <div className="box">{!_.isEmpty(applicants) ? applicants : '-'}</div>
        <div className="box">Submitted</div>
        <div className="box">{!_.isEmpty(dateSubmitted) ? moment(dateSubmitted).format('D MMMM YYYY HH:mm') : '-'}</div>
        <div className="box">Last activity</div>
        <div className="box">{moment(updatedAt).format('D MMMM YYYY HH:mm')}</div>
      </Fragment>
    )
    
}

  return (
    <Fragment>{buildAccessRequest()}</Fragment>
  )
  
}

export default AccessActivity;