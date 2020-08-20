// /ShowObjects.js
import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import { Row, Col, Tabs, Tab, Container, Alert, Button } from "react-bootstrap";
import NotFound from "../commonComponents/NotFound";
import Creators from "../commonComponents/Creators";
import Loading from "../commonComponents/Loading";
import RelatedObject from "../commonComponents/RelatedObject";
import SearchBar from "../commonComponents/SearchBar";
import DiscourseTopic from '../discourse/DiscourseTopic';
import SideDrawer from '../commonComponents/sidedrawer/SideDrawer'; 
import UserMessages from "../commonComponents/userMessages/UserMessages";

import "react-tabs/style/react-tabs.css";
import { baseURL } from "../../configs/url.config";
// import ReactGA from 'react-ga';
import { PageView, initGA } from "../../tracking";
import SVGIcon from "../../images/SVGIcon";
import ReactMarkdown from "react-markdown";
import moment from "moment";
import _ from 'lodash';

class ToolDetail extends Component {
  // initialize our state
  state = {
    id: "",
    data: [],
    reviewData: [],
    key: "Reviews",
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
    toolAdded: false,
    toolEdited: false,
    reviewAdded: false,
    replyAdded: false,
    discourseTopic: null,
    searchString: "",
    objects: [
      {
        id: "",
        authors: [],
        activeflag: ""
      }
    ],
    relatedObjects: [],
    discoursePostCount: 0,
    showDrawer: false
  };

  constructor(props) {
    super(props);
    this.state.userState = props.userState;
    this.searchBar = React.createRef();
  }

  // on loading of tool detail page
  componentDidMount() {
    if (!!window.location.search) {
      var values = queryString.parse(window.location.search);
      this.setState({ toolAdded: values.toolAdded });
      this.setState({ toolEdited: values.toolEdited });
      this.setState({ reviewAdded: values.reviewAdded });
      this.setState({ replyAdded: values.replyAdded });
    }

    initGA("UA-166025838-1");
    PageView();

    this.getDataSearchFromDb();
  }

  // on loading of tool detail page were id is different
  componentDidUpdate() {
    if (
      this.props.match.params.toolID !== this.state.id &&
      this.state.id !== "" &&
      !this.state.isLoading
    ) {
      this.getDataSearchFromDb();
    }
  }

  getDataSearchFromDb = () => {
    this.setState({ isLoading: true });
    axios
      .get(baseURL + "/api/v1/papers/" + this.props.match.params.paperID)
      .then( async (res) => {
        this.setState({
          data: res.data.data[0],
          reviewData: res.data.reviewData,
          discourseTopic: res.data.discourseTopic
        });
        document.title = res.data.data[0].name.trim();

        let counter = !this.state.data.counter
          ? 1
          : this.state.data.counter + 1;
        this.updateCounter(this.props.match.params.paperID, counter);
        if(!_.isUndefined(res.data.data[0].relatedObjects)) {
          await this.getAdditionalObjectInfo(res.data.data[0].relatedObjects);
        }
      })
      .catch((err) => {
        //check if request is for a PaperID or a different route such as /add
        if(!isNaN(this.props.match.params.paperID)){
          window.localStorage.setItem('redirectMsg', err.response.data);
        }
        this.props.history.push({pathname: "/search?search=", search:""});
      }).finally(() => {
        this.setState({ isLoading: false });
    });
  };

  doSearch = e => {
    //fires on enter on searchbar
    if (e.key === "Enter")
      window.location.href = "/search?search=" + this.state.searchString;
  };

  updateSearchString = searchString => {
    this.setState({ searchString: searchString });
  };

  updateCounter = (id, counter) => {
    axios.post(baseURL + "/api/v1/counter/update", { id, counter });
  };

  updateDiscoursePostCount = (count) => {
    this.setState({ discoursePostCount: count });
  }

  getAdditionalObjectInfo = async data => {
    let tempObjects = [];

    if(data){
    const promises = data.map(async (object, index) => {
      await axios
        .get(baseURL + "/api/v1/relatedobject/" + object.objectId)
        .then(res => {
          tempObjects.push({
            id: object.objectId,
            authors: res.data.data[0].authors,
            activeflag: res.data.data[0].activeflag
          });
        });
    });
    await Promise.all(promises);
  }
    this.setState({ objects: tempObjects });

    this.getRelatedObjects();
  };

