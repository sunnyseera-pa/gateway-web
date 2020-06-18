import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Typeahead } from 'react-bootstrap-typeahead';

import {Form, Button, Row, Col, Container} from 'react-bootstrap';

import SearchBar from '../commonComponents/SearchBar';
import Loading from '../commonComponents/Loading';

import 'react-bootstrap-typeahead/css/Typeahead.css';

import RelatedResources from '../commonComponents/RelatedResources';
import RelatedResourcesResults from '../commonComponents/RelatedResourcesResults';
import SVGIcon from '../../images/SVGIcon';


var baseURL = require('../commonComponents/BaseURL').getURL();

class EditToolPage extends React.Component {

  constructor(props) {
    super(props)
    this.state.userState = props.userState;
  }

  // initialize our state
  state = {
    data: [],
    combinedTopic: [],
    combinedFeatures: [],
    combinedLanguages: [],
    combinedCategories: [],
    combinedLicenses: [],
    combinedUsers: [],
    isLoading: true,
    userState: [],
    //NEED TO UPDATE THESE WITH INITIAL VALUES???
    searchString: null,
    datasetData: [],
    toolData: [],
    projectData: [],
    personData: [],
    summary: [],
    tempRelatedObjectIds: [],
    relatedObjectIds: [],
    relatedObjects: [],
    relatedObjectIdsCount: 0,
    tempSelected:{ 
        datasets:0,
        tools:0,
        projects:0,
        persons:0
     },
   selected:{
        datasets:0,
        tools:0,
        projects:0,
        persons:0
   }
  };

  // on loading of tool detail page
  async componentDidMount() {
    await Promise.all([
      this.doGetTopicsCall(),
      this.doGetFeaturesCall(),
      this.doGetLanguagesCall(),
      this.doGetCategoriesCall(),
      this.doGetLicensesCall(),
      this.doGetUsersCall()
    ]);

    this.getDataSearchFromDb();
  }

  getDataSearchFromDb = () => {
    //need to handle error if no id is found
    this.setState({ isLoading: true });
    axios.get(baseURL + '/api/v1/tools/' + this.props.match.params.toolID)
      .then((res) => {
        this.setState({
          data: res.data.data[0],
          relatedObjects: res.data.data[0].relatedObjects
        //   isLoading: false
        });
        this.updateRelatedObjectIds();
        this.setState({isLoading: false})
      });
  };

  updateRelatedObjectIds() {
    // console.log('type: ' + this.state.data.type)

    if(this.state.relatedObjects && this.state.relatedObjects.length > 0){
    var relObjs = JSON.stringify(this.state.relatedObjects)
    var relatedObjs = JSON.parse(relObjs)

    relatedObjs.map((object) => {
        this.state.relatedObjectIds.push(object.objectId)
        this.state.tempRelatedObjectIds.push(object.objectId)
    })
    }

    //   console.log('tempRelatedObjectIds: ' + JSON.stringify(this.state.tempRelatedObjectIds))
    //   console.log('relatedObjectIds: ' + JSON.stringify(this.state.relatedObjectIds))
    //   console.log('relatedObjects: ' + JSON.stringify(this.state.relatedObjects))

  }

  doGetTopicsCall() {
    return new Promise((resolve, reject) => {
      axios.get(baseURL + '/api/v1/search/filter/topic/tool')
        .then((res) => {
          var tempTopicArray = ["Blood", "Cancer and neoplasms", "Cardiovascular", "Congenital disorders", "Ear", "Eye", "Infection", "Inflammatory and immune system", "Injuries and accidents", "Mental health", "Metabolic and Endocrine", "Musculoskeletal", "Neurological", "Oral and Gastrointestinal", "Renal and Urogenital", "Reproductive health and childbirth", "Respiratory", "Skin", "Stroke"]
          res.data.data.forEach((to) => {
            if (!tempTopicArray.includes(to) && to !== '') {
              tempTopicArray.push(to);
            }
          });

          this.setState({ combinedTopic: tempTopicArray.sort(function (a, b) { return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0; }) });
          resolve();
        });
    });
  }

