import React from "react";
import { Col, Row, Collapse } from "react-bootstrap";
import SVGIcon from "../../../images/SVGIcon";
import "../Dataset.scss";
import { ReactComponent as SubBronzeSVG } from "../../../images/sub_bronze.svg";
import { ReactComponent as SubSilverSVG } from "../../../images/sub_silver.svg";
import { ReactComponent as SubGoldSVG } from "../../../images/sub_gold.svg";
import { ReactComponent as SubPlatinumSVG } from "../../../images/sub_platinum.svg";

class DataUtilityModalInfo extends React.Component {
  state = {
    open: false,
    flagClosed: true,
    section: ""
  };

  constructor(props) {
    console.log(`props: ${JSON.stringify(props, null, 2)}`);
    super(props);
    this.state.open = props.open;
    this.updateFlag = this.updateFlag.bind(this);
    this.state.section = props.section;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      this.setState({
        open: this.props.open
      });
      if (this.props.open) {
        this.setState({
          flagClosed: false
        });
      } else {
        this.setState({
          flagClosed: true
        });
      }
    }
  }

  updateFlag() {
    if (this.state.flagClosed === true) {
      this.setState({ flagClosed: false });
    } else if (this.state.flagClosed === false) {
      this.setState({ flagClosed: true });
    }
  }

  render() {
    const { open, flagClosed, section } = this.state;
    
    switch (section) {
      case "Documentation":
        return (
          <div className="dataUtilityCollapse">
            {/* <div className="purpleHeader white-14-semibold  mt-1 pointer"    
                onClick={() =>
                this.setState({ open: !open, flagClosed: !flagClosed })
                }
            > */}
            <Row
              className="purpleHeader white-14-semibold pointer"
              onClick={() =>
                this.setState({ open: !open, flagClosed: !flagClosed })
              }
            >
                  <SVGIcon
                    name="chevronbottom" 
                    fill={'#ffffff'}
                    className={
                      flagClosed === true
                        ? "svg-20 dataUtilityArrow" 
                        : "svg-20 flipSVG  flippedDataUtilityArrow"
                    }
                  />
              <span className="margin-left-8">
                Documentation
              </span>
            </Row>
            {/* </div> */}

            <Collapse in={this.state.open} className="collapseWait pad-bottom-8">
              <div>
                <Row className="greySubHeader">
                  <Col sm={3} lg={3}>
                    <span className="gray-deep-13-bold">Metadata richness</span>
                  </Col>
                  <Col sm={9} lg={9}>
                    <span className="gray800-13-bold">This element will be calculated separately</span>
                  </Col>
                </Row>

                <Row className="greySubHeader">
                  <Col sm={3} lg={3}>
                    <span className="gray-deep-13-bold">Additional <br/> documentation & support</span>
                  </Col>
                  <Col sm={9} lg={9}>
                    <span className="gray800-13-bold">Available dataset documentation in addition to the data dictionary</span>
                  </Col>
                </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8}>
                        <span className="gray700-13">Past journal articles demonstrate that knowledge of the data exists</span>
                      </Col>
                      <Col sm={1} lg={1}>
                          <SubBronzeSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Comprehensive ReadMe describing extracting and use of data, Dataset FAQs available, visual model provided</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubSilverSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Dataset publication was supported with a journal article explaining the dataset in detail, or dataset training materials</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubGoldSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Support personnel available to answer any questions</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubPlatinumSVG />
                      </Col>
                    </Row>

                <Row className="greySubHeader">
                  <Col sm={3} lg={3}>
                    <span className="gray-deep-13-bold">Data model</span>
                  </Col>
                  <Col sm={9} lg={9}>
                    <span className="gray800-13-bold">Availability of clear, documented data model</span>
                  </Col>
                </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Known and accepted data model but some key field un-coded or free text</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubBronzeSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Key fields codified using a local standard</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubSilverSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Key fields codified using a national or international standard</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubGoldSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Conforms to a national standard and key fields codified using a national/international standard</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubPlatinumSVG />
                      </Col>
                    </Row>

                <Row className="greySubHeader">
                  <Col sm={3} lg={3}>
                    <span className="gray-deep-13-bold">Data dictionary</span>
                  </Col>
                  <Col sm={9} lg={9}>
                    <span className="gray800-13-bold">Provided documented data dictionary and terminologies</span>
                  </Col>
                </Row>
                    <Row className="dataUtilityBox">
                    <Col sm={3} lg={3} />
                    <Col sm={8} lg={8} >
                        <span className="gray700-13">Data definitions available</span>
                    </Col>
                    <Col sm={1} lg={1} >
                      <SubBronzeSVG />
                    </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Definitions compiled into local data dictionary which is available online</span>
                      </Col>
                      <Col sm={1} lg={1} >
                       <SubSilverSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Dictionary relates to national definitions</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubGoldSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Dictionary is based on international standards and includes mapping</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubPlatinumSVG />
                      </Col>
                    </Row>
                    
                <Row className="greySubHeader">
                  <Col sm={3} lg={3}>
                    <span className="gray-deep-13-bold">Provenance</span>
                  </Col>
                  <Col sm={9} lg={9}>
                    <span className="gray800-13-bold">Clear descriptions of source and history of the dataset, providing a ‘transparent data pipeline’</span>
                  </Col>
                </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Source of the dataset is documented</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubBronzeSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Source of the dataset and any transformations, rules and exclusions documented</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubSilverSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">All original data items listed, all transformations, rules and exclusion listed and impact of these</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubGoldSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Ability to view earlier versions, including ‘raw’ dataset, and review the impact of each stage of data cleaning</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubPlatinumSVG />
                      </Col>
                    </Row>
              </div>
            </Collapse>
          </div>
        );
      case "TechQuality":
        return (
          <div className="dataUtilityCollapse">
            {/* <div className="purpleHeader white-14-semibold  mt-1 pointer"    
                onClick={() =>
                    this.setState({ open: !open, flagClosed: !flagClosed })
                }
            > */}
            <Row
              className="purpleHeader margin-top-8 white-14-semibold pointer" 
              onClick={() =>
                this.setState({ open: !open, flagClosed: !flagClosed })
              }
            >
              {/* <Col> */}
              {/* <div className="dataUtilityChevron"> */}
                  <SVGIcon
                    name="chevronbottom"
                    fill={'#ffffff'}
                    className={
                      flagClosed === true
                        ? "svg-20 dataUtilityArrow"
                        : "svg-20 flipSVG flippedDataUtilityArrow"
                    }
                  />
              {/* </div> */}
              {/* </Col> */}
              <span className="margin-left-8">
                Technical quality
              </span>
            </Row>
            {/* </div> */} 

            <Collapse in={this.state.open} className="collapseWait pad-bottom-8">
              <div>
                <Row className="greySubHeader">
                  <Col sm={3} lg={3}>
                    <span className="gray-deep-13-bold">Data Quality Management Process</span>
                  </Col>
                  <Col sm={9} lg={9}>
                    <span className="gray800-13-bold">The level of maturity of the data quality management process</span>
                  </Col>
                </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">A documented data management plan covering collection, auditing, and management is available for the dataset</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubBronzeSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Evidence that the data management plan has been implemented is available</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubSilverSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Key fields codified using a national or international standard</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubGoldSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Externally verified compliance with the data management plan, e.g. by ISO, CQC, ICO or other body</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubPlatinumSVG />
                      </Col>
                    </Row>

                <Row className="greySubHeader">
                  <Col sm={3} lg={3}>
                    <span className="gray-deep-13-bold">Data Management Association (DAMA) Quality Dimensions</span>
                  </Col>
                  <Col sm={9} lg={9}>
                    <span className="gray800-13-bold">This element will be calculated separately</span>
                  </Col>
                </Row>
              </div>
            </Collapse>
          </div>
        );
        case "Access":
            return (
              <div className="dataUtilityCollapse">
                {/* <div className="purpleHeader white-14-semibold  mt-1 pointer"    
                    onClick={() =>
                    this.setState({ open: !open, flagClosed: !flagClosed })
                    }
                > */}
                <Row
                  className="purpleHeader margin-top-8 white-14-semibold pointer"
                  onClick={() =>
                    this.setState({ open: !open, flagClosed: !flagClosed })
                  }
                >
                      <SVGIcon
                        name="chevronbottom"
                        fill={'#ffffff'}
                        className={
                          flagClosed === true
                            ? "svg-20 dataUtilityArrow"
                            : "svg-20 flipSVG flippedDataUtilityArrow"
                        }
                      />
                  <span className="margin-left-8">
                    Access & provision
                  </span>
                </Row>
                {/* </div> */}
    
                <Collapse in={this.state.open} className="collapseWait pad-bottom-8">
                  <div>
                  <Row className="greySubHeader">
                    <Col sm={3} lg={3}>
                      <span className="gray-deep-13-bold">Allowable uses</span>
                    </Col>
                    <Col sm={9} lg={9}>
                      <span className="gray800-13-bold">Allowable dataset usages as per the licencing agreement</span>
                    </Col>
                </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Undefined</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubBronzeSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Non-consented, aggregate data for specific academic uses (following IG approval)</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubSilverSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Aggregate data, for academic and specific commercial uses (following IG approval)</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubGoldSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Fully consented for commercial uses (following IG approval)</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubPlatinumSVG />
                      </Col>
                    </Row>

                <Row className="greySubHeader">
                  <Col sm={3} lg={3}>
                    <span className="gray-deep-13-bold">Research environment</span>
                  </Col>
                  <Col sm={9} lg={9}>
                    <span className="gray800-13-bold">Access, tooling and environment (once approved)</span>
                  </Col>
                </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Requested analysis can be undertaken by internal teams and provided back in anonymised format to data requestors</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubBronzeSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Users can access the dataset in a Trusted Research Environment</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubSilverSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Undefined</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubGoldSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">The dataset can be used in a Trusted Research Environment, and other data and tools can be securely brought in as required</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubPlatinumSVG />
                      </Col>
                    </Row>

                <Row className="greySubHeader">
                  <Col sm={3} lg={3}>
                    <span className="gray-deep-13-bold">Time lag</span>
                  </Col>
                  <Col sm={9} lg={9}>
                    <span className="gray800-13-bold">Lag between the data being collected and added to the dataset</span>
                  </Col>
                </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Approximately 1 year</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubBronzeSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Approximately 1 month</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubSilverSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Approximately 1 week</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubGoldSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Effectively real-time data</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubPlatinumSVG />
                      </Col>
                    </Row>

                <Row className="greySubHeader">
                  <Col sm={3} lg={3}>
                    <span className="gray-deep-13-bold">Timeliness</span>
                  </Col>
                  <Col sm={9} lg={9}>
                    <span className="gray800-13-bold">Average data access request timeframe</span>
                  </Col>
                </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">More than 12 months</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubBronzeSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Less than 12 months</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubSilverSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Less than 6 months</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubGoldSVG />
                      </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                      <Col sm={3} lg={3} />
                      <Col sm={8} lg={8} >
                        <span className="gray700-13">Less than 3 months</span>
                      </Col>
                      <Col sm={1} lg={1} >
                        <SubPlatinumSVG />
                      </Col>
                    </Row>
                  </div>
                </Collapse>
              </div>
            );
            case "Value":
                return (
                  <div className="dataUtilityCollapse">
                    {/* <div className="purpleHeader white-14-semibold mt-1 pointer"    
                        onClick={() =>
                        this.setState({ open: !open, flagClosed: !flagClosed })
                        }
                    > */}
                    <Row
                      className="purpleHeader margin-top-8 white-14-semibold pointer"
                      onClick={() =>
                        this.setState({ open: !open, flagClosed: !flagClosed })
                      }
                    >
                          <SVGIcon
                            name="chevronbottom"
                            fill={'#ffffff'}
                            className={
                              flagClosed === true
                                ? "svg-20 dataUtilityArrow"
                                : "svg-20 flipSVG flippedDataUtilityArrow"
                            }
                          />
                      <span className="margin-left-8">
                        Value & interest
                      </span>
                    </Row>
                    {/* </div> */}
        
                    <Collapse in={this.state.open} className="collapseWait pad-bottom-8">
                      <div>
                        <Row className="greySubHeader">
                          <Col sm={3} lg={3}>
                            <span className="gray-deep-13-bold">Linkages</span>
                          </Col>
                          <Col sm={9} lg={9}>
                            <span className="gray800-13-bold">Ability to link with other datasets</span>
                          </Col>
                        </Row>
                            <Row className="dataUtilityBox">
                              <Col sm={3} lg={3} />
                              <Col sm={8} lg={8} >
                                <span className="gray700-13">Identifiers to demonstrate ability to link to other datasets</span>
                              </Col>
                              <Col sm={1} lg={1} >
                                <SubBronzeSVG />
                              </Col>
                            </Row>
                            <Row className="dataUtilityBox">
                              <Col sm={3} lg={3} />
                              <Col sm={8} lg={8} >
                                <span className="gray700-13">Available linkages outlined and/or List of datasets previously successfully linked provided</span>
                              </Col>
                              <Col sm={1} lg={1} >
                                <SubSilverSVG />
                              </Col>
                            </Row>
                            <Row className="dataUtilityBox">
                              <Col sm={3} lg={3} />
                              <Col sm={8} lg={8} >
                                <span className="gray700-13">List of restrictions on the type of linkages detailed. List of previously successful dataset linkages performed, with navigable links to linked datasets via at DOI/URL</span>
                              </Col>
                              <Col sm={1} lg={1} >
                                <SubGoldSVG />
                              </Col>
                            </Row>
                            <Row className="dataUtilityBox">
                              <Col sm={3} lg={3} />
                              <Col sm={8} lg={8} >
                                <span className="gray700-13">Effectively real-time data</span>
                              </Col>
                              <Col sm={1} lg={1} >
                                <SubPlatinumSVG />
                              </Col>
                            </Row>

                        <Row className="greySubHeader">
                          <Col sm={3} lg={3}>
                            <span className="gray-deep-13-bold">Data Enrichments</span>
                          </Col>
                          <Col sm={9} lg={9}>
                            <span className="gray800-13-bold">Data sources enriched with annotations, image labels, phenomes, derivations, NLP derived data labels</span>
                          </Col>
                        </Row>
                            <Row className="dataUtilityBox">
                              <Col sm={3} lg={3} />
                              <Col sm={8} lg={8} >
                                <span className="gray700-13">The data include additional derived fields, or enriched data</span>
                              </Col>
                              <Col sm={1} lg={1} >
                                <SubBronzeSVG />
                              </Col>
                            </Row>
                            <Row className="dataUtilityBox">
                              <Col sm={3} lg={3} />
                              <Col sm={8} lg={8} >
                                <span className="gray700-13">The data include additional derived fields, or enriched data used by other available data sources</span>
                              </Col>
                              <Col sm={1} lg={1} >
                                <SubSilverSVG />
                              </Col>
                            </Row>
                            <Row className="dataUtilityBox">
                              <Col sm={3} lg={3} />
                              <Col sm={8} lg={8} >
                                <span className="gray700-13">The derived fields or enriched data were generated from, or used by, a peer reviewed algorithm</span>
                              </Col>
                              <Col sm={1} lg={1} >
                                <SubGoldSVG />
                              </Col>
                            </Row>
                            <Row className="dataUtilityBox">
                              <Col sm={3} lg={3} />
                              <Col sm={8} lg={8} >
                                <span className="gray700-13">The data includes derived fields or enriched data from a national report</span>
                              </Col>
                              <Col sm={1} lg={1} >
                                <SubPlatinumSVG />
                              </Col>
                            </Row>
                      </div>
                    </Collapse>
                  </div>
                );
                case "Coverage":
                    return (
                      <div className="dataUtilityCollapse">
                        {/* <div className="purpleHeader white-14-semibold mt-1 pointer"    
                            onClick={() =>
                            this.setState({ open: !open, flagClosed: !flagClosed })
                            }
                        > */}
                        <Row
                          className="purpleHeader margin-top-8 white-14-semibold pointer"
                          onClick={() =>
                            this.setState({ open: !open, flagClosed: !flagClosed })
                          }
                        >
                              <SVGIcon
                                name="chevronbottom"
                                fill={'#ffffff'}
                                className={
                                  flagClosed === true
                                    ? "svg-20 dataUtilityArrow"
                                    : "svg-20 flipSVG flippedDataUtilityArrow"
                                }
                              />
                        <span className="margin-left-8">
                          Coverage
                        </span>
                        </Row>
                        {/* </div> */}
            
                        <Collapse in={this.state.open} className="collapseWait pad-bottom-8">
                          <div>
                            <Row className="greySubHeader">
                              <Col sm={3} lg={3}>
                                <span className="gray-deep-13-bold">Pathway coverage</span>
                              </Col>
                              <Col sm={9} lg={9}>
                                <span className="gray800-13-bold">Representation of multi-disciplinary healthcare data</span>
                              </Col>
                            </Row>
                                <Row className="dataUtilityBox">
                                  <Col sm={3} lg={3} />
                                  <Col sm={8} lg={8} >
                                    <span className="gray700-13">Contains data from a single speciality or area</span>
                                  </Col>
                                  <Col sm={1} lg={1} >
                                    <SubBronzeSVG />
                                  </Col>
                                </Row>
                                <Row className="dataUtilityBox">
                                  <Col sm={3} lg={3} />
                                  <Col sm={8} lg={8} >
                                    <span className="gray700-13">Contains data from multiple specialties or services within a single tier of care</span>
                                  </Col>
                                  <Col sm={1} lg={1} >
                                    <SubSilverSVG />
                                  </Col>
                                </Row>
                                <Row className="dataUtilityBox">
                                  <Col sm={3} lg={3} />
                                  <Col sm={8} lg={8} >
                                    <span className="gray700-13">Contains multimodal data or data that is linked across two tiers (e.g. primary and secondary care)</span>
                                  </Col>
                                  <Col sm={1} lg={1} >
                                    <SubGoldSVG />
                                  </Col>
                                </Row>
                                <Row className="dataUtilityBox">
                                  <Col sm={3} lg={3} />
                                  <Col sm={8} lg={8} >
                                    <span className="gray700-13">Contains data across the whole pathway of care</span>
                                  </Col>
                                  <Col sm={1} lg={1} >
                                    <SubPlatinumSVG />
                                  </Col>
                                </Row>

                            <Row className="greySubHeader">
                              <Col sm={3} lg={3}>
                                <span className="gray-deep-13-bold">Length of follow up</span>
                              </Col>
                              <Col sm={9} lg={9}>
                                <span className="gray800-13-bold">Average timeframe in which a patient appears in a dataset (follow up period)</span>
                              </Col>
                            </Row>
                                <Row className="dataUtilityBox">
                                  <Col sm={3} lg={3} />
                                  <Col sm={8} lg={8} >
                                    <span className="gray700-13">Between 1 - 6 months</span>
                                  </Col>
                                  <Col sm={1} lg={1} >
                                    <SubBronzeSVG />
                                  </Col>
                                </Row>
                                <Row className="dataUtilityBox">
                                  <Col sm={3} lg={3} />
                                  <Col sm={8} lg={8} >
                                    <span className="gray700-13">Between 6 - 12 months</span>
                                  </Col>
                                  <Col sm={1} lg={1} >
                                    <SubSilverSVG />
                                  </Col>
                                </Row>
                                <Row className="dataUtilityBox">
                                  <Col sm={3} lg={3} />
                                  <Col sm={8} lg={8} >
                                    <span className="gray700-13">Between 1 - 10 years</span>
                                  </Col>
                                  <Col sm={1} lg={1} >
                                    <SubGoldSVG />
                                  </Col>
                                </Row>
                                <Row className="dataUtilityBox">
                                  <Col sm={3} lg={3} />
                                  <Col sm={8} lg={8} >
                                    <span className="gray700-13">More than 10 years</span>
                                  </Col>
                                  <Col sm={1} lg={1} >
                                    <SubPlatinumSVG />
                                  </Col>
                                </Row>
                          </div>
                        </Collapse>
                      </div>
                    );
    }
    // })()}

    // );
  }
}

export default DataUtilityModalInfo;
