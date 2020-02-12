import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import Project from './components/Project';
import Tool from './components/Tool';
import Person from './components/Person';

class SearchPage extends React.Component{
    render(){
        return(
            <div>
                {/* <style>{'body {background-color: #eeeeee;}'}</style> */}
                <SearchBar />
                <Project />
                <Tool />
                <Person />
            </div>
        );
    }
}

export default SearchPage;