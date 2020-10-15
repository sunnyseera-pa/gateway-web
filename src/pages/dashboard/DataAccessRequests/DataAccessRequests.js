import React, { Fragment } from 'react';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { Row, Col, Tabs, Tab, DropdownButton, Dropdown, Alert } from 'react-bootstrap';
import { ReactComponent as CheckSvg } from '../../../images/check.svg';
import { ReactComponent as Clock } from "../../../images/clock.svg";
import Loading from '../../commonComponents/Loading';
import SLA from '../../commonComponents/sla/SLA';
import TimeDuration from '../../commonComponents/timeDuration/TimeDuration';
import CommentItem from './CommentItem/CommentItem';
import AccessActivity from './AccessActivity/AccessActivity';
import { initGA } from "../../../tracking";
import { baseURL } from '../../../configs/url.config';
import DarHelperUtil from '../../../utils/DarHelper.util';
import './DataAccessRequests.scss';

class DataAccessRequestsNew extends React.Component {
  durationLookups = ["inProgress", "submitted"];
  finalDurationLookups = ["rejected", "approved", "approved with conditions"];

  state = {
    userState: [],
    key: "all",
    data: [],
    screenData: [],
    isLoading: true,
    allCount: 0,
    approvedCount: 0,
    rejectedCount: 0,
    archivedCount: 0,
    preSubmissionCount: 0,
    submittedCount: 0,
    inReviewCount: 0,
    team: "",
    avgDecisionTime: 0,
    alert: {}
  };

  constructor(props) {
    super(props);
    this.state.userState = props.userState;
    this.state.team = props.team || "";
    if (!_.isEmpty(props.alert)) {
      this.state.alert = props.alert; 
      this.state.team = props.alert.publisher;
    }
  }

  componentDidMount() {
    initGA("UA-166025838-1");
    this.fetchDataAccessRequests(this.state);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.team !== this.props.team) {
      this.setState({ isLoading: true });
      this.fetchDataAccessRequests(nextProps);
	}
	