  doGetFeaturesCall() {
    return new Promise((resolve, reject) => {
      axios.get(baseURL + '/api/v1/search/filter/feature/tool')
        .then((res) => {
          var tempFeaturesArray = ["Arbitrage", "Association Rules", "Attribution Modeling", "Bayesian Statistics", "Clustering", "Collaborative Filtering", "Confidence Interval", "Cross-Validation", "Decision Trees", "Deep Learning", "Density Estimation", "Ensembles", "Experimental Design", "Feature Selection", "Game Theory", "Geospatial Modeling", "Graphs", "Imputation", "Indexation / Cataloguing", "Jackknife Regression", "Lift Modeling", "Linear Regression", "Linkage Analysis", "Logistic Regression", "Model Fitting", "Monte-Carlo Simulation", "Naive Bayes", "Nearest Neighbors - (k-NN)", "Neural Networks", "Pattern Recognition", "Predictive Modeling", "Principal Component Analysis - (PCA)", "Random Numbers", "Recommendation Engine", "Relevancy Algorithm", "Rule System", "Scoring Engine", "Search Engine", "Segmentation", "Supervised Learning", "Support Vector Machine - (SVM)", "Survival Analysis", "Test of Hypotheses", "Time Series", "Yield Optimization"]

          res.data.data.forEach((fe) => {
            if (!tempFeaturesArray.includes(fe) && fe !== '') {
              tempFeaturesArray.push(fe);
            }
          });

          this.setState({ combinedFeatures: tempFeaturesArray.sort(function (a, b) { return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0; }) });
          resolve();
        });
    });
  }

  doGetLanguagesCall() {
    return new Promise((resolve, reject) => {
      axios.get(baseURL + '/api/v1/search/filter/language/tool')
        .then((res) => {
          var tempLanguagesArray = ["No coding required", ".net", "AJAX", "ASP.NET", "C", "C#", "C++", "CSS", "Django", "HTML", "Java", "Javascript", "jQuery", "JSON", "Matlab", "MySQL", "Node.js", "Objective C", "PHP", "Python", "R", "React JS", "Regex", "Ruby", "Ruby on Rails", "SQL", "SQL server", "Swift", "XML"];
          res.data.data.forEach((la) => {
            if (!tempLanguagesArray.includes(la) && la !== '') {
              tempLanguagesArray.push(la);
            }
          });

          this.setState({ combinedLanguages: tempLanguagesArray.sort(function (a, b) { return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0; }) });
          resolve();
        });
    });
  }

  doGetCategoriesCall() {
    return new Promise((resolve, reject) => {
      axios.get(baseURL + '/api/v1/search/filter/category/tool')
        .then((res) => {

          var tempCategoriesArray = ["API", "Code snippet", "Container image", "Dashboard", "Developer stack", "Directory", "Docker app", "Kubernetes app", "Library", "Notebook", "Package", "Platform", "Repository", "Service", "Software", "Virtual machine", "Web application"];
          res.data.data.forEach((ca) => {
            if (!tempCategoriesArray.includes(ca) && ca !== '') {
              tempCategoriesArray.push(ca);
            }
          });

          this.setState({ combinedCategories: tempCategoriesArray.sort(function (a, b) { return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0; }) });
          resolve();
        });
    });
  }

  doGetLicensesCall() {
    return new Promise((resolve, reject) => {
      axios.get(baseURL + '/api/v1/search/filter/license/tool')
        .then((res) => {
          var tempLicensesArray = ["Apache License 2.0", "BSD 3-Clause \"New\" or \"Revised\" license", "BSD 2-Clause \"Simplified\" or \"FreeBSD\" license", "GNU General Public License (GPL)", "GNU Library or \"Lesser\" General Public License (LGPL)", "MIT license", "Mozilla Public License 2.0", "Common Development and Distribution License", "Eclipse Public License version 2.0"]

          res.data.data.forEach((li) => {
            if (!tempLicensesArray.includes(li) && li !== '') {
              tempLicensesArray.push(li);
            }
          });

          this.setState({ combinedLicenses: tempLicensesArray.sort(function (a, b) { return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0; }) });
          resolve();
        });
    });
  }

  doGetUsersCall() {
    return new Promise((resolve, reject) => {
      axios.get(baseURL + '/api/v1/users')
        .then((res) => {
          this.setState({ combinedUsers: res.data.data });
          resolve();
        });
    });
  }

  doSearch = (e) => { //fires on enter on searchbar
    if (e.key === 'Enter') {
      if (!!this.state.searchString) {
        window.location.href = window.location.search + "/search?search=" + this.state.searchString;
      }
    }
  }

