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
    datasetUtility: null,
    // customType: false,
    allOpen: false
  };

  constructor(props) {
    super(props);
    this.state.datasetUtility = props.datasetUtility;
  }

  updateAllOpen = allOpen => {
    if (allOpen === false) {
      this.setState({ allOpen: true });
    } else if (allOpen === true) {
      this.setState({ allOpen: false });
    }
  };

  render() {
    const { allOpen, datasetUtility } = this.state;
    
    /* 
    http://localhost:3000/dataset/166c6c04-c4dd-4df7-977a-b375fda23134
    "metadata_richness": "Bronze",
    "availability_of_additional_documentation_and_support": "Bronze",
    "data_model": "Gold ",
    "data_dictionary": "Bronze",
    "provenance": "Bronze",
    "data_quality_management_process": "Bronze",
    "dama_quality_dimensions": "",
    "pathway_coverage": "Silver ",
    "length_of_follow_up": "Silver ",
    "allowable_uses": "Gold ",
    "research_environment": "Bronze",
    "time_lag": "Gold ",
    "timeliness": "Gold ",
    "linkages": "Bronze",
    "data_enrichments": "Bronze"
    */

    var weights = ["","Bronze","Silver","Gold","Platinum"]

    var documentationWeight = weights[Math.floor((weights.indexOf(datasetUtility.metadata_richness.trim())
        +weights.indexOf(datasetUtility.availability_of_additional_documentation_and_support.trim())
        +weights.indexOf(datasetUtility.data_model.trim())
        +weights.indexOf(datasetUtility.data_dictionary.trim())
        +weights.indexOf(datasetUtility.provenance.trim()))/5)];
    
    var technicalQualityWeight = weights[Math.floor((weights.indexOf(datasetUtility.data_quality_management_process.trim())
        +weights.indexOf(datasetUtility.dama_quality_dimensions.trim()))/2)];
    
    var accessProvisionWeight = weights[Math.floor((weights.indexOf(datasetUtility.allowable_uses.trim())
        +weights.indexOf(datasetUtility.research_environment.trim())
        +weights.indexOf(datasetUtility.time_lag.trim())
        +weights.indexOf(datasetUtility.timeliness.trim()))/4)];

    var valueInterestWeight = weights[Math.floor((weights.indexOf(datasetUtility.linkages.trim())
        +weights.indexOf(datasetUtility.data_enrichments.trim()))/2)];
    
    var coverageWeight = weights[Math.floor((weights.indexOf(datasetUtility.pathway_coverage.trim())
        +weights.indexOf(datasetUtility.length_of_follow_up.trim()))/2)];

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