  getRelatedObjects() {
    let tempRelatedObjects = [];

    if(this.state.data.relatedObjects && this.state.objects){
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
    }
    this.setState({ relatedObjects: tempRelatedObjects });
  }

  toggleDrawer = () => {
    this.setState( ( prevState ) => {
        if(prevState.showDrawer === true) {
            this.searchBar.current.getNumberOfUnreadMessages();
        }
        return { showDrawer: !prevState.showDrawer };
    });
  }

  render() {
    const {
      searchString,
      data,
      isLoading,
      userState,
      paperAdded,
      paperEdited,
      reviewAdded,
      replyAdded,
      relatedObjects,
      discoursePostCount,
      showDrawer
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

    return (
      <div>
        <SearchBar
          searchString={searchString}
          doSearchMethod={this.doSearch}
          doUpdateSearchString={this.updateSearchString}
          userState={userState}
          doToggleDrawer={this.toggleDrawer}
        />
        <Container className="margin-bottom-48">
          {paperAdded ? (
            <Row className="">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <Alert variant="success" className="mt-3">
                  Done! Someone will review your tool and let you know when it
                  goes live
                </Alert>
              </Col>
              <Col sm={1} lg={10} />
            </Row>
          ) : (
            ""
          )}

          {paperEdited ? (
            <Row className="">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <Alert variant="success" className="mt-3">
                  Done! Your tool has been updated
                </Alert>
              </Col>
              <Col sm={1} lg={10} />
            </Row>
          ) : (
            ""
          )}

          {data.activeflag === "review" ? (
            <Row className="">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <Alert variant="warning" className="mt-3">
                  Your paper is pending review. Only you can see this page.
                </Alert>
              </Col>
              <Col sm={1} lg={10} />
            </Row>
          ) : (
            ""
          )}

          {reviewAdded ? (
            <Row className="">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <Alert variant="warning" className="mt-3">
                  Done! Your review is pending review.
                </Alert>
              </Col>
              <Col sm={1} lg={10} />
            </Row>
          ) : (
            ""
          )}

          {replyAdded ? (
            <Row className="">
              <Col sm={1} lg={1} />
              <Col sm={10} lg={10}>
                <Alert variant="success" className="mt-3">
                  Done! Your reply has been added.
                </Alert>
              </Col>
              <Col sm={1} lg={10} />
            </Row>
          ) : (
            ""
          )}

          <Row className="mt-2">
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <div className="rectangle">
                <Row>
                  <Col xs={7} md={8}>
                    <p>
                      <span className="black-16" data-testid="title">
                        {data.name}
                      </span>
                      <br />
                      <span className="badge-paper">
                        <SVGIcon
                          name="projecticon"
                          fill={"#3c3c3b"}
                          className="badgeSvg mr-2"
                        />
                        Paper
                      </span>
                    </p>
                  </Col>
                  <Col xs={5} md={4} className="iconHolder"></Col>
                </Row>

                <Row>
                  <Row>
                    <Col className="ml-3">
                      <span className="gray800-14">
                        {data.counter === undefined ? 1 : data.counter + 1}
                        {data.counter === undefined ? " view" : " views"}
                      </span>
                    </Col>
                  </Row>
                </Row>
              </div>
            </Col>
            <Col sm={1} lg={10} />
          </Row>

          <Row>
            <Col sm={1} lg={1} />
            <Col sm={10} lg={10}>
              <div>
                <Tabs className="tabsBackground gray700-13">
                  <Tab eventKey="about" title={"About"}>
                    <Row className="mt-2">
                      <Col>
                        <div className="rectangle">
                          <Row>
                            <Col>
                              <span className="gray800-14-bold">Details</span>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col sm={2}>
                              <span className="gray800-14">URL</span>
                            </Col>
                            <Col sm={10}>
                              <a
                                href={data.link}
                                rel="noopener noreferrer"
                                target="_blank"
                                className="purple-14"
                              >
                                {data.link}
                              </a>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col sm={2}>
                              <span className="gray800-14">Journal</span>
                            </Col>
                            <Col sm={10}>
                              <span className="gray800-14">
                                {data.journal} {data.journalYear}
                              </span>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col sm={2}>
                              <span className="gray800-14">Last update</span>
                            </Col>
                            <Col sm={10}>
                              <span className="gray800-14">
                                {moment(data.updatedon).format("DD MMMM YYYY")}
                              </span>
                            </Col>
                          </Row>
                          {data.uploader ? (
                            <Row className="mt-2">
                              <Col sm={2} className="gray800-14">
                                Uploader
                              </Col>
                              <Col sm={10} className="gray800-14 overflowWrap">
                                {data.uploaderIs[0].firstname}{" "}
                                {data.uploaderIs[0].lastname}
                              </Col>
                            </Row>
                          ) : (
                            ""
                          )}
                          <Row className="mt-2">
                            <Col sm={2}>
                              <span className="gray800-14">Keywords</span>
                            </Col>
                            <Col sm={10}>
                              <span className="gray800-14">
                                {!data.tags.features ||
                                data.tags.features.length <= 0
                                  ? ""
                                  : data.tags.features.map((feature, i) => {
                                      return (
                                        <div className="badge-tag" key={i}>
                                          <a
                                            className="gray800-14"
                                            href={
                                              "/search?search=" +
                                              feature +
                                              "&type=all"
                                            }
                                          >
                                            {feature}
                                          </a>
                                        </div>
                                      );
                                    })}
                              </span>
                            </Col>
                          </Row>
                          <Row className="mt-2">
                            <Col sm={2}>
                              <span className="gray800-14">Domain</span>
                            </Col>
                            <Col sm={10}>
                              <span className="gray800-14">
                                {!data.tags.topics ||
                                data.tags.topics.length <= 0
                                  ? ""
                                  : data.tags.topics.map((topic, i) => {
                                      return (
                                        <div className="badge-tag" key={i}>
                                          <a
                                            className="gray800-14"
                                            href={
                                              "/search?search=" +
                                              topic +
                                              "&type=all"
                                            }
                                          >
                                            {topic}
                                          </a>
                                        </div>
                                      );
                                    })}
                              </span>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-2">
                      <Col>
                        <div className="rectangle">
                          <Row>
                            <Col>
                              <span className="gray800-14-bold">Abstract</span>
                            </Col>
                          </Row>
                          <Row className="mt-3">
                            <Col>
                              <span className="gray800-14">
                                <ReactMarkdown source={data.description} />
                              </span>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <div className="rectangle">
                          <Row>
                            <Col>
                              <span className="gray800-14-bold">Authors</span>
                            </Col>
                          </Row>
                          <Row className="mt-3">
                            {data.persons.map(author => (
                              <Col sm={6} key={author.id}>
                                <Creators key={author.id} author={author} />
                              </Col>
                            ))}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </Tab>

                  <Tab eventKey="Collaboration" title={`Discussion (${discoursePostCount})`}>
                    <DiscourseTopic toolId={data.id} topicId={data.discourseTopicId || 0} userState={userState} onUpdateDiscoursePostCount={this.updateDiscoursePostCount}/>
                  </Tab>
                  <Tab
                    eventKey="Projects"
                    title={"Related resources (" + relatedObjects.length + ")"}
                  >
                    {relatedObjects.length <= 0 ? (
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
                </Tabs>
              </div>
            </Col>
            <Col sm={1} lg={1} />
          </Row>
        </Container>
        <SideDrawer
          open={showDrawer}
          closed={this.toggleDrawer}>
          <UserMessages 
              closed={this.toggleDrawer}
              drawerIsOpen={this.state.showDrawer} 
          />
        </SideDrawer> 
        {!userState[0].loggedIn ? (
          ""
        ) : (
          <div className="actionBar">
            <Button
              variant="white"
              href={"/paper/edit/" + data.id}
              className="techDetailButton mr-2"
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default ToolDetail;
