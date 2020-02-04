
// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

var baseURL = window.location.href;

if (!baseURL.includes('localhost')) {
    var rx = /^([http|https]+\:\/\/[a-z]+)(.*)/;
    var arr = rx.exec(baseURL);
    if (arr.length > 0) {
        //add -api to the sub domain for API requests
        baseURL = arr[1]+'-api'+arr[2]
    }

} else {
    baseURL = 'http://localhost:3001'
}

console.log('baseURL is '+baseURL);

class App extends Component {
  // initialize our state
  state = {
    //retuning and displaying
    data: [],

    //to be used in add
    id: 0,
    id: null,
    type: null,
    name: null,
    description: null,
    tags: null,
    rating: null,
    link: null,

    //to be used in edit/delete
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    /* if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    } */
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch(baseURL+'/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  getDataSearchFromDb = (search) => {
    axios.post(baseURL+'/api/getDataSearch', {search: search})
      .then((res) => {
        this.setState({ data: res.data.data });
      })
  };


  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (type, name, description, rating, link) => {
    //Gets empty id
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post(baseURL+'/api/putData', {
      id: idToBeAdded,
      type: type,
      name: name,
      description: description,
      rating: rating,
      link: link
    })
    .then((res) => {
      //debugger;
    });
  };

  

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete(baseURL+'/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post(baseURL+'/api/updateData', {
      id: objIdToUpdate,
      update: { message: updateToApply },
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      <div>
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((dat) => (
                <li style={{ padding: '10px' }} key={data.message}>
                  <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                  <span style={{ color: 'gray' }}> type: </span> {dat.type}<br />
                  <span style={{ color: 'gray' }}> name: </span> {dat.name}<br />
                  <span style={{ color: 'gray' }}> description: </span> {dat.description}<br />
                  <span style={{ color: 'gray' }}> tags: </span> {dat.tags}<br />
                  <span style={{ color: 'gray' }}> rating: </span> {dat.rating}<br />
                  <span style={{ color: 'gray' }}> link: </span> {dat.link}<br />
                </li>
              ))}
        </ul>
        


        {/* Adding */}
        
        <div style={{ padding: '10px' }}>
          
          {/* <input
            type="text"
            onChange={(e) => this.setState({ type: e.target.value })}
            placeholder="type"
            style={{ width: '200px' }}
          />
          <br />
          <input
            type="text"
            onChange={(e) => this.setState({ name: e.target.value })}
            placeholder="name"
            style={{ width: '200px' }}
          />
          <br />
          <input
            type="text"
            onChange={(e) => this.setState({ description: e.target.value })}
            placeholder="description"
            style={{ width: '200px' }}
          />
          <br />
          <input
            type="text"
            onChange={(e) => this.setState({ rating: e.target.value })}
            placeholder="rating"
            style={{ width: '200px' }}
          />
          <br />
          <input
            type="text"
            onChange={(e) => this.setState({ link: e.target.value })}
            placeholder="link"
            style={{ width: '200px' }}
          />
          <br />
          <button onClick={() => this.putDataToDB(this.state.type, this.state.name, this.state.description, this.state.rating, this.state.link)}>
            ADD
          </button> */}
          
          
          <input
            type="text"
            onChange={(e) => this.setState({ search: e.target.value })}
            placeholder="search"
            style={{ width: '200px' }}
          />
          <br />
          <button onClick={() => this.getDataSearchFromDb(this.state.search)}>
            ADD
          </button>
        </div>
        
        



        
        {/* Deleting */}
        {/*
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="put id of item to delete here"
          />
          <button onClick={() => this.deleteFromDB(this.state.idToDelete)}>
            DELETE
          </button>
        </div>
        */}

        {/* Updating */}
        {/* 
        <div style={{ padding: '10px' }}>
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: '200px' }}
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
        */}


      </div>
    );
  }
}

export default App;