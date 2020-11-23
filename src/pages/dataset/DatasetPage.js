// /ShowObjects.js
import React, { Component, useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import _ from 'lodash';
import axios from "axios";
import * as Sentry from '@sentry/react'; 
import {
  Row,
  Col,
  Container,
  Tabs,
  Tab,
  Alert,
  Tooltip,
  Overlay
} from "react-bootstrap/";
import NotFound from "../commonComponents/NotFound";
import Loading from "../commonComponents/Loading";
import RelatedObject from "../commonComponents/relatedObject/RelatedObject";
import CollectionCard from "../commonComponents/collectionCard/CollectionCard";
import SearchBar from "../commonComponents/searchBar/SearchBar";
import SVGIcon from "../../images/SVGIcon"; 
import { ReactComponent as InfoFillSVG } from "../../images/infofill.svg";
import { ReactComponent as InfoSVG } from "../../images/info.svg";
import { ReactComponent as MetadataBronze } from "../../images/bronzeNew.svg";
import { ReactComponent as MetadataSilver } from "../../images/silverNew.svg";
import { ReactComponent as MetadataGold } from "../../images/goldNew.svg";
import { ReactComponent as MetadataPlatinum } from "../../images/platinumNew.svg";
import { ReactComponent as MetadataNotRated } from "../../images/notRatedNew.svg";
import { PageView, initGA } from "../../tracking";
import { Event } from "../../tracking";
import moment from "moment";
import Linkify from "react-linkify";
import DatasetSchema from "./DatasetSchema";
import TechnicalMetadata from "./components/TechnicalMetadata";
import TechnicalDetailsPage from "./components/TechnicalDetailsPage";
import DiscourseTopic from '../discourse/DiscourseTopic';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer';

import UserMessages from "../commonComponents/userMessages/UserMessages";
import DataSetModal from "../commonComponents/dataSetModal/DataSetModal";
import DataSetHelper from '../../utils/DataSetHelper.util';
import ErrorModal from '../commonComponents/errorModal/ErrorModal';
import "react-tabs/style/react-tabs.css";
import './Dataset.scss';
import DataUtitlityFramework from "./components/DataUtilityFramework";
import DataQuality from "./components/DataQuality";
import ActionBar from "../commonComponents/actionbar/ActionBar";
import ResourcePageButtons from "../commonComponents/resourcePageButtons/ResourcePageButtons";

var baseURL = require("../commonComponents/BaseURL").getURL();

class DatasetDetail extends Component {
  // initialize our state
  state = {
    id: "",
    data: {},
    technicalMetadata: [],
    collections: [],
    dataClassOpen: -1,
    relatedObjects: [],
    datarequest: [],
    DBData: [],
    activeKey: false,
    selectedItem: "tab-1",
    isLoading: true,
    userState: [
      {
        loggedIn: false,
        role: "Reader",
        id: null,
        name: null
      }
    ],
    alert: null,
    discoursePostCount: 0,
    searchString: "",
    isHovering: false,
    isHoveringPhenotypes: false,
    objects: [
      {
        id: "",
        authors: [],
        activeflag: ""
      }
    ],
    showDrawer: false,
    showModal: false,
    showError: false,
    requiresModal: false,
    allowsMessaging: false,
    allowNewMessage: false,
    dataRequestModalContent: {},
    showAllPhenotype: false
  };

  topicContext = {};

  constructor(props) {
    super(props);
    this.doUpdateDataClassOpen = this.doUpdateDataClassOpen.bind(this);
    this.state.userState = props.userState;
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.searchBar = React.createRef();
  }

  showModal = () => {
    this.setState({ showError: true });
  };

  hideModal = () => {
      this.setState({ showError: false });
  };

  // on loading of tool detail page
  async componentDidMount() {
    await this.getDataset();
    this.checkAlerts();
    initGA("UA-166025838-1");
    PageView();
  }

  // on loading of tool detail page were id is different
  componentDidUpdate() {
    if (
      this.props.match.params.datasetID !== this.state.id &&
      this.state.id !== "" &&
      !this.state.isLoading
    ) {
      this.getDetailsSearchFromMDC();
    }
  }

  getDataset = async () => {
    this.setState({ isLoading: true });
    await axios.get(baseURL + '/api/v1/datasets/' + this.props.match.params.datasetID)
      .then( async (res) => {
        this.setState({
          data: res.data.data,
          isLoading: false
        });
        this.getTechnicalMetadata();
        this.getCollections();
        document.title = res.data.data.name.trim();
        let counter = !this.state.data.counter ? 1 : this.state.data.counter + 1;
      
        this.topicContext = { 
          datasets: [{ datasetId: this.state.data.datasetid, publisher: this.state.data.datasetfields.publisher }] || [], 
          tags: [this.state.data.name],
          relatedObjectIds: [this.state.data._id] || '', 
          title: this.state.data.datasetfields.publisher || '', 
          subTitle: this.state.data.name || '',
          contactPoint: this.state.data.datasetfields.contactPoint ||  '',
          allowNewMessage: false  
        };

        this.updateCounter(this.props.match.params.datasetID, counter);
        
        if(!_.isUndefined(res.data.data.relatedObjects)) {
          await this.getAdditionalObjectInfo(res.data.data.relatedObjects);
        }

        if(!_.isEmpty(this.topicContext.title)) {
          const publisherId = this.topicContext.title;
          await this.getPublisherById(publisherId);
        }

        if(!res.data.isLatestVersion){
          this.setState({
            alert: {
                type: 'warning', 
                message: <Fragment>You are viewing an old version of this dataset.  Click <a href={'/dataset/' + res.data.data.pid}>here</a> for the latest version.</Fragment>
              }
          })
        }

        this.setState({ isLoading: false });
      });

  };

  getTechnicalMetadata() {
    this.setState({ isLoading: true });
    axios
      .get(baseURL + "/api/v1/datasets/" + this.state.data.datasetid)
      .then(res => {
        this.setState({
          technicalMetadata: res.data.data.datasetfields.technicaldetails || []
        });
      });
  }

  getCollections() {
    this.setState({ isLoading: true });
    axios
      .get(baseURL + "/api/v1/collections/datasetid/" + this.state.data.datasetid)
      .then(res => {
        this.setState({
          collections: res.data.data || []
        });
      });
  }

  doUpdateDataClassOpen(index) {
    this.setState({
      dataClassOpen: index
    });
  }

  doSearch = e => {
    //fires on enter on searchbar
    if (e.key === "Enter")
      window.location.href = "/search?search=" + this.state.searchString;
  };

  checkAlerts = () => {
    const { state } = this.props.location;
    if (typeof state !== "undefined" && typeof state.alert !== "undefined") {
      const { alert } = state;
      this.setState({ alert });
    }
  };

  updateSearchString = searchString => {
    this.setState({ searchString: searchString });
  };

  updateCounter = (id, counter) => {
    axios.post(baseURL + "/api/v1/counter/update", { id, counter });
  };

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
      isHoveringPhenotypes: !state.isHoveringPhenotypes
    };
  }

  getAdditionalObjectInfo = async data => {
    let tempObjects = [];
    const promises = data.map(async (object, index) => {
      if(object.objectType === 'course'){
        await axios
        .get(baseURL + "/api/v1/relatedobject/course/" + object.objectId) 
        .then(res => {
          tempObjects.push({
            id: object.objectId,
            activeflag: res.data.data[0].activeflag
          });
        });

      } else {
      await axios
        .get(baseURL + "/api/v1/relatedobject/" + object.objectId) 
        .then(res => {
          tempObjects.push({
            id: object.objectId,
            authors: res.data.data[0].authors,
            activeflag: res.data.data[0].activeflag
          });
        });
      }
    });
    await Promise.all(promises);
    this.setState({ objects: tempObjects });

    this.getRelatedObjects();
  };

  getRelatedObjects = () => {
    let tempRelatedObjects = [];
    this.state.data.relatedObjects.map(object =>
      this.state.objects.forEach(item => {
        if (object.objectId === item.id && item.activeflag === "active") {
          tempRelatedObjects.push(object);
        }

        if (
          object.objectId === item.id &&
          item.activeflag === "review" &&
          item.authors.includes(this.state.userState[0].id)
        ) {
          tempRelatedObjects.push(object);
        }
      })
    );
    this.setState({ relatedObjects: tempRelatedObjects });
  }

  updateDiscoursePostCount = (count) => {
    this.setState({ discoursePostCount: count });
  }

  getPublisherById = async (publisherId) => {
    await axios
          .get(`${baseURL}/api/v1/publishers/${publisherId}`)
          .then(response => {
            const {data: { publisher : { dataRequestModalContent = {}, allowsMessaging = false }}} = response;
            const stateObj = { 
              requiresModal: !_.isEmpty(dataRequestModalContent) ? true : false,
              allowNewMessage: allowsMessaging && _.isEmpty(dataRequestModalContent) ? true : false,
              allowsMessaging,
              dataRequestModalContent
             }
             this.topicContext = {
               ...this.topicContext,
               ...stateObj
             }
            this.setState({...stateObj});
          })
          .catch(error => {
            console.log(error);
          });
  } 

  showLoginModal = (title) => {
    DataSetHelper.showLoginPanel(window, title);
  }

  toggleDrawer = () => {
    this.setState( ( prevState ) => {
        if(prevState.showDrawer === true) {
            this.searchBar.current.getNumberOfUnreadMessages();
        }
        return { showDrawer: !prevState.showDrawer };
    });
  } 

  toggleModal = (showEnquiry = false, context = {}) => {
    this.setState( ( prevState ) => {
        return { showModal: !prevState.showModal, context, showDrawer: showEnquiry };
    });

    if(showEnquiry) {
      this.topicContext = {
        ...this.topicContext,
        allowNewMessage: true
      }
    } else {
      this.topicContext = {
        ...this.topicContext,
        allowNewMessage: false
      }
    }
  }

    showAllPhenotypes = () => {
        this.setState({ showAllPhenotype: true });
    };

  render() {
    const {
      searchString,
      data,
      technicalMetadata,
      isLoading,
      userState,
      alert = null,
      dataClassOpen,
      relatedObjects,
      discoursePostCount,
      showDrawer,
      showModal,
      requiresModal,
      allowsMessaging,
      showAllPhenotype,
      collections
    } = this.state;

    if (isLoading) {
      return (
        <Container>
          <Loading />
        </Container>
      );
    }

    if (
      data.relatedObjects === null ||
      typeof data.relatedObjects === "undefined"
    ) {
      data.relatedObjects = [];
    }

    
    if (data.datasetfields.phenotypes !== "undefined" && data.datasetfields.phenotypes.length > 0) {
        data.datasetfields.phenotypes.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0));
    }

    function Metadata() {
        const [show, setShow] = useState(false);
        const target = useRef(null);

        var rating = "Not Rated";

        if (data.datasetfields.metadataquality && typeof data.datasetfields.metadataquality.quality_rating !== "undefined") {
            rating = data.datasetfields.metadataquality.quality_rating;
        }
        else {
            return <Fragment><div style={{lineHeight: 1}}><MetadataNotRated className="" /></div><div style={{lineHeight: 1}}><span className="gray800-14-opacity">Not rated</span></div></Fragment>
        }

      return (
        <Fragment>
          <div className="text-center">
            <div ref={target} onClick={() => setShow(!show)} style={{ cursor: "pointer" }} >
                <div style={{ lineHeight: 1 }}>

                    {(() => {
                        if (rating === "Not Rated") return <MetadataNotRated />
                        else if (rating === "Bronze") return <MetadataBronze />
                        else if (rating === "Silver") return <MetadataSilver />
                        else if (rating === "Gold") return <MetadataGold />
                        else if (rating === "Platinum") return <MetadataPlatinum />
                    })()}
                </div>
            </div>
          </div>

          <Overlay target={target.current} show={show} placement="bottom">
            {props => (
              <Tooltip className="metadataOverlay" {...props}>
                Metadata richness score: {Math.trunc(data.datasetfields.metadataquality.quality_score)}
                <br />
                <br />
                The score relates to the amount of information available about
                the dataset, and not to the quality of the actual datasets.
                <br />
                <br />
                <a href="https://github.com/HDRUK/datasets/tree/master/reports#hdr-uk-data-documentation-scores" target="_blank" className="white-12" rel="noopener noreferrer" >
                  Click to read more about how the score is calculated.
                </a>
                <br />
                <br />
                {Math.trunc(data.datasetfields.metadataquality.completeness_percent)} Completeness %
                <br />
                {Math.trunc(data.datasetfields.metadataquality.weighted_completeness_percent)} Weighted completeness %
                <br />
                {Math.trunc(data.datasetfields.metadataquality.error_percent)} Error %
                <br />
                {Math.trunc(data.datasetfields.metadataquality.weighted_error_percent)} Weighted error %
              </Tooltip>
            )}
          </Overlay>
        </Fragment>
      );
    }

    return (
      <Sentry.ErrorBoundary
        fallback={
          <ErrorModal show={this.showModal} handleClose={this.hideModal} />
        }
      >
        <div>
          {data.datasetfields.metadataschema !== "" ? (
            <DatasetSchema datasetSchema={data.datasetfields.metadataschema} />
          ) : null}
          <SearchBar
            ref={this.searchBar}
            searchString={searchString}
            doSearchMethod={this.doSearch}
            doUpdateSearchString={this.updateSearchString}
            userState={userState}
            doToggleDrawer={this.toggleDrawer}
          />
          <Container className="margin-bottom-48">
            <Row className="mt-4">
              <Col sm={1} />
              <Col sm={10}>
                {alert ? (
                  <Alert variant={alert.type}>{alert.message}</Alert>
                ) : null}
                <div className="rectangle">
                  <Row>
                    <Col xs={10}>
                      <span className="black-20">{data.name} </span>
                      <br />
                      {data.datasetfields.publisher ? (
                        <span className="gray800-14">
                          {data.datasetfields.publisher}
                        </span>
                      ) : (
                        <span className="gray800-14-opacity">
                          Not specified
                        </span>
                      )}
                    </Col>
                    <Col xs={2} className="text-right">
                      <Metadata />
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col xs={12}>
                      <span className="badge-dataset">
                        <SVGIcon 
                          name="dataseticon"
                          fill={"#ffffff"}
                          className="badgeSvg mr-2"
                          viewBox="-2 -2 22 22"
                        />
                        <span>Dataset</span>
                      </span>
                      {!data.tags.features || data.tags.features.length <= 0
                        ? ""
                        : data.tags.features.map((keyword, index) => {
                            return (
                              <a
                                key={`tag-${index}`}
                                href={
                                  "/search?search=&tab=Datasets&keywords=" +
                                  keyword
                                }
                              >
                                <div className="ml-2 badge-tag">{keyword}</div>
                              </a>
                            );
                          })}
                    </Col>
                  </Row>

                  <Row className="mt-2">
                    <Col sm={6}>
                      <span className="gray800-14">
                        {data.counter === undefined ? 1 : data.counter + 1}
                        {data.counter === undefined ? " view" : " views"}
                      </span>
                    </Col>
                    <Col sm={6} className="text-right">
                      {!userState[0].loggedIn ? (
                        <button
                          className="btn button-tertiary dark-14 float-right"
                          onClick={() =>
                            this.showLoginModal(
                              data.name
                            )
                          }
                        >
                          Request access
                        </button>
                      ) : requiresModal ? (
                        <button
                          className="btn btn-primary addButton pointer float-right"
                          onClick={() => {
                            this.toggleModal();
                          }}
                        >
                          How to request access
                        </button>
                      ) : (
                        <Fragment>
                          <Link
                            className={`btn button-tertiary dark-14  ${
                              allowsMessaging ? "mr-2" : "float-right"
                            }`}
                            to={{
                              pathname: `/data-access-request/dataset/${data.datasetid}`
                            }}
                            onClick={() =>
                              Event("Buttons", "Click", "Request Access")
                            }
                          >
                            Request access
                          </Link>
                          {allowsMessaging ? (
                            <button
                              className="btn button-primary addButton pointer"
                              onClick={() => this.toggleDrawer()}
                            >
                              Make an enquiry
                            </button>
                          ) : null}
                        </Fragment>
                      )}
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col sm={1} />
            </Row>

            <Row>
              <Col sm={1} />
              <Col sm={10}>
                <div>
                  <Tabs className="tabsBackground gray700-13 margin-bottom-16">
                    <Tab eventKey="About" title={"About"}>
                      {!data.datasetfields.abstract ? (
                        ""
                      ) : (
                        <Row className="mt-2">
                          <Col sm={12}>
                            <div className="rectangle">
                              <Row className="gray800-14-bold">
                                <Col sm={12}>Abstract</Col>
                              </Row>
                              <Row className="mt-3">
                                <Col sm={12} className="gray800-14">
                                  <span className="gray800-14">
                                    {data.datasetfields.abstract}
                                  </span>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      )}

                      {!data.description ? (
                        ""
                      ) : (
                        <Row className="mt-2">
                          <Col sm={12}>
                            <div className="rectangle">
                              <Row className="gray800-14-bold">
                                <Col sm={12}>Description</Col>
                              </Row>
                              <Row className="mt-3">
                                <Col sm={12} className="gray800-14 overflowWrap">
                                  <span className="gray800-14">
                                    <ReactMarkdown source={data.description} />
                                  </span>
                                </Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                      )}

                      <Row className="mt-2">
                        <Col sm={12}>
                          <div className="rectangle">
                            <Row className="gray800-14-bold">
                              <Col sm={12}>Details</Col>
                            </Row>
                            <Row className="mt-3">
                              <Col sm={2} className="gray800-14">
                                Release date
                              </Col>
                              {data.datasetfields.releaseDate ? (
                                <Col sm={10} className="gray800-14">
                                  {moment(
                                    data.datasetfields.releaseDate
                                  ).format("DD MMMM YYYY")}
                                </Col>
                              ) : (
                                <Col sm={10} className="gray800-14-opacity">
                                  Not specified
                                </Col>
                              )}
                            </Row>
                            <Row className="mt-2">
                              <Col sm={2} className="gray800-14">
                                Periodicity
                              </Col>
                              {data.datasetfields.periodicity ? (
                                <Col sm={10} className="gray800-14">
                                  {data.datasetfields.periodicity}
                                </Col>
                              ) : (
                                <Col sm={10} className="gray800-14-opacity">
                                  Not specified
                                </Col>
                              )}
                            </Row>
                            <Row className="mt-2">
                              <Col sm={2} className="gray800-14">
                                Standard
                              </Col>
                              {data.datasetfields.conformsTo ? (
                                <Col
                                  sm={10}
                                  className="gray800-14 overflowWrap"
                                >
                                  {data.datasetfields.conformsTo}
                                </Col>
                              ) : (
                                <Col sm={10} className="gray800-14-opacity">
                                  Not specified
                                </Col>
                              )}
                            </Row>
                          </div>
                        </Col>
                      </Row>

                      <Row className="mt-2">
                        <Col sm={12}>
                          <div className="rectangle">
                            <Row className="gray800-14-bold">
                              <Col sm={12}>Data access</Col>
                            </Row>
                            <Row className="mt-3">
                              <Col sm={2} className="gray800-14">
                                Access rights
                              </Col>
                              {data.datasetfields.accessRights ? (
                                <Col sm={10} className="gray800-14">
                                  <Linkify properties={{ target: "_blank" }}>
                                    {data.datasetfields.accessRights}
                                  </Linkify>
                                </Col>
                              ) : (
                                <Col sm={10} className="gray800-14-opacity">
                                  Not specified
                                </Col>
                              )}
                            </Row>
                            <Row className="mt-2">
                              <Col sm={2} className="gray800-14">
                                License
                              </Col>
                              {data.license ? (
                                <Col sm={10} className="gray800-14">
                                  {data.license}
                                </Col>
                              ) : (
                                <Col sm={10} className="gray800-14-opacity">
                                  Not specified
                                </Col>
                              )}
                            </Row>
                            <Row className="mt-2">
                              <Col sm={2} className="gray800-14">
                                Request time
                              </Col>
                              {data.datasetfields.accessRequestDuration ? (
                                <Col sm={10} className="gray800-14">
                                  {data.datasetfields.accessRequestDuration}
                                </Col>
                              ) : (
                                <Col sm={10} className="gray800-14-opacity">
                                  Not specified
                                </Col>
                              )}
                            </Row>
                          </div>
                        </Col>
                      </Row>

                      <Row className="mt-2">
                        <Col sm={12}>
                          <div className="rectangle">
                            <Row className="gray800-14-bold">
                              <Col sm={10}>Coverage</Col>
                            </Row>
                            <Row className="mt-3">
                              <Col sm={3} className="gray800-14">
                                Jurisdiction
                              </Col>
                              {data.datasetfields.jurisdiction ? (
                                <Col sm={9} className="gray800-14">
                                  {data.datasetfields.jurisdiction}
                                </Col>
                              ) : (
                                <Col sm={9} className="gray800-14-opacity">
                                  Not specified
                                </Col>
                              )}
                            </Row>
                            <Row className="mt-2">
                              <Col sm={3} className="gray800-14">
                                Geographic coverage
                              </Col>
                              {data.datasetfields.geographicCoverage ? (
                                <Col sm={9} className="gray800-14">
                                  {data.datasetfields.geographicCoverage.toString()}
                                </Col>
                              ) : (
                                <Col sm={9} className="gray800-14-opacity">
                                  Not specified
                                </Col>
                              )}
                            </Row>
                            <Row className="mt-2">
                              <Col sm={3} className="gray800-14">
                                Dataset start date
                              </Col>
                              {data.datasetfields.datasetStartDate ? (
                                <Col sm={9} className="gray800-14">
                                  {data.datasetfields.datasetStartDate}
                                </Col>
                              ) : (
                                <Col sm={9} className="gray800-14-opacity">
                                  Not specified
                                </Col>
                              )}
                            </Row>
                            <Row className="mt-2">
                              <Col sm={3} className="gray800-14">
                                Dataset end date
                              </Col>
                              {data.datasetfields.datasetEndDate ? (
                                <Col sm={9} className="gray800-14">
                                  {data.datasetfields.datasetEndDate}
                                </Col>
                              ) : (
                                <Col sm={9} className="gray800-14-opacity">
                                  Not specified
                                </Col>
                              )}
                            </Row>
                          </div>
                        </Col>
                      </Row>

                      <Row className="mt-2">
                        <Col sm={12}>
                          <div className="rectangle">
                            <Row className="gray800-14-bold">
                              <Col sm={12}>Demographics</Col>
                            </Row>
                            <Row className="mt-3">
                              <Col sm={3} className="gray800-14">
                                Statistical population
                              </Col>
                              {data.datasetfields.statisticalPopulation ? (
                                <Col sm={9} className="gray800-14">
                                  {data.datasetfields.statisticalPopulation}
                                </Col>
                              ) : (
                                <Col sm={9} className="gray800-14-opacity">
                                  Not specified
                                </Col>
                              )}
                            </Row>
                            <Row className="mt-2">
                              <Col sm={3} className="gray800-14">
                                Age band
                              </Col>
                              {data.datasetfields.ageBand ? (
                                <Col sm={9} className="gray800-14">
                                  {data.datasetfields.ageBand}
                                </Col>
                              ) : (
                                <Col sm={9} className="gray800-14-opacity">
                                  Not specified
                                </Col>
                              )}
                            </Row>
                          </div>
                        </Col>
                      </Row>

                      <Row className="mt-2">
                        <Col sm={12}>
                          <div className="rectangle">
                            <Row className="gray800-14-bold">
                              <Col sm={12}>Related resources</Col>
                            </Row>
                            <Row className="mt-3">
                              <Col sm={3} className="gray800-14">
                                Physical sample availability
                              </Col>
                              {data.datasetfields.physicalSampleAvailability ? (
                                <Col sm={9} className="gray800-14">
                                  {
                                    data.datasetfields
                                      .physicalSampleAvailability
                                  }
                                </Col>
                              ) : (
                                <Col sm={9} className="gray800-14-opacity">
                                  Not specified
                                </Col>
                              )}
                            </Row>
                          </div>
                        </Col>
                      </Row>

                      {data.datasetfields.phenotypes !== "undefined" &&
                      data.datasetfields.phenotypes.length > 0 ? (
                        <Fragment>
                          <Row className="mt-2">
                            <Col sm={12}>
                              <div className="rectangle">
                                <Row className="gray800-14-bold">
                                  <Col sm={12}>
                                    <span className="mr-3">Phenotypes</span>

                                    <span
                                      onMouseEnter={this.handleMouseHover}
                                      onMouseLeave={this.handleMouseHover}
                                    >
                                      {this.state.isHoveringPhenotypes ? (
                                        <InfoFillSVG />
                                      ) : (
                                        <InfoSVG />
                                      )}
                                    </span>

                                    {this.state.isHoveringPhenotypes && (
                                      <div className="dataClassToolTip">
                                        <span className="white-13-semibold">
                                          When patients interact with
                                          physicians, or are admitted into
                                          hospital, information is collected
                                          electronically on their symptoms,
                                          diagnoses, laboratory test results,
                                          and prescriptions and stored in
                                          Electronic Health Records (EHR). EHR
                                          are a valuable resource for
                                          researchers and clinicians for
                                          improving health and healthcare.
                                          Phenotyping algorithms are complex
                                          computer programs that extract useful
                                          information from EHR so they can be
                                          used for health research.
                                        </span>
                                      </div>
                                    )}
                                  </Col>
                                </Row>

                                <Row className="mt-2">
                                  <Col sm={12} className="gray800-14">
                                    Below are the phenotypes identified in this
                                    dataset through a phenotyping algorithm.
                                  </Col>
                                </Row>

                                <Row className="mt-3">
                                  {!showAllPhenotype
                                    ? data.datasetfields.phenotypes
                                        .slice(0, 20)
                                        .map(phenotype => {
                                          return (
                                            <Fragment>
                                              <Col
                                                xs={6}
                                                lg={3}
                                                className="mb-2"
                                              >
                                                <a
                                                  href={phenotype.url}
                                                  rel="noopener noreferrer"
                                                  className="purple-14"
                                                >
                                                  {phenotype.name}
                                                </a>
                                              </Col>
                                              <Col
                                                xs={6}
                                                lg={3}
                                                className="gray800-14-opacity"
                                              >
                                                {phenotype.type}
                                              </Col>
                                            </Fragment>
                                          );
                                        })
                                    : data.datasetfields.phenotypes.map(
                                        phenotype => {
                                          return (
                                            <Fragment>
                                              <Col
                                                xs={6}
                                                lg={3}
                                                className="mb-2"
                                              >
                                                <a
                                                  href={phenotype.url}
                                                  rel="noopener noreferrer"
                                                  className="purple-14"
                                                >
                                                  {phenotype.name}
                                                </a>
                                              </Col>
                                              <Col
                                                xs={6}
                                                lg={3}
                                                className="gray800-14-opacity"
                                              >
                                                {phenotype.type}
                                              </Col>
                                            </Fragment>
                                          );
                                        }
                                      )}
                                </Row>
                                {!showAllPhenotype &&
                                data.datasetfields.phenotypes.length > 20 ? (
                                  <Row className="mt-3 text-center">
                                    <Col sm={12} className="purple-14">
                                      <span
                                        onClick={() => this.showAllPhenotypes()}
                                        style={{ cursor: "pointer" }}
                                      >
                                        Show all phenotypes
                                      </span>
                                    </Col>
                                  </Row>
                                ) : (
                                  ""
                                )}
                              </div>
                            </Col>
                          </Row>
                        </Fragment>
                      ) : (
                        ""
                      )}
                    </Tab>

                    <Tab eventKey="TechDetails" title={`Technical details`}> 
                      <Row className="width-100" style={{ margin: "0%" }}>
                        {dataClassOpen === -1 ? (
                          <>
                            <Col
                              sm={12}
                              lg={12}
                              className="subHeader gray800-14-bold pad-bottom-24 pad-top-24"
                            >
                              <span className="black-16-semibold mr-3">
                                Data Classes
                              </span>
                              <span
                                onMouseEnter={this.handleMouseHover}
                                onMouseLeave={this.handleMouseHover}
                              >
                                {this.state.isHovering ? (
                                  <InfoFillSVG />
                                ) : (
                                  <InfoSVG />
                                )}
                              </span>

                              {this.state.isHovering && (
                                <div className="dataClassToolTip">
                                  <span className="white-13-semibold">
                                    A Dataset contains a number of Data Classes:
                                    groupings or collections of data points that
                                    share some common context: for example
                                    appearing in the same table of a database,
                                    or the same section in a form. A data class
                                    has a name, a description, some aliases, and
                                    may contain further (sub-) data classes.
                                  </span>
                                </div>
                              )}
                            </Col>

                            <Row style={{ width: "-webkit-fill-available" }}>
                              <Col
                                sm={12}
                                lg={12}
                                className={
                                  technicalMetadata &&
                                  technicalMetadata.length > 0
                                    ? "margin-left-15 width-100"
                                    : "width-100"
                                }
                              >
                                {technicalMetadata &&
                                technicalMetadata.length > 0 ? (
                                  technicalMetadata.map(
                                    (techMetadata, index) => (
                                      <TechnicalMetadata 
                                        key={`techMetadata-${index}`}
                                        technicalMetadata={techMetadata}
                                        index={index}
                                        doUpdateDataClassOpen={
                                          this.doUpdateDataClassOpen
                                        }
                                      />
                                    )
                                  )
                                ) : (
                                  <NotFound word="technical details" />
                                )}
                              </Col>
                            </Row>
                          </>
                        ) : (
                          <Row style={{ width: "-webkit-fill-available" }}>
                            <Col sm={12} lg={12}>
                              <TechnicalDetailsPage
                                technicalMetadata={
                                  technicalMetadata[dataClassOpen]
                                }
                                doUpdateDataClassOpen={
                                  this.doUpdateDataClassOpen
                                }
                              />
                            </Col>
                          </Row>
                        )}
                      </Row>
                    </Tab>

                    <Tab eventKey="DataUtility" title={`Data utility`}>
                      <Row className="mt-2">
                        <Col sm={12}>
                          <div className="rectangle pad-bottom-16">

                            <Row>
                              <Col sm={12} lg={12} className="pad-left-14">
                                <span className="pad-top-24 pad-bottom-16  gray800-14-bold mr-3">
                                  Data utility
                                </span>

                                <DataUtitlityFramework />
                              </Col>
                            </Row>

                            <Row className="mt-3">
                              <Col sm={12} className="gray-deep-14">
                                <span className="gray-deep-14">
                                  The Data Utility Framework scores datasets on
                                  5 categories and 23 dimensions, and is used to
                                  refer to the usefulness of a dataset for a
                                  given purpose. This framework enables:
                                </span>
                                <ul className="gray-deep-14 margin-top-8">
                                  <li>
                                    Data custodians to communicate the utility
                                    of their dataset, and improvements made in
                                    the dataset
                                  </li>
                                  <li>
                                    Users to identify datasets that meet the
                                    minimum requirements for their specific
                                    purpose
                                  </li>
                                  <li>
                                    Systems leaders and funders to identify
                                    where to invest in data utility
                                    improvements, and to evaluate what
                                    improvements have happened as a result of
                                    their investments
                                  </li>
                                </ul>
                                <span>
                                  Some datasets will not yet have a data utility
                                  rating and some may only have a rating for
                                  metadata richness
                                </span>
                              </Col>
                            </Row>
                          </div>

                          <DataQuality datasetUtility= {data.datasetfields.datautility} />

                        </Col>
                      </Row>
                    </Tab>

                    <Tab
                      eventKey="Collaboration"
                      title={`Discussion (${discoursePostCount})`}
                    >
                      <DiscourseTopic
                        toolId={data.id}
                        topicId={data.discourseTopicId || 0}
                        userState={userState}
                        onUpdateDiscoursePostCount={
                          this.updateDiscoursePostCount
                        }
                      />
                    </Tab>
                    <Tab
                      eventKey="Projects"
                      title={
                        "Related resources (" + relatedObjects.length + ")"
                      }
                    >
                      {data.relatedObjects &&
                      data.relatedObjects.length <= 0 ? (
                        <NotFound word="related resources" />
                      ) : (
                        relatedObjects.map(object => (
                          <RelatedObject
                            relatedObject={object}
                            activeLink={true}
                            showRelationshipAnswer={true}
                          />
                        ))
                      )}
                    </Tab>
                    <Tab
                      eventKey="Collections"
                      title={
                        "Collections (" + collections.length + ")"
                      }
                    >
                      {!collections ||
                      collections.length <= 0 ? (
                        <NotFound text="This dataset has not been featured on any collections yet."/> 
                      ) : (
                        <>
                          <NotFound text="This dataset appears on the collections below. A collection can be a group of resources on the same theme or a Trusted Research Environment where this dataset can be accessed."/> 

                          <Row >
                            {
                              collections.map((collection) => (
                                <Col sm={12} md={12} lg={6} style={{"text-align": "-webkit-center"}}>
                                  <CollectionCard data={collection} />
                                </Col>
                              ))
                            }
                          </Row>
                        </>
                      )}
                    </Tab>
                  </Tabs>
                </div>
              </Col>
              <Col sm={1} />
            </Row> 
          </Container>

          <SideDrawer open={showDrawer} closed={this.toggleDrawer}>
            <UserMessages
              userState={userState[0]}
              closed={this.toggleDrawer}
              toggleModal={this.toggleModal}
              drawerIsOpen={showDrawer}
              topicContext={this.topicContext}
            />
          </SideDrawer>

          <ActionBar userState={userState} showOverride={true}> 
            <ResourcePageButtons data={data} userState={userState} />
          </ActionBar>

          <DataSetModal
            open={showModal}
            closed={this.toggleModal}
            context={this.topicContext}
            userState={userState[0]}
          />
        </div>
      </Sentry.ErrorBoundary>
    );
  }
}

export default DatasetDetail;
