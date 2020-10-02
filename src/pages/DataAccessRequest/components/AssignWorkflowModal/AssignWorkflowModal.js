import React, {Fragment, useState} from 'react';
import { Button, Modal, Row, Col, Tab, Tabs } from 'react-bootstrap';
import WorkflowsModal from './WorkflowsModal';
import { ReactComponent as CloseButtonSvg } from '../../../../images/close-alt.svg';    
// import '../../../commonComponents/relatedResourcesModal/' '../../../commonComponents/relatedResourcesModal/RelatedResources.scss';

const AssignWorkflowModal = ({open, close, workflows}) => {

    return ( 
        <Fragment className="flexCenter" >
             {/* <Button variant='white' href={''} target="_blank" className="techDetailButton mr-2" onClick={handleShow} ref={ref}> */}
                 {/* + Add resource */}
             {/* </Button> */}
        <Modal show={open} onHide={close} aria-labelledby="contained-modal-title-vcenter" className="relatedResourcesModal">
                <Modal.Header>
                    <Modal.Title >
                        <span className="black-20">Assign a workflow</span>
                        <br />
                        <span className="gray800-14">Assign a workflow so your team can help review this application. All reviewers will be notified at the point their phase begins.</span>
                    </Modal.Title>
                    <CloseButtonSvg className="modal-close pointer" onClick={close} width="24px" height="24px" fill="#475DA7" />
                </Modal.Header>
                <Modal.Body >
                    <div>body stuff</div>
                   <WorkflowsModal workflows={workflows}  />
                   {/* <WorkflowsModal searchString={epilepsy} doSearchMethod={props.doSearchMethod} doUpdateSearchString={props.doUpdateSearchString} userState={props.userState} datasetData={props.datasetData} toolData={props.toolData} projectData={props.projectData} personData={props.personData} paperData={props.paperData} summary={props.summary} doAddToTempRelatedObjects={props.doAddToTempRelatedObjects} tempRelatedObjectIds={props.tempRelatedObjectIds} relatedObjects={props.relatedObjects} /> */}
                </Modal.Body>
                <Modal.Footer>
                        <div class="flex-grow">
                            <span className="gray800-14" >{5} selected</span>
                        </div>
                        <div> 
                            {/* <Button variant='white' className="techDetailButton mr-2" id="unselectButton" onClick={props.doClearRelatedObjects} >
                                Unselect all
                            </Button>
                            <Button variant="primary" className="white-14-semibold" id="addResources" onClick={addResources} >
                                Add resources
                            </Button>  */}
                        </div>
                </Modal.Footer>
             </Modal>
         </Fragment> 
    )
};
 



export default AssignWorkflowModal;