  updateSearchString = (searchString) => {
    this.setState({ searchString: searchString });
  }

  doModalSearch = (e, type, page) => {

    if (e.key === 'Enter' || e === 'click') {

        var searchURL = '';

        if (type === 'dataset' && page > 0) searchURL += '&datasetIndex=' + page;
        if (type === 'tool' && page > 0) searchURL += '&toolIndex=' + page;
        if (type === 'project' && page > 0) searchURL += '&projectIndex=' + page;
        if (type === 'person' && page > 0) searchURL += '&personIndex=' + page;
    
    axios.get(baseURL + '/api/v1/search?search=' + this.state.searchString + searchURL )
        .then((res) => {
            this.setState({
                datasetData: res.data.datasetResults || [],
                toolData: res.data.toolResults || [],
                projectData: res.data.projectResults || [],
                personData: res.data.personResults || [],
                summary: res.data.summary || [],
                isLoading: false
            });
        })
    }
}

addToTempRelatedObjects = (id, type) => {

    if(this.state.tempRelatedObjectIds.includes(id)){
        this.state.tempRelatedObjectIds.splice( this.state.tempRelatedObjectIds.indexOf(id), 1 );        
        if(type===undefined){this.state.tempSelected.datasets--}
        else if(type==="tool"){this.state.tempSelected.tools--}
        else if(type==="project"){this.state.tempSelected.projects--}
        else if(type==="person"){this.state.tempSelected.persons--}
    }
    else {
        this.state.tempRelatedObjectIds.push(id)
        if(type===undefined){this.state.tempSelected.datasets++}
        else if(type==="tool"){this.state.tempSelected.tools++}
        else if(type==="project"){this.state.tempSelected.projects++}
        else if(type==="person"){this.state.tempSelected.persons++}
    }  
  
    this.setState({relatedObjectIdsCount: this.state.tempRelatedObjectIds.length - this.state.relatedObjectIds.length})
}

addToRelatedObjects = () => {
    const tempObjectIds = JSON.stringify(this.state.tempRelatedObjectIds);
    const temporaryObjectIds = JSON.parse(tempObjectIds);
    this.setState({relatedObjectIds: temporaryObjectIds});

    this.setState({relatedObjectIdsCount: 0 })
    this.setState(prevState => ({
        selected: {                   
            datasets: this.state.tempSelected.datasets,      
            tools: this.state.tempSelected.tools,
            projects: this.state.tempSelected.projects,
            persons: this.state.tempSelected.persons
        }
    }))
}

clearRelatedObjects = () => {
    this.setState({tempRelatedObjectIds: [] })
    this.setState({relatedObjectIdsCount: 0 })
}

removeObject = (id, type) => {
    // console.log('REMOVE! ' + id + ' - ' + type)
    this.state.tempRelatedObjectIds.splice( this.state.tempRelatedObjectIds.indexOf(id), 1 );   
    this.state.relatedObjectIds.splice( this.state.relatedObjectIds.indexOf(id), 1 ); 
    this.state.relatedObjects = this.state.relatedObjects.filter(obj => obj.objectId !== id);
 

    switch (type) {
        case 'tool':
                {this.state.tempSelected.tools--}
                {this.state.selected.tools--}
            break;
        case 'project':
                {this.state.tempSelected.projects--}
                {this.state.selected.projects--}
            break;
        case 'person':
                {this.state.tempSelected.persons--}
                {this.state.selected.persons--}
            break;
        case undefined:
                {this.state.tempSelected.datasets--}
                {this.state.selected.datasets--}
            break;
    }

    // this.setState({tempRelatedObjectIds: this.state.tempRelatedObjectIds})
    // this.setState({relatedObjectIds: this.state.relatedObjectIds})

}

