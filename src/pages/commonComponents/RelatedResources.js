import React, {Fragment, useState} from 'react';
import { Button, Modal, Row, Col, Tab, Tabs } from 'react-bootstrap';
import RelatedResourcesModal from './RelatedResourceModal';
import { ReactComponent as CloseButtonSvg } from '../../images/close.svg';  


 
function RelatedResources(props) {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function addResources() {
        handleClose();
        props.doAddToRelatedObjects();

    }

    function closeModal() {
        handleClose();
        props.doClearRelatedObjects();
    }
    
    return (
        <Fragment className="flexCenter">
            <Button variant='white' href={''} target="_blank" className="techDetailButton mr-2" onClick={handleShow}>
                + Add resource
            </Button>
            <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered className="relatedResourcesModal" dialogClassName="modal-70w">
                <div class="modalWrapper">
                <Modal.Header>
                    <Modal.Title >
                        <span className="black-20">Add related resources</span>
                        <br />
                        <span className="gray800-14">Link this to other papers, projects, datasets and tools. Resources must be added to the Gateway first.</span>
                    </Modal.Title>
                    <CloseButtonSvg className="modal-close pointer" onClick={closeModal} />
                </Modal.Header>
                <Modal.Body >
                   <RelatedResourcesModal toolid={props.toolid} projectid={props.projectid} paperid={props.paperid} searchString={props.searchString} doSearchMethod={props.doSearchMethod} doUpdateSearchString={props.doUpdateSearchString} userState={props.userState} datasetData={props.datasetData} toolData={props.toolData} projectData={props.projectData} personData={props.personData} paperData={props.paperData} summary={props.summary} doAddToTempRelatedObjects={props.doAddToTempRelatedObjects} tempRelatedObjectIds={props.tempRelatedObjectIds} relatedObjects={props.relatedObjects} />
                </Modal.Body>
                </div>  
                <Modal.Footer>
                        <div class="flex-grow">
                            <span className="gray800-14" >{props.tempRelatedObjectIds.length} selected</span>
                        </div>
                        <div> 
                            <Button variant='white' className="techDetailButton mr-2" id="unselectButton" onClick={props.doClearRelatedObjects} >
                                Unselect all
                            </Button>
                            <Button variant="primary" className="white-14-semibold" id="addResources" onClick={addResources} >
                                Add resources
                            </Button> 
                        </div>
                </Modal.Footer>
             </Modal>
        </Fragment>
    )
} 

export default RelatedResources;
