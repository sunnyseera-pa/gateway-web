 // /ShowObjects/Title.js
import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { ReactComponent as PersonPlaceholderSvg } from '../../../images/person-placeholder.svg';
import SVGIcon from '../../../images/SVGIcon';
import '../Dashboard.scss'; 
 

class  DashboardKPI extends Component {

  render() {
    const { kpiText, kpiValue, percentageFlag, testId } = this.props;

    return (
      <span> 
        <Row className="kpiCard"> 
            <Col sm={12} lg={12}>
                <Row className="text-left ml-2">                
                    <span className="black-28 text-left" data-test-id={testId} > { percentageFlag===true ? kpiValue + '%' : kpiValue} </span> 
                </Row>
                <Row className="text-left ml-2">
                    <span className="gray700-12" data-test-id="kpiText" > {kpiText} </span>  
                </Row>
            </Col>
        </Row>
      </span> 
    );
  }
}

export default DashboardKPI;