  render() {
    const { data, combinedTopic, combinedFeatures, combinedLanguages, combinedCategories, combinedLicenses, combinedUsers, isLoading, userState, searchString, datasetData, toolData, projectData, personData, summary, selected, relatedObjects } = this.state;
    if (isLoading) {
      return <Container><Loading /></Container>;
    }

    return (
      <div>
          {/* {console.log('edit page data: ' + JSON.stringify(data))} */}
        <SearchBar doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
        <Container>
          <EditToolForm data={data} combinedTopic={combinedTopic} combinedFeatures={combinedFeatures} combinedLanguages={combinedLanguages} combinedCategories={combinedCategories} combinedLicenses={combinedLicenses} combinedUsers={combinedUsers} userState={userState} searchString={searchString} doSearchMethod={this.doModalSearch} doUpdateSearchString={this.updateSearchString} datasetData={datasetData} toolData={toolData} projectData={projectData} personData={personData} summary={summary} doAddToTempRelatedObjects={this.addToTempRelatedObjects} relatedObjectIdsCount={this.state.relatedObjectIdsCount} tempRelatedObjectIds={this.state.tempRelatedObjectIds} relatedObjectIds={this.state.relatedObjectIds} doClearRelatedObjects={this.clearRelatedObjects} doAddToRelatedObjects={this.addToRelatedObjects} doRemoveObject={this.removeObject} selected={selected} relatedObjects={relatedObjects}/>
        </Container>
      </div>
    );
  }

}

const EditToolForm = (props) => {
  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      id: props.data.id, 
      type: 'tool',
      name: props.data.name,
      link: props.data.link,
      description: props.data.description,
      categories: {
        category: props.data.categories.category,
        programmingLanguage: props.data.categories.programmingLanguage,
        programmingLanguageVersion: props.data.categories.programmingLanguageVersion
      },
      license: props.data.license,
      authors: props.data.authors,
      tags: {
        features: props.data.tags.features,
        topics: props.data.tags.topics
      },
    relatedObjects: props.relatedObjects
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required('This cannot be empty'),
      description: Yup.string()
        .max(5000, 'Maximum of 5,000 characters')
        .required('This cannot be empty'),
      categories: Yup.object().shape({
        category: Yup.string(),
        programmingLanguage: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
        programmingLanguageVersion: Yup.string()
      }),
      license: Yup.string(),
      authors: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.number()) : Yup.number())),
      features: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
      topics: Yup.lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string())),
    }),

    onSubmit: values => {
      values.toolCreator = props.userState[0];
      axios.put(baseURL + '/api/v1/mytools/edit', values)
        .then((res) => {
          window.location.href = window.location.search + '/tool/' + props.data.id + '/?toolEdited=true';
        });
    }
  });

  var listOfAuthors = [];
  props.data.authors.forEach((author) => {
    props.combinedUsers.forEach((user) => {
      if (user.id === author) {
        if (props.userState[0].id === user.id) {
          listOfAuthors.push({ id: user.id, name: user.name + " (You)" })
          if (!user.name.includes('(You)')) {
            user.name = user.name + " (You)";
          }
        }
        else {
          listOfAuthors.push({ id: user.id, name: user.name })
        }
      }
    });
  });

  function updateReason(id, reason) {
    let inRelatedObject = false;
    props.relatedObjects.map((object) => {
        if(object.objectId===id){
            inRelatedObject = true;
            object.reason = reason;
        }
    });

    if(!inRelatedObject){
        props.relatedObjects.push({'objectId':id, 'reason':reason})
    }
}

