
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import SVGIcon from "../../images/SVGIcon";

const DataSet = (props) => {
    const {data, detailsData, activeLink} = props;

    /**
     * [displayShort]
     * @params {key[string], size[int]}
     * @desc returns the relevant field shortened or full length
     */
    const displayShort = (key, size) => {
        // 1. if data and property exists
        if(data && data[key]) {
            // 2. if the property val is > than the length format
            if(data[key].length > size) 
                return `${data[key].substr(0, size)}${'...'}`
            
            return data[key];
        } else {
            return ''; 
        }
    }



    return (
        <Row className="mt-2">
            <Col>
              <div className={props.tempRelatedObjectIds && props.tempRelatedObjectIds.some(object => object.objectId === data.id) ? "Rectangle SelectedBorder" : "Rectangle"} onClick={() => !activeLink && props.doAddToTempRelatedObjects(data.id, 'dataset') } >   
                    <Row>
                        <Col xs={2} lg={1} className="iconHolder">
                            <SVGIcon name="dataseticon" width={22} height={24} fill={'#3db28c'} />
                        </Col> 
                        <Col xs={10} lg={11}>
                            <p>
                                {activeLink===true ? 
                                    <span>
                                        <a className="Black-16px" style={{ cursor: 'pointer' }}  href={'/dataset/' + data.id} data-testid="dataset-title">
                                            {displayShort('title', 75)} 
                                        </a>
                                    </span>
                                :
                                    <span className="Black-16px">
                                        {displayShort('title', 75)} 
                                    </span>
                                }

                                <br/>
                                <span 
                                    className="Gray800-14px" 
                                    data-testid="dataset-publisher">{data.publisher || ''}
                                </span>
                            </p>
                            <p 
                                className="Gray800-14px" 
                                data-testid="dataset-desc">
                                    {data.description ? displayShort('description', 125) : displayShort('abstract', 125)}    
                            </p>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}

export default DataSet;
