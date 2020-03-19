import React from 'react';
import axios from 'axios';
import EditToolForm from '../pages/components/EditToolForm';
import Container from 'react-bootstrap/Container';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading'

var baseURL = require('./../BaseURL').getURL();

class EditToolPage extends React.Component {

    constructor(props) {
        super(props)
        this.state.userState = props.userState;
      }
  
      // initialize our state
    state = {
        data: [],
        combinedTopic: [],
        combinedFeatures:[],
        combinedLanguages:[],
        combinedCategories:[],
        combinedLicenses:[],
        combinedUsers:[],
        isLoading: true,
        userState: []
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

   await this.getDataSearchFromDb();

  }

  getDataSearchFromDb = () => {
    //need to handle error if no id is found
    this.setState({ isLoading: true });
    axios.get(baseURL+'/api/tool/'+this.props.match.params.toolID)
    .then((res) => {
      this.setState({ 
        data: res.data.data[0],
        isLoading: false 
      });
    });
  };

    doGetTopicsCall() {
        axios.get(baseURL+'/api/getAllTopics/tool')
        .then((res) =>{
          var tempTopicArray = ["Blood","Cancer and neoplasms","Cardiovascular","Congenital disorders","Ear","Eye","Infection","Inflammatory and immune system","Injuries and accidents","Mental health","Metabolic and Endocrine","Musculoskeletal","Neurological","Oral and Gastrointestinal","Renal and Urogenital","Reproductive health and childbirth","Respiratory","Skin","Stroke"]
            
          res.data.data.map((to) => { 
              if (!tempTopicArray.includes(to) && to !== '') {
                  tempTopicArray.push(to);
              }
          });
          
          this.setState({combinedTopic: tempTopicArray.sort(function(a, b) {return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0;})});
          console.log("test1: " + JSON.stringify(res.data.data));
        });
    }

    doGetFeaturesCall(){
      axios.get(baseURL+'/api/getAllFeatures/tool')
      .then((res) =>{
        var tempFeaturesArray = ["Arbitrage","Association Rules","Attribution Modeling","Bayesian Statistics","Clustering","Collaborative Filtering","Confidence Interval","Cross-Validation","Decision Trees","Deep Learning","Density Estimation","Ensembles","Experimental Design","Feature Selection","Game Theory","Geospatial Modeling","Graphs","Imputation","Indexation / Cataloguing","Jackknife Regression","Lift Modeling","Linear Regression","Linkage Analysis","Logistic Regression","Model Fitting","Monte-Carlo Simulation","Naive Bayes","Nearest Neighbors - (k-NN)","Neural Networks","Pattern Recognition","Predictive Modeling","Principal Component Analysis - (PCA)","Random Numbers","Recommendation Engine","Relevancy Algorithm","Rule System","Scoring Engine","Search Engine","Segmentation","Supervised Learning","Support Vector Machine - (SVM)","Survival Analysis","Test of Hypotheses","Time Series","Yield Optimization"]
            
        res.data.data.map((fe) => { 
            if (!tempFeaturesArray.includes(fe) && fe !== '') {
                tempFeaturesArray.push(fe);
            }
        });
        
        this.setState({combinedFeatures: tempFeaturesArray.sort(function(a, b) {return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0;})});
        console.log("test2: " + JSON.stringify(res.data.data));
      });
    }

    doGetLanguagesCall(){
      axios.get(baseURL+'/api/getAllLanguages/tool')
      .then((res) =>{
        var tempLanguagesArray = ["No coding required",".net","AJAX","ASP.NET","C","C#","C++","CSS","Django","HTML","Java","Javascript","jQuery","JSON","Matlab","MySQL","Node.js","Objective C","PHP","Python","R","React JS","Regex","Ruby","Ruby on Rails","SQL","SQL server","Swift","XML"]

        res.data.data.map((la) => { 
            if (!tempLanguagesArray.includes(la) && la !== '') {
                tempLanguagesArray.push(la);
            }
        });
        
        this.setState({combinedLanguages: tempLanguagesArray.sort(function(a, b) {return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0;})});
        console.log("test3: " + JSON.stringify(res.data.data));
      });
  }

  doGetCategoriesCall(){
    axios.get(baseURL+'/api/getAllCategories/tool')
    .then((res) =>{
      var tempCategoriesArray = ["API","Code snippet","Container image","Dashboard","Developer stack","Directory","Docker app","Kubernetes app","Library","Notebook","Package","Platform","Repository","Service","Software","Virtual machine","Web application"]

      res.data.data.map((ca) => { 
          if (!tempCategoriesArray.includes(ca) && ca !== '') {
              tempCategoriesArray.push(ca);
          }
      });
      
      console.log("test3: " + JSON.stringify(res.data.data));
    });
}

doGetLicensesCall(){
  axios.get(baseURL+'/api/getAllLicenses/tool')
  .then((res) =>{
    var tempLicensesArray = ["Apache License 2.0","BSD 3-Clause \"New\" or \"Revised\" license","BSD 2-Clause \"Simplified\" or \"FreeBSD\" license","GNU General Public License (GPL)","GNU Library or \"Lesser\" General Public License (LGPL)","MIT license","Mozilla Public License 2.0","Common Development and Distribution License","Eclipse Public License version 2.0"]

    res.data.data.map((li) => { 
        if (!tempLicensesArray.includes(li) && li !== '') {
            tempLicensesArray.push(li);
        }
    });
    
    this.setState({combinedLicenses: tempLicensesArray.sort(function(a, b) {return (a.toUpperCase() < b.toUpperCase()) ? -1 : (a.toUpperCase() > b.toUpperCase()) ? 1 : 0;})});
    console.log("test3: " + JSON.stringify(res.data.data));
  });
}

doGetUsersCall(){
  axios.get(baseURL+'/api/getAllUsers')
  .then((res) =>{
      this.setState({combinedUsers: res.data.data});
      console.log("test7: " + JSON.stringify(res.data.data));
  });
}

doSearch = (e) => { //fires on enter on searchbar
  if (e.key === 'Enter') {
      if (!!this.state.searchString) {
          window.location.href = window.location.search + "/search?search=" + this.state.searchString + '&type=all';
      }
  }
}

updateSearchString = (searchString) => {
  this.setState({ searchString: searchString });
}

    render() {
        const {data, combinedTopic, combinedFeatures, combinedLanguages, combinedCategories, combinedLicenses, combinedUsers, isLoading, userState } = this.state;
    
        if (isLoading) {
          return <Container><Loading /></Container>;
        }

        return (
            <div>
            <SearchBar doSearchMethod={this.doSearch} doUpdateSearchString={this.updateSearchString} userState={userState} />
            <Container>
            <EditToolForm data={data} combinedTopic={combinedTopic} combinedFeatures={combinedFeatures} combinedLanguages={combinedLanguages} combinedCategories={combinedCategories} combinedLicenses={combinedLicenses} combinedUsers={combinedUsers} userState={userState} />
            </Container>
            </div>
        );
    } 
 
}

export default EditToolPage;