function submitForm() {
    const tempRelObjIds = JSON.stringify(props.tempRelatedObjectIds);
    const temporaryRelObjIds = JSON.parse(tempRelObjIds);

    props.relatedObjects.map((object) => {
        temporaryRelObjIds.splice( temporaryRelObjIds.indexOf(object.objectId), 1 ); 
    });

    temporaryRelObjIds.map((id) => {
        props.relatedObjects.push({'objectId':id, 'reason':''})
    })
}

  return (
    <div>

        {console.log('EDIT - props: ' + JSON.stringify(props.relatedObjects.length) )}
        
        {/* {props.relatedObjects.map((object) => {
            {console.log('edit form reasons: ' + JSON.stringify(object.objectId) + ' - ' + JSON.stringify(object.reason))}
        })} */}
        
      <Row className="mt-2">
        <Col sm={1} lg={1} />
        <Col sm={10} lg={10}>
          <div className="Rectangle">
            <p className="Black-20px">Edit a tool or resource</p>
          </div>
        </Col>
        <Col sm={1} lg={10} />
      </Row>

      <Row className="mt-2">
        <Col sm={1} lg={1} />
        <Col sm={10} lg={10}>
          <Form onSubmit={formik.handleSubmit} autocomplete='off'>
            <div className="Rectangle">
              <Form.Group>
                <span className="Gray800-14px">Name</span>
                <Form.Control id="name" name="name" type="text" className={formik.touched.name && formik.errors.name ? "EmptyFormInput AddFormInput" : "AddFormInput"} onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                {formik.touched.name && formik.errors.name ? <div className="ErrorMessages">{formik.errors.name}</div> : null}
              </Form.Group>

              <Form.Group>
                <span className="Gray800-14px">Link</span>
                <Form.Control id="link" name="link" type="text" className={formik.touched.link && formik.errors.link ? "EmptyFormInput AddFormInput" : "AddFormInput"} onChange={formik.handleChange} value={formik.values.link} onBlur={formik.handleBlur} />
                {formik.touched.link && formik.errors.link ? <div className="ErrorMessages">{formik.errors.link}</div> : null}
              </Form.Group>

              <Form.Group>
                <span className="Gray800-14px">Description</span>
                <br />
                <span className="Gray700-13px">
                  Up to 5,000 characters
                </span>
                <Form.Control as="textarea" id="description" name="description" type="text" className={formik.touched.description && formik.errors.description ? "EmptyFormInput AddFormInput DescriptionInput" : "AddFormInput DescriptionInput"} onChange={formik.handleChange} value={formik.values.description} onBlur={formik.handleBlur} />
                {formik.touched.description && formik.errors.description ? <div className="ErrorMessages">{formik.errors.description}</div> : null}
              </Form.Group>

              <Form.Group>
                <span className="Gray800-14px">Category</span>
                <br />
                <span className="Gray700-13px">
                  Select from existing or enter a new one.
                </span>
                <Typeahead
                  labelKey="category"
                  allowNew
                  defaultSelected={[props.data.categories.category]}
                  options={props.combinedCategories}
                  onChange={(selected) => {
                    var tempSelected = [];
                    selected.forEach((selectedItem) => {
                      selectedItem.customOption === true ? tempSelected.push(selectedItem.category) : tempSelected.push(selectedItem);
                    })
                    formik.values.categories.category = tempSelected[0];
                  }}
                />
              </Form.Group>

              <Form.Group>
                <span className="Gray800-14px">Programming language</span>
                <br />
                <span className="Gray700-13px">
                  Select from existing or enter a new one. As many as you like.
                </span>
                <Typeahead
                  labelKey="programmingLanguage"
                  allowNew
                  multiple
                  defaultSelected={props.data.categories.programmingLanguage}
                  options={props.combinedLanguages}
                  onChange={(selected) => {
                    var tempSelected = [];
                    selected.forEach((selectedItem) => {
                      selectedItem.customOption === true ? tempSelected.push(selectedItem.programmingLanguage) : tempSelected.push(selectedItem);
                    })
                    formik.values.categories.programmingLanguage = tempSelected;
                  }}
                />
              </Form.Group>

              <Form.Group>
                <span className="Gray800-14px">Programming language version</span>
                <br />
                <span className="Gray700-13px">
                  i.e. 3.6.1
                </span>
                <Form.Control id="categories.programmingLanguageVersion" name="categories.programmingLanguageVersion" type="text" className="SmallFormInput AddFormInput" onChange={formik.handleChange} value={formik.values.categories.programmingLanguageVersion} onBlur={formik.handleBlur} />
              </Form.Group>

              <Form.Group>
                <span className="Gray800-14px">License</span>
                <br />
                <span className="Gray700-13px">
                  Select from existing or enter a new one
                </span>
                <Typeahead
                  labelKey="license"
                  allowNew
                  multiple
                  defaultSelected={[props.data.license]}
                  options={props.combinedLicenses}
                  className="SmallFormInput"
                  onChange={(selected) => {
                    var tempSelected = [];
                    selected.forEach((selectedItem) => {
                      selectedItem.customOption === true ? tempSelected.push(selectedItem.license) : tempSelected.push(selectedItem);
                    })
                    formik.values.license = tempSelected[0];
                  }}
                />
              </Form.Group>

              <Form.Group>
                <span className="Gray800-14px">Uploaded by</span>
                <br />
                <span className="Gray700-13px">
                  Add any authors or collaborators who have an account on this site
                </span>
                <Typeahead
                  labelKey={authors => `${authors.name}`}
                  defaultSelected={listOfAuthors}
                  multiple
                  options={props.combinedUsers}
                  onChange={(selected) => {
                    var tempSelected = [];
                    selected.forEach((selectedItem) => {
                      tempSelected.push(selectedItem.id);
                    })
                    formik.values.authors = tempSelected;
                  }}
                />
              </Form.Group>

              <Form.Group>
                <span className="Gray800-14px">Features</span>
                <br />
                <span className="Gray700-13px">
                  Keywords that help people identify what this resource does. As many as you like. For instance: data analysis, random forest
                </span>
                <Typeahead
                  labelKey="features"
                  allowNew
                  multiple
                  defaultSelected={props.data.tags.features}
                  options={props.combinedFeatures}
                  onChange={(selected) => {
                    var tempSelected = [];
                    selected.forEach((selectedItem) => {
                      selectedItem.customOption === true ? tempSelected.push(selectedItem.features) : tempSelected.push(selectedItem);
                    })
                    formik.values.tags.features = tempSelected;
                  }}
                />
              </Form.Group>

              <Form.Group>
                <span className="Gray800-14px">Topics</span>
                <br />
                <span className="Gray700-13px">
                  Keywords that help people identify any related fields. As many as you like. For instance: Biogenomics, Nutrition
                </span>

                <Typeahead
                  labelKey="topics"
                  allowNew
                  multiple
                  defaultSelected={props.data.tags.topics}
                  options={props.combinedTopic}
                  onChange={(selected) => {
                    var tempSelected = [];
                    selected.forEach((selectedItem) => {
                      selectedItem.customOption === true ? tempSelected.push(selectedItem.topics) : tempSelected.push(selectedItem);
                    })
                    formik.values.tags.topics = tempSelected;
                  }}
                />
              </Form.Group>
            </div>

            <div className="Rectangle mt-2">
                <span className="Black-20px">Related resources</span><span className="Gray454443-14px"> (optional)</span>
                 <br/>
                <span className="Gray595757-14px">Show relationships to papers, projects, datasets and tools. Resources must be added to the Gateway first.</span>
            </div>

            <div className="Rectangle">
                {props.relatedObjectIds.map((objectId) => {
                    console.log('objectId: ' + JSON.stringify(objectId))
                    return <div className="RectangleWithBorder mt-3"> <RelatedResourcesResults objectId={objectId} doRemoveObject={props.doRemoveObject} doUpdateReason={updateReason} /> </div>
                })}

                {/* {props.relatedObjects.map((object) => {
                    // {console.log('edit form reasons: ' + JSON.stringify(object.objectId) + ' - ' + JSON.stringify(object.reason))}
                    return <div className="RectangleWithBorder mt-3"> <RelatedResourcesResults objectId={object.objectId} doRemoveObject={props.doRemoveObject} doUpdateReason={updateReason} reason={object.reason} /> </div>
                })} */}
            </div>

            <div className="Rectangle FlexCenter mt-1">
                <Row>
                    <Col sm={1} lg={1} />
                    <Col sm={10} lg={10}>
                        <RelatedResources searchString={props.searchString} doSearchMethod={props.doSearchMethod} doUpdateSearchString={props.doUpdateSearchString} userState={props.userState} datasetData={props.datasetData} toolData={props.toolData} projectData={props.projectData} personData={props.personData} summary={props.summary} doAddToTempRelatedObjects={props.doAddToTempRelatedObjects} relatedObjectIdsCount={props.relatedObjectIdsCount} tempRelatedObjectIds={props.tempRelatedObjectIds} relatedObjectIds={props.relatedObjectIds} doClearRelatedObjects={props.doClearRelatedObjects} doAddToRelatedObjects={props.doAddToRelatedObjects} selected={props.selected}/>
                    </Col>
                    <Col sm={1} lg={10} />
                </Row>
            </div>

            <Row className="mt-3">
              <Col xs={5} lg={9} />
              <Col xs={7} lg={3} className="text-right">
                  <a style={{ cursor: 'pointer' }} href={'/account?tab=tools'} >
                    <Button variant="medium" className="CancelButton Dark-14px mr-2" >
                      Cancel
                    </Button>
                  </a>
                <Button variant="primary" className="White-14px" type="submit" onClick={submitForm}>
                  {/* Edit this tool */}
                  Publish
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col sm={1} lg={10} />
      </Row>
      <Row>
        <span className="formBottomGap"></span>
      </Row>
    </div>
  );
}

export default EditToolPage;