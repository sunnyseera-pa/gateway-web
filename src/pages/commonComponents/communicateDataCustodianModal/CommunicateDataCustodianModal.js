import React from 'react'
import { Modal } from 'react-bootstrap';
import './CommunicateDataCustodianModal.scss';

const CommunicateDataCustodianModal = ({open, closed}) => {

  const handleClose = (action) => closed(action);

  return (
    <Modal show={open} onHide={handleClose} className="cdc-modal">
    <Modal.Header closeButton>
      <Modal.Title>Communicate with the data custodian </Modal.Title>
    </Modal.Header>
    <Modal.Body>If you’ve not done so yet, we recommend contacting the data custodian and making an enquiry. The earlier you get in touch, the better. A lot of projects are not eligible for data access, so it’s important you clarify with the custodian whether they have the data you need, and whether you have a chance of getting access.</Modal.Body>
    <Modal.Footer>
      <button type='button' className='button-secondary mr-2' onClick={() => handleClose("SUBMIT_APPLICATION")}>
        Submit application
      </button>
      <button type='button' className='btn btn-primary addButton' onClick={() => handleClose("ENQUIRY")}>
        Make an enquiry
      </button>
    </Modal.Footer>
  </Modal>
  )
}

export default CommunicateDataCustodianModal;