    this.setState({ alert: nextProps.alert });
  }

  componentWillUnmount() {
    clearTimeout(this.alertTimeOut);
  }


	async fetchDataAccessRequests(nextProps) {
		let data = [];
		let avgDecisionTime = 0;
		let dataProps = { ...nextProps, key: "all" };
		// 1. if there is an alert set team and correct tab so it can display on the UI
		if (!_.isEmpty(this.state.alert)) {
			dataProps.team = this.state.alert.publisher;
			dataProps.key = this.state.alert.tab;
		}
		// 2. check which API to call the user or custodian if a team and use team name
		const teamExists = !_.isEmpty(dataProps.team) ? true : false;
		if (teamExists && dataProps.team !== "user") {
			const response = await axios.get(
				`${baseURL}/api/v1/publishers/${dataProps.team}/dataaccessrequests`
			);
			({
				data: { data, avgDecisionTime },
			} = response);
		} else {
			const response = await axios.get(`${baseURL}/api/v1/data-access-request`);
			({
				data: { data, avgDecisionTime },
			} = response);
		}
		// 3. modifies approve with conditions to approved
		let screenData = this.formatScreenData(data);
		// 4. count stats
		let counts = DarHelperUtil.generateStatusCounts(screenData);
		// 5. set state
		this.setState({
			data: screenData,
			isLoading: false,
			team: dataProps.team,
			avgDecisionTime,
			...counts,
		});
		// 6. set tab
		this.onTabChange(dataProps.key);
	}


	onTabChange = (key) => {
		let statusKey = DarHelperUtil.darStatus[key];
		let { data } = this.state;

    if (statusKey === "all")
      this.setState({ key, screenData: data, allCount: data.length });

    if (statusKey !== "all") {
      let screenData = [...data].reduce((arr, item) => {
        if (statusKey === item.applicationStatus) {
          arr.push({
            ...item
          });
        }
        return arr;
      }, []);
      this.setState({ key: key, screenData });
    }
  };

	generateAlert = () => {
		let { alert: { message = '' } } = this.state;
			return (
				<Row className='mt-3'>
						<Col xs={1}></Col>
						<Col xs={10}>
							<Alert variant={"success"} className="col-sm-12">
								<CheckSvg fill="#2C8267" />{message}
							</Alert>
						</Col>
						<Col xs={1}></Col>
				</Row>
			)
		}
		
	formatScreenData = (data = []) => {
		if (!_.isEmpty(data)) {
			return [...data].reduce((arr, item) => {
				let { applicationStatus } = item;
				return [
					...arr,
					{
						...item,
						applicationStatus: DarHelperUtil.darStatus[`${applicationStatus}`],
					},
				];
			}, []);
		}
		return [];
	};

  calculateTimeDifference = startTime => {
    let start = moment(startTime);
    let end = moment();
    return end.diff(start, "days");
  };


  renderComment = (
    applicationStatusDesc = "",
    applicationStatus = "",
    decisionComments = "",
    reviewPanels = "",
    decisionMade = false,
    decisionApproved = false,
    decisionDate
  ) => {
    const decisionApprovedType = decisionApproved
      ? "No issues found:"
      : "Issues found:";
    if (!_.isEmpty(applicationStatusDesc) && !_.isEmpty(applicationStatus)) {
      if (this.finalDurationLookups.includes(applicationStatus)) {
        return (
          <CommentItem
            text={applicationStatusDesc}
            title={DarHelperUtil.darCommentTitle[applicationStatus]}
          />
        );
      }
    } else if (
      decisionMade &&
      !this.finalDurationLookups.includes(applicationStatus)
    ) {
      return (
        <CommentItem
          text={decisionComments}
          title={"Phase decision"}
          subtitle={`${decisionApprovedType} ${reviewPanels}`}
          decisionDate={decisionDate}
        />
      );
    }
    return "";
  };

  renderDuration = (accessRequest, team = {}) => {
    let {
      applicationStatus = "",
      createdAt,
      dateSubmitted,
      decisionDuration = 0
    } = accessRequest;
    let diff = 0;
    if (this.durationLookups.includes(applicationStatus)) {
      if (applicationStatus === DarHelperUtil.darStatus.inProgress) {
        diff = this.calculateTimeDifference(createdAt);
        return <TimeDuration text={`${diff} days since start`} />;
      }

      if (applicationStatus === DarHelperUtil.darStatus.submitted) {
        diff = this.calculateTimeDifference(dateSubmitted);
        return <TimeDuration text={`${diff} days since submission`} />;
      }
    }
    if (this.finalDurationLookups.includes(applicationStatus) && team) {
      if (!_.isEmpty(decisionDuration.toString())) {
        return <TimeDuration text={`${decisionDuration} days total`} />;
      }
    }
    return "";
  };

  navigateToLocation = (e, applicationId, applicationStatus) => {
    e.stopPropagation();

    switch (e.currentTarget.id) {
      case "workflow":
        alert("show popup");
        break;
      case "startReview":
        this.startWorkflowReview(applicationId);
        break;
      default:
        if (applicationStatus !== DarHelperUtil.darStatus.submitted) {
          window.location.href = `/data-access-request/${applicationId}`;
        }
        break;
    }
  };

  startWorkflowReview = async applicationId => {
    await axios
      .put(`${baseURL}/api/v1/data-access-request/${applicationId}/startreview`)
      .then(() => {
        window.location.href = `/data-access-request/${applicationId}`;
      })
      .catch(err => {
        console.error(err);
      });
  };

  renderAverageSubmission = () => {
    return (
      <Clock />
    )`${this.state.avgDecisionTime} average time from submission to descision`;
  };

  render() {
    const {
      key,
      isLoading,
      data,
      approvedCount,
      rejectedCount,
      archivedCount,
      preSubmissionCount,
      submittedCount,
      inReviewCount,
      allCount,
      team,
      alert,
      screenData,
      avgDecisionTime
    } = this.state;

    if (isLoading) {
      return (
        <Row>
          <Col xs={1}></Col>
          <Col xs={10}>
            <Loading />
          </Col>
          <Col xs={1}></Col>
        </Row>
      );
    }

		return (
			<Fragment>
				<Fragment>{!_.isEmpty(alert) ? this.generateAlert() : ""}</Fragment>
				<Row>
						<Col xs={1}></Col>
						<div className="col-sm-10">
								<div className="accountHeader dataAccessHeader">
										<Col xs={8}>
												<Row>
														<div className="black-20">Data access request applications {!_.isEmpty(team) && team !== 'user' ? team : ''}</div>
														<div className="gray700-13">Manage forms and applications</div>
														<div><Clock /> {`${avgDecisionTime > 0 ? avgDecisionTime : '-'} days`} <span className="gray700-13">average time from submission to descision</span></div>
												</Row>
										</Col>
										<Col xs={4} style={{ textAlign: "right" }}>
												
										</Col>
								</div>

            <div className="tabsBackground">
              <Col sm={12} lg={12}>
                <Tabs
                  className="dataAccessTabs gray700-13"
                  activeKey={this.state.key}
                  onSelect={this.onTabChange}
                >
                  <Tab eventKey="all" title={"All (" + allCount + ")"}></Tab>
                  {!team ? (
                    <Tab
                      eventKey="inProgress"
                      title={"Pre-submission (" + preSubmissionCount + ")"}
                    ></Tab>
                  ) : (
                    ""
                  )}
                  <Tab
                    eventKey="submitted"
                    title={"Submitted (" + submittedCount + ")"}
                  ></Tab>
                  <Tab
                    eventKey="inReview"
                    title={"In review (" + inReviewCount + ")"}
                  ></Tab>
                  <Tab
                    eventKey="approved"
                    title={"Approved (" + approvedCount + ")"}
                  ></Tab>
                  <Tab
                    eventKey="rejected"
                    title={"Rejected (" + rejectedCount + ")"}
                  ></Tab>
                </Tabs>
              </Col>
            </div>

						{screenData.map((request, i) => {
							let {
								datasets = [],
								updatedAt,
								applicants = "",
								publisher = "",
								dateSubmitted = new Date(),
								applicationStatus,
								applicationStatusDesc = "",
								projectName = "",
								workflow = {},
								workflowName = "",
								workflowCompleted = false,
								reviewStatus = "",
								deadlinePassed = false,
								decisionComments = "",
								decisionStatus = "",
								decisionMade = false,
								decisionApproved = false,
								reviewPanels = '',
								isReviewer = false,
								stepName = "",
								remainingActioners = [],
                                _id,
                                decisionDate
							} = request;
							return (
								<Row
									key={`request_${i}`}
									// onClick={event =>  window.location.href=`/data-access-request/${request._id}`}>
									onClick={(e) =>
										this.navigateToLocation(e, _id, applicationStatus)
									}
								>
									<div className='col-md-12'>
										<div className='layoutCard'>
											<div className='header'>
												<div className='header-title'>
													<h1>{projectName}</h1>
												</div>
												<div className='header-status'>
													{this.renderDuration(request, team)}
													<SLA
														classProperty={
															DarHelperUtil.darStatusColours[
																request.applicationStatus
															]
														}
														text={
															DarHelperUtil.darSLAText[
																request.applicationStatus
															]
														}
													/>
												</div>
											</div>
											<div className='body'>
												<AccessActivity
													datasets={datasets}
													applicationStatus={applicationStatus}
													publisher={publisher}
													updatedAt={updatedAt}
													applicants={applicants}
													dateSubmitted={dateSubmitted}
													team={team}
													workflow={workflow}
													workflowName={workflowName}
													workflowCompleted={workflowCompleted}
													reviewStatus={reviewStatus}
													deadlinePassed={deadlinePassed}
													decisionStatus={decisionStatus}
													decisionMade={decisionMade}
													isReviewer={isReviewer}
													stepName={stepName}
													remainingActioners={remainingActioners}
													navigateToLocation={this.navigateToLocation}
													applicationId={_id}
												/>
											</div>
											{this.renderComment(
												applicationStatusDesc,
												decisionComments,
												reviewPanels,
												decisionMade,
												decisionApproved,
												applicationStatus
											)}
										</div>
									</div>
								</Row>
							);
						})}
					</div>{/*CLOSE col-sm-10 */}
					<Col xs={1}></Col>
				</Row>
			</Fragment>
		);
	}
}

export default DataAccessRequestsNew;
