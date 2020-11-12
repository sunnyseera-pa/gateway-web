import React from "react";
import { Col, Row } from "react-bootstrap";
import '../Dataset.scss'; 
import _ from 'lodash';
import { ReactComponent as InfoSVG } from "../../../images/info.svg"; 



class DatasetAboutCard extends React.Component {
  state = {
    v2data: {},
    section: '',
    isHovering: false,
    isHovering1: null,
    isHovering2: false
  };

  constructor(props) {
    console.log(`props - ${JSON.stringify(props.isHovering1, null, 2)}`)
    super(props); 
    this.state.v2data = props.v2data;
    this.state.section = props.section;
    this.state.isHovering1 = props.isHovering1;
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  // componentDidUpdate(prevProps) {
  //   if(this.props.isHovering1 !== prevProps.isHovering1) 
  //   this.setState({isHovering1 : this.props.isHovering1})
  // } 

  renderRow(label, description, tooltip, hover, hoverkey) { 
    // console.log(`hover - ${hover} - ${hoverkey}`)
    return(
      <Row className="mt-2">
        <Col sm={2} className="gray800-14">
          {label}
        </Col>

        <Col sm={1}> 
          {/* <InfoSVG />  */}
          {/* <InfoSVG onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover} />  */}
          <InfoSVG onMouseEnter={this.handleMouseHover(hover, hoverkey)} onMouseLeave={this.handleMouseHover(hover, hoverkey)} /> 
          {/* <InfoSVG onMouseEnter={this.props.handleMouseHover} onMouseLeave={this.props.handleMouseHover} />  */}
        </Col>

        {/* {this.state.isHovering && ( */}
        {this.state.isHovering1 && (
          <div className="datasetToolTip">
            <span className="white-13-semibold">
              {tooltip}
            </span>
          </div>
        )}

        {!description || typeof description === 'object' && _.isEmpty(description) ? 
          ( 
            <Col sm={9} >
            {/* <InfoSVG className="margin-right-16" />  */}
            <span className="gray800-14-opacity"> Not specified </span>
            </Col>
          )        
        :
          (
            <Col sm={9} className="gray800-14">
              {/* <InfoSVG className="margin-right-16" />  */}

                {typeof description === 'object' ?  
                  description.map((item, index) => (
                    <span> {index !== 0 ? ', ' : ''} {item}</span>                
                  ))
                : 
                  <span> {description} </span> 
                }
            </Col>
          ) 
        }

      </Row>
    );
  }

  handleMouseHover(hover, hoverkey) {
    console.log(`in mouse hover - ${hover} - ${hoverkey}`)
    // this.setState(this.toggleHoverState(hover, hoverkey));
    // this.setState({isHovering1: true })
    // this.toggleHoverState(hover, hoverkey);
  }

  toggleHoverState(hover, hoverkey) {
    console.log(`in toggle hover - ${JSON.stringify(hover)} - ${hoverkey}`)

    // this.setState({hoverkey: true })
    // this.setState({isHovering1: true })

    // return {
    //   isHovering: !state.isHovering
    // };

    // return {
    //   isHovering1: true
    // };
  }

  // toggleHoverState(state) {
  //   return {
  //     isHovering: !state.isHovering
  //   };
  // }


  render() {
    const { v2data, section, isHovering1 } = this.state;

    console.log(`isHovering1: ${isHovering1}`)

    let temporalCoverage = v2data.provenance.temporal.startDate + ' - ' + v2data.provenance.temporal.endDate;
 
    switch (section) {
      case "Details":
          return (
            <div >
              <Row className="mt-2">
                <Col sm={12}>
                  <div className="rectangle">
                    <Row className="gray800-14-bold">
                      <Col sm={12}>{section}</Col>
                    </Row>


                    {/* <Row className="mt-3">
                      <Col sm={2} className="gray800-14">
                        DOI
                      </Col>
                      {v2data.summary.doiName ? (
                        <Col sm={10} className="gray800-14">
                          {v2data.summary.doiName}
                        </Col>
                      ) : (
                        <Col sm={10} className="gray800-14-opacity">
                          Not specified
                        </Col>
                      )}
                    </Row> */}
                    {/* TODO - ADD EXTRA PADDING BELOW THE SECTION HEADING AS THE TOP ROW IS NOW MT-2 LIKE THE OTHER FIELDS, NOT MT-3 */}
                    {this.renderRow("DOI", v2data.summary.doiName, "This is not the DOI of the publication(s) associated with the dataset, but rather the DOI of the metadata describing the dataset.")}
                    {/* {this.renderRow("DOI", v2data.summary.doiName, "This is not the DOI of the publication(s) associated with the dataset, but rather the DOI of the metadata describing the dataset.", isHovering1, "isHovering1")} */}
                    {this.renderRow("Lastest datset release date", v2data.provenance.temporal.distributionReleaseDate, "Date of the latest release of the dataset.")}
                    {/* {this.renderRow("Lastest datset release date", v2data.provenance.temporal.distributionReleaseDate, "Date of the latest release of the dataset.", isHovering2, "isHovering2")} */}
                    {this.renderRow("Publishing frequency", v2data.provenance.temporal.accrualPeriodicity, "The frequency of publishing new data for this dataset.")}
                    {this.renderRow("Creation Date", v2data.issued, "Date when the information about this dataset was added to our database.")}
                    {this.renderRow("Last updated ", v2data.modified, "The last date when the information about this dataset was upodated.")}
                    {this.renderRow("Version", v2data.version, "Dataset metadata version")}
                    {this.renderRow("Resource creator", v2data.accessibility.usage.resourceCreator, "Any citation that credits this dataset.")}
                  </div>
                </Col>
              </Row>
            </div>
      );
      case "Coverage":
          return (
            <div >
              <Row className="mt-2">
                <Col sm={12}>
                  <div className="rectangle">
                    <Row className="gray800-14-bold">
                      <Col sm={12}>{section}</Col>
                    </Row>
                    {/* TODO - ADD EXTRA PADDING BELOW THE SECTION HEADING AS THE TOP ROW IS NOW MT-2 LIKE THE OTHER FIELDS, NOT MT-3 */}
                    {this.renderRow("Temporal coverage", temporalCoverage)}
                    {this.renderRow("Dataset time lag", v2data.provenance.temporal.timeLag)}
                    {this.renderRow("Geographical coverage", v2data.coverage.spatial)}
                    {this.renderRow("Typical age range", v2data.coverage.typicalAgeRange)}
                    {this.renderRow("Physical sample availability", v2data.coverage.physicalSampleAvailability)}
                    {this.renderRow("Follow-up", v2data.coverage.followup)}
                    {this.renderRow("Pathway", v2data.coverage.pathway)}
                  </div>
                </Col>
              </Row>
            </div>
      );
      case "Formats and standards":
          return (
            <div >
              <Row className="mt-2">
                <Col sm={12}>
                  <div className="rectangle">
                    <Row className="gray800-14-bold">
                      <Col sm={12}>{section}</Col>
                    </Row>
                    {/* TODO - ADD EXTRA PADDING BELOW THE SECTION HEADING AS THE TOP ROW IS NOW MT-2 LIKE THE OTHER FIELDS, NOT MT-3 */}
                    {this.renderRow("Semantic Annotations", v2data.accessibility.formatAndStandards.vocabularyEncodingScheme)}
                    {this.renderRow("Data models", v2data.accessibility.formatAndStandards.conformsTo)}
                    {this.renderRow("Language", v2data.accessibility.formatAndStandards.language)}
                    {this.renderRow("Format", v2data.accessibility.formatAndStandards.format)} 
                  </div>
                </Col>
              </Row>
            </div>
      );
      case "Provenance":
          return (
            <div >
              <Row className="mt-2">
                <Col sm={12}>
                  <div className="rectangle">
                    <Row className="gray800-14-bold">
                      <Col sm={12}>{section}</Col>
                    </Row>
                    {/* TODO - ADD EXTRA PADDING BELOW THE SECTION HEADING AS THE TOP ROW IS NOW MT-2 LIKE THE OTHER FIELDS, NOT MT-3 */}
                    {this.renderRow("Purpose", v2data.provenance.origin.purpose)}
                    {this.renderRow("Source", v2data.provenance.source )}
                    {this.renderRow("Collection situation", v2data.provenance.collectionSituation)}
                    {this.renderRow("Derived from", v2data.enrichmentAndLinkage.derivation)} 
                    {this.renderRow("Statistical population", v2data.observations.observedNode )}
                    {this.renderRow("Population description", v2data.observations.disambiguatingDescription)}
                    {this.renderRow("Population size", v2data.observations.measuredValue)}
                    {this.renderRow("Measured property", v2data.observations.measuredProperty)} 
                    {this.renderRow("Observation date", v2data.observations.observationDate)} 
                  </div>
                </Col>
              </Row>
            </div>
      );
      case "Data access request":
          return (
            <div >
              <Row className="mt-2">
                <Col sm={12}>
                  <div className="rectangle">
                    <Row className="gray800-14-bold">
                      <Col sm={12}>
                        {section}
                        
                        {this.props.requiresModal ?
                          <span className="purple-14 pointer float-right" onClick={this.props.toggleModal}>How to request access</span>
                        :
                          ''
                        }
                      </Col>
                    </Row>
                    {/* TODO - ADD EXTRA PADDING BELOW THE SECTION HEADING AS THE TOP ROW IS NOW MT-2 LIKE THE OTHER FIELDS, NOT MT-3 */}
                    {this.renderRow("Access information", v2data.summary.publisher.accessRights)}
                    {this.renderRow("Processing time", v2data.summary.publisher.deliveryLeadTime)}
                    {this.renderRow("Access request cost", v2data.summary.publisher.accessRequestCost)}
                    {this.renderRow("Access environment", v2data.summary.publisher.accessService)} 
                    {this.renderRow("Jurisdiction", v2data.accessibility.access.jurisdiction)}
                    {this.renderRow("Limitations", v2data.summary.publisher.accessService.dataUseLimitation)}
                    {this.renderRow("Requirements", v2data.summary.publisher.accessService.dataUseRequirements)}
                    {this.renderRow("Data Controller", v2data.accessibility.access.dataController)} 
                    {this.renderRow("Data Processor", v2data.accessibility.access.dataProcessor)} 
                  </div>
                </Col>
              </Row>
            </div>
      );
      case "Related resources":
          return (
            <div >
              <Row className="mt-2">
                <Col sm={12}>
                  <div className="rectangle">
                    <Row className="gray800-14-bold">
                      <Col sm={12}>{section}</Col>
                    </Row>
                    {/* TODO - ADD EXTRA PADDING BELOW THE SECTION HEADING AS THE TOP ROW IS NOW MT-2 LIKE THE OTHER FIELDS, NOT MT-3 */}
                    {this.renderRow("Papers", v2data.accessibility.usage.isReferencedBy )}
                    {this.renderRow("Projects", v2data.accessibility.usage.investigations)}
                    {this.renderRow("Tools", v2data.enrichmentAndLinkage.tools)}
                  </div>
                </Col>
              </Row>
            </div>
      );
    }
  }
}

export default DatasetAboutCard;