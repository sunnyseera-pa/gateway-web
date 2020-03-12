import React, { Component } from 'react';
import Header from './components/Header';
import AddProjectForm from '../pages/components/AddProjectForm';

class AddProjectPage extends Component {

    render() {
        return (
            <div>
            <Header />
            <AddProjectForm />
            </div>
        );
    } 

}

export default AddProjectPage;