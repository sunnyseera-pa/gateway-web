import React, {Fragment, useState} from 'react';
import { Button, Modal, Row, Col, Tab, Tabs } from 'react-bootstrap';
import SearchBar from '../commonComponents/SearchBar';
import SimpleSearchBar from '../commonComponents/SimpleSearchBar';
import RelatedResourcesModal from './RelatedResourceModal';
import { testModeAPI } from 'react-ga';
import { ReactComponent as ClearButtonSvg } from '../../images/clear.svg';  
import SVGIcon from '../../images/SVGIcon';
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
                    <CloseButtonSvg onClick={closeModal} />
                </Modal.Header>
                <Modal.Body >
                   <RelatedResourcesModal toolid={props.toolid} projectid={props.projectid} paperid={props.paperid} searchString={props.searchString} doSearchMethod={props.doSearchMethod} doUpdateSearchString={props.doUpdateSearchString} userState={props.userState} datasetData={props.datasetData} toolData={props.toolData} projectData={props.projectData} personData={props.personData} paperData={props.paperData} summary={props.summary} doAddToTempRelatedObjects={props.doAddToTempRelatedObjects} tempRelatedObjectIds={props.tempRelatedObjectIds} relatedObjects={props.relatedObjects} />
                </Modal.Body>
                </div>  
                <Modal.Footer className="modalFooter">
                    <Col sm={1} lg={1} />
                        <Col sm={7} lg={7} className="ml-5 mr-5" id="amountSelected">
                            <span className="gray800-14" >{props.tempRelatedObjectIds.length} selected</span>
                        </Col>
                        <Col sm={4} lg={4} > 
                            <Button variant='white' className="techDetailButton mr-2" id="unselectButton" onClick={props.doClearRelatedObjects} >
                                Unselect all
                            </Button>
                            <Button variant="primary" className="white-14-semibold" id="addResources" onClick={addResources} >
                                Add resources
                            </Button> 
                        </Col>
                </Modal.Footer>
             </Modal>
        </Fragment>
    )
} 

export default RelatedResources;
