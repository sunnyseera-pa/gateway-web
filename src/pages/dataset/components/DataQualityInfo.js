import React from "react";
import { Col, Row, Collapse } from "react-bootstrap";
import SVGIcon from "../../../images/SVGIcon";
import "../Dataset.scss";
import { ReactComponent as SubBronzeSVG } from "../../../images/sub_bronze.svg";
import { ReactComponent as SubSilverSVG } from "../../../images/sub_silver.svg";
import { ReactComponent as SubGoldSVG } from "../../../images/sub_gold.svg";
import { ReactComponent as SubPlatinumSVG } from "../../../images/sub_platinum.svg";
import { ReactComponent as BronzeSVG } from "../../../images/bronzeUtility.svg";
import { ReactComponent as SilverSVG } from "../../../images/silverUtility.svg";
import { ReactComponent as GoldSVG } from "../../../images/goldUtility.svg";
import { ReactComponent as PlatinumSVG } from "../../../images/platinumUtility.svg";

class DataQualityInfo extends React.Component {
  state = {
    open: false,
    flagClosed: true,
    section: "",
    ratings: [
        {
            dimension: "Additional documentation and support",
            rating: "Bronze",
            response: "Past journal articles demonstrate that knowledge of the data exists"
        },
        {
            dimension: "Additional documentation and support",
            rating: "Silver",
            response: "Comprehensive ReadMe, Dataset FAQS & Visual data model provided"
        },
        {
            dimension: "Additional documentation and support",
            rating: "Gold",
            response: "Supporting journal article explaining the dataset detail, or dataset training materials"
        },        
        {
            dimension: "Additional documentation and support",
            rating: "Platinum",
            response: "Extensive supplementary documentation and support, including personnel support"
        },
        {
            dimension: "Data Model",
            rating: "Bronze",
            response: "Known and accepted data model but some key field un-coded or free text"
        },
        {
            dimension: "Data Model",
            rating: "Silver",
            response: "Key fields codified using a local standard"
        },
        {
            dimension: "Data Model",
            rating: "Gold",
            response: "Key fields codified using a national or international standard"
        },        
        {
            dimension: "Data Model",
            rating: "Platinum",
            response: "Model and key fields conform to a national/international standard"
        },
        {
            dimension: "Data Dictionary",
            rating: "Bronze",
            response: "Data definitions available"
        },
        {
            dimension: "Data Dictionary",
            rating: "Silver",
            response: "Definitions compiled into local data dictionary which is available online"
        },
        {
            dimension: "Data Dictionary",
            rating: "Gold",
            response: "Dictionary relates to national definitions"
        },        
        {
            dimension: "Data Dictionary",
            rating: "Platinum",
            response: "Based on international standards, including mapping"
        },
        {
            dimension: "Provenance",
            rating: "Bronze",
            response: "Source of the dataset is documented"
        },
        {
            dimension: "Provenance",
            rating: "Silver",
            response: "Source of  the dataset and any transformations, rules and exclusions documented"
        },
        {
            dimension: "Provenance",
            rating: "Gold",
            response: "All original data items, transformations, rules & exclusion listed and their impact"
        },        
        {
            dimension: "Provenance",
            rating: "Platinum",
            response: "View earlier versions, ‘raw’ dataset and review impact of each stage of data cleaning"
        },
        {
            dimension: "Data Quality Management Process",
            rating: "Bronze",
            response: "Documented data management plan covering collection, auditing & management"
        },
        {
            dimension: "Data Quality Management Process",
            rating: "Silver",
            response: "Available implemented data management plan"
        },
        {
            dimension: "Data Quality Management Process",
            rating: "Gold",
            response: ""
        },        
        {
            dimension: "Data Quality Management Process",
            rating: "Platinum",
            response: "Externally verified compliance with the data management plan, e.g. ISO, CQC, ICO…"
        },
        {
            dimension: "Pathway coverage",
            rating: "Bronze",
            response: "Contains data from a single speciality or area"
        },
        {
            dimension: "Pathway coverage",
            rating: "Silver",
            response: "Contains data from multiple specialties or services within a single tier of care"
        },
        {
            dimension: "Pathway coverage",
            rating: "Gold",
            response: "Contains multimodal data or data that is linked across two tiers"
        },        
        {
            dimension: "Pathway coverage",
            rating: "Platinum",
            response: "Contains data across the whole pathway of care"
        },
        {
            dimension: "Length of follow up",
            rating: "Bronze",
            response: "Between 1 - 6 months"
        },
        {
            dimension: "Length of follow up",
            rating: "Silver",
            response: "Between 6 - 12 months"
        },
        {
            dimension: "Length of follow up",
            rating: "Gold",
            response: "Between 1 - 10 years"
        },        
        {
            dimension: "Length of follow up",
            rating: "Platinum",
            response: "More than 10 years"
        },
        {
            dimension: "Allowable uses",
            rating: "Bronze",
            response: ""
        },
        {
            dimension: "Allowable uses",
            rating: "Silver",
            response: "Non-consented, aggregate data for specific academic uses (following IG approval)"
        },
        {
            dimension: "Allowable uses",
            rating: "Gold",
            response: "Aggregate data, for academic and specific commercial uses (following IG approval)"
        },        
        {
            dimension: "Allowable uses",
            rating: "Platinum",
            response: "Fully consented for commercial uses (following IG approval)"
        },
        {
            dimension: "Research environment",
            rating: "Bronze",
            response: "Requested analysis available by internal teams, provided back in anonymised format"
        },
        {
            dimension: "Research environment",
            rating: "Silver",
            response: "Users can access the dataset in a Trusted Research Environment"
        },
        {
            dimension: "Research environment",
            rating: "Gold",
            response: ""
        },        
        {
            dimension: "Research environment",
            rating: "Platinum",
            response: "Used in a Trusted Research Environment (other data & tools brought in securely)"
        },
        {
            dimension: "Time Lag",
            rating: "Bronze",
            response: "Approximately 1 year"
        },
        {
            dimension: "Time Lag",
            rating: "Silver",
            response: "Approximately 1 month"
        },
        {
            dimension: "Time Lag",
            rating: "Gold",
            response: "Approximately 1 week"
        },        
        {
            dimension: "Time Lag",
            rating: "Platinum",
            response: "Effectively real-time data"
        },
        {
            dimension: "Timeliness",
            rating: "Bronze",
            response: "More than 12 months"
        },
        {
            dimension: "Timeliness",
            rating: "Silver",
            response: "Less than 12 months"
        },
        {
            dimension: "Timeliness",
            rating: "Gold",
            response: "Less than 6 months"
        },        
        {
            dimension: "Timeliness",
            rating: "Platinum",
            response: "Less than 3 months"
        },
        {
            dimension: "Linkages",
            rating: "Bronze",
            response: "Identifiers to demonstrate ability to link to other datasets"
        },
        {
            dimension: "Linkages",
            rating: "Silver",
            response: "Available linkages outlined &/or list of datasets previously successfully linked"
        },
        {
            dimension: "Linkages",
            rating: "Gold",
            response: "List of linkage restrictions and previously successful linkages, with navigable links"
        },        
        {
            dimension: "Linkages",
            rating: "Platinum",
            response: "Existing linkage with reusable or downstream approvals"
        },
        {
            dimension: "Data Enrichments",
            rating: "Bronze",
            response: "The data include additional derived fields, or enriched data."
        },
        {
            dimension: "Data Enrichments",
            rating: "Silver",
            response: "Data includes additional derived fields, or enriched data used by other data sources."
        },
        {
            dimension: "Data Enrichments",
            rating: "Gold",
            response: "Derived fields or enriched data generated from/used by a peer reviewed algorithm."
        },        
        {
            dimension: "Data Enrichments",
            rating: "Platinum",
            response: "The data includes derived fields or enriched data from a national report. "
        }
]



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
    const { open, flagClosed, section, ratings } = this.state;

    //Need to replace "Gold" with the rating got from the dataset cache
    // ratings.map((rating) => {
    //     if (rating.dimension === "Additional documentation and support" && rating.rating === "Gold") {
    //         console.log(`ratings: ${rating.response}`)
    //         return (<></>)
    //     }
    // })
    
    switch (section) {
      case "Documentation":
        return (
          <div className="dataQualityCollapse">
            <Row
              className="pointer dataUtilityRow" 
              onClick={() =>
                this.setState({ open: !open, flagClosed: !flagClosed })
              }
            >
              <Col xs={2} sm={2} m={1} lg={1} className="dataUtilityChevron">
                  <SVGIcon
                    name="chevronbottom"
                    fill={"#475DA7"}
                    className={
                      flagClosed === true
                        ? "svg-20 dataQualityArrow" 
                        : "svg-20 flipSVG dataQualityArrow"
                    }
                  />
              </Col>
              <Col xs={8} sm={5} md={4} lg={3} xl={2} className="gray800-14 dataUtilityTitle">
                Documentation
              </Col>
              <Col xs={2} sm={5} md={5} lg={8} xl={9} className="dataUtilitySvg">
                <BronzeSVG />
              </Col>
            </Row>

            <Collapse in={this.state.open} className="dataCollapseWait pad-top-8">
              <div>
                    <Row className="dataUtilityBox topBorder">
                        <Col sm={3} lg={3}>
                            <span className="gray800-13-opacity">Metadata richness</span>
                        </Col>
                        <Col sm={8} lg={8}>
                            <span className="gray800-13">Element calculated separately</span>
                        </Col>
                        <Col sm={1} lg={1}>
                            <span><SubBronzeSVG /></span>
                        </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                        <Col sm={3} lg={3}>
                            <span className="gray800-13-opacity">Additional documentation & support</span>
                        </Col>
                        <Col sm={8} lg={8}>
                            {    ratings.map((rating) => {
                                    if (rating.dimension === "Additional documentation and support" && rating.rating === "Gold") {
                                        return (<span className="gray800-13"> {rating.response} </span>)
                                    }
                                })
                            }
                        </Col>
                        <Col sm={1} lg={1}>
                            <span><SubSilverSVG /></span>
                        </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                        <Col sm={3} lg={3}>
                            <span className="gray800-13-opacity">Data model</span>
                        </Col>
                       <Col sm={8} lg={8}>
                            {    ratings.map((rating) => {
                                    if (rating.dimension === "Data Model" && rating.rating === "Gold") {
                                        return (<span className="gray800-13"> {rating.response} </span>)
                                    }
                                })
                            }
                        </Col> 
                        <Col sm={1} lg={1}>
                            <span><SubGoldSVG /></span>
                        </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                        <Col sm={3} lg={3}>
                            <span className="gray800-13-opacity">Data dictionary</span>
                        </Col>
                        <Col sm={8} lg={8}>
                            {    ratings.map((rating) => {
                                    if (rating.dimension === "Data Model" && rating.rating === "Gold") {
                                        return (<span className="gray800-13"> {rating.response} </span>)
                                    }
                                })
                            }
                        </Col>
                        <Col sm={1} lg={1}>
                            <span><SubPlatinumSVG /></span>
                        </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                        <Col sm={3} lg={3}>
                            <span className="gray800-13-opacity">Provenance</span>
                        </Col>
                        <Col sm={8} lg={8}>
                            {    ratings.map((rating) => {
                                    if (rating.dimension === "Data Model" && rating.rating === "Gold") {
                                        return (<span className="gray800-13"> {rating.response} </span>)
                                    }
                                })
                            }
                        </Col>
                        <Col sm={1} lg={1}>
                            <span><SubPlatinumSVG /></span>
                        </Col>
                    </Row>
              </div>
            </Collapse>
          </div>
        );
      case "TechQuality":
        return (
          <div className="dataQualityCollapse">
            <Row
              className="pointer dataUtilityRow margin-top-8"
              onClick={() =>
                this.setState({ open: !open, flagClosed: !flagClosed })
              }
            >
              <Col xs={2} sm={2} m={1} lg={1} className="dataUtilityChevron">
                  <SVGIcon
                    name="chevronbottom"
                    fill={"#475DA7"}
                    className={
                      flagClosed === true
                        ? "svg-20 dataQualityArrow"
                        : "svg-20 flipSVG dataQualityArrow"
                    }
                  />
              </Col>
              <Col xs={8} sm={5} md={4} lg={3} xl={2} className="gray800-14 dataUtilityTitle">
                Technical quality
              </Col>
              <Col xs={2} sm={5} md={5} lg={8} xl={9} className="dataUtilitySvg">
                <SilverSVG />
              </Col>
            </Row>

            <Collapse in={this.state.open} className="dataCollapseWait pad-top-8">
              <div>
                    <Row className="dataUtilityBox topBorder">
                        <Col sm={3} lg={3}>
                            <span className="gray800-13-opacity">Data Quality Management Process</span>
                        </Col>
                        <Col sm={8} lg={8}>
                            {    ratings.map((rating) => {
                                    if (rating.dimension === "Data Model" && rating.rating === "Gold") {
                                        return (<span className="gray800-13"> {rating.response} </span>)
                                    }
                                })
                            }
                        </Col>
                        <Col sm={1} lg={1}>
                            <span><SubBronzeSVG /></span>
                        </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                        <Col sm={3} lg={3}>
                            <span className="gray800-13-opacity">DAMA quality dimensions</span>
                        </Col>
                        <Col sm={8} lg={8}>
                            <span className="gray800-13">Element calculated separately</span>
                        </Col>
                        <Col sm={1} lg={1}>
                            <span><SubSilverSVG /></span>
                        </Col>
                    </Row>
              </div>
            </Collapse>
          </div>
        );
        case "Access":
            return (
              <div className="dataQualityCollapse">
                <Row
                  className="pointer dataUtilityRow margin-top-8"
                  onClick={() =>
                    this.setState({ open: !open, flagClosed: !flagClosed })
                  }
                >
                    <Col xs={2} sm={2} m={1} lg={1} className="dataUtilityChevron">
                      <SVGIcon
                        name="chevronbottom"
                        fill={"#475DA7"}
                        className={
                          flagClosed === true
                            ? "svg-20 dataQualityArrow"
                            : "svg-20 flipSVG dataQualityArrow"
                        }
                      />
                    </Col>
                    <Col xs={8} sm={5} md={4} lg={3} xl={2} className="gray800-14 dataUtilityTitle">
                        Access & provision
                    </Col>
                    <Col xs={2} sm={5} md={5} lg={8} xl={9} className="dataUtilitySvg">
                        <GoldSVG />
                    </Col>
                </Row>
    
                <Collapse in={this.state.open} className="dataCollapseWait pad-top-8">
                  <div>
                    <Row className="dataUtilityBox topBorder">
                        <Col sm={3} lg={3}>
                            <span className="gray800-13-opacity">Allowable uses</span>
                        </Col>
                        <Col sm={8} lg={8}>
                            {    ratings.map((rating) => {
                                    if (rating.dimension === "Data Model" && rating.rating === "Gold") {
                                        return (<span className="gray800-13"> {rating.response} </span>)
                                    }
                                })
                            }
                        </Col>
                        <Col sm={1} lg={1}>
                            <span><SubBronzeSVG /></span>
                        </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                        <Col sm={3} lg={3}>
                            <span className="gray800-13-opacity">Research environment</span>
                        </Col>
                        <Col sm={8} lg={8}>
                            {    ratings.map((rating) => {
                                    if (rating.dimension === "Data Model" && rating.rating === "Gold") {
                                        return (<span className="gray800-13"> {rating.response} </span>)
                                    }
                                })
                            }
                        </Col>
                        <Col sm={1} lg={1}>
                            <span><SubSilverSVG /></span>
                        </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                        <Col sm={3} lg={3}>
                            <span className="gray800-13-opacity">Time lag</span>
                        </Col>
                        <Col sm={8} lg={8}>
                            {    ratings.map((rating) => {
                                    if (rating.dimension === "Data Model" && rating.rating === "Gold") {
                                        return (<span className="gray800-13"> {rating.response} </span>)
                                    }
                                })
                            }
                        </Col>
                        <Col sm={1} lg={1}>
                            <span><SubGoldSVG /></span>
                        </Col>
                    </Row>
                    <Row className="dataUtilityBox">
                        <Col sm={3} lg={3}>
                            <span className="gray800-13-opacity">Timeliness</span>
                        </Col>
                        <Col sm={8} lg={8}>
                            {    ratings.map((rating) => {
                                    if (rating.dimension === "Data Model" && rating.rating === "Gold") {
                                        return (<span className="gray800-13"> {rating.response} </span>)
                                    }
                                })
                            }
                        </Col>
                        <Col sm={1} lg={1}>
                            <span><SubPlatinumSVG /></span>
                        </Col>
                    </Row>
                  </div>
                </Collapse>
              </div>
            );
            case "Value":
                return (
                  <div className="dataQualityCollapse">
                    <Row
                      className="pointer dataUtilityRow margin-top-8"
                      onClick={() =>
                        this.setState({ open: !open, flagClosed: !flagClosed })
                      }
                    >
                        <Col xs={2} sm={2} m={1} lg={1} className="dataUtilityChevron">
                            <SVGIcon
                                name="chevronbottom"
                                fill={"#475DA7"}
                                className={
                                flagClosed === true
                                    ? "svg-20 dataQualityArrow"
                                    : "svg-20 flipSVG dataQualityArrow"
                                }
                            />
                        </Col>
                        <Col xs={8} sm={5} md={4} lg={3} xl={2} className="gray800-14 dataUtilityTitle">
                            Value & interest
                        </Col>
                        <Col xs={2} sm={5} md={5} lg={8} xl={9} className="dataUtilitySvg">
                            <PlatinumSVG />
                        </Col>
                    </Row>
        
                    <Collapse in={this.state.open} className="dataCollapseWait pad-top-8">
                      <div>
                            <Row className="dataUtilityBox topBorder">
                                <Col sm={3} lg={3}>
                                    <span className="gray800-13-opacity">Linkages</span>
                                </Col>
                                <Col sm={8} lg={8}>
                                    {    ratings.map((rating) => {
                                            if (rating.dimension === "Data Model" && rating.rating === "Gold") {
                                                return (<span className="gray800-13"> {rating.response} </span>)
                                            }
                                        })
                                    }
                                </Col>
                                <Col sm={1} lg={1}>
                                    <span><SubBronzeSVG /></span>
                                </Col>
                            </Row>
                            <Row className="dataUtilityBox">
                                <Col sm={3} lg={3}>
                                    <span className="gray800-13-opacity">Data Enrichments</span>
                                </Col>
                                <Col sm={8} lg={8}>
                                    {    ratings.map((rating) => {
                                            if (rating.dimension === "Data Model" && rating.rating === "Gold") {
                                                return (<span className="gray800-13"> {rating.response} </span>)
                                            }
                                        })
                                    }
                                </Col>
                                <Col sm={1} lg={1}>
                                    <span><SubSilverSVG /></span>
                                </Col>
                            </Row>
                      </div>
                    </Collapse>
                  </div>
                );
                case "Coverage":
                    return (
                      <div className="dataQualityCollapse">
                        <Row
                          className="pointer dataUtilityRow margin-top-8"
                          onClick={() =>
                            this.setState({ open: !open, flagClosed: !flagClosed })
                          }
                        >
                            <Col xs={2} sm={2} m={1} lg={1} className="dataUtilityChevron">
                                <SVGIcon
                                    name="chevronbottom"
                                    fill={"#475DA7"}
                                    className={
                                    flagClosed === true
                                        ? "svg-20 dataQualityArrow"
                                        : "svg-20 flipSVG dataQualityArrow"
                                    }
                                />
                            </Col>
                            <Col xs={8} sm={5} md={4} lg={3} xl={2} className="gray800-14 dataUtilityTitle">
                                Coverage
                            </Col>
                            <Col xs={2} sm={5} md={5} lg={8} xl={9} className="dataUtilitySvg">
                                <PlatinumSVG />
                            </Col>
                        </Row>
            
                        <Collapse in={this.state.open} className="dataCollapseWait pad-top-8">
                          <div>
                                <Row className="dataUtilityBox topBorder"> 
                                    <Col sm={3} lg={3}>
                                        <span className="gray800-13-opacity">Pathway coverage</span>
                                    </Col>
                                    <Col sm={8} lg={8}>
                                        {    ratings.map((rating) => {
                                                if (rating.dimension === "Data Model" && rating.rating === "Gold") {
                                                    return (<span className="gray800-13"> {rating.response} </span>)
                                                }
                                            })
                                        }
                                    </Col>
                                    <Col sm={1} lg={1}>
                                        <span><SubBronzeSVG /></span>
                                    </Col>
                                </Row>
                                <Row className="dataUtilityBox">
                                    <Col sm={3} lg={3}>
                                        <span className="gray800-13-opacity">Length of follow up</span>
                                    </Col>
                                    <Col sm={8} lg={8}>
                                        {    ratings.map((rating) => {
                                                if (rating.dimension === "Data Model" && rating.rating === "Gold") {
                                                    return (<span className="gray800-13"> {rating.response} </span>)
                                                }
                                            })
                                        }
                                    </Col>
                                    <Col sm={1} lg={1}>
                                        <span><SubSilverSVG /></span>
                                    </Col>
                                </Row>
                          </div>
                        </Collapse>
                      </div>
                    );
    }
  }
}

export default DataQualityInfo;
