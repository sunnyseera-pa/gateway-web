import React from "react";
import { Col, Row } from "react-bootstrap";
// import SVGIcon from "../../../images/SVGIcon";
import { ReactComponent as CloseButtonSvg } from '../../../images/close-alt.svg';  

import { ReactComponent as TableSvg } from "../../../images/table.svg";
// import TechnicalMetadataVariables from "./TechnicalMetadataVariables";
import '../Dataset.scss'; 
import DataQualityInfo from "./DataQualityInfo";

class DataQuality extends React.Component {
  state = {
    // technicalMetadata: null,
    // customType: false,
    allOpen: false
  };

  constructor(props) {
    super(props);
    // this.state.technicalMetadata = props.technicalMetadata;
  }

  updateAllOpen = allOpen => {
    if (allOpen === false) {
      this.setState({ allOpen: true });
    } else if (allOpen === true) {
      this.setState({ allOpen: false });
    }
  };

  render() {
    const { allOpen } = this.state;
 
    return (
      <div className="ml-3">
        <Row>
          <Col sm={12} lg={12} className="pad-left-0">
              <Row className="mt-3">
                <Col sm={12} lg={12}>
                    <Row className="ml-2">
                      <Col sm={12} lg={12} className="pad-left-0">
                        <span
                          className="purple-14 dataFloatRight pointer"
                          onClick={() => this.updateAllOpen(allOpen)}
                        >
                          {allOpen ? "Hide all" : "Expand all"}
                        </span>
                      </Col>
                    </Row>
                </Col>
              </Row>

              <DataQualityInfo section={"Documentation"} open={allOpen} />

              <DataQualityInfo section={"TechQuality"} open={allOpen} />

              <DataQualityInfo section={"Access"} open={allOpen} />

              <DataQualityInfo section={"Value"} open={allOpen} />

              <DataQualityInfo section={"Coverage"} open={allOpen} />


              <div className="height-16" />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DataQuality;
