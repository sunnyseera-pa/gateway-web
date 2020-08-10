import React from "react";
import { Col, Row } from "react-bootstrap";
import SVGIcon from "../../../images/SVGIcon";
import { ReactComponent as TableSvg } from "../../../images/table.svg";
import TechnicalMetadataVariables from "./TechnicalMetadataVariables";

class TechnicalDetailsPage extends React.Component {
  state = {
    technicalMetadata: null,
    flagClosed: true,
    customType: false,
    allOpen: false
  };

  constructor(props) {
    super(props);
    this.state.technicalMetadata = props.technicalMetadata;
  }

  updateAllOpen = allOpen => {
    if (allOpen === false) {
      this.setState({ allOpen: true });
    } else if (allOpen === true) {
      this.setState({ allOpen: false });
    }
  };

  render() {
    const { flagClosed, customType, technicalMetadata, allOpen } = this.state;

    var svgClassName = "";
    if (flagClosed === false) {
      svgClassName = "flipSVG";
    }

    return (
      <div className="ml-3">
        <Row className="mt-3">
          <Col sm={12} lg={12} style={{ "padding-left": "0px" }}>
            <div className="entryBox">
              <Row className="pad-left-24">
                <Col sm={11} lg={11}>
                  <Row>
                    <TableSvg className="margin-top-2" />
                    <span className="pad-left-8 black-18">
                      {technicalMetadata ? technicalMetadata.label : ""}
                    </span>
                  </Row>
                </Col>

                <Col sm={1} lg={1}>
                  <span onClick={() => this.props.doUpdateDataClassOpen(-1)}>
                    <SVGIcon
                      name="closeicon"
                      fill={"#475da7"}
                      className="svg-24 floatRight dataClassX"
                    />
                  </span>
                </Col>
              </Row>
              <Row className="mt-2 pad-left-24">
                <Col sm={11} lg={11} className="pad-left-0">
                  <p className="gray800-14">
                    {technicalMetadata ? technicalMetadata.description : ""}
                  </p>
                </Col>
                <Col sm={1} lg={1} />
              </Row>

              <Row className="ml-2">
                <Col sm={12} lg={12} className="pad-left-0">
                  <span className="pad-top-24 pad-bottom-16  black-16-semibold mr-3">
                    Variables
                  </span>

                  <span
                    className="purple-14 floatRight pointer"
                    onClick={() => this.updateAllOpen(allOpen)}
                  >
                    {allOpen ? "Close all" : "Expand all"}
                  </span>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm={12} lg={12} className="pad-left-0">
            {technicalMetadata.elements.map(element => (
              <TechnicalMetadataVariables
                techMetadataVariables={element}
                open={allOpen}
              />
            ))}
          </Col>
        </Row>
      </div>
    );
  }
}

export default TechnicalDetailsPage;
