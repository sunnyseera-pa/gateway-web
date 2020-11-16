import React from "react";
import { Col, Row } from "react-bootstrap";
import '../Dataset.scss'; 
import AboutCardElement from "./AboutCardElement";

class DatasetAboutCard extends React.Component {
  state = {
    v2data: {},
    section: ''
  };

  constructor(props) {
    super(props); 
    this.state.v2data = props.v2data;
    this.state.section = props.section;
  }

  render() {
    const { v2data, section } = this.state;

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
                    <AboutCardElement label={"DOI"} description={v2data.summary.doiName} tooltip={"This is not the DOI of the publication(s) associated with the dataset, but rather the DOI of the metadata describing the dataset."} />

                    <AboutCardElement label={"Lastest datset release date"} description={v2data.provenance.temporal.distributionReleaseDate} tooltip={"Date of the latest release of the dataset."} />
                    <AboutCardElement label={"Publishing frequency"} description={v2data.provenance.temporal.accrualPeriodicity} tooltip={"The frequency of publishing new data for this dataset."} />
                    <AboutCardElement label={"Creation Date"} description={v2data.issued} tooltip={"Date when the information about this dataset was added to our database."} />
                    <AboutCardElement label={"Last updated "} description={v2data.modified} tooltip={"The last date when the information about this dataset was updated"} />
                    <AboutCardElement label={"Version"} description={v2data.version} tooltip={"Dataset metadata version"} />
                    <AboutCardElement label={"Resource creator"} description={v2data.accessibility.usage.resourceCreator} tooltip={"Any citation that credits this dataset."} />
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
                    <AboutCardElement label={"Temporal coverage"} description={temporalCoverage} tooltip={"The start and end date of the time period that the dataset provides coverage for. End date may be empty depending on publishing frequency."} />
                    <AboutCardElement label={"Dataset time lag"} description={v2data.provenance.temporal.timeLag} tooltip={"Please indicate the typical time-lag between an event and the data for that event appearing in the dataset."} />
                    <AboutCardElement label={"Geographical coverage"} description={v2data.coverage.spatial} tooltip={"The geographical area covered by the dataset."} />
                    <AboutCardElement label={"Typical age range"} description={v2data.coverage.typicalAgeRange} tooltip={"The age range in whole years of participants in the dataset."} />
                    <AboutCardElement label={"Physical sample availability"} description={v2data.coverage.physicalSampleAvailability} tooltip={"Availability of physical samples associated with the dataset."} />
                    <AboutCardElement label={"Follow-up"} description={v2data.coverage.followup} tooltip={"The typical time span that a patient appears in the dataset (follow-up period)"} />
                    <AboutCardElement label={"Pathway"} description={v2data.coverage.pathway} tooltip={"Indicates if the dataset is representative of the patient pathway and any limitations the dataset may have with respect to pathway coverage. This could include if the dataset is from a single speciality or area, a single tier of care, linked across two tiers (e.g. primary and secondary care), or an integrated care record covering the whole patient pathway."} />
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
                    <AboutCardElement label={"Semantic Annotations"} description={v2data.accessibility.formatAndStandards.vocabularyEncodingScheme} tooltip={"Relevant terminologies / ontologies / controlled vocabularies, such as ICD 10 Codes, NHS Data Dictionary National Codes or SNOMED CT International, that are being used by the dataset."} />
                    <AboutCardElement label={"Data models"} description={v2data.accessibility.formatAndStandards.conformsTo} tooltip={"Standardised data models that the dataset has been stored in or transformed to, such as OMOP or FHIR,or if the data is only available in a local format."} />
                    <AboutCardElement label={"Language"} description={v2data.accessibility.formatAndStandards.language} tooltip={"All the languages in which the dataset metadata and underlying data is made available."} />
                    <AboutCardElement label={"Format"} description={v2data.accessibility.formatAndStandards.format} tooltip={"Format(s) in which the dataset is available. I.e. application, audio, image, message, model, multipart, text, video, and so on."} />
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
                    <AboutCardElement label={"Purpose"} description={v2data.provenance.origin.purpose} tooltip={"The purpose(s) for which the dataset was collected."} />
                    <AboutCardElement label={"Source"} description={v2data.provenance.source} tooltip={"The source of the data extraction."} />
                    <AboutCardElement label={"Collection situation"} description={v2data.provenance.collectionSituation} tooltip={"The setting(s) where data was collected. Multiple settings may be provided"} />
                    <AboutCardElement label={"Derived from"} description={v2data.enrichmentAndLinkage.derivation} tooltip={"Indicates if derived datasets or predefined extracts are available and the type of derivation available."} />
                    <AboutCardElement label={"Statistical population"} description={v2data.observations.observedNode} tooltip={"This could be either persons, events or findings."} />
                    <AboutCardElement label={"Population description"} description={v2data.observations.disambiguatingDescription} tooltip={"A description that disambiguates the population type, if needed."} />
                    <AboutCardElement label={"Population size"} description={v2data.observations.measuredValue} tooltip={"The population size associated with the population type the dataset i.e. 1000 people in a study, or 87 images (MRI) of Knee"} />
                    <AboutCardElement label={"Measured property"} description={v2data.observations.measuredProperty} tooltip={"This will be defaulted to 'Count' on most cases."} />
                    <AboutCardElement label={"Observation date"} description={v2data.observations.observationDate} tooltip={"The date of the observation"} />
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
                    <AboutCardElement label={"Access information"} description={v2data.summary.publisher.accessRights} tooltip={"The URL of a webpage where the data access request process and/or guidance is provided."} />
                    <AboutCardElement label={"Processing time"} description={v2data.summary.publisher.deliveryLeadTime} tooltip={"An indication of the typical processing times based on the types of requests typically received."} />
                    <AboutCardElement label={"Access request cost"} description={v2data.summary.publisher.accessRequestCost} tooltip={"Indication of cost (in GBP) for processing each data access request by the data custodian."} />
                    <AboutCardElement label={"Access environment"} description={v2data.summary.publisher.accessService} tooltip={"A brief description of the environment where data can be accessed by researchers."} />
                    <AboutCardElement label={"Jurisdiction"} description={v2data.accessibility.access.jurisdiction} tooltip={"ISO 3166-1 country codes and the associated SO 3166-2 for regions, cities, states etc. for the country/state under whose laws the data subjects data is collected, processed and stored. Multiple Jurisdications may be provided (if applicable)."} />
                    <AboutCardElement label={"Limitations"} description={v2data.summary.publisher.accessService.dataUseLimitation} tooltip={"An indication of consent permissions for datasets and/or materials, and relates to the purposes for which datasets and/or material might be removed, stored or used."} />
                    <AboutCardElement label={"Requirements"} description={v2data.summary.publisher.accessService.dataUseRequirements} tooltip={"Any additional conditions set for use if any."} />
                    <AboutCardElement label={"Data Controller"} description={v2data.accessibility.access.dataController} tooltip={"Data Controller means a person/entity who (either alone or jointly or in common with other persons/entities) determines the purposes for which and the way any Data Subject data, specifically personal data or are to be processed. For most organisations this will be the same as the publisher of the dataset. If this is not the case, this should be indicated here."} />
                    <AboutCardElement label={"Data Processor"} description={v2data.accessibility.access.dataProcessor} tooltip={"A Data Processor, in relation to any Data Subject data, specifically personal data, means any person/entity (other than an employee of the data controller) who processes the data on behalf of the data controller."} />
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
                    <AboutCardElement label={"Papers"} description={v2data.accessibility.usage.isReferencedBy} tooltip={"The keystone paper associated with the dataset"} />
                    <AboutCardElement label={"Projects"} description={v2data.accessibility.usage.investigations} tooltip={"Any active projects that are using the dataset."} />
                    <AboutCardElement label={"Tools"} description={v2data.enrichmentAndLinkage.tools} tooltip={"Any analysis tools or models that have been created for this dataset and are available for further use."} />
                  </div>
                </Col>
              </Row>
            </div>
      );
    }
  }
}

export default DatasetAboutCard;